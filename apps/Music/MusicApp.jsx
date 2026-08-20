const { useState, useEffect, useRef, createContext, useContext } = React;

const PlayerContext = createContext();

// Helper fallback cover component
const SafeImage = ({ src, className, style, alt = 'Cover' }) => {
    const [imgSrc, setImgSrc] = useState(src);
    useEffect(() => { setImgSrc(src); }, [src]);

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
        { icon: 'fa-search', label: 'Search' },
        { icon: 'fa-home', label: 'Home' },
        { icon: 'fa-border-all', label: 'New' },
        { icon: 'fa-broadcast-tower', label: 'Radio' }
    ];
    
    const libItems = [
        { icon: 'fa-thumbtack', label: 'Pins' },
        { icon: 'fa-clock', label: 'Recently Added' },
        { icon: 'fa-microphone', label: 'Artists' },
        { icon: 'fa-compact-disc', label: 'Albums' },
        { icon: 'fa-music', label: 'Songs' },
        { icon: 'fa-film', label: 'Music Videos' },
        { icon: 'fa-user-circle', label: 'Made for You' }
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
                        <i className={`fas ${item.icon}`}></i>
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
                        <i className={`fas ${item.icon}`}></i>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="am-sidebar-section">
                <div className="am-sidebar-title">Store</div>
                <div className={`am-nav-item ${activeTab === 'iTunes Store' ? 'active' : ''}`} onClick={() => setActiveTab('iTunes Store')}>
                    <i className="fas fa-shopping-bag"></i>
                    <span>iTunes Store</span>
                </div>
            </div>
            
            <div className="am-sidebar-section" style={{flex: 1}}>
                <div className="am-sidebar-title">Playlists</div>
                <div className={`am-nav-item ${activeTab === 'All Playlists' ? 'active' : ''}`} onClick={() => setActiveTab('All Playlists')}>
                    <i className="fas fa-th-large"></i>
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
                    <i className="fas fa-search"></i>
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
                        <i className="fas fa-times-circle am-search-clear" onClick={() => setSearchQuery('')}></i>
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
                        <i className="fas fa-music" style={{fontSize: '44px', marginBottom: '16px', color: '#fa243c'}}></i>
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
                    Top Picks for You <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            <div className="am-scroll-row">
                {data.songs.slice(0, 5).map(song => (
                    <div className="am-card" key={song.id} onClick={() => playSong(song)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={song.cover} className="am-card-img" alt={song.title} />
                            <div className="am-card-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg></div>
                        </div>
                        <div className="am-card-title">{song.title}</div>
                        <div className="am-card-subtitle">{song.artist}</div>
                    </div>
                ))}
            </div>

            <div className="am-section-header">
                <div className="am-section-title" onClick={() => setActiveTab('Songs')}>
                    Recently Played <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            <div className="am-scroll-row">
                {data.songs.slice(5, 10).map(song => (
                    <div className="am-card" key={song.id} onClick={() => playSong(song)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={song.cover} className="am-card-img" alt={song.title} />
                            <div className="am-card-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg></div>
                        </div>
                        <div className="am-card-title">{song.title}</div>
                        <div className="am-card-subtitle">{song.artist}</div>
                    </div>
                ))}
            </div>

            <div className="am-section-header">
                <div className="am-section-title">
                    Featured Playlists <i className="fas fa-chevron-right"></i>
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
        { name: 'Apple Music Radio', color: 'linear-gradient(135deg, #fa243c, #ff5e62)', icon: 'fa-broadcast-tower' },
        { name: 'Pop', color: 'linear-gradient(135deg, #ff416c, #ff4b2b)', icon: 'fa-heart' },
        { name: 'Hits', color: 'linear-gradient(135deg, #f7971e, #ffd200)', icon: 'fa-fire' },
        { name: 'R&B', color: 'linear-gradient(135deg, #8e2de2, #4a00e0)', icon: 'fa-compact-disc' },
        { name: 'Charts', color: 'linear-gradient(135deg, #11998e, #38ef7d)', icon: 'fa-chart-line' },
        { name: 'Decades', color: 'linear-gradient(135deg, #e65c00, #f9d423)', icon: 'fa-history' },
        { name: 'Music Videos', color: 'linear-gradient(135deg, #f857a6, #ff5858)', icon: 'fa-video' },
        { name: 'DJ Mixes', color: 'linear-gradient(135deg, #4776e6, #8e54e9)', icon: 'fa-sliders-h' },
        { name: 'Coming Soon', color: 'linear-gradient(135deg, #ec008c, #fc6767)', icon: 'fa-calendar-alt' },
        { name: 'Hip-Hop', color: 'linear-gradient(135deg, #00c6ff, #0072ff)', icon: 'fa-microphone-alt' },
        { name: 'Country', color: 'linear-gradient(135deg, #d38312, #a83279)', icon: 'fa-guitar' },
        { name: 'Latin', color: 'linear-gradient(135deg, #ff0844, #ffb199)', icon: 'fa-drum' },
        { name: 'Chill', color: 'linear-gradient(135deg, #43e97b, #38f9d7)', icon: 'fa-cloud' },
        { name: 'Fitness', color: 'linear-gradient(135deg, #f83600, #f9d423)', icon: 'fa-running' }
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
                                <i className={`fas ${cat.icon} am-category-bg-icon`}></i>
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
                            <SafeImage src={song.cover} className="am-card-img" alt={song.title} />
                            <div className="am-card-play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg></div>
                        </div>
                        <div className="am-card-title" style={{fontSize: '14px', marginTop: '4px'}}>{song.title}</div>
                        <div className="am-card-subtitle">{song.artist} • {song.album}</div>
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
                    <i className="fas fa-broadcast-tower" style={{fontSize: '52px', marginBottom: '16px'}}></i>
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
                        className={`am-song-row ${currentTrack.id === song.id ? 'active' : ''}`}
                        onClick={() => playSong(song)}
                    >
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
        </div>
    );
};

/* --------------------------------------------------------------------------
   Floating Player Pill (macOS Sequoia Perfection)
   -------------------------------------------------------------------------- */

const AudioVisualizer = () => {
    const { audio, isPlaying } = useContext(PlayerContext);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const sourceRef = useRef(null);
    const analyzerRef = useRef(null);
    const requestRef = useRef(null);

    useEffect(() => {
        if (!audio) return;
        if (!contextRef.current) {
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const analyzer = ctx.createAnalyser();
                analyzer.fftSize = 64;
                // Important: AudioContext requires explicit resume on user interaction, which we have (playing)
                const source = ctx.createMediaElementSource(audio);
                source.connect(analyzer);
                analyzer.connect(ctx.destination);
                
                contextRef.current = ctx;
                analyzerRef.current = analyzer;
                sourceRef.current = source;
            } catch (e) {
                console.error("Audio visualizer init error (could be CORS or multiple contexts):", e);
            }
        }
    }, [audio]);

    useEffect(() => {
        if (isPlaying && contextRef.current) {
            if (contextRef.current.state === 'suspended') {
                contextRef.current.resume();
            }
            const canvas = canvasRef.current;
            if(!canvas) return;
            const ctx = canvas.getContext('2d');
            const analyzer = analyzerRef.current;
            const bufferLength = analyzer.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            const draw = () => {
                requestRef.current = requestAnimationFrame(draw);
                analyzer.getByteFrequencyData(dataArray);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const barWidth = (canvas.width / bufferLength) * 2;
                let x = 0;
                for (let i = 0; i < bufferLength; i++) {
                    const barHeight = (dataArray[i] / 255) * canvas.height;
                    const r = barHeight + (25 * (i/bufferLength));
                    const g = 250 * (i/bufferLength);
                    const b = 50 + (200 * (i/bufferLength));
                    ctx.fillStyle = `rgba(${r},${g},${b}, 0.8)`;
                    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                    x += barWidth + 1;
                }
            };
            draw();
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            // clear canvas when paused
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPlaying]);

    return <canvas ref={canvasRef} width={80} height={20} style={{ marginLeft: '12px', opacity: 0.9, borderRadius: '2px' }} />;
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
                            <span className="am-np-dot">•</span>
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
const LyricsPopover = () => {
    const { currentTrack, progress, setShowLyrics } = useContext(PlayerContext);
    const lyrics = currentTrack.lyrics || [
        { time: 0, text: "Instrumental or lyrics unavailable." }
    ];

    return (
        <div className="am-popover-card">
            <div className="am-popover-title">
                <span>Lyrics</span>
                <i className="fas fa-times" style={{cursor: 'pointer', color: '#8e8e93'}} onClick={() => setShowLyrics(false)}></i>
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
                <i className="fas fa-times" style={{cursor: 'pointer', color: '#8e8e93'}} onClick={() => setShowQueue(false)}></i>
            </div>
            <div className="am-queue-scroll">
                {data.songs.map((song) => (
                    <div 
                        key={song.id} 
                        className={`am-queue-item ${currentTrack.id === song.id ? 'active' : ''}`}
                        onClick={() => playSong(song)}
                    >
                        <SafeImage src={song.cover} className="am-queue-cover" alt={song.title} />
                        <div className="am-queue-info">
                            <div className="am-queue-title">{song.title}</div>
                            <div className="am-queue-artist">{song.artist}</div>
                        </div>
                        {currentTrack.id === song.id && (
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
                    <i className="fab fa-youtube" style={{color: '#ff0000', fontSize: '14px'}}></i>
                    <span style={{fontSize: '11.5px', fontWeight: '600', color: 'white'}}>{currentTrack.title} - Music Video</span>
                </div>
                <i className="fas fa-times" style={{cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: '12px'}} onClick={() => setShowVideo(false)}></i>
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
