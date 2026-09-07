const { useState, useEffect, useRef } = React;

const PP_THEMES = [
    { id: 'white', name: 'Standard Light', class: 'pp-theme-white', color: '#ffffff' },
    { id: 'minimal', name: 'Midnight Dark', class: 'pp-theme-minimal', color: '#1c1c1e' },
    { id: 'gradient', name: 'Sequoia Blue', class: 'pp-theme-gradient', color: '#0a84ff' },
    { id: 'warm', name: 'Sunset Amber', class: 'pp-theme-warm', color: '#ff9500' },
    { id: 'mint', name: 'Spring Mint', class: 'pp-theme-mint', color: '#30d158' }
];

const INITIAL_SLIDES = [
    {
        id: 1,
        layout: 'title',
        title: 'Designing for Apple Platforms',
        subtitle: 'Principles of Spatial UI, Light Mode, and Frosted Materials',
        bullets: ['Unified toolbar typography', 'SF Pro Display optical weights', 'Vibrant translucent glass backdrops'],
        theme: 'gradient'
    },
    {
        id: 2,
        layout: 'bullets',
        title: 'Key Architecture Highlights',
        subtitle: 'Built entirely with React & Web Standards',
        bullets: [
            'Interactive slide navigator with live thumbnail rendering',
            'Contextual Apple Inspector format panel',
            'Full-screen presenter mode with keyboard navigation',
            'Pixel-perfect alignment with macOS Sequoia aesthetic'
        ],
        theme: 'white'
    },
    {
        id: 3,
        layout: 'quote',
        title: '"Design is not just what it looks like and feels like. Design is how it works."',
        subtitle: '— Steve Jobs',
        bullets: [],
        theme: 'minimal'
    }
];

