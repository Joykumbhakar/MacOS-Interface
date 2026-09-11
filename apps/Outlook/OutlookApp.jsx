const { useState, useEffect, useMemo } = React;

// Custom SVG Icons for Outlook macOS
const OutlookIcon = ({ name, size = 16, color = 'currentColor', strokeWidth = 2, className = '' }) => {
    const icons = {
        'plus': <path d="M12 5v14 M5 12h14" />,
        'search': <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
        'inbox': <path d="M22 12h-6l-2 3h-4l-2-3H2v7a2 2 0 002 2h16a2 2 0 002-2v-7z M2 12l3.5-7h13l3.5 7" />,
        'send': <path d="M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z" />,
        'file': <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z M13 2v7h7" />,
        'archive': <path d="M21 8v13H3V8 M1 3h22v5H1z M10 12h4" />,
        'trash': <path d="M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2 M10 11v6 M14 11v6" />,
        'flag': <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7" />,
        'reply': <path d="M9 14L4 9l5-5 M4 9h10.5a5.5 5.5 0 015.5 5.5v2.5" />,
        'reply-all': <path d="M7 14l-5-5 5-5 M12 14l-5-5 5-5 M7 9h10.5a5.5 5.5 0 015.5 5.5v2.5" />,
        'forward': <path d="M15 14l5-5-5-5 M20 9H9.5A5.5 5.5 0 004 14.5V17" />,
        'mail': <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />,
        'mail-open': <path d="M21.2 8.4l-8.7-5.8a2 2 0 00-2.4 0L1.4 8.4A2 2 0 001 9.9V19a2 2 0 002 2h18a2 2 0 002-2V9.9a2 2 0 00-.8-1.5z M2 9l9.3 6.2a1.3 1.3 0 001.4 0L22 9" />,
        'paperclip': <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />,
        'sidebar': <path d="M3 3h18v18H3z M9 3v18" />,
        'x': <path d="M18 6L6 18 M6 6l12 12" />,
        'check': <path d="M20 6L9 17l-5-5" />,
        'filter': <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
        'download': <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3" />
    };

    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={className}
        >
            {icons[name] || <circle cx="12" cy="12" r="9" />}
        </svg>
    );
};

