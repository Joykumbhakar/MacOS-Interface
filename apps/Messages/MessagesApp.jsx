const { useState, useEffect, useRef } = React;

// Audio synth helper for authentic Apple message sounds
function playMsgSound(type = 'send') {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const now = ctx.currentTime;
        
        if (type === 'send') {
            // Crisp Apple "Swoosh" / Sent note
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, now); // D5
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
        } else if (type === 'receive') {
            // Apple "Pop" / Ding notification
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();
            osc1.type = 'sine';
            osc2.type = 'triangle';
            osc1.frequency.setValueAtTime(1046.5, now); // C6
            osc2.frequency.setValueAtTime(1318.5, now + 0.08); // E6
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);
            osc1.start(now);
            osc2.start(now + 0.08);
            osc1.stop(now + 0.35);
            osc2.stop(now + 0.35);
        } else if (type === 'tapback') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(740, now);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.09);
        }
    } catch (e) {
        // AudioContext not allowed or unmuted
    }
}

const TAPBACK_EMOJIS = ['â¤ï¸', 'ðŸ‘', 'ðŸ‘Ž', 'ðŸ˜‚', 'â€¼ï¸', 'â“'];

const renderAvatar = (c, size = 16) => {
    if (!c) return '';
    if (c.avatarIcon === 'apple' || c.avatarInitials === 'ï£¿' || c.name === 'Apple Support') {
        return <i className="fab fa-apple" style={{ fontSize: `${Math.max(Math.round(size * 0.55), 14)}px` }}></i>;
    }
    return c.avatarInitials;
};

