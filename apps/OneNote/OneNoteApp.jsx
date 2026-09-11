const { useState, useEffect, useRef } = React;

// Custom SVG Icon component for authentic macOS vector rendering
const OneNoteIcon = ({ name, size = 16, color = 'currentColor', strokeWidth = 2, className = '' }) => {
    const icons = {
        'plus': <path d="M12 5v14 M5 12h14" />,
        'search': <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
        'trash': <path d="M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2 M10 11v6 M14 11v6" />,
        'bold': <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />,
        'italic': <path d="M19 4h-9 M14 20H5 M15 4L9 20" />,
        'underline': <path d="M6 4v6a6 6 0 0 0 12 0V4 M4 20h16" />,
        'strike': <path d="M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6 M4 12h16" />,
        'h1': <path d="M4 12h8 M4 4v16 M12 4v16 M17 12l3-2v10" />,
        'h2': <path d="M4 12h8 M4 4v16 M12 4v16 M21 18h-4c0-4 4-3 4-6 0-1.5-1-2.5-2.5-2.5S16 10.5 16 12" />,
        'list': <path d="M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01" />,
        'list-ordered': <path d="M10 6h11 M10 12h11 M10 18h11 M4 6h1v4 M4 10h2 M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />,
        'check-square': <path d="M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />,
        'highlighter': <path d="M9 11l-6 6v3h3l6-6m-3-3l7-7a2 2 0 013 3l-7 7m-3-3l3 3" />,
        'tag': <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01" />,
        'book': <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />,
        'folder': <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />,
        'file-text': <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />,
        'cloud-check': <path d="M19 16.9A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25 M9 15l2 2 4-4" />,
        'chevron-down': <path d="M6 9l6 6 6-6" />,
        'chevron-right': <path d="M9 18l6-6-6-6" />,
        'sidebar': <path d="M3 3h18v18H3z M9 3v18" />,
        'palette': <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1 0 2-.5 2-1.5 0-.5-.2-.9-.5-1.2-.3-.4-.5-.9-.5-1.3 0-1.1.9-2 2-2h1.5c3 0 5.5-2.5 5.5-5.5C22 6.8 17.5 2 12 2z" />,
        'sparkles': <path d="M12 3l1.9 4.8L18.7 9.7l-4.8 1.9L12 16.4l-1.9-4.8L5.3 9.7l4.8-1.9L12 3z M19 17l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" />
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

const INITIAL_DATA = [
    {
        id: 'sec-1',
        title: 'Quick Notes',
        color: '#7719aa',
        pages: [
            {
                id: 'page-1-1',
                title: 'Welcome to OneNote for Mac',
                date: 'Tuesday, 22 August, 10:41 AM',
                content: `<h3>Get Started with OneNote</h3><p>Capture thoughts, organize projects, and collaborate seamlessly in a macOS Sequoia inspired environment.</p><br/><ul><li><strong>Rich Formatting:</strong> Use headings, highlights, bold and italic text styles.</li><li><strong>Interactive Checklists:</strong> Plan tasks and manage your to-do items directly.</li><li><strong>Notebook Sections:</strong> Organize notes into distinct colorful categories.</li></ul><br/><p><span style="background-color: #fff176; padding: 2px 6px; border-radius: 4px; font-weight: 500;">Tip:</span> Click anywhere on this page to edit, add new items, or format your notes.</p>`
            },
            {
                id: 'page-1-2',
                title: 'Project Roadmap & Ideas',
                date: 'Wednesday, 23 August, 02:15 PM',
                content: `<h3>Q4 Vision & Goals</h3><p>Key focus areas for the next release cycle:</p><br/><ul><li>Enhance system performance and responsive window animations.</li><li>Refine dark mode integration and frosted glass materials.</li><li>Add cross-app drag and drop support.</li></ul>`
            }
        ]
    },
    {
        id: 'sec-2',
        title: 'Work & Meetings',
        color: '#0078d4',
        pages: [
            {
                id: 'page-2-1',
                title: 'Sprint Planning Notes',
                date: 'Thursday, 24 August, 09:30 AM',
                content: `<h3>Sprint 14 Priorities</h3><p><strong>Attendees:</strong> Engineering Team, Product Lead, Design System Lead</p><br/><ul><li>Implement high-performance Canvas rendering for whiteboard view.</li><li>Update color tokens and typographic hierarchy.</li><li>Run full regression tests on macOS simulation suite.</li></ul>`
            },
            {
                id: 'page-2-2',
                title: 'Design System Review',
                date: 'Friday, 25 August, 11:00 AM',
                content: `<h3>Design Tokens & Guidelines</h3><p>Ensure all native window headers respect traffic light margins with at least 80px left clearance.</p><br/><p>Always use clean vector SVG icons instead of emojis for professional HIG consistency.</p>`
            }
        ]
    },
    {
        id: 'sec-3',
        title: 'Personal & Research',
        color: '#008272',
        pages: [
            {
                id: 'page-3-1',
                title: 'Reading List & Articles',
                date: 'Saturday, 26 August, 04:20 PM',
                content: `<h3>Recommended Architecture Books</h3><ul><li>Designing Data-Intensive Applications</li><li>System Design Interview Principles</li><li>Refactoring: Improving the Design of Existing Code</li></ul>`
            },
            {
                id: 'page-3-2',
                title: 'Travel Itinerary: Japan',
                date: 'Sunday, 27 August, 06:45 PM',
                content: `<h3>Tokyo & Kyoto Trip Plan</h3><p>Locations to explore:</p><ul><li>Shibuya Crossing & Meiji Shrine</li><li>Arashiyama Bamboo Grove in Kyoto</li><li>Fushimi Inari Taisha</li><li>Akihabara Tech District</li></ul>`
            }
        ]
    }
];

const HIGHLIGHT_COLORS = [
    { label: 'Yellow', color: '#fff176' },
    { label: 'Green', color: '#a7f3d0' },
    { label: 'Cyan', color: '#bae6fd' },
    { label: 'Pink', color: '#fbcfe8' },
    { label: 'Purple', color: '#e9d5ff' }
];

const OneNoteApp = () => {
    const [sections, setSections] = useState(() => {
        try {
            const saved = localStorage.getItem('macos_onenote_data');
            return saved ? JSON.parse(saved) : INITIAL_DATA;
        } catch (e) {
            return INITIAL_DATA;
        }
    });

    const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || 'sec-1');
    const [activePageId, setActivePageId] = useState(sections[0]?.pages[0]?.id || 'page-1-1');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('home'); // 'home', 'insert', 'view'
    const [showSidebar, setShowSidebar] = useState(true);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isSaved, setIsSaved] = useState(true);

    const titleRef = useRef(null);
    const editorRef = useRef(null);

    // Save to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem('macos_onenote_data', JSON.stringify(sections));
        } catch (e) {
            console.warn('Failed to save OneNote data', e);
        }
    }, [sections]);

    const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];
    const activePage = activeSection?.pages.find(p => p.id === activePageId) || activeSection?.pages[0];

    // Synchronize title & editor content when active page changes
    useEffect(() => {
        if (titleRef.current && activePage) {
            titleRef.current.innerText = activePage.title;
        }
        if (editorRef.current && activePage) {
            editorRef.current.innerHTML = activePage.content;
        }
    }, [activePageId, activeSectionId]);

    const handleTitleChange = (e) => {
        const newTitle = e.target.innerText || 'Untitled Page';
        setSections(prev => prev.map(sec => {
            if (sec.id !== activeSectionId) return sec;
            return {
                ...sec,
                pages: sec.pages.map(p => p.id === activePageId ? { ...p, title: newTitle } : p)
            };
        }));
        triggerSaveStatus();
    };

    const handleContentChange = () => {
        if (!editorRef.current) return;
        const newContent = editorRef.current.innerHTML;
        setSections(prev => prev.map(sec => {
            if (sec.id !== activeSectionId) return sec;
            return {
                ...sec,
                pages: sec.pages.map(p => p.id === activePageId ? { ...p, content: newContent } : p)
            };
        }));
        triggerSaveStatus();
    };

    const triggerSaveStatus = () => {
        setIsSaved(false);
        setTimeout(() => setIsSaved(true), 600);
    };

    const handleAddSection = () => {
        const sectionTitles = ['Ideas & Drafts', 'Design System', 'Meeting Records', 'Tasks & Backlog', 'Research Notes'];
        const sectionColors = ['#7719aa', '#0078d4', '#008272', '#d83b01', '#881798', '#107c41'];
        const randomTitle = sectionTitles[Math.floor(Math.random() * sectionTitles.length)];
        const randomColor = sectionColors[Math.floor(Math.random() * sectionColors.length)];
        const newSecId = 'sec-' + Date.now();
        const newPageId = 'page-' + Date.now();

        const newSec = {
            id: newSecId,
            title: randomTitle,
            color: randomColor,
            pages: [
                {
                    id: newPageId,
                    title: 'Untitled Page',
                    date: new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }),
                    content: `<p>Start typing your new notes here...</p>`
                }
            ]
        };

        setSections(prev => [...prev, newSec]);
        setActiveSectionId(newSecId);
        setActivePageId(newPageId);
    };

    const handleAddPage = () => {
        if (!activeSection) return;
        const newPageId = 'page-' + Date.now();
        const newPage = {
            id: newPageId,
            title: 'Untitled Page',
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }),
            content: `<p>Type note content here...</p>`
        };

        setSections(prev => prev.map(sec => {
            if (sec.id !== activeSectionId) return sec;
            return {
                ...sec,
                pages: [newPage, ...sec.pages]
            };
        }));
        setActivePageId(newPageId);
    };

    const handleDeletePage = (e, pageIdToDelete) => {
        e.stopPropagation();
        if (!activeSection) return;
        if (activeSection.pages.length <= 1) {
            alert('A section must have at least one page.', 'Microsoft OneNote', 'images/Icons/MsOnenotes.png');
            return;
        }

        setSections(prev => prev.map(sec => {
            if (sec.id !== activeSectionId) return sec;
            const updatedPages = sec.pages.filter(p => p.id !== pageIdToDelete);
            return { ...sec, pages: updatedPages };
        }));

        if (activePageId === pageIdToDelete) {
            const remaining = activeSection.pages.filter(p => p.id !== pageIdToDelete);
            if (remaining.length > 0) {
                setActivePageId(remaining[0].id);
            }
        }
    };

    const execCmd = (cmd, val = null) => {
        document.execCommand(cmd, false, val);
        if (editorRef.current) {
            editorRef.current.focus({ preventScroll: true });
        }
        handleContentChange();
    };

    const handleInsertChecklist = () => {
        if (!editorRef.current) return;
        const html = `<div><span style="display:inline-flex; align-items:center; margin-right:6px; user-select:none; color:#7719aa;">[ ]</span> New task item</div>`;
        document.execCommand('insertHTML', false, html);
        handleContentChange();
    };

    const handleInsertTag = (tagName) => {
        if (!editorRef.current) return;
        const colors = {
            'Important': { bg: '#fee2e2', text: '#dc2626' },
            'To Do': { bg: '#e0e7ff', text: '#4338ca' },
            'Idea': { bg: '#fef3c7', text: '#b45309' },
            'Question': { bg: '#f3e8ff', text: '#7e22ce' }
        };
        const conf = colors[tagName] || { bg: '#f3f4f6', text: '#374151' };
        const html = `<span style="display:inline-block; padding:2px 8px; margin:0 4px; border-radius:12px; font-size:12px; font-weight:600; background-color:${conf.bg}; color:${conf.text}; user-select:none;">${tagName}</span>&nbsp;`;
        document.execCommand('insertHTML', false, html);
        handleContentChange();
    };

    const handleHighlight = (color) => {
        execCmd('hiliteColor', color);
        setShowColorPicker(false);
    };

    // Filter pages if search query is active
    const visiblePages = (activeSection?.pages || []).filter(p => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
    });

    return (
        <div className="onenote-app-container">
            {/* Top Unified Header / Ribbon with Traffic-Light Clearance */}
            <div className="onenote-header-bar">
                {/* Left safe-area spacer for macOS traffic lights (84px width) */}
                <div className="onenote-traffic-spacer" />

                {/* Left controls: Sidebar toggle & New buttons */}
                <div className="onenote-header-left">
                    <button 
                        className={`onenote-icon-btn ${showSidebar ? 'active' : ''}`}
                        onClick={() => setShowSidebar(!showSidebar)}
                        title="Toggle Navigation Sidebar"
                    >
                        <OneNoteIcon name="sidebar" size={15} />
                    </button>

                    <div className="onenote-nav-tabs">
                        <button 
                            className={`onenote-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
                            onClick={() => setActiveTab('home')}
                        >
                            Home
                        </button>
                        <button 
                            className={`onenote-tab-btn ${activeTab === 'insert' ? 'active' : ''}`}
                            onClick={() => setActiveTab('insert')}
                        >
                            Insert
                        </button>
                        <button 
                            className={`onenote-tab-btn ${activeTab === 'view' ? 'active' : ''}`}
                            onClick={() => setActiveTab('view')}
                        >
                            View
                        </button>
                    </div>
                </div>

                {/* Center / Right Section & Quick Add Action Buttons */}
                <div className="onenote-header-right">
                    <button className="onenote-action-pill onenote-add-section-btn" onClick={handleAddSection} title="Add New Notebook Section">
                        <OneNoteIcon name="plus" size={13} />
                        <span>Section</span>
                    </button>

                    <button className="onenote-action-pill onenote-add-page-btn" onClick={handleAddPage} title="Add New Page">
                        <OneNoteIcon name="plus" size={13} />
                        <span>Page</span>
                    </button>

                    <div className="onenote-sync-status">
                        <OneNoteIcon name="cloud-check" size={14} color={isSaved ? '#107c41' : '#888'} />
                        <span>{isSaved ? 'Saved' : 'Saving...'}</span>
                    </div>
                </div>
            </div>

            {/* Dynamic Ribbon Formatting Bar */}
            <div className="onenote-ribbon-bar">
                {activeTab === 'home' && (
                    <div className="onenote-ribbon-group">
                        <div className="onenote-tool-cluster">
                            <button className="onenote-ribbon-btn" onClick={() => execCmd('bold')} title="Bold (Command+B)">
                                <OneNoteIcon name="bold" size={14} />
                            </button>
                            <button className="onenote-ribbon-btn" onClick={() => execCmd('italic')} title="Italic (Command+I)">
                                <OneNoteIcon name="italic" size={14} />
                            </button>
                            <button className="onenote-ribbon-btn" onClick={() => execCmd('underline')} title="Underline (Command+U)">
                                <OneNoteIcon name="underline" size={14} />
                            </button>
                            <button className="onenote-ribbon-btn" onClick={() => execCmd('strikeThrough')} title="Strikethrough">
                                <OneNoteIcon name="strike" size={14} />
                            </button>
                        </div>

                        <div className="onenote-ribbon-divider" />

                        <div className="onenote-tool-cluster">
                            <button className="onenote-ribbon-btn" onClick={() => execCmd('formatBlock', '<h1>')} title="Heading 1">
                                <OneNoteIcon name="h1" size={14} />
                            </button>
                            <button className="onenote-ribbon-btn" onClick={() => execCmd('formatBlock', '<h2>')} title="Heading 2">
                                <OneNoteIcon name="h2" size={14} />
                            </button>
                            <button className="onenote-ribbon-btn" onClick={() => execCmd('formatBlock', '<p>')} title="Normal Text">
                                <OneNoteIcon name="file-text" size={14} />
                            </button>
                        </div>

                        <div className="onenote-ribbon-divider" />

                        <div className="onenote-tool-cluster">
                            <button className="onenote-ribbon-btn" onClick={() => execCmd('insertUnorderedList')} title="Bullet List">
                                <OneNoteIcon name="list" size={14} />
                            </button>
                            <button className="onenote-ribbon-btn" onClick={() => execCmd('insertOrderedList')} title="Numbered List">
                                <OneNoteIcon name="list-ordered" size={14} />
                            </button>
                            <button className="onenote-ribbon-btn" onClick={handleInsertChecklist} title="Insert Checklist Item">
                                <OneNoteIcon name="check-square" size={14} />
                            </button>
                        </div>

                        <div className="onenote-ribbon-divider" />

                        <div className="onenote-tool-cluster" style={{ position: 'relative' }}>
                            <button 
                                className="onenote-ribbon-btn onenote-highlight-btn" 
                                onClick={() => setShowColorPicker(!showColorPicker)}
                                title="Text Highlight Color"
                            >
                                <OneNoteIcon name="highlighter" size={14} />
                                <span className="onenote-highlight-bar" />
                            </button>

                            {showColorPicker && (
                                <div className="onenote-color-dropdown">
                                    {HIGHLIGHT_COLORS.map(c => (
                                        <button 
                                            key={c.color} 
                                            className="onenote-color-chip" 
                                            style={{ backgroundColor: c.color }}
                                            onClick={() => handleHighlight(c.color)}
                                            title={c.label}
                                        />
                                    ))}
                                    <button 
                                        className="onenote-color-chip onenote-chip-clear" 
                                        onClick={() => handleHighlight('transparent')}
                                        title="No Color"
                                    >
                                        None
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="onenote-ribbon-divider" />

                        <div className="onenote-tag-pills-group">
                            <button className="onenote-tag-pill tag-todo" onClick={() => handleInsertTag('To Do')}>
                                <OneNoteIcon name="check-square" size={11} /> To Do
                            </button>
                            <button className="onenote-tag-pill tag-important" onClick={() => handleInsertTag('Important')}>
                                <OneNoteIcon name="sparkles" size={11} /> Important
                            </button>
                            <button className="onenote-tag-pill tag-idea" onClick={() => handleInsertTag('Idea')}>
                                <OneNoteIcon name="tag" size={11} /> Idea
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'insert' && (
                    <div className="onenote-ribbon-group">
                        <button className="onenote-ribbon-btn with-text" onClick={handleInsertChecklist}>
                            <OneNoteIcon name="check-square" size={14} />
                            <span>Checklist</span>
                        </button>
                        <button className="onenote-ribbon-btn with-text" onClick={() => handleInsertTag('Question')}>
                            <OneNoteIcon name="tag" size={14} />
                            <span>Question Tag</span>
                        </button>
                        <button className="onenote-ribbon-btn with-text" onClick={() => execCmd('insertHorizontalRule')}>
                            <OneNoteIcon name="strike" size={14} />
                            <span>Horizontal Divider</span>
                        </button>
                    </div>
                )}

                {activeTab === 'view' && (
                    <div className="onenote-ribbon-group">
                        <button className="onenote-ribbon-btn with-text" onClick={() => setShowSidebar(!showSidebar)}>
                            <OneNoteIcon name="sidebar" size={14} />
                            <span>{showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Main Multi-Pane Content Area */}
            <div className="onenote-body">
                {/* Column 1: Notebook Sections */}
                {showSidebar && (
                    <div className="onenote-sections-pane">
                        <div className="onenote-pane-header">
                            <div className="onenote-pane-title">
                                <OneNoteIcon name="book" size={14} color="#7719aa" />
                                <span>Notebooks</span>
                            </div>
                            <button className="onenote-mini-add-btn" onClick={handleAddSection} title="Add Section">
                                <OneNoteIcon name="plus" size={12} />
                            </button>
                        </div>

                        <div className="onenote-sections-list">
                            {sections.map(sec => {
                                const isActive = sec.id === activeSectionId;
                                return (
                                    <div 
                                        key={sec.id}
                                        className={`onenote-section-item ${isActive ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveSectionId(sec.id);
                                            if (sec.pages.length > 0) {
                                                setActivePageId(sec.pages[0].id);
                                            }
                                        }}
                                    >
                                        <span className="onenote-section-color-bar" style={{ backgroundColor: sec.color || '#7719aa' }} />
                                        <span className="onenote-section-name">{sec.title}</span>
                                        <span className="onenote-section-count">{sec.pages.length}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Column 2: Pages List */}
                <div className="onenote-pages-pane">
                    <div className="onenote-pages-header">
                        <div className="onenote-search-box">
                            <OneNoteIcon name="search" size={13} color="#8e8e93" />
                            <input 
                                type="text"
                                placeholder="Search notes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="onenote-search-clear" onClick={() => setSearchQuery('')}>
                                    ×
                                </button>
                            )}
                        </div>

                        <button className="onenote-add-page-sub-btn" onClick={handleAddPage} title="Add Page">
                            <OneNoteIcon name="plus" size={13} />
                            <span>Add Page</span>
                        </button>
                    </div>

                    <div className="onenote-pages-list">
                        {visiblePages.length === 0 ? (
                            <div className="onenote-empty-pages">
                                <OneNoteIcon name="file-text" size={28} color="#c7c7cc" />
                                <div>No pages found</div>
                            </div>
                        ) : (
                            visiblePages.map(page => {
                                const isPageActive = page.id === activePageId;
                                // Create clean snippet from HTML content
                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = page.content || '';
                                const previewSnippet = tempDiv.textContent.trim().slice(0, 55) || 'No additional text';

                                return (
                                    <div 
                                        key={page.id}
                                        className={`onenote-page-item ${isPageActive ? 'active' : ''}`}
                                        onClick={() => setActivePageId(page.id)}
                                    >
                                        <div className="onenote-page-item-header">
                                            <div className="onenote-page-item-title">{page.title || 'Untitled'}</div>
                                            <button 
                                                className="onenote-page-delete-btn"
                                                onClick={(e) => handleDeletePage(e, page.id)}
                                                title="Delete Page"
                                            >
                                                <OneNoteIcon name="trash" size={12} />
                                            </button>
                                        </div>
                                        <div className="onenote-page-item-date">{page.date}</div>
                                        <div className="onenote-page-item-preview">{previewSnippet}</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Column 3: Rich Canvas Note Editor */}
                <div className="onenote-editor-pane">
                    {activePage ? (
                        <div className="onenote-canvas-scroll">
                            <div className="onenote-note-meta-badge">
                                <span className="onenote-meta-sec-pill" style={{ backgroundColor: `${activeSection?.color || '#7719aa'}20`, color: activeSection?.color || '#7719aa' }}>
                                    {activeSection?.title}
                                </span>
                            </div>

                            <div 
                                className="onenote-title-editor" 
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                ref={titleRef}
                                onInput={handleTitleChange}
                                placeholder="Page Title"
                            />

                            <div className="onenote-timestamp-bar">
                                <span>{activePage.date}</span>
                            </div>

                            <div 
                                className="onenote-rich-canvas"
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                ref={editorRef}
                                onInput={handleContentChange}
                                placeholder="Start taking notes here..."
                            />
                        </div>
                    ) : (
                        <div className="onenote-no-selection">
                            <OneNoteIcon name="book" size={48} color="#d1d5db" />
                            <p>Select a page or create a new one to begin taking notes.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

window.renderOneNoteApp = () => {
    const rootEl = document.getElementById('onenote-react-root');
    if (rootEl) {
        try {
            ReactDOM.render(<OneNoteApp />, rootEl);
        } catch (e) {
            rootEl.innerHTML = '<div style="color:red;padding:20px;">React Error: ' + e.message + '</div>';
        }
    }
};

if (document.getElementById('onenote-react-root')) { 
    window.renderOneNoteApp(); 
}