const INITIAL_EMAILS = [
    { 
        id: 1, 
        folder: 'inbox',
        category: 'focused',
        sender: 'Satya Nadella', 
        email: 'satyan@microsoft.com',
        avatarBg: '#0078d4',
        subject: 'Project Updates: Microsoft Office for macOS', 
        date: '10:41 AM',
        fullDate: 'Today at 10:41 AM',
        unread: false,
        flagged: true,
        body: `Hi Team,\n\nPlease review the latest updates for our macOS simulation integration. The multi-pane layout and traffic light clearances look fantastic on high-DPI displays.\n\nKey highlights for this build:\n• High performance native window rendering\n• SF Pro system typography compliance\n• Frosted glass Sequoia acrylic backdrops\n\nLet me know your thoughts before the global sync.\n\nBest regards,\nSatya`,
        attachment: { name: 'Q3_Office_Integration_Spec.pdf', size: '2.4 MB' }
    },
    { 
        id: 2, 
        folder: 'inbox',
        category: 'focused',
        sender: 'Apple Developer', 
        email: 'developer@apple.com',
        avatarBg: '#5856d6',
        subject: 'Your Apple ID was used to sign in to macOS Interface', 
        date: 'Yesterday',
        fullDate: 'Yesterday at 4:18 PM',
        unread: true,
        flagged: false,
        body: `Dear Developer,\n\nYour Apple ID was successfully used to authenticate on a simulated macOS Sequoia workstation.\n\nDevice: WebKit Mac Client\nLocation: Localhost / Development Sandbox\nTime: September 12, 2026\n\nIf this was you, no further action is required. If you did not initiate this sign-in, please visit your account security settings.`,
        attachment: null
    },
    { 
        id: 3, 
        folder: 'inbox',
        category: 'focused',
        sender: 'GitHub Notifications', 
        email: 'notifications@github.com',
        avatarBg: '#24292e',
        subject: '[MacOS-Interface] New commit pushed to main', 
        date: 'Sep 11',
        fullDate: 'September 11, 2026 at 11:30 PM',
        unread: false,
        flagged: false,
        body: `Repository: Joykumbhakar/MacOS-Interface\nBranch: main\n\nCommit: Redesign OneNote and Outlook app with macOS Sequoia styling and traffic lights clearance.\n\nView diff on GitHub: https://github.com/Joykumbhakar/MacOS-Interface/commit/main`,
        attachment: null
    },
    { 
        id: 4, 
        folder: 'inbox',
        category: 'other',
        sender: 'Cloudflare Team', 
        email: 'news@cloudflare.com',
        avatarBg: '#f6821f',
        subject: 'Weekly DNS Analytics & Security Report', 
        date: 'Sep 10',
        fullDate: 'September 10, 2026 at 08:00 AM',
        unread: false,
        flagged: false,
        body: `Hi there,\n\nHere is your weekly Cloudflare analytics digest:\n• Total Requests: 142,580\n• Threat Mitigations: 0\n• Cache Hit Ratio: 94.8%\n\nYour edge services are operating normally.`,
        attachment: { name: 'Analytics_Report_W37.csv', size: '380 KB' }
    },
    { 
        id: 5, 
        folder: 'drafts',
        category: 'focused',
        sender: 'Me (Draft)', 
        email: 'user@macos.local',
        avatarBg: '#0a84ff',
        subject: 'Notes on macOS Sequoia HIG Guidelines', 
        date: 'Sep 09',
        fullDate: 'September 09, 2026 at 03:15 PM',
        unread: false,
        flagged: false,
        body: `Drafting design requirements for unified window controls and responsive sidebars...`,
        attachment: null
    },
    { 
        id: 6, 
        folder: 'sent',
        category: 'focused',
        sender: 'Tim Cook', 
        email: 'tcook@apple.com',
        avatarBg: '#107c41',
        subject: 'Re: macOS Web Simulation Preview', 
        date: 'Sep 08',
        fullDate: 'September 08, 2026 at 02:00 PM',
        unread: false,
        flagged: true,
        body: `Thanks for sharing this preview. The attention to detail, smooth dock magnification, and native typography are extraordinary. Keep pushing forward!`,
        attachment: null
    }
];

const FOLDERS = [
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
    { id: 'drafts', label: 'Drafts', icon: 'file' },
    { id: 'sent', label: 'Sent Items', icon: 'send' },
    { id: 'archive', label: 'Archive', icon: 'archive' },
    { id: 'deleted', label: 'Deleted Items', icon: 'trash' }
];

