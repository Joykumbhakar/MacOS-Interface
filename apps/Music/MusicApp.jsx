const { useState, useEffect, useRef, createContext, useContext } = React;

const PlayerContext = createContext();

// Lightweight native Lucide icon component for macOS Apple Music
const LucideIcon = ({ name, size = 18, color = 'currentColor', strokeWidth = 1.8, className = '', style = {} }) => {
    const icons = {
        'search': (
            <g>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </g>
        ),
        'home': (
            <g>
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </g>
        ),
        'grid': (
            <g>
                <rect width="7" height="7" x="3" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="14" rx="1.5" />
                <rect width="7" height="7" x="3" y="14" rx="1.5" />
            </g>
        ),
        'radio': (
            <g>
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
            </g>
        ),
        'pin': (
            <g>
                <line x1="12" x2="12" y1="17" y2="22" />
                <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
            </g>
        ),
        'clock': (
            <g>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </g>
        ),
        'mic': (
            <g>
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
            </g>
        ),
        'disc': (
            <g>
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="12" x2="12.01" y1="12" y2="12" />
            </g>
        ),
        'music': (
            <g>
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
            </g>
        ),
        'film': (
            <g>
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 3v18" />
                <path d="M3 7.5h4" />
                <path d="M3 12h18" />
                <path d="M3 16.5h4" />
                <path d="M17 3v18" />
                <path d="M17 7.5h4" />
                <path d="M17 16.5h4" />
            </g>
        ),
        'user': (
            <g>
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </g>
        ),
        'shopping-bag': (
            <g>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </g>
        ),
        'list-music': (
            <g>
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
            </g>
        ),
        'chevron-right': (
            <path d="m9 18 6-6-6-6" />
        ),
        'chevron-left': (
            <path d="m15 18-6-6 6-6" />
        ),
        'x': (
            <g>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </g>
        ),
        'x-circle': (
            <g>
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
            </g>
        ),
        'heart': (
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        ),
        'flame': (
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        ),
        'trending-up': (
            <g>
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </g>
        ),
        'history': (
            <g>
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
            </g>
        ),
        'video': (
            <g>
                <path d="m22 8-6 4 6 4V8Z" />
                <rect width="14" height="12" x="2" y="6" rx="2" />
            </g>
        ),
        'sliders': (
            <g>
                <line x1="4" x2="4" y1="21" y2="14" />
                <line x1="4" x2="4" y1="10" y2="3" />
                <line x1="12" x2="12" y1="21" y2="12" />
                <line x1="12" x2="12" y1="8" y2="3" />
                <line x1="20" x2="20" y1="21" y2="16" />
                <line x1="20" x2="20" y1="12" y2="3" />
                <line x1="1" x2="7" y1="14" y2="14" />
                <line x1="9" x2="15" y1="8" y2="8" />
                <line x1="17" x2="23" y1="16" y2="16" />
            </g>
        ),
        'calendar': (
            <g>
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
            </g>
        ),
        'guitar': (
            <g>
                <path d="m14.5 12.5-8 8a2.12 2.12 0 1 1-3-3l8-8" />
                <path d="m16 9 3-3" />
                <path d="m19 6 3-3" />
                <path d="M12 15a4 4 0 0 1 5.66-5.66l.7.7a4 4 0 0 1-5.65 5.66l-.71-.7Z" />
            </g>
        ),
        'cloud': (
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        ),
        'zap': (
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        ),
        'comment-alt': (
            <g>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10h8" />
                <path d="M8 14h4" />
            </g>
        ),
        'list': (
            <g>
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
            </g>
        )
    };

    const iconContent = icons[name] || icons['music'];

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
            className={`lucide lucide-${name} ${className}`}
            style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
        >
            {iconContent}
        </svg>
    );
};

