const { useState, useEffect, useRef } = React;

const PP_THEMES = [
    { id: 'gradient', name: 'Sequoia Blue', class: 'pp-theme-gradient', color: '#0071e3' },
    { id: 'white', name: 'Cupertino White', class: 'pp-theme-white', color: '#ffffff' },
    { id: 'minimal', name: 'Midnight Dark', class: 'pp-theme-minimal', color: '#141416' },
    { id: 'warm', name: 'Sunset Amber', class: 'pp-theme-warm', color: '#ff9500' },
    { id: 'mint', name: 'Spring Mint', class: 'pp-theme-mint', color: '#30d158' },
    { id: 'neon', name: 'Cyberpunk Neon', class: 'pp-theme-neon', color: '#00f0ff' },
    { id: 'bauhaus', name: 'Bauhaus Editorial', class: 'pp-theme-bauhaus', color: '#f4ede2' },
    { id: 'nordic', name: 'Nordic Indigo', class: 'pp-theme-nordic', color: '#2b5876' }
];

const PP_TRANSITIONS = [
    { id: 'dissolve', name: 'Dissolve' },
    { id: 'slide', name: 'Slide Left' },
    { id: 'push', name: 'Push Up' },
    { id: 'zoom', name: 'Zoom In' },
    { id: 'flip', name: 'Flip 3D' }
];

const INITIAL_SLIDES = [
    {
        id: 1,
        layout: 'title',
        title: 'Designing for Apple Platforms',
        subtitle: 'Principles of Spatial UI, Frosted Materials, and Fluid Gestures',
        bullets: ['Unified toolbar typography', 'SF Pro optical weights', 'Vibrant translucent glass backdrops'],
        leftCol: 'Crafting interfaces that feel natural, responsive, and seamlessly aligned with macOS Sequoia design principles.',
        rightCol: 'Utilizing Liquid Glass physics, adaptive materials, and spring-based animations.',
        stats: [
            { value: '60 FPS', label: 'Fluid Animation Rate' },
            { value: '100%', label: 'Vector SVG Precision' },
            { value: '0 Latency', label: 'Instant Responsive UI' }
        ],
        code: '// macOS Sequoia Spatial Material\nconst material = new AppleGlassMaterial({\n  blur: 40,\n  saturation: 190,\n  vibrancy: "mediumLight"\n});',
        tableData: [
            ['Component', 'Spec', 'Performance'],
            ['Dynamic Island', 'Hardware Top-Layer', '60 FPS'],
            ['Control Center', 'Liquid Glass Spring', 'Instant']
        ],
        elements: [],
        notes: 'Introduce the core philosophy of Apple Human Interface Guidelines and spatial depth.',
        theme: 'gradient',
        transition: 'dissolve'
    },
    {
        id: 2,
        layout: 'bullets',
        title: 'Key Architectural Highlights',
        subtitle: 'Built with Modern Web Standards & React Engine',
        bullets: [
            'Interactive multi-tab ribbon toolbar (Home, Insert, Design, Transitions, Slide Show, Export)',
            'Live slide navigator with pixel-perfect thumbnail rendering',
            'Full-screen presenter mode with interactive laser pointer & slide transitions',
            'Collapsible speaker notes drawer and multi-level Undo/Redo history'
        ],
        leftCol: '',
        rightCol: '',
        stats: [],
        code: '',
        tableData: [],
        elements: [],
        notes: 'Walk through each capability and demonstrate the presenter laser pointer.',
        theme: 'white',
        transition: 'slide'
    },
    {
        id: 3,
        layout: 'stats',
        title: 'Performance & Ecosystem Growth',
        subtitle: 'Key Milestones Across All Applications',
        bullets: [],
        leftCol: '',
        rightCol: '',
        stats: [
            { value: '99.9%', label: 'System Uptime' },
            { value: '2.4x', label: 'Render Speedup' },
            { value: '12+', label: 'Built-in Native Apps' }
        ],
        code: '',
        tableData: [],
        elements: [],
        notes: 'Highlight performance optimizations across the web operating system.',
        theme: 'nordic',
        transition: 'push'
    },
    {
        id: 4,
        layout: 'quote',
        title: '"Design is not just what it looks like and feels like. Design is how it works."',
        subtitle: '— Steve Jobs',
        bullets: [],
        leftCol: '',
        rightCol: '',
        stats: [],
        code: '',
        tableData: [],
        elements: [],
        notes: 'Conclude the presentation with an inspiring vision for future spatial computing.',
        theme: 'minimal',
        transition: 'zoom'
    }
];