const OutlookApp = () => {
    const [emails, setEmails] = useState(() => {
        try {
            const saved = localStorage.getItem('macos_outlook_data');
            return saved ? JSON.parse(saved) : INITIAL_EMAILS;
        } catch (e) {
            return INITIAL_EMAILS;
        }
    });

    const [activeFolder, setActiveFolder] = useState('inbox');
    const [categoryFilter, setCategoryFilter] = useState('focused'); // 'focused', 'other'
    const [activeEmailId, setActiveEmailId] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSidebar, setShowSidebar] = useState(true);
    const [isComposing, setIsComposing] = useState(false);
    
    // Compose Form State
    const [composeTo, setComposeTo] = useState('');
    const [composeSubject, setComposeSubject] = useState('');
    const [composeBody, setComposeBody] = useState('');

    useEffect(() => {
        try {
            localStorage.setItem('macos_outlook_data', JSON.stringify(emails));
        } catch (e) {
            console.warn('Failed to save Outlook emails', e);
        }
    }, [emails]);

    // Folder counts
    const unreadCounts = useMemo(() => {
        const counts = {};
        FOLDERS.forEach(f => {
            counts[f.id] = emails.filter(e => e.folder === f.id && e.unread).length;
        });
        return counts;
    }, [emails]);

    // Filtered message list
    const filteredEmails = useMemo(() => {
        return emails.filter(email => {
            if (email.folder !== activeFolder) return false;
            if (activeFolder === 'inbox' && email.category !== categoryFilter) return false;
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                return email.sender.toLowerCase().includes(q) || 
                       email.subject.toLowerCase().includes(q) || 
                       email.body.toLowerCase().includes(q);
            }
            return true;
        });
    }, [emails, activeFolder, categoryFilter, searchQuery]);

    const activeEmail = emails.find(e => e.id === activeEmailId) || filteredEmails[0] || null;

    const handleSelectEmail = (email) => {
        setActiveEmailId(email.id);
        if (email.unread) {
            setEmails(prev => prev.map(e => e.id === email.id ? { ...e, unread: false } : e));
        }
    };

    const handleToggleFlag = (e, emailId) => {
        e.stopPropagation();
        setEmails(prev => prev.map(email => email.id === emailId ? { ...email, flagged: !email.flagged } : email));
    };

    const handleDeleteEmail = (emailId) => {
        setEmails(prev => prev.map(email => {
            if (email.id === emailId) {
                return { ...email, folder: email.folder === 'deleted' ? 'purged' : 'deleted' };
            }
            return email;
        }).filter(e => e.folder !== 'purged'));
    };

    const handleToggleRead = (emailId) => {
        setEmails(prev => prev.map(email => email.id === emailId ? { ...email, unread: !email.unread } : email));
    };

    const handleSendMail = (e) => {
        e.preventDefault();
        if (!composeTo.trim()) {
            alert('Please specify a recipient before sending.', 'Microsoft Outlook', 'images/Icons/MsOutlook.png');
            return;
        }

        const newEmail = {
            id: Date.now(),
            folder: 'sent',
            category: 'focused',
            sender: 'Me',
            email: 'user@macos.local',
            avatarBg: '#0a84ff',
            subject: composeSubject.trim() || '(No Subject)',
            date: 'Just now',
            fullDate: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            unread: false,
            flagged: false,
            body: composeBody,
            attachment: null
        };

        setEmails(prev => [newEmail, ...prev]);
        setIsComposing(false);
        setComposeTo('');
        setComposeSubject('');
        setComposeBody('');
    };

    return (
        <div className="outlook-app-container">
            {/* Top Unified Header Bar with Traffic-Light Clearance */}
            <div className="outlook-header-bar">
                {/* Safe clearance spacer for macOS Traffic Lights */}
                <div className="outlook-traffic-spacer" />

                <div className="outlook-header-left">
                    <button 
                        className={`outlook-icon-btn ${showSidebar ? 'active' : ''}`}
                        onClick={() => setShowSidebar(!showSidebar)}
                        title="Toggle Sidebar"
                    >
                        <OutlookIcon name="sidebar" size={15} />
                    </button>

                    <button 
                        className="outlook-new-msg-btn"
                        onClick={() => setIsComposing(true)}
                        title="Create New Message"
                    >
                        <OutlookIcon name="plus" size={14} color="#ffffff" strokeWidth={2.5} />
                        <span>New Message</span>
                    </button>
                </div>

                <div className="outlook-header-center">
                    <div className="outlook-search-box">
                        <OutlookIcon name="search" size={13} color="#8e8e93" />
                        <input 
                            type="text" 
                            placeholder="Search in all mailboxes..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="outlook-search-clear" onClick={() => setSearchQuery('')}>×</button>
                        )}
                    </div>
                </div>

                <div className="outlook-header-right">
                    {activeEmail && (
                        <>
                            <button className="outlook-toolbar-btn" onClick={() => handleDeleteEmail(activeEmail.id)} title="Delete Message">
                                <OutlookIcon name="trash" size={14} />
                            </button>
                            <button className="outlook-toolbar-btn" onClick={() => handleToggleRead(activeEmail.id)} title={activeEmail.unread ? "Mark as Read" : "Mark as Unread"}>
                                <OutlookIcon name={activeEmail.unread ? "mail-open" : "mail"} size={14} />
                            </button>
                            <button className="outlook-toolbar-btn" onClick={(e) => handleToggleFlag(e, activeEmail.id)} title="Flag Message">
                                <OutlookIcon name="flag" size={14} color={activeEmail.flagged ? '#ff9500' : 'currentColor'} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Main 3-Pane Layout */}
            <div className="outlook-main">
                {/* Column 1: Sidebar Folders */}
                {showSidebar && (
                    <div className="outlook-sidebar">
                        <div className="outlook-sidebar-group-title">Favorites</div>
                        {FOLDERS.map(folder => {
                            const isActive = activeFolder === folder.id;
                            const unreadCount = unreadCounts[folder.id] || 0;
                            return (
                                <div 
                                    key={folder.id}
                                    className={`outlook-folder-item ${isActive ? 'active' : ''}`}
                                    onClick={() => setActiveFolder(folder.id)}
                                >
                                    <OutlookIcon name={folder.icon} size={15} />
                                    <span className="outlook-folder-label">{folder.label}</span>
                                    {unreadCount > 0 && (
                                        <span className="outlook-folder-badge">{unreadCount}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Column 2: Message List */}
                <div className="outlook-list-pane">
                    {activeFolder === 'inbox' && (
                        <div className="outlook-filter-tabs">
                            <button 
                                className={`outlook-filter-tab ${categoryFilter === 'focused' ? 'active' : ''}`}
                                onClick={() => setCategoryFilter('focused')}
                            >
                                Focused
                            </button>
                            <button 
                                className={`outlook-filter-tab ${categoryFilter === 'other' ? 'active' : ''}`}
                                onClick={() => setCategoryFilter('other')}
                            >
                                Other
                            </button>
                        </div>
                    )}

                    <div className="outlook-list-items">
                        {filteredEmails.length === 0 ? (
                            <div className="outlook-empty-list">
                                <OutlookIcon name="inbox" size={32} color="#c7c7cc" />
                                <div>No messages in this folder</div>
                            </div>
                        ) : (
                            filteredEmails.map(email => {
                                const isSelected = activeEmail?.id === email.id;
                                const initials = email.sender.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

                                return (
                                    <div 
                                        key={email.id}
                                        className={`outlook-email-item ${isSelected ? 'selected' : ''} ${email.unread ? 'unread' : ''}`}
                                        onClick={() => handleSelectEmail(email)}
                                    >
                                        <div className="outlook-item-avatar" style={{ backgroundColor: email.avatarBg || '#0078d4' }}>
                                            {initials}
                                        </div>

                                        <div className="outlook-item-content">
                                            <div className="outlook-item-top">
                                                <span className="outlook-item-sender">{email.sender}</span>
                                                <span className="outlook-item-date">{email.date}</span>
                                            </div>

                                            <div className="outlook-item-subject">{email.subject}</div>
                                            <div className="outlook-item-snippet">{email.body.replace(/\n/g, ' ')}</div>

                                            <div className="outlook-item-footer">
                                                {email.attachment && (
                                                    <span className="outlook-attach-indicator" title="Has attachment">
                                                        <OutlookIcon name="paperclip" size={11} color="#8e8e93" />
                                                    </span>
                                                )}
                                                {email.flagged && (
                                                    <span className="outlook-flag-indicator" title="Flagged">
                                                        <OutlookIcon name="flag" size={11} color="#ff9500" />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Column 3: Reading Pane */}
                <div className="outlook-reading-pane">
                    {activeEmail ? (
                        <div className="outlook-reading-content">
                            {/* Message Header */}
                            <div className="outlook-reading-header">
                                <div className="outlook-reading-subject">{activeEmail.subject}</div>
                                
                                <div className="outlook-sender-row">
                                    <div className="outlook-reading-avatar" style={{ backgroundColor: activeEmail.avatarBg || '#0078d4' }}>
                                        {activeEmail.sender.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className="outlook-sender-info">
                                        <div className="outlook-sender-name-line">
                                            <span className="outlook-sender-name">{activeEmail.sender}</span>
                                            <span className="outlook-sender-email">&lt;{activeEmail.email}&gt;</span>
                                        </div>
                                        <div className="outlook-recipient-line">
                                            To: <span>user@macos.local</span>
                                        </div>
                                    </div>
                                    <div className="outlook-date-badge">{activeEmail.fullDate}</div>
                                </div>
                            </div>

                            {/* Quick Action Ribbon */}
                            <div className="outlook-message-actions">
                                <button className="outlook-action-pill" onClick={() => setIsComposing(true)}>
                                    <OutlookIcon name="reply" size={13} />
                                    <span>Reply</span>
                                </button>
                                <button className="outlook-action-pill" onClick={() => setIsComposing(true)}>
                                    <OutlookIcon name="reply-all" size={13} />
                                    <span>Reply All</span>
                                </button>
                                <button className="outlook-action-pill" onClick={() => setIsComposing(true)}>
                                    <OutlookIcon name="forward" size={13} />
                                    <span>Forward</span>
                                </button>
                            </div>

                            {/* Attachments (if any) */}
                            {activeEmail.attachment && (
                                <div className="outlook-attachment-card">
                                    <OutlookIcon name="file" size={20} color="#0078d4" />
                                    <div className="outlook-attachment-meta">
                                        <div className="outlook-attachment-name">{activeEmail.attachment.name}</div>
                                        <div className="outlook-attachment-size">{activeEmail.attachment.size}</div>
                                    </div>
                                    <button className="outlook-download-btn" title="Download">
                                        <OutlookIcon name="download" size={14} />
                                    </button>
                                </div>
                            )}

                            {/* Message Body */}
                            <div className="outlook-reading-body">
                                {activeEmail.body.split('\n\n').map((paragraph, index) => (
                                    <p key={index} style={{ marginBottom: '14px', whiteSpace: 'pre-line' }}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="outlook-no-selection">
                            <OutlookIcon name="mail" size={48} color="#d1d5db" />
                            <p>Select an email message from the list to read it.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Compose New Message Modal / Sheet */}
            {isComposing && (
                <div className="outlook-compose-overlay">
                    <div className="outlook-compose-modal">
                        <div className="outlook-compose-header">
                            <div className="outlook-compose-title">New Message</div>
                            <button className="outlook-compose-close" onClick={() => setIsComposing(false)}>
                                <OutlookIcon name="x" size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleSendMail} className="outlook-compose-form">
                            <div className="outlook-compose-field">
                                <label>To:</label>
                                <input 
                                    type="email" 
                                    placeholder="recipient@example.com" 
                                    value={composeTo}
                                    onChange={(e) => setComposeTo(e.target.value)}
                                    autoFocus
                                    required
                                />
                            </div>

                            <div className="outlook-compose-field">
                                <label>Subject:</label>
                                <input 
                                    type="text" 
                                    placeholder="Add a subject" 
                                    value={composeSubject}
                                    onChange={(e) => setComposeSubject(e.target.value)}
                                />
                            </div>

                            <div className="outlook-compose-body-wrapper">
                                <textarea 
                                    placeholder="Type your message here..."
                                    value={composeBody}
                                    onChange={(e) => setComposeBody(e.target.value)}
                                />
                            </div>

                            <div className="outlook-compose-footer">
                                <button type="submit" className="outlook-send-btn">
                                    <OutlookIcon name="send" size={13} color="#ffffff" />
                                    <span>Send</span>
                                </button>
                                <button type="button" className="outlook-discard-btn" onClick={() => setIsComposing(false)}>
                                    Discard
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

window.renderOutlookApp = () => {
    const rootEl = document.getElementById('outlook-react-root');
    if (rootEl) {
        try {
            ReactDOM.render(<OutlookApp />, rootEl);
        } catch (e) {
            rootEl.innerHTML = '<div style="color:red;padding:20px;">React Error: ' + e.message + '</div>';
        }
    }
};

if (document.getElementById('outlook-react-root')) { 
    window.renderOutlookApp(); 
}