const PowerPointApp = () => {
    const [slides, setSlides] = useState(INITIAL_SLIDES);
    const [activeSlideId, setActiveSlideId] = useState(1);
    const [inspectorTab, setInspectorTab] = useState('format');
    const [showInspector, setShowInspector] = useState(true);
    const [isPresenting, setIsPresenting] = useState(false);
    const [presenterIndex, setPresenterIndex] = useState(0);

    const activeSlide = slides.find(s => s.id === activeSlideId) || slides[0] || INITIAL_SLIDES[0];

    const updateActiveSlide = (fields) => {
        setSlides(prev => prev.map(s => s.id === activeSlide.id ? { ...s, ...fields } : s));
    };

    const addSlide = () => {
        const newId = Date.now();
        const newSlide = {
            id: newId,
            layout: 'bullets',
            title: 'New Presentation Slide',
            subtitle: 'Add supporting description',
            bullets: ['Key takeaway point 1', 'Key takeaway point 2'],
            theme: activeSlide.theme || 'white'
        };
        setSlides(prev => [...prev, newSlide]);
        setActiveSlideId(newId);
    };

    const duplicateSlide = (slide) => {
        const newId = Date.now();
        const copy = { ...slide, id: newId, title: slide.title + ' (Copy)' };
        setSlides(prev => [...prev, copy]);
        setActiveSlideId(newId);
    };

    const deleteSlide = (id) => {
        if (slides.length <= 1) return;
        const nextSlides = slides.filter(s => s.id !== id);
        setSlides(nextSlides);
        if (activeSlideId === id) {
            setActiveSlideId(nextSlides[0].id);
        }
    };

    const startPresentation = () => {
        const idx = slides.findIndex(s => s.id === activeSlideId);
        setPresenterIndex(idx >= 0 ? idx : 0);
        setIsPresenting(true);
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
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPresenting, slides.length]);

    const activeThemeClass = PP_THEMES.find(t => t.id === activeSlide.theme)?.class || 'pp-theme-white';

    return (
        <div className="pp-app-container">
            {/* Unified macOS Header / Toolbar */}
            <div className="pp-header">
                {/* Left Action Buttons */}
                <div className="pp-toolbar-actions">
                    <button className="pp-pill-btn primary" onClick={addSlide} title="Add New Slide">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Slide
                    </button>
                    <div className="pp-divider"></div>
                    <button className="pp-icon-btn" title="Bold Text" onClick={() => document.execCommand('bold', false, null)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
                    </button>
                    <button className="pp-icon-btn" title="Italic Text" onClick={() => document.execCommand('italic', false, null)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
                    </button>
                    <button className="pp-icon-btn" title="Underline" onClick={() => document.execCommand('underline', false, null)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 3v7a6 6 0 0 0 12 0V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg>
                    </button>
                </div>

                {/* Centered Document Metadata */}
                <div className="pp-doc-meta">
                    <span className="pp-doc-title">
                        Presentation 1
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                    <span className="pp-doc-badge">iCloud</span>
                </div>

                {/* Right Action Buttons */}
                <div className="pp-toolbar-actions">
                    <button className="pp-pill-btn" onClick={startPresentation} title="Play Slideshow">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        Play
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

            {/* Main Multi-Pane Workspace */}
            <div className="pp-workspace">
                {/* Left Slide Navigator Sidebar */}
                <div className="pp-navigator">
                    <div className="pp-nav-header">
                        <span>Slides ({slides.length})</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{cursor: 'pointer'}} onClick={addSlide}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </div>
                    <div className="pp-slides-list">
                        {slides.map((slide, idx) => {
                            const themeCls = PP_THEMES.find(t => t.id === slide.theme)?.class || 'pp-theme-white';
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
                    <div className={"pp-slide-viewport " + activeThemeClass}>
                        <div 
                            className="pp-editable-title" 
                            contentEditable={true} 
                            suppressContentEditableWarning={true}
                            onBlur={(e) => updateActiveSlide({ title: e.target.innerText })}
                        >
                            {activeSlide.title}
                        </div>
                        <div 
                            className="pp-editable-subtitle" 
                            contentEditable={true} 
                            suppressContentEditableWarning={true}
                            onBlur={(e) => updateActiveSlide({ subtitle: e.target.innerText })}
                        >
                            {activeSlide.subtitle}
                        </div>

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
                                    <>
                                        <li>High-performance vector rendering</li>
                                        <li>Apple SF Pro typography hierarchy</li>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Right Apple Inspector Panel */}
                {showInspector && (
                    <div className="pp-inspector">
                        <div className="pp-inspector-tabs">
                            <button 
                                className={"pp-tab-btn " + (inspectorTab === 'format' ? 'active' : '')} 
                                onClick={() => setInspectorTab('format')}
                            >
                                Format
                            </button>
                            <button 
                                className={"pp-tab-btn " + (inspectorTab === 'animate' ? 'active' : '')} 
                                onClick={() => setInspectorTab('animate')}
                            >
                                Animate
                            </button>
                            <button 
                                className={"pp-tab-btn " + (inspectorTab === 'document' ? 'active' : '')} 
                                onClick={() => setInspectorTab('document')}
                            >
                                Document
                            </button>
                        </div>

                        <div className="pp-inspector-body">
                            {/* Slide Themes */}
                            <div>
                                <div className="pp-section-title">Slide Theme</div>
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

                            {/* Slide Layouts */}
                            <div>
                                <div className="pp-section-title">Layout Style</div>
                                <button className="pp-layout-btn" onClick={() => updateActiveSlide({ layout: 'title' })}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="7" y1="12" x2="17" y2="12"></line></svg>
                                    Title Slide
                                </button>
                                <button className="pp-layout-btn" onClick={() => updateActiveSlide({ layout: 'bullets' })}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="13" y2="16"></line></svg>
                                    Title & Bullets
                                </button>
                                <button className="pp-layout-btn" onClick={() => updateActiveSlide({ layout: 'quote' })}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="12" cy="12" r="3"></circle></svg>
                                    Big Statement
                                </button>
                            </div>

                            {/* Slide Actions */}
                            <div>
                                <div className="pp-section-title">Slide Management</div>
                                <button className="pp-layout-btn" onClick={() => duplicateSlide(activeSlide)}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                    Duplicate Slide
                                </button>
                                <button 
                                    className="pp-layout-btn" 
                                    style={{color: '#ff3b30'}} 
                                    onClick={() => deleteSlide(activeSlide.id)}
                                    disabled={slides.length <= 1}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    Delete Slide
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Interactive Fullscreen Presentation Mode */}
            {isPresenting && (
                <div className="pp-presenter-overlay" onClick={() => setPresenterIndex(prev => Math.min(prev + 1, slides.length - 1))}>
                    {(() => {
                        const currentSlide = slides[presenterIndex] || slides[0];
                        const themeCls = PP_THEMES.find(t => t.id === currentSlide.theme)?.class || 'pp-theme-white';
                        return (
                            <div className={"pp-presenter-slide " + themeCls}>
                                <div style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px' }}>
                                    {currentSlide.title}
                                </div>
                                <div style={{ fontSize: '28px', opacity: 0.85, lineHeight: '1.4', marginBottom: '24px' }}>
                                    {currentSlide.subtitle}
                                </div>
                                {currentSlide.layout === 'bullets' && currentSlide.bullets && (
                                    <ul style={{ paddingLeft: '36px', fontSize: '24px', lineHeight: '1.8' }}>
                                        {currentSlide.bullets.map((b, i) => <li key={i}>{b}</li>)}
                                    </ul>
                                )}
                            </div>
                        );
                    })()}

                    <div className="pp-presenter-controls" onClick={(e) => e.stopPropagation()}>
                        <span>Slide {presenterIndex + 1} of {slides.length}</span>
                        <button 
                            style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer'}}
                            onClick={() => setPresenterIndex(prev => Math.max(prev - 1, 0))}
                            disabled={presenterIndex === 0}
                        >
                            ◀ Prev
                        </button>
                        <button 
                            style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer'}}
                            onClick={() => setPresenterIndex(prev => Math.min(prev + 1, slides.length - 1))}
                            disabled={presenterIndex >= slides.length - 1}
                        >
                            Next ▶
                        </button>
                        <button 
                            style={{background: '#ff3b30', border: 'none', color: 'white', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', fontWeight: '600'}}
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
