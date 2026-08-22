        // 1. Data & Definitions
        const ICONS = {
            folder: 'images/Icons/Dev Tools Icons/folder.png',
            file: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="15" width="50" height="70" rx="4" fill="#ffffff"/><path d="M75 35 L55 15 V35 Z" fill="#e2e8f0"/><rect x="35" y="45" width="30" height="4" rx="2" fill="#cbd5e1"/><rect x="35" y="55" width="30" height="4" rx="2" fill="#cbd5e1"/><rect x="35" y="65" width="20" height="4" rx="2" fill="#cbd5e1"/></svg>')
        };

        const APP_DATA = [
            { id: 'finder', name: 'Finder', icon: 'images/Icons/Finder.png', category: 'utility', isOpen: true },
            { id: 'launchpad', name: 'Launchpad', icon: 'images/Icons/LaunchPad.png', category: 'utility', isOpen: false },
            { id: 'settings', name: 'System Settings', icon: 'images/Icons/Settings.png', category: 'utility', isOpen: false },
            { id: 'appstore', name: 'App Store', icon: 'images/Icons/AppStore.png', category: 'utility', isOpen: false },
            { id: 'safari', name: 'Safari', icon: 'images/Icons/safari.png', category: 'browser', isOpen: false },
            { id: 'chrome', name: 'Google Chrome', icon: 'images/Icons/Chrome.png', category: 'browser', isOpen: false },
            { id: 'brave', name: 'Brave', icon: 'images/Icons/Brave.png', category: 'browser', isOpen: false },
            { id: 'messages', name: 'Messages', icon: 'images/Icons/Messages.png', category: 'chat', isOpen: false },
            { id: 'mail', name: 'Mail', icon: 'images/Icons/Mail.png', category: 'chat', isOpen: false },
            { id: 'whatsapp', name: 'WhatsApp', icon: 'images/Icons/WhatsApp.png', category: 'chat', isOpen: false },
            { id: 'telegram', name: 'Telegram', icon: 'images/Icons/Telegram.png', category: 'chat', isOpen: false },
            { id: 'zoom', name: 'Zoom', icon: 'images/Icons/Zoom.png', category: 'chat', isOpen: false },
            { id: 'facebook', name: 'Facebook', icon: 'images/Icons/Facebook.png', category: 'chat', isOpen: false },
            { id: 'x', name: 'X', icon: 'images/Icons/X.png', category: 'chat', isOpen: false },
            { id: 'twitter', name: 'Twitter', icon: 'images/Icons/Twitter.png', category: 'chat', isOpen: false },
            { id: 'linkedin', name: 'LinkedIn', icon: 'images/Icons/Linkedln.png', category: 'chat', isOpen: false },
            { id: 'reddit', name: 'Reddit', icon: 'images/Icons/Reddit.png', category: 'chat', isOpen: false },
            { id: 'music', name: 'Music', icon: 'images/Icons/Music.png', category: 'media', isOpen: false },
            { id: 'spotify', name: 'Spotify', icon: 'images/Icons/Spotify.png', category: 'media', isOpen: false },
            { id: 'youtube', name: 'YouTube', icon: 'images/Icons/Youtube.png', category: 'media', isOpen: false },
            { id: 'ytmusic', name: 'YT Music', icon: 'images/Icons/yt.png', category: 'media', isOpen: false },
            { id: 'netflix', name: 'Netflix', icon: 'images/Icons/Netflix.png', category: 'media', isOpen: false },
            { id: 'vlc', name: 'VLC', icon: 'images/Icons/VLC.png', category: 'media', isOpen: false },
            { id: 'appletv', name: 'Apple TV', icon: 'images/Icons/Apple_TV.png', category: 'media', isOpen: false },
            { id: 'word', name: 'Word', icon: 'images/Icons/MsWord.png', category: 'office', isOpen: false, needsPadding: true },
            { id: 'excel', name: 'Excel', icon: 'images/Icons/MsExcel.png', category: 'office', isOpen: false },
            { id: 'powerpoint', name: 'PowerPoint', icon: 'images/Icons/MsPP.png', category: 'office', isOpen: false },
            { id: 'onenote', name: 'OneNote', icon: 'images/Icons/MsOnenotes.png', category: 'office', isOpen: false },
            { id: 'outlook', name: 'Outlook', icon: 'images/Icons/outlook.png', category: 'office', isOpen: false, needsPadding: true },
            { id: 'gdocs', name: 'Google Docs', icon: 'images/Icons/Google_Docs.png', category: 'office', isOpen: false },
            { id: 'gsheets', name: 'Google Sheets', icon: 'images/Icons/Google_Sheets.png', category: 'office', isOpen: false },
            { id: 'gslides', name: 'Google Slides', icon: 'images/Icons/Google_Slides.png', category: 'office', isOpen: false },
            { id: 'gmail', name: 'Gmail', icon: 'images/Icons/gmail.png', category: 'office', isOpen: false },
            { id: 'calendar', name: 'Calendar', icon: 'images/Icons/Calendar.png', category: 'office', isOpen: false },
            { id: 'notes', name: 'Notes', icon: 'images/Icons/Notes.png', category: 'office', isOpen: false },
            { id: 'figma', name: 'Figma', icon: 'images/Icons/Figma.png', category: 'design', isOpen: false },
            { id: 'photoshop', name: 'Photoshop', icon: 'images/Icons/PhotoShop.png', category: 'design', isOpen: false },
            { id: 'finalcut', name: 'Final Cut Pro', icon: 'images/Icons/Final_Cut_Pro.png', category: 'design', isOpen: false },
            { id: 'photos', name: 'Photos', icon: 'images/Icons/Photos.png', category: 'media', isOpen: false },
            { id: 'vscode', name: 'VS Code', icon: 'images/Icons/VSCode.png', category: 'dev', isOpen: false },
            { id: 'androidstudio', name: 'Android Studio', icon: 'images/Icons/Android_Studio.png', category: 'dev', isOpen: false },
            { id: 'github', name: 'GitHub', icon: 'images/Icons/Github.png', category: 'dev', isOpen: false },
            { id: 'docker', name: 'Docker', icon: 'images/Icons/Docker.png', category: 'dev', isOpen: false },
            { id: 'terminal', name: 'Terminal', icon: 'images/Icons/Terminal.png', category: 'dev', isOpen: false },
            { id: 'arduino', name: 'Arduino', icon: 'images/Icons/Arduino_IDE.png', category: 'dev', isOpen: false },
            { id: 'chatgpt', name: 'ChatGPT', icon: 'images/Icons/ChatGPT.png', category: 'chat', isOpen: false },
            { id: 'claude', name: 'Claude', icon: 'images/Icons/Claude.png', category: 'chat', isOpen: false },
            { id: 'gemini', name: 'Gemini', icon: 'images/Icons/Gemini.png', category: 'chat', isOpen: false },
            { id: 'google', name: 'Google', icon: 'images/Icons/Google.png', category: 'browser', isOpen: false },
            { id: 'calculator', name: 'Calculator', icon: 'images/Icons/Calculator.png', category: 'utility', isOpen: false },
            { id: 'weather', name: 'Weather', icon: 'images/Icons/Weather.png', category: 'utility', isOpen: false },
            { id: 'maps', name: 'Maps', icon: 'images/Icons/Apple_maps.png', category: 'utility', isOpen: false },
            { id: 'contacts', name: 'Contacts', icon: 'images/Icons/Contacts.png', category: 'utility', isOpen: false },
            { id: 'findmy', name: 'Find My', icon: 'images/Icons/Find_my.png', category: 'utility', isOpen: false },
            { id: 'camera', name: 'Camera', icon: 'images/Icons/Camera.png', category: 'utility', isOpen: false },
            { id: 'home', name: 'Home', icon: 'images/Icons/Home.png', category: 'utility', isOpen: false },
            { id: 'files', name: 'Files', icon: 'images/Icons/Files.png', category: 'utility', isOpen: false },
            { id: 'steam', name: 'Steam', icon: 'images/Icons/Steam.png', category: 'game', isOpen: false },
            { id: 'minecraft', name: 'Minecraft', icon: 'images/Icons/Minecraft.png', category: 'game', isOpen: false },
            { id: '1password', name: '1Password', icon: 'images/Icons/1Password.png', category: 'utility', isOpen: false },
            { id: 'amazon', name: 'Amazon', icon: 'images/Icons/Amazon.png', category: 'browser', isOpen: false },
            { id: 'apple', name: 'Apple', icon: 'images/Icons/Apple.png', category: 'browser', isOpen: false },
            { id: 'bluetooth', name: 'Bluetooth', icon: 'images/Icons/Bluetooth.png', category: 'utility', isOpen: false },
            { id: 'trash', name: 'Bin', icon: 'images/Icons/Bin_empty.png', category: 'utility', isOpen: false },
            { id: 'python', name: 'Python', icon: 'images/Icons/Dev Tools Icons/Python.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'react', name: 'React', icon: 'images/Icons/Dev Tools Icons/React.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'nodejs', name: 'Node.js', icon: 'images/Icons/Dev Tools Icons/Node.js.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'nextjs', name: 'Next.js', icon: 'images/Icons/Dev Tools Icons/Next.js.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'firebase', name: 'Firebase', icon: 'images/Icons/Dev Tools Icons/Firebase.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'supabase', name: 'Supabase', icon: 'images/Icons/Dev Tools Icons/supabase.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'tailwind', name: 'Tailwind CSS', icon: 'images/Icons/Dev Tools Icons/Tailwind.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'typescript', name: 'TypeScript', icon: 'images/Icons/Dev Tools Icons/typescript.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'java', name: 'Java', icon: 'images/Icons/Dev Tools Icons/java.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'kotlin', name: 'Kotlin', icon: 'images/Icons/Dev Tools Icons/kotlin.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'c', name: 'C / C++', icon: 'images/Icons/Dev Tools Icons/C.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'sql', name: 'SQL', icon: 'images/Icons/Dev Tools Icons/sql.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'git', name: 'Git', icon: 'images/Icons/Dev Tools Icons/git.png', category: 'dev', isOpen: false, needsPadding: true },
            { id: 'magnet', name: 'Magnet', icon: 'images/Icons/Magnet.png', category: 'utility', isOpen: false },
            { id: 'appcleaner', name: 'AppCleaner', icon: 'images/Icons/AppCleaner.png', category: 'utility', isOpen: false },
            { id: 'uninstallpkg', name: 'UninstallPKG', icon: 'images/Icons/UninstallPKG.png', category: 'utility', isOpen: false },
            { id: 'macmousefix', name: 'Mac Mouse Fix', icon: 'images/Icons/Mac_Mouse_Fix.png', category: 'utility', isOpen: false },
            { id: 'machash', name: 'MacHash', icon: 'images/Icons/MacHash.png', category: 'utility', isOpen: false }
        ];

        const DOCK_APP_IDS = ['finder', 'launchpad', 'safari', 'messages', 'mail', 'maps', 'photos', 'calendar', 'notes', 'music', 'vscode', 'github', 'terminal', 'settings', 'trash'];
        APP_DATA.forEach(app => { app.inDock = DOCK_APP_IDS.includes(app.id); });

        const SKELETON_TEMPLATES = {
            chat: `
                <div class="skel-layout" style="background: rgba(30, 30, 32, 0.85);">
                    <div class="skel-header"><div class="skel-block" style="width: 120px; height: 16px; margin: 0 auto;"></div></div>
                    <div class="skel-body">
                        <div class="skel-sidebar">
                            ${Array(6).fill(0).map(() => `<div class="skel-chat-item"><div class="skel-block" style="width: 32px; height: 32px; border-radius: 50%;"></div><div class="skel-block" style="flex:1; height: 12px;"></div></div>`).join('')}
                        </div>
                        <div class="skel-main" style="justify-content: flex-end;">
                            <div class="skel-block skel-chat-bubble-l"></div>
                            <div class="skel-block skel-chat-bubble-l" style="width: 40%;"></div>
                            <div class="skel-block skel-chat-bubble-r"></div>
                            <div class="skel-block skel-chat-bubble-l" style="width: 70%;"></div>
                            <div class="skel-block skel-chat-bubble-r" style="width: 30%;"></div>
                            <div class="skel-block" style="width: 100%; height: 44px; border-radius: 22px; margin-top: 10px;"></div>
                        </div>
                    </div>
                </div>
            `,
            office: `
                <div class="skel-layout" style="background: #e5e5e5;">
                    <div class="skel-header" style="background: rgba(255,255,255,0.5);"><div class="skel-block-light" style="width: 160px; height: 16px; margin: 0 auto;"></div></div>
                    <div class="skel-office-ribbon">
                        <div style="display:flex; gap: 12px; margin-bottom: 12px;">
                            ${Array(8).fill(0).map(() => `<div class="skel-block-light" style="width: 24px; height: 24px; border-radius: 4px;"></div>`).join('')}
                        </div>
                        <div style="display:flex; gap: 12px;">
                            ${Array(12).fill(0).map(() => `<div class="skel-block-light" style="width: 32px; height: 12px; border-radius: 2px;"></div>`).join('')}
                        </div>
                    </div>
                    <div class="skel-office-page">
                        <div class="skel-block-light" style="width: 60%; height: 24px; margin-bottom: 20px;"></div>
                        ${Array(14).fill(0).map((_, i) => `<div class="skel-block-light" style="width: ${90 - (i%3)*10}%; height: 12px;"></div>`).join('')}
                    </div>
                </div>
            `,
            dev: `
                <div class="skel-layout" style="background: #1e1e1e;">
                    <div class="skel-header" style="background: #2d2d2d;"><div class="skel-block" style="width: 200px; height: 12px; margin: 0 auto;"></div></div>
                    <div class="skel-body">
                        <div class="skel-sidebar" style="background: #252526; width: 180px;">
                            <div class="skel-block" style="width: 60%; height: 10px; margin-bottom: 16px;"></div>
                            ${Array(10).fill(0).map((_, i) => `<div class="skel-block" style="width: ${70 - (i%4)*10}%; height: 10px; margin-left: ${(i%3)*12}px;"></div>`).join('')}
                        </div>
                        <div class="skel-main" style="background: #1e1e1e;">
                            <div style="display:flex; gap:2px; margin-bottom: 16px; margin-top:-24px; margin-left:-24px; margin-right:-24px; background:#2d2d2d;">
                                <div class="skel-block" style="width: 120px; height: 35px; border-radius:0;"></div>
                                <div class="skel-block" style="width: 120px; height: 35px; border-radius:0; opacity:0.5;"></div>
                            </div>
                            ${Array(15).fill(0).map((_, i) => `
                                <div class="skel-dev-line">
                                    <div class="skel-block skel-dev-num"></div>
                                    <div class="skel-block" style="width: ${Math.random() * 40 + 20}%; height: 14px; margin-left: ${Math.floor(Math.random()*4)*20}px;"></div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `,
            media: `
                <div class="skel-layout" style="background: #121212;">
                    <div class="skel-header" style="background: rgba(0,0,0,0.5);"><div class="skel-block" style="width: 140px; height: 16px; margin-left: 60px;"></div></div>
                    <div class="skel-body">
                        <div class="skel-sidebar" style="background: #000; width: 200px;">
                            ${Array(8).fill(0).map(() => `<div class="skel-block" style="width: 80%; height: 14px;"></div>`).join('')}
                        </div>
                        <div class="skel-main" style="overflow-y: auto;">
                            <div class="skel-block skel-media-hero"></div>
                            <div class="skel-block" style="width: 150px; height: 20px; margin-bottom: 16px;"></div>
                            <div class="skel-media-grid">
                                ${Array(8).fill(0).map(() => `<div class="skel-block skel-media-card"></div>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `,
            browser: `
                <div class="skel-layout" style="background: #ffffff;">
                    <div class="skel-header" style="background: #f5f5f7; height: 60px;">
                        <div class="skel-block-light" style="width: 40px; height: 24px; margin-left: 60px;"></div>
                        <div class="skel-block-light" style="flex:1; height: 28px; margin: 0 20px; border-radius: 6px;"></div>
                        <div class="skel-block-light" style="width: 80px; height: 24px;"></div>
                    </div>
                    <div class="skel-body" style="margin-top: 60px;">
                        <div class="skel-main" style="align-items: center; justify-content: center; background: #f9f9f9;">
                            <div class="skel-block-light" style="width: 50%; height: 40px; margin-bottom: 30px;"></div>
                            <div class="skel-block-light" style="width: 70%; height: 16px; margin-bottom: 12px;"></div>
                            <div class="skel-block-light" style="width: 65%; height: 16px; margin-bottom: 12px;"></div>
                            <div class="skel-block-light" style="width: 40%; height: 16px; margin-bottom: 40px;"></div>
                            <div style="display:flex; gap: 20px;">
                                ${Array(4).fill(0).map(() => `<div class="skel-block-light" style="width: 120px; height: 120px; border-radius: 12px;"></div>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `,
            generic: `
                <div class="skel-layout" style="background: rgba(30, 30, 32, 0.85);">
                    <div class="skel-header"><div class="skel-block" style="width: 120px; height: 16px; margin: 0 auto;"></div></div>
                    <div class="skel-body">
                        <div class="skel-sidebar">
                            ${Array(6).fill(0).map(() => `<div class="skel-block" style="width: 100%; height: 24px;"></div>`).join('')}
                        </div>
                        <div class="skel-main">
                            <div class="skel-block" style="width: 30%; height: 24px; margin-bottom: 20px;"></div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                                ${Array(6).fill(0).map(() => `<div class="skel-block" style="height: 80px;"></div>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `
        };

        const appState = {
            finder: { viewMode: 'icon', sortDir: 'asc' },
            files: [
                { id: '1', name: 'Projects', type: 'folder', parentId: 'root', date: 'Aug 12, 2026', size: '--', kind: 'Folder' },
                { id: '2', name: 'Design Assets', type: 'folder', parentId: 'root', date: 'Aug 14, 2026', size: '--', kind: 'Folder' },
                { id: '3', name: 'Documents', type: 'folder', parentId: 'root', date: 'Aug 16, 2026', size: '--', kind: 'Folder' },
                { id: '4', name: 'README.txt', type: 'file', parentId: 'root', date: 'Yesterday', size: '4 KB', kind: 'Plain Text' },
                { id: '5', name: 'Portfolio Website', type: 'folder', parentId: '1', date: 'Aug 12, 2026', size: '--', kind: 'Folder' },
                { id: '6', name: 'App Mockup.fig', type: 'file', parentId: '2', date: 'Aug 14, 2026', size: '12.4 MB', kind: 'Figma Document' },
                { id: '7', name: 'Screenshots', type: 'folder', parentId: 'desktop', date: 'Today', size: '--', kind: 'Folder' },
                { id: '8', name: 'Financials_Q3.xlsx', type: 'file', parentId: 'documents', date: 'Aug 01, 2026', size: '1.2 MB', kind: 'Microsoft Excel' },
                { id: '9', name: 'macOS_Sequoia.dmg', type: 'file', parentId: 'downloads', date: 'Today', size: '14.2 GB', kind: 'Disk Image' }
            ],
            pathHistory: ['root'],
            selectedItemIds: new Set(),
            clipboard: { action: null, items: [] }
        };

        // 2. Helper Functions
        const generateId = () => Math.random().toString(36).substr(2, 9);
        const currentFolderId = () => appState.pathHistory[appState.pathHistory.length - 1];
        const getFolderName = (id) => {
            if (id === 'root') return 'Recents';
            if (id === 'desktop') return 'Desktop';
            if (id === 'documents') return 'Documents';
            if (id === 'downloads') return 'Downloads';
            if (id === 'applications') return 'Applications';
            if (id === 'icloud') return 'iCloud Drive';
            if (id === 'shared') return 'Shared';
            const f = appState.files.find(f => f.id === id);
            return f ? f.name : 'Folder';
        };

        function getTemplateForMode(mode, data) {
            if (mode === 'peek') return `<div class="peek-layout"><div class="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5c211" stroke-width="2.5"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M6.34 17.66l-1.41 1.41"></path><path d="M19.07 4.93l-1.41 1.41"></path></svg><span>72&deg;</span></div><div class="peek-divider"></div><div class="flex items-center gap-2"><svg width="11" height="16" viewBox="0 0 11 18" fill="none" style="transform: translateY(1px);"><rect x="0.5" y="3.5" width="10" height="13" rx="2" fill="#34c759"/><path d="M3 1.5C3 0.9477 3.447 0.5 4 0.5H7C7.552 0.5 8 0.9477 8 1.5V3.5H3V1.5Z" fill="#34c759"/></svg><span style="color:#34c759">84%</span></div><div class="peek-divider"></div><div>Tue 18 Aug</div></div>`;
            if (mode === 'media') return `<div class="media-bg" style="background-image: url('${data.icon}')"></div><div class="media-layout"><div class="media-top"><img src="${data.icon}" class="media-art"><div class="media-info"><div class="media-title">${data.title}</div><div class="media-artist">${data.artist}</div></div><div class="visualizer" id="media-visualizer"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div></div></div><div class="media-progress"><div class="progress-bar"><div class="progress-fill" id="media-progress-fill" style="width: 45%;"></div></div><div class="progress-times"><span id="media-time-current">1:24</span><span>-2:26</span></div></div><div class="media-controls"><button class="media-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg></button><button class="media-btn" id="media-play-btn"><svg class="pause-icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5h2v14H8zm6 0h2v14h-2z"/></svg><svg class="play-icon" style="display:none;" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><button class="media-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg></button></div></div>`;
            if (mode === 'nook') return `
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%; padding: 0 24px; box-sizing: border-box;">
                    <div style="display: flex; gap: 16px; align-items: center; flex: 1;">
                        <img src="${data.icon}" style="width: 60px; height: 60px; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                            <div style="color: #fff; font-size: 16px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; letter-spacing: -0.3px;">${data.title}</div>
                            <div style="color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${data.artist}</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 20px; align-items: center; color: white;">
                        <button style="background:none;border:none;color:white;cursor:pointer;padding:0;display:flex;"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg></button>
                        <button id="nook-play-btn" style="background:none;border:none;color:white;cursor:pointer;padding:0;display:flex;">
                            <svg class="pause-icon" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5h2v14H8zm6 0h2v14h-2z"/></svg>
                            <svg class="play-icon" style="display:none;" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                        <button style="background:none;border:none;color:white;cursor:pointer;padding:0;display:flex;"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg></button>
                        <button style="background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;padding:0;margin-left:8px;display:flex;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></button>
                    </div>
                </div>
            `;
            if (mode === 'tray') return `<div class="tray-layout"><div class="tray-drop-zone"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg><span>Drop files to save to DynaTray</span></div></div>`;
            if (mode === 'timer') return `<div class="timer-layout"><div class="timer-left"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><span>Focus Time</span></div><div class="timer-right" id="live-timer">15:00</div></div>`;
            if (mode === 'notification') return `<div class="notif-layout"><img src="${data.icon}" class="notif-icon"><div class="media-info"><div class="media-title">${data.title}</div><div class="media-artist">${data.subtitle}</div></div></div>`;
            if (mode === 'auth') return `<div class="auth-layout"><div class="auth-icon-wrapper"><svg class="auth-face-svg" viewBox="0 0 24 24"><path d="M7 3H5a2 2 0 0 0-2 2v2M17 3h2a2 2 0 0 1 2 2v2M3 17v2a2 2 0 0 0 2 2h2M21 17v2a2 2 0 0 1-2 2h-2M9 10h.01M15 10h.01M12 14c-1.5 0-2.5-.5-3-1.5"/></svg><div class="auth-scan-line"></div></div><div class="auth-info-block"><div class="auth-title">Face ID</div><div class="auth-subtitle">Verifying...</div></div></div>`;
        }

        // 3. Core UI Functions
        function updatePathBar() {
            const pathEl = document.getElementById('finder-pathbar');
            if(!pathEl) return;
            let html = `<div class="path-item" onclick="appState.navigateTo('root')">Macintosh HD</div>`;
            appState.pathHistory.slice(1).forEach((id, index) => {
                const folderName = getFolderName(id);
                html += `<svg class="path-sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
                const historyToHere = appState.pathHistory.slice(0, index + 2);
                html += `<div class="path-item" onclick="appState.jumpToPath('${historyToHere.join(',')}')">${folderName}</div>`;
            });
            pathEl.innerHTML = html;
        }

        function renderFiles() {
            if (window.Finder && window.Finder.render) {
                return window.Finder.render();
            }
            const contentArea = document.getElementById('mac-content');
            const titleEl = document.getElementById('finder-title');
            const backBtn = document.getElementById('nav-back');
            const statusEl = document.getElementById('finder-status-text');

            if (!contentArea) return;
            contentArea.innerHTML = '';
            
            const currId = currentFolderId();
            const currentFiles = appState.files.filter(f => f.parentId === currId);

            if (titleEl) titleEl.textContent = getFolderName(currId);
            if (backBtn) backBtn.disabled = appState.pathHistory.length <= 1;
            if (statusEl) statusEl.textContent = `${currentFiles.length} item${currentFiles.length !== 1 ? 's' : ''}, 142.5 GB available`;
            
            updatePathBar();

            document.querySelectorAll('.sb-item').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.sb-item').forEach(el => {
                if (el.getAttribute('onclick') && el.getAttribute('onclick').includes(`'${currId}'`)) {
                    el.classList.add('active');
                }
            });

            if (currentFiles.length === 0) {
                contentArea.innerHTML = `<div style="display:flex; height:100%; width: 100%; align-items:center; justify-content:center; color:rgba(255,255,255,0.4); font-size:14px;">Folder is empty</div>`;
                return;
            }

            if (appState.finder.viewMode === 'icon') {
                const grid = document.createElement('div');
                grid.className = 'icon-view-grid';
                
                currentFiles.forEach(file => {
                    const el = document.createElement('div');
                    el.className = `folder-item ${appState.selectedItemIds.has(file.id) ? 'selected' : ''}`;
                    if (appState.clipboard.action === 'cut' && appState.clipboard.items.some(i => i.id === file.id)) el.classList.add('cut');
                    el.dataset.id = file.id;

                    const img = document.createElement('img');
                    img.className = 'folder-icon'; img.src = file.type === 'folder' ? ICONS.folder : ICONS.file;
                    
                    const span = document.createElement('span'); span.className = 'folder-name'; span.textContent = file.name;
                    el.appendChild(img); el.appendChild(span);
                    attachFileEvents(el, file);
                    grid.appendChild(el);
                });
                contentArea.appendChild(grid);
                
            } else if (appState.finder.viewMode === 'list') {
                const listContainer = document.createElement('div');
                listContainer.className = 'list-view-container';
                
                const header = document.createElement('div');
                header.className = 'list-header-wrapper';
                header.innerHTML = `
                    <div class="list-grid">
                        <div class="col-name">Name</div>
                        <div class="col-date">Date Modified</div>
                        <div class="col-size">Size</div>
                        <div class="col-kind">Kind</div>
                    </div>
                `;
                listContainer.appendChild(header);
                
                currentFiles.forEach(file => {
                    const row = document.createElement('div');
                    row.className = `list-row-wrapper ${appState.selectedItemIds.has(file.id) ? 'selected' : ''}`;
                    if (appState.clipboard.action === 'cut' && appState.clipboard.items.some(i => i.id === file.id)) row.classList.add('cut');
                    row.dataset.id = file.id;
                    
                    const iconSrc = file.type === 'folder' ? ICONS.folder : ICONS.file;
                    row.innerHTML = `
                        <div class="list-grid">
                            <div class="col-name"><img src="${iconSrc}" class="list-icon"> <span>${file.name}</span></div>
                            <div class="col-date">${file.date || '--'}</div>
                            <div class="col-size">${file.size || '--'}</div>
                            <div class="col-kind">${file.kind || '--'}</div>
                        </div>
                    `;
                    attachFileEvents(row, file);
                    listContainer.appendChild(row);
                });
                contentArea.appendChild(listContainer);
            }
        }

        function attachFileEvents(element, file) {
            element.addEventListener('mousedown', (e) => handleItemClick(e, file));
            element.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                if (file.type === 'folder') appState.navigateTo(file.id);
                else { 
                    element.style.transform = 'scale(0.9)'; setTimeout(() => element.style.transform = 'scale(1)', 100); 
                    window.toggleQuickLook(file);
                }
            });
            element.addEventListener('contextmenu', (e) => {
                e.stopPropagation(); e.preventDefault();
                if (!appState.selectedItemIds.has(file.id)) { appState.selectedItemIds.clear(); appState.selectedItemIds.add(file.id); renderFiles(); }
                showContextMenu(e, 'finder-item');
            });
        }

        function showContextMenu(e, type) {
            const finderMenu = document.getElementById('finder-ctx-menu'); 
            if (finderMenu) finderMenu.remove(); 
            const contextMenu = document.getElementById('context-menu');
            if (!contextMenu) return;
            
            // Don't show desktop context menu if lock screen is active
            const lockScreen = document.getElementById('lock-screen');
            if (lockScreen && lockScreen.style.display !== 'none' && lockScreen.style.opacity !== '0') return;

            // Hide all sections first
            const secFinderItem = document.getElementById('cm-finder-item');
            const secFinderBg = document.getElementById('cm-finder-bg');
            const secDesktop = document.getElementById('cm-desktop');
            const secWindow = document.getElementById('cm-window');

            if (secFinderItem) secFinderItem.style.display = 'none';
            if (secFinderBg) secFinderBg.style.display = 'none';
            if (secDesktop) secDesktop.style.display = 'none';
            if (secWindow) secWindow.style.display = 'none';

            if (type === 'finder-item' && secFinderItem) {
                secFinderItem.style.display = 'block';
                const hasSel = appState.selectedItemIds.size > 0, hasClip = appState.clipboard.items.length > 0;
                const setClass = (id, cond) => {
                    const el = document.getElementById(id);
                    if (el) el.className = cond ? (id === 'menu-delete' ? 'menu-item menu-item-danger' : 'menu-item') : 'menu-item disabled';
                };
                setClass('menu-open', hasSel);
                setClass('menu-quicklook', hasSel);
                setClass('menu-getinfo', hasSel);
                setClass('menu-copy', hasSel);
                setClass('menu-cut', hasSel);
                setClass('menu-duplicate', hasSel);
                setClass('menu-rename', hasSel && appState.selectedItemIds.size === 1);
                setClass('menu-delete', hasSel);
                setClass('menu-paste', hasClip);
            } else if (type === 'finder-bg' && secFinderBg) {
                secFinderBg.style.display = 'block';
            } else if (type === 'window' && secWindow) {
                secWindow.style.display = 'block';
            } else if (secDesktop) {
                secDesktop.style.display = 'block';
            }

            // Adjust position so it doesn't overflow screen boundaries
            let x = e.clientX;
            let y = e.clientY;
            contextMenu.style.visibility = 'hidden';
            contextMenu.style.display = 'block';
            contextMenu.classList.add('active');
            
            const rect = contextMenu.getBoundingClientRect();
            if (x + rect.width > window.innerWidth - 10) x = window.innerWidth - rect.width - 10;
            if (y + rect.height > window.innerHeight - 10) y = window.innerHeight - rect.height - 10;
            contextMenu.style.left = `${Math.max(10, x)}px`;
            contextMenu.style.top = `${Math.max(34, y)}px`;
            contextMenu.style.visibility = 'visible';
        }

        // Close context menu on global click or Escape
        document.addEventListener('click', (e) => {
            const contextMenu = document.getElementById('context-menu');
            if (contextMenu && !contextMenu.contains(e.target)) {
                contextMenu.classList.remove('active');
                contextMenu.style.display = 'none';
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const contextMenu = document.getElementById('context-menu');
                if (contextMenu) {
                    contextMenu.classList.remove('active');
                    contextMenu.style.display = 'none';
                }
            }
        });

        window.createDesktopFolder = function() {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            
            const newId = 'folder-' + Date.now();
            const newFolder = document.createElement('div');
            newFolder.className = 'desktop-item';
            newFolder.setAttribute('data-id', newId);
            newFolder.setAttribute('data-target', newId);
            
            newFolder.innerHTML = `
                <img src="images/Icons/Dev Tools Icons/folder.png" onerror="this.src='images/Icons/Finder.png'" alt="untitled folder">
                <span>untitled folder</span>
            `;
            
            const container = document.getElementById('desktop-icons-container');
            if (container) {
                container.appendChild(newFolder);
                if (window.DesktopIcons && typeof window.DesktopIcons.applySavedOrInitialPositions === 'function') {
                    // It's a singleton object, not a class
                    window.DesktopIcons.init(); // re-init to attach listeners if needed
                    window.DesktopIcons.applySavedOrInitialPositions();
                }
            }

            if (window.FS) {
                window.FS[newId] = {
                    id: newId,
                    name: 'untitled folder',
                    type: 'folder',
                    icon: 'folder-blue',
                    parent: 'desktop',
                    children: [],
                    modified: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    tags: []
                };
                if (!window.FS['desktop']) {
                    window.FS['desktop'] = { id: 'desktop', type: 'folder', children: [] };
                }
                if(window.FS['desktop'].children) {
                    window.FS['desktop'].children.push(newId);
                }
            }

            if (window.MacIsland) {
                MacIsland.dispatch({ type: 'notification', data: { title: 'Finder', subtitle: 'Created "untitled folder"', icon: 'images/Icons/Finder.png' }, duration: 2500 });
            }
            if (window.MacAudio) MacAudio.play('paper');
        };

        window.createDesktopFile = function() {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            if (window.appState && typeof window.appState.openApp === 'function') {
                window.appState.openApp('notes');
            }
            if (window.MacIsland) {
                MacIsland.dispatch({ type: 'notification', data: { title: 'Notes', subtitle: 'New Document Created', icon: 'images/Icons/Notes.png' }, duration: 2500 });
            }
            if (window.MacAudio) MacAudio.play('paper');
        };

        window.openWallpaperSettings = function() {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            if (window.appState) {
                window.appState.setSettingsView('wallpaper');
                window.appState.openApp('settings');
            }
        };

        window.openTerminalHere = function() {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            if (window.appState) {
                window.appState.openApp('terminal');
            }
        };

        window.cleanUpDesktopIcons = function() {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            if (window.DesktopIcons) DesktopIcons.cleanUp();
        };

        window.sortDesktopIcons = function(by) {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            if (window.DesktopIcons) DesktopIcons.sortBy(by);
            if (window.MacIsland) {
                MacIsland.dispatch({ type: 'notification', data: { title: 'Desktop', subtitle: `Sorted by ${by.charAt(0).toUpperCase() + by.slice(1)}`, icon: 'images/Icons/Finder.png' }, duration: 2000 });
            }
        };

        window.refreshDesktop = function() {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            const container = document.getElementById('desktop-icons-container');
            if (container) {
                container.style.opacity = '0.3';
                container.style.transition = 'opacity 0.15s ease';
                setTimeout(() => {
                    container.style.opacity = '1';
                }, 150);
            }
            if (window.MacAudio) MacAudio.play('paper');
        };

        window.showDesktopInfo = function() {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            if (window.toggleQuickLook) {
                window.toggleQuickLook({
                    type: 'folder',
                    name: 'Desktop',
                    kind: 'Folder',
                    size: '2.4 GB',
                    date: 'Today'
                });
            }
        };

        window.minimizeFocusedWindow = function() {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            const focused = document.querySelector('.mac-window.is-focused');
            if (focused) {
                const minBtn = focused.querySelector('.tl-min');
                if (minBtn) minBtn.click();
            }
        };

        window.zoomFocusedWindow = function() {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            const focused = document.querySelector('.mac-window.is-focused');
            if (focused) {
                const maxBtn = focused.querySelector('.tl-max');
                if (maxBtn) maxBtn.click();
            }
        };

        window.closeFocusedWindow = function() {
            const cm = document.getElementById('context-menu');
            if (cm) { cm.classList.remove('active'); cm.style.display = 'none'; }
            const focused = document.querySelector('.mac-window.is-focused');
            if (focused) {
                const closeBtn = focused.querySelector('.tl-close');
                if (closeBtn) closeBtn.click();
            }
        };

        // Global Context Menu Interception
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            
            // Check context
            let type = 'desktop'; // fallback
            
            if (e.target.closest('.dock-item')) {
                return; // Let dock handle its own menu
            } else if (e.target.closest('.mac-window')) {
                type = 'window';
            } else if (e.target.closest('.macos-desktop') || e.target.closest('.macos-body')) {
                type = 'desktop';
            }
            
            showContextMenu(e, type);
        });
        

        window.toggleQuickLook = function(file = null) {
            const overlay = document.getElementById('quicklook-overlay');
            if(!overlay) return;
            if (overlay.classList.contains('active')) {
                overlay.classList.remove('active');
            } else if (file) {
                document.getElementById('ql-icon').src = file.type === 'folder' ? ICONS.folder : ICONS.file;
                document.getElementById('ql-name').textContent = file.name;
                document.getElementById('ql-meta').innerHTML = `${file.kind}<br>${file.size}<br>Modified ${file.date}`;
                overlay.classList.add('active');
            } else if (appState.selectedItemIds.size === 1) {
                const f = appState.files.find(f => f.id === Array.from(appState.selectedItemIds)[0]);
                if (f) window.toggleQuickLook(f);
            }
        };

        function focusWindow(win) {
            document.querySelectorAll('.mac-window').forEach(w => {
                if (w !== win) {
                    w.classList.remove('is-focused');
                    w.style.zIndex = 5000;
                }
            });
            win.classList.add('is-focused');
            win.style.zIndex = 5050;
            
        }

        function makeDraggable(element) {
            const headers = element.querySelectorAll('.window-header, .mac-toolbar, .settings-sidebar .window-header, .mac-window > div:first-child');
            let offsetX = 0, offsetY = 0;
            const dragMouseDown = (e) => {
                if (e.target.tagName === 'BUTTON' || e.target.closest('.tl-btn') || e.target.tagName === 'INPUT' || e.target.closest('.view-toggles') || e.target.closest('.tb-action-btn') || e.target.closest('.am-top-tab') || e.target.closest('.am-nav-item') || e.target.closest('.am-search-bar')) return;
                if (element.classList.contains('maximized')) return;
                e.preventDefault();
                const rect = element.getBoundingClientRect();
                if (!element.classList.contains('dragged')) { element.classList.add('dragged'); element.style.margin = "0"; }
                element.style.left = rect.left + "px"; element.style.top = rect.top + "px";
                offsetX = e.clientX - rect.left; offsetY = e.clientY - rect.top;
                element.classList.add('is-dragging');
                document.addEventListener('mouseup', closeDragElement); document.addEventListener('mousemove', elementDrag);
            };
            if (headers.length > 0) { headers.forEach(h => h.addEventListener('mousedown', dragMouseDown)); }

            function elementDrag(e) { e.preventDefault(); element.style.left = (e.clientX - offsetX) + "px"; element.style.top = (e.clientY - offsetY) + "px"; }
            function closeDragElement() { element.classList.remove('is-dragging'); document.removeEventListener('mouseup', closeDragElement); document.removeEventListener('mousemove', elementDrag); }
        }

        // Expose globally for dynamically created skeletons
        window.makeDraggable = makeDraggable;

        // 4. App State Methods
        appState.jumpToPath = function(pathString) {
            this.pathHistory = pathString.split(',');
            this.selectedItemIds.clear();
            renderFiles();
        };
        appState.navigateTo = function(folderId) { if (window.Finder && Finder.navigateTo) Finder.navigateTo(folderId); };
        appState.navigateBack = function() { if (window.Finder && Finder.navigateBack) Finder.navigateBack(); };
        appState.setFinderView = function(mode) { if (window.Finder && Finder.setViewMode) Finder.setViewMode(mode); };

        appState.createSkeletonWindow = function(app) {
            if (document.getElementById(app.id + '-window')) return; 
            const winContainer = document.getElementById('windows-container'); 
            const win = document.createElement('div'); 
            win.id = app.id + '-window'; win.className = 'mac-window';
            
            let w = '800px', h = '500px'; 
            if (app.category === 'chat') { w = '750px'; h = '550px'; } 
            if (app.category === 'media') { w = '900px'; h = '600px'; } 
            if (app.category === 'office') { w = '850px'; h = '650px'; } 
            if (app.category === 'dev') { w = '1000px'; h = '700px'; }
            
            win.style.width = w; win.style.maxWidth = '90vw'; win.style.height = h; win.style.maxHeight = '85vh'; 
            win.style.marginTop = `${Math.floor(Math.random() * 40 - 20)}px`; win.style.marginLeft = `${Math.floor(Math.random() * 40 - 20)}px`;
            
            const template = SKELETON_TEMPLATES[app.category] || SKELETON_TEMPLATES.generic;
            win.innerHTML = `<div class="traffic-lights window-header" style="position: absolute; top:0; left:0; z-index: 10;"><div class="tl-btn tl-close"></div><div class="tl-btn tl-min"></div><div class="tl-btn tl-max"></div></div>${template}`;
            winContainer.appendChild(win); 
            
            makeDraggable(win); 
            win.addEventListener('mousedown', () => focusWindow(win));
            win.querySelector('.tl-close').addEventListener('click', (e) => { e.stopPropagation(); this.closeApp(app.id); });
            win.querySelector('.tl-min').addEventListener('click', (e) => { e.stopPropagation(); this.closeApp(app.id); });
            win.querySelector('.tl-max').addEventListener('click', (e) => { e.stopPropagation(); win.classList.toggle('maximized'); });
        };

        window.showFaceIdAuth = function(title = 'Face ID') {
            return new Promise(resolve => {
                if (window.MacIsland && window.MacIsland.dispatch) {
                    window.MacIsland.dispatch({
                        type: 'auth',
                        mode: 'expanded',
                        data: { title: title },
                        autoDismiss: false,
                        persistent: true
                    });

                    // Start scanning sequence
                    setTimeout(() => {
                        const faceGroup = document.getElementById('island-face-group');
                        const tickGroup = document.getElementById('island-tick-group');
                        const circleAnim = document.getElementById('island-circle-anim');
                        const checkAnim = document.getElementById('island-check-anim');
                        const authLabel = document.getElementById('island-auth-label');

                        if (faceGroup) {
                            faceGroup.classList.remove('scanning-pulse');
                            faceGroup.style.transform = 'scale(0.6)';
                            faceGroup.style.opacity = '0';
                        }

                        setTimeout(() => {
                            if (faceGroup) faceGroup.style.display = 'none';
                            if (tickGroup) {
                                tickGroup.style.display = 'block';
                                void tickGroup.offsetWidth;
                                tickGroup.style.opacity = '1';
                                tickGroup.style.transform = 'scale(1)';
                            }
                            if (circleAnim) circleAnim.style.animation = 'drawCircle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                            if (checkAnim) checkAnim.style.animation = 'drawCheck 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.15s';
                            if (authLabel) {
                                authLabel.style.color = '#32D74B';
                                authLabel.textContent = 'Unlocked';
                            }

                            setTimeout(() => {
                                window.MacIsland.dismiss();
                                setTimeout(() => {
                                    resolve(true);
                                }, 300);
                            }, 700);
                        }, 300);
                    }, 1200);
                } else {
                    resolve(true);
                }
            });
        };

        appState.openApp = async function(appId, sourceElement = null) {
            if (appId === 'settings' && !document.getElementById('settings-window').classList.contains('active')) {
                const authorized = await window.showFaceIdAuth();
                if (!authorized) return;
            }
            
            const appObj = APP_DATA.find(a => a.id === appId);
            if (appObj && appObj.category === 'folder') return;
            
            if (appObj && appId !== 'finder' && appId !== 'safari' && appId !== 'terminal' && appId !== 'settings') {
                                if (appId === 'calculator') {
                    if (!document.getElementById('calculator-window')) {
                        const winContainer = document.getElementById('windows-container');
                        const win = document.createElement('div');
                        win.id = 'calculator-window';
                        win.className = 'mac-window';
                        win.style.width = '240px';
                        win.style.height = '330px';
                        win.style.marginTop = `${Math.floor(Math.random() * 40 - 20)}px`;
                        win.style.marginLeft = `${Math.floor(Math.random() * 40 - 20)}px`;
                        win.innerHTML = `<div class="traffic-lights window-header" style="position: absolute; top:0; left:0; z-index: 10;"><div class="tl-btn tl-close"></div><div class="tl-btn tl-min"></div><div class="tl-btn tl-max" style="opacity: 0.5; pointer-events: none;"></div></div><div id="calculator-react-root" style="width:100%;height:100%;border-radius:inherit;overflow:hidden;"></div>`;
                        winContainer.appendChild(win);
                        makeDraggable(win);
                        win.addEventListener('mousedown', () => focusWindow(win));
                        win.querySelector('.tl-close').addEventListener('click', (e) => { e.stopPropagation(); this.closeApp('calculator'); });
                        win.querySelector('.tl-min').addEventListener('click', (e) => { e.stopPropagation(); this.closeApp('calculator'); });
                        
                        if (window.renderCalculatorApp) {
                            window.renderCalculatorApp();
                        }
                    }
                } else if (appId === 'music') {
                    if (!document.getElementById('music-window')) {
                        const winContainer = document.getElementById('windows-container');
                        const win = document.createElement('div');
                        win.id = 'music-window';
                        win.className = 'mac-window';
                        win.style.width = '1000px';
                        win.style.maxWidth = '90vw';
                        win.style.height = '650px';
                        win.style.maxHeight = '85vh';
                        win.style.marginTop = `${Math.floor(Math.random() * 40 - 20)}px`;
                        win.style.marginLeft = `${Math.floor(Math.random() * 40 - 20)}px`;
                        win.innerHTML = `<div class="traffic-lights window-header" style="position: absolute; top:0; left:0; z-index: 10;"><div class="tl-btn tl-close"></div><div class="tl-btn tl-min"></div><div class="tl-btn tl-max"></div></div><div id="music-react-root" style="width:100%;height:100%;border-radius:inherit;overflow:hidden;background:rgba(255,255,255,1);backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);"></div>`;
                        winContainer.appendChild(win);
                        makeDraggable(win);
                        win.addEventListener('mousedown', () => focusWindow(win));
                        win.querySelector('.tl-close').addEventListener('click', (e) => { e.stopPropagation(); this.closeApp('music'); });
                        win.querySelector('.tl-min').addEventListener('click', (e) => { e.stopPropagation(); this.closeApp('music'); });
                        win.querySelector('.tl-max').addEventListener('click', (e) => { e.stopPropagation(); win.classList.toggle('maximized'); });
                        
                        // Render React App
                        if (window.renderAppleMusicApp) {
                            window.renderAppleMusicApp();
                        }
                    }
                } else {
                    this.createSkeletonWindow(appObj);
                }
            }
            const win = document.getElementById(appId + '-window');
            if (!win) return;
            
            let iconEl = sourceElement || document.getElementById('dock-' + appId);
            
            if (iconEl) {
                win._sourceIcon = iconEl;
                const iconRect = iconEl.getBoundingClientRect();
                const iconCenterX = iconRect.left + iconRect.width / 2;
                const iconCenterY = iconRect.top + iconRect.height / 2;
                const tx = iconCenterX - win.offsetLeft - win.offsetWidth / 2;
                const ty = iconCenterY - win.offsetTop - win.offsetHeight / 2;
                const scale = iconRect.width / win.offsetWidth;
                
                win.style.setProperty('--icon-tx', `${tx}px`);
                win.style.setProperty('--icon-ty', `${ty}px`);
                win.style.setProperty('--icon-scale', Math.max(scale, 0.05));
            }
            
            void win.offsetWidth;
            requestAnimationFrame(() => { requestAnimationFrame(() => { win.classList.add('active'); if (typeof focusWindow === 'function') focusWindow(win); }); });
        };

        appState.closeApp = function(appId) {
            const win = document.getElementById(appId + '-window');
            if (!win) return;
            
            if (win._sourceIcon) {
                const iconRect = win._sourceIcon.getBoundingClientRect();
                const iconCenterX = iconRect.left + iconRect.width / 2;
                const iconCenterY = iconRect.top + iconRect.height / 2;
                const tx = iconCenterX - win.offsetLeft - win.offsetWidth / 2;
                const ty = iconCenterY - win.offsetTop - win.offsetHeight / 2;
                const scale = iconRect.width / win.offsetWidth;
                
                win.style.setProperty('--icon-tx', `${tx}px`);
                win.style.setProperty('--icon-ty', `${ty}px`);
                win.style.setProperty('--icon-scale', Math.max(scale, 0.05));
            }
            win.classList.remove('active', 'maximized');
        };

        
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// MAC AUDIO SYSTEM (Synthesized Web Audio Feedback for all UI Interactions)
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const MacAudio = {
    ctx: null,
    lastSliderTick: 0,
    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    },
    play(type = 'tap') {
        try {
            if (window.MacSettings && MacSettings.state) {
                const s = MacSettings.state;
                if (type === 'unlock' && !s.soundUnlock) return;
                if ((type === 'open' || type === 'launch') && !s.soundOpen) return;
                if (type === 'close' && !s.soundClose) return;
                if (type === 'trash' && !s.soundTrash) return;
                if (type === 'minimize' && !s.soundMinimize) return;
                if (type === 'maximize' && !s.soundMaximize) return;
                if (type === 'key' && !s.soundKey) return;
                if (type === 'slider' && !s.soundSlider) return;
                if ((type === 'toggleOn' || type === 'toggleOff') && !s.soundToggle) return;
                if ((type === 'tap' || type === 'select') && !s.soundTap) return;
            }

            this.init();
            if (!this.ctx) return;
            const ctx = this.ctx;
            const now = ctx.currentTime;

            if (type === 'tap' || type === 'select') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                const freq = type === 'select' ? 1250 : 1000;
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                osc.frequency.exponentialRampToValueAtTime(280, now + 0.015);
                
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
                
                osc.start(now);
                osc.stop(now + 0.02);
            } else if (type === 'launch') {
                [520, 1040].forEach((f, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(f, now + idx * 0.02);
                    osc.frequency.exponentialRampToValueAtTime(f * 1.2, now + idx * 0.02 + 0.06);
                    gain.gain.setValueAtTime(0.05, now + idx * 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.02 + 0.08);
                    osc.start(now + idx * 0.02);
                    osc.stop(now + idx * 0.02 + 0.09);
                });
            } else if (type === 'open') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.1);
            } else if (type === 'unlock') {
                [600, 1200].forEach((f, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(f, now + idx * 0.08);
                    osc.frequency.exponentialRampToValueAtTime(f * 1.5, now + idx * 0.08 + 0.05);
                    gain.gain.setValueAtTime(0.06, now + idx * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.08);
                    osc.start(now + idx * 0.08);
                    osc.stop(now + idx * 0.08 + 0.1);
                });
            } else if (type === 'close') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(750, now);
                osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
                osc.start(now);
                osc.stop(now + 0.045);
            } else if (type === 'minimize') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(240, now + 0.05);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
                osc.start(now);
                osc.stop(now + 0.06);
            } else if (type === 'maximize') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(380, now);
                osc.frequency.exponentialRampToValueAtTime(820, now + 0.045);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.055);
            } else if (type === 'toggleOn') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1600, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.02);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
                osc.start(now);
                osc.stop(now + 0.03);
            } else if (type === 'toggleOff') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(950, now);
                osc.frequency.exponentialRampToValueAtTime(350, now + 0.02);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
                osc.start(now);
                osc.stop(now + 0.03);
            } else if (type === 'slider') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1800, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.008);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);
                osc.start(now);
                osc.stop(now + 0.012);
            } else if (type === 'key') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1100, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.012);
                gain.gain.setValueAtTime(0.03, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
                osc.start(now);
                osc.stop(now + 0.018);
            } else if (type === 'trash') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(280, now);
                osc.frequency.exponentialRampToValueAtTime(90, now + 0.08);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
                osc.start(now);
                osc.stop(now + 0.1);
            }
        } catch(e) {}
    }
};

window.MacAudio = MacAudio;

// Global interaction sound dispatcher for every tap, click, and interaction
document.addEventListener('pointerdown', (e) => {
    const target = e.target;
    if (!target) return;

    if (target.closest('.tl-close')) {
        MacAudio.play('close');
        return;
    }
    if (target.closest('.tl-min')) {
        MacAudio.play('minimize');
        return;
    }
    if (target.closest('.tl-max')) {
        MacAudio.play('maximize');
        return;
    }
    if (target.closest('.dock-item')) {
        const item = target.closest('.dock-item');
        if (item.id === 'dock-trash') MacAudio.play('trash');
        else MacAudio.play('launch');
        return;
    }
    if (target.closest('.toggle-wrapper')) {
        return; // Handled directly on change
    }
    if (target.closest('input[type="range"]')) {
        MacAudio.play('slider');
        return;
    }
    if (target.closest('.calc-btn') || target.closest('.key') || target.closest('button')) {
        MacAudio.play('tap');
        return;
    }
    if (target.closest('.topbar-item') || target.closest('.mac-menu-item') || target.closest('.dock-menu-item') || target.closest('.context-menu-item')) {
        MacAudio.play('tap');
        return;
    }
    if (target.closest('.set-nav-item') || target.closest('.set-row') || target.closest('.sidebar-item') || target.closest('.wallpaper-thumb-desktop') || target.closest('.wallpaper-thumb-lock')) {
        MacAudio.play('tap');
        return;
    }
    if (target.closest('.desktop-item') || target.closest('.folder-item') || target.closest('.list-row-wrapper')) {
        MacAudio.play('select');
        return;
    }
    if (target.closest('a') || target.closest('.tab-item') || target.closest('.view-toggle-btn') || target.closest('.tb-action-btn') || target.closest('.widget') || target.closest('.dynamic-island-pill') || target.closest('.flip-card')) {
        MacAudio.play('tap');
        return;
    }
}, true);

// Slider drag tick sound feedback
document.addEventListener('input', (e) => {
    if (e.target && e.target.type === 'range') { const p = (e.target.value - e.target.min) / (e.target.max - e.target.min) * 100; e.target.style.setProperty('--value', p + '%');
        const now = Date.now();
        if (now - MacAudio.lastSliderTick > 50) {
            MacAudio.lastSliderTick = now;
            MacAudio.play('slider');
        }
    }
}, true);

// Key typing sound feedback
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        MacAudio.play('launch');
    } else if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName) && e.key.length === 1) {
        MacAudio.play('key');
    }
}, true);

// --- Helper: toggle switch sound & HTML ---
function playToggleSound(isOn) {
    MacAudio.play(isOn ? 'toggleOn' : 'toggleOff');
}

function toggleHTML(id, on, customJs = '') {
    return `<label class="toggle-wrapper" id="${id}">
        <input type="checkbox" class="toggle-input" ${on ? 'checked' : ''} onchange="playToggleSound(this.checked); if(window.appState && appState.toggleSetting) appState.toggleSetting('${id}', this.checked); ${customJs}">
        <div class="toggle-track"></div>
        <div class="toggle-knob"></div>
    </label>`;
}

// --- Helper: row ---
function setRow(label, right, sub='') {
    const labelHtml = sub
        ? `<div><div style="font-size:13px;color:#1d1d1f;font-weight:400;">${label}</div><div style="font-size:11px;color:#8e8e93;margin-top:2px;">${sub}</div></div>`
        : `<span style="font-size:13px;color:#1d1d1f;font-weight:400;">${label}</span>`;
    return `<div class="set-row">${labelHtml}<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">${right}</div></div>`;
}

// --- Helper: section ---
function setSection(title, rows) {
    const hdr = title ? `<div class="set-section-header">${title}</div>` : '';
    return `${hdr}<div class="set-section">${rows}</div>`;
}

// --- Helper: chevron select ---
function setSelect(value) {
    return `<div style="display:flex;align-items:center;gap:4px;color:#555;font-size:13px;">${value}<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></div>`;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// VIEW DEFINITIONS
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const SETTINGS_VIEWS = {
    // --- Apple Account ---
    'apple-account': () => `
        <div style="display:flex;flex-direction:column;align-items:center;padding:32px 0 24px;gap:12px;">
            <div style="width:80px;height:80px;border-radius:50%;overflow:hidden;"><img src="images/Avatars/Profile-avatar.png" style="width:100%;height:100%;object-fit:cover;"></div>
            <div style="text-align:center;"><div style="font-size:18px;font-weight:700;color:#111;">Joy Kumbhakar</div><div style="font-size:13px;color:#555;">thejoykumbhakar@gmail.com</div></div>
        </div>
        ${setSection('', `
            ${setRow('Personal Information', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            ${setRow('Sign-In & Security', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            ${setRow('Payment & Shipping', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
        `)}
        ${setSection('iCloud', `
            ${setRow('iCloud Drive', toggleHTML('t-icloud-drive', true))}
            ${setRow('Photos', toggleHTML('t-icloud-photos', true))}
            ${setRow('iCloud Mail', toggleHTML('t-icloud-mail', true))}
            ${setRow('Contacts', toggleHTML('t-icloud-contacts', true))}
            ${setRow('Calendars', toggleHTML('t-icloud-cal', true))}
            ${setRow('Reminders', toggleHTML('t-icloud-rem', true))}
            ${setRow('Safari', toggleHTML('t-icloud-safari', true))}
            ${setRow('Notes', toggleHTML('t-icloud-notes', true))}
            ${setRow('Passwords & Keychain', toggleHTML('t-icloud-keys', true))}
        `)}
        ${setSection('Media & Purchases', `
            ${setRow('Subscriptions', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            ${setRow('Purchase History', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
        `)}`,

    // --- Wi-Fi ---
    'wifi': () => `
        ${setSection('', `${setRow('Wi-Fi', toggleHTML('t-wifi', MacSettings.state.wifiEnabled, 'MacSettings.setWifi(this.checked);'))}`)}
        ${setSection('', `
            <div class="set-row" style="background:#e8f4ff;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1.5" fill="#0a84ff" stroke="none"/></svg>
                    <div><div style="font-weight:600;font-size:13px;">${window.MacNetworkStatus ? (window.MacNetworkStatus.online ? 'Connected Network' : 'Offline') : 'Home_Network'}</div><div style="font-size:11px;color:#555;">${window.MacNetworkStatus && !window.MacNetworkStatus.online ? 'Not Connected' : 'Connected'}</div></div>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
        `)}
        ${setSection('Nearby Networks', `
            ${setRow('Work_5G', setSelect(''))}
            ${setRow('iPhone Hotspot', setSelect(''))}
            ${setRow('TP-LINK_GUEST', setSelect(''))}
        `)}`,

    // --- Bluetooth ---
    'bluetooth': () => `
        ${setSection('', `${setRow('Bluetooth', toggleHTML('t-bt', MacSettings.state.bluetoothOn, 'MacSettings.setBluetooth(this.checked);'))}`)}
        ${setSection('My Devices', `
            ${setRow('AirPods Pro', '<div style="font-size:12px;color:#34c759;">Connected</div>')}
            
            ${setRow('Magic Keyboard', '<div style="font-size:12px;color:#34c759;">Connected</div>')}
            
            ${setRow('Magic Mouse', '<div style="font-size:12px;color:#34c759;">Connected</div>')}
        `)}`,

    // --- Network ---
    'network': () => {
        const online = window.MacNetworkStatus ? window.MacNetworkStatus.online : navigator.onLine;
        return `
        ${setSection('', `
            ${setRow('Wi-Fi', `<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#555;">${online ? 'Connected' : 'Offline'} <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>`)}
            
            ${setRow('Ethernet', '<div style="font-size:12px;color:#999;">Not connected</div>')}
            
            ${setRow('Firewall', toggleHTML('t-fw', true))}
        `)}`;
    },

    // --- Notifications ---
    'notifications': () => `
        ${setSection('', `
            ${setRow('Allow Notifications', toggleHTML('t-notif-all', true))}
            
            ${setRow('Show previews', setSelect('When Unlocked'))}
            
            ${setRow('Group notifications', setSelect('Automatic'))}
        `)}
        ${setSection('Application Notifications', `
            ${['App Store','Calendar','FaceTime','Mail','Messages','Reminders','Safari','System Preferences'].map((a,i) =>
                `<div style="height:0.5px;background:#e5e5ea;margin:0 16px;display:${i===0?'none':'block'};"></div>${setRow(a, toggleHTML('t-notif-'+i, i < 6))}`
            ).join('')}
        `)}`,

    // --- Sound ---
        'sound': () => `
        ${setSection('Output', `
            ${setRow('Output Device', setSelect('MacBook Pro Speakers'))}
            
            <div class="set-row" style="flex-direction:column;align-items:flex-start;gap:8px;padding:12px 16px;">
                <span>Output volume</span>
                <div style="display:flex;align-items:center;gap:8px;width:100%;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
                    <input type="range" min="0" max="100" value="${MacSettings.state.outputVolume}" oninput="MacSettings.setVolume(+this.value);" style="flex:1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                </div>
            </div>
            
            ${setRow('Balance', '<input type="range" min="0" max="100" value="50" style="width:100px">')}
            
            ${setRow('Play sound on startup', toggleHTML('t-startup-sound', false))}
        `)}
        ${setSection('UI Sounds', `
            ${setRow('Unlock & Open sounds', toggleHTML('t-sound-open', MacSettings.state.soundUnlock, 'MacSettings.state.soundUnlock=this.checked;MacSettings.state.soundOpen=this.checked;MacSettings.save();'))}
            ${setRow('Close & Minimize sounds', toggleHTML('t-sound-close', MacSettings.state.soundClose, 'MacSettings.state.soundClose=this.checked;MacSettings.state.soundMinimize=this.checked;MacSettings.save();'))}
            ${setRow('Trash & Delete sounds', toggleHTML('t-sound-trash', MacSettings.state.soundTrash, 'MacSettings.state.soundTrash=this.checked;MacSettings.save();'))}
            ${setRow('System Interaction sounds', toggleHTML('t-sound-sys', MacSettings.state.soundTap, 'MacSettings.state.soundTap=this.checked;MacSettings.state.soundToggle=this.checked;MacSettings.state.soundSlider=this.checked;MacSettings.state.soundSelect=this.checked;MacSettings.save();'))}
            ${setRow('Keyboard typing sounds', toggleHTML('t-sound-key', MacSettings.state.soundKey, 'MacSettings.state.soundKey=this.checked;MacSettings.save();'))}
        `)}
        ${setSection('Input', `
            ${setRow('Input Device', setSelect('MacBook Pro Microphone'))}
            
            <div class="set-row" style="flex-direction:column;align-items:flex-start;gap:8px;padding:12px 16px;">
                <span>Input volume</span>
                <input type="range" min="0" max="100" value="${MacSettings.state.inputVolume}" oninput="MacSettings.state.inputVolume=+this.value;MacSettings.save();" style="width:100%">
            </div>
        `)}
        ${setSection('Sound Effects', `
            ${setRow('Play user interface sound effects', toggleHTML('t-ui-sounds', true))}
            
            ${setRow('Play feedback when volume is changed', toggleHTML('t-vol-feedback', true))}
        `)}`,
    // --- Focus ---
    'focus': () => `
        ${setSection('', `
            <div class="set-row" style="padding:12px 16px;gap:12px;">
                <div style="width:32px;height:32px;border-radius:8px;background:#5e5ce6;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></div>
                <div style="flex:1;"><div style="font-weight:600;font-size:13px;">Do Not Disturb</div><div style="font-size:11px;color:#999;">Off</div></div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            
            <div class="set-row" style="padding:12px 16px;gap:12px;">
                <div style="width:32px;height:32px;border-radius:8px;background:#ff9500;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
                <div style="flex:1;"><div style="font-weight:600;font-size:13px;">Personal</div><div style="font-size:11px;color:#999;">Off</div></div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            
            <div class="set-row" style="padding:12px 16px;gap:12px;">
                <div style="width:32px;height:32px;border-radius:8px;background:#007aff;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg></div>
                <div style="flex:1;"><div style="font-weight:600;font-size:13px;">Work</div><div style="font-size:11px;color:#999;">Off</div></div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            
            <div class="set-row" style="padding:12px 16px;gap:12px;">
                <div style="width:32px;height:32px;border-radius:8px;background:#30b0c7;display:flex;align-items:center;justify-content:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg></div>
                <div style="flex:1;"><div style="font-weight:600;font-size:13px;">Sleep</div><div style="font-size:11px;color:#999;">Off</div></div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
        `)}
        <div style="padding:16px;"><button style="width:100%;padding:8px;border-radius:8px;border:1px solid #d1d1d6;background:#f2f2f7;font-size:13px;font-weight:500;color:#0a84ff;cursor:pointer;">+ Add Focus</button></div>`,

    // --- Screen Time ---
    'screen-time': () => `
        ${setSection('', `
            ${setRow('Screen Time', toggleHTML('t-screentime', true))}
        `)}
        <div class="set-section-header">Usage</div>
        <div style="background:white;border-radius:12px;margin:0 20px;padding:16px;border:1px solid rgba(0,0,0,0.05);">
            <div style="font-size:12px;color:#999;margin-bottom:8px;">TODAY &mdash; 2h 34m</div>
            <div style="display:flex;gap:2px;height:80px;align-items:flex-end;">
                ${[40,60,80,50,100,70,45].map((h,i)=>`<div style="flex:1;background:${i===4?'#0a84ff':'#e5e5ea'};border-radius:3px 3px 0 0;height:${h}%;"></div>`).join('')}
            </div>
            <div style="display:flex;justify-content:space-between;font-size:10px;color:#999;margin-top:4px;"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
        </div>
        ${setSection('Limits', `
            ${setRow('App Limits', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            
            ${setRow('Communication Limits', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            
            ${setRow('Downtime', toggleHTML('t-downtime', false))}
        `)}`,

    // --- General ---
    'general': () => {
        const sys = window.MacSystemInfo || { cpu: 'Apple M4 Pro', totalMemGB: 24, osRelease: 'Tahoe 26.0', appVersion: '1.0.0' };
        const dsk = window.MacDiskInfo   || { used: '312 GB', total: '512 GB', usedPct: 61 };
        
        return `
        ${setSection('About This Mac', `
            <div style="padding:12px 16px;display:flex;flex-direction:column;gap:6px;">
                ${[['MacBook Pro',''],['Chip', sys.cpu],['Memory', sys.totalMemGB + ' GB'],['macOS', 'Tahoe 26.0 (Build ' + (sys.osRelease || '1.0') + ')'],['Serial Number','C02GH1ABCD']].map(([l,v])=>`<div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:#555;">${l}</span><span style="font-weight:${l==='MacBook Pro'?'700':'500'}">${v||l}</span></div>`).join('')}
            </div>
        `)}
        ${setSection('Software Update', `
            ${setRow('Automatic Updates', toggleHTML('t-autoupdate', true))}
            
            <div class="set-row"><span>macOS Interface v${sys.appVersion || '1.0'}</span><span style="font-size:12px;color:#34c759;">Up to Date</span></div>
            <div class="set-row" style="color: #0a84ff; font-weight: 500; cursor: pointer; justify-content: center;" onclick="if(window.require){ require('electron').ipcRenderer.invoke('update-check'); } else { alert('Updates are only supported in the desktop app.'); }">
                Check for Updates...
            </div>
        `)}
        ${setSection('Storage', `
            <div style="padding:16px;">
                <div style="height:12px;border-radius:6px;background:#e5e5ea;overflow:hidden;display:flex;margin-bottom:8px;">
                    <div style="width:${dsk.usedPct}%;background:#0a84ff;"></div>
                </div>
                <div style="font-size:12px;color:#555;text-align:right;">${dsk.used} of ${dsk.total} used</div>
            </div>
        `)}
        ${setSection('Reset', `
            <div class="set-row" style="color: #ff3b30; font-weight: 500; cursor: pointer; justify-content: center;" onclick="if(confirm('Are you sure you want to restore all settings to their defaults?')) { localStorage.removeItem('macSettings'); window.location.reload(); }">
                Restore Default Settings...
            </div>
        `)}
        ${setSection('Language & Region', `
            ${setRow('Preferred Language', setSelect('English (US)'))}
            
            ${setRow('Region', setSelect('United States'))}
            
            ${setRow('Calendar', setSelect('Gregorian'))}
            
            ${setRow('Temperature', setSelect('Fahrenheit'))}
        `)}
        ${setSection('Date & Time', `
            ${setRow('Set time and date automatically', toggleHTML('t-autotime', true))}
            
            ${setRow('Time Zone', setSelect(Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'))}
        `)}
        ${setSection('Login Items & Extensions', `
            ${setRow('Open at Login', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            
            ${setRow('Allow in the Background', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
        `)}`;
    },

    // --- Accessibility ---
    'accessibility': () => `
        ${setSection('Vision', `
            ${setRow('VoiceOver', toggleHTML('t-vo', false))}
            
            ${setRow('Zoom', toggleHTML('t-zoom-a11y', false))}
            
            ${setRow('Reduce Motion', toggleHTML('t-reduce-motion', MacSettings.state.reduceMotion, 'MacSettings.setReduceMotion(this.checked);'))}
            
            ${setRow('Reduce Transparency', toggleHTML('t-reduce-trans', MacSettings.state.reduceTransparency, 'MacSettings.setReduceTransparency(this.checked);'))}
            
            ${setRow('Spoken Content', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
        `)}
        ${setSection('Hearing', `
            ${setRow('Audio', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            
            ${setRow('Captions', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            
            ${setRow('Live Captions', toggleHTML('t-livecaptions', false))}
        `)}
        ${setSection('Motor', `
            ${setRow('Voice Control', toggleHTML('t-voicectrl', false))}
            
            ${setRow('Keyboard', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            
            ${setRow('Pointer Control', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            
            ${setRow('Switch Control', toggleHTML('t-switchctrl', false))}
        `)}`,

    // --- Control Center Settings ---
    'control-center-settings': () => `
        ${setSection('Control Center Modules', `
            ${[['Wi-Fi','always on'],['Bluetooth','always on'],['AirDrop','show when active'],['Focus','always show'],['Stage Manager','show when active'],['Screen Mirroring','show when active'],['Display','show when active'],['Sound','always show'],['Now Playing','show when active']].map(([name,hint],i)=>`${i?'':''}${setRow(name, setSelect(hint))}`).join('')}
        `)}
        ${setSection('Menu Bar Only', `
            ${[['Clock','show'],['Spotlight','show'],['Siri','show'],['Time Machine','show when active']].map(([name,hint],i)=>`${i?'':''}${setRow(name, setSelect(hint))}`).join('')}
        `)}`,

    // --- Siri & Spotlight ---
    'siri-spotlight': () => `
        ${setSection('Siri', `
            ${setRow('Ask Siri', toggleHTML('t-siri', true))}
            
            ${setRow('Listen for', setSelect('"Hey Siri"'))}
            
            ${setRow('Language', setSelect('English (United States)'))}
            
            ${setRow('Siri Voice', setSelect('American (Voice 4)'))}
            
            ${setRow('Siri Responses', setSelect('Automatic'))}
        `)}
        ${setSection('Spotlight', `
            ${setRow('Spotlight Privacy', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            
            <div class="set-row" style="flex-direction:column;align-items:flex-start;gap:12px;padding:12px 16px;">
                <span style="font-weight:600;">Search Results</span>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                    ${['Applications','Bookmarks & History','Calculator','Contacts','Conversion','Definition','Developer','Events & Reminders','Images','Mail & Messages','Movies','Music','Other','PDF Documents','Spreadsheets','System Settings','Tips','Websites'].map(c=>`<div style="padding:4px 10px;border-radius:6px;background:#e5e5ea;font-size:12px;cursor:pointer;">${c}</div>`).join('')}
                </div>
            </div>
        `)}`,

    // --- Desktop & Dock ---
    'desktop-dock': () => `
        ${setSection('Dock', `
            <div class="set-row" style="flex-direction:column;align-items:flex-start;gap:8px;padding:12px 16px;">
                <span>Size</span>
                <input type="range" min="24" max="80" value="${MacSettings.state.dockSize}" oninput="MacSettings.setDockSize(+this.value);" style="width:100%">
            </div>
            
            ${setRow('Magnification', toggleHTML('t-magnify', MacSettings.state.dockMagnify, 'MacSettings.state.dockMagnify=this.checked;MacSettings.save();'))}
            
            ${setRow('Position on screen', setSelect(MacSettings.state.dockPosition === 'bottom' ? 'Bottom' : MacSettings.state.dockPosition === 'left' ? 'Left' : 'Right'))}
            
            ${setRow('Minimize windows using', setSelect('Genie Effect'))}
            
            ${setRow('Automatically hide and show the Dock', toggleHTML('t-autohide', MacSettings.state.dockAutoHide, 'MacSettings.state.dockAutoHide=this.checked;MacSettings.applyDock();'))}
            
            ${setRow('Animate opening applications', toggleHTML('t-animopen', true))}
            
            ${setRow('Show indicators for open applications', toggleHTML('t-indicators', true))}
            
            ${setRow('Show suggested and recent apps in Dock', toggleHTML('t-recent', false))}
        `)}
        ${setSection('Windows', `
            ${setRow('Prefer tabs when opening documents', setSelect('In Full Screen'))}
            
            ${setRow('Ask to keep changes when closing documents', toggleHTML('t-keepchanges', false))}
            
            ${setRow('Close windows when quitting an application', toggleHTML('t-closeonquit', false))}
        `)}
        ${setSection('Stage Manager', `
            ${setRow('Stage Manager', toggleHTML('t-stage', false))}
        `)}
        ${setSection('Widgets', `
            ${setRow('Use iPhone Widgets', toggleHTML('t-iphone-widgets', true))}
            
            ${setRow('Widget style', setSelect('Automatic'))}
        `)}`,
        // --- Wallpaper ---
    'wallpaper': () => {
        const wallpapers = [
            { file: 'images/Wallpapers/27-Golden-Gate.jpg',              label: 'Golden Gate Day' },
            { file: 'images/Wallpapers/27-Golden-Gate-Dark.jpg',         label: 'Golden Gate Night' },
            { file: 'images/Wallpapers/26-Tahoe-Light-6K.jpg',           label: 'Tahoe Light' },
            { file: 'images/Wallpapers/lockscreen_wallpaper_defualt.jpg', label: 'Sonoma Default' },
            { file: 'images/Wallpapers/LockScreen.jpg',                  label: 'Sonoma Horizon' },
            { file: 'images/Wallpapers/Referance.jpg',                   label: 'macOS Abstract' }
        ];
        const curDesktop = MacSettings.state.wallpaper;
        const curLock = MacSettings.state.lockWallpaper;

        return `
        <div style="padding:16px 20px; overflow-y:auto;">
            <!-- Current Desktop Preview -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <div style="font-size:12px;color:#6e6e73;font-weight:600;text-transform:uppercase;letter-spacing:.5px;">Desktop Wallpaper</div>
            </div>
            
            <div style="width:100%;aspect-ratio:16/9;max-height:160px;border-radius:10px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);margin-bottom:14px;background:#111;">
                <img id="wallpaper-preview" src="${curDesktop}" style="width:100%;height:100%;object-fit:cover;">
            </div>

            <!-- Desktop Wallpapers Grid -->
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;">
                ${wallpapers.map(w => `
                    <div class="wallpaper-thumb-desktop" data-url="${w.file}" 
                         onclick="MacSettings.applyWallpaper('${w.file}');"
                         style="cursor:pointer;border-radius:8px;overflow:hidden;aspect-ratio:16/9;border:${curDesktop===w.file?'3px solid #0a84ff':'1.5px solid rgba(0,0,0,0.08)'};position:relative;" title="${w.label}">
                        <img src="${w.file}" style="width:100%;height:100%;object-fit:cover;pointer-events:none;">
                        <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.45);color:white;font-size:10px;padding:3px 6px;text-align:center;backdrop-filter:blur(4px);">${w.label}</div>
                    </div>`).join('')}
            </div>

            <!-- Custom Wallpaper Upload Section -->
            <div class="set-section" style="margin:0 0 20px 0;">
                <div class="set-row">
                    <span>Add Custom Wallpaper</span>
                    <label style="padding:5px 12px;border-radius:6px;background:#0a84ff;color:white;font-size:12px;font-weight:500;cursor:pointer;">
                        Choose File
                        <input type="file" accept="image/*" style="display:none;" onchange="
                            const file = this.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    MacSettings.applyWallpaper(e.target.result);
                                };
                                reader.readAsDataURL(file);
                            }
                        ">
                    </label>
                </div>
            </div>

            <!-- Lock Screen Wallpaper Section -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <div style="font-size:12px;color:#6e6e73;font-weight:600;text-transform:uppercase;letter-spacing:.5px;">Lock Screen Wallpaper</div>
                <button onclick="MacSettings.showLockScreen();" style="padding:4px 10px;border-radius:6px;border:1px solid #d1d1d6;background:white;color:#1d1d1f;font-size:11px;font-weight:500;cursor:pointer;">Preview Lock Screen</button>
            </div>

            <div style="width:100%;aspect-ratio:16/9;max-height:160px;border-radius:10px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);margin-bottom:14px;background:#111;">
                <img id="lock-wallpaper-preview" src="${curLock}" style="width:100%;height:100%;object-fit:cover;">
            </div>

            <!-- Lock Screen Wallpapers Grid -->
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;">
                ${wallpapers.map(w => `
                    <div class="wallpaper-thumb-lock" data-url="${w.file}"
                         onclick="MacSettings.applyLockWallpaper('${w.file}');"
                         style="cursor:pointer;border-radius:8px;overflow:hidden;aspect-ratio:16/9;border:${curLock===w.file?'3px solid #0a84ff':'1.5px solid rgba(0,0,0,0.08)'};position:relative;" title="${w.label}">
                        <img src="${w.file}" style="width:100%;height:100%;object-fit:cover;pointer-events:none;">
                        <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.45);color:white;font-size:10px;padding:3px 6px;text-align:center;backdrop-filter:blur(4px);">${w.label}</div>
                    </div>`).join('')}
            </div>

            <div class="set-section" style="margin:0 0 16px 0;">
                <div class="set-row">
                    <span>Add Custom Lock Wallpaper</span>
                    <label style="padding:5px 12px;border-radius:6px;background:#0a84ff;color:white;font-size:12px;font-weight:500;cursor:pointer;">
                        Choose File
                        <input type="file" accept="image/*" style="display:none;" onchange="
                            const file = this.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    MacSettings.applyLockWallpaper(e.target.result);
                                };
                                reader.readAsDataURL(file);
                            }
                        ">
                    </label>
                </div>
            </div>
        </div>`;
    },
    // --- Screen Saver ---
    'screen-saver': () => `
        ${setSection('', `
            ${setRow('Start after', setSelect('10 minutes'))}
            
            ${setRow('Show with clock', toggleHTML('t-saver-clock', true))}
        `)}
        <div style="padding:16px;">
            <div style="font-size:12px;color:#555;font-weight:600;margin-bottom:8px;">SCREEN SAVERS</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
                ${['Hello','Landscape','Aerials','Photo Shuffle','Slideshow','Nature'].map((s,i)=>`<div style="aspect-ratio:16/9;border-radius:6px;background:${['#000','#1a3a5c','#0a2a0a','#333','#1c1c1e','#0d2b0d'][i]};cursor:pointer;display:flex;align-items:center;justify-content:center;border:${i===0?'2px solid #0a84ff':'1px solid rgba(0,0,0,0.1)'};"><span style="color:white;font-size:11px;font-weight:600;">${s}</span></div>`).join('')}
            </div>
        </div>`,

    // --- Lock Screen Settings ---
        'lock-screen-settings': () => `
        ${setSection('', `
            ${setRow('Start Screen Saver when inactive', setSelect('For 5 minutes'))}
            
            ${setRow('Turn display off when inactive', setSelect('For 2 minutes'))}
        `)}
        ${setSection('', `
            ${setRow('Require password after screen saver begins', setSelect('Immediately'))}
            
            ${setRow('Show message when locked', toggleHTML('t-lock-msg', false))}
        `)}
        <div class="set-section-header">Lock Screen Password</div>
        <div class="set-section">
            <div style="padding:14px 16px;display:flex;flex-direction:column;gap:10px;">
                <div style="font-size:12px;color:#6e6e73;">Set a password that protects your Mac when locked.</div>
                <input type="password" id="new-lock-pwd" placeholder="New password" style="width:100%;padding:7px 10px;border-radius:7px;border:1px solid #d1d1d6;font-size:13px;outline:none;">
                <input type="password" id="confirm-lock-pwd" placeholder="Confirm password" style="width:100%;padding:7px 10px;border-radius:7px;border:1px solid #d1d1d6;font-size:13px;outline:none;">
                <div id="pwd-status" style="font-size:12px;color:#34c759;display:none;">Password saved!</div>
                <button onclick="
                    const p=document.getElementById('new-lock-pwd').value;
                    const c=document.getElementById('confirm-lock-pwd').value;
                    const s=document.getElementById('pwd-status');
                    if(p!==c){s.textContent='Passwords do not match.';s.style.color='#ff3b30';s.style.display='block';}
                    else{MacSettings.setLockPassword(p);s.textContent=p?'Password saved!':'Password removed.';s.style.color='#34c759';s.style.display='block';}
                    setTimeout(()=>s.style.display='none',2500);
                " style="padding:7px 14px;border-radius:7px;border:none;background:var(--accent,#0a84ff);color:white;font-size:13px;font-weight:600;cursor:pointer;align-self:flex-start;">Set Password</button>
                ${MacSettings.state.lockPassword ? `<button onclick="MacSettings.setLockPassword('');appState.setSettingsView('lock-screen-settings');" style="padding:7px 14px;border-radius:7px;border:1px solid #ff3b30;background:transparent;color:#ff3b30;font-size:13px;font-weight:600;cursor:pointer;align-self:flex-start;">Remove Password</button>` : ''}
            </div>
        </div>`,
    // --- Privacy & Security ---
    'privacy-security': () => `
        ${setSection('Privacy', `
            ${[['Location Services','On'],['Contacts',''],['Calendars',''],['Reminders',''],['Photos',''],['Camera',''],['Microphone',''],['Files and Folders',''],['Full Disk Access',''],['Screen Recording',''],['Accessibility',''],['Input Monitoring','']].map(([name,hint],i)=>`${i?'':''}${setRow(name, '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}`).join('')}
        `)}
        ${setSection('Security', `
            ${setRow('Allow apps downloaded from', setSelect('App Store and identified developers'))}
            
            ${setRow('FileVault', '<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#34c759;">On <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>')}
            
            ${setRow('Firewall', '<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#34c759;">On <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>')}
            
            ${setRow('Lockdown Mode', '<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#999;">Off <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>')}
        `)}`,

    // --- Face ID ---
    'face-id': () => `
        <div style="display:flex;flex-direction:column;align-items:center;padding:24px 0;gap:12px;">
            <img src="images/Icons/Face_ID.png" style="width:64px;height:64px;object-fit:cover;border-radius:14px;box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="font-size:13px;color:#555;text-align:center;">Set up Face ID<br>to verify your identity.</div>
        </div>
        ${setSection('Use Face ID for', `
            ${setRow('Unlocking your Mac', toggleHTML('t-fid-unlock', true))}
            ${setRow('Apple Pay', toggleHTML('t-fid-pay', false))}
            ${setRow('Password Autofill', toggleHTML('t-fid-pass', true))}
        `)}
    `,

    // --- Touch ID ---
    'touch-id': () => `
        <div style="display:flex;flex-direction:column;align-items:center;padding:24px 0;gap:12px;">
            <img src="images/Icons/fingerprint.png" style="width:64px;height:64px;object-fit:contain;opacity:0.7;">
            <div style="font-size:13px;color:#555;text-align:center;">Place your finger on Touch ID<br>to verify your identity.</div>
        </div>
        ${setSection('Fingerprints', `
            <div class="set-row" style="gap:12px;">
                <div style="width:32px;height:32px;border-radius:8px;background:#e5e5ea;display:flex;align-items:center;justify-content:center;">
                    <img src="images/Icons/fingerprint.png" style="width:18px;height:18px;object-fit:contain;opacity:0.5;">
                </div>
                <span style="flex:1;">Finger 1</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            
            <div class="set-row" style="padding:12px 16px;"><span style="color:#0a84ff;font-size:13px;cursor:pointer;">Add Fingerprint...</span></div>
        `)}
        ${setSection('Use Touch ID for', `
            ${setRow('Unlocking your Mac', toggleHTML('t-tid-unlock', true))}
            
            ${setRow('Apple Pay', toggleHTML('t-tid-pay', true))}
            
            ${setRow('App Store & Apple Books', toggleHTML('t-tid-appstore', true))}
            
            ${setRow('Password AutoFill', toggleHTML('t-tid-autofill', true))}
            
            ${setRow('Fast User Switching', toggleHTML('t-tid-switch', false))}
        `)}`,

    // --- Users & Groups ---
    'users-groups': () => `
        <div class="set-section-header">Current User</div>
        <div class="set-section">
            <div class="set-row" style="gap:12px;padding:12px 16px;">
                <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;"><img src="images/Avatars/Profile-avatar.png" style="width:100%;height:100%;object-fit:cover;"></div>
                <div style="flex:1;"><div style="font-weight:600;">Joy Kumbhakar</div><div style="font-size:11px;color:#0a84ff;">Admin</div></div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
        </div>
        ${setSection('Other Users', `
            <div class="set-row" style="padding:12px 16px;"><span style="color:#0a84ff;cursor:pointer;">+ Add User...</span></div>
        `)}
        ${setSection('Login Options', `
            ${setRow('Automatic login', setSelect('Off'))}
            
            ${setRow('Show the Sleep, Restart, and Shut Down buttons', toggleHTML('t-login-btns', true))}
            
            ${setRow('Show password hints', toggleHTML('t-pwdhints', false))}
        `)}`,

    // --- Keyboard ---
    'keyboard': () => `
        ${setSection('', `
            <div class="set-row" style="flex-direction:column;align-items:flex-start;gap:8px;padding:12px 16px;">
                <span>Key repeat rate</span>
                <div style="display:flex;align-items:center;gap:8px;width:100%;"><span style="font-size:11px;color:#999;">Slow</span><input type="range" min="0" max="100" value="70" style="flex:1"><span style="font-size:11px;color:#999;">Fast</span></div>
            </div>
            
            <div class="set-row" style="flex-direction:column;align-items:flex-start;gap:8px;padding:12px 16px;">
                <span>Delay until repeat</span>
                <div style="display:flex;align-items:center;gap:8px;width:100%;"><span style="font-size:11px;color:#999;">Long</span><input type="range" min="0" max="100" value="60" style="flex:1"><span style="font-size:11px;color:#999;">Short</span></div>
            </div>
            
            ${setRow('Adjust keyboard brightness in low light', toggleHTML('t-kbd-brightness', true))}
            
            ${setRow('Keyboard backlight off after', setSelect('5 secs of inactivity'))}
        `)}
        ${setSection('', `
            ${setRow('Press <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="display:inline; vertical-align:-3px; margin: 0 2px;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg><svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" stroke-width="1.2" style="display:inline; vertical-align:-4px; margin: 0 4px;"><rect x="1" y="1" width="12" height="14" rx="2"></rect><text x="7" y="11" font-size="7" font-weight="600" font-family="sans-serif" text-anchor="middle" fill="currentColor" stroke="none">fn</text></svg> key to', setSelect('Change Input Source'))}
            
            ${setRow('Keyboard Shortcuts...', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
            
            ${setRow('Input Sources...', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>')}
        `)}
        ${setSection('Text Input', `
            ${setRow('Autocorrect', toggleHTML('t-autocorrect', true))}
            
            ${setRow('Capitalize words automatically', toggleHTML('t-autocap', true))}
            
            ${setRow('Add period with double-space', toggleHTML('t-double-space', true))}
            
            ${setRow('Use smart quotes and dashes', toggleHTML('t-smart-quotes', true))}
        `)}`,

    // --- Trackpad ---
    'trackpad': () => `
        ${setSection('Point & Click', `
            <div class="set-row" style="flex-direction:column;align-items:flex-start;gap:8px;padding:12px 16px;">
                <span>Tracking speed</span>
                <div style="display:flex;align-items:center;gap:8px;width:100%;"><span style="font-size:11px;color:#999;">Slow</span><input type="range" min="0" max="100" value="60" style="flex:1"><span style="font-size:11px;color:#999;">Fast</span></div>
            </div>
            
            ${setRow('Click', setSelect('Light'))}
            
            ${setRow('Force Click and haptic feedback', toggleHTML('t-force-click', true))}
            
            ${setRow('Tap to click', toggleHTML('t-tap-click', false))}
            
            ${setRow('Secondary click', setSelect('Click or Tap with Two Fingers'))}
        `)}
        ${setSection('Scroll & Zoom', `
            ${setRow('Natural scrolling', toggleHTML('t-natural-scroll', true))}
            
            ${setRow('Zoom in or out', toggleHTML('t-pinch-zoom', true))}
            
            ${setRow('Smart zoom', toggleHTML('t-smart-zoom', true))}
            
            ${setRow('Rotate', toggleHTML('t-rotate', true))}
        `)}
        ${setSection('More Gestures', `
            ${setRow('Swipe between pages', setSelect('Scroll Left or Right with Two Fingers'))}
            
            ${setRow('Swipe between full-screen apps', setSelect('Swipe Left or Right with Four Fingers'))}
            
            ${setRow('Mission Control', toggleHTML('t-mission-ctrl', true))}
            
            ${setRow('Launchpad', toggleHTML('t-launchpad-gesture', true))}
        `)}`,

    // --- Battery ---
        'battery': () => {
        const pct = 79;
        const charging = true;
        // Generate battery level chart data (24 hours)
        const hours = ['12P','3','6','9','12A','3','6','9'];
        const chartData = [82,85,88,91,94,97,100,98,94,90,87,85,82,80,78,77,76,75,74,73,72,71,70,69];
        const screenData = [0,0,15,42,35,8,0,0,0,12,55,48,20,5,0,0,0,0,28,45,38,22,10,4];
        const maxScreen = Math.max(...screenData);

        return `
        <div style="padding:0;">

            <!-- Header info under title -->
            <div style="padding:6px 20px 0;display:flex;align-items:center;gap:8px;color:#8e8e93;font-size:12px;">
                <svg width="20" height="11" viewBox="0 0 20 11" fill="none">
                    <rect x="0.5" y="0.5" width="17" height="10" rx="2" stroke="#1d1d1f" stroke-opacity="0.35"/>
                    <rect x="1" y="1" width="${Math.round(pct*15/100)}" height="9" rx="1.5" fill="${pct>20?'#34c759':'#ff3b30'}"/>
                    <path d="M18.5 3.5v4" stroke="#1d1d1f" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span style="color:#1d1d1f;font-size:13px;">${pct}% &mdash; ${charging?'Charging':'Battery'}</span>
            </div>

            <!-- Top rows: Low Power Mode + Battery Health -->
            <div style="margin:16px 20px 0;">
                <div style="background:white;border-radius:12px;border:1px solid rgba(0,0,0,0.07);overflow:hidden;">
                    <div class="set-row">
                        <span style="font-size:13px;color:#1d1d1f;">Low Power Mode</span>
                        <div style="display:flex;align-items:center;gap:4px;color:#1d1d1f;font-size:13px;">
                            Never
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" stroke-width="2"><path d="M18 15l-6-6-6 6"/><path d="M18 9l-6-6-6 6"/></svg>
                        </div>
                    </div>
                    
                    <div class="set-row">
                        <span style="font-size:13px;color:#1d1d1f;">Battery Health</span>
                        <div style="display:flex;align-items:center;gap:6px;color:#8e8e93;font-size:13px;">
                            Normal
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Segmented Control -->
            <div style="margin:16px 20px 0;background:rgba(0,0,0,0.06);border-radius:9px;padding:2px;display:flex;">
                <div id="battery-tab-24h" onclick="document.getElementById('battery-tab-24h').style.background='white';document.getElementById('battery-tab-10d').style.background='transparent';document.getElementById('battery-tab-24h').style.boxShadow='0 1px 4px rgba(0,0,0,0.1)';document.getElementById('battery-tab-10d').style.boxShadow='none';"
                     style="flex:1;text-align:center;padding:5px 0;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;background:white;box-shadow:0 1px 4px rgba(0,0,0,0.1);color:#1d1d1f;transition:all 0.15s;">Last 24 Hours</div>
                <div id="battery-tab-10d" onclick="document.getElementById('battery-tab-10d').style.background='white';document.getElementById('battery-tab-24h').style.background='transparent';document.getElementById('battery-tab-10d').style.boxShadow='0 1px 4px rgba(0,0,0,0.1)';document.getElementById('battery-tab-24h').style.boxShadow='none';"
                     style="flex:1;text-align:center;padding:5px 0;border-radius:7px;font-size:12px;font-weight:500;cursor:pointer;background:transparent;color:#1d1d1f;transition:all 0.15s;">Last 10 Days</div>
            </div>

            <!-- Last charged info -->
            <div style="padding:12px 20px 0;">
                <div style="font-size:12px;font-weight:600;color:#1d1d1f;">Last charged to 100%</div>
                <div style="font-size:12px;color:#8e8e93;">Today, 3:${charging?'45':'12'} AM</div>
            </div>

            <!-- Battery Level Chart -->
            <div style="padding:10px 20px 0;">
                <div style="font-size:12px;font-weight:700;color:#1d1d1f;margin-bottom:6px;">Battery Level</div>
                <div style="position:relative;height:90px;background:white;border-radius:10px;border:1px solid rgba(0,0,0,0.06);overflow:hidden;padding:8px 8px 20px;">
                    <!-- Grid lines -->
                    <div style="position:absolute;top:8px;right:36px;font-size:9px;color:#8e8e93;">100%</div>
                    <div style="position:absolute;top:calc(8px + 35px);right:36px;font-size:9px;color:#8e8e93;">50%</div>
                    <div style="position:absolute;bottom:20px;right:36px;font-size:9px;color:#8e8e93;">0%</div>
                    <div style="position:absolute;top:8px;left:8px;right:40px;bottom:20px;display:flex;align-items:flex-end;gap:1px;">
                        ${chartData.map((v,i) => `
                        <div style="flex:1;background:#30d158;border-radius:1px 1px 0 0;height:${v}%;opacity:0.9;position:relative;">
                            ${charging && i > 20 ? '<div style="position:absolute;top:2px;left:50%;transform:translateX(-50%);font-size:6px;color:white;">&#9889;</div>' : ''}
                        </div>`).join('')}
                    </div>
                    <!-- Time labels -->
                    <div style="position:absolute;bottom:3px;left:8px;right:40px;display:flex;justify-content:space-between;">
                        ${hours.map(h => `<span style="font-size:9px;color:#8e8e93;">${h}</span>`).join('')}
                    </div>
                </div>
            </div>

            <!-- Screen On Usage Chart -->
            <div style="padding:10px 20px 16px;">
                <div style="font-size:12px;font-weight:700;color:#1d1d1f;margin-bottom:6px;">Screen On Usage</div>
                <div style="position:relative;height:90px;background:white;border-radius:10px;border:1px solid rgba(0,0,0,0.06);overflow:hidden;padding:8px 8px 20px;">
                    <div style="position:absolute;top:8px;right:36px;font-size:9px;color:#8e8e93;">60m</div>
                    <div style="position:absolute;top:calc(8px + 28px);right:36px;font-size:9px;color:#8e8e93;">30m</div>
                    <div style="position:absolute;bottom:20px;right:36px;font-size:9px;color:#8e8e93;">0m</div>
                    <div style="position:absolute;top:8px;left:8px;right:40px;bottom:20px;display:flex;align-items:flex-end;gap:2px;">
                        ${screenData.map(v => `<div style="flex:1;background:#0a84ff;border-radius:1px 1px 0 0;height:${maxScreen>0?Math.round(v/maxScreen*100):0}%;"></div>`).join('')}
                    </div>
                    <div style="position:absolute;bottom:3px;left:8px;right:40px;display:flex;justify-content:space-between;">
                        ${hours.map(h => `<span style="font-size:9px;color:#8e8e93;">${h}</span>`).join('')}
                    </div>
                </div>
            </div>

        </div>`;
    },
    // --- Sharing ---
    'sharing': () => `
        ${setSection('', `
            <div class="set-row" style="padding:12px 16px;flex-direction:column;align-items:flex-start;gap:4px;">
                <span style="font-weight:600;font-size:13px;">Computer Name</span>
                <input type="text" value="Joy's MacBook Pro" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid #d1d1d6;font-size:13px;outline:none;background:white;margin-top:4px;">
                <div style="font-size:11px;color:#999;">Local hostname: joys-macbook-pro.local</div>
            </div>
        `)}
        ${setSection('Services', `
            ${[['Screen Sharing',false],['File Sharing',false],['Media Sharing',false],['Remote Login',false],['Remote Management',false],['Remote Apple Events',false],['Internet Sharing',false],['Bluetooth Sharing',false],['Content Caching',false]].map(([name,on],i)=>`${i?'':''}${setRow(name, toggleHTML('t-share-'+i, on))}`).join('')}
        `)}`,

    // --- VPN ---
    'vpn': () => `
        ${setSection('', `
            <div class="set-row" style="padding:16px;"><span style="color:#0a84ff;cursor:pointer;">+ Add VPN Configuration...</span></div>
        `)}
        <div style="padding:16px 24px;color:#999;font-size:12px;">No VPN configurations are currently installed. Click "Add VPN Configuration" to create a new one.</div>`,

    // --- Internet Accounts ---
    'internet-accounts': () => `
        ${setSection('', `
            <div class="set-row" style="gap:12px;padding:12px 16px;">
                <div style="width:32px;height:32px;border-radius:8px;overflow:hidden;background:#fff;display:flex;align-items:center;justify-content:center;"><img src="images/Icons/Google.png" style="width:28px;height:28px;object-fit:contain;"></div>
                <div style="flex:1;"><div style="font-weight:600;font-size:13px;">Google</div><div style="font-size:11px;color:#555;">Mail, Contacts, Calendars</div></div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
        `)}
        <div style="padding:16px;">
            <div style="font-size:12px;color:#555;font-weight:600;margin-bottom:10px;">ADD ACCOUNT</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
                ${[['iCloud','#0a84ff'],['Google','#ea4335'],['Microsoft Exchange','#0078d4'],['Yahoo','#6001d2'],['AOL','#ff0b00'],['Other','#8e8e93']].map(([name,bg])=>`<div style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px;border-radius:10px;border:1px solid rgba(0,0,0,0.08);cursor:pointer;"><div style="width:36px;height:36px;border-radius:8px;background:${bg};"></div><span style="font-size:11px;font-weight:500;">${name}</span></div>`).join('')}
            </div>
        </div>`,

    // --- Game Center ---
    'game-center': () => `
        <div style="display:flex;flex-direction:column;align-items:center;padding:24px;gap:8px;">
            <div style="width:60px;height:60px;border-radius:14px;background:linear-gradient(135deg,#34c759,#0a84ff);display:flex;align-items:center;justify-content:center;"><svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M22.56 8.94C21.93 8.34 21.09 8 20.22 8H3.78c-.87 0-1.71.34-2.34.94-.63.6-.97 1.41-.94 2.25L1 13c.04.88.42 1.69 1.09 2.27.59.51 1.37.73 2.21.73.88 0 1.77-.38 2.35-1.08L8.5 12h7l1.85 2.92c.58.7 1.47 1.08 2.35 1.08.84 0 1.62-.22 2.21-.73.67-.58 1.05-1.39 1.09-2.27l.5-1.81c.03-.84-.31-1.65-.94-2.25z"/></svg></div>
            <div style="font-weight:700;font-size:16px;">Joy Kumbhakar</div>
            <div style="font-size:12px;color:#555;">@joy_kumbhakar</div>
        </div>
        ${setSection('', `
            ${setRow('Allow Finding by Friends', toggleHTML('t-gc-friends', true))}
            
            ${setRow('Nearby Multiplayer', toggleHTML('t-gc-nearby', true))}
            
            ${setRow('Share Games with Friends', toggleHTML('t-gc-share', true))}
        `)}`,

    // --- Wallet & Apple Pay ---
    'wallet-pay': () => `
        <div class="set-section-header">Payment Cards</div>
        <div style="display:flex; justify-content:center; padding: 20px 0;">
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <p class="heading_8264">MASTERCARD</p>
                        <svg class="logo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48">
                        <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path><path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path><path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path>
                        </svg>
                        <svg class="chip" viewBox="0 0 50 50" width="30px" height="30px">
  <rect x="5" y="10" width="40" height="30" rx="6" fill="#FFD700" stroke="#B8860B" stroke-width="1" />
  <path d="M 5 20 L 15 20 M 5 30 L 15 30 M 45 20 L 35 20 M 45 30 L 35 30 M 20 10 L 20 15 M 30 10 L 30 15 M 20 40 L 20 35 M 30 40 L 30 35" stroke="#B8860B" stroke-width="1.5" />
  <rect x="15" y="15" width="20" height="20" rx="4" fill="none" stroke="#B8860B" stroke-width="1.5" />
</svg>
                        <svg class="contactless" viewBox="0 0 24 24" width="20px" height="20px" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round">
    <path d="M5.5 18a10 10 0 0 1 0-12" opacity="0.4" />
    <path d="M9.5 15.5a6 6 0 0 1 0-7" opacity="0.6" />
    <path d="M13.5 13.5a2 2 0 0 1 0-3" opacity="0.9" />
</svg>
                        <p class="number">9759 2484 5269 6576</p>
                        <p class="valid_thru">VALID THRU</p>
                        <p class="date_8264">1 2 / 2 4</p>
                        <p class="name">BRUCE WAYNE</p>
                    </div>
                    <div class="flip-card-back">
                        <div class="strip"></div>
                        <div class="mstrip"></div>
                        <div class="sstrip">
                        <p class="code">***</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="set-section">
            <div class="set-row" style="padding:12px 16px;"><span style="color:#0a84ff;cursor:pointer;">+ Add Card...</span></div>
        </div>` + `
        <div class="set-section">
            <div class="set-row" style="gap:12px;padding:12px 16px;">
                <div style="width:52px;height:34px;border-radius:6px;background:linear-gradient(135deg,#1a1a2e,#16213e);display:flex;align-items:center;padding:4px 8px;"><div style="font-size:8px;color:white;font-weight:700;">VISA &bull;&bull;&bull; 4242</div></div>
                <div style="flex:1;"><div style="font-weight:600;font-size:13px;">Visa &bull;&bull;&bull;&bull;4242</div><div style="font-size:11px;color:#555;">Default Card</div></div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            
            <div class="set-row" style="padding:12px 16px;"><span style="color:#0a84ff;cursor:pointer;">+ Add Card...</span></div>
        </div>
        ${setSection('Shipping Address', `
            <div class="set-row" style="padding:12px 16px;flex-direction:column;align-items:flex-start;gap:2px;">
                <span style="font-weight:600;">Joy Kumbhakar</span>
                <span style="font-size:12px;color:#555;">123 Main St, New York, NY 10001</span>
            </div>
        `)}`,

    // --- Mouse ---
    'mouse': () => `
        ${setSection('', `
            <div class="set-row" style="flex-direction:column;align-items:flex-start;gap:8px;padding:12px 16px;">
                <span>Tracking speed</span>
                <div style="display:flex;align-items:center;gap:8px;width:100%;"><span style="font-size:11px;color:#999;">Slow</span><input type="range" min="0" max="100" value="55" style="flex:1"><span style="font-size:11px;color:#999;">Fast</span></div>
            </div>
            
            ${setRow('Natural scrolling', toggleHTML('t-mouse-natural', true))}
            
            ${setRow('Secondary click', setSelect('Click on right side'))}
            
            <div class="set-row" style="flex-direction:column;align-items:flex-start;gap:8px;padding:12px 16px;">
                <span>Double-click speed</span>
                <div style="display:flex;align-items:center;gap:8px;width:100%;"><span style="font-size:11px;color:#999;">Slow</span><input type="range" min="0" max="100" value="65" style="flex:1"><span style="font-size:11px;color:#999;">Fast</span></div>
            </div>
        `)}`,

    // --- Printers & Scanners ---
    'printers-scanners': () => `
        <div class="set-section-header">Printers</div>
        <div class="set-section">
            <div class="set-row" style="padding:12px 16px;"><span style="color:#999;">No printers added yet.</span></div>
            
            <div class="set-row" style="padding:12px 16px;"><span style="color:#0a84ff;cursor:pointer;">+ Add Printer, Scanner, or Fax...</span></div>
        </div>
        ${setSection('', `
            ${setRow('Default printer', setSelect('Last Printer Used'))}
            
            ${setRow('Default paper size', setSelect('US Letter'))}
        `)}`,
};

            appState.setSettingsView = function(view) {
            localStorage.setItem('macSettingsLastView', view);
            // Update active nav item
            document.querySelectorAll('.set-nav-item').forEach(el => el.classList.remove('active'));
            const navItem = document.getElementById('nav-' + view);
            if (navItem) navItem.classList.add('active');
            
            const titleEl = document.getElementById('settings-main-title');
            const contentArea = document.getElementById('settings-content-area');
            if (!titleEl || !contentArea) return;
            setTimeout(() => { document.querySelectorAll('input[type="range"]').forEach(r => { const p = (r.value - r.min) / (r.max - r.min) * 100; r.style.setProperty('--value', p + '%'); }); }, 10);
            
            // Set title
            const titles = {
                'apple-account': 'Apple Account',
                'wifi': 'Wi-Fi',
                'bluetooth': 'Bluetooth',
                'network': 'Network',
                'vpn': 'VPN',
                'notifications': 'Notifications',
                'sound': 'Sound',
                'focus': 'Focus',
                'screen-time': 'Screen Time',
                'general': 'General',
                'appearance': 'Appearance',
                'accessibility': 'Accessibility',
                'control-center-settings': 'Control Center',
                'siri-spotlight': 'Apple Intelligence & Siri',
                'desktop-dock': 'Desktop & Dock',
                'displays': 'Displays',
                'wallpaper': 'Wallpaper',
                'screen-saver': 'Screen Saver',
                'lock-screen-settings': 'Lock Screen',
                'privacy-security': 'Privacy & Security',
                'face-id': 'Face ID & Password',
                'touch-id': 'Touch ID & Password',
                'users-groups': 'Users & Groups',
                'internet-accounts': 'Internet Accounts',
                'game-center': 'Game Center',
                'wallet-pay': 'Wallet & Apple Pay',
                'keyboard': 'Keyboard',
                'trackpad': 'Trackpad',
                'mouse': 'Mouse',
                'printers-scanners': 'Printers & Scanners',
                'battery': 'Battery',
                'sharing': 'Sharing',
            };
            titleEl.textContent = titles[view] || view;
            
            if (SETTINGS_VIEWS[view]) {
                contentArea.innerHTML = SETTINGS_VIEWS[view]();
                return;
            }
            
            // Fallback for views not yet defined
            if (view === 'appearance') {
                titleEl.textContent = 'Appearance';
                const cur = MacSettings.state;
                contentArea.innerHTML = `
                <div style="padding:0 0 24px;display:flex;flex-direction:column;gap:16px;">
                
                <div class="set-section" style="margin-top:16px;">
                    <div class="set-row" style="padding:14px 20px;display:flex;align-items:flex-start;justify-content:space-between;border:none;">
                        <span style="font-size:13px;font-weight:600;margin-top:4px;">Appearance</span>
                        <div style="display:flex;gap:14px;align-items:flex-start;">
                            ${['Auto','Light','Dark'].map(m => `
                            <div onclick="MacSettings.applyAppearance('${m.toLowerCase()}');document.querySelectorAll('.appearance-mode-btn img').forEach(img=>img.style.outline='none');document.querySelectorAll('.appearance-mode-btn span').forEach(sp=>sp.style.fontWeight='400');this.querySelector('img').style.outline='2px solid #0a84ff';this.querySelector('span').style.fontWeight='600';" 
                                 class="appearance-mode-btn"
                                 style="display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:0;border:none;background:transparent;">
                                <img src="images/settings/${m.toLowerCase()}.png" 
                                     style="width:68px;height:45px;border-radius:6px;display:block;outline:${cur.appearance===m.toLowerCase()?'2px solid #0a84ff':'none'};outline-offset:1px;transition:outline 0.1s ease;" 
                                     alt="${m}">
                                <span style="font-size:11px;font-weight:${cur.appearance===m.toLowerCase()?'600':'400'};color:#1d1d1f;line-height:1.2;margin:0;">${m}</span>
                            </div>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="set-section-header">Theme</div>
                <div class="set-section">
                    <div class="set-row" style="padding:14px 20px;justify-content:space-between;">
                        <span>Color</span>
                        <div style="display:flex;align-items:flex-start;gap:16px;">
                            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;">
                                <div style="width:24px;height:24px;border-radius:50%;background:conic-gradient(#ff3b30, #ff9500, #ffcc00, #34c759, #30b0c7, #0a84ff, #af52de, #ff2d55, #ff3b30);box-shadow:0 1px 2px rgba(0,0,0,0.1);"></div>
                                <span style="font-size:10px;color:#8e8e93;">Multicolor</span>
                            </div>
                            <div style="display:flex;gap:8px;align-items:center;margin-top:2px;">
                                ${[['blue','#0a84ff'],['purple','#af52de'],['pink','#ff2d55'],['red','#ff3b30'],['orange','#ff9500'],['yellow','#ffcc00'],['green','#34c759'],['gray','#8e8e93']].map(([c,bg],i) => `
                                <div onclick="MacSettings.applyAccentColor('${bg}');document.querySelectorAll('.accent-swatch').forEach(s=>s.style.boxShadow='0 1px 2px rgba(0,0,0,0.1)');this.style.boxShadow='0 0 0 2px #fff, 0 0 0 3.5px #0a84ff';"
                                     class="accent-swatch"
                                     style="width:20px;height:20px;border-radius:50%;background:${bg};cursor:pointer;box-shadow:${(c==='blue' && !cur.accentColor) || cur.accentColor===bg?`0 0 0 2px #fff, 0 0 0 3.5px #0a84ff`:'0 1px 2px rgba(0,0,0,0.1)'};transition:box-shadow 0.1s ease;"></div>`).join('')}
                            </div>
                        </div>
                    </div>
                    ${setRow('Text highlight color', `<div style="display:flex;align-items:center;gap:6px;"><div style="width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#af52de,#ff9500);"></div>${setSelect('Automatic')}</div>`)}
                    
                    <div class="set-row" style="padding:14px 20px;display:flex;align-items:center;justify-content:space-between;">
                        <span>Icon &amp; widget style</span>
                        <img src="images/settings/icon_&_widget_styles.png" style="height: 56px; object-fit: contain; cursor: pointer;" alt="Icon & Widget Styles">
                    </div>
                    ${setRow('Folder color', `<div style="display:flex;align-items:center;gap:6px;"><div style="width:14px;height:14px;border-radius:50%;background:#0a84ff;"></div>${setSelect('Automatic')}</div>`)}
                </div>

                <div class="set-section-header">Windows</div>
                <div class="set-section">
                    ${setRow('Sidebar icon size', setSelect('Medium'))}
                    ${setRow('Tint window background with wallpaper color', toggleHTML('t-tint-window', false))}
                </div>

                <div class="set-section">
                    <div class="set-row" style="flex-direction:column;align-items:flex-start;gap:12px;padding:14px 20px;border:none;">
                        <span style="font-weight:400;">Show scroll bars</span>
                        <div style="display:flex;flex-direction:column;gap:14px;">
                            ${['Automatically based on mouse or trackpad','When scrolling','Always'].map((opt,i) => `
                            <label style="display:flex;align-items:center;gap:10px;font-size:13px;color:#1d1d1f;cursor:pointer;">
                                <input type="radio" name="scrollbars" ${i===0?'checked':''} style="width:16px;height:16px">
                                ${opt}
                            </label>`).join('')}
                        </div>
                    </div>
                </div>
                
                </div>`;

                // Wire reduce motion toggle
                setTimeout(() => {
                    const rm = document.getElementById('t-reduce-motion');
                    if (rm) rm.addEventListener('click', () => MacSettings.setReduceMotion(rm.classList.contains('on')));
                    const rt = document.getElementById('t-reduce-trans');
                    if (rt) rt.addEventListener('click', () => MacSettings.setReduceTransparency(rt.classList.contains('on')));
                    const ns = document.getElementById('t-nightshift');
                    if (ns) ns.addEventListener('click', () => MacSettings.setNightShift(ns.classList.contains('on')));
                }, 100);
            } else if (view === 'displays') {
                titleEl.textContent = 'Displays';
                contentArea.innerHTML = `
                    <div style="display:flex; justify-content:center; align-items:flex-end; gap: 30px; padding: 40px 0 30px 0;">
                        <div style="display:flex; flex-direction:column; align-items:center; gap:12px; cursor:pointer;">
                            <div style="width: 80px; height: 140px; background: #fff; border: 4px solid #111; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); position:relative;">
                                <div style="position:absolute; bottom:-12px; left:50%; transform:translateX(-50%); width:40px; height:8px; background:#999; border-radius:2px;"></div>
                            </div>
                            <span style="font-size:12px; font-weight:600; color:#111;">Gechic M161H</span>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:12px; cursor:pointer;">
                            <div style="width: 140px; height: 90px; background: #fff; border: 4px solid #d1d1d6; border-radius: 8px 8px 0 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1); position:relative; border-bottom: 12px solid #b0b0b5;">
                                <div style="position:absolute; bottom:-12px; left:50%; transform:translateX(-50%); width:30px; height:3px; background:#666; border-radius:2px;"></div>
                            </div>
                            <span style="font-size:12px; font-weight:500; color:#555;">Built-in Display</span>
                        </div>
                    </div>
                    
                    <div style="display:flex; justify-content:center; margin-bottom: 24px;">
                        <button style="padding: 6px 14px; border-radius: 6px; border: 1px solid #d1d1d6; background: #fff; font-size: 13px; font-weight: 500; color:#111; cursor:pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">Arrange...</button>
                    </div>
                    
                    <div class="set-section">
                        <div class="set-row">
                            <span>Use as</span>
                            <div style="display:flex; align-items:center; gap: 8px; color:#666; font-weight:400;">
                                Extended display <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/></svg>
                            </div>
                        </div>
                    </div>

                    <div class="set-section-header">Brightness</div>
                    <div class="set-section">
                        <div class="set-row" style="padding:12px 16px; gap:12px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                            <input type="range" min="10" max="100" value="${window.MacSettings ? window.MacSettings.state.brightness : 100}" oninput="if(window.MacSettings) MacSettings.applyBrightness(+this.value);" style="flex:1;">
                        </div>
                        <div class="set-row">
                            <span>Night Shift</span>
                            <div id="t-nightshift-disp" class="set-toggle ${window.MacSettings && window.MacSettings.state.nightShift ? 'on' : ''}" style="background:${window.MacSettings && window.MacSettings.state.nightShift ? window.MacSettings.state.accentColor : '#e5e5ea'}">
                                <div class="toggle-track"></div><div class="toggle-knob"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="set-section-header">Display Resolution</div>
                    <div class="set-section">
                        <div class="set-row" style="padding:16px;">
                            <div style="display:flex; flex-direction:column; gap:8px; width:100%;">
                                <div style="display:flex; justify-content:space-between; font-size:12px;">
                                    <span>Larger Text</span>
                                    <span>More Space</span>
                                </div>
                                <input type="range" min="0.8" max="1.2" step="0.1" value="${document.documentElement.style.fontSize === '1.2px' ? 1.2 : document.documentElement.style.fontSize === '0.8px' ? 0.8 : 1}" oninput="document.documentElement.style.fontSize = this.value + 'px';" style="width:100%;">
                            </div>
                        </div>
                    </div>
                `;
                // Add event listener for Night Shift toggle
                setTimeout(() => {
                    const ns = document.getElementById('t-nightshift-disp');
                    if (ns && window.MacSettings) {
                        ns.addEventListener('click', () => {
                            ns.classList.toggle('on');
                            MacSettings.setNightShift(ns.classList.contains('on'));
                            ns.style.background = ns.classList.contains('on') ? MacSettings.state.accentColor : '#e5e5ea';
                        });
                    }
                }, 50);
            } else {
                titleEl.textContent = view.charAt(0).toUpperCase() + view.slice(1);
                contentArea.innerHTML = `<div style="padding: 40px; text-align: center; color: #999;">Select a setting on the left to configure.</div>`;
            }
        
        };

        // 5. Global Event Listeners & Interactions
        function handleItemClick(e, file) {
            e.stopPropagation();
            if (e.button === 2) return;
            if (e.metaKey || e.ctrlKey) { if (appState.selectedItemIds.has(file.id)) appState.selectedItemIds.delete(file.id); else appState.selectedItemIds.add(file.id); } 
            else { appState.selectedItemIds.clear(); appState.selectedItemIds.add(file.id); }
            renderFiles();
        }

        document.addEventListener('click', (e) => {
            const finderMenu = document.getElementById('finder-ctx-menu'); if (finderMenu) finderMenu.remove(); 
            const contextMenu = document.getElementById('context-menu');
            if(contextMenu) {
                contextMenu.classList.remove('active');
                contextMenu.style.display = 'none';
            }
        }, true);

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && appState.selectedItemIds.size === 1) {
                const promptBox = document.getElementById('custom-prompt');
                if (promptBox && !promptBox.classList.contains('active')) {
                    e.preventDefault();
                    window.toggleQuickLook();
                }
            }
        });

        // 6. DOM Content Loaded Initialization
        document.addEventListener('DOMContentLoaded', () => {
            MacSettings.applyAll();
            if (window.Finder) Finder.init();
            
            // Set up basic click off events
            const contentArea = document.getElementById('mac-content');
            if(contentArea) {
                contentArea.addEventListener('mousedown', (e) => { if (e.target === contentArea || e.target.classList.contains('icon-view-grid') || e.target.classList.contains('list-view-container')) { if (e.button !== 2) { appState.selectedItemIds.clear(); renderFiles(); } } });
                contentArea.addEventListener('contextmenu', (e) => { if (e.target === contentArea || e.target.classList.contains('icon-view-grid') || e.target.classList.contains('list-view-container')) { e.preventDefault(); appState.selectedItemIds.clear(); renderFiles(); e.stopPropagation(); showContextMenu(e, 'finder-bg'); } });
            }

            // Context Menu Setup
            document.getElementById('menu-copy').addEventListener('click', () => { if(appState.selectedItemIds.size > 0) { appState.clipboard.action = 'copy'; appState.clipboard.items = appState.files.filter(f => appState.selectedItemIds.has(f.id)); renderFiles(); }});
            document.getElementById('menu-cut').addEventListener('click', () => { if(appState.selectedItemIds.size > 0) { appState.clipboard.action = 'cut'; appState.clipboard.items = appState.files.filter(f => appState.selectedItemIds.has(f.id)); renderFiles(); }});
            document.getElementById('menu-paste').addEventListener('click', () => {
                if(appState.clipboard.items.length === 0) return;
                const currFolder = currentFolderId();
                appState.clipboard.items.forEach(item => {
                    if (appState.clipboard.action === 'cut') { const idx = appState.files.findIndex(f => f.id === item.id); if(idx > -1) appState.files[idx].parentId = currFolder; } 
                    else { appState.files.push({...item, id: generateId(), name: `${item.name} copy`, parentId: currFolder}); }
                });
                if (appState.clipboard.action === 'cut') appState.clipboard = { action: null, items: [] };
                renderFiles();
            });
            document.getElementById('menu-duplicate').addEventListener('click', () => {
                if(appState.selectedItemIds.size > 0) {
                    const currFolder = currentFolderId();
                    const toDup = appState.files.filter(f => appState.selectedItemIds.has(f.id));
                    toDup.forEach(item => { appState.files.push({...item, id: generateId(), name: `${item.name} copy`, parentId: currFolder}); });
                    renderFiles();
                }
            });
            document.getElementById('menu-delete').addEventListener('click', () => { 
                if(appState.selectedItemIds.size > 0) { 
                    appState.files = appState.files.filter(f => !appState.selectedItemIds.has(f.id)); 
                    appState.selectedItemIds.clear(); renderFiles(); 
                    const trashImg = document.querySelector('.dock-item img[alt="Bin"]');
                    if (trashImg) trashImg.src = 'https://s3-new.macosicons.com/macosicons/parse/Bin_Full_KtswXfzQ5b_lowResPng-87fdbf02da.png';
                }
            });
            document.getElementById('menu-open').addEventListener('click', () => { if(appState.selectedItemIds.size === 1) { const f = appState.files.find(f => f.id === Array.from(appState.selectedItemIds)[0]); if(f && f.type === 'folder') appState.navigateTo(f.id); }});
            document.getElementById('menu-quicklook').addEventListener('click', () => { window.toggleQuickLook(); });
            document.getElementById('menu-rename').addEventListener('click', () => {
                if(appState.selectedItemIds.size !== 1) return;
                const f = appState.files.find(f => f.id === Array.from(appState.selectedItemIds)[0]);
                const promptBox = document.getElementById('custom-prompt'), input = document.getElementById('prompt-input');
                if(!promptBox || !input) return;
                input.value = f.name; promptBox.classList.add('active'); input.focus(); input.select();
                document.getElementById('prompt-confirm').onclick = () => { const newName = input.value.trim(); if(newName) f.name = newName; appState.closeApp('custom-prompt'); renderFiles(); };
            });

            // Live Clock
            setInterval(() => {
                const clockEl = document.getElementById('clock');
                if(!clockEl) return;
                const now = new Date(), days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const h = now.getHours() % 12 || 12, m = now.getMinutes().toString().padStart(2, '0');
                clockEl.textContent = `${days[now.getDay()]} ${h}:${m} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
            }, 1000);

            // Battery Status Synchronization
            const updateBatteryUI = (level = 1, charging = false) => {
                const pct = Math.max(1, Math.min(100, Math.round(level * 100)));
                window._macBatteryLevel = pct;
                const topText = document.getElementById('topbar-battery-text');
                const topFill = document.getElementById('topbar-battery-fill');
                const lsText = document.getElementById('ls-battery-text');
                const lsFill = document.getElementById('ls-battery-fill');

                if (topText) topText.textContent = `${pct}%`;
                if (topFill) {
                    const fillW = Math.max(2, Math.round((pct / 100) * 14));
                    topFill.setAttribute('width', fillW);
                    topFill.setAttribute('fill', pct > 20 ? '#34c759' : '#ff3b30');
                }

                if (lsText) lsText.textContent = `${pct}%`;
                if (lsFill) {
                    const lsW = Math.max(2, Math.round((pct / 100) * 14));
                    lsFill.setAttribute('width', lsW);
                    lsFill.setAttribute('fill', pct > 20 ? '#34c759' : '#ff3b30');
                }
            };

            if (navigator.getBattery) {
                navigator.getBattery().then(battery => {
                    updateBatteryUI(battery.level, battery.charging);
                    battery.addEventListener('levelchange', () => updateBatteryUI(battery.level, battery.charging));
                    battery.addEventListener('chargingchange', () => updateBatteryUI(battery.level, battery.charging));
                }).catch(() => updateBatteryUI(1, false));
            } else {
                updateBatteryUI(1, false);
            }

            // Hardcoded Window Controls
            document.querySelectorAll('.mac-window').forEach(win => {
                const appId = win.id.replace('-window', '');
                const closeBtn = win.querySelector('.tl-close');
                const minBtn = win.querySelector('.tl-min');
                const maxBtn = win.querySelector('.tl-max');
                if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); appState.closeApp(appId); });
                if (minBtn) minBtn.addEventListener('click', (e) => { e.stopPropagation(); appState.closeApp(appId); });
                if (maxBtn) maxBtn.addEventListener('click', (e) => { e.stopPropagation(); win.classList.toggle('maximized'); });
                if (win.id !== 'custom-prompt') {
                    makeDraggable(win);
                    win.addEventListener('mousedown', () => { focusWindow(win); });
                }
            });

            // Dock Setup
            const dockApps = APP_DATA.filter(app => app.inDock);
            const dockPanel = document.getElementById('dockPanel'), dockStage = document.getElementById('dockStage');
            const islandSystem = document.getElementById('islandSystem'), dynamicIsland = document.getElementById('dynamicIsland');
            const islandContent = document.getElementById('islandContent'), islandIdle = document.getElementById('islandIdle');

            let mouseX = null;
            const CONFIG = { baseIconSize: 52, maxScale: 1.6, effectWidth: 260, minScale: 1.0, baseSpacing: 6, padding: 8, lerpFactorHover: 0.28, lerpFactorRest: 0.18 };
            
            function updateDockScale() {
                const availableWidth = window.innerWidth - 40; 
                const itemsCount = dockApps.length;
                const requiredSize = (availableWidth / itemsCount) - CONFIG.baseSpacing;
                CONFIG.baseIconSize = Math.max(16, Math.min(52, requiredSize)); 
            }
            window.addEventListener('resize', updateDockScale); 
            updateDockScale();

            let scales = dockApps.map(() => CONFIG.minScale), targetScales = [...scales], positions = [], targetPositions = [], itemElements = [];
            let islandTimeout, timerInterval, mediaInterval, currentIslandState = 'idle', activePersistentTask = null, activePersistentData = null;
            window.currentIslandState = currentIslandState;
            window.activePersistentTask = activePersistentTask;
            window.updateIslandState = function(s, t) { window.currentIslandState = s; window.activePersistentTask = t; };
            
            function openIsland(mode, data = {}) {
                if (!window.MacIsland) return;
                if (mode === 'media' || mode === 'nook') {
                    window.MacIsland.media(data.title || 'Unknown', data.artist || 'Unknown', true);
                } else if (mode === 'timer') {
                    window.MacIsland.timer('15:00');
                } else if (mode === 'auth') {
                    window.MacIsland.dispatch({ type: 'success', mode: 'compact', data: { message: 'Authenticated' }, duration: 2400 });
                    if (window.MacAudio) MacAudio.play('launch');
                } else {
                    window.MacIsland.dispatch({ type: 'notification', mode: 'compact', data: data });
                }
            }
            
            window.updateIslandIdle = function() {};
            function closeIsland() {
                if (window.MacIsland) window.MacIsland.dismiss();
            }

            function handleAppClick(app) {
                if (app.id === 'launchpad') { window.toggleLaunchpad(); return; }
                const launchpadEl = document.getElementById('launchpad');
                if (launchpadEl && launchpadEl.classList.contains('active')) window.toggleLaunchpad();
                
                currentIslandState = 'active'; window.updateIslandState(currentIslandState, activePersistentTask); 
                
                let mode = 'notification', data = { title: app.name, subtitle: 'Application opened', icon: app.icon };
                if (app.id === 'music' || app.id === 'spotify') { mode = 'nook'; data = { icon: app.icon, title: 'West End Blues', artist: 'Louis Armstrong and...' }; } 
                else if (app.id === 'youtube' || app.id === 'netflix') { mode = 'media'; data = { icon: app.icon, title: 'Midnight City', artist: 'M83' }; } 
                else if (app.id === 'finder' || app.id === 'trash') { mode = 'tray'; } 
                else if (app.id === 'calculator' || app.id === 'terminal') { mode = 'timer'; }
                else if (app.category === 'chat') { data = { title: app.name, subtitle: 'New message received', icon: app.icon }; }
                else if (app.id === 'safari' || app.id === 'chrome') { data = { title: 'Download Complete', subtitle: 'macOS_Sequoia.dmg', icon: app.icon }; } 
                else if (app.category === 'dev' || app.category === 'design') { data = { title: app.name, subtitle: 'Environment Ready', icon: app.icon }; } 
                else if (app.id === 'settings') { mode = 'auth'; }
                
                if (app.id === 'settings') {
                    openIsland(mode, data);
                    // Do not open app yet. Wait for auth to complete.
                    setTimeout(() => {
                        const targetWindow = document.getElementById(app.id + '-window');
                        if (targetWindow) { 
                            if (!targetWindow.classList.contains('active')) appState.openApp(app.id); 
                        } 
                        else { appState.openApp(app.id); }
                    }, 2000);
                } else {
                    const targetWindow = document.getElementById(app.id + '-window');
                    if (targetWindow) { 
                        if (targetWindow.classList.contains('active')) appState.closeApp(app.id); 
                        else appState.openApp(app.id); 
                    } 
                    else { appState.openApp(app.id); }
                    openIsland(mode, data);
                }
            }

            let activeDockMenu = null;
            function closeDockMenu() {
                const menu = document.getElementById('dock-context-menu');
                if(menu) { menu.classList.remove('active'); setTimeout(()=>menu.style.display='none', 200); }
                activeDockMenu = null;
            }
            document.addEventListener('click', closeDockMenu);
            
            function showDockMenu(app, itemElement, e) {
                const menu = document.getElementById('dock-context-menu');
                const itemsContainer = document.getElementById('dock-context-items');
                if(!menu || !itemsContainer) return;
                
                itemsContainer.innerHTML = '';
                
                // Add some dummy recent items for visual effect
                if (app.id === 'launchpad') {
                    itemsContainer.innerHTML += `<div class="dock-menu-item">Show Launchpad</div><div class="dock-menu-divider"></div><div class="dock-menu-item">Remove from Dock</div>`;
                } else if (app.id === 'safari') {
                    itemsContainer.innerHTML += `<div class="dock-menu-item">New Window</div><div class="dock-menu-item">New Private Window</div><div class="dock-menu-divider"></div><div class="dock-menu-item">Options</div><div class="dock-menu-item">Show All Windows</div><div class="dock-menu-divider"></div><div class="dock-menu-item">Hide</div><div class="dock-menu-item">Quit</div>`;
                } else {
                    itemsContainer.innerHTML += `<div class="dock-menu-item">Options</div><div class="dock-menu-item">Show All Windows</div><div class="dock-menu-divider"></div><div class="dock-menu-item">Hide</div><div class="dock-menu-item">Quit</div>`;
                }
                
                const rect = itemElement.getBoundingClientRect();
                menu.style.display = 'block';
                
                // Position menu above the dock item
                const menuRect = menu.getBoundingClientRect();
                let left = rect.left + (rect.width / 2) - (menuRect.width / 2);
                let top = rect.top - menuRect.height - 15;
                
                menu.style.left = `${left}px`;
                menu.style.top = `${top}px`;
                menu.classList.add('active');
                activeDockMenu = app.id;
            }

            if(dockStage) {
                dockApps.forEach((app, index) => {
                    const item = document.createElement('div'); item.className = 'dock-item'; item.id = 'dock-' + app.id;
                    const tooltip = document.createElement('div'); tooltip.className = 'dock-tooltip'; tooltip.textContent = app.name;
                    const img = document.createElement('img'); img.src = app.icon; img.alt = app.name; img.draggable = false;
                if (app.needsPadding) img.classList.add('needs-padding');
                    item.appendChild(tooltip); item.appendChild(img);
                    if (app.isOpen) { const dot = document.createElement('div'); dot.className = 'app-dot'; item.appendChild(dot); }
                    item.addEventListener('click', (e) => {
                        app.isOpen = true; item.classList.remove('bounce-anim'); void item.offsetWidth; item.classList.add('bounce-anim');
                        setTimeout(() => item.classList.remove('bounce-anim'), 500);
                        let dot = item.querySelector('.app-dot'); if (app.isOpen && !dot) { dot = document.createElement('div'); dot.className = 'app-dot'; item.appendChild(dot); } 
                        handleAppClick(app);
                    });
                    item.addEventListener('contextmenu', (e) => {
                        e.preventDefault(); e.stopPropagation();
                        showDockMenu(app, item, e);
                    });
                    dockStage.appendChild(item); itemElements.push(item);
                    if (app.id === 'trash') {
                        window.dockSeparator = document.createElement('div');
                        window.dockSeparator.className = 'dock-separator';
                        window.dockSeparator.style.position = 'absolute';
                        window.dockSeparator.style.bottom = '7px';
                        dockStage.appendChild(window.dockSeparator);
                    }
                });
            }

            
            // Control Center Toggle
            const ccToggle = document.getElementById('cc-toggle');
            const ccPanel = document.getElementById('control-center');
            if (ccToggle && ccPanel) {
                ccToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    ccPanel.classList.toggle('active');
                });
                
                // Close control center when clicking outside
                document.addEventListener('click', (e) => {
                    if (ccPanel.classList.contains('active') && !ccPanel.contains(e.target) && e.target !== ccToggle) {
                        ccPanel.classList.remove('active');
                    }
                });
            }

            const launchpadGrid = document.getElementById('launchpad-grid');
            const launchpadOverlay = document.getElementById('launchpad');
            
            function renderLaunchpad(searchQuery = '') {
                if(!launchpadGrid) return;
                launchpadGrid.innerHTML = ''; const query = searchQuery.toLowerCase();
                APP_DATA.filter(app => app.id !== 'finder' && app.id !== 'trash').forEach(app => {
                    if (query && !app.name.toLowerCase().includes(query)) return;
                    const item = document.createElement('div'); item.className = 'launchpad-item'; item.innerHTML = `<img src="${app.icon}" alt="${app.name}" ${app.needsPadding ? 'class="needs-padding"' : ''}><span>${app.name}</span>`;
                    item.onclick = () => {
                        app.isOpen = true; const dockItem = document.getElementById('dock-' + app.id);
                        if (dockItem && !dockItem.querySelector('.app-dot')) { const dot = document.createElement('div'); dot.className = 'app-dot'; dockItem.appendChild(dot); }
                        handleAppClick(app);
                    };
                    launchpadGrid.appendChild(item);
                });
            }
            
            window.toggleLaunchpad = function() { 
                if(!launchpadOverlay) return;
                launchpadOverlay.classList.toggle('active'); 
                if (launchpadOverlay.classList.contains('active')) { 
                    const searchEl = document.getElementById('launchpad-search');
                    if(searchEl) { searchEl.value = ''; setTimeout(() => searchEl.focus(), 100); }
                    renderLaunchpad(); 
                } 
            };
            window.filterLaunchpad = renderLaunchpad;

            if(dockPanel) {
                dockPanel.addEventListener('mousemove', (e) => { const rect = dockPanel.getBoundingClientRect(); const scaleX = rect.width / dockPanel.offsetWidth; if (scaleX > 0) mouseX = ((e.clientX - rect.left) / scaleX) - CONFIG.padding; });
                dockPanel.addEventListener('mouseleave', () => mouseX = null);
            }

            function animateDock() {
                if(!dockPanel) return;
                targetScales = (mouseX === null) ? dockApps.map(() => CONFIG.minScale) : dockApps.map((_, index) => {
                    const center = (index * (CONFIG.baseIconSize + CONFIG.baseSpacing)) + (CONFIG.baseIconSize / 2);
                    const minX = mouseX - (CONFIG.effectWidth / 2), maxX = mouseX + (CONFIG.effectWidth / 2);
                    if (center < minX || center > maxX) return CONFIG.minScale;
                    const theta = ((center - minX) / CONFIG.effectWidth) * 2 * Math.PI; return CONFIG.minScale + (((1 - Math.cos(Math.max(theta, 0))) / 2) * (CONFIG.maxScale - CONFIG.minScale));
                });
                let currentX = 0, totalWidth = 0, lerp = mouseX !== null ? CONFIG.lerpFactorHover : CONFIG.lerpFactorRest;
                targetPositions = targetScales.map((s, idx) => { 
                    if (dockApps[idx].id === 'trash') currentX += 20;
                    const cx = currentX + (CONFIG.baseIconSize * s) / 2; 
                    currentX += (CONFIG.baseIconSize * s) + CONFIG.baseSpacing; 
                    return cx; 
                });
                for (let i = 0; i < dockApps.length; i++) {
                    scales[i] += (targetScales[i] - scales[i]) * lerp; positions[i] = (positions[i] || targetPositions[i]) + ((targetPositions[i] - (positions[i] || targetPositions[i])) * lerp);
                    const size = CONFIG.baseIconSize * scales[i], left = positions[i] - (size / 2);
                    if (itemElements[i]) { itemElements[i].style.left = `${left}px`; itemElements[i].style.width = `${size}px`; itemElements[i].style.height = `${size}px`; itemElements[i].style.zIndex = Math.round(scales[i] * 10); }
                    totalWidth = Math.max(totalWidth, left + size);
                    if (dockApps[i].id === 'trash' && window.dockSeparator) {
                        window.dockSeparator.style.left = `${left - 13}px`;
                    }
                }
                dockPanel.style.width = `${totalWidth + CONFIG.padding * 2}px`;
                requestAnimationFrame(animateDock);
            }
            animateDock();

            // Initial Renders
            renderFiles();
            const lastSettingsView = localStorage.getItem('macSettingsLastView') || 'appearance';
            appState.setSettingsView(lastSettingsView);
            closeIsland(); // Force initial state execution to ensure default layout
            

            // Lock Screen logic
            const lockScreen = document.getElementById('lock-screen');
            const lockPassword = document.getElementById('lock-password');
            const unlockBtn = document.getElementById('unlock-btn');
            const touchIdBtn = document.getElementById('touch-id-btn');

            let isAuthenticating = false;
            window.authenticateFaceID = async function() {
                if (isAuthenticating) return;
                isAuthenticating = true;
                
                try {
                    if (window.MacIsland && window.MacIsland.dispatch) {
                        window.MacIsland.dispatch({
                            type: 'auth',
                            mode: 'expanded',
                            data: { title: 'Face ID' },
                            autoDismiss: false,
                            persistent: true
                        });

                        // Start scanning sequence
                        await new Promise(r => setTimeout(r, 1100));

                        const faceGroup = document.getElementById('island-face-group');
                        const tickGroup = document.getElementById('island-tick-group');
                        const circleAnim = document.getElementById('island-circle-anim');
                        const checkAnim = document.getElementById('island-check-anim');
                        const authLabel = document.getElementById('island-auth-label');

                        if (faceGroup) {
                            faceGroup.classList.remove('scanning-pulse');
                            faceGroup.style.transform = 'scale(0.6)';
                            faceGroup.style.opacity = '0';
                        }

                        await new Promise(r => setTimeout(r, 300));
                        if (faceGroup) faceGroup.style.display = 'none';
                        if (tickGroup) {
                            tickGroup.style.display = 'block';
                            void tickGroup.offsetWidth;
                            tickGroup.style.opacity = '1';
                            tickGroup.style.transform = 'scale(1)';
                        }
                        if (circleAnim) circleAnim.style.animation = 'drawCircle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                        if (checkAnim) checkAnim.style.animation = 'drawCheck 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.15s';
                        if (authLabel) {
                            authLabel.style.color = '#32D74B';
                            authLabel.textContent = 'Unlocked';
                        }

                        await new Promise(r => setTimeout(r, 700));
                        window.MacIsland.dismiss();
                    }
                    
                    unlock('', true);
                } catch (err) {
                    console.error('Face ID auth error:', err);
                    unlock('', true);
                } finally {
                    isAuthenticating = false;
                }
            };
            window.authenticateTouchID = window.authenticateFaceID;

            function unlock(pwdAttempt = '', force = false) {
                const ls = document.getElementById('lock-screen');
                if (!ls) return;
                
                // Check password if not a biometric bypass and password is required
                if (!force && window.MacSettings && !window.MacSettings.checkPassword(pwdAttempt || '')) {
                    const inp = document.getElementById('lock-password');
                    if (inp) { 
                        inp.style.border = '1.5px solid #ff3b30'; 
                        inp.value = ''; 
                        inp.placeholder = 'Incorrect password'; 
                    }
                    setTimeout(() => { 
                        if (inp) { 
                            inp.style.border = ''; 
                            inp.placeholder = 'Enter Password'; 
                        }
                    }, 1500);
                    return;
                }
                
                if (window.MacAudio) MacAudio.play('unlock');
                ls.style.pointerEvents = 'none';
                ls.style.transform = 'translateY(-30px)';
                ls.style.opacity = '0';
                setTimeout(() => { 
                    ls.style.display = 'none'; 
                }, 600);
            }
            window.unlock = unlock;

            if (lockScreen) {
                if (unlockBtn) unlockBtn.addEventListener('click', () => unlock(lockPassword ? lockPassword.value : ''));
                if (touchIdBtn) touchIdBtn.addEventListener('click', () => unlock(lockPassword ? lockPassword.value : ''));
                if (lockPassword) {
                    lockPassword.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') unlock(lockPassword.value);
                    });
                }
            }

        });


// --- Lock Screen Clock Updater ---
function updateLockScreenClock() {
    const now = new Date();
    const lsTime = document.getElementById('ls-time');
    const lsDate = document.getElementById('ls-date');
    const lsTopTime = document.getElementById('ls-top-time');
    
    let h = now.getHours();
    let m = now.getMinutes();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    m = m < 10 ? '0' + m : m;
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (lsTime) lsTime.textContent = h + ':' + m;
    if (lsTopTime) lsTopTime.textContent = h + ':' + m + ' ' + ampm;
    if (lsDate) {
        lsDate.textContent = days[now.getDay()] + ', ' + now.getDate() + ' ' + months[now.getMonth()];
    }
}
setInterval(updateLockScreenClock, 1000);
updateLockScreenClock();

window.showPasswordInput = function() {
    const promptText = document.getElementById('ls-prompt-text');
    const pwdBox = document.getElementById('ls-pwd-container');
    const inp = document.getElementById('lock-password');
    if (promptText) promptText.style.display = 'none';
    if (pwdBox) pwdBox.style.display = 'flex';
    if (inp) {
        inp.focus();
    }
};

document.addEventListener('keydown', (e) => {
    const lockScreen = document.getElementById('lock-screen');
    if (!lockScreen || lockScreen.style.display === 'none' || lockScreen.style.opacity === '0') return;
    if (e.key === 'Tab' || e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') return;
    if (e.key === 'Escape') {
        const promptText = document.getElementById('ls-prompt-text');
        const pwdBox = document.getElementById('ls-pwd-container');
        const inp = document.getElementById('lock-password');
        if (pwdBox && pwdBox.style.display !== 'none') {
            if (inp) inp.value = '';
            pwdBox.style.display = 'none';
            if (promptText) promptText.style.display = 'block';
        }
        return;
    }
    showPasswordInput();
});


// --- macOS Moveable Desktop Icons & Selection Engine ---
const DesktopIcons = {
    storageKey: 'macos_desktop_icon_positions_v1',
    isDragging: false,
    dragThreshold: 3,

    init() {
        if (this._initialized) return;
        this._initialized = true;

        const container = document.getElementById('desktop-icons-container');
        if (!container) return;

        this.applySavedOrInitialPositions();
        this.bindEvents();

        window.addEventListener('resize', () => {
            this.keepWithinBounds();
        });
    },

    getIconElements() {
        return Array.from(document.querySelectorAll('.desktop-item'));
    },

    applySavedOrInitialPositions() {
        const items = this.getIconElements();
        if (!items.length) return;
        let savedPositions = {};
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (raw) savedPositions = JSON.parse(raw);
        } catch (e) {
            savedPositions = {};
        }

        const startTop = 46;
        const itemHeight = 96;
        const defaultRight = 24;
        const itemWidth = 86;
        const colGap = 16;
        
        let screenW = window.innerWidth || document.documentElement.clientWidth;
        let screenH = window.innerHeight || document.documentElement.clientHeight;
        if (screenW < 300) screenW = 1280; // Fallback if still loading
        if (screenH < 300) screenH = 800;
        
        const maxRows = Math.max(1, Math.floor((screenH - 120) / itemHeight));

        const usedPositions = [];

        items.forEach((item, index) => {
            const id = item.getAttribute('data-id') || ('desktop-item-' + index);
            item.style.right = 'auto';
            
            // Check if saved position is valid and not part of the top-left stacking bug
            let isValidSaved = false;
            if (savedPositions[id] && typeof savedPositions[id].left === 'number' && typeof savedPositions[id].top === 'number') {
                if (savedPositions[id].left > 15 && savedPositions[id].top > 15) {
                    isValidSaved = true;
                }
            }

            let left, top;
            if (isValidSaved) {
                left = savedPositions[id].left;
                top = savedPositions[id].top;
                left = Math.max(10, Math.min(screenW - itemWidth - 10, left));
                top = Math.max(34, Math.min(screenH - 100, top));

                // If this position collides with an already placed item, unstack it
                const isColliding = usedPositions.some(p => Math.hypot(p.left - left, p.top - top) < 40);
                if (isColliding) {
                    const col = Math.floor(index / maxRows);
                    const row = index % maxRows;
                    left = Math.max(10, screenW - defaultRight - itemWidth - col * (itemWidth + colGap));
                    top = Math.max(34, startTop + row * itemHeight);
                }
            } else {
                const col = Math.floor(index / maxRows);
                const row = index % maxRows;
                left = Math.max(10, screenW - defaultRight - itemWidth - col * (itemWidth + colGap));
                top = Math.max(34, startTop + row * itemHeight);
            }

            usedPositions.push({ left, top });
            item.style.left = `${left}px`;
            item.style.top = `${top}px`;
        });
        
        // Save immediately to overwrite bad layout
        this.savePositions();
    },

    savePositions() {
        const items = this.getIconElements();
        const positions = {};
        items.forEach((item, index) => {
            const id = item.getAttribute('data-id') || ('desktop-item-' + index);
            positions[id] = {
                left: parseFloat(item.style.left) || 0,
                top: parseFloat(item.style.top) || 0
            };
        });
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(positions));
        } catch (e) {}
    },

    keepWithinBounds() {
        const items = this.getIconElements();
        const itemWidth = 86;
        const itemHeight = 90;
        let modified = false;

        let screenW = window.innerWidth || document.documentElement.clientWidth;
        let screenH = window.innerHeight || document.documentElement.clientHeight;

        items.forEach(item => {
            const currLeft = parseFloat(item.style.left) || 0;
            const currTop = parseFloat(item.style.top) || 0;
            if (currLeft === 0 && currTop === 0) return; 
            const clampedLeft = Math.max(10, Math.min(screenW - itemWidth - 10, currLeft));
            const clampedTop = Math.max(34, Math.min(screenH - itemHeight - 75, currTop));
            if (Math.abs(clampedLeft - currLeft) > 1 || Math.abs(clampedTop - currTop) > 1) {
                item.style.left = `${clampedLeft}px`;
                item.style.top = `${clampedTop}px`;
                item.style.right = 'auto';
                modified = true;
            }
        });

        if (modified) {
            this.savePositions();
        }
    },

    bindEvents() {
        if (this._eventsBound) return;
        this._eventsBound = true;
        
        const container = document.getElementById('desktop-icons-container');
        const desktop = document.getElementById('macos-container') || document.body;
        const selBox = document.getElementById('selection-box');
        if (!container || !desktop) return;

        // Prevent native browser image ghost drag
        document.addEventListener('dragstart', (e) => {
            if (e.target.closest('.desktop-item') || e.target.closest('#desktop-icons-container')) {
                e.preventDefault();
            }
        });

        let activeDrag = null;

        const startItemDrag = (e, item) => {
            // If right click, select item and let context menu open
            if (e.button === 2) {
                if (!item.classList.contains('selected')) {
                    if (!e.shiftKey && !e.metaKey && !e.ctrlKey) {
                        document.querySelectorAll('.desktop-item').forEach(i => i.classList.remove('selected'));
                    }
                    item.classList.add('selected');
                }
                return;
            }

            if (e.type !== 'touchstart' && e.button !== 0) return;

            e.stopPropagation();

            const isMultiSelect = e.shiftKey || e.metaKey || e.ctrlKey;
            if (!isMultiSelect && !item.classList.contains('selected')) {
                document.querySelectorAll('.desktop-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
            } else if (isMultiSelect) {
                item.classList.toggle('selected');
                if (!item.classList.contains('selected')) return;
            }

            const selectedItems = Array.from(document.querySelectorAll('.desktop-item.selected'));
            if (selectedItems.length === 0) {
                item.classList.add('selected');
                selectedItems.push(item);
            }

            const startPositions = selectedItems.map(el => {
                const rect = el.getBoundingClientRect();
                el.style.right = 'auto';
                el.style.left = `${rect.left}px`;
                el.style.top = `${rect.top}px`;
                return {
                    el,
                    startLeft: rect.left,
                    startTop: rect.top
                };
            });

            const clientX = e.clientX ?? (e.touches && e.touches.length > 0 ? e.touches[0].clientX : 0);
            const clientY = e.clientY ?? (e.touches && e.touches.length > 0 ? e.touches[0].clientY : 0);

            activeDrag = {
                startX: clientX,
                startY: clientY,
                items: startPositions,
                hasMoved: false,
                targetItem: item
            };

            const onMove = (moveEvt) => {
                if (!activeDrag) return;
                const curX = moveEvt.clientX ?? (moveEvt.touches && moveEvt.touches.length > 0 ? moveEvt.touches[0].clientX : activeDrag.startX);
                const curY = moveEvt.clientY ?? (moveEvt.touches && moveEvt.touches.length > 0 ? moveEvt.touches[0].clientY : activeDrag.startY);
                const dx = curX - activeDrag.startX;
                const dy = curY - activeDrag.startY;

                if (!activeDrag.hasMoved && Math.hypot(dx, dy) > 2) {
                    activeDrag.hasMoved = true;
                    DesktopIcons.isDragging = true;
                    activeDrag.items.forEach(it => it.el.classList.add('is-dragging'));
                }

                if (activeDrag.hasMoved) {
                    if (moveEvt.cancelable) moveEvt.preventDefault();
                    let screenW = window.innerWidth || document.documentElement.clientWidth;
                    let screenH = window.innerHeight || document.documentElement.clientHeight;
                    activeDrag.items.forEach(it => {
                        const newLeft = Math.max(10, Math.min(screenW - it.el.offsetWidth - 10, it.startLeft + dx));
                        const newTop = Math.max(34, Math.min(screenH - it.el.offsetHeight - 75, it.startTop + dy));
                        it.el.style.left = `${newLeft}px`;
                        it.el.style.top = `${newTop}px`;
                        it.el.style.right = 'auto';
                    });
                }
            };

            const onEnd = () => {
                if (!activeDrag) return;
                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('pointerup', onEnd);
                window.removeEventListener('pointercancel', onEnd);
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', onEnd);
                window.removeEventListener('touchmove', onMove);
                window.removeEventListener('touchend', onEnd);

                if (activeDrag.hasMoved) {
                    activeDrag.items.forEach(it => it.el.classList.remove('is-dragging'));
                    activeDrag.targetItem._draggedTime = Date.now();
                    DesktopIcons.savePositions();
                }

                setTimeout(() => {
                    DesktopIcons.isDragging = false;
                    activeDrag = null;
                }, 60);
            };

            window.addEventListener('pointermove', onMove, { passive: false });
            window.addEventListener('pointerup', onEnd);
            window.addEventListener('pointercancel', onEnd);
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onEnd);
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('touchend', onEnd);
        };

        // Document-level delegation for 100% reliable grab detection
        document.addEventListener('pointerdown', (e) => {
            const item = e.target.closest('.desktop-item');
            if (item) {
                startItemDrag(e, item);
            }
        });
        document.addEventListener('mousedown', (e) => {
            const item = e.target.closest('.desktop-item');
            if (item && !activeDrag) {
                startItemDrag(e, item);
            }
        });

        // Double click to open folder in Finder
        container.addEventListener('dblclick', (e) => {
            const item = e.target.closest('.desktop-item');
            if (!item) return;
            if (item._draggedTime && (Date.now() - item._draggedTime < 450)) return;

            const target = item.getAttribute('data-target') || 'root';
            if (window.appState && appState.openApp) {
                appState.openApp('finder', item);
                setTimeout(() => {
                    if (window.Finder && Finder.navigateTo) {
                        Finder.navigateTo(target);
                    } else if (appState.navigateTo) {
                        appState.navigateTo(target);
                    }
                }, 40);
            }
        });

        // Rubber-band marquee selection on empty desktop
        if (selBox) {
            let isSelecting = false;
            let startX = 0, startY = 0;

            desktop.addEventListener('pointerdown', (e) => {
                if (e.target.closest('.desktop-item') || e.target.closest('.mac-window') || e.target.closest('.dock-wrapper') || e.target.closest('.macos-topbar') || e.target.closest('.mac-widget') || e.target.closest('.mac-control-center') || e.target.closest('#lock-screen') || e.target.closest('.context-menu')) {
                    return;
                }
                if (e.button !== 0) return;

                isSelecting = true;
                startX = e.clientX;
                startY = e.clientY;
                selBox.style.display = 'block';
                selBox.style.left = startX + 'px';
                selBox.style.top = startY + 'px';
                selBox.style.width = '0px';
                selBox.style.height = '0px';

                if (!e.shiftKey && !e.metaKey && !e.ctrlKey) {
                    document.querySelectorAll('.desktop-item').forEach(i => i.classList.remove('selected'));
                }

                const onSelectionMove = (moveEvt) => {
                    if (!isSelecting) return;
                    const curX = moveEvt.clientX;
                    const curY = moveEvt.clientY;
                    const left = Math.min(startX, curX);
                    const top = Math.min(startY, curY);
                    const width = Math.abs(curX - startX);
                    const height = Math.abs(curY - startY);

                    selBox.style.left = `${left}px`;
                    selBox.style.top = `${top}px`;
                    selBox.style.width = `${width}px`;
                    selBox.style.height = `${height}px`;

                    const boxRect = selBox.getBoundingClientRect();
                    document.querySelectorAll('.desktop-item').forEach(it => {
                        const ir = it.getBoundingClientRect();
                        const intersects = !(boxRect.right < ir.left || boxRect.left > ir.right || boxRect.bottom < ir.top || boxRect.top > ir.bottom);
                        if (intersects) {
                            it.classList.add('selected');
                        } else if (!e.shiftKey && !e.metaKey && !e.ctrlKey) {
                            it.classList.remove('selected');
                        }
                    });
                };

                const onSelectionUp = () => {
                    isSelecting = false;
                    selBox.style.display = 'none';
                    window.removeEventListener('pointermove', onSelectionMove);
                    window.removeEventListener('pointerup', onSelectionUp);
                    window.removeEventListener('pointercancel', onSelectionUp);
                };

                window.addEventListener('pointermove', onSelectionMove);
                window.addEventListener('pointerup', onSelectionUp);
                window.addEventListener('pointercancel', onSelectionUp);
            });
        }
    },

    cleanUp() {
        const items = this.getIconElements();
        if (!items || !items.length) return;
        const startTop = 46;
        const itemHeight = 96;
        const itemWidth = 86;
        const defaultRight = 24;
        const colGap = 16;
        const maxRows = Math.max(1, Math.floor((window.innerHeight - 120) / itemHeight));

        items.forEach((item, index) => {
            const col = Math.floor(index / maxRows);
            const row = index % maxRows;
            const left = Math.max(10, window.innerWidth - defaultRight - itemWidth - col * (itemWidth + colGap));
            const top = Math.max(34, startTop + row * itemHeight);

            item.style.transition = 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1), top 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            item.style.left = `${left}px`;
            item.style.top = `${top}px`;
            item.style.right = 'auto';
            setTimeout(() => {
                item.style.transition = '';
            }, 400);
        });

        setTimeout(() => {
            this.savePositions();
        }, 450);

        if (window.MacAudio) MacAudio.play('paper');
    },

    sortBy(criteria = 'name') {
        const container = document.getElementById('desktop-icons-container');
        if (!container) return;
        let items = this.getIconElements();
        
        items.sort((a, b) => {
            const nameA = (a.querySelector('span')?.textContent || a.getAttribute('data-id') || '').trim().toLowerCase();
            const nameB = (b.querySelector('span')?.textContent || b.getAttribute('data-id') || '').trim().toLowerCase();
            if (criteria === 'name') {
                return nameA.localeCompare(nameB);
            } else if (criteria === 'kind') {
                const isFolderA = a.querySelector('img')?.src.toLowerCase().includes('folder') ? 0 : 1;
                const isFolderB = b.querySelector('img')?.src.toLowerCase().includes('folder') ? 0 : 1;
                return isFolderA - isFolderB || nameA.localeCompare(nameB);
            }
            return 0;
        });

        items.forEach(it => container.appendChild(it));
        this.cleanUp();
    }
};

window.DesktopIcons = DesktopIcons;

if (document.readyState !== 'loading') {
    setTimeout(() => DesktopIcons.init(), 100);
} else {
    window.addEventListener('load', () => {
        setTimeout(() => DesktopIcons.init(), 100);
    });
}

// --- macOS Dynamic Menu Bar System ---

const MenuData = {
    apple: [
        { label: "About This Mac", action: "aboutMac" },
        { divider: true },
        { label: "System Settings...", action: "openSettings" },
        { label: "App Store...", action: "noop" },
        { divider: true },
        { label: "Recent Items", action: "noop" },
        { divider: true },
        { label: "Force Quit...", shortcut: "⌥⌘⎋", action: "noop" },
        { divider: true },
        { label: "Sleep", action: "sleepMac" },
        { label: "Restart...", action: "restartMac" },
        { label: "Shut Down...", action: "shutdownMac" },
        { divider: true },
        { label: "Lock Screen", shortcut: "⌃⌘Q", action: "lockScreen" },
        { label: "Log Out...", shortcut: "⇧⌘Q", action: "lockScreen" }
    ],
    finder: {
        appName: "Finder",
        menus: {
            "File": [
                { label: "New Finder Window", shortcut: "⌘N", action: "noop" },
                { label: "New Folder", shortcut: "⇧⌘N", action: "newFolder" },
                { label: "New Folder with Selection", action: "noop", enabled: false },
                { label: "New Smart Folder", action: "noop" },
                { label: "New Tab", shortcut: "⌘T", action: "noop" },
                { label: "Open", shortcut: "⌘↓", action: "noop" },
                { label: "Open With", action: "noop" },
                { label: "Close Window", shortcut: "⌘W", action: "closeWindow" },
                { divider: true },
                { label: "Get Info", shortcut: "⌘I", action: "noop" },
                { label: "Rename", action: "noop" },
                { label: "Compress", action: "noop" },
                { label: "Duplicate", shortcut: "⌘D", action: "noop" },
                { label: "Make Alias", action: "noop" },
                { label: "Quick Look", shortcut: "Space", action: "noop" },
                { label: "Print", shortcut: "⌘P", action: "noop" },
                { divider: true },
                { label: "Move to Trash", shortcut: "⌘⌫", action: "noop" }
            ],
            "Edit": [
                { label: "Undo", shortcut: "⌘Z", action: "noop" },
                { label: "Redo", shortcut: "⇧⌘Z", action: "noop" },
                { divider: true },
                { label: "Cut", shortcut: "⌘X", action: "noop" },
                { label: "Copy", shortcut: "⌘C", action: "noop" },
                { label: "Paste", shortcut: "⌘V", action: "noop" },
                { label: "Select All", shortcut: "⌘A", action: "noop" },
                { divider: true },
                { label: "Show Clipboard", action: "noop" },
                { divider: true },
                { label: "Find", shortcut: "⌘F", action: "noop" }
            ],
            "View": [
                { label: "as Icons", shortcut: "⌘1", action: "noop" },
                { label: "as List", shortcut: "⌘2", action: "noop" },
                { label: "as Columns", shortcut: "⌘3", action: "noop" },
                { label: "as Gallery", shortcut: "⌘4", action: "noop" },
                { divider: true },
                { label: "Use Groups", action: "noop" },
                { label: "Sort By", action: "noop" },
                { label: "Clean Up", action: "noop" },
                { label: "Clean Up By", action: "noop" },
                { divider: true },
                { label: "Show Tab Bar", action: "noop" },
                { label: "Show Path Bar", action: "noop" },
                { label: "Show Status Bar", action: "noop" },
                { label: "Show Sidebar", shortcut: "⌥⌘S", action: "noop" },
                { label: "Show Preview", action: "noop" },
                { divider: true },
                { label: "Enter Full Screen", action: "noop" },
                { label: "Show View Options", shortcut: "⌘J", action: "noop" }
            ],
            "Go": [
                { label: "Back", shortcut: "⌘[", action: "noop" },
                { label: "Forward", shortcut: "⌘]", action: "noop" },
                { label: "Enclosing Folder", shortcut: "⌘↑", action: "noop" },
                { divider: true },
                { label: "Recents", action: "noop" },
                { label: "Documents", action: "noop" },
                { label: "Desktop", shortcut: "⇧⌘D", action: "noop" },
                { label: "Downloads", shortcut: "⌥⌘L", action: "noop" },
                { label: "Home", shortcut: "⇧⌘H", action: "noop" },
                { label: "Computer", shortcut: "⇧⌘C", action: "noop" },
                { label: "AirDrop", shortcut: "⇧⌘R", action: "noop" },
                { label: "Network", shortcut: "⇧⌘K", action: "noop" },
                { divider: true },
                { label: "Applications", shortcut: "⇧⌘A", action: "noop" },
                { label: "Utilities", action: "noop" },
                { divider: true },
                { label: "Recent Folders", action: "noop" },
                { divider: true },
                { label: "Go to Folder...", shortcut: "⇧⌘G", action: "noop" },
                { label: "Connect to Server...", shortcut: "⌘K", action: "noop" }
            ],
            "Window": [
                { label: "Minimize", shortcut: "⌘M", action: "noop" },
                { label: "Zoom", action: "noop" },
                { label: "Move & Resize", action: "noop" },
                { divider: true },
                { label: "Cycle Through Windows", shortcut: "⌘`", action: "noop" },
                { label: "Show Previous Tab", action: "noop" },
                { label: "Show Next Tab", shortcut: "⌃Tab", action: "noop" },
                { label: "Move Tab to New Window", action: "noop" },
                { label: "Merge All Windows", action: "noop" },
                { divider: true },
                { label: "Bring All to Front", action: "noop" }
            ],
            "Help": [
                { label: "Search", action: "noop" },
                { label: "macOS Help", action: "noop" },
                { label: "Finder Help", action: "noop" },
                { divider: true },
                { label: "Keyboard Shortcuts", action: "noop" },
                { label: "Work with Files and Folders", action: "noop" },
                { label: "Organize Files with Tags", action: "noop" },
                { label: "Manage and Delete Files", action: "noop" },
                { label: "Set Finder Preferences", action: "noop" }
            ]
        }
    },
    settings: {
        appName: "System Settings",
        menus: {
            "File": [
                { label: "Close", shortcut: "⌘W", action: "closeWindow" }
            ],
            "Edit": [
                { label: "Undo", shortcut: "⌘Z", action: "noop" },
                { label: "Redo", shortcut: "⇧⌘Z", action: "noop" },
                { divider: true },
                { label: "Cut", shortcut: "⌘X", action: "noop" },
                { label: "Copy", shortcut: "⌘C", action: "noop" },
                { label: "Paste", shortcut: "⌘V", action: "noop" },
                { label: "Select All", shortcut: "⌘A", action: "noop" }
            ],
            "View": [
                { label: "Show All", action: "noop" }
            ],
            "Window": [
                { label: "Minimize", shortcut: "⌘M", action: "noop" },
                { label: "Zoom", action: "noop" }
            ],
            "Help": [
                { label: "System Settings Help", action: "noop" }
            ]
        },
        appMenuExt: [
            { label: "About System Settings", action: "noop" },
            { divider: true },
            { label: "Settings...", shortcut: "⌘,", action: "openSettings" },
            { divider: true },
            { label: "Services", action: "noop" },
            { divider: true },
            { label: "Hide System Settings", shortcut: "⌘H", action: "noop" },
            { label: "Hide Others", shortcut: "⌥⌘H", action: "noop" },
            { label: "Show All", action: "noop" },
            { divider: true },
            { label: "Quit System Settings", shortcut: "⌘Q", action: "closeWindow" }
        ]
    }
};

const MenuSystem = {
    activeApp: 'finder',
    activeMenuId: null,
    
    init() {
        this.renderTopbar();
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#topbar-left-menus') && !e.target.closest('.mac-dropdown-menu')) {
                this.closeMenus();
            }
        });
        
        // Listen for window changes
        window.addEventListener('mousedown', (e) => {
            const win = e.target.closest('.mac-window');
            if (win) {
                if (win.id === 'finder-window') this.setActiveApp('finder');
                if (win.id === 'settings-window') this.setActiveApp('settings');
            } else if (e.target.closest('.desktop-icons') || e.target.closest('.macos-body')) {
                this.setActiveApp('finder');
            }
        });
    },

    setActiveApp(appId) {
        if (this.activeApp !== appId) {
            this.activeApp = appId;
            this.renderTopbar();
            this.closeMenus();
        }
    },

    renderTopbar() {
        const topbarContainer = document.getElementById('topbar-left-menus');
        if (!topbarContainer) return;
        
        let html = '';
        
        // Apple Logo
        html += `<span data-menu-id="apple" class="topbar-item" style="display:flex;align-items:center;"><svg viewBox="0 0 384 512" width="13" height="17" fill="white"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg></span>`;
        
        const appData = MenuData[this.activeApp];
        if (appData) {
            html += `<span data-menu-id="appname" class="topbar-item" style="font-weight: 700;">${appData.appName}</span>`;
            
            for (const menuName in appData.menus) {
                html += `<span data-menu-id="${menuName}" class="topbar-item">${menuName}</span>`;
            }
        }
        
        topbarContainer.innerHTML = html;
        
        // Attach events
        const items = topbarContainer.querySelectorAll('.topbar-item');
        items.forEach(item => {
            item.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                const menuId = item.getAttribute('data-menu-id');
                if (this.activeMenuId === menuId) {
                    this.closeMenus();
                } else {
                    this.openMenu(menuId, item);
                }
            });
            item.addEventListener('mouseenter', (e) => {
                if (this.activeMenuId && this.activeMenuId !== item.getAttribute('data-menu-id')) {
                    this.openMenu(item.getAttribute('data-menu-id'), item);
                }
            });
        });
    },

    openMenu(menuId, triggerElement) {
        this.closeMenus();
        this.activeMenuId = menuId;
        triggerElement.classList.add('active');
        
        const dropdownContainer = document.getElementById('dropdown-menus-container');
        if (!dropdownContainer) return;
        
        let menuItems = [];
        if (menuId === 'apple') {
            menuItems = MenuData.apple;
        } else if (menuId === 'appname') {
            const appData = MenuData[this.activeApp];
            if (appData && appData.appMenuExt) {
                menuItems = appData.appMenuExt;
            } else {
                // Default app menu
                menuItems = [
                    { label: `About ${appData.appName}`, action: "noop" },
                    { divider: true },
                    { label: "Settings...", shortcut: "⌘,", action: "noop" },
                    { divider: true },
                    { label: `Quit ${appData.appName}`, shortcut: "⌘Q", action: "closeWindow" }
                ];
            }
        } else {
            const appData = MenuData[this.activeApp];
            if (appData && appData.menus[menuId]) {
                menuItems = appData.menus[menuId];
            }
        }
        
        let html = `<div class="mac-dropdown-menu active" style="left: ${triggerElement.offsetLeft}px;">`;
        menuItems.forEach(item => {
            if (item.divider) {
                html += `<div class="mac-menu-divider"></div>`;
            } else {
                const disabledCls = item.enabled === false ? 'disabled' : '';
                const shortcutHtml = item.shortcut ? `<span class="mac-menu-shortcut">${item.shortcut}</span>` : '';
                html += `<div class="mac-menu-item ${disabledCls}" onclick="MenuSystem.handleAction('${item.action}')">
                    <span>${item.label}</span>
                    ${shortcutHtml}
                </div>`;
            }
        });
        html += `</div>`;
        
        dropdownContainer.innerHTML = html;
    },

    closeMenus() {
        this.activeMenuId = null;
        document.querySelectorAll('.topbar-item.active').forEach(el => el.classList.remove('active'));
        const dropdownContainer = document.getElementById('dropdown-menus-container');
        if (dropdownContainer) dropdownContainer.innerHTML = '';
    },

    handleAction(action) {
        this.closeMenus();
        if (action === 'noop') return;
        
        if (action === 'lockScreen') {
            if (typeof unlock === 'function') unlock();
            const ls = document.getElementById('lock-screen');
            if(ls) {
                ls.style.display = 'flex';
                setTimeout(() => {
                    ls.style.opacity = '1';
                    ls.style.transform = 'translateY(0)';
                    ls.style.pointerEvents = 'auto';
                }, 10);
            }
        } else if (['sleepMac', 'restartMac', 'shutdownMac', 'logoutMac'].includes(action)) {
            window.SystemActions.trigger(action);
        } else if (action === 'closeWindow') {
            if (this.activeApp === 'finder') {
                const closeBtn = document.getElementById('finder-close');
                if (closeBtn) closeBtn.click();
            } else if (this.activeApp === 'settings') {
                const closeBtn = document.getElementById('settings-close');
                if (closeBtn) closeBtn.click();
            }
        } else if (action === 'openSettings') {
            if (window.appState && window.appState.openApp) {
                window.appState.openApp('settings');
            }
        } else if (action === 'newFolder') {
             window.dispatchEvent(new CustomEvent('finder-new-folder'));
        } else if (action === 'cleanUp' || action === 'cleanUpBy') {
            if (window.DesktopIcons) DesktopIcons.cleanUp();
        } else if (action === 'sortByName') {
            if (window.DesktopIcons) DesktopIcons.sortByName();
        }
    }
};

window.SystemActions = {
    overlay: null,
    spinner: null,
    bootContainer: null,
    bootProgress: null,
    
    init() {
        this.overlay = document.getElementById('system-overlay');
        this.spinner = document.getElementById('system-spinner');
        this.bootContainer = document.getElementById('boot-container');
        this.bootProgress = document.getElementById('boot-progress');
    },
    
    trigger(action) {
        if (!this.overlay) this.init();
        if (!this.overlay) return;
        
        this.overlay.style.display = 'flex';
        this.overlay.style.pointerEvents = 'auto';
        this.spinner.style.display = 'none';
        this.bootContainer.style.display = 'none';
        
        setTimeout(() => {
            this.overlay.style.opacity = '1';
            
            setTimeout(() => {
                if (action === 'sleepMac') {
                    const wakeUp = () => {
                        this.overlay.style.opacity = '0';
                        MenuSystem.handleAction('lockScreen');
                        setTimeout(() => { this.overlay.style.display = 'none'; }, 500);
                        document.removeEventListener('mousemove', wakeUp);
                        document.removeEventListener('keydown', wakeUp);
                        document.removeEventListener('click', wakeUp);
                    };
                    setTimeout(() => {
                        document.addEventListener('mousemove', wakeUp);
                        document.addEventListener('keydown', wakeUp);
                        document.addEventListener('click', wakeUp);
                    }, 1000);
                } else if (action === 'shutdownMac') {
                    this.spinner.style.display = 'block';
                    setTimeout(() => {
                        this.spinner.style.display = 'none'; if(window.shutDownMac) window.shutDownMac(); }, 2000); } else if (action === 'restartMac') {
                    this.spinner.style.display = 'block';
                    setTimeout(() => {
                        this.spinner.style.display = 'none';
                        this.bootContainer.style.display = 'flex';
                        this.simulateBoot();
                    }, 1500);
                } else if (action === 'logoutMac') {
                    this.spinner.style.display = 'block';
                    setTimeout(() => {
                        this.spinner.style.display = 'none';
                        this.overlay.style.opacity = '0';
                        setTimeout(() => { this.overlay.style.display = 'none'; }, 500);
                        MenuSystem.handleAction('lockScreen');
                    }, 1000);
                }
            }, 600);
        }, 10);
    },
    
    simulateBoot() { if(window.playMacChime) window.playMacChime();
        if(this.bootProgress) this.bootProgress.style.width = '0%';
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            if(this.bootProgress) this.bootProgress.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    if(this.bootContainer) this.bootContainer.style.display = 'none';
                    if(this.overlay) this.overlay.style.opacity = '0';
                    MenuSystem.handleAction('lockScreen');
                    setTimeout(() => { if(this.overlay) this.overlay.style.display = 'none'; }, 500);
                }, 800);
            }
        }, 400);
    }
};

const ControlCenter = {
    init() {
        this.overlay = document.getElementById('brightness-overlay');
        const sliders = document.querySelectorAll('.cc-native-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const val = e.target.value;
                e.target.style.setProperty('--value', val + '%');
                
                // If it's the first slider (Display)
                if (e.target.parentElement.parentElement.querySelector('.cc-title').innerText === 'Display') {
                    if (this.overlay) {
                        // value 100 -> opacity 0. value 0 -> opacity 0.7
                        const opacity = 0.7 - (val / 100) * 0.7;
                        this.overlay.style.opacity = opacity;
                    }
                }
                
                // If it's Sound, play a soft tick occasionally
                if (e.target.parentElement.parentElement.querySelector('.cc-title').innerText === 'Sound') {
                    if (window.MacAudio && Math.random() > 0.7) {
                        MacAudio.play('slider');
                    }
                }
            });
        });
        
        // Initial setup for sliders
        sliders.forEach(slider => {
            slider.style.setProperty('--value', slider.value + '%');
            if (slider.parentElement.parentElement.querySelector('.cc-title').innerText === 'Display') {
                if (this.overlay) {
                    const opacity = 0.7 - (slider.value / 100) * 0.7;
                    this.overlay.style.opacity = opacity;
                }
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    MenuSystem.init();
    ControlCenter.init();
});







