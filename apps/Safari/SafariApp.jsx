const { useState, useEffect, useRef, useMemo } = React;

// Custom SVG Icon component for authentic macOS vector rendering
const SafariIcon = ({ name, size = 16, color = 'currentColor', strokeWidth = 2, className = '' }) => {
    const icons = {
        'sidebar': <path d="M3 3h18v18H3z M9 3v18" />,
        'arrow-left': <polyline points="15 18 9 12 15 6" />,
        'arrow-right': <polyline points="9 18 15 12 9 6" />,
        'rotate-cw': <path d="M23 4v6h-6 M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />,
        'lock': <g><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></g>,
        'shield': <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
        'share': <g><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></g>,
        'plus': <g><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></g>,
        'x': <g><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></g>,
        'grid': <g><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></g>,
        'tabs-overview': <g><rect x="3" y="7" width="13" height="13" rx="2"/><path d="M8 3h10a2 2 0 0 1 2 2v10"/></g>,
        'book-open': <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />,
        'bookmark': <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
        'search': <g><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></g>,
        'sliders': <g><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></g>,
        'download': <g><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></g>,
        'font': <g><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></g>,
        'check': <polyline points="20 6 9 17 4 12" />,
        'external-link': <g><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></g>,
        'star': <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
        'compass': <g><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></g>,
        'clock': <g><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></g>,
        'globe': <g><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></g>,
        'code': <path d="M16 18l6-6-6-6 M8 6l-6 6 6 6" />,
        'copy': <g><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></g>,
        'mail': <g><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></g>,
        'message-square': <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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

// Favorites Configuration using authentic macOS icons
const FAVORITES = [
    { id: 'fav-apple', title: 'Apple', url: 'apple.com', iconSrc: 'images/Icons/Apple.png' },
    { id: 'fav-webkit', title: 'WebKit', url: 'webkit.org', iconSrc: 'images/Icons/safari.png' },
    { id: 'fav-figma', title: 'Figma', url: 'figma.com', iconSrc: 'images/Icons/Figma.png' },
    { id: 'fav-google', title: 'Google', url: 'google.com', iconSrc: 'images/Icons/Google.png' },
    { id: 'fav-github', title: 'GitHub', url: 'github.com', iconSrc: 'images/Icons/Github.png' },
    { id: 'fav-youtube', title: 'YouTube', url: 'youtube.com', iconSrc: 'images/Icons/Youtube.png' },
    { id: 'fav-chatgpt', title: 'ChatGPT', url: 'chatgpt.com', iconSrc: 'images/Icons/ChatGPT.png' },
    { id: 'fav-claude', title: 'Claude', url: 'claude.ai', iconSrc: 'images/Icons/Claude.png' },
    { id: 'fav-reddit', title: 'Reddit', url: 'reddit.com', iconSrc: 'images/Icons/Reddit.png' },
    { id: 'fav-x', title: 'Twitter', url: 'x.com', iconSrc: 'images/Icons/Twitter.png' },
    { id: 'fav-spotify', title: 'Spotify', url: 'spotify.com', iconSrc: 'images/Icons/Spotify.png' },
    { id: 'fav-netflix', title: 'Netflix', url: 'netflix.com', iconSrc: 'images/Icons/Netflix.png' },
    { id: 'fav-appstore', title: 'App Store', url: 'apps.apple.com', iconSrc: 'images/Icons/AppStore.png' },
    { id: 'fav-linkedin', title: 'LinkedIn', url: 'linkedin.com', iconSrc: 'images/Icons/Linkedln.png' },
    { id: 'fav-facebook', title: 'Facebook', url: 'facebook.com', iconSrc: 'images/Icons/Facebook.png' },
    { id: 'fav-whatsapp', title: 'WhatsApp', url: 'whatsapp.com', iconSrc: 'images/Icons/WhatsApp.png' },
    { id: 'fav-telegram', title: 'Telegram', url: 'telegram.org', iconSrc: 'images/Icons/Telegram.png' },
    { id: 'fav-steam', title: 'Steam', url: 'steampowered.com', iconSrc: 'images/Icons/Steam.png' }
];

const FREQUENTLY_VISITED = [
    {
        id: 'fv-1',
        title: 'Adventure Journal',
        url: 'adventure.com',
        domain: 'adventure.com',
        previewImage: 'images/Wallpapers/26-Tahoe-Light-6K.jpg',
        headline: 'Explore pristine alpine landscapes & mountain trails'
    },
    {
        id: 'fv-2',
        title: 'Atlas Obscura',
        url: 'atlasobscura.com',
        domain: 'atlasobscura.com',
        previewImage: 'images/Wallpapers/Referance.jpg',
        headline: 'Curious places & hidden wonders of the world'
    },
    {
        id: 'fv-3',
        title: 'The Design Files',
        url: 'thedesignfiles.net',
        domain: 'thedesignfiles.net',
        previewImage: 'images/Wallpapers/27-Golden-Gate.jpg',
        headline: 'Architecture, modern interiors & sustainable craft'
    }
];

const SIRI_SUGGESTIONS = [
    {
        id: 'siri-1',
        title: 'Building Your Space',
        domain: 'openhouse-magazine.com',
        url: 'openhouse-magazine.com',
        bg: 'rgba(255, 179, 71, 0.35)',
        img: 'images/Icons/Purple_Documents_Folder.png'
    },
    {
        id: 'siri-2',
        title: 'How to Cut Your Own Hair',
        domain: 'goodhousekeeping.com',
        url: 'goodhousekeeping.com',
        bg: 'rgba(255, 204, 0, 0.35)',
        img: 'images/Icons/Soulver_2_Document__Notepad__Notes___Pen_Calculator_File.png'
    },
    {
        id: 'siri-3',
        title: 'Ones to Watch',
        domain: 'itsnicethat.com',
        url: 'itsnicethat.com',
        bg: 'rgba(90, 180, 255, 0.35)',
        img: 'images/Icons/Dev Tools Icons/figma.png'
    }
];

const READING_LIST = [
    {
        id: 'rl-1',
        site: 'Apple Newsroom',
        title: 'macOS Sequoia takes Mac productivity and intelligence to new heights',
        preview: 'With Apple Intelligence, iPhone Mirroring, major updates to Safari, and more, macOS Sequoia brings powerful new capabilities to Mac.',
        url: 'apple.com/newsroom/macos-sequoia',
        date: 'June 2024'
    },
    {
        id: 'rl-2',
        site: 'Human Interface Guidelines',
        title: 'Designing for macOS: Window Management and Spatial Hierarchy',
        preview: 'Learn how to apply macOS system principles, clean toolbars, subtle materials, and native controls in modern desktop applications.',
        url: 'developer.apple.com/design/macos',
        date: 'July 2024'
    },
    {
        id: 'rl-3',
        site: 'WebKit Blog',
        title: 'Introducing WebKit 2.0 Engine Improvements and Intelligent Tracking Prevention',
        preview: 'Discover the latest speed benchmarks, zero-memory DOM recycling, and privacy protection protocols built directly into Safari.',
        url: 'webkit.org/blog/tracking-prevention',
        date: 'August 2024'
    }
];

const BOOKMARKS = [
    { id: 'bm-1', title: 'Apple Developer', url: 'developer.apple.com', iconSrc: 'images/Icons/Apple.png' },
    { id: 'bm-2', title: 'GitHub Open Source', url: 'github.com', iconSrc: 'images/Icons/Github.png' },
    { id: 'bm-3', title: 'Google Search & Cloud', url: 'google.com', iconSrc: 'images/Icons/Google.png' },
    { id: 'bm-4', title: 'YouTube Media', url: 'youtube.com', iconSrc: 'images/Icons/Youtube.png' },
    { id: 'bm-5', title: 'Figma Design System', url: 'figma.com', iconSrc: 'images/Icons/Figma.png' },
    { id: 'bm-6', title: 'OpenAI ChatGPT', url: 'chatgpt.com', iconSrc: 'images/Icons/ChatGPT.png' },
    { id: 'bm-7', title: 'Spotify Web Player', url: 'spotify.com', iconSrc: 'images/Icons/Spotify.png' },
    { id: 'bm-8', title: 'Anthropic Claude', url: 'claude.ai', iconSrc: 'images/Icons/Claude.png' }
];

const getFavicon = (url) => {
    if (!url || url === 'safari://startpage') return { type: 'svg', name: 'compass' };
    const u = url.toLowerCase();
    if (u.includes('apple.com')) return { type: 'img', src: 'images/Icons/Apple.png' };
    if (u.includes('google.com')) return { type: 'img', src: 'images/Icons/Google.png' };
    if (u.includes('github.com')) return { type: 'img', src: 'images/Icons/Github.png' };
    if (u.includes('youtube.com')) return { type: 'img', src: 'images/Icons/Youtube.png' };
    if (u.includes('reddit.com')) return { type: 'img', src: 'images/Icons/Reddit.png' };
    if (u.includes('x.com') || u.includes('twitter.com')) return { type: 'img', src: 'images/Icons/X.png' };
    if (u.includes('figma.com')) return { type: 'img', src: 'images/Icons/Figma.png' };
    if (u.includes('chatgpt.com') || u.includes('openai.com')) return { type: 'img', src: 'images/Icons/ChatGPT.png' };
    if (u.includes('claude.ai')) return { type: 'img', src: 'images/Icons/Claude.png' };
    if (u.includes('spotify.com')) return { type: 'img', src: 'images/Icons/Spotify.png' };
    if (u.includes('netflix.com')) return { type: 'img', src: 'images/Icons/Netflix.png' };
    if (u.includes('apps.apple.com')) return { type: 'img', src: 'images/Icons/AppStore.png' };
    return { type: 'svg', name: 'globe' };
};

const INITIAL_TABS = [
    {
        id: 'tab-1',
        title: 'Start Page',
        url: 'safari://startpage',
        favicon: 'compass',
        history: ['safari://startpage'],
        historyIndex: 0,
        query: ''
    }
];

const SafariApp = () => {
    const [tabs, setTabs] = useState(INITIAL_TABS);
    const [activeTabId, setActiveTabId] = useState('tab-1');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarTab, setSidebarTab] = useState('bookmarks'); // 'bookmarks' | 'reading'
    const [readerMode, setReaderMode] = useState(false);
    const [omnibarText, setOmnibarText] = useState('');
    const [isOmnibarFocused, setIsOmnibarFocused] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showDownloads, setShowDownloads] = useState(false);
    const [searchQueryInput, setSearchQueryInput] = useState('');
    const [startPageConfig, setStartPageConfig] = useState({
        favorites: true,
        frequentlyVisited: true,
        siriSuggestions: true,
        readingList: false,
        privacyReport: false,
        backgroundImage: true
    });

    const activeTab = useMemo(() => {
        return tabs.find(t => t.id === activeTabId) || tabs[0];
    }, [tabs, activeTabId]);

    // Keep omnibar synchronized with active tab url
    useEffect(() => {
        if (activeTab) {
            setOmnibarText(activeTab.url === 'safari://startpage' ? '' : activeTab.url);
        }
    }, [activeTab]);

    const handleCreateTab = (targetUrl = 'safari://startpage', title = 'Start Page', favicon = 'compass') => {
        const newTabId = 'tab-' + Date.now();
        const newTab = {
            id: newTabId,
            title: title,
            url: targetUrl,
            favicon: favicon,
            history: [targetUrl],
            historyIndex: 0,
            query: ''
        };
        setTabs(prev => [...prev, newTab]);
        setActiveTabId(newTabId);
        setReaderMode(false);
    };

    const handleCloseTab = (tabId, e) => {
        if (e) e.stopPropagation();
        if (tabs.length === 1) {
            // Reset the last remaining tab to start page
            setTabs([{
                id: 'tab-' + Date.now(),
                title: 'Start Page',
                url: 'safari://startpage',
                favicon: 'compass',
                history: ['safari://startpage'],
                historyIndex: 0,
                query: ''
            }]);
            return;
        }

        const remainingTabs = tabs.filter(t => t.id !== tabId);
        setTabs(remainingTabs);
        if (activeTabId === tabId) {
            setActiveTabId(remainingTabs[remainingTabs.length - 1].id);
        }
    };

    const handleNavigate = (url, query = '') => {
        let cleanUrl = url.trim();
        let displayTitle = cleanUrl;
        let favicon = 'globe';

        if (!cleanUrl || cleanUrl === 'safari://startpage') {
            cleanUrl = 'safari://startpage';
            displayTitle = 'Start Page';
            favicon = 'compass';
        } else if (cleanUrl.includes('google.com') || (!cleanUrl.includes('.') && query)) {
            cleanUrl = 'google.com';
            displayTitle = query ? `${query} - Google Search` : 'Google';
            favicon = 'search';
        } else if (cleanUrl.includes('apple.com')) {
            cleanUrl = 'apple.com';
            displayTitle = 'Apple — Official Site';
            favicon = 'globe';
        } else if (cleanUrl.includes('github.com')) {
            cleanUrl = 'github.com';
            displayTitle = 'GitHub — Build from here';
            favicon = 'code';
        } else if (cleanUrl.includes('wikipedia.org')) {
            cleanUrl = 'wikipedia.org';
            displayTitle = 'macOS Sequoia — Wikipedia';
            favicon = 'book-open';
        } else if (cleanUrl.includes('news.ycombinator.com') || cleanUrl.includes('ycombinator')) {
            cleanUrl = 'news.ycombinator.com';
            displayTitle = 'Hacker News';
            favicon = 'external-link';
        } else if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && cleanUrl.includes('.')) {
            // Normal domain
            displayTitle = cleanUrl;
        } else if (!cleanUrl.includes('.')) {
            // It is a search query
            cleanUrl = 'google.com';
            query = cleanUrl;
            displayTitle = `${cleanUrl} - Google Search`;
            favicon = 'search';
        }

        setTabs(prev => prev.map(t => {
            if (t.id === activeTabId) {
                const newHistory = t.history.slice(0, t.historyIndex + 1);
                newHistory.push(cleanUrl);
                return {
                    ...t,
                    url: cleanUrl,
                    title: displayTitle,
                    favicon: favicon,
                    history: newHistory,
                    historyIndex: newHistory.length - 1,
                    query: query
                };
            }
            return t;
        }));

        setIsOmnibarFocused(false);
        setReaderMode(false);
    };

    const handleGoBack = () => {
        if (!activeTab || activeTab.historyIndex <= 0) return;
        setTabs(prev => prev.map(t => {
            if (t.id === activeTabId) {
                const newIndex = t.historyIndex - 1;
                const prevUrl = t.history[newIndex];
                return {
                    ...t,
                    url: prevUrl,
                    historyIndex: newIndex
                };
            }
            return t;
        }));
    };

    const handleGoForward = () => {
        if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) return;
        setTabs(prev => prev.map(t => {
            if (t.id === activeTabId) {
                const newIndex = t.historyIndex + 1;
                const nextUrl = t.history[newIndex];
                return {
                    ...t,
                    url: nextUrl,
                    historyIndex: newIndex
                };
            }
            return t;
        }));
    };

    const handleOmnibarKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleNavigate(omnibarText, omnibarText);
        } else if (e.key === 'Escape') {
            setIsOmnibarFocused(false);
            setOmnibarText(activeTab.url === 'safari://startpage' ? '' : activeTab.url);
        }
    };

    // Filter suggestions based on what user is typing
    const searchSuggestions = useMemo(() => {
        if (!omnibarText || !isOmnibarFocused) return [];
        const q = omnibarText.toLowerCase();
        const results = [];

        if ('google'.includes(q) || 'search'.includes(q)) {
            results.push({ type: 'site', title: 'Google Search Engine', url: 'google.com', iconSrc: 'images/Icons/Google.png' });
        }
        if ('apple'.includes(q) || 'mac'.includes(q) || 'sequoia'.includes(q)) {
            results.push({ type: 'site', title: 'Apple Official Site', url: 'apple.com', iconSrc: 'images/Icons/Apple.png' });
        }
        if ('github'.includes(q) || 'code'.includes(q) || 'repo'.includes(q)) {
            results.push({ type: 'site', title: 'GitHub — Open Source Repositories', url: 'github.com', iconSrc: 'images/Icons/Github.png' });
        }
        if ('youtube'.includes(q) || 'video'.includes(q)) {
            results.push({ type: 'site', title: 'YouTube Videos', url: 'youtube.com', iconSrc: 'images/Icons/Youtube.png' });
        }
        if ('chatgpt'.includes(q) || 'ai'.includes(q) || 'openai'.includes(q)) {
            results.push({ type: 'site', title: 'ChatGPT AI Assistant', url: 'chatgpt.com', iconSrc: 'images/Icons/ChatGPT.png' });
        }
        if ('figma'.includes(q) || 'design'.includes(q)) {
            results.push({ type: 'site', title: 'Figma Design System', url: 'figma.com', iconSrc: 'images/Icons/Figma.png' });
        }
        if ('reddit'.includes(q) || 'forum'.includes(q)) {
            results.push({ type: 'site', title: 'Reddit Communities', url: 'reddit.com', iconSrc: 'images/Icons/Reddit.png' });
        }

        results.push({ type: 'search', title: `Search for "${omnibarText}" with Google`, url: 'google.com', iconSrc: 'images/Icons/Google.png', query: omnibarText });
        return results;
    }, [omnibarText, isOmnibarFocused]);

    return (
        <div className="safari-app-container">
            {/* Unified Toolbar */}
            <div className="safari-toolbar">
                {/* 84px traffic spacer for native traffic lights */}
                <div className="safari-traffic-spacer"></div>

                {/* Left Nav Controls */}
                <div className="safari-nav-cluster">
                    <button 
                        className={`safari-btn ${sidebarOpen ? 'active' : ''}`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        title="Toggle Sidebar (⌘⇧S)"
                    >
                        <SafariIcon name="sidebar" size={15} />
                    </button>
                    
                    <button 
                        className="safari-btn" 
                        onClick={handleGoBack}
                        disabled={!activeTab || activeTab.historyIndex <= 0}
                        title="Back (⌘[)"
                    >
                        <SafariIcon name="arrow-left" size={15} />
                    </button>

                    <button 
                        className="safari-btn" 
                        onClick={handleGoForward}
                        disabled={!activeTab || activeTab.historyIndex >= activeTab.history.length - 1}
                        title="Forward (⌘])"
                    >
                        <SafariIcon name="arrow-right" size={15} />
                    </button>
                </div>

                {/* Smart Omnibar */}
                <div className="safari-omnibar-wrapper">
                    <div className={`safari-omnibar ${isOmnibarFocused ? 'focused' : ''}`}>
                        <div className="safari-omnibar-lock">
                            <SafariIcon name="lock" size={12} color="#34c759" />
                        </div>

                        <input 
                            type="text"
                            className="safari-omnibar-input"
                            value={omnibarText}
                            placeholder="Search or enter website name"
                            onFocus={() => setIsOmnibarFocused(true)}
                            onBlur={() => setTimeout(() => setIsOmnibarFocused(false), 200)}
                            onChange={(e) => setOmnibarText(e.target.value)}
                            onKeyDown={handleOmnibarKeyDown}
                        />

                        <div className="safari-omnibar-actions">
                            {activeTab.url !== 'safari://startpage' && (
                                <button 
                                    className={`safari-omnibar-btn ${readerMode ? 'active' : ''}`}
                                    onClick={() => setReaderMode(!readerMode)}
                                    title="Reader View"
                                >
                                    <SafariIcon name="font" size={12} />
                                </button>
                            )}
                            <button 
                                className="safari-omnibar-btn"
                                onClick={() => handleNavigate(activeTab.url, activeTab.query)}
                                title="Reload Page (⌘R)"
                            >
                                <SafariIcon name="rotate-cw" size={12} />
                            </button>
                        </div>
                    </div>

                    {/* Suggestions Dropdown */}
                    {isOmnibarFocused && searchSuggestions.length > 0 && (
                        <div className="safari-suggestions-dropdown">
                            <div className="safari-sugg-header">Suggestions</div>
                            {searchSuggestions.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="safari-sugg-item"
                                    onMouseDown={() => handleNavigate(item.url, item.query || item.title)}
                                >
                                    <div className="safari-sugg-icon">
                                        {item.iconSrc ? (
                                            <img src={item.iconSrc} style={{ width: '15px', height: '15px', objectFit: 'contain' }} alt="" />
                                        ) : (
                                            <SafariIcon name={item.icon || 'globe'} size={14} />
                                        )}
                                    </div>
                                    <div className="safari-sugg-text">{item.title}</div>
                                    <div className="safari-sugg-url">{item.url}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Action Cluster */}
                <div className="safari-actions-cluster">
                    <button 
                        className="safari-btn"
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        title="Share this page"
                    >
                        <SafariIcon name="share" size={15} />
                    </button>

                    <button 
                        className="safari-btn"
                        onClick={() => handleCreateTab()}
                        title="New Tab (⌘T)"
                    >
                        <SafariIcon name="plus" size={15} />
                    </button>

                    <button 
                        className="safari-btn"
                        onClick={() => handleNavigate('safari://startpage')}
                        title="Show Start Page"
                    >
                        <SafariIcon name="grid" size={14} />
                    </button>
                </div>
            </div>

            {/* Share Popover */}
            {showShareMenu && (
                <div className="safari-popover">
                    <div className="safari-popover-item" onClick={() => { setShowShareMenu(false); if(window.showMacDialog) window.showMacDialog({ title:'Safari Share', message:'Link copied to clipboard.' }); }}>
                        <SafariIcon name="copy" size={14} />
                        <span>Copy Link</span>
                    </div>
                    <div className="safari-popover-item" onClick={() => { setShowShareMenu(false); if(window.showMacDialog) window.showMacDialog({ title:'Safari Bookmarks', message:'Added to Bookmarks bar.' }); }}>
                        <SafariIcon name="bookmark" size={14} />
                        <span>Add Bookmark</span>
                    </div>
                    <div className="safari-popover-item" onClick={() => { setShowShareMenu(false); if(window.showMacDialog) window.showMacDialog({ title:'Reading List', message:'Added to Reading List for offline viewing.' }); }}>
                        <SafariIcon name="book-open" size={14} />
                        <span>Add to Reading List</span>
                    </div>
                    <div className="safari-popover-item" onClick={() => { setShowShareMenu(false); if(window.appState) window.appState.openApp('messages'); }}>
                        <SafariIcon name="message-square" size={14} />
                        <span>Send via Messages</span>
                    </div>
                    <div className="safari-popover-item" onClick={() => { setShowShareMenu(false); if(window.appState) window.appState.openApp('outlook'); }}>
                        <SafariIcon name="mail" size={14} />
                        <span>Send via Mail</span>
                    </div>
                </div>
            )}

            {/* Tab Strip */}
            <div className="safari-tab-bar">
                {tabs.map(tab => {
                    const fav = getFavicon(tab.url);
                    return (
                        <div 
                            key={tab.id}
                            className={`safari-tab ${tab.id === activeTabId ? 'active' : ''}`}
                            onClick={() => { setActiveTabId(tab.id); setReaderMode(false); }}
                        >
                            <div className="safari-tab-favicon">
                                {fav.type === 'img' ? (
                                    <img src={fav.src} className="safari-tab-fav-img" alt="" />
                                ) : (
                                    <SafariIcon name={fav.name} size={13} color={tab.id === activeTabId ? '#007aff' : '#6b7280'} />
                                )}
                            </div>
                            <div className="safari-tab-title">{tab.title}</div>
                            <button 
                                className="safari-tab-close"
                                onClick={(e) => handleCloseTab(tab.id, e)}
                                title="Close Tab"
                            >
                                <SafariIcon name="x" size={11} />
                            </button>
                        </div>
                    );
                })}
                <button 
                    className="safari-tab-new-btn"
                    onClick={() => handleCreateTab()}
                    title="New Tab"
                >
                    <SafariIcon name="plus" size={14} />
                </button>
            </div>

            {/* App Body */}
            <div className="safari-body">
                {/* Collapsible Sidebar */}
                <div className={`safari-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
                    <div className="safari-sidebar-nav">
                        <button 
                            className={`safari-sb-tab ${sidebarTab === 'bookmarks' ? 'active' : ''}`}
                            onClick={() => setSidebarTab('bookmarks')}
                        >
                            <SafariIcon name="bookmark" size={13} />
                            <span>Bookmarks</span>
                        </button>
                        <button 
                            className={`safari-sb-tab ${sidebarTab === 'reading' ? 'active' : ''}`}
                            onClick={() => setSidebarTab('reading')}
                        >
                            <SafariIcon name="book-open" size={13} />
                            <span>Reading List</span>
                        </button>
                    </div>

                    <div className="safari-sidebar-content">
                        {sidebarTab === 'bookmarks' ? (
                            <div>
                                <div className="safari-sb-section-title">Favorites</div>
                                {FAVORITES.map(f => (
                                    <div 
                                        key={f.id} 
                                        className="safari-sb-item"
                                        onClick={() => handleNavigate(f.url)}
                                    >
                                        <div className="safari-sb-icon-box">
                                            <img src={f.iconSrc} className="safari-sb-icon-img" alt="" />
                                        </div>
                                        <span className="safari-sb-label">{f.title}</span>
                                    </div>
                                ))}

                                <div className="safari-sb-section-title" style={{ marginTop: '12px' }}>Reading & Dev</div>
                                {BOOKMARKS.map(b => (
                                    <div 
                                        key={b.id} 
                                        className="safari-sb-item"
                                        onClick={() => handleNavigate(b.url)}
                                    >
                                        <div className="safari-sb-icon-box">
                                            <img src={b.iconSrc} className="safari-sb-icon-img" alt="" />
                                        </div>
                                        <span className="safari-sb-label">{b.title}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <div className="safari-sb-section-title">Saved Articles</div>
                                {READING_LIST.map(r => (
                                    <div 
                                        key={r.id} 
                                        className="safari-sb-item" 
                                        style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '3px', padding: '8px' }}
                                        onClick={() => handleNavigate(r.url)}
                                    >
                                        <span style={{ fontSize: '10px', color: '#007aff', fontWeight: '600', textTransform: 'uppercase' }}>{r.site}</span>
                                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#1d1d1f', lineHeight: '1.3' }}>{r.title}</span>
                                        <span style={{ fontSize: '11px', color: '#86868b' }}>{r.date}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="safari-content-view">
                    {readerMode ? (
                        <div className="safari-reader-view">
                            <div className="safari-reader-h1">{activeTab.title}</div>
                            <div className="safari-reader-meta">Published in WebKit & Apple Newsroom • Clean Reader View</div>
                            <p>Safari in macOS Sequoia elevates web browsing with revolutionary performance, intelligent privacy protections, and seamless window integration across the Apple ecosystem.</p>
                            <br/>
                            <p>With hardware-accelerated rendering and modern CSS Grid architectures, web applications execute with native desktop responsiveness while maintaining zero energy footprint when inactive in the background.</p>
                            <br/>
                            <p>Intelligent Tracking Prevention automatically safeguards your browsing fingerprint across domains, preventing third-party ad networks from constructing cross-site tracking profiles.</p>
                        </div>
                    ) : (
                        <WebpageRouter 
                            tab={activeTab} 
                            onNavigate={handleNavigate}
                            searchQueryInput={searchQueryInput}
                            setSearchQueryInput={setSearchQueryInput}
                            startPageConfig={startPageConfig}
                            setStartPageConfig={setStartPageConfig}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Router for simulated websites
const WebpageRouter = ({ tab, onNavigate, searchQueryInput, setSearchQueryInput, startPageConfig, setStartPageConfig }) => {
    const url = tab.url || 'safari://startpage';

    if (url === 'safari://startpage') {
        return (
            <StartPageView 
                onNavigate={onNavigate} 
                startPageConfig={startPageConfig} 
                setStartPageConfig={setStartPageConfig} 
            />
        );
    }

    if (url === 'google.com' || url.includes('google')) {
        return (
            <GoogleView 
                query={tab.query} 
                onNavigate={onNavigate} 
                searchQueryInput={searchQueryInput} 
                setSearchQueryInput={setSearchQueryInput} 
            />
        );
    }

    if (url === 'apple.com' || url.includes('apple')) {
        return <AppleView onNavigate={onNavigate} />;
    }

    if (url === 'github.com' || url.includes('github')) {
        return <GitHubView onNavigate={onNavigate} />;
    }

    if (url === 'wikipedia.org' || url.includes('wikipedia')) {
        return <WikipediaView onNavigate={onNavigate} />;
    }

    if (url === 'news.ycombinator.com' || url.includes('ycombinator')) {
        return <HackerNewsView onNavigate={onNavigate} />;
    }

    return <GenericWebsiteView url={url} onNavigate={onNavigate} />;
};

// Start Page Component (Matching authentic macOS Safari)
const StartPageView = ({ onNavigate, startPageConfig, setStartPageConfig }) => {
    const [showCustomizeModal, setShowCustomizeModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleOption = (key) => {
        if (setStartPageConfig) {
            setStartPageConfig(prev => ({ ...prev, [key]: !prev[key] }));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onNavigate('google.com', searchTerm.trim());
        }
    };

    const hasBg = !startPageConfig || startPageConfig.backgroundImage;

    return (
        <div className={`safari-startpage ${hasBg ? 'with-wallpaper' : 'no-wallpaper'}`}>
            <div className="safari-startpage-container">
                {/* Search Bar */}
                <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '680px', margin: '0 auto 20px auto', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)' }}>
                        <SafariIcon name="search" size={16} />
                    </div>
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search or enter website name"
                        style={{
                            width: '100%',
                            height: '46px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(30px)',
                            WebkitBackdropFilter: 'blur(30px)',
                            padding: '0 16px 0 44px',
                            fontSize: '15px',
                            color: '#ffffff',
                            outline: 'none',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
                        }}
                    />
                </form>
                {/* Favorites Section */}
                {(!startPageConfig || startPageConfig.favorites) && (
                    <div className="safari-sp-section">
                        <div className="safari-sp-header">
                            <div className="safari-sp-title">Favorites</div>
                        </div>
                        <div className="safari-favorites-grid">
                            {FAVORITES.map(fav => (
                                <div 
                                    key={fav.id} 
                                    className="safari-favorite-card"
                                    onClick={() => onNavigate(fav.url)}
                                >
                                    <div className="safari-fav-icon-wrapper">
                                        <img src={fav.iconSrc} className="safari-fav-img" alt={fav.title} />
                                    </div>
                                    <div className="safari-fav-title">{fav.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Frequently Visited Section */}
                {(!startPageConfig || startPageConfig.frequentlyVisited) && (
                    <div className="safari-sp-section">
                        <div className="safari-sp-header">
                            <div className="safari-sp-title">Frequently Visited</div>
                        </div>
                        <div className="safari-fv-grid">
                            {FREQUENTLY_VISITED.map(site => (
                                <div 
                                    key={site.id} 
                                    className="safari-fv-card"
                                    onClick={() => onNavigate(site.url)}
                                >
                                    <div className="safari-fv-preview">
                                        <div className="safari-fv-topbar">
                                            <div className="safari-fv-dots">
                                                <div className="safari-fv-dot"></div>
                                                <div className="safari-fv-dot"></div>
                                                <div className="safari-fv-dot"></div>
                                            </div>
                                            <div className="safari-fv-url-bar">{site.domain}</div>
                                        </div>
                                        <div 
                                            className="safari-fv-img" 
                                            style={{ backgroundImage: `url(${site.previewImage})` }}
                                        >
                                            <div className="safari-fv-overlay">
                                                <div className="safari-fv-headline">{site.headline}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="safari-fv-domain">{site.domain}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Siri Suggestions Section */}
                {(!startPageConfig || startPageConfig.siriSuggestions) && (
                    <div className="safari-sp-section">
                        <div className="safari-sp-header">
                            <div className="safari-sp-title">Siri Suggestions</div>
                        </div>
                        <div className="safari-siri-grid">
                            {SIRI_SUGGESTIONS.map(siri => (
                                <div 
                                    key={siri.id} 
                                    className="safari-siri-card"
                                    style={{ background: siri.bg }}
                                    onClick={() => onNavigate(siri.url)}
                                >
                                    <div className="safari-siri-info">
                                        <div className="safari-siri-title">{siri.title}</div>
                                        <div className="safari-siri-domain">{siri.domain}</div>
                                    </div>
                                    <img src={siri.img} className="safari-siri-thumb" alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Privacy Report Section */}
                {startPageConfig && startPageConfig.privacyReport && (
                    <div className="safari-privacy-card">
                        <div className="safari-privacy-left">
                            <div className="safari-privacy-shield">
                                <SafariIcon name="shield" size={24} color="#34c759" />
                            </div>
                            <div>
                                <div className="safari-privacy-title">Privacy Report</div>
                                <div className="safari-privacy-desc">In the last 30 days, Safari prevented 78 trackers from profiling you.</div>
                            </div>
                        </div>
                        <div className="safari-privacy-stat">
                            78
                            <span>Trackers Blocked</span>
                        </div>
                    </div>
                )}

                {/* Reading List Section */}
                {startPageConfig && startPageConfig.readingList && (
                    <div className="safari-sp-section">
                        <div className="safari-sp-header">
                            <div className="safari-sp-title">Reading List</div>
                        </div>
                        <div className="safari-reading-grid">
                            {READING_LIST.map(article => (
                                <div 
                                    key={article.id} 
                                    className="safari-reading-card"
                                    onClick={() => onNavigate(article.url)}
                                >
                                    <div className="safari-rc-site">{article.site}</div>
                                    <div className="safari-rc-title">{article.title}</div>
                                    <div className="safari-rc-preview">{article.preview}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Customization Sliders Button */}
            <button 
                className="safari-sp-customize-btn"
                onClick={() => setShowCustomizeModal(!showCustomizeModal)}
                title="Customize Start Page"
            >
                <SafariIcon name="sliders" size={16} color="#ffffff" />
            </button>

            {/* Customization Popover */}
            {showCustomizeModal && (
                <div className="safari-sp-customize-modal">
                    <div className="safari-sp-option-row" onClick={() => toggleOption('favorites')}>
                        <span>Favorites</span>
                        <input type="checkbox" checked={!!startPageConfig?.favorites} readOnly />
                    </div>
                    <div className="safari-sp-option-row" onClick={() => toggleOption('frequentlyVisited')}>
                        <span>Frequently Visited</span>
                        <input type="checkbox" checked={!!startPageConfig?.frequentlyVisited} readOnly />
                    </div>
                    <div className="safari-sp-option-row" onClick={() => toggleOption('siriSuggestions')}>
                        <span>Siri Suggestions</span>
                        <input type="checkbox" checked={!!startPageConfig?.siriSuggestions} readOnly />
                    </div>
                    <div className="safari-sp-option-row" onClick={() => toggleOption('readingList')}>
                        <span>Reading List</span>
                        <input type="checkbox" checked={!!startPageConfig?.readingList} readOnly />
                    </div>
                    <div className="safari-sp-option-row" onClick={() => toggleOption('privacyReport')}>
                        <span>Privacy Report</span>
                        <input type="checkbox" checked={!!startPageConfig?.privacyReport} readOnly />
                    </div>
                    <div className="safari-sp-option-row" onClick={() => toggleOption('backgroundImage')}>
                        <span>Background Image</span>
                        <input type="checkbox" checked={!!startPageConfig?.backgroundImage} readOnly />
                    </div>
                </div>
            )}
        </div>
    );
};

// Google View
const GoogleView = ({ query, onNavigate, searchQueryInput, setSearchQueryInput }) => {
    const [searchTerm, setSearchTerm] = useState(query || '');

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (searchTerm.trim()) {
            onNavigate('google.com', searchTerm.trim());
        }
    };

    if (query) {
        // Render Search Results
        return (
            <div className="safari-web-google">
                <div style={{ display: 'flex', alignItems: 'center', padding: '16px 28px', borderBottom: '1px solid #dfe1e5', gap: '24px' }}>
                    <div 
                        className="safari-google-logo" 
                        style={{ fontSize: '24px', margin: 0, cursor: 'pointer' }}
                        onClick={() => onNavigate('google.com')}
                    >
                        <span className="safari-g-blue">G</span>
                        <span className="safari-g-red">o</span>
                        <span className="safari-g-yellow">o</span>
                        <span className="safari-g-blue">g</span>
                        <span className="safari-g-green">l</span>
                        <span className="safari-g-red">e</span>
                    </div>

                    <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '600px' }}>
                        <div className="safari-google-searchbox" style={{ height: '38px' }}>
                            <input 
                                type="text"
                                className="safari-google-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <SafariIcon name="search" size={16} color="#4285f4" />
                        </div>
                    </form>
                </div>

                <div className="safari-google-results-view">
                    <div className="safari-gr-stat">About 1,420,000 results (0.34 seconds) for <strong>{query}</strong></div>

                    <div className="safari-gr-card">
                        <div className="safari-gr-cite">https://www.apple.com &gt; macos &gt; sequoia</div>
                        <div className="safari-gr-title" onClick={() => onNavigate('apple.com')}>macOS Sequoia - Apple Official Overview</div>
                        <div className="safari-gr-desc">Discover macOS Sequoia. Explore new ways to work with iPhone Mirroring, transform browsing with Safari Highlights, and discover effortless window tiling.</div>
                    </div>

                    <div className="safari-gr-card">
                        <div className="safari-gr-cite">https://github.com &gt; Joykumbhakar &gt; MacOS-Interface</div>
                        <div className="safari-gr-title" onClick={() => onNavigate('github.com')}>GitHub - Joykumbhakar/MacOS-Interface: Authentic macOS Simulator</div>
                        <div className="safari-gr-desc">A pixel-perfect macOS desktop experience built for the web. Full Finder, Settings, Apple Music, Safari, Dynamic Island, and native office apps.</div>
                    </div>

                    <div className="safari-gr-card">
                        <div className="safari-gr-cite">https://en.wikipedia.org &gt; wiki &gt; macOS_Sequoia</div>
                        <div className="safari-gr-title" onClick={() => onNavigate('wikipedia.org')}>macOS Sequoia - Wikipedia, the free encyclopedia</div>
                        <div className="safari-gr-desc">macOS Sequoia (version 15) is the upcoming major release of macOS, Apple Inc.'s operating system for Mac computers announced at WWDC.</div>
                    </div>

                    <div className="safari-gr-card">
                        <div className="safari-gr-cite">https://news.ycombinator.com &gt; item?id=40643210</div>
                        <div className="safari-gr-title" onClick={() => onNavigate('news.ycombinator.com')}>Show HN: WebKit Performance and Modern Browser Simulation</div>
                        <div className="safari-gr-desc">Discussion and architectural insights on modern browser rendering pipelines, zero-latency state updates, and Apple design standards.</div>
                    </div>
                </div>
            </div>
        );
    }

    // Google Home Page
    return (
        <div className="safari-web-google">
            <div className="safari-google-topbar">
                <span>Gmail</span>
                <span>Images</span>
                <SafariIcon name="grid" size={16} color="#5f6368" />
            </div>

            <div className="safari-google-center">
                <div className="safari-google-logo">
                    <span className="safari-g-blue">G</span>
                    <span className="safari-g-red">o</span>
                    <span className="safari-g-yellow">o</span>
                    <span className="safari-g-blue">g</span>
                    <span className="safari-g-green">l</span>
                    <span className="safari-g-red">e</span>
                </div>

                <form onSubmit={handleSearch} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="safari-google-searchbox">
                        <SafariIcon name="search" size={16} color="#9aa0a6" />
                        <input 
                            type="text" 
                            className="safari-google-input" 
                            placeholder="Search Google or type a URL"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="safari-google-buttons">
                        <button type="submit" className="safari-g-btn">Google Search</button>
                        <button type="button" className="safari-g-btn" onClick={() => onNavigate('apple.com')}>{"I'm Feeling Lucky"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Apple Simulated View
const AppleView = ({ onNavigate }) => {
    return (
        <div className="safari-web-apple">
            <div className="safari-apple-nav">
                <img src="images/Icons/Apple.png" style={{ width: '16px', height: '16px', objectFit: 'contain', cursor: 'pointer' }} onClick={() => onNavigate('apple.com')} alt="Apple" />
                <span onClick={() => onNavigate('apple.com')}>Mac</span>
                <span onClick={() => onNavigate('apple.com')}>iPad</span>
                <span onClick={() => onNavigate('apple.com')}>iPhone</span>
                <span onClick={() => onNavigate('apple.com')}>Watch</span>
                <span onClick={() => onNavigate('apple.com')}>Vision</span>
                <span onClick={() => onNavigate('apple.com')}>AirPods</span>
                <span onClick={() => onNavigate('apple.com')}>Support</span>
            </div>

            <div className="safari-apple-hero">
                <div className="safari-apple-h1">MacBook Pro</div>
                <div className="safari-apple-sub">Mind-blowing. Head-turning.</div>
                <div className="safari-apple-cta-row">
                    <button className="safari-apple-btn-blue">Learn more</button>
                    <button className="safari-apple-btn-outline">Buy</button>
                </div>
            </div>

            <div className="safari-apple-grid">
                <div className="safari-apple-card">
                    <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>macOS Sequoia</h3>
                    <p style={{ fontSize: '14px', color: '#86868b', marginBottom: '16px' }}>Power and intelligence built right into your Mac.</p>
                    <span style={{ color: '#2997ff', fontSize: '13px', cursor: 'pointer' }}>Explore features &gt;</span>
                </div>

                <div className="safari-apple-card">
                    <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>M3 Max & M4 Pro</h3>
                    <p style={{ fontSize: '14px', color: '#86868b', marginBottom: '16px' }}>Extreme performance for extreme workloads.</p>
                    <span style={{ color: '#2997ff', fontSize: '13px', cursor: 'pointer' }}>Learn more &gt;</span>
                </div>

                <div className="safari-apple-card">
                    <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>Liquid Retina XDR</h3>
                    <p style={{ fontSize: '14px', color: '#86868b', marginBottom: '16px' }}>1600 nits peak brightness and ProMotion 120Hz.</p>
                    <span style={{ color: '#2997ff', fontSize: '13px', cursor: 'pointer' }}>See display tech &gt;</span>
                </div>
            </div>
        </div>
    );
};

// GitHub Simulated View
const GitHubView = ({ onNavigate }) => {
    return (
        <div className="safari-web-github">
            <div className="safari-gh-header">
                <img src="images/Icons/Github.png" style={{ width: '24px', height: '24px', objectFit: 'contain' }} alt="GitHub" />
                <span style={{ fontWeight: '600', fontSize: '14px', color: '#ffffff' }}>GitHub</span>
                <span style={{ fontSize: '13px', color: '#8b949e', marginLeft: '12px' }}>Joykumbhakar / MacOS-Interface</span>
            </div>

            <div className="safari-gh-body">
                <div className="safari-gh-repo-title">
                    <img src="images/Icons/Github.png" style={{ width: '18px', height: '18px', objectFit: 'contain' }} alt="" />
                    <span>MacOS-Interface</span>
                    <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '12px', border: '1px solid #30363d', color: '#8b949e' }}>Public</span>
                </div>

                <div className="safari-gh-readme">
                    <div className="safari-gh-readme-head">
                        <SafariIcon name="book-open" size={14} color="#8b949e" style={{ marginRight: '8px' }} />
                        <span>README.md</span>
                    </div>
                    <div className="safari-gh-readme-body">
                        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px', color: '#ffffff' }}>macOS Sequoia Web Interface</h2>
                        <p style={{ marginBottom: '14px' }}>A high-fidelity web simulation of macOS Sequoia with desktop window management, Finder filesystem, Apple Music, Messages, Office suite, and Safari browser.</p>
                        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <li>Zero external emoji dependencies — vector SVG icons throughout.</li>
                            <li>Strict Apple Human Interface Guidelines styling without artificial glows.</li>
                            <li>Full multi-tab Safari with smart search omnibar and start page.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Wikipedia Simulated View
const WikipediaView = ({ onNavigate }) => {
    return (
        <div className="safari-web-wiki">
            <h1 className="safari-wiki-h1">macOS Sequoia</h1>
            
            <div className="safari-wiki-infobox">
                <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '8px', textAlign: 'center' }}>macOS Sequoia</div>
                <div style={{ borderTop: '1px solid #d2d2d7', paddingTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div><strong>Developer:</strong> Apple Inc.</div>
                    <div><strong>Written in:</strong> C, C++, Objective-C, Swift</div>
                    <div><strong>OS family:</strong> Macintosh, Unix</div>
                    <div><strong>Initial release:</strong> September 2024</div>
                    <div><strong>Platform:</strong> Apple silicon</div>
                </div>
            </div>

            <p><strong>macOS Sequoia</strong> (version 15) is the operating system for Apple Mac computers. Announced at the 2024 Worldwide Developers Conference (WWDC) on June 10, 2024, it succeeds macOS Sonoma.</p>
            <br/>
            <p>The operating system is named after the Sequoia National Park in California. Major features include iPhone Mirroring, an overhauled Passwords application, updates to Safari including Highlights and Distraction Control, and system-wide intelligence.</p>
            <br/>
            <h2 style={{ fontSize: '20px', fontFamily: 'sans-serif', borderBottom: '1px solid #d2d2d7', paddingBottom: '4px', marginTop: '20px', marginBottom: '10px' }}>Features and Enhancements</h2>
            <p>Safari in macOS Sequoia introduces an updated Reader mode that generates automated summaries and tables of contents, unified tab management, and enhanced WebKit privacy defenses.</p>
        </div>
    );
};

// Hacker News Simulated View
const HackerNewsView = ({ onNavigate }) => {
    const stories = [
        { id: 1, title: 'macOS Interface built with pure web technologies and React', points: 412, author: 'joykumbhakar', time: '3 hours ago', comments: 128 },
        { id: 2, title: 'WebKit achieves new JS engine throughput records in macOS Sequoia', points: 319, author: 't_cook', time: '5 hours ago', comments: 84 },
        { id: 3, title: 'Show HN: Spatial window manager running entirely in client-side DOM', points: 275, author: 'alex_dev', time: '6 hours ago', comments: 52 },
        { id: 4, title: 'Why flat, crisp vector typography outlasts artificial UI shadows', points: 198, author: 'designer_dan', time: '8 hours ago', comments: 94 },
        { id: 5, title: 'The architecture of modern web browsers: A 2026 perspective', points: 154, author: 'linus_k', time: '11 hours ago', comments: 39 }
    ];

    return (
        <div className="safari-web-hn">
            <div className="safari-hn-header">
                <span>Hacker News</span>
                <span style={{ fontWeight: '400', fontSize: '11px', marginLeft: '12px' }}>new | past | comments | ask | show | jobs | submit</span>
            </div>

            <div className="safari-hn-list">
                {stories.map((s, idx) => (
                    <div key={s.id}>
                        <div className="safari-hn-item">
                            <span className="safari-hn-rank">{idx + 1}.</span>
                            <span className="safari-hn-title">{s.title}</span>
                        </div>
                        <div className="safari-hn-sub">
                            {s.points} points by {s.author} {s.time} | hide | {s.comments} comments
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Generic / Custom Web Page View
const GenericWebsiteView = ({ url, onNavigate }) => {
    return (
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#fcfcfd' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <img src="images/Icons/safari.png" style={{ width: '48px', height: '48px', objectFit: 'contain' }} alt="Safari" />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px', color: '#1d1d1f' }}>{url}</h2>
            <p style={{ fontSize: '14px', color: '#86868b', maxWidth: '440px', lineHeight: '1.5', marginBottom: '24px' }}>
                Simulated web connection established. You are browsing the web securely inside Safari for macOS Sequoia.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                    onClick={() => onNavigate('safari://startpage')}
                    style={{ padding: '8px 16px', borderRadius: '8px', background: '#007aff', color: '#ffffff', border: 'none', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
                >
                    Return to Start Page
                </button>
                <button 
                    onClick={() => onNavigate('google.com')}
                    style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(0,0,0,0.06)', color: '#1d1d1f', border: 'none', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
                >
                    Search on Google
                </button>
            </div>
        </div>
    );
};

window.renderSafariApp = () => {
    const rootEl = document.getElementById('safari-react-root');
    if (rootEl) {
        try {
            ReactDOM.render(<SafariApp />, rootEl);
        } catch (e) {
            rootEl.innerHTML = '<div style="color:red;padding:20px;">React Error: ' + e.message + '</div>';
        }
    }
};

if (document.getElementById('safari-react-root')) {
    window.renderSafariApp();
}