const PowerPointApp = () => {
    const [slides, setSlides] = useState(() => {
        try {
            const saved = localStorage.getItem('mac_powerpoint_presentation_v4');
            return saved ? JSON.parse(saved) : INITIAL_SLIDES;
        } catch (e) {
            return INITIAL_SLIDES;
        }
    });

    const [activeSlideId, setActiveSlideId] = useState(slides && slides[0] ? slides[0].id : 1);
    const [activeRibbonTab, setActiveRibbonTab] = useState('home');
    const [inspectorTab, setInspectorTab] = useState('format');
    const [showInspector, setShowInspector] = useState(true);
    const [showNotes, setShowNotes] = useState(false);
    const [docTitle, setDocTitle] = useState('Presentation 1');
    const [zoomLevel, setZoomLevel] = useState(100);

    // Presenter Mode States
    const [isPresenting, setIsPresenting] = useState(false);
    const [presenterIndex, setPresenterIndex] = useState(0);
    const [laserActive, setLaserActive] = useState(false);
    const [laserPos, setLaserPos] = useState({ x: -100, y: -100 });
    const [isBlackout, setIsBlackout] = useState(false);
    const [isWhiteout, setIsWhiteout] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    // History for Undo/Redo
    const [history, setHistory] = useState([slides]);
    const [historyIdx, setHistoryIdx] = useState(0);

    const activeSlide = (slides && slides.find(s => s.id === activeSlideId)) || (slides && slides[0]) || INITIAL_SLIDES[0];

    // Autosave presentation
    useEffect(() => {
        try {
            localStorage.setItem('mac_powerpoint_presentation_v4', JSON.stringify(slides));
        } catch (e) {}
    }, [slides]);

    // Presenter timer
    useEffect(() => {
        let timer;
        if (isPresenting) {
            setElapsedTime(0);
            timer = setInterval(() => setElapsedTime(prev => prev + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isPresenting]);

    const pushHistory = (newSlides) => {
        const nextHistory = history.slice(0, historyIdx + 1);
        nextHistory.push(newSlides);
        setHistory(nextHistory);
        setHistoryIdx(nextHistory.length - 1);
        setSlides(newSlides);
    };

    const undo = () => {
        if (historyIdx > 0) {
            const nextIdx = historyIdx - 1;
            setHistoryIdx(nextIdx);
            setSlides(history[nextIdx]);
        }
    };

    const redo = () => {
        if (historyIdx < history.length - 1) {
            const nextIdx = historyIdx + 1;
            setHistoryIdx(nextIdx);
            setSlides(history[nextIdx]);
        }
    };

    const updateActiveSlide = (fields) => {
        const nextSlides = slides.map(s => s.id === activeSlide.id ? { ...s, ...fields } : s);
        pushHistory(nextSlides);
    };

    const addSlide = (layout = 'bullets') => {
        const newId = Date.now();
        const newSlide = {
            id: newId,
            layout: layout,
            title: layout === 'title' ? 'New Title Slide' : 'Slide Title',
            subtitle: 'Add supporting description or subtitle',
            bullets: ['Key takeaway point 1', 'Key takeaway point 2', 'Key takeaway point 3'],
            leftCol: 'Left section content description',
            rightCol: 'Right section content description',
            stats: [
                { value: '95%', label: 'Metric 1' },
                { value: '3.5x', label: 'Metric 2' },
                { value: '10k+', label: 'Metric 3' }
            ],
            code: '// Code Snippet\nfunction sample() {\n  return true;\n}',
            tableData: [
                ['Header 1', 'Header 2', 'Header 3'],
                ['Row 1', 'Data A', 'Data B'],
                ['Row 2', 'Data C', 'Data D']
            ],
            elements: [],
            notes: '',
            theme: activeSlide.theme || 'white',
            transition: 'slide'
        };
        const nextSlides = [...slides, newSlide];
        pushHistory(nextSlides);
        setActiveSlideId(newId);
    };

    const duplicateSlide = (slide) => {
        const newId = Date.now();
        const copy = { ...JSON.parse(JSON.stringify(slide)), id: newId, title: slide.title + ' (Copy)' };
        const idx = slides.findIndex(s => s.id === slide.id);
        const nextSlides = [...slides];
        nextSlides.splice(idx + 1, 0, copy);
        pushHistory(nextSlides);
        setActiveSlideId(newId);
    };

    const deleteSlide = (id) => {
        if (slides.length <= 1) return;
        const nextSlides = slides.filter(s => s.id !== id);
        pushHistory(nextSlides);
        if (activeSlideId === id) {
            setActiveSlideId(nextSlides[0].id);
        }
    };

    const insertShape = (type) => {
        const newElem = {
            id: Date.now(),
            type: 'shape',
            shapeType: type,
            x: 50,
            y: 50
        };
        const updatedElements = [...(activeSlide.elements || []), newElem];
        updateActiveSlide({ elements: updatedElements });
    };

    const startPresentation = (fromStart = false) => {
        const idx = fromStart ? 0 : slides.findIndex(s => s.id === activeSlideId);
        setPresenterIndex(idx >= 0 ? idx : 0);
        setIsPresenting(true);
        setIsBlackout(false);
        setIsWhiteout(false);
        if (window.MacAudio) MacAudio.play('launch');
    };

    // Keyboard navigation during presentation mode
    useEffect(() => {
        if (!isPresenting) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsPresenting(false);
            } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                setPresenterIndex(prev => Math.min(prev + 1, slides.length - 1));
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                setPresenterIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'l' || e.key === 'L') {
                setLaserActive(prev => !prev);
            } else if (e.key === 'b' || e.key === 'B') {
                setIsBlackout(prev => !prev);
                setIsWhiteout(false);
            } else if (e.key === 'w' || e.key === 'W') {
                setIsWhiteout(prev => !prev);
                setIsBlackout(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPresenting, slides.length]);

    const activeThemeClass = (PP_THEMES.find(t => t.id === activeSlide.theme) || {}).class || 'pp-theme-white';

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    return (
        <div className="pp-app-container">
            {/* Unified macOS Titlebar / Header */}
            <div className="pp-header">
                <div className="pp-toolbar-actions">
                    <button className="pp-btn primary" onClick={() => addSlide('bullets')} title="Add New Slide">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        New Slide
                    </button>
                    <div className="pp-ribbon-divider"></div>
                    <button className="pp-icon-btn" title="Undo (Cmd+Z)" onClick={undo} disabled={historyIdx <= 0}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
                    </button>
                    <button className="pp-icon-btn" title="Redo (Cmd+Y)" onClick={redo} disabled={historyIdx >= history.length - 1}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"></path></svg>
                    </button>
                </div>

                {/* Centered Document Metadata */}
                <div className="pp-doc-meta">
                    <span 
                        className="pp-doc-title" 
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => setDocTitle(e.target.innerText)}
                    >
                        {docTitle}
                    </span>
                    <span className="pp-doc-badge">iCloud Drive</span>
                </div>

                {/* Right Action Buttons */}
                <div className="pp-toolbar-actions">
                    <button className="pp-btn primary" onClick={() => startPresentation(false)} title="Play Slideshow">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        Play
                    </button>
                    <button 
                        className={"pp-icon-btn " + (showNotes ? 'active' : '')} 
                        onClick={() => setShowNotes(!showNotes)}
                        title="Speaker Notes"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                    </button>
                    <button 
                        className={"pp-icon-btn " + (showInspector ? 'active' : '')} 
                        onClick={() => setShowInspector(!showInspector)}
                        title="Toggle Inspector"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="15" y1="3" x2="15" y2="21"></line></svg>
                    </button>
                </div>
            </div>

            {/* Segmented Ribbon Tabs Bar */}
            <div className="pp-ribbon-tabs-bar">
                <div className="pp-segmented-capsule">
                    {['home', 'insert', 'design', 'transitions', 'slideshow', 'export'].map(tab => (
                        <button 
                            key={tab} 
                            className={"pp-ribbon-tab " + (activeRibbonTab === tab ? 'active' : '')}
                            onClick={() => setActiveRibbonTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contextual Ribbon Controls Toolbar */}
            <div className="pp-ribbon-toolbar">
                {activeRibbonTab === 'home' && (
                    <React.Fragment>
                        <div className="pp-ribbon-group">
                            <select 
                                className="pp-select" 
                                style={{width: '120px'}}
                                onChange={(e) => document.execCommand('fontName', false, e.target.value)}
                            >
                                <option value="SF Pro Display">SF Pro</option>
                                <option value="Helvetica Neue">Helvetica</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Menlo">Monospace</option>
                            </select>
                            <select 
                                className="pp-select" 
                                style={{width: '62px'}}
                                onChange={(e) => document.execCommand('fontSize', false, e.target.value)}
                            >
                                <option value="3">14pt</option>
                                <option value="4">18pt</option>
                                <option value="5">24pt</option>
                                <option value="6">32pt</option>
                                <option value="7">48pt</option>
                            </select>
                        </div>
                        <div className="pp-ribbon-divider"></div>
                        <div className="pp-ribbon-group">
                            <button className="pp-icon-btn" title="Bold" onClick={() => document.execCommand('bold', false, null)}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
                            </button>
                            <button className="pp-icon-btn" title="Italic" onClick={() => document.execCommand('italic', false, null)}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
                            </button>
                            <button className="pp-icon-btn" title="Underline" onClick={() => document.execCommand('underline', false, null)}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 3v7a6 6 0 0 0 12 0V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg>
                            </button>
                            <button className="pp-icon-btn" title="Strikethrough" onClick={() => document.execCommand('strikeThrough', false, null)}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" y1="12" x2="20" y2="12"></line><path d="M16 6a4 4 0 0 0-8 0c0 4 8 3 8 7a4 4 0 0 1-8 0"></path></svg>
                            </button>
                        </div>
                        <div className="pp-ribbon-divider"></div>
                        <div className="pp-ribbon-group">
                            <button className="pp-icon-btn" title="Align Left" onClick={() => document.execCommand('justifyLeft', false, null)}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
                            </button>
                            <button className="pp-icon-btn" title="Align Center" onClick={() => document.execCommand('justifyCenter', false, null)}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
                            </button>
                            <button className="pp-icon-btn" title="Align Right" onClick={() => document.execCommand('justifyRight', false, null)}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
                            </button>
                            <button className="pp-icon-btn" title="Bullet List" onClick={() => document.execCommand('insertUnorderedList', false, null)}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                            </button>
                        </div>
                    </React.Fragment>
                )}

                {activeRibbonTab === 'insert' && (
                    <div className="pp-ribbon-group">
                        <button className="pp-btn" onClick={() => insertShape('rect')}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg>
                            Rectangle
                        </button>
                        <button className="pp-btn" onClick={() => insertShape('circle')}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg>
                            Circle
                        </button>
                        <button className="pp-btn" onClick={() => insertShape('star')}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            Star
                        </button>
                        <div className="pp-ribbon-divider"></div>
                        <button className="pp-btn" onClick={() => updateActiveSlide({ layout: 'stats' })}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            Metric Grid
                        </button>
                        <button className="pp-btn" onClick={() => updateActiveSlide({ layout: 'code' })}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                            Code Snippet
                        </button>
                        <button className="pp-btn" onClick={() => updateActiveSlide({ layout: 'table' })}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg>
                            Table
                        </button>
                    </div>
                )}

                {activeRibbonTab === 'design' && (
                    <div className="pp-ribbon-group" style={{gap: '6px'}}>
                        <span style={{fontSize: '11px', color: '#86868b', fontWeight: 600}}>THEMES:</span>
                        {PP_THEMES.map(theme => (
                            <button
                                key={theme.id}
                                className={"pp-btn " + (activeSlide.theme === theme.id ? 'active' : '')}
                                onClick={() => updateActiveSlide({ theme: theme.id })}
                            >
                                <span style={{width: '9px', height: '9px', borderRadius: '50%', background: theme.color, display: 'inline-block'}}></span>
                                {theme.name}
                            </button>
                        ))}
                    </div>
                )}

                {activeRibbonTab === 'transitions' && (
                    <div className="pp-ribbon-group" style={{gap: '6px'}}>
                        <span style={{fontSize: '11px', color: '#86868b', fontWeight: 600}}>TRANSITION:</span>
                        {PP_TRANSITIONS.map(trans => (
                            <button
                                key={trans.id}
                                className={"pp-btn " + (activeSlide.transition === trans.id ? 'active' : '')}
                                onClick={() => updateActiveSlide({ transition: trans.id })}
                            >
                                {trans.name}
                            </button>
                        ))}
                    </div>
                )}

                {activeRibbonTab === 'slideshow' && (
                    <div className="pp-ribbon-group">
                        <button className="pp-btn primary" onClick={() => startPresentation(true)}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            From Beginning
                        </button>
                        <button className="pp-btn" onClick={() => startPresentation(false)}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            From Current Slide
                        </button>
                    </div>
                )}

                {activeRibbonTab === 'export' && (
                    <div className="pp-ribbon-group">
                        <button 
                            className="pp-btn" 
                            onClick={() => {
                                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(slides, null, 2));
                                const downloadAnchor = document.createElement('a');
                                downloadAnchor.setAttribute("href", dataStr);
                                downloadAnchor.setAttribute("download", `${docTitle || 'Presentation'}.json`);
                                document.body.appendChild(downloadAnchor);
                                downloadAnchor.click();
                                downloadAnchor.remove();
                            }}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Export JSON
                        </button>
                        <button className="pp-btn" onClick={() => window.print()}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                            Print / PDF
                        </button>
                    </div>
                )}
            </div>

            {/* Main Multi-Pane Workspace */}
            <div className="pp-workspace">
                {/* Left Slide Navigator Sidebar */}
                <div className="pp-navigator">
                    <div className="pp-nav-header">
                        <span>Slides ({slides.length})</span>
                        <button 
                            className="pp-icon-btn" 
                            title="Add Slide" 
                            onClick={() => addSlide('bullets')}
                            style={{width: '20px', height: '20px'}}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>
                    <div className="pp-slides-list">
                        {slides.map((slide, idx) => {
                            const themeCls = (PP_THEMES.find(t => t.id === slide.theme) || {}).class || 'pp-theme-white';
                            return (
                                <div 
                                    key={slide.id} 
                                    className={"pp-slide-card " + (slide.id === activeSlide.id ? 'active' : '')}
                                    onClick={() => setActiveSlideId(slide.id)}
                                >
                                    <span className="pp-slide-num">{idx + 1}</span>
                                    <div className={"pp-slide-thumb " + themeCls}>
                                        <div className="pp-thumb-title">{slide.title || 'Untitled Slide'}</div>
                                        <div className="pp-thumb-sub">{slide.subtitle || ''}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Center Stage Presentation Canvas */}
                <div className="pp-stage">
                    <div 
                        className={"pp-slide-viewport " + activeThemeClass}
                        style={{ transform: `scale(${zoomLevel / 100})` }}
                    >
                        <div 
                            className="pp-editable-title" 
                            contentEditable={true} 
                            suppressContentEditableWarning={true}
                            onBlur={(e) => updateActiveSlide({ title: e.target.innerText })}
                        >
                            {activeSlide.title}
                        </div>
                        
                        {activeSlide.layout !== 'quote' && (
                            <div 
                                className="pp-editable-subtitle" 
                                contentEditable={true} 
                                suppressContentEditableWarning={true}
                                onBlur={(e) => updateActiveSlide({ subtitle: e.target.innerText })}
                            >
                                {activeSlide.subtitle}
                            </div>
                        )}

                        {activeSlide.layout === 'bullets' && (
                            <ul 
                                className="pp-bullet-list" 
                                contentEditable={true} 
                                suppressContentEditableWarning={true}
                                onBlur={(e) => {
                                    const items = Array.from(e.target.querySelectorAll('li')).map(li => li.innerText);
                                    if (items.length > 0) updateActiveSlide({ bullets: items });
                                }}
                            >
                                {activeSlide.bullets && activeSlide.bullets.length > 0 ? (
                                    activeSlide.bullets.map((b, i) => <li key={i}>{b}</li>)
                                ) : (
                                    <React.Fragment>
                                        <li>High-performance vector rendering</li>
                                        <li>Apple SF Pro typography hierarchy</li>
                                    </React.Fragment>
                                )}
                            </ul>
                        )}

                        {activeSlide.layout === 'split' && (
                            <div className="pp-split-container">
                                <div 
                                    className="pp-split-col" 
                                    contentEditable={true} 
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => updateActiveSlide({ leftCol: e.target.innerText })}
                                >
                                    {activeSlide.leftCol || 'Left column descriptive details'}
                                </div>
                                <div 
                                    className="pp-split-col" 
                                    contentEditable={true} 
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => updateActiveSlide({ rightCol: e.target.innerText })}
                                >
                                    {activeSlide.rightCol || 'Right column supporting notes'}
                                </div>
                            </div>
                        )}

                        {activeSlide.layout === 'stats' && (
                            <div className="pp-stats-grid">
                                {(activeSlide.stats || []).map((stat, i) => (
                                    <div key={i} className="pp-stat-card">
                                        <div 
                                            className="pp-stat-value"
                                            contentEditable={true}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => {
                                                const nextStats = [...activeSlide.stats];
                                                nextStats[i].value = e.target.innerText;
                                                updateActiveSlide({ stats: nextStats });
                                            }}
                                        >
                                            {stat.value}
                                        </div>
                                        <div 
                                            className="pp-stat-label"
                                            contentEditable={true}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => {
                                                const nextStats = [...activeSlide.stats];
                                                nextStats[i].label = e.target.innerText;
                                                updateActiveSlide({ stats: nextStats });
                                            }}
                                        >
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeSlide.layout === 'code' && (
                            <pre 
                                className="pp-code-block"
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => updateActiveSlide({ code: e.target.innerText })}
                            >
                                {activeSlide.code}
                            </pre>
                        )}

                        {activeSlide.layout === 'table' && (
                            <table className="pp-table-grid">
                                <tbody>
                                    {(activeSlide.tableData || []).map((row, rIdx) => (
                                        <tr key={rIdx}>
                                            {row.map((cell, cIdx) => (
                                                <td 
                                                    key={cIdx} 
                                                    contentEditable={true}
                                                    suppressContentEditableWarning={true}
                                                    onBlur={(e) => {
                                                        const nextTable = [...activeSlide.tableData];
                                                        nextTable[rIdx][cIdx] = e.target.innerText;
                                                        updateActiveSlide({ tableData: nextTable });
                                                    }}
                                                >
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {/* User Inserted Shapes & Elements */}
                        {(activeSlide.elements || []).map((elem) => (
                            <div 
                                key={elem.id} 
                                className="pp-element-container"
                                style={{ top: elem.y, left: elem.x }}
                            >
                                {elem.shapeType === 'rect' && <div className="pp-shape-rect"></div>}
                                {elem.shapeType === 'circle' && <div className="pp-shape-circle"></div>}
                                {elem.shapeType === 'star' && <div className="pp-shape-star">★</div>}
                            </div>
                        ))}
                    </div>

                    {/* Speaker Notes Drawer */}
                    {showNotes && (
                        <div className="pp-notes-drawer">
                            <div className="pp-notes-header">
                                <span>Presenter Notes</span>
                                <span style={{fontSize: '10px', color: '#86868b'}}>Private to Presenter</span>
                            </div>
                            <textarea 
                                className="pp-notes-textarea" 
                                placeholder="Add notes for this slide..."
                                value={activeSlide.notes || ''}
                                onChange={(e) => updateActiveSlide({ notes: e.target.value })}
                            />
                        </div>
                    )}
                </div>

                {/* Right Apple Inspector Panel */}
                {showInspector && (
                    <div className="pp-inspector">
                        <div className="pp-inspector-tabs-wrap">
                            <div className="pp-segmented-capsule" style={{width: '100%'}}>
                                {['format', 'animate', 'document'].map(tab => (
                                    <button 
                                        key={tab}
                                        className={"pp-ribbon-tab " + (inspectorTab === tab ? 'active' : '')}
                                        style={{flex: 1, textAlign: 'center'}}
                                        onClick={() => setInspectorTab(tab)}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pp-inspector-body">
                            {inspectorTab === 'format' && (
                                <React.Fragment>
                                    {/* Slide Layout Grid */}
                                    <div>
                                        <div className="pp-section-title">Slide Layout</div>
                                        <div className="pp-layout-grid">
                                            {[
                                                { id: 'title', label: 'Title' },
                                                { id: 'bullets', label: 'Bullets' },
                                                { id: 'split', label: '2-Column' },
                                                { id: 'stats', label: 'Metric Grid' },
                                                { id: 'code', label: 'Code' },
                                                { id: 'quote', label: 'Quote' },
                                                { id: 'table', label: 'Table' }
                                            ].map(l => (
                                                <div 
                                                    key={l.id} 
                                                    className={"pp-layout-card " + (activeSlide.layout === l.id ? 'active' : '')}
                                                    onClick={() => updateActiveSlide({ layout: l.id })}
                                                >
                                                    {l.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Slide Theme Swatches */}
                                    <div>
                                        <div className="pp-section-title">Color Theme</div>
                                        <div className="pp-theme-grid">
                                            {PP_THEMES.map(theme => (
                                                <div 
                                                    key={theme.id}
                                                    className={"pp-theme-swatch " + theme.class + (activeSlide.theme === theme.id ? ' active' : '')}
                                                    title={theme.name}
                                                    onClick={() => updateActiveSlide({ theme: theme.id })}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Slide Management */}
                                    <div>
                                        <div className="pp-section-title">Slide Actions</div>
                                        <button className="pp-btn" style={{width: '100%', marginBottom: '6px'}} onClick={() => duplicateSlide(activeSlide)}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                            Duplicate Slide
                                        </button>
                                        <button 
                                            className="pp-btn" 
                                            style={{width: '100%', color: '#ff3b30', borderColor: 'rgba(255, 59, 48, 0.25)'}} 
                                            onClick={() => deleteSlide(activeSlide.id)}
                                            disabled={slides.length <= 1}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                            Delete Slide
                                        </button>
                                    </div>
                                </React.Fragment>
                            )}

                            {inspectorTab === 'animate' && (
                                <div>
                                    <div className="pp-section-title">Transition Effect</div>
                                    <div className="pp-layout-grid">
                                        {PP_TRANSITIONS.map(trans => (
                                            <div 
                                                key={trans.id} 
                                                className={"pp-layout-card " + (activeSlide.transition === trans.id ? 'active' : '')}
                                                onClick={() => updateActiveSlide({ transition: trans.id })}
                                            >
                                                {trans.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {inspectorTab === 'document' && (
                                <div>
                                    <div className="pp-section-title">Presentation Info</div>
                                    <div style={{fontSize: '11.5px', color: '#86868b', lineHeight: '1.8'}}>
                                        <div><strong>Total Slides:</strong> {slides.length}</div>
                                        <div><strong>Format:</strong> 16:9 Widescreen</div>
                                        <div><strong>Engine:</strong> React Spatial Canvas</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom App Status Bar */}
            <div className="pp-status-bar">
                <span>Slide {slides.findIndex(s => s.id === activeSlide.id) + 1} of {slides.length}</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span>Zoom:</span>
                    <input 
                        type="range" 
                        min="60" 
                        max="140" 
                        value={zoomLevel} 
                        onChange={(e) => setZoomLevel(Number(e.target.value))}
                        style={{width: '90px', accentColor: '#0071e3'}}
                    />
                    <span>{zoomLevel}%</span>
                </div>
            </div>

            {/* Interactive Fullscreen Presenter Mode */}
            {isPresenting && (
                <div 
                    className="pp-presenter-overlay"
                    style={{ background: isBlackout ? '#000000' : (isWhiteout ? '#ffffff' : '#000000') }}
                    onMouseMove={(e) => {
                        if (laserActive) {
                            setLaserPos({ x: e.clientX, y: e.clientY });
                        }
                    }}
                    onClick={() => {
                        setPresenterIndex(prev => Math.min(prev + 1, slides.length - 1));
                    }}
                >
                    {laserActive && (
                        <div 
                            className="pp-laser-pointer" 
                            style={{ left: laserPos.x, top: laserPos.y }}
                        />
                    )}

                    {!isBlackout && !isWhiteout && (() => {
                        const currentSlide = slides[presenterIndex] || slides[0];
                        const themeCls = (PP_THEMES.find(t => t.id === currentSlide.theme) || {}).class || 'pp-theme-white';
                        const transCls = `pp-trans-${currentSlide.transition || 'dissolve'}`;
                        return (
                            <div key={presenterIndex} className={`pp-presenter-slide ${themeCls} ${transCls}`}>
                                <div style={{ fontSize: '50px', fontWeight: '800', lineHeight: '1.15', marginBottom: '18px' }}>
                                    {currentSlide.title}
                                </div>
                                {currentSlide.layout !== 'quote' && (
                                    <div style={{ fontSize: '24px', opacity: 0.88, lineHeight: '1.45', marginBottom: '24px' }}>
                                        {currentSlide.subtitle}
                                    </div>
                                )}
                                {currentSlide.layout === 'bullets' && currentSlide.bullets && (
                                    <ul style={{ paddingLeft: '34px', fontSize: '22px', lineHeight: '1.8' }}>
                                        {currentSlide.bullets.map((b, i) => <li key={i}>{b}</li>)}
                                    </ul>
                                )}
                                {currentSlide.layout === 'stats' && currentSlide.stats && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '26px' }}>
                                        {currentSlide.stats.map((s, i) => (
                                            <div key={i} style={{ background: 'rgba(255,255,255,0.2)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '40px', fontWeight: '800', color: '#38ef7d' }}>{s.value}</div>
                                                <div style={{ fontSize: '17px', fontWeight: '600', opacity: 0.9 }}>{s.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {currentSlide.layout === 'code' && currentSlide.code && (
                                    <pre style={{ background: '#1e1e24', color: '#38ef7d', padding: '24px', borderRadius: '12px', fontSize: '19px', fontFamily: 'monospace' }}>
                                        {currentSlide.code}
                                    </pre>
                                )}
                            </div>
                        );
                    })()}

                    {/* Presenter Floating HUD Controls */}
                    <div className="pp-presenter-controls" onClick={(e) => e.stopPropagation()}>
                        <span>Slide {presenterIndex + 1} / {slides.length}</span>
                        <span>⏱ {formatTime(elapsedTime)}</span>
                        <div className="pp-ribbon-divider" style={{background: 'rgba(255,255,255,0.2)'}}></div>
                        <button 
                            className={"pp-icon-btn " + (laserActive ? 'active' : '')} 
                            style={{color: 'white'}}
                            title="Laser Pointer (L)" 
                            onClick={() => setLaserActive(!laserActive)}
                        >
                            🔴
                        </button>
                        <button 
                            className="pp-btn" 
                            style={{background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none'}}
                            onClick={() => setPresenterIndex(prev => Math.max(prev - 1, 0))}
                            disabled={presenterIndex === 0}
                        >
                            ◀ Prev
                        </button>
                        <button 
                            className="pp-btn" 
                            style={{background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none'}}
                            onClick={() => setPresenterIndex(prev => Math.min(prev + 1, slides.length - 1))}
                            disabled={presenterIndex >= slides.length - 1}
                        >
                            Next ▶
                        </button>
                        <button 
                            className="pp-btn primary" 
                            style={{background: '#ff3b30', border: 'none'}}
                            onClick={() => setIsPresenting(false)}
                        >
                            Exit (Esc)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

window.renderPowerPointApp = () => {
    const rootEl = document.getElementById('powerpoint-react-root');
    if (rootEl) {
        try {
            ReactDOM.render(<PowerPointApp />, rootEl);
        } catch (e) {
            rootEl.innerHTML = '<div style="color:red;padding:20px;">React Error: ' + e.message + '</div>';
            console.error('PowerPointApp Render Error:', e);
        }
    }
};

if (document.getElementById('powerpoint-react-root')) { 
    window.renderPowerPointApp(); 
}
