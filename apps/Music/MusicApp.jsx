const { useState, useEffect, useRef, createContext, useContext, useMemo } = React;

const PlayerContext = createContext();

/* ==========================================================================
   Lucide / Apple System SVG Icons
   ========================================================================== */
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
        'plus': (
            <g>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </g>
        ),
        'chevron-right': <path d="m9 18 6-6-6-6" />,
        'chevron-left': <path d="m15 18-6-6 6-6" />,
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
        'heart': <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
        'heart-fill': <path fill="#fa243c" stroke="#fa243c" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
        'flame': <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
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
        'airplay': (
            <g>
                <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                <polygon points="12 15 17 21 7 21 12 15" />
            </g>
        ),
        'info': (
            <g>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
            </g>
        ),
        'trash': (
            <g>
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </g>
        ),
        'zap': <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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

/* ==========================================================================
   Safe Image Component with SVG / Data URL Handling
   ========================================================================== */
const SafeImage = ({ src, className, style, alt = 'Cover', song = null }) => {
    let effectiveSrc = src;
    if (!effectiveSrc && song && window.createGradientCover) {
        effectiveSrc = window.createGradientCover(song.title, song.artist);
    }

    let isSvgData = false;
    let rawSvgContent = '';
    
    if (effectiveSrc && typeof effectiveSrc === 'string') {
        if (effectiveSrc.startsWith('data:image/svg+xml;utf8,')) {
            isSvgData = true;
            try {
                rawSvgContent = decodeURIComponent(effectiveSrc.replace('data:image/svg+xml;utf8,', ''));
            } catch(e) {
                isSvgData = false;
            }
        } else if (effectiveSrc.startsWith('data:image/svg+xml;charset=utf-8,')) {
            isSvgData = true;
            try {
                rawSvgContent = decodeURIComponent(effectiveSrc.replace('data:image/svg+xml;charset=utf-8,', ''));
            } catch(e) {
                isSvgData = false;
            }
        } else if (effectiveSrc.startsWith('data:image/svg+xml;base64,')) {
            isSvgData = true;
            try {
                rawSvgContent = decodeURIComponent(escape(atob(effectiveSrc.replace('data:image/svg+xml;base64,', ''))));
            } catch(e) {
                isSvgData = false;
            }
        }
    }

    if (isSvgData && rawSvgContent) {
        rawSvgContent = rawSvgContent
            .replace(/width="[0-9]+"/, 'width="100%"')
            .replace(/height="[0-9]+"/, 'height="100%"');
        if (!rawSvgContent.includes('style="display:block')) {
            rawSvgContent = rawSvgContent.replace('<svg ', '<svg style="display:block; width:100%; height:100%;" ');
        }
        return (
            <div 
                className={className || ''} 
                style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
                dangerouslySetInnerHTML={{ __html: rawSvgContent }}
            />
        );
    }

    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%"><defs><linearGradient id="fbGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fa243c"/><stop offset="50%" stop-color="%239c27b0"/><stop offset="100%" stop-color="%230d1b2a"/></linearGradient></defs><rect width="300" height="300" fill="url(%23fbGrad)"/><circle cx="150" cy="150" r="90" fill="%23ffffff" opacity="0.08"/><circle cx="150" cy="150" r="40" fill="%23ffffff" opacity="0.12"/><path d="M165 110v50a25 25 0 1 1-15-23v-27l30-8v8z" fill="%23ffffff"/></svg>`;

    return (
        <img 
            src={effectiveSrc || fallbackSvg} 
            className={className || ''} 
            style={style} 
            alt={alt}
            onError={(e) => { 
                if (song && window.createGradientCover) {
                    const fallbackGrad = window.createGradientCover(song.title, song.artist);
                    e.currentTarget.src = fallbackGrad;
                } else {
                    e.currentTarget.src = fallbackSvg;
                }
            }} 
        />
    );
};