// Helper fallback cover component with dynamic vinyl rotation
const SafeImage = ({ src, className, style, alt = 'Cover', song = null }) => {
    const player = useContext(PlayerContext);
    const isPlaying = Boolean(
        player && player.isPlaying && player.currentTrack && (
            (song && player.currentTrack.id === song.id) ||
            (player.currentTrack.cover === src)
        )
    );

    let finalSrc = src;
    if (isPlaying && src && typeof src === 'string' && src.startsWith('data:image/svg')) {
        try {
            const rawSvg = decodeURIComponent(src.replace('data:image/svg+xml;utf8,', ''));
            if (!rawSvg.includes('vinyl-rotating')) {
                const animatedSvg = rawSvg.replace('id="vinyl-disc"', 'id="vinyl-disc" class="vinyl-rotating"');
                finalSrc = `data:image/svg+xml;utf8,${encodeURIComponent(animatedSvg)}`;
            }
        } catch (e) {
            finalSrc = src;
        }
    } else if (!isPlaying && src && typeof src === 'string' && src.startsWith('data:image/svg')) {
        try {
            const rawSvg = decodeURIComponent(src.replace('data:image/svg+xml;utf8,', ''));
            if (rawSvg.includes('vinyl-rotating')) {
                const staticSvg = rawSvg.replace('class="vinyl-rotating"', '');
                finalSrc = `data:image/svg+xml;utf8,${encodeURIComponent(staticSvg)}`;
            }
        } catch (e) {
            finalSrc = src;
        }
    }

    const [imgSrc, setImgSrc] = useState(finalSrc);
    useEffect(() => { setImgSrc(finalSrc); }, [finalSrc]);
    let isSvgData = false;
    let rawSvgContent = '';
    
    if (imgSrc && typeof imgSrc === 'string' && imgSrc.startsWith('data:image/svg+xml;utf8,')) {
        isSvgData = true;
        try {
            rawSvgContent = decodeURIComponent(imgSrc.replace('data:image/svg+xml;utf8,', ''));
            // Ensure the SVG fills its container seamlessly at 1:1
            rawSvgContent = rawSvgContent
                .replace(/width="[0-9]+"/, 'width="100%"')
                .replace(/height="[0-9]+"/, 'height="100%"');
            if (!rawSvgContent.includes('style="display:block')) {
                rawSvgContent = rawSvgContent.replace('<svg ', '<svg style="display:block; width:100%; height:100%;" ');
            }
        } catch(e) {
            isSvgData = false;
        }
    }

    if (isSvgData) {
        return (
            <div 
                className={className} 
                style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}
                dangerouslySetInnerHTML={{ __html: rawSvgContent }}
            />
        );
    }

    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23fa243c"><rect width="100" height="100" rx="12" fill="%23ff3b30"/><circle cx="50" cy="50" r="22" fill="%23ffffff" opacity="0.2"/><path d="M46 38v24l16-12z" fill="%23ffffff"/></svg>`;

    return (
        <img 
            src={imgSrc || fallbackSvg} 
            className={className} 
            style={style} 
            alt={alt}
            onError={() => setImgSrc(fallbackSvg)} 
        />
    );
};

