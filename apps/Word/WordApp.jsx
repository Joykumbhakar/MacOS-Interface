const { useState, useEffect, useRef } = React;

window.OfficeLucideIcon = ({ name, size = 18, color = 'currentColor', strokeWidth = 2 }) => {
    const icons = {
        'bold': <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />,
        'italic': <path d="M19 4h-9 M14 20H5 M15 4L9 20" />,
        'underline': <path d="M6 4v6a6 6 0 0 0 12 0V4 M4 20h16" />,
        'align-left': <path d="M21 6H3 M15 12H3 M17 18H3" />,
        'align-center': <path d="M21 6H3 M17 12H7 M19 18H5" />,
        'align-right': <path d="M21 6H3 M21 12H9 M21 18H7" />,
        'list': <path d="M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01" />,
        'plus': <path d="M12 5v14 M5 12h14" />
    };

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            {icons[name]}
        </svg>
    );
};

const WordApp = () => {
    const [content, setContent] = useState('');
    const canvasRef = useRef(null);

    const execCommand = (cmd) => {
        document.execCommand(cmd, false, null);
        if (canvasRef.current) canvasRef.current.focus({ preventScroll: true });
    };

    return (
        <div className="word-app-container">
            <div className="word-toolbar">
                <div className="word-titlebar">Document 1 - Word</div>
                <div className="word-ribbon">
                    <div className="ribbon-group">
                        <div className="ribbon-btn" onClick={() => execCommand('bold')} title="Bold (⌘B)"><window.OfficeLucideIcon name="bold" /></div>
                        <div className="ribbon-btn" onClick={() => execCommand('italic')} title="Italic (⌘I)"><window.OfficeLucideIcon name="italic" /></div>
                        <div className="ribbon-btn" onClick={() => execCommand('underline')} title="Underline (⌘U)"><window.OfficeLucideIcon name="underline" /></div>
                    </div>
                    <div className="ribbon-group">
                        <div className="ribbon-btn" onClick={() => execCommand('justifyLeft')}><window.OfficeLucideIcon name="align-left" /></div>
                        <div className="ribbon-btn" onClick={() => execCommand('justifyCenter')}><window.OfficeLucideIcon name="align-center" /></div>
                        <div className="ribbon-btn" onClick={() => execCommand('justifyRight')}><window.OfficeLucideIcon name="align-right" /></div>
                    </div>
                    <div className="ribbon-group">
                        <div className="ribbon-btn" onClick={() => execCommand('insertUnorderedList')}><window.OfficeLucideIcon name="list" /></div>
                    </div>
                </div>
            </div>
            <div className="word-canvas-wrapper">
                <div 
                    className="word-canvas" 
                    contentEditable={true} 
                    ref={canvasRef}
                    placeholder="Type here..."
                    onInput={(e) => setContent(e.target.innerHTML)}
                ></div>
            </div>
        </div>
    );
};

window.renderWordApp = () => {
    const rootEl = document.getElementById('word-react-root');
    if (rootEl) {
        try {
            ReactDOM.render(<WordApp />, rootEl);
        } catch (e) {
            rootEl.innerHTML = '<div style="color:red;padding:20px;">React Error: ' + e.message + '</div>';
        }
    }
};

if (document.getElementById('word-react-root')) { 
    window.renderWordApp(); 
}