const formatTime = (secs) => {
    if (!secs || isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
};

/* ==========================================================================
   Main Music App Provider & Component
   ========================================================================== */
const AppleMusicApp = () => {
    const data = window.APPLE_MUSIC_DATA || { songs: [], albums: [], artists: [], radioStations: [], playlists: [] };
    const [songs, setSongs] = useState(data.songs || []);
    const [currentTrack, setCurrentTrack] = useState(data.songs[0] || null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState('Home');
    const [navHistory, setNavHistory] = useState(['Home']);
    const [historyIndex, setHistoryIndex] = useState(0);

    // Selected details
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    // Search
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFilter, setSearchFilter] = useState('all');

    // Controls
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState('off'); // 'off' | 'all' | 'one'
    const [volume, setVolume] = useState(0.85);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(200);

    // User Library Persistence State
    const [pinnedIds, setPinnedIds] = useState(() => data.storage ? data.storage.getPinnedIds() : []);
    const [lovedIds, setLovedIds] = useState(() => data.storage ? data.storage.getLovedIds() : []);
    const [userPlaylists, setUserPlaylists] = useState(() => data.storage ? data.storage.getUserPlaylists() : []);

    // Queue
    const [queue, setQueue] = useState(data.songs || []);

    // Modals / Panels
    const [showLyrics, setShowLyrics] = useState(false);
    const [showQueue, setShowQueue] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [showAirPlay, setShowAirPlay] = useState(false);
    const [showEqualizer, setShowEqualizer] = useState(false);
    const [showSongInfo, setShowSongInfo] = useState(null);
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, track: null });
    const [equalizerPreset, setEqualizerPreset] = useState('Apple Music Flat');
    const [airplayDevice, setAirplayDevice] = useState('MacBook Pro Speakers');

    const [audio] = useState(() => {
        const a = new Audio();
        if (window.systemVolume !== undefined) a.volume = window.systemVolume;
        return a;
    });

    // Navigation History Manager
    const navigateTo = (tab, payload = null) => {
        if (payload) {
            if (tab === 'AlbumDetail') setSelectedAlbum(payload);
            if (tab === 'ArtistDetail') setSelectedArtist(payload);
            if (tab === 'PlaylistDetail') setSelectedPlaylist(payload);
        }
        setActiveTab(tab);
        const nextHist = navHistory.slice(0, historyIndex + 1);
        nextHist.push(tab);
        setNavHistory(nextHist);
        setHistoryIndex(nextHist.length - 1);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            const nextIdx = historyIndex - 1;
            setHistoryIndex(nextIdx);
            setActiveTab(navHistory[nextIdx]);
        }
    };

    const goForward = () => {
        if (historyIndex < navHistory.length - 1) {
            const nextIdx = historyIndex + 1;
            setHistoryIndex(nextIdx);
            setActiveTab(navHistory[nextIdx]);
        }
    };

    // Sync System Volume
    useEffect(() => {
        const handleVol = (e) => {
            audio.volume = e.detail;
            setVolume(e.detail);
        };
        window.addEventListener('system-volume-changed', handleVol);
        return () => window.removeEventListener('system-volume-changed', handleVol);
    }, [audio]);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [audio]);

    // Update volume on audio element
    useEffect(() => {
        audio.volume = isMuted ? 0 : volume;
    }, [volume, isMuted, audio]);

    // Update Desktop Control Center
    const updateControlCenter = (track, playing) => {
        const ccNowPlaying = document.querySelector('.mac-control-center .cc-block:last-child');
        if (ccNowPlaying) {
            const titleEl = ccNowPlaying.querySelector('.cc-title');
            if (titleEl) {
                titleEl.textContent = track ? `${track.title} • ${track.artist}` : 'Not Playing';
            }
        }
    };

    // Dynamic Island & OS Media Event Listeners
    useEffect(() => {
        const handlePrev = () => playPrev();
        const handleToggle = () => togglePlay();
        const handleNext = () => playNext();
        const handleSeek = (e) => {
            if (e && e.detail && typeof e.detail.percent === 'number') {
                const totalDur = (audio && audio.duration && !isNaN(audio.duration)) ? audio.duration : (currentTrack ? currentTrack.durationSec || 200 : 200);
                const targetTime = (e.detail.percent / 100) * totalDur;
                audio.currentTime = targetTime;
                setProgress(targetTime);
            }
        };
        const handleFav = () => {
            if (currentTrack) toggleLoved(currentTrack.id);
        };

        window.addEventListener('mac-island-prev', handlePrev);
        window.addEventListener('mac-island-toggle-play', handleToggle);
        window.addEventListener('mac-island-next', handleNext);
        window.addEventListener('mac-island-seek', handleSeek);
        window.addEventListener('mac-island-favorite', handleFav);

        return () => {
            window.removeEventListener('mac-island-prev', handlePrev);
            window.removeEventListener('mac-island-toggle-play', handleToggle);
            window.removeEventListener('mac-island-next', handleNext);
            window.removeEventListener('mac-island-seek', handleSeek);
            window.removeEventListener('mac-island-favorite', handleFav);
        };
    }, [audio, currentTrack, isPlaying, queue, repeatMode, isShuffle, lovedIds]);

    // Audio progress and event listeners
    useEffect(() => {
        const onTimeUpdate = () => {
            setProgress(audio.currentTime);
            const totalDur = audio.duration && !isNaN(audio.duration) ? audio.duration : (currentTrack ? currentTrack.durationSec || 200 : 200);
            setDuration(totalDur);

            if (window.MacIsland && currentTrack) {
                const progPct = Math.round((audio.currentTime / totalDur) * 100);
                window.MacIsland.media(
                    currentTrack.title, 
                    currentTrack.artist, 
                    isPlaying, 
                    currentTrack.cover,
                    formatTime(audio.currentTime),
                    formatTime(totalDur),
                    progPct,
                    '-' + formatTime(totalDur - audio.currentTime),
                    lovedIds.includes(currentTrack.id),
                    currentTrack.format || 'Lossless'
                );
            }
        };

        const onEnded = () => {
            if (repeatMode === 'one') {
                audio.currentTime = 0;
                audio.play().catch(() => {});
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
    }, [audio, repeatMode, currentTrack, isPlaying, isShuffle, queue, lovedIds]);

    // Track Changes
    useEffect(() => {
        if (currentTrack) {
            if (currentTrack.url || currentTrack.previewUrl) {
                audio.src = currentTrack.url || currentTrack.previewUrl;
            }
            if (isPlaying) {
                audio.play().catch(() => {});
            }
            updateControlCenter(currentTrack, isPlaying);
            if (data.storage && currentTrack.id) {
                data.storage.addRecentlyPlayed(currentTrack.id);
            }
        }
    }, [currentTrack]);

    // Play / Pause State
    useEffect(() => {
        if (isPlaying) {
            audio.play().catch(() => {});
            updateControlCenter(currentTrack, true);
            if (window.MacIsland && currentTrack) {
                const totalDur = duration || (currentTrack.durationSec || 200);
                window.MacIsland.media(
                    currentTrack.title, 
                    currentTrack.artist, 
                    true, 
                    currentTrack.cover, 
                    formatTime(progress), 
                    formatTime(totalDur), 
                    Math.round((progress / totalDur) * 100), 
                    '-' + formatTime(totalDur - progress),
                    lovedIds.includes(currentTrack.id),
                    currentTrack.format || 'Lossless'
                );
            }
        } else {
            audio.pause();
            updateControlCenter(currentTrack, false);
            if (window.MacIsland && currentTrack) {
                const totalDur = duration || (currentTrack.durationSec || 200);
                window.MacIsland.media(
                    currentTrack.title, 
                    currentTrack.artist, 
                    false, 
                    currentTrack.cover, 
                    formatTime(progress), 
                    formatTime(totalDur), 
                    Math.round((progress / totalDur) * 100), 
                    '-' + formatTime(totalDur - progress),
                    lovedIds.includes(currentTrack.id),
                    currentTrack.format || 'Lossless'
                );
            }
        }
    }, [isPlaying, lovedIds]);

    const togglePlay = () => setIsPlaying(p => !p);

    const playNext = () => {
        const pool = queue.length > 0 ? queue : data.songs;
        if (!pool.length) return;
        let nextIndex;
        if (isShuffle) {
            nextIndex = Math.floor(Math.random() * pool.length);
        } else {
            const currentIndex = pool.findIndex(s => s.id === currentTrack.id);
            nextIndex = (currentIndex + 1) % pool.length;
        }
        setCurrentTrack(pool[nextIndex]);
        if (!isPlaying) setIsPlaying(true);
    };

    const playPrev = () => {
        const pool = queue.length > 0 ? queue : data.songs;
        if (!pool.length) return;
        const currentIndex = pool.findIndex(s => s.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + pool.length) % pool.length;
        setCurrentTrack(pool[prevIndex]);
        if (!isPlaying) setIsPlaying(true);
    };

    const seek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (audio.duration && !isNaN(audio.duration)) {
            audio.currentTime = percent * audio.duration;
            setProgress(audio.currentTime);
        }
    };

    const playSong = (song, newQueue = null) => {
        if (newQueue) {
            setQueue(newQueue);
        }
        if (currentTrack && currentTrack.id === song.id) {
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

    const toggleLoved = (trackId) => {
        let updated;
        if (lovedIds.includes(trackId)) {
            updated = lovedIds.filter(id => id !== trackId);
        } else {
            updated = [...lovedIds, trackId];
        }
        setLovedIds(updated);
        if (data.storage) data.storage.setLovedIds(updated);
    };

    const togglePinned = (id) => {
        let updated;
        if (pinnedIds.includes(id)) {
            updated = pinnedIds.filter(x => x !== id);
        } else {
            updated = [...pinnedIds, id];
        }
        setPinnedIds(updated);
        if (data.storage) data.storage.setPinnedIds(updated);
    };

    const createNewPlaylist = (name, desc) => {
        const newPl = {
            id: 'pl-custom-' + Date.now(),
            name: name || 'New Playlist',
            description: desc || 'Custom created playlist in Apple Music',
            curator: 'Joy Kumbhakar',
            cover: createGradientCover(name || 'Playlist', 'Joy', null, null, Math.floor(Math.random() * 8)),
            tracks: [currentTrack ? currentTrack.id : data.songs[0].id]
        };
        const updated = [...userPlaylists, newPl];
        setUserPlaylists(updated);
        if (data.storage) data.storage.saveUserPlaylists(updated);
        navigateTo('PlaylistDetail', newPl);
        setShowCreatePlaylist(false);
    };

    const addToPlaylist = (playlistId, trackId) => {
        const updated = userPlaylists.map(pl => {
            if (pl.id === playlistId && !pl.tracks.includes(trackId)) {
                return { ...pl, tracks: [...pl.tracks, trackId] };
            }
            return pl;
        });
        setUserPlaylists(updated);
        if (data.storage) data.storage.saveUserPlaylists(updated);
    };

    const removeFromPlaylist = (playlistId, trackId) => {
        const updated = userPlaylists.map(pl => {
            if (pl.id === playlistId) {
                return { ...pl, tracks: pl.tracks.filter(t => t !== trackId) };
            }
            return pl;
        });
        setUserPlaylists(updated);
        if (data.storage) data.storage.saveUserPlaylists(updated);
        if (selectedPlaylist && selectedPlaylist.id === playlistId) {
            setSelectedPlaylist(updated.find(p => p.id === playlistId));
        }
    };

    const playNextInQueue = (track) => {
        const curIdx = queue.findIndex(t => t.id === currentTrack.id);
        const newQueue = [...queue.filter(t => t.id !== track.id)];
        newQueue.splice(curIdx + 1, 0, track);
        setQueue(newQueue);
    };

    const addToQueueBottom = (track) => {
        if (!queue.some(t => t.id === track.id)) {
            setQueue([...queue, track]);
        }
    };

    // Dynamic Island Action Listeners
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
    }, [currentTrack, isPlaying, isShuffle, queue]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.code === 'Space') {
                e.preventDefault();
                togglePlay();
            } else if (e.code === 'ArrowRight' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                playNext();
            } else if (e.code === 'ArrowLeft' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                playPrev();
            } else if (e.key === 'l' || e.key === 'L') {
                setShowLyrics(v => !v);
            } else if (e.key === 'u' || e.key === 'U') {
                setShowQueue(v => !v);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, currentTrack, queue, isShuffle]);

    // Close context menu on global click
    useEffect(() => {
        const handleGlobalClick = () => {
            if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false });
        };
        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [contextMenu]);

    return (
        <PlayerContext.Provider value={{ 
            audio, currentTrack, setCurrentTrack, isPlaying, togglePlay, playNext, playPrev, 
            progress, duration, seek, playSong, data, songs,
            activeTab, setActiveTab, navigateTo, goBack, goForward, canGoBack: historyIndex > 0, canGoForward: historyIndex < navHistory.length - 1,
            selectedAlbum, setSelectedAlbum, selectedArtist, setSelectedArtist, selectedPlaylist, setSelectedPlaylist,
            searchQuery, setSearchQuery, searchFilter, setSearchFilter,
            isShuffle, setIsShuffle, repeatMode, toggleRepeat,
            volume, setVolume, isMuted, setIsMuted,
            queue, setQueue, playNextInQueue, addToQueueBottom,
            pinnedIds, togglePinned, lovedIds, toggleLoved,
            userPlaylists, createNewPlaylist, addToPlaylist, removeFromPlaylist,
            showLyrics, setShowLyrics, showQueue, setShowQueue,
            showVideo, setShowVideo, showAirPlay, setShowAirPlay,
            showEqualizer, setShowEqualizer, showSongInfo, setShowSongInfo,
            showCreatePlaylist, setShowCreatePlaylist,
            contextMenu, setContextMenu, equalizerPreset, setEqualizerPreset,
            airplayDevice, setAirplayDevice
        }}>
            <div id="music-react-root" onContextMenu={(e) => e.preventDefault()}>
                <div className="am-container">
                    <Sidebar />
                    <MainContent />
                    <FloatingPlayer />
                    
                    {/* Popovers & Drawers */}
                    {showLyrics && <LyricsPopover />}
                    {showQueue && <QueuePopover />}
                    {showVideo && <VideoPopover />}
                    {showAirPlay && <AirPlayPopover />}
                    {showEqualizer && <EqualizerPopover />}
                    {showSongInfo && <SongInfoModal song={showSongInfo} onClose={() => setShowSongInfo(null)} />}
                    {showCreatePlaylist && <CreatePlaylistModal onClose={() => setShowCreatePlaylist(false)} onSave={createNewPlaylist} />}
                    {contextMenu.visible && <ContextMenu {...contextMenu} />}
                </div>
            </div>
        </PlayerContext.Provider>
    );
};

/* ==========================================================================
   Sidebar Component
   ========================================================================== */