const MessagesApp = () => {
    const [conversations, setConversations] = useState(() => {
        if (window.MacMessagesData && window.MacMessagesData.getConversations) {
            return window.MacMessagesData.getConversations();
        }
        return [];
    });
    const [activeConvId, setActiveConvId] = useState('c1');
    const [searchQuery, setSearchQuery] = useState('');
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [tapbackPickerMsgId, setTapbackPickerMsgId] = useState(null);
    const [playingAudioId, setPlayingAudioId] = useState(null);
    const [isComposingNew, setIsComposingNew] = useState(false);
    const [newRecipient, setNewRecipient] = useState('');

    const threadEndRef = useRef(null);
    const inputRef = useRef(null);

    const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

    // Scroll to bottom of message thread
    const scrollToBottom = (smooth = true) => {
        if (threadEndRef.current) {
            threadEndRef.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        }
    };

    useEffect(() => {
        scrollToBottom(false);
        // Clear unread badge for active conversation
        if (activeConv && activeConv.unread > 0) {
            setConversations(prev => prev.map(c => c.id === activeConv.id ? { ...c, unread: 0 } : c));
        }
    }, [activeConvId]);

    // Handle sending a new message
    const handleSendMessage = (e) => {
        if (e) e.preventDefault();
        const text = inputText.trim();
        if (!text) return;

        playMsgSound('send');

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newMsg = {
            id: 'm-' + Date.now(),
            sender: 'me',
            text: text,
            time: timeString,
            timestamp: Date.now(),
            status: 'Delivered'
        };

        const updatedConversations = conversations.map(c => {
            if (c.id === activeConv.id) {
                return {
                    ...c,
                    messages: [...c.messages, newMsg]
                };
            }
            return c;
        });

        setConversations(updatedConversations);
        if (window.MacMessagesData) window.MacMessagesData.saveConversations(updatedConversations);
        setInputText('');

        setTimeout(() => scrollToBottom(true), 50);

        // Auto-reply simulation
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            playMsgSound('receive');

            const replies = activeConv.autoReplies || [
                "Sounds great! Thanks for reaching out.",
                "Got it! Let's follow up on this.",
                "Looks awesome! ðŸš€"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            const replyMsg = {
                id: 'm-reply-' + Date.now(),
                sender: 'them',
                senderName: activeConv.name.split(' ')[0],
                text: randomReply,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                timestamp: Date.now()
            };

            setConversations(prev => {
                const next = prev.map(c => {
                    if (c.id === activeConv.id) {
                        return {
                            ...c,
                            messages: [...c.messages, replyMsg]
                        };
                    }
                    return c;
                });
                if (window.MacMessagesData) window.MacMessagesData.saveConversations(next);
                return next;
            });

            // Trigger Dynamic Island Notification banner if available
            if (window.MacIsland && typeof window.MacIsland.dispatch === 'function') {
                window.MacIsland.dispatch({
                    type: 'notification',
                    mode: 'compact',
                    data: {
                        title: activeConv.name,
                        subtitle: randomReply,
                        icon: 'images/Icons/Messages.png'
                    }
                });
            }

            setTimeout(() => scrollToBottom(true), 50);
        }, 1800);
    };

    // Toggle reaction on a message
    const handleAddReaction = (msgId, emoji) => {
        playMsgSound('tapback');
        setConversations(prev => prev.map(c => {
            if (c.id === activeConv.id) {
                const updatedMsgs = c.messages.map(m => {
                    if (m.id === msgId) {
                        const existingReactions = m.reactions || [];
                        const hasThis = existingReactions.some(r => r.emoji === emoji && r.from === 'me');
                        let nextReactions;
                        if (hasThis) {
                            nextReactions = existingReactions.filter(r => !(r.emoji === emoji && r.from === 'me'));
                        } else {
                            nextReactions = [...existingReactions.filter(r => r.from !== 'me'), { emoji, from: 'me' }];
                        }
                        return { ...m, reactions: nextReactions };
                    }
                    return m;
                });
                return { ...c, messages: updatedMsgs };
            }
            return c;
        }));
        setTapbackPickerMsgId(null);
    };

    // Trigger FaceTime call action
    const handleFaceTimeCall = (isVideo = true) => {
        if (window.MacIsland && typeof window.MacIsland.dispatch === 'function') {
            window.MacIsland.dispatch({
                type: 'call',
                mode: 'expanded',
                data: {
                    caller: activeConv.name,
                    handle: activeConv.phone || activeConv.name,
                    isVideo: isVideo
                },
                autoDismiss: false
            });
        }
    };

    // Filter conversations
    const filteredConvs = conversations.filter(c => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchMsg = c.messages.some(m => (m.text || '').toLowerCase().includes(q));
        return matchName || matchMsg;
    });

    const pinnedConvs = filteredConvs.filter(c => c.isPinned);
    const unpinnedConvs = filteredConvs.filter(c => !c.isPinned);

    return (
        <div className="mac-messages-app" onClick={() => tapbackPickerMsgId && setTapbackPickerMsgId(null)}>
            {/* Sidebar */}
            <div className="msg-sidebar">
                {/* Window Header */}
                <div className="msg-sidebar-header">
                    <span className="msg-header-title">Messages</span>
                    <button className="msg-compose-btn" title="New Message" onClick={() => {
                        setIsComposingNew(true);
                        if (inputRef.current) inputRef.current.focus();
                    }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="msg-search-box">
                    <div className="msg-search-input-wrapper">
                        <svg className="msg-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            className="msg-search-input"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <span className="msg-search-clear" onClick={() => setSearchQuery('')}>âœ•</span>
                        )}
                    </div>
                </div>

                {/* Pinned Contacts */}
                {!searchQuery && pinnedConvs.length > 0 && (
                    <div className="msg-pinned-section">
                        {pinnedConvs.map(c => (
                            <div
                                key={c.id}
                                className={`msg-pinned-item ${c.id === activeConvId ? 'active' : ''}`}
                                onClick={() => { setActiveConvId(c.id); setIsComposingNew(false); }}
                            >
                                <div className="msg-pinned-avatar-wrap">
                                    <div className="msg-pinned-avatar" style={{ background: c.avatarBg }}>
                                        {renderAvatar(c, 54)}
                                    </div>
                                    {c.unread > 0 && <div className="msg-pinned-badge">{c.unread}</div>}
                                </div>
                                <span className="msg-pinned-name">{c.name.split(' ')[0]}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* All Conversations List */}
                <div className="msg-conv-list">
                    {unpinnedConvs.map(c => {
                        const lastMsg = c.messages[c.messages.length - 1];
                        return (
                            <div
                                key={c.id}
                                className={`msg-conv-item ${c.id === activeConvId ? 'active' : ''}`}
                                onClick={() => { setActiveConvId(c.id); setIsComposingNew(false); }}
                            >
                                {c.unread > 0 && <div className="msg-unread-dot"></div>}
                                <div className="msg-conv-avatar" style={{ background: c.avatarBg }}>
                                    {renderAvatar(c, 44)}
                                </div>
                                <div className="msg-conv-details">
                                    <div className="msg-conv-row-top">
                                        <span className="msg-conv-name">{c.name}</span>
                                        <span className="msg-conv-time">{lastMsg ? lastMsg.time : ''}</span>
                                    </div>
                                    <div className="msg-conv-preview">
                                        {lastMsg ? (lastMsg.text || (lastMsg.image ? 'ðŸ“· Photo' : 'ðŸŽµ Voice Memo')) : 'No messages'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Chat Pane */}
            <div className="msg-main-pane">
                {/* Chat Top Header */}
                <div className="msg-chat-header window-header">
                    <div className="msg-header-contact-info">
                        <div className="msg-header-avatar" style={{ background: activeConv.avatarBg }}>
                            {renderAvatar(activeConv, 34)}
                        </div>
                        <div className="msg-header-meta">
                            <span className="msg-header-name">{activeConv.name}</span>
                            <span className="msg-header-sub">{activeConv.status}</span>
                        </div>
                    </div>

                    <div className="msg-header-actions">
                        <button className="msg-tool-btn" title="FaceTime Video" onClick={() => handleFaceTimeCall(true)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>
                        </button>
                        <button className="msg-tool-btn" title="FaceTime Audio" onClick={() => handleFaceTimeCall(false)}>
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </button>
                        <button className="msg-tool-btn" title="Details" onClick={() => setShowDetails(!showDetails)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages Thread */}
                <div className="msg-thread">
                    <div className="msg-date-pill">iMessage with {activeConv.name}</div>

                    {activeConv.messages.map(msg => {
                        const isMe = msg.sender === 'me';
                        const reactions = msg.reactions || [];

                        return (
                            <div
                                key={msg.id}
                                className={`msg-bubble-row ${isMe ? 'me' : 'them'} ${activeConv.status === 'SMS' ? 'sms' : ''}`}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    setTapbackPickerMsgId(tapbackPickerMsgId === msg.id ? null : msg.id);
                                }}
                            >
                                {!isMe && msg.senderName && (
                                    <span className="msg-sender-label">{msg.senderName}</span>
                                )}

                                {/* Message Bubble Content */}
                                <div className="msg-bubble">
                                    {msg.text && <div>{msg.text}</div>}
                                    {msg.image && (
                                        <img src={msg.image} alt="Attachment" className="msg-media-img" />
                                    )}
                                    {msg.audio && (
                                        <div className="msg-audio-box">
                                            <button className="msg-audio-play-btn" onClick={() => setPlayingAudioId(playingAudioId === msg.id ? null : msg.id)}>
                                                {playingAudioId === msg.id ? 'â¸' : 'â–¶'}
                                            </button>
                                            <div className="msg-audio-waves">
                                                {msg.audio.waves.map((w, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="msg-wave-bar"
                                                        style={{
                                                            height: `${w}%`,
                                                            opacity: playingAudioId === msg.id ? (idx % 2 === 0 ? 1 : 0.6) : 0.75
                                                        }}
                                                    ></div>
                                                ))}
                                            </div>
                                            <span className="msg-audio-time">{msg.audio.duration}</span>
                                        </div>
                                    )}

                                    {/* Tapback Badge on Message */}
                                    {reactions.length > 0 && (
                                        <div className="msg-reactions-badge">
                                            {reactions.map((r, idx) => (
                                                <span key={idx}>{r.emoji}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Tapback Reaction Modal Picker */}
                                {tapbackPickerMsgId === msg.id && (
                                    <div className="msg-tapback-picker" onClick={(e) => e.stopPropagation()}>
                                        {TAPBACK_EMOJIS.map(emoji => (
                                            <div
                                                key={emoji}
                                                className="msg-tapback-item"
                                                onClick={() => handleAddReaction(msg.id, emoji)}
                                            >
                                                {emoji}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {isMe && msg.status && (
                                    <span className="msg-status-receipt">{msg.status}</span>
                                )}
                            </div>
                        );
                    })}

                    {/* Animated Typing Indicator */}
                    {isTyping && (
                        <div className="msg-typing-indicator">
                            <div className="msg-typing-dot"></div>
                            <div className="msg-typing-dot"></div>
                            <div className="msg-typing-dot"></div>
                        </div>
                    )}

                    <div ref={threadEndRef} />
                </div>

                {/* Bottom Input Box */}
                <form className="msg-input-bar" onSubmit={handleSendMessage}>
                    <div className="msg-input-pill">
                        <button
                            type="button"
                            className="msg-input-action-btn"
                            title="Apps & Attachments"
                            onClick={() => {
                                // Add instant photo preview attachment
                                const updated = conversations.map(c => {
                                    if (c.id === activeConv.id) {
                                        return {
                                            ...c,
                                            messages: [
                                                ...c.messages,
                                                {
                                                    id: 'm-photo-' + Date.now(),
                                                    sender: 'me',
                                                    text: 'Check out this view from Apple Park!',
                                                    image: 'images/Wallpapers/27-Golden-Gate.jpg',
                                                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                    timestamp: Date.now(),
                                                    status: 'Delivered'
                                                }
                                            ]
                                        };
                                    }
                                    return c;
                                });
                                setConversations(updated);
                                playMsgSound('send');
                                setTimeout(() => scrollToBottom(true), 50);
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="16"></line>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                        </button>

                        <input
                            ref={inputRef}
                            type="text"
                            className="msg-text-input"
                            placeholder="iMessage"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />

                        <button
                            type="button"
                            className="msg-input-action-btn"
                            title="Voice Note"
                            onClick={() => {
                                const updated = conversations.map(c => {
                                    if (c.id === activeConv.id) {
                                        return {
                                            ...c,
                                            messages: [
                                                ...c.messages,
                                                {
                                                    id: 'm-voice-' + Date.now(),
                                                    sender: 'me',
                                                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                    timestamp: Date.now(),
                                                    audio: { duration: '0:18', waves: [20, 60, 90, 45, 80, 100, 70, 50, 85, 40, 75, 90, 30] },
                                                    status: 'Delivered'
                                                }
                                            ]
                                        };
                                    }
                                    return c;
                                });
                                setConversations(updated);
                                playMsgSound('send');
                                setTimeout(() => scrollToBottom(true), 50);
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                <line x1="12" y1="19" x2="12" y2="23"></line>
                                <line x1="8" y1="23" x2="16" y2="23"></line>
                            </svg>
                        </button>

                        <button
                            type="submit"
                            className="msg-send-btn"
                            disabled={!inputText.trim()}
                            title="Send Message"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="19" x2="12" y2="5"></line>
                                <polyline points="5 12 12 5 19 12"></polyline>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            {/* Contact Details Info Drawer */}
            {showDetails && (
                <div className="msg-details-drawer">
                    <div className="msg-drawer-card">
                        <div className="msg-drawer-avatar" style={{ background: activeConv.avatarBg }}>
                            {renderAvatar(activeConv, 64)}
                        </div>
                        <span className="msg-drawer-name">{activeConv.name}</span>
                        <span className="msg-drawer-sub">{activeConv.phone}</span>

                        <div className="msg-drawer-actions-row">
                            <button className="msg-drawer-btn" onClick={() => handleFaceTimeCall(false)}>
                                <div className="msg-drawer-btn-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </div>
                                <span>call</span>
                            </button>
                            <button className="msg-drawer-btn" onClick={() => handleFaceTimeCall(true)}>
                                <div className="msg-drawer-btn-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                </div>
                                <span>facetime</span>
                            </button>
                            <button className="msg-drawer-btn" onClick={() => alert('Info: Contact verified via iCloud.')}>
                                <div className="msg-drawer-btn-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                </div>
                                <span>info</span>
                            </button>
                        </div>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '10px' }}>
                        Shared Photos
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '20px' }}>
                        <img src="images/Wallpapers/27-Golden-Gate.jpg" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                        <img src="images/Icons/Orbit_OS_Big_Sur.png" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', background: '#eee' }} />
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '8px' }}>
                        Options
                    </div>
                    <div style={{ background: '#ffffff', borderRadius: '10px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', color: '#1d1d1f' }}>Hide Alerts</span>
                        <input type="checkbox" style={{ accentColor: '#34c759' }} />
                    </div>
                    <div style={{ background: '#ffffff', borderRadius: '10px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#1d1d1f' }}>Send Read Receipts</span>
                        <input type="checkbox" defaultChecked style={{ accentColor: '#34c759' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

window.renderMessagesApp = () => {
    const rootEl = document.getElementById('messages-react-root');
    if (rootEl) {
        try {
            ReactDOM.render(<MessagesApp />, rootEl);
        } catch (e) {
            console.error('MessagesApp Render Error:', e);
        }
    }
};