const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const AppleMusicApp = () => {
    const data = window.APPLE_MUSIC_DATA;
    const [currentTrack, setCurrentTrack] = useState(data.songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState('Home');
    const [searchQuery, setSearchQuery] = useState('');
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState('off'); // 'off' | 'all' | 'one'
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);
    const [showQueue, setShowQueue] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(200);

    const [audio] = useState(() => new Audio());
    const ytPlayerRef = useRef(null);



    useEffect(() => {
        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [audio]);

    // Update volume on audio element
    useEffect(() => {
        audio.volume = (isMuted || showVideo) ? 0 : volume;
        if (ytPlayerRef.current && ytPlayerRef.current.setVolume) {
            ytPlayerRef.current.setVolume(isMuted ? 0 : volume * 100);
        }
    }, [volume, isMuted, showVideo, audio]);

    // Audio progress and event listeners
    useEffect(() => {
        const onTimeUpdate = () => {
            setProgress(audio.currentTime);
            setDuration(audio.duration || 200);
            if (window.MacIsland && currentTrack) {
                const progPct = Math.round((audio.currentTime / (audio.duration || 200)) * 100);
                window.MacIsland.media(
                    currentTrack.title, 
                    currentTrack.artist, 
                    isPlaying, 
                    currentTrack.cover,
                    formatTime(audio.currentTime),
                    formatTime(audio.duration || 200),
                    progPct,
                    '-' + formatTime((audio.duration || 200) - audio.currentTime)
                );
            }
        };
        const onEnded = () => {
            if (repeatMode === 'one') {
                audio.currentTime = 0;
                audio.play();
            } else {
                playNext();
            }
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onTimeUpdate);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onTimeUpdate);
            audio.removeEventListener('ended', onEnded);
        };
    }, [audio, repeatMode, currentTrack, isPlaying, isShuffle]);

    // Handle track changes
    useEffect(() => {
        if (currentTrack) {
            if (currentTrack.previewUrl || currentTrack.url) {
                audio.src = currentTrack.url || currentTrack.previewUrl;
            }
            if (isPlaying) {
                audio.play().catch(() => {});
                if (window.MacIsland) {
                    window.MacIsland.media(currentTrack.title, currentTrack.artist, true, currentTrack.cover, formatTime(progress), formatTime(duration), Math.round((progress / (duration || 1)) * 100), '-' + formatTime((duration || 200) - progress));
                }
            }
        }
    }, [currentTrack]);

    // Handle Play / Pause state
    useEffect(() => {
        if (isPlaying) {
            audio.play().catch(() => {});
            if (window.MacIsland && currentTrack) {
                window.MacIsland.media(currentTrack.title, currentTrack.artist, true, currentTrack.cover, formatTime(progress), formatTime(duration), Math.round((progress / (duration || 1)) * 100), '-' + formatTime((duration || 200) - progress));
            }
        } else {
            audio.pause();
            if (window.MacIsland && currentTrack) {
                window.MacIsland.media(currentTrack.title, currentTrack.artist, false, currentTrack.cover, formatTime(progress), formatTime(duration), Math.round((progress / (duration || 1)) * 100), '-' + formatTime((duration || 200) - progress));
            }
        }
    }, [isPlaying]);

    const togglePlay = () => setIsPlaying(p => !p);

    // Sync with Dynamic Island actions
    useEffect(() => {
        const handleToggle = () => togglePlay();
        const handleNext = () => playNext();
        const handlePrev = () => playPrev();

        window.addEventListener('mac-island-toggle-play', handleToggle);
        window.addEventListener('mac-island-next', handleNext);
        window.addEventListener('mac-island-prev', handlePrev);

        return () => {
            window.removeEventListener('mac-island-toggle-play', handleToggle);
            window.removeEventListener('mac-island-next', handleNext);
            window.removeEventListener('mac-island-prev', handlePrev);
        };
    }, [currentTrack, isPlaying, isShuffle]);

    // Bind dragging after render
    useEffect(() => {
        const win = document.getElementById('music-window');
        if (win && window.makeDraggable) {
            window.makeDraggable(win);
        }
    }, []);

    const playNext = () => {
        const songs = data.songs;
        let nextIndex;
        if (isShuffle) {
            nextIndex = Math.floor(Math.random() * songs.length);
        } else {
            const currentIndex = songs.findIndex(s => s.id === currentTrack.id);
            nextIndex = (currentIndex + 1) % songs.length;
        }
        setCurrentTrack(songs[nextIndex]);
        if (!isPlaying) setIsPlaying(true);
    };

    const playPrev = () => {
        const songs = data.songs;
        const currentIndex = songs.findIndex(s => s.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        setCurrentTrack(songs[prevIndex]);
        if (!isPlaying) setIsPlaying(true);
    };

    const seek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (audio.duration) {
            audio.currentTime = percent * audio.duration;
            setProgress(audio.currentTime);
        }
    };

    const playSong = (song) => {
        if (currentTrack.id === song.id) {
            togglePlay();
        } else {
            setCurrentTrack(song);
            if (!isPlaying) setIsPlaying(true);
        }
    };

    const toggleRepeat = () => {
        if (repeatMode === 'off') setRepeatMode('all');
        else if (repeatMode === 'all') setRepeatMode('one');
        else setRepeatMode('off');
    };

    return (
        <PlayerContext.Provider value={{ 
            audio, currentTrack, setCurrentTrack, isPlaying, togglePlay, playNext, playPrev, 
            progress, duration, seek, playSong, data, searchQuery, setSearchQuery,
            isShuffle, setIsShuffle, repeatMode, toggleRepeat,
            volume, setVolume, isMuted, setIsMuted,
            showLyrics, setShowLyrics, showQueue, setShowQueue,
            showMoreMenu, setShowMoreMenu,
            showVideo, setShowVideo
        }}>
            <div id="music-react-root">
                <div className="am-container">
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    <MainContent activeTab={activeTab} setActiveTab={setActiveTab} />
                    <FloatingPlayer />
                    {showLyrics && <LyricsPopover />}
                    {showQueue && <QueuePopover />}
                    {showVideo && <VideoPopover />}
                </div>
            </div>
        </PlayerContext.Provider>
    );
};

/* --------------------------------------------------------------------------
   Sidebar
   -------------------------------------------------------------------------- */