const Sidebar = () => {
    const { activeTab, navigateTo, pinnedIds, data, userPlaylists, setShowCreatePlaylist } = useContext(PlayerContext);

    const topItems = [
        { id: 'Search', icon: 'search', label: 'Search' },
        { id: 'Home', icon: 'home', label: 'Home' },
        { id: 'New', icon: 'grid', label: 'New' },
        { id: 'Radio', icon: 'radio', label: 'Radio' }
    ];
    
    const libItems = [
        { id: 'Pins', icon: 'pin', label: 'Pins', count: pinnedIds.length },
        { id: 'Recently Added', icon: 'clock', label: 'Recently Added' },
        { id: 'Artists', icon: 'mic', label: 'Artists' },
        { id: 'Albums', icon: 'disc', label: 'Albums' },
        { id: 'Songs', icon: 'music', label: 'Songs', count: data.songs ? data.songs.length : 0 },
        { id: 'Music Videos', icon: 'film', label: 'Music Videos' },
        { id: 'Made for You', icon: 'user', label: 'Made for You' }
    ];

    return (
        <div className="am-sidebar">
            <div className="am-sidebar-section">
                {topItems.map(item => (
                    <div 
                        key={item.id}
                        className={`am-nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => navigateTo(item.id)}
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
                        key={item.id}
                        className={`am-nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => navigateTo(item.id)}
                    >
                        <LucideIcon name={item.icon} size={18} />
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.count !== undefined && item.count > 0 && (
                            <span className="am-sidebar-count">{item.count}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="am-sidebar-section">
                <div className="am-sidebar-title">Store</div>
                <div 
                    className={`am-nav-item ${activeTab === 'iTunes Store' ? 'active' : ''}`} 
                    onClick={() => navigateTo('iTunes Store')}
                >
                    <LucideIcon name="shopping-bag" size={18} />
                    <span>iTunes Store</span>
                </div>
            </div>
            
            <div className="am-sidebar-section" style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '8px' }}>
                    <div className="am-sidebar-title" style={{ paddingRight: 0 }}>Playlists</div>
                    <button 
                        className="am-sidebar-add-btn" 
                        title="New Playlist" 
                        onClick={() => setShowCreatePlaylist(true)}
                    >
                        <LucideIcon name="plus" size={14} color="#8e8e93" />
                    </button>
                </div>
                
                <div 
                    className={`am-nav-item ${activeTab === 'All Playlists' ? 'active' : ''}`} 
                    onClick={() => navigateTo('All Playlists')}
                >
                    <LucideIcon name="list-music" size={18} />
                    <span>All Playlists</span>
                </div>

                {/* Custom Playlists */}
                {userPlaylists.map(pl => (
                    <div 
                        key={pl.id}
                        className={`am-nav-item ${activeTab === 'PlaylistDetail' && pl.id === pl.id ? 'active' : ''}`}
                        onClick={() => navigateTo('PlaylistDetail', pl)}
                    >
                        <LucideIcon name="music" size={16} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pl.name}</span>
                    </div>
                ))}
            </div>

            <div className="am-sidebar-profile" onClick={() => navigateTo('Made for You')}>
                <SafeImage src="images/Avatars/Profile-avatar.png" alt="Profile" />
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <span className="am-sidebar-profile-name">Joy Kumbhakar</span>
                    <span style={{ fontSize: '11px', color: '#8e8e93' }}>Apple One Subscriber</span>
                </div>
            </div>
        </div>
    );
};

/* ==========================================================================
   Top Navigation Bar
   ========================================================================== */
const TopBar = () => {
    const { 
        searchQuery, setSearchQuery, activeTab, navigateTo, 
        goBack, goForward, canGoBack, canGoForward,
        showAirPlay, setShowAirPlay, showEqualizer, setShowEqualizer 
    } = useContext(PlayerContext);

    return (
        <div className="am-top-bar window-header">
            {/* History arrows */}
            <div className="am-nav-arrows">
                <button 
                    className={`am-arrow-btn ${!canGoBack ? 'disabled' : ''}`} 
                    onClick={goBack} 
                    title="Back"
                >
                    <LucideIcon name="chevron-left" size={16} />
                </button>
                <button 
                    className={`am-arrow-btn ${!canGoForward ? 'disabled' : ''}`} 
                    onClick={goForward} 
                    title="Forward"
                >
                    <LucideIcon name="chevron-right" size={16} />
                </button>
            </div>

            {/* Search Input */}
            <div className="am-search-bar">
                <LucideIcon name="search" size={14} color="#8e8e93" />
                <input 
                    type="text" 
                    placeholder="Search Apple Music" 
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (activeTab !== 'Search' && e.target.value.trim() !== '') {
                            navigateTo('Search');
                        }
                    }}
                    onFocus={() => {
                        if (activeTab !== 'Search') navigateTo('Search');
                    }}
                />
                {searchQuery && (
                    <LucideIcon 
                        name="x-circle" 
                        size={14} 
                        color="#8e8e93" 
                        className="am-search-clear" 
                        onClick={() => setSearchQuery('')} 
                    />
                )}
            </div>

            {/* Top Center Tabs */}
            <div className="am-top-tabs">
                <div 
                    className={`am-top-tab ${['Home', 'New', 'Radio', 'Search'].includes(activeTab) ? 'active' : ''}`} 
                    onClick={() => navigateTo('Home')}
                >
                    Apple Music
                </div>
                <div 
                    className={`am-top-tab ${['Songs', 'Albums', 'Artists', 'Pins', 'Recently Added'].includes(activeTab) ? 'active' : ''}`} 
                    onClick={() => navigateTo('Songs')}
                >
                    Library
                </div>
                <div 
                    className={`am-top-tab ${activeTab === 'iTunes Store' ? 'active' : ''}`} 
                    onClick={() => navigateTo('iTunes Store')}
                >
                    Store
                </div>
            </div>

            {/* Right Mini Action Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                    className={`am-top-icon-btn ${showEqualizer ? 'active' : ''}`} 
                    title="Equalizer Presets"
                    onClick={() => setShowEqualizer(!showEqualizer)}
                >
                    <LucideIcon name="sliders" size={16} />
                </button>
                <button 
                    className={`am-top-icon-btn ${showAirPlay ? 'active' : ''}`} 
                    title="AirPlay Audio Devices"
                    onClick={() => setShowAirPlay(!showAirPlay)}
                >
                    <LucideIcon name="airplay" size={16} />
                </button>
            </div>
        </div>
    );
};

/* ==========================================================================
   Main Content Router
   ========================================================================== */
const MainContent = () => {
    const { activeTab } = useContext(PlayerContext);

    return (
        <div className="am-main">
            <TopBar />
            <div className="am-content">
                {activeTab === 'Home' && <HomeView />}
                {activeTab === 'New' && <NewView />}
                {activeTab === 'Radio' && <RadioView />}
                {activeTab === 'Search' && <SearchView />}
                {activeTab === 'Pins' && <PinsView />}
                {activeTab === 'Recently Added' && <RecentlyAddedView />}
                {activeTab === 'Artists' && <ArtistsView />}
                {activeTab === 'ArtistDetail' && <ArtistDetailView />}
                {activeTab === 'Albums' && <AlbumsView />}
                {activeTab === 'AlbumDetail' && <AlbumDetailView />}
                {activeTab === 'Songs' && <SongsView />}
                {activeTab === 'Music Videos' && <MusicVideosView />}
                {activeTab === 'Made for You' && <MadeForYouView />}
                {activeTab === 'iTunes Store' && <StoreView />}
                {activeTab === 'All Playlists' && <AllPlaylistsView />}
                {activeTab === 'PlaylistDetail' && <PlaylistDetailView />}
            </div>
        </div>
    );
};

/* ==========================================================================
   Home View with Spotlight Hero Carousel & Professional Gradients
   ========================================================================== */
const HomeView = () => {
    const { data, playSong, navigateTo } = useContext(PlayerContext);
    const [heroIdx, setHeroIdx] = useState(0);
    const heroTracks = data.songs.slice(0, 5);
    const currentHero = heroTracks[heroIdx] || heroTracks[0];

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroIdx(prev => (prev + 1) % heroTracks.length);
        }, 6500);
        return () => clearInterval(timer);
    }, [heroTracks.length]);

    return (
        <div>
            {/* Hero Spotlight Premiere Banner with Dynamic Professional Gradients */}
            {currentHero && (
                <div 
                    className="am-hero-banner" 
                    style={{ 
                        background: currentHero.bannerGrad || 'linear-gradient(135deg, #180210 0%, #4d0a2f 35%, #b81545 70%, #ff4b4b 100%)' 
                    }}
                >
                    <div className="am-hero-content">
                        <span className="am-hero-badge">SPOTLIGHT PREMIERE</span>
                        <h1 className="am-hero-title">{currentHero.title}</h1>
                        <p className="am-hero-subtitle">{currentHero.artist} • {currentHero.album}</p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                            <button className="am-pill-btn primary" onClick={() => playSong(currentHero)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l12 8-12 8V4z"/></svg>
                                <span>Listen Now</span>
                            </button>
                            <button className="am-pill-btn secondary" onClick={() => {
                                const alb = data.albums.find(a => a.tracks && a.tracks.includes(currentHero.id)) || data.albums[0];
                                navigateTo('AlbumDetail', alb);
                            }}>
                                <span>View Album</span>
                            </button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <div className="am-hero-artwork-wrapper" onClick={() => playSong(currentHero)}>
                            <SafeImage src={currentHero.cover} song={currentHero} className="am-hero-artwork" alt={currentHero.title} />
                        </div>
                        {/* Carousel Dots */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {heroTracks.map((_, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => setHeroIdx(i)}
                                    style={{
                                        width: i === heroIdx ? '18px' : '6px',
                                        height: '6px',
                                        borderRadius: '3px',
                                        background: i === heroIdx ? '#ffffff' : 'rgba(255,255,255,0.4)',
                                        cursor: 'pointer',
                                        transition: 'all 0.25s ease'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Top Picks Section */}
            <div className="am-section-header">
                <div className="am-section-title" onClick={() => navigateTo('Songs')}>
                    Top Picks for You <LucideIcon name="chevron-right" size={15} strokeWidth={2.2} />
                </div>
            </div>
            <div className="am-scroll-row">
                {data.songs.slice(0, 6).map(song => (
                    <div className="am-card" key={song.id} onClick={() => playSong(song)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={song.cover} song={song} className="am-card-img" alt={song.title} />
                            <div className="am-card-play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg>
                            </div>
                        </div>
                        <div className="am-card-title">{song.title}</div>
                        <div className="am-card-subtitle">{song.artist}</div>
                    </div>
                ))}
            </div>

            {/* Featured Albums Section */}
            <div className="am-section-header">
                <div className="am-section-title" onClick={() => navigateTo('Albums')}>
                    Featured Albums <LucideIcon name="chevron-right" size={15} strokeWidth={2.2} />
                </div>
            </div>
            <div className="am-scroll-row">
                {data.albums.map(alb => (
                    <div className="am-card" key={alb.id} onClick={() => navigateTo('AlbumDetail', alb)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={alb.cover} song={{ title: alb.title, artist: alb.artist }} className="am-card-img" alt={alb.title} />
                            <div className="am-card-play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg>
                            </div>
                        </div>
                        <div className="am-card-title">{alb.title}</div>
                        <div className="am-card-subtitle">{alb.artist} • {alb.year}</div>
                    </div>
                ))}
            </div>

            {/* Curated Playlists */}
            <div className="am-section-header">
                <div className="am-section-title" onClick={() => navigateTo('All Playlists')}>
                    Curated Playlists <LucideIcon name="chevron-right" size={15} strokeWidth={2.2} />
                </div>
            </div>
            <div className="am-scroll-row">
                {data.playlists.map(pl => (
                    <div className="am-card" key={pl.id} onClick={() => navigateTo('PlaylistDetail', pl)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={pl.cover} song={{ title: pl.name, artist: pl.curator }} className="am-card-img" alt={pl.name} />
                            <div className="am-card-play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg>
                            </div>
                        </div>
                        <div className="am-card-title">{pl.name}</div>
                        <div className="am-card-subtitle">{pl.curator}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   New / Browse View
   ========================================================================== */
const NewView = () => {
    const { data, playSong, navigateTo } = useContext(PlayerContext);
    const [selectedGenre, setSelectedGenre] = useState('All');

    const genres = ['All', 'Hip-Hop', 'Pop', 'Phonk', 'Synth-Pop', 'Indie', 'Soundtrack'];

    const filtered = selectedGenre === 'All' 
        ? data.songs 
        : data.songs.filter(s => s.genre && s.genre.toLowerCase().includes(selectedGenre.toLowerCase()));

    return (
        <div>
            <div className="am-header">Browse & New Releases</div>

            {/* Genre Filter Pills */}
            <div className="am-genre-pill-bar">
                {genres.map(g => (
                    <button 
                        key={g} 
                        className={`am-genre-pill ${selectedGenre === g ? 'active' : ''}`}
                        onClick={() => setSelectedGenre(g)}
                    >
                        {g}
                    </button>
                ))}
            </div>

            {/* Top Charts Grid */}
            <div className="am-section-header">
                <div className="am-section-title">Global Top Charts & Trends</div>
            </div>
            <div className="am-song-list">
                {filtered.slice(0, 5).map((song, idx) => (
                    <div key={song.id} className="am-song-row" onClick={() => playSong(song)}>
                        <div className="am-song-index" style={{ fontWeight: '700', color: idx < 3 ? '#fa243c' : undefined }}>{idx + 1}</div>
                        <SafeImage src={song.cover} song={song} className="am-song-cover" alt={song.title} />
                        <div className="am-song-info">
                            <div className="am-song-title">{song.title}</div>
                            <div className="am-song-artist">{song.artist}</div>
                        </div>
                        <div className="am-song-album">{song.album}</div>
                        <div className="am-song-time">{song.duration}</div>
                    </div>
                ))}
            </div>

            {/* Spatial Audio & Lossless Showcase */}
            <div className="am-section-header" style={{ marginTop: '32px' }}>
                <div className="am-section-title">Spatial Audio with Dolby Atmos</div>
            </div>
            <div className="am-scroll-row">
                {data.albums.slice(0, 4).map(alb => (
                    <div className="am-card" key={alb.id} onClick={() => navigateTo('AlbumDetail', alb)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={alb.cover} song={{ title: alb.title, artist: alb.artist }} className="am-card-img" alt={alb.title} />
                            <div className="am-card-play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg>
                            </div>
                        </div>
                        <div className="am-card-title">{alb.title}</div>
                        <div className="am-card-subtitle">{alb.artist} • Lossless</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   Radio View
   ========================================================================== */
const RadioView = () => {
    const { data, playSong } = useContext(PlayerContext);

    return (
        <div>
            <div className="am-header">Radio</div>
            <div className="am-radio-grid">
                {data.radioStations.map(station => {
                    const sampleTrack = data.songs.find(s => s.id === station.sampleTrackId) || data.songs[0];
                    return (
                        <div 
                            key={station.id} 
                            className="am-radio-card" 
                            style={{ background: station.color }}
                            onClick={() => playSong(sampleTrack)}
                        >
                            <div className="am-radio-badge">{station.badge}</div>
                            <div className="am-radio-content">
                                <LucideIcon name="radio" size={32} color="#ffffff" style={{ marginBottom: '8px' }} />
                                <h3 className="am-radio-name">{station.name}</h3>
                                <p className="am-radio-host">{station.host}</p>
                                <p className="am-radio-freq">{station.frequency}</p>
                                <button className="am-radio-listen-btn">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l12 8-12 8V4z"/></svg>
                                    <span>Tune In</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Broadcast Schedule */}
            <div className="am-section-header" style={{ marginTop: '36px' }}>
                <div className="am-section-title">Today's Broadcast Schedule</div>
            </div>
            <div className="am-schedule-list">
                <div className="am-schedule-row">
                    <div className="am-schedule-time">09:00 - 12:00</div>
                    <div className="am-schedule-info">
                        <div className="am-schedule-title">The Apple Music 1 Morning Show</div>
                        <div className="am-schedule-desc">Zane Lowe with today's hottest global world records and premieres.</div>
                    </div>
                </div>
                <div className="am-schedule-row">
                    <div className="am-schedule-time">12:00 - 15:00</div>
                    <div className="am-schedule-info">
                        <div className="am-schedule-title">Afternoon Essentials & Deep Grooves</div>
                        <div className="am-schedule-desc">Ebro Darden breaks down top hip-hop releases and community picks.</div>
                    </div>
                </div>
                <div className="am-schedule-row">
                    <div className="am-schedule-time">18:00 - 22:00</div>
                    <div className="am-schedule-info">
                        <div className="am-schedule-title">Night Tokyo Phonk & Synth Session</div>
                        <div className="am-schedule-desc">Adrenaline-packed drift phonk and futuristic electronic mixes live.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ==========================================================================
   Search View
   ========================================================================== */
const SearchView = () => {
    const { data, searchQuery, setSearchQuery, playSong, navigateTo, searchFilter, setSearchFilter } = useContext(PlayerContext);

    const categories = [
        { name: 'Apple Music Radio', color: 'linear-gradient(135deg, #e50914 0%, #fa243c 50%, #764ba2 100%)', icon: 'radio' },
        { name: 'Pop & Chart Hits', color: 'linear-gradient(135deg, #f77062 0%, #fe5196 50%, #f093fb 100%)', icon: 'heart' },
        { name: 'Hip-Hop & Rap', color: 'linear-gradient(135deg, #02140d 0%, #10754e 50%, #00e676 100%)', icon: 'mic' },
        { name: 'Phonk & Drift', color: 'linear-gradient(135deg, #09122c 0%, #1e3c72 50%, #00f2fe 100%)', icon: 'flame' },
        { name: 'R&B & Soul', color: 'linear-gradient(135deg, #140003 0%, #45030d 50%, #fa243c 100%)', icon: 'disc' },
        { name: 'Top 100 Charts', color: 'linear-gradient(135deg, #1a0f00 0%, #b86400 50%, #ffbb00 100%)', icon: 'trending-up' },
        { name: 'Music Videos', color: 'linear-gradient(135deg, #17041a 0%, #9217a6 50%, #e040fb 100%)', icon: 'video' },
        { name: 'Acoustic & Chill', color: 'linear-gradient(135deg, #0b302c 0%, #11998e 50%, #38ef7d 100%)', icon: 'music' }
    ];

    const q = searchQuery.toLowerCase().trim();

    const matchedSongs = q ? data.songs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q) || s.album.toLowerCase().includes(q)) : [];
    const matchedAlbums = q ? data.albums.filter(a => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q)) : [];
    const matchedArtists = q ? data.artists.filter(ar => ar.name.toLowerCase().includes(q)) : [];

    return (
        <div>
            {q !== '' ? (
                <div>
                    <div className="am-header">Results for "{searchQuery}"</div>

                    {/* Filter Bar */}
                    <div className="am-genre-pill-bar">
                        {['all', 'songs', 'artists', 'albums'].map(f => (
                            <button 
                                key={f} 
                                className={`am-genre-pill ${searchFilter === f ? 'active' : ''}`}
                                onClick={() => setSearchFilter(f)}
                            >
                                {f.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Matched Artists */}
                    {(searchFilter === 'all' || searchFilter === 'artists') && matchedArtists.length > 0 && (
                        <div>
                            <div className="am-section-title" style={{ marginTop: '20px' }}>Artists</div>
                            <div className="am-scroll-row">
                                {matchedArtists.map(ar => (
                                    <div className="am-artist-card" key={ar.id} onClick={() => navigateTo('ArtistDetail', ar)}>
                                        <SafeImage src={ar.image} className="am-artist-avatar" alt={ar.name} />
                                        <div className="am-artist-name">{ar.name}</div>
                                        <div className="am-artist-sub">{ar.monthlyListeners} monthly listeners</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Matched Songs */}
                    {(searchFilter === 'all' || searchFilter === 'songs') && (
                        <div>
                            <div className="am-section-title" style={{ marginTop: '20px' }}>Songs ({matchedSongs.length})</div>
                            {matchedSongs.length > 0 ? (
                                <div className="am-song-list">
                                    {matchedSongs.map((song, idx) => (
                                        <div key={song.id} className="am-song-row" onClick={() => playSong(song)}>
                                            <div className="am-song-index">{idx + 1}</div>
                                            <SafeImage src={song.cover} song={song} className="am-song-cover" alt={song.title} />
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
                                <p style={{ color: '#8e8e93', fontSize: '13px', marginTop: '8px' }}>No songs matched your query.</p>
                            )}
                        </div>
                    )}

                    {/* Matched Albums */}
                    {(searchFilter === 'all' || searchFilter === 'albums') && matchedAlbums.length > 0 && (
                        <div>
                            <div className="am-section-title" style={{ marginTop: '24px' }}>Albums ({matchedAlbums.length})</div>
                            <div className="am-scroll-row">
                                {matchedAlbums.map(alb => (
                                    <div className="am-card" key={alb.id} onClick={() => navigateTo('AlbumDetail', alb)}>
                                        <div className="am-card-img-wrapper">
                                            <SafeImage src={alb.cover} className="am-card-img" alt={alb.title} />
                                        </div>
                                        <div className="am-card-title">{alb.title}</div>
                                        <div className="am-card-subtitle">{alb.artist}</div>
                                    </div>
                                ))}
                            </div>
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
                                style={{ background: cat.color }}
                                onClick={() => setSearchQuery(cat.name)}
                            >
                                <span>{cat.name}</span>
                                <LucideIcon name={cat.icon} size={64} color="rgba(255,255,255,0.2)" className="am-category-bg-icon" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

/* ==========================================================================
   Pins View
   ========================================================================== */
const PinsView = () => {
    const { data, pinnedIds, togglePinned, playSong, navigateTo } = useContext(PlayerContext);
    
    const pinnedSongs = data.songs.filter(s => pinnedIds.includes(s.id));
    const pinnedAlbums = data.albums.filter(a => pinnedIds.includes(a.id));
    const pinnedPlaylists = data.playlists.filter(p => pinnedIds.includes(p.id));

    const totalCount = pinnedSongs.length + pinnedAlbums.length + pinnedPlaylists.length;

    return (
        <div>
            <div className="am-header">Pins</div>
            {totalCount === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '80px', color: '#8e8e93' }}>
                    <LucideIcon name="pin" size={44} color="#fa243c" style={{ marginBottom: '16px' }} />
                    <h2 style={{ color: '#1d1d1f' }}>No Pinned Items</h2>
                    <p style={{ fontSize: '13px', marginTop: '6px' }}>Right click songs or click the pin icon to keep favorites handy.</p>
                </div>
            ) : (
                <div>
                    {pinnedSongs.length > 0 && (
                        <div>
                            <div className="am-section-title">Pinned Songs</div>
                            <div className="am-song-list">
                                {pinnedSongs.map((song, idx) => (
                                    <div key={song.id} className="am-song-row" onClick={() => playSong(song)}>
                                        <div className="am-song-index">{idx + 1}</div>
                                        <SafeImage src={song.cover} song={song} className="am-song-cover" alt={song.title} />
                                        <div className="am-song-info">
                                            <div className="am-song-title">{song.title}</div>
                                            <div className="am-song-artist">{song.artist}</div>
                                        </div>
                                        <div className="am-song-album">{song.album}</div>
                                        <button 
                                            className="am-action-btn" 
                                            title="Unpin" 
                                            onClick={(e) => { e.stopPropagation(); togglePinned(song.id); }}
                                        >
                                            <LucideIcon name="pin" size={15} color="#fa243c" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {pinnedAlbums.length > 0 && (
                        <div style={{ marginTop: '28px' }}>
                            <div className="am-section-title">Pinned Albums</div>
                            <div className="am-scroll-row">
                                {pinnedAlbums.map(alb => (
                                    <div className="am-card" key={alb.id} onClick={() => navigateTo('AlbumDetail', alb)}>
                                        <div className="am-card-img-wrapper">
                                            <SafeImage src={alb.cover} className="am-card-img" alt={alb.title} />
                                        </div>
                                        <div className="am-card-title">{alb.title}</div>
                                        <div className="am-card-subtitle">{alb.artist}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

/* ==========================================================================
   Recently Added View
   ========================================================================== */
const RecentlyAddedView = () => {
    const { data, navigateTo, playSong } = useContext(PlayerContext);

    return (
        <div>
            <div className="am-header">Recently Added</div>
            <div className="am-albums-grid">
                {data.albums.map(alb => (
                    <div className="am-card-lg" key={alb.id} onClick={() => navigateTo('AlbumDetail', alb)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={alb.cover} song={{ title: alb.title, artist: alb.artist }} className="am-card-img" alt={alb.title} />
                            <div className="am-card-play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg>
                            </div>
                        </div>
                        <div className="am-card-title" style={{ marginTop: '8px' }}>{alb.title}</div>
                        <div className="am-card-subtitle">{alb.artist} • Added Today</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   Artists & Artist Detail View
   ========================================================================== */
const ArtistsView = () => {
    const { data, navigateTo } = useContext(PlayerContext);

    return (
        <div>
            <div className="am-header">Artists</div>
            <div className="am-artists-grid">
                {data.artists.map(ar => (
                    <div className="am-artist-card" key={ar.id} onClick={() => navigateTo('ArtistDetail', ar)}>
                        <SafeImage src={ar.image} song={{ title: ar.name, artist: 'Artist Spotlight' }} className="am-artist-avatar" alt={ar.name} />
                        <div className="am-artist-name">{ar.name}</div>
                        <div className="am-artist-sub">{ar.monthlyListeners} Monthly Listeners</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ArtistDetailView = () => {
    const { selectedArtist, data, playSong, navigateTo } = useContext(PlayerContext);
    if (!selectedArtist) return null;

    const topSongs = data.songs.filter(s => s.artist.toLowerCase().includes(selectedArtist.name.toLowerCase()) || (selectedArtist.topSongIds && selectedArtist.topSongIds.includes(s.id)));

    return (
        <div>
            {/* Artist Hero Header */}
            <div className="am-artist-hero">
                <SafeImage src={selectedArtist.image} song={{ title: selectedArtist.name, artist: 'Artist Spotlight' }} className="am-artist-hero-img" alt={selectedArtist.name} />
                <div className="am-artist-hero-info">
                    <span className="am-hero-badge">ARTIST SPOTLIGHT</span>
                    <h1 className="am-artist-hero-name">{selectedArtist.name}</h1>
                    <p className="am-artist-hero-bio">{selectedArtist.bio}</p>
                    <p style={{ fontSize: '13px', color: '#8e8e93', marginTop: '6px' }}>{selectedArtist.monthlyListeners} Monthly Listeners</p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button className="am-pill-btn primary" onClick={() => topSongs[0] && playSong(topSongs[0])}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l12 8-12 8V4z"/></svg>
                            <span>Play Top Songs</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Top Songs Table */}
            <div className="am-section-title" style={{ marginTop: '28px' }}>Top Songs</div>
            <div className="am-song-list" style={{ marginTop: '12px' }}>
                {topSongs.map((song, idx) => (
                    <div key={song.id} className="am-song-row" onClick={() => playSong(song)}>
                        <div className="am-song-index">{idx + 1}</div>
                        <SafeImage src={song.cover} song={song} className="am-song-cover" alt={song.title} />
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

/* ==========================================================================
   Albums & Album Detail View
   ========================================================================== */
const AlbumsView = () => {
    const { data, navigateTo } = useContext(PlayerContext);

    return (
        <div>
            <div className="am-header">Albums</div>
            <div className="am-albums-grid">
                {data.albums.map(alb => (
                    <div className="am-card-lg" key={alb.id} onClick={() => navigateTo('AlbumDetail', alb)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={alb.cover} song={{ title: alb.title, artist: alb.artist }} className="am-card-img" alt={alb.title} />
                            <div className="am-card-play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg>
                            </div>
                        </div>
                        <div className="am-card-title" style={{ marginTop: '8px' }}>{alb.title}</div>
                        <div className="am-card-subtitle">{alb.artist} • {alb.year}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AlbumDetailView = () => {
    const { selectedAlbum, data, playSong, setIsShuffle } = useContext(PlayerContext);
    if (!selectedAlbum) return null;

    const albumSongs = data.songs.filter(s => selectedAlbum.tracks && selectedAlbum.tracks.includes(s.id));

    return (
        <div>
            {/* Album Header Banner */}
            <div className="am-album-header">
                <SafeImage src={selectedAlbum.cover} song={{ title: selectedAlbum.title, artist: selectedAlbum.artist }} className="am-album-header-cover" alt={selectedAlbum.title} />
                <div className="am-album-header-info">
                    <span className="am-hero-badge">{selectedAlbum.genre}</span>
                    <h1 className="am-album-header-title">{selectedAlbum.title}</h1>
                    <h3 className="am-album-header-artist">{selectedAlbum.artist}</h3>
                    <p className="am-album-header-desc">{selectedAlbum.description}</p>
                    <p style={{ fontSize: '12px', color: '#8e8e93', marginTop: '6px' }}>
                        {selectedAlbum.year} • {albumSongs.length} Songs • Lossless • Apple Digital Master
                    </p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '18px' }}>
                        <button className="am-pill-btn primary" onClick={() => albumSongs[0] && playSong(albumSongs[0], albumSongs)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l12 8-12 8V4z"/></svg>
                            <span>Play</span>
                        </button>
                        <button className="am-pill-btn secondary" onClick={() => {
                            if (albumSongs[0]) {
                                setIsShuffle(true);
                                playSong(albumSongs[Math.floor(Math.random() * albumSongs.length)], albumSongs);
                            }
                        }}>
                            <span>Shuffle</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tracklist Table */}
            <div className="am-song-list" style={{ marginTop: '24px' }}>
                <div className="am-song-table-header">
                    <div className="am-song-index">#</div>
                    <div style={{ flex: 1 }}>Title</div>
                    <div style={{ flex: 1 }}>Artist</div>
                    <div style={{ width: '48px', textAlign: 'right' }}>Time</div>
                </div>
                {albumSongs.map((song, idx) => (
                    <div key={song.id} className="am-song-row" onClick={() => playSong(song, albumSongs)}>
                        <div className="am-song-index">{idx + 1}</div>
                        <div className="am-song-info">
                            <div className="am-song-title">{song.title}</div>
                        </div>
                        <div className="am-song-artist" style={{ flex: 1 }}>{song.artist}</div>
                        <div className="am-song-time">{song.duration}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   Songs Table View (Full macOS Data Grid)
   ========================================================================== */
const SongsView = () => {
    const { data, currentTrack, playSong, lovedIds, toggleLoved, setContextMenu, setShowSongInfo } = useContext(PlayerContext);
    const [sortKey, setSortKey] = useState('title');
    const [sortAsc, setSortAsc] = useState(true);

    const sortedSongs = useMemo(() => {
        const list = [...data.songs];
        list.sort((a, b) => {
            let valA = a[sortKey] || '';
            let valB = b[sortKey] || '';
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            if (valA < valB) return sortAsc ? -1 : 1;
            if (valA > valB) return sortAsc ? 1 : -1;
            return 0;
        });
        return list;
    }, [data.songs, sortKey, sortAsc]);

    const handleSort = (key) => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else {
            setSortKey(key);
            setSortAsc(true);
        }
    };

    const handleContextMenu = (e, song) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            track: song
        });
    };

    return (
        <div>
            <div className="am-header">Songs</div>
            <div className="am-song-list">
                <div className="am-song-table-header">
                    <div className="am-song-index">#</div>
                    <div style={{ width: '28px' }}></div>
                    <div style={{ flex: 2, cursor: 'pointer' }} onClick={() => handleSort('title')}>
                        Title {sortKey === 'title' && (sortAsc ? '▲' : '▼')}
                    </div>
                    <div style={{ flex: 1.5, cursor: 'pointer' }} onClick={() => handleSort('artist')}>
                        Artist {sortKey === 'artist' && (sortAsc ? '▲' : '▼')}
                    </div>
                    <div style={{ flex: 1.5, cursor: 'pointer' }} onClick={() => handleSort('album')}>
                        Album {sortKey === 'album' && (sortAsc ? '▲' : '▼')}
                    </div>
                    <div style={{ width: '60px', textAlign: 'right', cursor: 'pointer' }} onClick={() => handleSort('duration')}>
                        Time {sortKey === 'duration' && (sortAsc ? '▲' : '▼')}
                    </div>
                </div>

                {sortedSongs.map((song, idx) => {
                    const isCurrent = currentTrack && currentTrack.id === song.id;
                    const isLoved = lovedIds.includes(song.id);
                    return (
                        <div 
                            key={song.id} 
                            className={`am-song-row ${isCurrent ? 'active' : ''}`}
                            onClick={() => playSong(song)}
                            onContextMenu={(e) => handleContextMenu(e, song)}
                            onDoubleClick={() => playSong(song)}
                        >
                            <div className="am-song-index">{idx + 1}</div>
                            <button 
                                className="am-song-heart-btn" 
                                title={isLoved ? 'Loved' : 'Love Song'}
                                onClick={(e) => { e.stopPropagation(); toggleLoved(song.id); }}
                            >
                                <LucideIcon name={isLoved ? 'heart-fill' : 'heart'} size={14} color={isLoved ? '#fa243c' : '#c7c7cc'} />
                            </button>
                            <SafeImage src={song.cover} song={song} className="am-song-cover" alt={song.title} />
                            <div className="am-song-info" style={{ flex: 2 }}>
                                <div className="am-song-title">{song.title}</div>
                                <span className="am-lossless-badge">LOSSLESS</span>
                            </div>
                            <div className="am-song-artist" style={{ flex: 1.5 }}>{song.artist}</div>
                            <div className="am-song-album" style={{ flex: 1.5 }}>{song.album}</div>
                            <div className="am-song-time">{song.duration}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ==========================================================================
   Music Videos View
   ========================================================================== */
const MusicVideosView = () => {
    const { data, playSong, setShowVideo, setCurrentTrack } = useContext(PlayerContext);

    return (
        <div>
            <div className="am-header">Music Videos</div>
            <div className="am-videos-grid">
                {data.songs.filter(s => s.youtubeId).map(song => (
                    <div 
                        key={song.id} 
                        className="am-video-card"
                        onClick={() => {
                            setCurrentTrack(song);
                            setShowVideo(true);
                        }}
                    >
                        <div className="am-video-thumb-wrapper">
                            <SafeImage src={song.cover} className="am-video-thumb" alt={song.title} />
                            <div className="am-video-badge"><LucideIcon name="film" size={12} color="#ffffff" /> Video</div>
                            <div className="am-card-play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg>
                            </div>
                        </div>
                        <div className="am-card-title" style={{ marginTop: '8px' }}>{song.title}</div>
                        <div className="am-card-subtitle">{song.artist} • Official Music Video</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   Made for You View with Vibrant Custom Gradients
   ========================================================================== */
const MadeForYouView = () => {
    const { data, navigateTo, playSong } = useContext(PlayerContext);

    const mixes = [
        { id: 'mix-fav', title: 'Favorites Mix', subtitle: 'Updated every Tuesday', bg: 'linear-gradient(135deg, #ff0844 0%, #ff4b72 40%, #ffb199 100%)', icon: 'heart' },
        { id: 'mix-chill', title: 'Chill Mix', subtitle: 'Relaxing sounds tailored for you', bg: 'linear-gradient(135deg, #0ba360 0%, #3cba92 40%, #30dd8a 100%)', icon: 'disc' },
        { id: 'mix-energy', title: 'Get Up! Mix', subtitle: 'High tempo motivation and beats', bg: 'linear-gradient(135deg, #f857a6 0%, #ff5858 50%, #ff9a44 100%)', icon: 'zap' },
        { id: 'mix-replay', title: 'Replay 2026', subtitle: 'Your most streamed songs this year', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', icon: 'trending-up' }
    ];

    return (
        <div>
            <div className="am-header">Made for You</div>
            <div className="am-mixes-grid">
                {mixes.map(mix => (
                    <div 
                        key={mix.id} 
                        className="am-mix-card" 
                        style={{ background: mix.bg }}
                        onClick={() => playSong(data.songs[0])}
                    >
                        <div className="am-mix-header">
                            <LucideIcon name={mix.icon} size={28} color="#ffffff" />
                            <span className="am-mix-badge">PERSONALIZED</span>
                        </div>
                        <div className="am-mix-title">{mix.title}</div>
                        <div className="am-mix-sub">{mix.subtitle}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   iTunes Store View
   ========================================================================== */
const StoreView = () => {
    const { data, playSong } = useContext(PlayerContext);

    return (
        <div>
            <div className="am-header">iTunes Store</div>
            <div className="am-store-banner">
                <div style={{ flex: 1 }}>
                    <span className="am-hero-badge">ITUNES EXCLUSIVE</span>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'white', marginTop: '4px' }}>Complete Your Album Collection</h2>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '4px' }}>Get high-res lossless master tracks with custom digital booklets.</p>
                </div>
                <button className="am-pill-btn primary">Explore Charts</button>
            </div>

            <div className="am-section-title" style={{ marginTop: '28px' }}>Top Songs on iTunes Store</div>
            <div className="am-song-list" style={{ marginTop: '12px' }}>
                {data.songs.slice(0, 7).map((song, idx) => (
                    <div key={song.id} className="am-song-row" onClick={() => playSong(song)}>
                        <div className="am-song-index">{idx + 1}</div>
                        <SafeImage src={song.cover} song={song} className="am-song-cover" alt={song.title} />
                        <div className="am-song-info">
                            <div className="am-song-title">{song.title}</div>
                            <div className="am-song-artist">{song.artist}</div>
                        </div>
                        <div className="am-song-album">{song.album}</div>
                        <button className="am-store-price-btn" onClick={(e) => { 
                            e.stopPropagation(); 
                            if (window.showMacDialog) {
                                window.showMacDialog({
                                    title: 'iTunes Store Purchase',
                                    message: `Purchased "${song.title}" by ${song.artist} for $1.29 to your Apple Account (joy.kumbhakar@icloud.com). Added to your Library.`,
                                    icon: song.cover || 'images/Icons/Music.png',
                                    buttons: [
                                        { label: 'Done', primary: false, value: false },
                                        { label: 'Play Now', primary: true, value: true }
                                    ]
                                }).then((playNow) => {
                                    if (playNow) playSong(song);
                                });
                            } else {
                                alert(`Purchased ${song.title} for $1.29 to your Apple Account!`);
                            }
                        }}>
                            $1.29
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   Playlists Views
   ========================================================================== */
const AllPlaylistsView = () => {
    const { data, userPlaylists, navigateTo, setShowCreatePlaylist } = useContext(PlayerContext);
    const combined = [...data.playlists, ...userPlaylists];

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div className="am-header" style={{ marginBottom: 0 }}>All Playlists</div>
                <button className="am-pill-btn primary" onClick={() => setShowCreatePlaylist(true)}>
                    <LucideIcon name="plus" size={14} />
                    <span>New Playlist</span>
                </button>
            </div>

            <div className="am-albums-grid">
                {combined.map(pl => (
                    <div className="am-card-lg" key={pl.id} onClick={() => navigateTo('PlaylistDetail', pl)}>
                        <div className="am-card-img-wrapper">
                            <SafeImage src={pl.cover} song={{ title: pl.name, artist: pl.curator || 'Playlist' }} className="am-card-img" alt={pl.name} />
                            <div className="am-card-play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg>
                            </div>
                        </div>
                        <div className="am-card-title" style={{ marginTop: '8px' }}>{pl.name}</div>
                        <div className="am-card-subtitle">{pl.curator || 'User Playlist'} • {pl.tracks ? pl.tracks.length : 0} Songs</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PlaylistDetailView = () => {
    const { selectedPlaylist, data, playSong, removeFromPlaylist } = useContext(PlayerContext);
    if (!selectedPlaylist) return null;

    const playlistSongs = data.songs.filter(s => selectedPlaylist.tracks && selectedPlaylist.tracks.includes(s.id));

    return (
        <div>
            <div className="am-album-header">
                <SafeImage src={selectedPlaylist.cover} song={{ title: selectedPlaylist.name, artist: selectedPlaylist.curator || 'Playlist' }} className="am-album-header-cover" alt={selectedPlaylist.name} />
                <div className="am-album-header-info">
                    <span className="am-hero-badge">PLAYLIST</span>
                    <h1 className="am-album-header-title">{selectedPlaylist.name}</h1>
                    <h3 className="am-album-header-artist">Curated by {selectedPlaylist.curator || 'You'}</h3>
                    <p className="am-album-header-desc">{selectedPlaylist.description}</p>
                    <p style={{ fontSize: '12px', color: '#8e8e93', marginTop: '6px' }}>
                        {playlistSongs.length} Songs • Lossless Audio
                    </p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '18px' }}>
                        <button className="am-pill-btn primary" onClick={() => playlistSongs[0] && playSong(playlistSongs[0], playlistSongs)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l12 8-12 8V4z"/></svg>
                            <span>Play</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="am-song-list" style={{ marginTop: '24px' }}>
                {playlistSongs.map((song, idx) => (
                    <div key={song.id} className="am-song-row" onClick={() => playSong(song, playlistSongs)}>
                        <div className="am-song-index">{idx + 1}</div>
                        <SafeImage src={song.cover} song={song} className="am-song-cover" alt={song.title} />
                        <div className="am-song-info">
                            <div className="am-song-title">{song.title}</div>
                            <div className="am-song-artist">{song.artist}</div>
                        </div>
                        <div className="am-song-album">{song.album}</div>
                        <div className="am-song-time">{song.duration}</div>
                        <button 
                            className="am-action-btn" 
                            title="Remove from Playlist" 
                            onClick={(e) => { e.stopPropagation(); removeFromPlaylist(selectedPlaylist.id, song.id); }}
                        >
                            <LucideIcon name="trash" size={14} color="#8e8e93" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   Floating Liquid Glass Player
   ========================================================================== */
const AudioVisualizer = ({ isPlaying }) => {
    const bars = [3, 5, 7, 4, 6, 8, 5, 3, 7, 6, 4, 5, 8, 3, 6, 7, 4, 5, 6, 3];
    return (
        <div className="am-visualizer-wrap" style={{ opacity: isPlaying ? 0.08 : 0.02 }}>
            {bars.map((h, i) => (
                <div 
                    key={i} 
                    className="am-visualizer-bar"
                    style={{
                        height: isPlaying ? `${20 + h * 8}%` : '8%',
                        animation: isPlaying ? `visualizerPulse ${0.6 + (i % 4) * 0.2}s ease-in-out infinite alternate` : 'none'
                    }} 
                />
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
        showVideo, setShowVideo, lovedIds, toggleLoved,
        showAirPlay, setShowAirPlay
    } = useContext(PlayerContext);
    
    if (!currentTrack) return null;
    
    const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
    const isLoved = lovedIds.includes(currentTrack.id);

    const handleVolumeClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const newVol = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setVolume(newVol);
        if (isMuted) setIsMuted(false);
    };

    return (
        <div className="am-floating-player-wrapper">
            <div className="am-floating-player">
                
                {/* Left Controls */}
                <div className="am-player-controls">
                    <button className={`am-btn ${isShuffle ? 'active' : ''}`} onClick={() => setIsShuffle(!isShuffle)} title="Shuffle">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
                    </button>
                    <button className="am-btn" onClick={playPrev} title="Previous (Cmd+Left)">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11 5L3 12l8 7V5z"/><path d="M19 5l-8 7 8 7V5z"/><rect x="2" y="5" width="2" height="14"/></svg>
                    </button>
                    <button className="am-btn play-pause" onClick={togglePlay} title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}>
                        {isPlaying ? 
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg> : 
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '2px'}}><path d="M7 4l12 8-12 8V4z"/></svg>
                        }
                    </button>
                    <button className="am-btn" onClick={playNext} title="Next (Cmd+Right)">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 5l8 7-8 7V5z"/><path d="M5 5l8 7-8 7V5z"/><rect x="20" y="5" width="2" height="14"/></svg>
                    </button>
                    <button className={`am-btn ${repeatMode !== 'off' ? 'active' : ''}`} onClick={toggleRepeat} title={`Repeat: ${repeatMode}`}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                    </button>
                </div>
                
                <div className="am-player-divider"></div>
                
                {/* Center Now Playing & Scrubber */}
                <div className="am-now-playing-container">
                    <SafeImage src={currentTrack.cover} className="am-np-cover" alt={currentTrack.title} />
                    <div className="am-np-details">
                        <div className="am-np-text-row">
                            <span className="am-np-title">{currentTrack.title}</span>
                            <span className="am-np-dot">•</span>
                            <span className="am-np-artist">{currentTrack.artist}</span>
                            <button 
                                className="am-np-heart" 
                                title={isLoved ? 'Loved' : 'Love Song'}
                                onClick={() => toggleLoved(currentTrack.id)}
                            >
                                <LucideIcon name={isLoved ? 'heart-fill' : 'heart'} size={12} color={isLoved ? '#fa243c' : '#8e8e93'} />
                            </button>
                            <AudioVisualizer isPlaying={isPlaying} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', color: '#8e8e93', marginTop: '4px' }}>
                            <span style={{ minWidth: '28px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{formatTime(progress)}</span>
                            <div className="am-scrubber-track" onClick={seek} title="Seek">
                                <div className="am-scrubber-fill" style={{ width: `${progressPercent}%` }}>
                                    <div className="am-scrubber-thumb"></div>
                                </div>
                            </div>
                            <span style={{ minWidth: '32px', fontVariantNumeric: 'tabular-nums' }}>-{formatTime(duration - progress)}</span>
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
                            title="Music Video"
                        >
                            <LucideIcon name="video" size={15} />
                        </button>
                    )}
                    <button 
                        className={`am-btn ${showLyrics ? 'active' : ''}`} 
                        onClick={() => { setShowLyrics(!showLyrics); setShowQueue(false); setShowVideo(false); }}
                        title="Lyrics (L)"
                    >
                        <i className="far fa-comment-alt" style={{ fontSize: '14px' }}></i>
                    </button>
                    <button 
                        className={`am-btn ${showQueue ? 'active' : ''}`} 
                        onClick={() => { setShowQueue(!showQueue); setShowLyrics(false); setShowVideo(false); }}
                        title="Up Next (U)"
                    >
                        <i className="fas fa-list-ul" style={{ fontSize: '14px' }}></i>
                    </button>
                    
                    {/* Volume Slider */}
                    <div className="am-volume-container">
                        <button 
                            className="am-btn" 
                            style={{ width: '22px', height: '22px' }}
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

/* ==========================================================================
   Lyrics Popover
   ========================================================================== */
const LyricsPopover = () => {
    const { currentTrack, progress, setShowLyrics, seek, audio } = useContext(PlayerContext);
    const lyrics = currentTrack.lyrics || [{ time: 0, text: "Instrumental or lyrics unavailable." }];

    const handleLineClick = (time) => {
        if (audio) {
            audio.currentTime = time;
        }
    };

    return (
        <div className="am-popover-card">
            <div className="am-popover-title">
                <span>Lyrics</span>
                <LucideIcon name="x" size={16} color="#8e8e93" style={{ cursor: 'pointer' }} onClick={() => setShowLyrics(false)} />
            </div>
            <div className="am-lyrics-scroll">
                {lyrics.map((l, i) => {
                    const isCurrent = progress >= l.time && (i === lyrics.length - 1 || progress < lyrics[i + 1].time);
                    return (
                        <div 
                            key={i} 
                            className={`am-lyric-line ${isCurrent ? 'active' : ''}`}
                            onClick={() => handleLineClick(l.time)}
                        >
                            {l.text}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ==========================================================================
   Queue Popover (Up Next)
   ========================================================================== */
const QueuePopover = () => {
    const { queue, setQueue, currentTrack, playSong, setShowQueue } = useContext(PlayerContext);

    const handleRemoveFromQueue = (trackId) => {
        setQueue(queue.filter(t => t.id !== trackId));
    };

    return (
        <div className="am-popover-card">
            <div className="am-popover-title">
                <span>Playing Next ({queue.length})</span>
                <LucideIcon name="x" size={16} color="#8e8e93" style={{ cursor: 'pointer' }} onClick={() => setShowQueue(false)} />
            </div>
            <div className="am-queue-scroll">
                {queue.map((song) => (
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
                        {currentTrack && currentTrack.id === song.id ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fa243c" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                        ) : (
                            <button 
                                className="am-queue-del" 
                                title="Remove from queue"
                                onClick={(e) => { e.stopPropagation(); handleRemoveFromQueue(song.id); }}
                            >
                                <LucideIcon name="x" size={12} color="#8e8e93" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   Video Popover (PiP Player)
   ========================================================================== */
const VideoPopover = () => {
    const { currentTrack, setShowVideo } = useContext(PlayerContext);
    if (!currentTrack || !currentTrack.youtubeId) return null;

    return (
        <div className="am-video-popover">
            <div className="am-video-popover-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <LucideIcon name="video" size={14} color="#fa243c" />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>{currentTrack.title} - Music Video</span>
                </div>
                <LucideIcon name="x" size={14} color="rgba(255,255,255,0.7)" style={{ cursor: 'pointer' }} onClick={() => setShowVideo(false)} />
            </div>
            <iframe 
                src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=1&enablejsapi=1`} 
                title={currentTrack.title}
                style={{ width: '100%', height: 'calc(100% - 32px)', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

/* ==========================================================================
   AirPlay Popover
   ========================================================================== */
const AirPlayPopover = () => {
    const { airplayDevice, setAirplayDevice, setShowAirPlay } = useContext(PlayerContext);
    const devices = [
        { name: 'MacBook Pro Speakers', type: 'laptop', desc: 'Built-in Output' },
        { name: 'AirPods Max (Joy)', type: 'headphones', desc: 'Spatial Audio Head-Tracked' },
        { name: 'AirPods Pro 2', type: 'earbuds', desc: 'Active Noise Cancellation' },
        { name: 'HomePod Mini (Studio)', type: 'speaker', desc: 'AirPlay 2 Stereo Pair' }
    ];

    return (
        <div className="am-popover-card" style={{ width: '280px', bottom: '78px', right: '78px' }}>
            <div className="am-popover-title">
                <span>AirPlay Audio</span>
                <LucideIcon name="x" size={16} color="#8e8e93" style={{ cursor: 'pointer' }} onClick={() => setShowAirPlay(false)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                {devices.map(d => (
                    <div 
                        key={d.name} 
                        className={`am-device-row ${airplayDevice === d.name ? 'active' : ''}`}
                        onClick={() => { setAirplayDevice(d.name); setShowAirPlay(false); }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: airplayDevice === d.name ? '#fa243c' : '#1d1d1f' }}>{d.name}</span>
                            <span style={{ fontSize: '11px', color: '#8e8e93' }}>{d.desc}</span>
                        </div>
                        {airplayDevice === d.name && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fa243c" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   Equalizer Popover
   ========================================================================== */
const EqualizerPopover = () => {
    const { equalizerPreset, setEqualizerPreset, setShowEqualizer } = useContext(PlayerContext);
    const presets = ['Apple Music Flat', 'Bass Booster', 'Acoustic', 'Vocal Booster', 'Electronic', 'Rock', 'Jazz'];

    return (
        <div className="am-popover-card" style={{ width: '240px', bottom: '78px', right: '118px' }}>
            <div className="am-popover-title">
                <span>Equalizer Presets</span>
                <LucideIcon name="x" size={16} color="#8e8e93" style={{ cursor: 'pointer' }} onClick={() => setShowEqualizer(false)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px' }}>
                {presets.map(p => (
                    <div 
                        key={p} 
                        className={`am-device-row ${equalizerPreset === p ? 'active' : ''}`}
                        onClick={() => { setEqualizerPreset(p); setShowEqualizer(false); }}
                    >
                        <span style={{ fontSize: '13px', fontWeight: '500', color: equalizerPreset === p ? '#fa243c' : '#1d1d1f' }}>{p}</span>
                        {equalizerPreset === p && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fa243c" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ==========================================================================
   Song Info Modal (macOS Get Info Dialog âŒ˜I)
   ========================================================================== */
const SongInfoModal = ({ song, onClose }) => {
    if (!song) return null;
    const [tab, setTab] = useState('Details');

    return (
        <div className="am-modal-backdrop" onClick={onClose}>
            <div className="am-modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="am-modal-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <SafeImage src={song.cover} className="am-modal-thumb" alt={song.title} />
                        <div>
                            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1d1d1f' }}>{song.title}</h3>
                            <p style={{ fontSize: '12px', color: '#8e8e93' }}>{song.artist} — {song.album}</p>
                        </div>
                    </div>
                    <LucideIcon name="x" size={16} color="#8e8e93" style={{ cursor: 'pointer' }} onClick={onClose} />
                </div>

                <div className="am-modal-tabs">
                    {['Details', 'Artwork', 'File'].map(t => (
                        <div key={t} className={`am-modal-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                            {t}
                        </div>
                    ))}
                </div>

                <div className="am-modal-body">
                    {tab === 'Details' && (
                        <div className="am-info-grid">
                            <span className="am-info-label">Title:</span><span className="am-info-val">{song.title}</span>
                            <span className="am-info-label">Artist:</span><span className="am-info-val">{song.artist}</span>
                            <span className="am-info-label">Album:</span><span className="am-info-val">{song.album}</span>
                            <span className="am-info-label">Genre:</span><span className="am-info-val">{song.genre || 'Pop'}</span>
                            <span className="am-info-label">Year:</span><span className="am-info-val">{song.year || '2024'}</span>
                            <span className="am-info-label">Plays:</span><span className="am-info-val">{song.plays || '1,240'}</span>
                        </div>
                    )}
                    {tab === 'Artwork' && (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                            <SafeImage src={song.cover} style={{ width: '180px', height: '180px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)' }} alt={song.title} />
                        </div>
                    )}
                    {tab === 'File' && (
                        <div className="am-info-grid">
                            <span className="am-info-label">Location:</span><span className="am-info-val" style={{ wordBreak: 'break-all' }}>{song.url || 'Streaming'}</span>
                            <span className="am-info-label">Format:</span><span className="am-info-val">{song.format || 'Apple Lossless Audio File (ALAC)'}</span>
                            <span className="am-info-label">Sample Rate:</span><span className="am-info-val">48.000 kHz / 24-bit</span>
                            <span className="am-info-label">Channels:</span><span className="am-info-val">Spatial Audio 7.1 / Stereo</span>
                        </div>
                    )}
                </div>

                <div className="am-modal-footer">
                    <button className="am-pill-btn secondary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

/* ==========================================================================
   Create Playlist Modal
   ========================================================================== */
const CreatePlaylistModal = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    return (
        <div className="am-modal-backdrop" onClick={onClose}>
            <div className="am-modal-box" style={{ width: '380px' }} onClick={(e) => e.stopPropagation()}>
                <div className="am-modal-header">
                    <h3 style={{ fontSize: '16px', fontWeight: '700' }}>New Playlist</h3>
                    <LucideIcon name="x" size={16} color="#8e8e93" style={{ cursor: 'pointer' }} onClick={onClose} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0' }}>
                    <div>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#8e8e93', display: 'block', marginBottom: '4px' }}>PLAYLIST NAME</label>
                        <input 
                            type="text" 
                            className="am-input-field" 
                            placeholder="e.g. My Driving Jam" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            autoFocus
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#8e8e93', display: 'block', marginBottom: '4px' }}>DESCRIPTION (OPTIONAL)</label>
                        <textarea 
                            className="am-input-field" 
                            style={{ height: '70px', resize: 'none' }}
                            placeholder="Give your playlist a cool description..." 
                            value={desc} 
                            onChange={(e) => setDesc(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="am-modal-footer">
                    <button className="am-pill-btn secondary" onClick={onClose}>Cancel</button>
                    <button className="am-pill-btn primary" onClick={() => onSave(name || 'New Playlist', desc)}>Create</button>
                </div>
            </div>
        </div>
    );
};

/* ==========================================================================
   macOS Sequoia Context Menu
   ========================================================================== */
const ContextMenu = ({ x, y, track }) => {
    const { playSong, playNextInQueue, addToQueueBottom, toggleLoved, lovedIds, togglePinned, pinnedIds, setShowSongInfo } = useContext(PlayerContext);
    if (!track) return null;

    const isLoved = lovedIds.includes(track.id);
    const isPinned = pinnedIds.includes(track.id);

    return (
        <div 
            className="am-context-menu" 
            style={{ top: `${Math.min(y, window.innerHeight - 240)}px`, left: `${Math.min(x, window.innerWidth - 200)}px` }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="am-cm-item" onClick={() => playSong(track)}>
                <LucideIcon name="music" size={14} />
                <span>Play Now</span>
            </div>
            <div className="am-cm-item" onClick={() => playNextInQueue(track)}>
                <LucideIcon name="list-music" size={14} />
                <span>Play Next</span>
            </div>
            <div className="am-cm-item" onClick={() => addToQueueBottom(track)}>
                <LucideIcon name="plus" size={14} />
                <span>Add to Playing Next</span>
            </div>
            <div className="am-cm-divider"></div>
            <div className="am-cm-item" onClick={() => toggleLoved(track.id)}>
                <LucideIcon name={isLoved ? 'heart-fill' : 'heart'} size={14} color={isLoved ? '#fa243c' : undefined} />
                <span>{isLoved ? 'Remove from Loved' : 'Love Song'}</span>
            </div>
            <div className="am-cm-item" onClick={() => togglePinned(track.id)}>
                <LucideIcon name="pin" size={14} />
                <span>{isPinned ? 'Unpin from Library' : 'Pin to Library'}</span>
            </div>
            <div className="am-cm-divider"></div>
            <div className="am-cm-item" onClick={() => setShowSongInfo(track)}>
                <LucideIcon name="info" size={14} />
                <span>Get Info (Cmd+I)</span>
            </div>
        </div>
    );
};

/* ==========================================================================
   React Mount Bridge
   ========================================================================== */
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

if (document.getElementById('music-react-root')) { 
    window.renderAppleMusicApp(); 
}