const Sidebar = ({ activeTab, setActiveTab }) => {
    const topItems = [
        { icon: 'search', label: 'Search' },
        { icon: 'home', label: 'Home' },
        { icon: 'grid', label: 'New' },
        { icon: 'radio', label: 'Radio' }
    ];
    
    const libItems = [
        { icon: 'pin', label: 'Pins' },
        { icon: 'clock', label: 'Recently Added' },
        { icon: 'mic', label: 'Artists' },
        { icon: 'disc', label: 'Albums' },
        { icon: 'music', label: 'Songs' },
        { icon: 'film', label: 'Music Videos' },
        { icon: 'user', label: 'Made for You' }
    ];

    return (
        <div className="am-sidebar">
            <div className="am-sidebar-section">
                {topItems.map(item => (
                    <div 
                        key={item.label}
                        className={`am-nav-item ${activeTab === item.label ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.label)}
                    >
                        <LucideIcon name={item.icon} size={18} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            
            <div className="am-sidebar-section">
                <div className="am-sidebar-title">Library</div>
                {libItems.map(item => (
                    <div 
                        key={item.label}
                        className={`am-nav-item ${activeTab === item.label ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.label)}
                    >
                        <LucideIcon name={item.icon} size={18} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="am-sidebar-section">
                <div className="am-sidebar-title">Store</div>
                <div className={`am-nav-item ${activeTab === 'iTunes Store' ? 'active' : ''}`} onClick={() => setActiveTab('iTunes Store')}>
                    <LucideIcon name="shopping-bag" size={18} />
                    <span>iTunes Store</span>
                </div>
            </div>
            
            <div className="am-sidebar-section" style={{flex: 1}}>
                <div className="am-sidebar-title">Playlists</div>
                <div className={`am-nav-item ${activeTab === 'All Playlists' ? 'active' : ''}`} onClick={() => setActiveTab('All Playlists')}>
                    <LucideIcon name="list-music" size={18} />
                    <span>All Playlists</span>
                </div>
            </div>

            <div className="am-sidebar-profile">
                <SafeImage src="images/Avatars/Profile-avatar.png" alt="Profile" />
                <span className="am-sidebar-profile-name">Joy Kumbhakar</span>
            </div>
        </div>
    );
};

/* --------------------------------------------------------------------------
   Main Content Layout
   -------------------------------------------------------------------------- */
const MainContent = ({ activeTab, setActiveTab }) => {
    const { searchQuery, setSearchQuery } = useContext(PlayerContext);
    
    return (
        <div className="am-main">
            <div className="am-top-bar window-header">
                <div className="am-search-bar">
                    <LucideIcon name="search" size={15} color="#8e8e93" />
                    <input 
                        type="text" 
                        placeholder="Search Apple Music" 
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (activeTab !== 'Search' && e.target.value.trim() !== '') {
                                setActiveTab('Search');
                            }
                        }}
                        onFocus={() => setActiveTab('Search')}
                    />
                    {searchQuery && (
                        <LucideIcon name="x-circle" size={15} color="#8e8e93" className="am-search-clear" onClick={() => setSearchQuery('')} />
                    )}
                </div>
                <div className="am-top-tabs">
                    <div className="am-top-tab active">Apple Music</div>
                    <div className="am-top-tab" onClick={() => setActiveTab('Songs')}>Your Library</div>
                    <div className="am-top-tab" onClick={() => setActiveTab('iTunes Store')}>iTunes Store</div>
                </div>
            </div>
            
            <div className="am-content">
                {activeTab === 'Search' && <SearchView />}
                {activeTab === 'Home' && <HomeView setActiveTab={setActiveTab} />}
                {activeTab === 'New' && <NewView />}
                {activeTab === 'Radio' && <RadioView />}
                {activeTab === 'Songs' && <SongsView />}
                
                {/* Fallback for other library views */}
                {!['Search', 'Home', 'New', 'Radio', 'Songs'].includes(activeTab) && (
                    <div style={{textAlign: 'center', marginTop: '80px', color: '#8e8e93'}}>
                        <LucideIcon name="music" size={44} color="#fa243c" style={{marginBottom: '16px'}} />
                        <h2 style={{color: '#1d1d1f'}}>{activeTab}</h2>
                        <p style={{fontSize: '13px', marginTop: '6px'}}>Your {activeTab.toLowerCase()} will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

/* --------------------------------------------------------------------------
   Home View
   -------------------------------------------------------------------------- */
const HomeView = ({ setActiveTab }) => {
    const { data, playSong } = useContext(PlayerContext);
    return (
        <div>
            <div className="am-header">Home</div>
            
            <div className="am-section-header">
                <div className="am-section-title" onClick={() => setActiveTab('Songs')}>
                    Top Picks for You <LucideIcon name="chevron-right" size={15} strokeWidth={2.2} />
                </div>
            </div>
            <div className="am-scroll-row">
                {data.songs.slice(0, 5).map(song => (
                    <div className="am-card" key={song.id} onClick={() => playSong(song)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={song.cover} song={song} className="am-card-img" alt={song.title} />
                            <div className="am-card-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg></div>
                        </div>
                        <div className="am-card-title">{song.title}</div>
                        <div className="am-card-subtitle">{song.artist}</div>
                    </div>
                ))}
            </div>

            <div className="am-section-header">
                <div className="am-section-title" onClick={() => setActiveTab('Songs')}>
                    Recently Played <LucideIcon name="chevron-right" size={15} strokeWidth={2.2} />
                </div>
            </div>
            <div className="am-scroll-row">
                {data.songs.slice(5, 10).map(song => (
                    <div className="am-card" key={song.id} onClick={() => playSong(song)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={song.cover} song={song} className="am-card-img" alt={song.title} />
                            <div className="am-card-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg></div>
                        </div>
                        <div className="am-card-title">{song.title}</div>
                        <div className="am-card-subtitle">{song.artist}</div>
                    </div>
                ))}
            </div>

            <div className="am-section-header">
                <div className="am-section-title">
                    Featured Playlists <LucideIcon name="chevron-right" size={15} strokeWidth={2.2} />
                </div>
            </div>
            <div className="am-scroll-row">
                {data.playlists.map(pl => (
                    <div className="am-card" key={pl.id} onClick={() => playSong(data.songs[0])}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={pl.cover} className="am-card-img" alt={pl.name} />
                            <div className="am-card-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg></div>
                        </div>
                        <div className="am-card-title">{pl.name}</div>
                        <div className="am-card-subtitle">{pl.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* --------------------------------------------------------------------------
   Search View (Browse Categories & Search Results)
   -------------------------------------------------------------------------- */
const SearchView = () => {
    const { data, searchQuery, playSong } = useContext(PlayerContext);

    const categories = [
        { name: 'Apple Music Radio', color: 'linear-gradient(135deg, #C12B3B, #E15A68)', icon: 'radio' },
        { name: 'Pop', color: 'linear-gradient(135deg, #596191, #7A84BC)', icon: 'heart' },
        { name: 'Hits', color: 'linear-gradient(135deg, #B16238, #D8895C)', icon: 'flame' },
        { name: 'R&B', color: 'linear-gradient(135deg, #463973, #6B5D9A)', icon: 'disc' },
        { name: 'Charts', color: 'linear-gradient(135deg, #2E6B56, #4C977D)', icon: 'trending-up' },
        { name: 'Decades', color: 'linear-gradient(135deg, #7A5B41, #A38062)', icon: 'history' },
        { name: 'Music Videos', color: 'linear-gradient(135deg, #8A3D5B, #B86485)', icon: 'video' },
        { name: 'DJ Mixes', color: 'linear-gradient(135deg, #374665, #5A6A8F)', icon: 'sliders' },
        { name: 'Coming Soon', color: 'linear-gradient(135deg, #535456, #7C7D80)', icon: 'calendar' },
        { name: 'Hip-Hop', color: 'linear-gradient(135deg, #30588C, #5684BF)', icon: 'mic' },
        { name: 'Country', color: 'linear-gradient(135deg, #7A4231, #A36450)', icon: 'guitar' },
        { name: 'Latin', color: 'linear-gradient(135deg, #9C3848, #C95E70)', icon: 'zap' },
        { name: 'Chill', color: 'linear-gradient(135deg, #427680, #6BA3AE)', icon: 'cloud' },
        { name: 'Fitness', color: 'linear-gradient(135deg, #B54228, #E36447)', icon: 'flame' }
    ];

    const filteredSongs = searchQuery.trim() === '' 
        ? [] 
        : data.songs.filter(s => 
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.album.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div>
            {searchQuery.trim() !== '' ? (
                <div>
                    <div className="am-header">Results for "{searchQuery}"</div>
                    {filteredSongs.length > 0 ? (
                        <div className="am-song-list">
                            {filteredSongs.map((song, idx) => (
                                <div key={song.id} className="am-song-row" onClick={() => playSong(song)}>
                                    <div className="am-song-index">{idx + 1}</div>
                                    <SafeImage src={song.cover} className="am-song-cover" alt={song.title} />
                                    <div className="am-song-info">
                                        <div className="am-song-title">{song.title}</div>
                                        <div className="am-song-artist">{song.artist}</div>
                                    </div>
                                    <div className="am-song-album">{song.album}</div>
                                    <div className="am-song-time">{song.duration}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{color: '#8e8e93', marginTop: '40px', textAlign: 'center'}}>
                            No songs found matching "{searchQuery}".
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div className="am-header">Search</div>
                    <div className="am-section-title">Browse Categories</div>
                    <div className="am-category-grid">
                        {categories.map(cat => (
                            <div 
                                key={cat.name} 
                                className="am-category-card" 
                                style={{background: cat.color}}
                                onClick={() => playSong(data.songs[0])}
                            >
                                <span>{cat.name}</span>
                                <LucideIcon name={cat.icon} size={64} color="rgba(255,255,255,0.22)" className="am-category-bg-icon" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

/* --------------------------------------------------------------------------
   New Releases View
   -------------------------------------------------------------------------- */
const NewView = () => {
    const { data, playSong } = useContext(PlayerContext);
    return (
        <div>
            <div className="am-header">New</div>
            <div className="am-section-title">Latest Drops & Featured Hits</div>
            <div className="am-scroll-row" style={{marginTop: '16px'}}>
                {data.songs.slice(0, 4).map(song => (
                    <div className="am-card" style={{width: '260px'}} key={song.id} onClick={() => playSong(song)}>
                        <div className="am-card-img-wrapper" style={{aspectRatio: '16/10'}}>
                            <SafeImage src={song.cover} song={song} className="am-card-img" alt={song.title} />
                            <div className="am-card-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg></div>
                        </div>
                        <div className="am-card-title" style={{fontSize: '14px', marginTop: '4px'}}>{song.title}</div>
                        <div className="am-card-subtitle">{song.artist} â€¢ {song.album}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* --------------------------------------------------------------------------
   Radio View
   -------------------------------------------------------------------------- */
const RadioView = () => {
    const { data, playSong } = useContext(PlayerContext);
    return (
        <div>
            <div className="am-header">Radio</div>
            <div 
                style={{
                    width: '100%', 
                    height: '240px', 
                    background: 'linear-gradient(135deg, #fa243c 0%, #764ba2 100%)', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'white',
                    boxShadow: '0 8px 30px rgba(250, 36, 60, 0.25)',
                    cursor: 'pointer'
                }}
                onClick={() => playSong(data.songs[0])}
            >
                <div style={{textAlign: 'center'}}>
                    <LucideIcon name="radio" size={52} color="#ffffff" style={{marginBottom: '16px'}} />
                    <h2 style={{fontSize: '26px', fontWeight: '800'}}>Apple Music 1</h2>
                    <p style={{fontSize: '14px', opacity: '0.9', marginTop: '4px'}}>Live 24/7 global broadcast with Zane Lowe</p>
                </div>
            </div>
        </div>
    );
};

/* --------------------------------------------------------------------------
   Songs Table View
   -------------------------------------------------------------------------- */
const SongsView = () => {
    const { data, currentTrack, playSong } = useContext(PlayerContext);
    return (
        <div>
            <div className="am-header">Songs</div>
            <div className="am-song-list">
                {data.songs.map((song, idx) => (
                    <div 
                        key={song.id} 
                        className={`am-song-row ${currentTrack && currentTrack.id === song.id ? 'active' : ''}`}
                        onClick={() => playSong(song)}
                    >
                        <div className="am-song-index">{idx + 1}</div>
                        <SafeImage src={song.cover} song={song} className="am-song-cover" alt={song.title} />
                        <div className="am-song-info">
                            <div className="am-song-title" style={{color: currentTrack && currentTrack.id === song.id ? '#fa243c' : undefined}}>{song.title}</div>
                            <div className="am-song-artist">{song.artist}</div>
                        </div>
                        <div className="am-song-album">{song.album}</div>
                        <div className="am-song-time">{song.duration}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* --------------------------------------------------------------------------
   Floating Bottom Player
   -------------------------------------------------------------------------- */
const AudioVisualizer = ({ isPlaying }) => {
    const bars = [3, 5, 7, 4, 6, 8, 5, 3, 7, 6, 4, 5, 8, 3, 6, 7, 4, 5, 6, 3];
    return (
        <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            gap: '2px', padding: '0 16px', opacity: isPlaying ? 0.07 : 0.03,
            transition: 'opacity 0.4s ease', pointerEvents: 'none', overflow: 'hidden'
        }}>
            {bars.map((h, i) => (
                <div key={i} style={{
                    width: '3px', borderRadius: '2px 2px 0 0',
                    background: '#fa243c', flex: '1',
                    height: isPlaying ? `${20 + h * 8}%` : '8%',
                    transition: `height ${0.3 + (i % 5) * 0.1}s ease-in-out`,
                    animation: isPlaying ? `visualizerPulse ${0.6 + (i % 4) * 0.2}s ease-in-out infinite alternate` : 'none'
                }} />
            ))}
        </div>
    );
};

const FloatingPlayer = () => {
    const { 
        currentTrack, isPlaying, togglePlay, playNext, playPrev, 
        progress, duration, seek,
        isShuffle, setIsShuffle, repeatMode, toggleRepeat,
        volume, setVolume, isMuted, setIsMuted,
        showLyrics, setShowLyrics, showQueue, setShowQueue,
        showVideo, setShowVideo
    } = useContext(PlayerContext);
    
    if (!currentTrack) return null;
    
    const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

    const handleVolumeClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const newVol = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setVolume(newVol);
        if (isMuted) setIsMuted(false);
    };

    return (
        <div className="am-floating-player-wrapper">
            <div className="am-floating-player">
                
                <div className="am-player-controls">
                    <button className={`am-btn ${isShuffle ? 'active' : ''}`} onClick={() => setIsShuffle(!isShuffle)} title="Shuffle">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
                    </button>
                    <button className="am-btn" onClick={playPrev} title="Previous">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 5L3 12l8 7V5z"/><path d="M19 5l-8 7 8 7V5z"/><rect x="2" y="5" width="2" height="14"/></svg>
                    </button>
                    <button className="am-btn play-pause" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? 
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg> : 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg>
                        }
                    </button>
                    <button className="am-btn" onClick={playNext} title="Next">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 5l8 7-8 7V5z"/><path d="M5 5l8 7-8 7V5z"/><rect x="20" y="5" width="2" height="14"/></svg>
                    </button>
                    <button className={`am-btn ${repeatMode !== 'off' ? 'active' : ''}`} onClick={toggleRepeat} title={`Repeat: ${repeatMode}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                    </button>
                </div>
                
                <div className="am-player-divider"></div>
                
                {/* Center Now Playing Info + Scrubber */}
                <div className="am-now-playing-container">
                    <SafeImage src={currentTrack.cover} className="am-np-cover" alt={currentTrack.title} />
                    <div className="am-np-details">
                        <div className="am-np-text-row" style={{ display: "flex", alignItems: "center" }}>
                            <span className="am-np-title">{currentTrack.title}</span>
                            <span className="am-np-dot">GÇó</span>
                            <span className="am-np-artist">{currentTrack.artist}</span><AudioVisualizer />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', color: '#8e8e93', marginTop: '6px' }}>
                            <span style={{ minWidth: '30px', textAlign: 'right' }}>{formatTime(progress)}</span>
                            <div className="am-scrubber-track" onClick={seek} title="Seek" style={{ flex: 1, marginTop: 0 }}>
                                <div className="am-scrubber-fill" style={{ width: `${progressPercent}%` }}>
                                    <div className="am-scrubber-thumb"></div>
                                </div>
                            </div>
                            <span style={{ minWidth: '30px' }}>-{formatTime(duration - progress)}</span>
                        </div>
                    </div>
                </div>
                
                <div className="am-player-divider"></div>

                {/* Right Actions & Volume */}
                <div className="am-player-actions">
                    {currentTrack.youtubeId && (
                        <button 
                            className={`am-btn ${showVideo ? 'active' : ''}`} 
                            onClick={() => { setShowVideo(!showVideo); setShowLyrics(false); setShowQueue(false); }}
                            title="Watch Music Video"
                            style={{color: showVideo ? '#fa243c' : undefined}}
                        >
                            <i className="fas fa-video"></i>
                        </button>
                    )}
                    <button 
                        className={`am-btn ${showLyrics ? 'active' : ''}`} 
                        onClick={() => { setShowLyrics(!showLyrics); setShowQueue(false); setShowVideo(false); }}
                        title="Lyrics"
                    >
                        <i className="far fa-comment-alt"></i>
                    </button>
                    <button 
                        className={`am-btn ${showQueue ? 'active' : ''}`} 
                        onClick={() => { setShowQueue(!showQueue); setShowLyrics(false); setShowVideo(false); }}
                        title="Playing Next"
                    >
                        <i className="fas fa-list-ul"></i>
                    </button>
                    
                    <div className="am-volume-container">
                        <button 
                            className="am-btn" 
                            style={{width: '22px', height: '22px'}}
                            onClick={() => setIsMuted(!isMuted)}
                            title={isMuted ? 'Unmute' : 'Mute'}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                        </button>
                        <div className="am-volume-track" onClick={handleVolumeClick} title="Volume">
                            <div className="am-volume-fill" style={{ width: isMuted ? '0%' : `${volume * 100}%` }}></div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

/* --------------------------------------------------------------------------
   Lyrics Popover
   -------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   Lyrics Popover
   -------------------------------------------------------------------------- */
const LyricsPopover = () => {
    const { currentTrack, progress, setShowLyrics } = useContext(PlayerContext);
    const lyrics = currentTrack.lyrics || [
        { time: 0, text: "Instrumental or lyrics unavailable." }
    ];

    return (
        <div className="am-popover-card">
            <div className="am-popover-title">
                <span>Lyrics</span>
                <LucideIcon name="x" size={16} color="#8e8e93" style={{cursor: 'pointer'}} onClick={() => setShowLyrics(false)} />
            </div>
            <div className="am-lyrics-scroll">
                {lyrics.map((l, i) => {
                    const isCurrent = progress >= l.time && (i === lyrics.length - 1 || progress < lyrics[i + 1].time);
                    return (
                        <div key={i} className={`am-lyric-line ${isCurrent ? 'active' : ''}`}>
                            {l.text}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* --------------------------------------------------------------------------
   Queue Popover
   -------------------------------------------------------------------------- */
const QueuePopover = () => {
    const { data, currentTrack, playSong, setShowQueue } = useContext(PlayerContext);

    return (
        <div className="am-popover-card">
            <div className="am-popover-title">
                <span>Playing Next</span>
                <LucideIcon name="x" size={16} color="#8e8e93" style={{cursor: 'pointer'}} onClick={() => setShowQueue(false)} />
            </div>
            <div className="am-queue-scroll">
                {data.songs.map((song) => (
                    <div 
                        key={song.id} 
                        className={`am-queue-item ${currentTrack && currentTrack.id === song.id ? 'active' : ''}`}
                        onClick={() => playSong(song)}
                    >
                        <SafeImage src={song.cover} song={song} className="am-queue-cover" alt={song.title} />
                        <div className="am-queue-info">
                            <div className="am-queue-title">{song.title}</div>
                            <div className="am-queue-artist">{song.artist}</div>
                        </div>
                        {currentTrack && currentTrack.id === song.id && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fa243c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

/* --------------------------------------------------------------------------
   Video Popover (Official YouTube Music Video PiP)
   -------------------------------------------------------------------------- */
const VideoPopover = () => {
    const { currentTrack, setShowVideo } = useContext(PlayerContext);
    if (!currentTrack || !currentTrack.youtubeId) return null;

    return (
        <div style={{
            position: 'absolute',
            bottom: '80px',
            right: '28px',
            width: '380px',
            height: '240px',
            background: 'rgba(20, 20, 24, 0.88)',
            backdropFilter: 'blur(30px) saturate(200%)',
            WebkitBackdropFilter: 'blur(30px) saturate(200%)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.3)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '8px 12px',
                background: 'rgba(0,0,0,0.5)',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    <LucideIcon name="video" size={14} color="#ff3b30" />
                    <span style={{fontSize: '11.5px', fontWeight: '600', color: 'white'}}>{currentTrack.title} - Music Video</span>
                </div>
                <LucideIcon name="x" size={14} color="rgba(255,255,255,0.6)" style={{cursor: 'pointer'}} onClick={() => setShowVideo(false)} />
            </div>
            <iframe 
                src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=1&enablejsapi=1`} 
                title={currentTrack.title}
                style={{width: '100%', height: 'calc(100% - 32px)', border: 'none'}}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

/* --------------------------------------------------------------------------
   React Mount Bridge
   -------------------------------------------------------------------------- */
window.renderAppleMusicApp = () => {
    const rootEl = document.getElementById('music-react-root');
    if (rootEl) {
        try {
            ReactDOM.render(<AppleMusicApp />, rootEl);
        } catch (e) {
            rootEl.innerHTML = '<div style="color:red;padding:20px;z-index:9999;position:relative;">React Error: ' + e.message + '</div>';
            console.error('AppleMusicApp Render Error:', e);
        }
    }
};

if (document.getElementById('music-react-root')) { window.renderAppleMusicApp(); }

