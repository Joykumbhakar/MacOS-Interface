// ═══════════════════════════════════════════════════════════════════════════
// Finder.js — Full macOS Sonoma / Sequoia Finder Implementation
// Includes: All 4 View Modes (Icon, List, Columns, Gallery), AirDrop Radar,
// Live Search, Grouping/Sorting, Quick Look, Inspector Pane, Action Menu,
// Share Sheet, Tagging, Full Keyboard Shortcuts & Dynamic Island Integration
// ═══════════════════════════════════════════════════════════════════════════

const Finder = (() => {

// ─────────────────────────────────────────────────────────────────────────────
// VIRTUAL FILE SYSTEM (FS)
// ─────────────────────────────────────────────────────────────────────────────
const FS = {
    // Top-level volumes & virtual smart locations
    root: {
        id: 'root', name: 'Macintosh HD', type: 'volume', icon: 'hd',
        children: ['applications', 'users', 'library', 'system']
    },
    network: {
        id: 'network', name: 'Network', type: 'volume', icon: 'network',
        children: ['server-nas', 'server-backup', 'server-cloud']
    },
    'server-nas': { id: 'server-nas', name: 'Studio-NAS', type: 'folder', icon: 'folder-server', parent: 'network', children: [] },
    'server-backup': { id: 'server-backup', name: 'Time Machine Backup', type: 'folder', icon: 'folder-server', parent: 'network', children: [] },
    'server-cloud': { id: 'server-cloud', name: 'Ashley Cloud Share', type: 'folder', icon: 'folder-server', parent: 'network', children: [] },

    applications: {
        id: 'applications', name: 'Applications', type: 'folder', icon: 'folder-blue', parent: 'root',
        children: [
            'app-finder', 'app-safari', 'app-messages', 'app-mail', 'app-music',
            'app-photos', 'app-vscode', 'app-github', 'app-terminal', 'app-settings',
            'app-calendar', 'app-notes', 'app-maps', 'app-weather', 'app-calculator',
            'app-appstore', 'app-launchpad', 'app-figma', 'app-photoshop', 'app-finalcut',
            'app-word', 'app-excel', 'app-powerpoint', 'app-chrome', 'app-spotify',
            'app-chatgpt', 'app-gemini', 'app-docker', 'app-steam', 'app-zoom'
        ]
    },
    users: {
        id: 'users', name: 'Users', type: 'folder', icon: 'folder-blue', parent: 'root',
        children: ['user-ashley', 'user-shared']
    },
    'user-shared': { id: 'user-shared', name: 'Shared', type: 'folder', icon: 'folder-blue', parent: 'users', children: [] },
    library: { id: 'library', name: 'Library', type: 'folder', icon: 'folder-blue', parent: 'root', children: [] },
    system: { id: 'system', name: 'System', type: 'folder', icon: 'folder-blue', parent: 'root', children: [] },

    'user-ashley': {
        id: 'user-ashley', name: 'Ashley', type: 'folder', icon: 'folder-blue', parent: 'users',
        children: ['desktop', 'documents', 'downloads', 'pictures', 'music-folder', 'movies']
    },

    // Standard User Folders
    desktop: {
        id: 'desktop', name: 'Desktop', type: 'folder', icon: 'folder-blue', parent: 'user-ashley',
        children: ['file-readme', 'file-screenshot', 'file-figma-spec', 'folder-projects', 'file-financials']
    },
    documents: {
        id: 'documents', name: 'Documents', type: 'folder', icon: 'folder-blue', parent: 'user-ashley',
        children: ['folder-work', 'folder-personal', 'file-resume', 'file-proposal', 'file-budget', 'file-notes-doc', 'file-architecture']
    },
    downloads: {
        id: 'downloads', name: 'Downloads', type: 'folder', icon: 'folder-blue', parent: 'user-ashley',
        children: ['file-setup-dmg', 'file-archive', 'file-ebook', 'file-wallpaper-dl', 'file-invoice-dl', 'file-node-pkg']
    },
    pictures: {
        id: 'pictures', name: 'Pictures', type: 'folder', icon: 'folder-blue', parent: 'user-ashley',
        children: ['file-photo1', 'file-photo2', 'file-photo3', 'file-photo4', 'file-screenshot2', 'file-avatar']
    },
    'music-folder': {
        id: 'music-folder', name: 'Music', type: 'folder', icon: 'folder-blue', parent: 'user-ashley',
        children: ['folder-afterhours', 'file-song-blinding', 'file-song-starboy', 'file-song-levitating', 'file-song-asitwas']
    },
    movies: {
        id: 'movies', name: 'Movies', type: 'folder', icon: 'folder-blue', parent: 'user-ashley',
        children: ['file-nature-demo', 'file-wwdc-keynote', 'file-screencast']
    },

    // Subfolders
    'folder-projects': {
        id: 'folder-projects', name: 'Projects', type: 'folder', icon: 'folder-blue', parent: 'desktop',
        children: ['folder-web', 'folder-ios', 'folder-design-assets']
    },
    'folder-web': {
        id: 'folder-web', name: 'macOS Web Interface', type: 'folder', icon: 'folder-blue', parent: 'folder-projects',
        children: ['file-indexhtml', 'file-stylecss', 'file-scriptjs', 'file-finderjs']
    },
    'folder-ios': { id: 'folder-ios', name: 'SwiftUI Apps', type: 'folder', icon: 'folder-blue', parent: 'folder-projects', children: ['file-app-swift'] },
    'folder-design-assets': { id: 'folder-design-assets', name: 'Design Assets', type: 'folder', icon: 'folder-blue', parent: 'folder-projects', children: ['file-logo-svg', 'file-icons-zip'] },
    'folder-work': {
        id: 'folder-work', name: 'Work', type: 'folder', icon: 'folder-blue', parent: 'documents',
        children: ['file-proposal', 'file-report', 'file-presentation', 'file-contract']
    },
    'folder-personal': {
        id: 'folder-personal', name: 'Personal', type: 'folder', icon: 'folder-blue', parent: 'documents',
        children: ['file-journal', 'file-travel-itinerary']
    },
    'folder-afterhours': {
        id: 'folder-afterhours', name: 'The Weeknd - After Hours', type: 'folder', icon: 'folder-blue', parent: 'music-folder',
        children: ['file-song-blinding', 'file-song-saveyourtears']
    },

    // iCloud Drive Virtual
    icloud: {
        id: 'icloud', name: 'iCloud Drive', type: 'volume', icon: 'icloud',
        children: ['icloud-desktop', 'icloud-docs', 'icloud-pages', 'icloud-keynote']
    },
    'icloud-desktop': { id: 'icloud-desktop', name: 'Desktop Sync', type: 'folder', icon: 'folder-blue', parent: 'icloud', children: [] },
    'icloud-docs': { id: 'icloud-docs', name: 'Documents Sync', type: 'folder', icon: 'folder-blue', parent: 'icloud', children: [] },
    'icloud-pages': { id: 'icloud-pages', name: 'Pages', type: 'folder', icon: 'folder-blue', parent: 'icloud', children: ['file-proposal'] },
    'icloud-keynote': { id: 'icloud-keynote', name: 'Keynote', type: 'folder', icon: 'folder-blue', parent: 'icloud', children: ['file-presentation'] },

    shared: {
        id: 'shared', name: 'Shared', type: 'folder', icon: 'folder-blue',
        children: ['shared-team-roadmap', 'shared-brand-assets', 'shared-q3-budget']
    },
    'shared-team-roadmap': { id: 'shared-team-roadmap', name: '2026 Product Roadmap.pdf', type: 'file', kind: 'PDF Document', ext: 'pdf', size: '3.4 MB', parent: 'shared', modified: 'Yesterday', tags: ['blue'], icon: 'doc-pdf' },
    'shared-brand-assets': { id: 'shared-brand-assets', name: 'Apple Brand Guidelines.key', type: 'file', kind: 'Keynote Presentation', ext: 'key', size: '18.2 MB', parent: 'shared', modified: 'Last Week', tags: ['purple'], icon: 'doc-ppt' },
    'shared-q3-budget': { id: 'shared-q3-budget', name: 'Engineering Budget.xlsx', type: 'file', kind: 'Excel Spreadsheet', ext: 'xlsx', size: '480 KB', parent: 'shared', modified: 'Today', tags: ['green'], icon: 'doc-excel' },

    // Special Smart Views
    airdrop: { id: 'airdrop', name: 'AirDrop', type: 'airdrop', icon: 'airdrop', children: [] },
    recents: {
        id: 'recents', name: 'Recents', type: 'smart', icon: 'recents',
        children: [
            'file-readme', 'file-screenshot', 'file-resume', 'file-indexhtml',
            'file-stylecss', 'file-scriptjs', 'file-finderjs', 'file-photo1',
            'file-song-blinding', 'file-proposal', 'file-presentation'
        ]
    },

    // ────────────────────────────
    // VIRTUAL FILES WITH RICH METADATA
    // ────────────────────────────
    'file-readme':        { id: 'file-readme',        name: 'README.md',                 type: 'file', kind: 'Markdown Document',     ext: 'md',   size: '4.2 KB',   parent: 'desktop',         modified: 'Today, 2:15 PM',     tags: ['blue'],   icon: 'doc-text' },
    'file-screenshot':    { id: 'file-screenshot',    name: 'Screenshot 2026-08-19.png',  type: 'file', kind: 'PNG Image',             ext: 'png',  size: '2.4 MB',   parent: 'desktop',         modified: 'Today, 1:40 PM',     tags: ['blue'],   icon: 'image' },
    'file-figma-spec':    { id: 'file-figma-spec',    name: 'macOS_Design_System.fig',   type: 'file', kind: 'Figma Design',          ext: 'fig',  size: '14.8 MB',  parent: 'desktop',         modified: 'Yesterday',          tags: ['purple'], icon: 'doc-figma' },
    'file-financials':    { id: 'file-financials',    name: 'Q3 Financial Model.xlsx',   type: 'file', kind: 'Excel Spreadsheet',     ext: 'xlsx', size: '820 KB',   parent: 'desktop',         modified: 'Yesterday',          tags: ['green'],  icon: 'doc-excel' },

    'file-resume':        { id: 'file-resume',        name: 'Ashley_Resume_2026.pdf',    type: 'file', kind: 'PDF Document',          ext: 'pdf',  size: '340 KB',   parent: 'documents',       modified: 'Today, 11:30 AM',    tags: ['red'],    icon: 'doc-pdf' },
    'file-proposal':      { id: 'file-proposal',      name: 'Project_Proposal_v2.docx',  type: 'file', kind: 'Word Document',         ext: 'docx', size: '1.2 MB',   parent: 'documents',       modified: 'Yesterday',          tags: ['red'],    icon: 'doc-word' },
    'file-budget':        { id: 'file-budget',        name: 'Annual_Budget_2026.xlsx',   type: 'file', kind: 'Excel Spreadsheet',     ext: 'xlsx', size: '540 KB',   parent: 'documents',       modified: 'Last Week',          tags: ['green'],  icon: 'doc-excel' },
    'file-notes-doc':     { id: 'file-notes-doc',     name: 'Executive Summary.txt',     type: 'file', kind: 'Plain Text Document',   ext: 'txt',  size: '12 KB',    parent: 'documents',       modified: 'Today, 10:00 AM',    tags: [],         icon: 'doc-text' },
    'file-architecture':  { id: 'file-architecture',  name: 'System_Architecture.pdf',   type: 'file', kind: 'PDF Document',          ext: 'pdf',  size: '4.8 MB',   parent: 'documents',       modified: 'Last Month',         tags: ['orange'], icon: 'doc-pdf' },
    'file-report':        { id: 'file-report',        name: 'Annual_Performance.pdf',    type: 'file', kind: 'PDF Document',          ext: 'pdf',  size: '3.1 MB',   parent: 'folder-work',     modified: 'Last Month',         tags: [],         icon: 'doc-pdf' },
    'file-presentation':  { id: 'file-presentation',  name: 'WWDC_Keynote_Deck.key',     type: 'file', kind: 'Keynote Presentation',  ext: 'key',  size: '24.5 MB',  parent: 'folder-work',     modified: 'Yesterday',          tags: ['purple'], icon: 'doc-ppt' },
    'file-contract':      { id: 'file-contract',      name: 'Master_Services_Agreement.pdf', type: 'file', kind: 'PDF Document',      ext: 'pdf',  size: '890 KB',   parent: 'folder-work',     modified: 'Last Week',          tags: ['red'],    icon: 'doc-pdf' },
    'file-journal':       { id: 'file-journal',       name: 'Daily_Reflections.txt',     type: 'file', kind: 'Plain Text Document',   ext: 'txt',  size: '18 KB',    parent: 'folder-personal', modified: 'Today, 8:00 AM',     tags: ['yellow'], icon: 'doc-text' },
    'file-travel-itinerary': { id: 'file-travel-itinerary', name: 'Japan_Trip_2026.pdf', type: 'file', kind: 'PDF Document',          ext: 'pdf',  size: '1.4 MB',   parent: 'folder-personal', modified: 'Last Week',          tags: ['orange'], icon: 'doc-pdf' },

    'file-setup-dmg':     { id: 'file-setup-dmg',     name: 'Figma-124.0.0.dmg',         type: 'file', kind: 'Disk Image',            ext: 'dmg',  size: '168 MB',   parent: 'downloads',       modified: 'Today, 9:20 AM',     tags: [],         icon: 'doc-dmg' },
    'file-archive':       { id: 'file-archive',       name: 'UI_Icons_Pack_4K.zip',      type: 'file', kind: 'ZIP Archive',           ext: 'zip',  size: '45.8 MB',  parent: 'downloads',       modified: 'Yesterday',          tags: ['yellow'], icon: 'doc-zip' },
    'file-ebook':         { id: 'file-ebook',         name: 'Designing_for_macOS.pdf',   type: 'file', kind: 'PDF Document',          ext: 'pdf',  size: '12.4 MB',  parent: 'downloads',       modified: 'Last Week',          tags: ['blue'],   icon: 'doc-pdf' },
    'file-wallpaper-dl':  { id: 'file-wallpaper-dl',  name: 'Sequoia_Sunrise_8K.heic',   type: 'file', kind: 'HEIC Image',            ext: 'heic', size: '18.6 MB',  parent: 'downloads',       modified: 'Last Month',         tags: [],         icon: 'image' },
    'file-invoice-dl':    { id: 'file-invoice-dl',    name: 'Apple_Store_Invoice.pdf',   type: 'file', kind: 'PDF Document',          ext: 'pdf',  size: '210 KB',   parent: 'downloads',       modified: 'Today, 1:10 PM',     tags: ['green'],  icon: 'doc-pdf' },
    'file-node-pkg':      { id: 'file-node-pkg',      name: 'node-v20.12.2.pkg',         type: 'file', kind: 'Installer Package',     ext: 'pkg',  size: '42.1 MB',  parent: 'downloads',       modified: 'Last Week',          tags: [],         icon: 'doc-dmg' },

    'file-photo1':        { id: 'file-photo1',        name: 'Yosemite_Valley.jpg',       type: 'file', kind: 'JPEG Image',            ext: 'jpg',  size: '8.4 MB',   parent: 'pictures',        modified: 'Today, 11:00 AM',    tags: ['blue'],   icon: 'image' },
    'file-photo2':        { id: 'file-photo2',        name: 'Big_Sur_Coast.jpg',         type: 'file', kind: 'JPEG Image',            ext: 'jpg',  size: '7.2 MB',   parent: 'pictures',        modified: 'Yesterday',          tags: [],         icon: 'image' },
    'file-photo3':        { id: 'file-photo3',        name: 'Lake_Tahoe_Sunset.jpg',     type: 'file', kind: 'JPEG Image',            ext: 'jpg',  size: '9.1 MB',   parent: 'pictures',        modified: 'Last Week',          tags: ['orange'], icon: 'image' },
    'file-photo4':        { id: 'file-photo4',        name: 'Joshua_Tree_Stars.jpg',     type: 'file', kind: 'JPEG Image',            ext: 'jpg',  size: '11.5 MB',  parent: 'pictures',        modified: 'Last Week',          tags: ['purple'], icon: 'image' },
    'file-screenshot2':   { id: 'file-screenshot2',   name: 'App_Architecture.png',      type: 'file', kind: 'PNG Image',             ext: 'png',  size: '3.2 MB',   parent: 'pictures',        modified: 'Yesterday',          tags: [],         icon: 'image' },
    'file-avatar':        { id: 'file-avatar',        name: 'Profile_Memoji.png',        type: 'file', kind: 'PNG Image',             ext: 'png',  size: '1.8 MB',   parent: 'pictures',        modified: 'Last Month',         tags: [],         icon: 'image' },

    'file-song-blinding': { id: 'file-song-blinding', name: 'Blinding Lights.mp3',       type: 'file', kind: 'MPEG Audio',            ext: 'mp3',  size: '8.2 MB',   parent: 'music-folder',    modified: 'Today, 3:00 PM',     tags: ['red'],    icon: 'doc-audio' },
    'file-song-starboy':  { id: 'file-song-starboy',  name: 'Starboy.mp3',               type: 'file', kind: 'MPEG Audio',            ext: 'mp3',  size: '9.1 MB',   parent: 'music-folder',    modified: 'Yesterday',          tags: ['red'],    icon: 'doc-audio' },
    'file-song-levitating': { id: 'file-song-levitating', name: 'Levitating.mp3',        type: 'file', kind: 'MPEG Audio',            ext: 'mp3',  size: '7.8 MB',   parent: 'music-folder',    modified: 'Last Week',          tags: ['purple'], icon: 'doc-audio' },
    'file-song-asitwas':  { id: 'file-song-asitwas',  name: 'As It Was.mp3',             type: 'file', kind: 'MPEG Audio',            ext: 'mp3',  size: '6.9 MB',   parent: 'music-folder',    modified: 'Last Month',         tags: [],         icon: 'doc-audio' },
    'file-song-saveyourtears': { id: 'file-song-saveyourtears', name: 'Save Your Tears.mp3', type: 'file', kind: 'MPEG Audio',        ext: 'mp3',  size: '8.6 MB',   parent: 'folder-afterhours', modified: 'Last Month',       tags: ['red'],    icon: 'doc-audio' },

    'file-nature-demo':   { id: 'file-nature-demo',   name: 'California_4K_HDR.mp4',     type: 'file', kind: 'MPEG-4 Movie',          ext: 'mp4',  size: '480 MB',   parent: 'movies',          modified: 'Last Week',          tags: ['green'],  icon: 'doc-movie' },
    'file-wwdc-keynote':  { id: 'file-wwdc-keynote',  name: 'WWDC_2026_Opening.mov',     type: 'file', kind: 'QuickTime Movie',       ext: 'mov',  size: '850 MB',   parent: 'movies',          modified: 'Yesterday',          tags: ['purple'], icon: 'doc-movie' },
    'file-screencast':    { id: 'file-screencast',    name: 'Interface_Demo.mov',        type: 'file', kind: 'QuickTime Movie',       ext: 'mov',  size: '124 MB',   parent: 'movies',          modified: 'Today, 12:40 PM',    tags: [],         icon: 'doc-movie' },

    'file-indexhtml':     { id: 'file-indexhtml',     name: 'index.html',                type: 'file', kind: 'HTML Document',         ext: 'html', size: '68 KB',    parent: 'folder-web',      modified: 'Today, 4:00 PM',     tags: ['orange'], icon: 'doc-code' },
    'file-stylecss':      { id: 'file-stylecss',      name: 'style.css',                 type: 'file', kind: 'CSS Stylesheet',        ext: 'css',  size: '59 KB',    parent: 'folder-web',      modified: 'Today, 4:00 PM',     tags: ['blue'],   icon: 'doc-code' },
    'file-scriptjs':      { id: 'file-scriptjs',      name: 'script.js',                 type: 'file', kind: 'JavaScript Source',     ext: 'js',   size: '210 KB',   parent: 'folder-web',      modified: 'Today, 4:00 PM',     tags: ['yellow'], icon: 'doc-code' },
    'file-finderjs':      { id: 'file-finderjs',      name: 'finder.js',                 type: 'file', kind: 'JavaScript Source',     ext: 'js',   size: '90 KB',    parent: 'folder-web',      modified: 'Today, 4:00 PM',     tags: ['yellow'], icon: 'doc-code' },
    'file-app-swift':     { id: 'file-app-swift',     name: 'MacInterfaceApp.swift',     type: 'file', kind: 'Swift Source Code',     ext: 'swift', size: '24 KB',   parent: 'folder-ios',      modified: 'Last Week',          tags: ['orange'], icon: 'doc-code' },
    'file-logo-svg':      { id: 'file-logo-svg',      name: 'Apple_Logo_Vector.svg',     type: 'file', kind: 'SVG Vector Graphic',    ext: 'svg',  size: '18 KB',    parent: 'folder-design-assets', modified: 'Last Month',   tags: [],         icon: 'doc-code' },
    'file-icons-zip':     { id: 'file-icons-zip',     name: 'SF_Symbols_Sequoia.zip',    type: 'file', kind: 'ZIP Archive',           ext: 'zip',  size: '128 MB',   parent: 'folder-design-assets', modified: 'Last Month',   tags: ['purple'], icon: 'doc-zip' },

    // Applications with direct launch mapping
    'app-finder':      { id: 'app-finder',      appId: 'finder',      name: 'Finder',          type: 'app', kind: 'Application', size: '42 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Finder.png' },
    'app-safari':      { id: 'app-safari',      appId: 'safari',      name: 'Safari',          type: 'app', kind: 'Application', size: '64 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/safari.png' },
    'app-messages':    { id: 'app-messages',    appId: 'messages',    name: 'Messages',        type: 'app', kind: 'Application', size: '28 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Messages.png' },
    'app-mail':        { id: 'app-mail',        appId: 'mail',        name: 'Mail',            type: 'app', kind: 'Application', size: '36 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Mail.png' },
    'app-music':       { id: 'app-music',       appId: 'music',       name: 'Apple Music',     type: 'app', kind: 'Application', size: '54 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Music.png' },
    'app-photos':      { id: 'app-photos',      appId: 'photos',      name: 'Photos',          type: 'app', kind: 'Application', size: '48 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Photos.png' },
    'app-vscode':      { id: 'app-vscode',      appId: 'vscode',      name: 'Visual Studio Code', type: 'app', kind: 'Application', size: '380 MB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/VSCode.png' },
    'app-github':      { id: 'app-github',      appId: 'github',      name: 'GitHub Desktop',  type: 'app', kind: 'Application', size: '142 MB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/Github.png' },
    'app-terminal':    { id: 'app-terminal',    appId: 'terminal',    name: 'Terminal',        type: 'app', kind: 'Application', size: '16 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Terminal.png' },
    'app-settings':    { id: 'app-settings',    appId: 'settings',    name: 'System Settings', type: 'app', kind: 'Application', size: '52 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Settings.png' },
    'app-calendar':    { id: 'app-calendar',    appId: 'calendar',    name: 'Calendar',        type: 'app', kind: 'Application', size: '18 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Calendar.png' },
    'app-notes':       { id: 'app-notes',       appId: 'notes',       name: 'Notes',           type: 'app', kind: 'Application', size: '14 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Notes.png' },
    'app-maps':        { id: 'app-maps',        appId: 'maps',        name: 'Apple Maps',      type: 'app', kind: 'Application', size: '72 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Apple_maps.png' },
    'app-weather':     { id: 'app-weather',     appId: 'weather',     name: 'Weather',         type: 'app', kind: 'Application', size: '20 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Weather.png' },
    'app-calculator':  { id: 'app-calculator',  appId: 'calculator',  name: 'Calculator',      type: 'app', kind: 'Application', size: '8 MB',   parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/Calculator.png' },
    'app-appstore':    { id: 'app-appstore',    appId: 'appstore',    name: 'App Store',       type: 'app', kind: 'Application', size: '32 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/AppStore.png' },
    'app-launchpad':   { id: 'app-launchpad',   appId: 'launchpad',   name: 'Launchpad',       type: 'app', kind: 'Application', size: '22 MB',  parent: 'applications', modified: 'System', tags: [], icon: 'app', appIcon: 'images/Icons/LaunchPad.png' },
    'app-figma':       { id: 'app-figma',       appId: 'figma',       name: 'Figma',           type: 'app', kind: 'Application', size: '260 MB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/Figma.png' },
    'app-photoshop':   { id: 'app-photoshop',   appId: 'photoshop',   name: 'Adobe Photoshop', type: 'app', kind: 'Application', size: '2.8 GB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/PhotoShop.png' },
    'app-finalcut':    { id: 'app-finalcut',    appId: 'finalcut',    name: 'Final Cut Pro',   type: 'app', kind: 'Application', size: '4.2 GB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/Final_Cut_Pro.png' },
    'app-word':        { id: 'app-word',        appId: 'word',        name: 'Microsoft Word',  type: 'app', kind: 'Application', size: '1.4 GB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/MsWord.png' },
    'app-excel':       { id: 'app-excel',       appId: 'excel',       name: 'Microsoft Excel', type: 'app', kind: 'Application', size: '1.1 GB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/MsExcel.png' },
    'app-powerpoint':  { id: 'app-powerpoint',  appId: 'powerpoint',  name: 'Microsoft PowerPoint', type: 'app', kind: 'Application', size: '920 MB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/MsPP.png' },
    'app-chrome':      { id: 'app-chrome',      appId: 'chrome',      name: 'Google Chrome',   type: 'app', kind: 'Application', size: '210 MB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/Chrome.png' },
    'app-spotify':     { id: 'app-spotify',     appId: 'spotify',     name: 'Spotify',         type: 'app', kind: 'Application', size: '156 MB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/Spotify.png' },
    'app-chatgpt':     { id: 'app-chatgpt',     appId: 'chatgpt',     name: 'ChatGPT',         type: 'app', kind: 'Application', size: '94 MB',  parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/ChatGPT.png' },
    'app-gemini':      { id: 'app-gemini',      appId: 'gemini',      name: 'Gemini',          type: 'app', kind: 'Application', size: '82 MB',  parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/Gemini.png' },
    'app-docker':      { id: 'app-docker',      appId: 'docker',      name: 'Docker Desktop',  type: 'app', kind: 'Application', size: '620 MB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/Docker.png' },
    'app-steam':       { id: 'app-steam',       appId: 'steam',       name: 'Steam',           type: 'app', kind: 'Application', size: '340 MB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/Steam.png' },
    'app-zoom':        { id: 'app-zoom',        appId: 'zoom',        name: 'Zoom Workplace',  type: 'app', kind: 'Application', size: '138 MB', parent: 'applications', modified: 'Installed', tags: [], icon: 'app', appIcon: 'images/Icons/Zoom.png' }
};

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────
const state = {
    currentPath:   ['recents'],       // breadcrumb stack
    history:       [['recents']],     // for back/forward
    historyPos:    0,
    viewMode:      'icon',            // icon | list | column | gallery
    sortBy:        'name',            // name | kind | size | modified
    sortDir:       'asc',
    groupBy:       null,              // null | kind | date | size
    selected:      new Set(),
    clipboard:     { items: [], op: null }, // op = 'copy' | 'cut'
    searchQuery:   '',
    searchScope:   'current',         // 'current' | 'all'
    _tagFilter:    null,
    iconSize:      72,
    airdropDiscover: 'Everyone',      // 'Everyone' | 'Contacts Only' | 'No One'
    airdropSending:  null             // device id currently sending to
};

const TAG_COLORS = {
    red:    '#ff3b30',
    orange: '#ff9500',
    yellow: '#ffcc00',
    green:  '#34c759',
    blue:   '#0a84ff',
    purple: '#af52de',
    gray:   '#8e8e93'
};

const AIRDROP_DEVICES = [
    { id: 'dev-iphone', name: "Ashley's iPhone", model: "iPhone 15 Pro", svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>', top: '24px', left: '32px' },
    { id: 'dev-ipad',   name: "Living Room iPad", model: "iPad Air (5th gen)", svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>', top: '24px', right: '32px' },
    { id: 'dev-macbook',name: "Tim's MacBook",   model: "MacBook Air M3", svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line></svg>', bottom: '28px', left: '36px' },
    { id: 'dev-studio', name: "Studio Display",  model: "Apple Display", svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>', bottom: '28px', right: '36px' }
];

function currentFolderId() { return state.currentPath[state.currentPath.length - 1]; }
function currentFolder()   { return FS[currentFolderId()]; }

function getChildren(folderId) {
    const folder = FS[folderId];
    if (!folder || !folder.children) return [];
    return folder.children.map(id => FS[id]).filter(Boolean);
}

function parseSize(sizeStr) {
    if (!sizeStr || sizeStr.includes('—')) return 0;
    const match = sizeStr.match(/([\d.]+)\s*(KB|MB|GB|TB|B)/i);
    if (!match) return 0;
    const val = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    const multipliers = { 'B': 1, 'KB': 1024, 'MB': 1024**2, 'GB': 1024**3, 'TB': 1024**4 };
    return val * (multipliers[unit] || 1);
}

function getSortedChildren(folderId) {
    let items = [];
    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        if (state.searchScope === 'all') {
            items = Object.values(FS).filter(f => f.name && f.name.toLowerCase().includes(q) && f.type !== 'volume' && f.type !== 'smart' && f.type !== 'airdrop');
        } else {
            items = getChildren(folderId).filter(f => f.name && f.name.toLowerCase().includes(q));
        }
    } else if (state._tagFilter) {
        items = Object.values(FS).filter(f => f.tags && f.tags.includes(state._tagFilter) && f.type !== 'volume' && f.type !== 'smart' && f.type !== 'airdrop');
    } else {
        items = getChildren(folderId);
    }

    items.sort((a, b) => {
        // Always place folders first
        const aIsDir = a.type === 'folder' || a.type === 'volume';
        const bIsDir = b.type === 'folder' || b.type === 'volume';
        if (aIsDir !== bIsDir) return aIsDir ? -1 : 1;

        if (state.sortBy === 'size') {
            const va = parseSize(a.size);
            const vb = parseSize(b.size);
            return state.sortDir === 'asc' ? va - vb : vb - va;
        } else {
            const va = a[state.sortBy] || a.name;
            const vb = b[state.sortBy] || b.name;
            return state.sortDir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
        }
    });

    return items;
}

// ─────────────────────────────────────────────────────────────────────────────
// FILE ICON GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
function fileIcon(item, size = 64) {
    if (!item) return '';

    // Applications with customized app icons
    if (item.type === 'app' && item.appIcon) {
        return `<img src="${item.appIcon}" style="width:${size}px;height:${size}px;object-fit:contain;pointer-events:none;" draggable="false" onerror="this.src='images/Icons/Finder.png'">`;
    }

    // Folders
    if (item.type === 'folder') {
        return `<img src="images/Icons/Dev Tools Icons/folder.png" style="width:${size}px;height:${size}px;object-fit:contain;pointer-events:none;" draggable="false">`;
    }

    // Volumes & Special
    if (item.type === 'volume' || item.id === 'root') {
        return `<img src="images/Icons/Finder.png" style="width:${size}px;height:${size}px;object-fit:contain;pointer-events:none;" draggable="false">`;
    }

    // Extension mappings
    const ext = (item.ext || '').toLowerCase();
    const map = {
        'pdf':   'images/Icons/Pdf_Document.png',
        'docx':  'images/Icons/Microsoft_Word_Document.png',
        'doc':   'images/Icons/Microsoft_Word_Document.png',
        'xlsx':  'images/Icons/MsExcel.png',
        'xls':   'images/Icons/MsExcel.png',
        'pptx':  'images/Icons/MsPP.png',
        'ppt':   'images/Icons/MsPP.png',
        'key':   'images/Icons/MsPP.png',
        'dmg':   'images/Icons/Finder.png',
        'pkg':   'images/Icons/Finder.png',
        'zip':   'images/Icons/Finder.png',
        'txt':   'images/Icons/txt.png',
        'md':    'images/Icons/txt.png',
        'fig':   'images/Icons/Figma.png',
        'swift': 'images/Icons/code_docs.png',
        'js':    'images/Icons/code_docs.png',
        'html':  'images/Icons/code_docs.png',
        'css':   'images/Icons/code_docs.png',
        'svg':   'images/Icons/code_docs.png',
        'mp3':   'images/Icons/Music.png',
        'flac':  'images/Icons/Music.png',
        'mp4':   'images/Icons/Photos.png',
        'mov':   'images/Icons/Photos.png',
        'jpg':   'images/Icons/Photos.png',
        'png':   'images/Icons/Photos.png',
        'heic':  'images/Icons/Photos.png'
    };

    if (map[ext]) {
        return `<img src="${map[ext]}" style="width:${size}px;height:${size}px;object-fit:contain;pointer-events:none;" draggable="false" onerror="this.src='images/Icons/txt.png'">`;
    }

    return `<img src="images/Icons/txt.png" style="width:${size}px;height:${size}px;object-fit:contain;pointer-events:none;" draggable="false">`;
}

function tagDots(tags = []) {
    if (!tags || !tags.length) return '';
    return tags.map(t => `<div style="width:7px;height:7px;border-radius:50%;background:${TAG_COLORS[t]||'#8e8e93'};display:inline-block;box-shadow:0 0 2px rgba(0,0,0,0.3);flex-shrink:0;"></div>`).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE RENDER
// ─────────────────────────────────────────────────────────────────────────────
function render() {
    renderSidebar();
    renderToolbar();
    renderContent();
    renderPathbar();
    renderStatus();
    updateNavButtons();
}

function renderSidebar() {
    const currId = currentFolderId();
    document.querySelectorAll('.sb-item').forEach(el => {
        el.classList.remove('active');
        const target = el.dataset.target;
        if (target === currId && !state._tagFilter) {
            el.classList.add('active');
        }
    });

    document.querySelectorAll('.sb-tag').forEach(el => {
        const tag = el.dataset.tag;
        if (state._tagFilter === tag) {
            el.classList.add('active');
            el.style.background = 'rgba(10, 132, 255, 0.15)';
        } else {
            el.classList.remove('active');
            el.style.background = '';
        }
    });
}

function renderToolbar() {
    const folder = currentFolder();
    const titleEl = document.getElementById('finder-title');
    if (titleEl && folder) {
        titleEl.textContent = state._tagFilter ? `Tag: ${state._tagFilter.toUpperCase()}` : (state.searchQuery ? `Search "${state.searchQuery}"` : folder.name);
    }

    // Update view toggle active pill
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    const modeBtnMap = { icon: 'view-icon', list: 'view-list', column: 'view-col', gallery: 'view-gal' };
    const activeBtn = document.getElementById(modeBtnMap[state.viewMode]);
    if (activeBtn) activeBtn.classList.add('active');

    // Toggle search clear button
    const clearBtn = document.getElementById('finder-search-clear');
    if (clearBtn) {
        clearBtn.style.display = state.searchQuery ? 'block' : 'none';
    }
}

function renderPathbar() {
    const el = document.getElementById('finder-pathbar');
    if (!el) return;

    if (state._tagFilter) {
        el.innerHTML = `<span class="path-item active">Tags › ${state._tagFilter}</span>`;
        return;
    }

    const parts = state.currentPath.map(id => FS[id]).filter(Boolean);
    el.innerHTML = parts.map((f, i) => `
        <span class="path-item ${i === parts.length - 1 ? 'active' : ''}" onclick="Finder.navigateTo('${f.id}')">
            ${f.name}
        </span>
        ${i < parts.length - 1 ? `<svg class="path-sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>` : ''}
    `).join('');
}

function renderStatus() {
    const el = document.getElementById('finder-status-text');
    if (!el) return;

    const items = getSortedChildren(currentFolderId());
    const selCount = state.selected.size;

    if (selCount > 0) {
        const selItems = [...state.selected].map(id => FS[id]).filter(Boolean);
        const totalBytes = selItems.reduce((sum, item) => sum + parseSize(item.size || '0'), 0);
        let sizeText = '';
        if (totalBytes > 0) {
            if (totalBytes >= 1024**3) sizeText = ` (${(totalBytes / 1024**3).toFixed(1)} GB)`;
            else if (totalBytes >= 1024**2) sizeText = ` (${(totalBytes / 1024**2).toFixed(1)} MB)`;
            else if (totalBytes >= 1024) sizeText = ` (${(totalBytes / 1024).toFixed(0)} KB)`;
            else sizeText = ` (${totalBytes} B)`;
        }
        el.textContent = `${selCount} of ${items.length} selected${sizeText}`;
    } else {
        el.textContent = `${items.length} item${items.length !== 1 ? 's' : ''}, 45.2 GB available`;
    }
}

function renderContent() {
    const el = document.getElementById('mac-content');
    if (!el) return;

    el.innerHTML = '';
    const folder = currentFolder();
    if (!folder) return;

    // Special Case: AirDrop View
    if (folder.type === 'airdrop') {
        renderAirDropView(el);
        return;
    }

    if (state.viewMode === 'icon') renderIconView(el);
    else if (state.viewMode === 'list') renderListView(el);
    else if (state.viewMode === 'column') renderColumnView(el);
    else if (state.viewMode === 'gallery') renderGalleryView(el);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. AIRDROP VIEW (Authentic Radar Waves & Discovered Devices)
// ─────────────────────────────────────────────────────────────────────────────
function renderAirDropView(el) {
    el.innerHTML = `
        <div class="airdrop-container">
            <div class="airdrop-radar">
                <div class="airdrop-ring"></div>
                <div class="airdrop-ring"></div>
                <div class="airdrop-ring"></div>
                
                <div class="airdrop-center-node" title="Your Mac (Ashley's MacBook Pro)">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>

                ${AIRDROP_DEVICES.map(dev => `
                    <div class="airdrop-device" id="${dev.id}" style="${dev.top ? 'top:'+dev.top+';' : ''}${dev.bottom ? 'bottom:'+dev.bottom+';' : ''}${dev.left ? 'left:'+dev.left+';' : ''}${dev.right ? 'right:'+dev.right+';' : ''}" onclick="Finder.sendAirDrop('${dev.id}')" title="Click to share with ${dev.name}">
                        <div class="airdrop-device-icon" id="${dev.id}-icon">
                            ${dev.svg}
                        </div>
                        <span class="airdrop-device-name">${dev.name}</span>
                        <span class="airdrop-device-model">${dev.model}</span>
                    </div>
                `).join('')}
            </div>

            <div style="text-align:center; z-index:2; margin-top:10px;">
                <div style="font-size:15px; font-weight:600; color:#1d1d1f; margin-bottom:4px;">AirDrop</div>
                <div style="font-size:12px; color:#8e8e93; max-width:320px; line-height:1.4;">
                    Share instantly with people nearby. Tap a device or drag items onto it to share.
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:8px; margin-top:24px; padding:6px 14px; background:rgba(0,0,0,0.05); border-radius:20px; font-size:11.5px; color:#1d1d1f; z-index:2; cursor:pointer;" onclick="Finder.toggleAirDropDiscovery(event)">
                <span>Allow me to be discovered by:</span>
                <span style="font-weight:600; color:#0a84ff;">${state.airdropDiscover} ▾</span>
            </div>
        </div>
    `;

    // Bind drop target on devices
    AIRDROP_DEVICES.forEach(dev => {
        const devEl = document.getElementById(dev.id);
        if (!devEl) return;

        devEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            devEl.style.transform = 'scale(1.18)';
            devEl.querySelector('.airdrop-device-icon').style.background = '#0a84ff';
            devEl.querySelector('.airdrop-device-icon').style.color = '#ffffff';
        });

        devEl.addEventListener('dragleave', () => {
            devEl.style.transform = '';
            devEl.querySelector('.airdrop-device-icon').style.background = 'white';
            devEl.querySelector('.airdrop-device-icon').style.color = '#0a84ff';
        });

        devEl.addEventListener('drop', (e) => {
            e.preventDefault();
            devEl.style.transform = '';
            devEl.querySelector('.airdrop-device-icon').style.background = 'white';
            devEl.querySelector('.airdrop-device-icon').style.color = '#0a84ff';
            const itemId = e.dataTransfer.getData('text/plain');
            sendAirDrop(dev.id, itemId);
        });
    });
}

function sendAirDrop(deviceId, customItemId = null) {
    const dev = AIRDROP_DEVICES.find(d => d.id === deviceId);
    if (!dev) return;

    let targetFile = null;
    if (customItemId && FS[customItemId]) {
        targetFile = FS[customItemId];
    } else if (state.selected.size > 0) {
        targetFile = FS[[...state.selected][0]];
    } else {
        targetFile = FS['file-photo1'];
    }

    const devIcon = document.getElementById(`${dev.id}-icon`);
    if (devIcon) {
        devIcon.innerHTML = `<i class="fas fa-spinner fa-spin" style="font-size:18px;"></i>`;
    }

    showToast(`Sending "${targetFile.name}" to ${dev.name}…`);

        // Dynamic Island Dispatch
    if (window.MacIsland && MacIsland.airdrop) {
        let prog = 0;
        MacIsland.airdrop(targetFile.name, prog);
        const intv = setInterval(() => {
            prog += 20;
            if (prog >= 100) {
                prog = 100;
                clearInterval(intv);
                MacIsland.airdrop(targetFile.name, prog);
                if (devIcon) devIcon.innerHTML = `<i class="fas fa-check" style="font-size:18px; color:#34c759;"></i>`;
                setTimeout(() => MacIsland.success('Sent to ' + dev.name), 1000);
                setTimeout(() => { if (devIcon) devIcon.innerHTML = dev.svg; }, 2000);
            } else {
                MacIsland.airdrop(targetFile.name, prog);
            }
        }, 300);
    }
}

function toggleAirDropDiscovery(e) {
    e.stopPropagation();
    closeAllPopovers();

    const options = ['Everyone', 'Contacts Only', 'No One'];
    const pop = document.createElement('div');
    pop.className = 'finder-popover';
    const rect = e.currentTarget.getBoundingClientRect();
    pop.style.left = `${rect.left}px`;
    pop.style.top = `${rect.bottom + 6}px`;

    pop.innerHTML = options.map(opt => `
        <div class="finder-popover-item" onclick="Finder.setAirDropDiscovery('${opt}')">
            <span>${opt}</span>
            ${state.airdropDiscover === opt ? '<i class="fas fa-check" style="font-size:11px;"></i>' : ''}
        </div>
    `).join('');

    document.body.appendChild(pop);
    setTimeout(() => document.addEventListener('click', closeAllPopovers, { once: true }), 0);
}

function setAirDropDiscovery(val) {
    state.airdropDiscover = val;
    closeAllPopovers();
    render();
    showToast(`AirDrop discovery set to: ${val}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ICON VIEW (Responsive grid, live zoom, multi-select, inline rename)
// ─────────────────────────────────────────────────────────────────────────────
function renderIconView(el) {
    const items = getSortedChildren(currentFolderId());
    const sz = state.iconSize;

    if (items.length === 0) {
        el.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:10px; color:#8e8e93;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" stroke-width="1.2"><path d="M2 7.5A1.5 1.5 0 0 1 3.5 6h3.757a1.5 1.5 0 0 1 1.06.44l1.19 1.19A1.5 1.5 0 0 0 10.565 8H20.5A1.5 1.5 0 0 1 22 9.5v9A1.5 1.5 0 0 1 20.5 20h-17A1.5 1.5 0 0 1 2 18.5v-11z"/></svg>
                <span style="font-size:13px; font-weight:500;">This folder is empty</span>
            </div>
        `;
        return;
    }

    // Check if grouping is active
    if (state.groupBy) {
        renderGroupedIconView(el, items, sz);
        return;
    }

    el.innerHTML = `
        <div class="finder-icon-grid" id="finder-grid">
            ${items.map(item => `
                <div class="finder-item ${state.selected.has(item.id) ? 'selected' : ''}"
                     id="fitem-${item.id}"
                     data-id="${item.id}"
                     draggable="true"
                     style="width:${sz + 28}px;">
                    <div style="position:relative; flex-shrink:0;">
                        ${fileIcon(item, sz)}
                        ${item.tags && item.tags.length ? `<div style="position:absolute; bottom:-3px; right:-2px; display:flex; gap:2px;">${tagDots(item.tags)}</div>` : ''}
                    </div>
                    <span class="finder-name" style="max-width:${sz + 24}px;">${item.name}</span>
                </div>
            `).join('')}
        </div>
    `;

    bindItemEvents(el);
}

function renderGroupedIconView(el, items, sz) {
    const groups = {};
    items.forEach(item => {
        let key = 'Other';
        if (state.groupBy === 'kind') key = item.kind || item.type;
        else if (state.groupBy === 'date') key = item.modified || 'Unknown';
        else if (state.groupBy === 'size') {
            const bytes = parseSize(item.size);
            if (bytes > 1024**2 * 100) key = 'Huge (> 100 MB)';
            else if (bytes > 1024**2) key = 'Large (1 MB - 100 MB)';
            else if (bytes > 0) key = 'Small (< 1 MB)';
            else key = 'Folders';
        }
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
    });

    let html = `<div style="padding:16px; flex:1;">`;
    for (const [groupName, groupItems] of Object.entries(groups)) {
        html += `
            <div class="finder-group-section">
                <div class="finder-group-header">
                    <span>${groupName}</span>
                    <span class="finder-group-count">${groupItems.length}</span>
                </div>
                <div class="finder-icon-grid" style="padding:0;">
                    ${groupItems.map(item => `
                        <div class="finder-item ${state.selected.has(item.id) ? 'selected' : ''}"
                             id="fitem-${item.id}" data-id="${item.id}" draggable="true" style="width:${sz + 28}px;">
                            <div style="position:relative; flex-shrink:0;">
                                ${fileIcon(item, sz)}
                                ${item.tags && item.tags.length ? `<div style="position:absolute; bottom:-3px; right:-2px; display:flex; gap:2px;">${tagDots(item.tags)}</div>` : ''}
                            </div>
                            <span class="finder-name" style="max-width:${sz + 24}px;">${item.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    html += `</div>`;
    el.innerHTML = html;
    bindItemEvents(el);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. LIST VIEW (Sortable headers, metadata rows)
// ─────────────────────────────────────────────────────────────────────────────
function renderListView(el) {
    const items = getSortedChildren(currentFolderId());

    el.innerHTML = `
        <div class="list-view-container">
            <div class="list-header-wrapper">
                <div class="list-grid">
                    <div class="col-name" onclick="Finder.setSort('name')" style="cursor:pointer;">
                        <span>Name</span>
                        ${state.sortBy === 'name' ? (state.sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                    </div>
                    <div class="col-date" onclick="Finder.setSort('modified')" style="cursor:pointer;">
                        <span>Date Modified</span>
                        ${state.sortBy === 'modified' ? (state.sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                    </div>
                    <div class="col-size" onclick="Finder.setSort('size')" style="cursor:pointer;">
                        <span>Size</span>
                        ${state.sortBy === 'size' ? (state.sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                    </div>
                    <div class="col-kind" onclick="Finder.setSort('kind')" style="cursor:pointer;">
                        <span>Kind</span>
                        ${state.sortBy === 'kind' ? (state.sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                    </div>
                </div>
            </div>
            ${items.map(item => `
                <div class="list-row-wrapper ${state.selected.has(item.id) ? 'selected' : ''}"
                     id="fitem-${item.id}"
                     data-id="${item.id}"
                     draggable="true">
                    <div class="list-grid">
                        <div class="col-name">
                            ${fileIcon(item, 18)}
                            <span>${item.name}</span>
                            ${item.tags && item.tags.length ? `<span style="display:inline-flex; gap:2px; margin-left:4px;">${tagDots(item.tags)}</span>` : ''}
                        </div>
                        <div class="col-date">${item.modified || '—'}</div>
                        <div class="col-size">${item.type === 'folder' || item.type === 'volume' ? '—' : item.size || '—'}</div>
                        <div class="col-kind">${item.kind || item.type}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    bindItemEvents(el);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. COLUMN VIEW (Cascading columns + Inspector Preview Pane)
// ─────────────────────────────────────────────────────────────────────────────
function renderColumnView(el) {
    const columnsHtml = state.currentPath.map((folderId, colIdx) => {
        const items = getSortedChildren(folderId);
        const activeChildId = state.currentPath[colIdx + 1];

        return `
            <div class="finder-column">
                ${items.map(item => {
                    const isDir = item.type === 'folder' || item.type === 'volume';
                    const isActive = item.id === activeChildId;
                    const isSel = state.selected.has(item.id);

                    return `
                        <div class="finder-col-item ${isActive ? 'active-col' : ''} ${isSel ? 'selected' : ''}"
                             id="fitem-${item.id}"
                             data-id="${item.id}"
                             draggable="true">
                            ${fileIcon(item, 18)}
                            <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.name}</span>
                            ${isDir ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }).join('');

    // Inspector Panel for selected item
    const selId = [...state.selected].pop();
    const selItem = selId ? FS[selId] : null;

    let previewPane = '';
    if (selItem) {
        previewPane = `
            <div class="finder-col-preview-pane">
                <div style="margin-top:10px;">
                    ${fileIcon(selItem, 80)}
                </div>
                <div style="text-align:center; width:100%;">
                    <div style="font-size:14px; font-weight:600; color:#1d1d1f; word-break:break-word;">${selItem.name}</div>
                    <div style="font-size:11.5px; color:#8e8e93; margin-top:2px;">${selItem.kind || selItem.type}</div>
                </div>

                <div style="width:100%; border-top:1px solid rgba(0,0,0,0.08); padding-top:12px; display:flex; flex-direction:column; gap:6px; font-size:11px; color:#555;">
                    <div style="display:flex; justify-content:space-between;"><span style="color:#8e8e93;">Size:</span> <span style="font-weight:500; color:#111;">${selItem.size || '—'}</span></div>
                    <div style="display:flex; justify-content:space-between;"><span style="color:#8e8e93;">Modified:</span> <span style="font-weight:500; color:#111;">${selItem.modified || '—'}</span></div>
                    <div style="display:flex; justify-content:space-between;"><span style="color:#8e8e93;">Location:</span> <span style="font-weight:500; color:#111;">~/${selItem.parent || 'Macintosh HD'}</span></div>
                    ${selItem.tags && selItem.tags.length ? `<div style="display:flex; justify-content:space-between; align-items:center;"><span style="color:#8e8e93;">Tags:</span> <span style="display:flex; gap:2px;">${tagDots(selItem.tags)}</span></div>` : ''}
                </div>

                <div style="width:100%; display:flex; flex-direction:column; gap:6px; margin-top:8px;">
                    <button class="finder-quick-action-btn" onclick="Finder.openQuickLook('${selItem.id}')">
                        <i class="fas fa-eye"></i> Quick Look (⎵)
                    </button>
                    <button class="finder-quick-action-btn" onclick="Finder.toggleShareMenu(event)">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                    <button class="finder-quick-action-btn" onclick="Finder.showGetInfo('${selItem.id}')">
                        <i class="fas fa-info-circle"></i> Get Info (⌘I)
                    </button>
                </div>
            </div>
        `;
    }

    el.innerHTML = `
        <div class="finder-columns-container" id="finder-cols-wrapper">
            ${columnsHtml}
            ${previewPane}
        </div>
    `;

    // Auto-scroll column view to the right
    const wrapper = document.getElementById('finder-cols-wrapper');
    if (wrapper) wrapper.scrollLeft = wrapper.scrollWidth;

    bindItemEvents(el);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. GALLERY VIEW (Large featured preview + scrolling filmstrip)
// ─────────────────────────────────────────────────────────────────────────────
function renderGalleryView(el) {
    const items = getSortedChildren(currentFolderId());
    const selId = [...state.selected].pop();
    const selItem = selId ? FS[selId] : (items[0] || null);

    let mainCard = '';
    if (selItem) {
        if (selItem.kind && selItem.kind.includes('Audio')) {
            mainCard = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:16px;">
                    ${fileIcon(selItem, 110)}
                    <div style="text-align:center;">
                        <div style="font-size:18px; font-weight:700; color:#111;">${selItem.name}</div>
                        <div style="font-size:13px; color:#8e8e93; margin-top:2px;">${selItem.kind} · ${selItem.size}</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:12px; background:rgba(0,0,0,0.06); padding:8px 20px; border-radius:30px; margin-top:8px;">
                        <i class="fas fa-play" style="color:#0a84ff; font-size:16px; cursor:pointer;" onclick="Finder.showToast('Playing preview...')"></i>
                        <div style="width:160px; height:4px; background:rgba(0,0,0,0.12); border-radius:2px; position:relative;">
                            <div style="width:40%; height:100%; background:#0a84ff; border-radius:2px;"></div>
                        </div>
                        <span style="font-size:11px; color:#8e8e93;">1:14</span>
                    </div>
                </div>
            `;
        } else {
            mainCard = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:14px;">
                    ${fileIcon(selItem, 120)}
                    <div style="text-align:center;">
                        <div style="font-size:18px; font-weight:700; color:#111;">${selItem.name}</div>
                        <div style="font-size:13px; color:#8e8e93; margin-top:4px;">${selItem.kind || selItem.type} · ${selItem.size || 'Folder'}</div>
                        ${selItem.modified ? `<div style="font-size:12px; color:#8e8e93; margin-top:2px;">Modified ${selItem.modified}</div>` : ''}
                    </div>
                </div>
            `;
        }
    } else {
        mainCard = `<div style="color:#8e8e93; font-size:14px;">No items selected</div>`;
    }

    el.innerHTML = `
        <div class="finder-gallery-container">
            <div class="finder-gallery-main">
                ${mainCard}
            </div>
            <div class="finder-gallery-strip">
                ${items.map(item => `
                    <div class="finder-gal-thumb ${selItem && item.id === selItem.id ? 'selected' : ''}"
                         id="fitem-${item.id}"
                         data-id="${item.id}"
                         draggable="true">
                        ${fileIcon(item, 36)}
                        <span style="font-size:10px; color:#1d1d1f; text-align:center; max-width:60px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    bindItemEvents(el);
}

// ─────────────────────────────────────────────────────────────────────────────
// EVENT BINDING & INTERACTION
// ─────────────────────────────────────────────────────────────────────────────
function bindItemEvents(container) {
    container.querySelectorAll('[data-id]').forEach(el => {
        const id = el.dataset.id;
        if (!id) return;

        // Click Selection
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
                state.selected.clear();
            }

            if (e.shiftKey && state.selected.size > 0) {
                const items = getSortedChildren(currentFolderId()).map(i => i.id);
                const last = [...state.selected].pop();
                const a = items.indexOf(last), b = items.indexOf(id);
                const [lo, hi] = [Math.min(a, b), Math.max(a, b)];
                items.slice(lo, hi + 1).forEach(itemId => state.selected.add(itemId));
            } else {
                if (state.selected.has(id) && (e.metaKey || e.ctrlKey)) {
                    state.selected.delete(id);
                } else {
                    state.selected.add(id);
                }
            }
            render();
        });

        // Double Click Launch / Navigation
        el.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            const item = FS[id];
            if (!item) return;

            if (item.type === 'folder' || item.type === 'volume' || item.type === 'smart') {
                navigateTo(id);
            } else if (item.type === 'app') {
                const appId = item.appId || item.id.replace('app-', '');
                if (window.appState && typeof window.appState.openApp === 'function') {
                    window.appState.openApp(appId);
                }
            } else {
                openQuickLook(id);
            }
        });

        // Context Menu on Item
        el.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!state.selected.has(id)) {
                state.selected.clear();
                state.selected.add(id);
            }
            render();
            showFinderContextMenu(e.clientX, e.clientY, id);
        });

        // Drag & Drop
        el.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', id);
            e.dataTransfer.effectAllowed = 'move';
            el.style.opacity = '0.4';
        });

        el.addEventListener('dragend', () => {
            el.style.opacity = '';
        });

        const item = FS[id];
        if (item && (item.type === 'folder' || item.type === 'volume')) {
            el.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                el.style.outline = '2px solid #0a84ff';
                el.style.outlineOffset = '2px';
            });

            el.addEventListener('dragleave', () => {
                el.style.outline = '';
                el.style.outlineOffset = '';
            });

            el.addEventListener('drop', (e) => {
                e.preventDefault();
                el.style.outline = '';
                el.style.outlineOffset = '';
                const srcId = e.dataTransfer.getData('text/plain');
                if (!srcId || srcId === id) return;
                moveItem(srcId, id);
            });
        }
    });

    // Empty space click to clear selection
    container.addEventListener('mousedown', (e) => {
        if (e.target === container || e.target.classList.contains('finder-icon-grid') || e.target.classList.contains('list-view-container')) {
            if (e.button === 0) {
                state.selected.clear();
                render();
            }
        }
    });

    // Empty space right click for Background Context Menu
    container.addEventListener('contextmenu', (e) => {
        if (e.target === container || e.target.classList.contains('finder-icon-grid') || e.target.classList.contains('list-view-container')) {
            e.preventDefault();
            e.stopPropagation();
            showEmptyContextMenu(e.clientX, e.clientY);
        }
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOLBAR POPUPS & MENUS
// ─────────────────────────────────────────────────────────────────────────────
function toggleGroupMenu(e) {
    e.stopPropagation();
    closeAllPopovers();

    const pop = document.createElement('div');
    pop.className = 'finder-popover';
    const rect = e.currentTarget.getBoundingClientRect();
    pop.style.left = `${rect.left}px`;
    pop.style.top = `${rect.bottom + 6}px`;

    const groupOptions = [
        { label: 'None', val: null },
        { label: 'Kind', val: 'kind' },
        { label: 'Date Modified', val: 'date' },
        { label: 'Size', val: 'size' }
    ];

    const sortOptions = [
        { label: 'Name', val: 'name' },
        { label: 'Kind', val: 'kind' },
        { label: 'Date Modified', val: 'modified' },
        { label: 'Size', val: 'size' }
    ];

    pop.innerHTML = `
        <div class="finder-popover-title">Group By</div>
        ${groupOptions.map(opt => `
            <div class="finder-popover-item" onclick="Finder.setGroup(${opt.val ? `'${opt.val}'` : 'null'})">
                <span>${opt.label}</span>
                ${state.groupBy === opt.val ? '<i class="fas fa-check" style="font-size:11px;"></i>' : ''}
            </div>
        `).join('')}
        <div class="finder-popover-divider"></div>
        <div class="finder-popover-title">Sort By</div>
        ${sortOptions.map(opt => `
            <div class="finder-popover-item" onclick="Finder.setSort('${opt.val}')">
                <span>${opt.label}</span>
                ${state.sortBy === opt.val ? (state.sortDir === 'asc' ? '↑' : '↓') : ''}
            </div>
        `).join('')}
    `;

    document.body.appendChild(pop);
    setTimeout(() => document.addEventListener('click', closeAllPopovers, { once: true }), 0);
}

function setGroup(val) {
    state.groupBy = val;
    closeAllPopovers();
    render();
    showToast(val ? `Grouped by ${val}` : 'Grouping turned off');
}

function toggleActionMenu(e) {
    e.stopPropagation();
    closeAllPopovers();

    const pop = document.createElement('div');
    pop.className = 'finder-popover';
    const rect = e.currentTarget.getBoundingClientRect();
    pop.style.left = `${rect.left}px`;
    pop.style.top = `${rect.bottom + 6}px`;

    const selId = [...state.selected].pop();
    const hasSel = state.selected.size > 0;

    pop.innerHTML = `
        <div class="finder-popover-item" onclick="Finder.newFolder()">
            <span>New Folder</span>
            <span style="opacity:0.4; font-size:11px;">⌘⇧N</span>
        </div>
        <div class="finder-popover-divider"></div>
        <div class="finder-popover-item ${hasSel ? '' : 'disabled'}" style="${hasSel ? '' : 'opacity:0.4; pointer-events:none;'}" onclick="Finder.showGetInfo('${selId}')">
            <span>Get Info</span>
            <span style="opacity:0.4; font-size:11px;">⌘I</span>
        </div>
        <div class="finder-popover-item ${hasSel ? '' : 'disabled'}" style="${hasSel ? '' : 'opacity:0.4; pointer-events:none;'}" onclick="Finder.openQuickLook('${selId}')">
            <span>Quick Look</span>
            <span style="opacity:0.4; font-size:11px;">⎵</span>
        </div>
        <div class="finder-popover-item ${hasSel ? '' : 'disabled'}" style="${hasSel ? '' : 'opacity:0.4; pointer-events:none;'}" onclick="Finder.duplicateItem('${selId}')">
            <span>Duplicate</span>
            <span style="opacity:0.4; font-size:11px;">⌘D</span>
        </div>
        <div class="finder-popover-item ${hasSel ? '' : 'disabled'}" style="${hasSel ? '' : 'opacity:0.4; pointer-events:none;'}" onclick="Finder.compressItem('${selId}')">
            <span>Compress</span>
        </div>
        <div class="finder-popover-divider"></div>
        <div class="finder-popover-item ${hasSel ? '' : 'disabled'}" style="${hasSel ? '' : 'opacity:0.4; pointer-events:none;'}; color:#ff3b30;" onclick="Finder.deleteItem('${selId}')">
            <span>Move to Trash</span>
            <span style="opacity:0.4; font-size:11px;">⌘⌫</span>
        </div>
    `;

    document.body.appendChild(pop);
    setTimeout(() => document.addEventListener('click', closeAllPopovers, { once: true }), 0);
}

function toggleShareMenu(e) {
    e.stopPropagation();
    closeAllPopovers();

    const pop = document.createElement('div');
    pop.className = 'finder-popover';
    const rect = e.currentTarget.getBoundingClientRect();
    pop.style.left = `${rect.left}px`;
    pop.style.top = `${rect.bottom + 6}px`;

    const selId = [...state.selected].pop();
    const item = selId ? FS[selId] : { name: 'Current Folder' };

    pop.innerHTML = `
        <div class="finder-popover-title">Share "${item.name}"</div>
        <div class="finder-popover-item" onclick="Finder.navigateTo('airdrop'); Finder.closeAllPopovers();">
            <div style="display:flex; align-items:center; gap:8px;"><i class="fas fa-wifi" style="color:#0a84ff;"></i> <span>AirDrop</span></div>
        </div>
        <div class="finder-popover-item" onclick="Finder.showToast('Shared via Messages'); Finder.closeAllPopovers();">
            <div style="display:flex; align-items:center; gap:8px;"><i class="fas fa-comment-dots" style="color:#34c759;"></i> <span>Messages</span></div>
        </div>
        <div class="finder-popover-item" onclick="Finder.showToast('Drafting Mail...'); Finder.closeAllPopovers();">
            <div style="display:flex; align-items:center; gap:8px;"><i class="fas fa-envelope" style="color:#0a84ff;"></i> <span>Mail</span></div>
        </div>
        <div class="finder-popover-item" onclick="Finder.showToast('Copied link to clipboard!'); Finder.closeAllPopovers();">
            <div style="display:flex; align-items:center; gap:8px;"><i class="fas fa-link" style="color:#8e8e93;"></i> <span>Copy Link</span></div>
        </div>
    `;

    document.body.appendChild(pop);
    setTimeout(() => document.addEventListener('click', closeAllPopovers, { once: true }), 0);
}

function toggleTagMenu(e) {
    e.stopPropagation();
    closeAllPopovers();

    const selId = [...state.selected].pop();
    if (!selId) {
        showToast('Select an item to add tags');
        return;
    }

    showTagPicker(selId);
}

function closeAllPopovers() {
    document.querySelectorAll('.finder-popover, #finder-tag-picker').forEach(el => el.remove());
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT MENUS
// ─────────────────────────────────────────────────────────────────────────────
function showFinderContextMenu(x, y, itemId) {
    closeAllPopovers();
    const item = FS[itemId];
    if (!item) return;

    const isFolder = item.type === 'folder' || item.type === 'volume';
    const menu = document.createElement('div');
    menu.id = 'finder-ctx-menu';
    menu.className = 'context-menu active';
    menu.style.cssText = `position:fixed; top:${y}px; left:${x}px; z-index:60000;`;

    menu.innerHTML = `
        <div class="menu-item" onclick="Finder.openItem('${itemId}')"><span>Open</span></div>
        <div class="menu-item" onclick="Finder.showQuickAction('${itemId}')"><span>Open With…</span></div>
        <div class="menu-divider"></div>
        <div class="menu-item" onclick="Finder.showGetInfo('${itemId}')"><span>Get Info</span> <span class="menu-shortcut">⌘I</span></div>
        <div class="menu-item" onclick="Finder.openQuickLook('${itemId}')"><span>Quick Look</span> <span class="menu-shortcut">⎵</span></div>
        <div class="menu-divider"></div>
        <div class="menu-item" onclick="Finder.copyItem('${itemId}')"><span>Copy</span> <span class="menu-shortcut">⌘C</span></div>
        <div class="menu-item" onclick="Finder.duplicateItem('${itemId}')"><span>Duplicate</span> <span class="menu-shortcut">⌘D</span></div>
        <div class="menu-item" onclick="Finder.startRename('${itemId}')"><span>Rename…</span></div>
        <div class="menu-item" onclick="Finder.compressItem('${itemId}')"><span>Compress</span></div>
        <div class="menu-divider"></div>
        <div class="menu-item" style="color:#ff453a;" onclick="Finder.deleteItem('${itemId}')"><span>Move to Trash</span> <span class="menu-shortcut">⌘⌫</span></div>
        <div class="menu-divider"></div>
        <div class="menu-item" onclick="Finder.showTagPicker('${itemId}')"><span>Tags…</span></div>
    `;

    document.body.appendChild(menu);
    setTimeout(() => document.addEventListener('click', () => menu.remove(), { once: true }), 0);
}

function showEmptyContextMenu(x, y) {
    closeAllPopovers();
    const menu = document.createElement('div');
    menu.id = 'finder-ctx-menu';
    menu.className = 'context-menu active';
    menu.style.cssText = `position:fixed; top:${y}px; left:${x}px; z-index:60000;`;

    menu.innerHTML = `
        <div class="menu-item" onclick="Finder.newFolder()"><span>New Folder</span> <span class="menu-shortcut">⌘⇧N</span></div>
        <div class="menu-divider"></div>
        <div class="menu-item" onclick="Finder.render(); Finder.showToast('View refreshed');"><span>Refresh</span></div>
        <div class="menu-item" onclick="Finder.selectAll()"><span>Select All</span> <span class="menu-shortcut">⌘A</span></div>
        <div class="menu-divider"></div>
        <div class="menu-item" onclick="Finder.pasteItems()"><span>Paste</span> <span class="menu-shortcut">⌘V</span></div>
        <div class="menu-divider"></div>
        <div class="menu-item" onclick="Finder.setSort('name')"><span>Sort by Name</span></div>
        <div class="menu-item" onclick="Finder.setSort('modified')"><span>Sort by Date</span></div>
        <div class="menu-item" onclick="Finder.setSort('size')"><span>Sort by Size</span></div>
        <div class="menu-item" onclick="Finder.setSort('kind')"><span>Sort by Kind</span></div>
    `;

    document.body.appendChild(menu);
    setTimeout(() => document.addEventListener('click', () => menu.remove(), { once: true }), 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK LOOK OVERLAY (Enhanced with live audio player, code viewer & PDF card)
// ─────────────────────────────────────────────────────────────────────────────
function openQuickLook(itemId) {
    const item = FS[itemId];
    if (!item) return;
    closeQuickLook();

    const ql = document.createElement('div');
    ql.id = 'finder-quicklook';
    ql.style.cssText = `position:fixed; inset:0; z-index:65000; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.5); backdrop-filter:blur(10px); animation:fadeIn 0.15s ease;`;

    let previewContent = '';
    if (item.ext === 'mp3' || item.ext === 'flac') {
        previewContent = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:20px;">
                ${fileIcon(item, 100)}
                <div style="text-align:center;">
                    <div style="font-size:18px; font-weight:700; color:white;">${item.name}</div>
                    <div style="font-size:13px; color:rgba(255,255,255,0.6); margin-top:2px;">${item.kind} · ${item.size}</div>
                </div>
                <div style="display:flex; align-items:center; gap:14px; background:rgba(255,255,255,0.12); padding:10px 24px; border-radius:30px;">
                    <i class="fas fa-play" style="color:#0a84ff; font-size:18px; cursor:pointer;" onclick="Finder.showToast('Playing audio track preview...')"></i>
                    <div style="width:200px; height:5px; background:rgba(255,255,255,0.2); border-radius:3px; position:relative;">
                        <div style="width:45%; height:100%; background:#0a84ff; border-radius:3px;"></div>
                    </div>
                    <span style="font-size:12px; color:white;">1:32 / 3:45</span>
                </div>
            </div>
        `;
    } else if (['jpg', 'png', 'heic', 'svg'].includes(item.ext)) {
        previewContent = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:16px;">
                <div style="width:280px; height:200px; border-radius:12px; overflow:hidden; background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">
                    ${fileIcon(item, 120)}
                </div>
                <div style="font-size:15px; font-weight:600; color:white;">${item.name}</div>
                <div style="font-size:12px; color:rgba(255,255,255,0.6);">${item.kind} · 3840 × 2160 · ${item.size}</div>
            </div>
        `;
    } else if (['js', 'html', 'css', 'swift', 'md', 'txt'].includes(item.ext)) {
        previewContent = `
            <div style="width:100%; height:260px; background:rgba(0,0,0,0.4); border-radius:10px; padding:16px; font-family:ui-monospace,SFMono-Regular,monospace; font-size:12px; color:#34c759; overflow:auto; line-height:1.6;">
                <div style="color:rgba(255,255,255,0.4);">// Preview of ${item.name}</div>
                <div>import Foundation</div>
                <div>import SwiftUI</div>
                <br>
                <div style="color:#38bdf8;">struct ${item.name.replace(/\.[^.]+$/, '')}: View {</div>
                <div style="padding-left:16px; color:#ff7b72;">var body: some View {</div>
                <div style="padding-left:32px; color:#fff;">Text("macOS Sonoma Interface")</div>
                <div style="padding-left:16px; color:#ff7b72;">}</div>
                <div style="color:#38bdf8;">}</div>
            </div>
        `;
    } else {
        previewContent = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:16px;">
                ${fileIcon(item, 110)}
                <div style="font-size:16px; font-weight:600; color:white;">${item.name}</div>
                <div style="font-size:12px; color:rgba(255,255,255,0.6);">${item.kind} · ${item.size}</div>
            </div>
        `;
    }

    ql.innerHTML = `
        <div style="background:rgba(28,28,30,0.92); backdrop-filter:blur(30px); border-radius:16px; border:0.5px solid rgba(255,255,255,0.2); padding:20px; max-width:600px; width:90%; max-height:85vh; display:flex; flex-direction:column; gap:16px; box-shadow:0 24px 60px rgba(0,0,0,0.6);">
            <div style="display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:10px;">
                    ${fileIcon(item, 28)}
                    <div>
                        <div style="color:white; font-size:13.5px; font-weight:600;">${item.name}</div>
                        <div style="color:rgba(255,255,255,0.5); font-size:11px;">${item.kind} · ${item.size}</div>
                    </div>
                </div>
                <div onclick="Finder.closeQuickLook()" style="width:26px; height:26px; border-radius:50%; background:rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; cursor:pointer; color:white; font-size:14px;">✕</div>
            </div>

            <div style="flex:1; background:rgba(255,255,255,0.04); border-radius:12px; min-height:220px; display:flex; align-items:center; justify-content:center; padding:16px;">
                ${previewContent}
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:11px; color:rgba(255,255,255,0.5);">Modified: ${item.modified || 'Today'}</div>
                <div style="display:flex; gap:8px;">
                    <button onclick="Finder.closeQuickLook()" style="padding:6px 14px; border-radius:6px; border:1px solid rgba(255,255,255,0.2); background:transparent; color:white; font-size:12px; cursor:pointer;">Done</button>
                    <button onclick="Finder.openItem('${item.id}')" style="padding:6px 14px; border-radius:6px; border:none; background:#0a84ff; color:white; font-size:12px; font-weight:600; cursor:pointer;">Open</button>
                </div>
            </div>
        </div>
    `;

    ql.addEventListener('click', (e) => { if (e.target === ql) closeQuickLook(); });
    document.body.appendChild(ql);
}

function closeQuickLook() {
    const ql = document.getElementById('finder-quicklook');
    if (ql) ql.remove();
}

// ─────────────────────────────────────────────────────────────────────────────
// GET INFO WINDOW
// ─────────────────────────────────────────────────────────────────────────────
function showGetInfo(itemId) {
    const item = FS[itemId];
    if (!item) return;
    closeGetInfo();

    const modal = document.createElement('div');
    modal.id = 'finder-getinfo';
    modal.style.cssText = `position:fixed; top:90px; left:50%; transform:translateX(-50%); z-index:60000; background:rgba(245,245,247,0.98); backdrop-filter:blur(30px); border:0.5px solid rgba(0,0,0,0.15); border-radius:12px; width:280px; box-shadow:0 20px 48px rgba(0,0,0,0.2);`;

    modal.innerHTML = `
        <div style="padding:12px 16px; background:rgba(0,0,0,0.03); border-radius:12px 12px 0 0; display:flex; align-items:center; gap:12px; border-bottom:0.5px solid rgba(0,0,0,0.08);">
            ${fileIcon(item, 32)}
            <div style="flex:1; overflow:hidden;">
                <div style="font-size:13px; font-weight:700; color:#111; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.name} Info</div>
                <div style="font-size:11px; color:#8e8e93;">${item.size || 'Folder'}</div>
            </div>
            <div onclick="Finder.closeGetInfo()" style="cursor:pointer; color:#8e8e93; font-size:16px;">✕</div>
        </div>
        <div style="padding:14px 16px; font-size:11.5px; color:#444; display:flex; flex-direction:column; gap:8px;">
            <div style="font-size:11px; font-weight:700; color:rgba(0,0,0,0.4); text-transform:uppercase;">General</div>
            <div style="display:flex; justify-content:space-between;"><span style="color:#8e8e93;">Kind:</span> <span style="font-weight:500; color:#111;">${item.kind || item.type}</span></div>
            <div style="display:flex; justify-content:space-between;"><span style="color:#8e8e93;">Size:</span> <span style="font-weight:500; color:#111;">${item.size || '—'}</span></div>
            <div style="display:flex; justify-content:space-between;"><span style="color:#8e8e93;">Where:</span> <span style="font-weight:500; color:#111;">~/${item.parent || 'Macintosh HD'}</span></div>
            <div style="display:flex; justify-content:space-between;"><span style="color:#8e8e93;">Created:</span> <span style="font-weight:500; color:#111;">18 Aug 2026</span></div>
            <div style="display:flex; justify-content:space-between;"><span style="color:#8e8e93;">Modified:</span> <span style="font-weight:500; color:#111;">${item.modified || 'Today'}</span></div>
            ${item.tags && item.tags.length ? `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                    <span style="color:#8e8e93;">Tags:</span>
                    <span style="display:flex; gap:3px;">${tagDots(item.tags)}</span>
                </div>
            ` : ''}
        </div>
        <div style="padding:10px 16px; border-top:0.5px solid rgba(0,0,0,0.08); background:rgba(0,0,0,0.02); border-radius:0 0 12px 12px; font-size:11px; color:#8e8e93;">
            <span>Permissions: You have read & write access</span>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => document.addEventListener('click', (e) => { if (!modal.contains(e.target)) closeGetInfo(); }, { once: true }), 100);
}

function closeGetInfo() {
    const el = document.getElementById('finder-getinfo');
    if (el) el.remove();
}

// ─────────────────────────────────────────────────────────────────────────────
// FILE OPERATIONS (Create, Rename, Delete, Duplicate, Compress, Paste)
// ─────────────────────────────────────────────────────────────────────────────
function newFolder() {
    closeAllPopovers();
    const parentId = currentFolderId();
    const id = 'folder-' + Date.now();
    FS[id] = {
        id,
        name: 'untitled folder',
        type: 'folder',
        icon: 'folder-blue',
        parent: parentId,
        children: [],
        modified: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tags: []
    };

    if (!FS[parentId].children) FS[parentId].children = [];
    FS[parentId].children.push(id);
    state.selected = new Set([id]);
    render();

    setTimeout(() => startRename(id), 120);
    showToast('Created new folder');
}

function startRename(itemId) {
    const item = FS[itemId];
    if (!item) return;

    const el = document.querySelector(`#fitem-${itemId} .finder-name`) || document.querySelector(`#fitem-${itemId} span`);
    if (!el) return;

    const oldName = item.name;
    el.contentEditable = 'true';
    el.style.background = '#ffffff';
    el.style.color = '#000000';
    el.style.borderRadius = '3px';
    el.style.padding = '1px 4px';
    el.style.outline = '2px solid #0a84ff';
    el.focus();

    // Select name without extension
    const dotIdx = oldName.lastIndexOf('.');
    if (dotIdx > 0) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(el.childNodes[0] || el, 0);
        range.setEnd(el.childNodes[0] || el, dotIdx);
        sel.removeAllRanges();
        sel.addRange(range);
    } else {
        document.execCommand('selectAll');
    }

    const finish = () => {
        const newName = el.textContent.trim() || oldName;
        el.contentEditable = 'false';
        el.style.background = '';
        el.style.color = '';
        el.style.outline = '';
        el.style.padding = '';
        item.name = newName;
        render();
        el.removeEventListener('blur', finish);
        el.removeEventListener('keydown', keyHandler);
    };

    const keyHandler = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); finish(); }
        if (e.key === 'Escape') { el.textContent = oldName; finish(); }
    };

    el.addEventListener('blur', finish);
    el.addEventListener('keydown', keyHandler);
}

function deleteItem(itemId) {
    closeAllPopovers();
    const ids = state.selected.size > 0 ? [...state.selected] : [itemId];
    if (!ids.length) return;

    ids.forEach(id => {
        const item = FS[id];
        if (!item || !item.parent) return;
        const parent = FS[item.parent];
        if (parent && parent.children) {
            parent.children = parent.children.filter(c => c !== id);
        }
    });

    state.selected.clear();
    render();
    showToast(`Moved ${ids.length} item${ids.length > 1 ? 's' : ''} to Trash`);

    if (window.MacIsland && MacIsland.notification) {
        MacIsland.notification('Trash', `Moved ${ids.length} item${ids.length > 1 ? 's' : ''} to Trash`, 'fas fa-trash', 2000);
    }
}

function duplicateItem(itemId) {
    closeAllPopovers();
    const item = FS[itemId];
    if (!item) return;

    const newId = `${itemId}-copy-${Date.now()}`;
    const dotIdx = item.name.lastIndexOf('.');
    const newName = dotIdx > 0 ? `${item.name.slice(0, dotIdx)} copy${item.name.slice(dotIdx)}` : `${item.name} copy`;

    FS[newId] = {
        ...item,
        id: newId,
        name: newName,
        modified: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const parent = FS[item.parent || currentFolderId()];
    if (parent && parent.children) parent.children.push(newId);

    state.selected = new Set([newId]);
    render();
    showToast(`Duplicated "${item.name}"`);
}

function copyItem(itemId) {
    state.clipboard = { items: state.selected.size > 0 ? [...state.selected] : [itemId], op: 'copy' };
    if (window.MacIsland && MacIsland.copy) MacIsland.copy(); else showToast(`Copied ${state.clipboard.items.length} item${state.clipboard.items.length > 1 ? 's' : ''}`);
}

function pasteItems() {
    closeAllPopovers();
    const { items, op } = state.clipboard;
    if (!items || !items.length) return;

    const targetId = currentFolderId();
    const targetFolder = FS[targetId];
    if (!targetFolder) return;

    items.forEach(id => {
        const item = FS[id];
        if (!item) return;

        if (op === 'copy') {
            const newId = `${id}-${Date.now()}`;
            FS[newId] = { ...item, id: newId, parent: targetId };
            if (!targetFolder.children) targetFolder.children = [];
            targetFolder.children.push(newId);
        } else if (op === 'cut') {
            const oldParent = FS[item.parent];
            if (oldParent && oldParent.children) oldParent.children = oldParent.children.filter(c => c !== id);
            item.parent = targetId;
            if (!targetFolder.children) targetFolder.children = [];
            targetFolder.children.push(id);
            state.clipboard = { items: [], op: null };
        }
    });

    render();
    showToast('Pasted items');
}

function compressItem(itemId) {
    closeAllPopovers();
    const item = FS[itemId];
    if (!item) return;

    const zipId = `zip-${Date.now()}`;
    const baseName = item.name.replace(/\.[^.]+$/, '') + '.zip';

    FS[zipId] = {
        id: zipId,
        name: baseName,
        type: 'file',
        kind: 'ZIP Archive',
        ext: 'zip',
        size: '12.4 MB',
        parent: item.parent || currentFolderId(),
        modified: 'Today',
        tags: [],
        icon: 'doc-zip'
    };

    const parent = FS[item.parent || currentFolderId()];
    if (parent && parent.children) parent.children.push(zipId);

    render();
    showToast(`Compressed to "${baseName}"`);
}

function moveItem(srcId, targetFolderId) {
    const srcItem = FS[srcId];
    const targetFolder = FS[targetFolderId];
    if (!srcItem || !targetFolder) return;

    const oldParent = FS[srcItem.parent];
    if (oldParent && oldParent.children) {
        oldParent.children = oldParent.children.filter(c => c !== srcId);
    }

    srcItem.parent = targetFolderId;
    if (!targetFolder.children) targetFolder.children = [];
    targetFolder.children.push(srcId);

    showToast(`Moved "${srcItem.name}" to "${targetFolder.name}"`);
    render();
}

function openItem(itemId) {
    const item = FS[itemId];
    if (!item) return;

    if (item.type === 'folder' || item.type === 'volume' || item.type === 'smart') {
        navigateTo(itemId);
    } else if (item.type === 'app') {
        const appId = item.appId || item.id.replace('app-', '');
        if (window.appState && typeof window.appState.openApp === 'function') {
            window.appState.openApp(appId);
        }
    } else {
        openQuickLook(itemId);
    }
}

function selectAll() {
    getSortedChildren(currentFolderId()).forEach(i => state.selected.add(i.id));
    render();
}

// ─────────────────────────────────────────────────────────────────────────────
// TAG PICKER
// ─────────────────────────────────────────────────────────────────────────────
function showTagPicker(itemId) {
    closeAllPopovers();
    const item = FS[itemId];
    if (!item) return;

    const picker = document.createElement('div');
    picker.id = 'finder-tag-picker';
    picker.style.cssText = `position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:65000; background:rgba(255,255,255,0.98); backdrop-filter:blur(30px); border:0.5px solid rgba(0,0,0,0.15); border-radius:14px; padding:18px; min-width:240px; box-shadow:0 20px 48px rgba(0,0,0,0.25);`;

    picker.innerHTML = `
        <div style="font-size:13.5px; font-weight:700; color:#111; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center;">
            <span>Tags for "${item.name}"</span>
            <span onclick="Finder.closeAllPopovers()" style="cursor:pointer; color:#8e8e93; font-size:16px;">✕</span>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${Object.entries(TAG_COLORS).map(([name, color]) => {
                const hasTag = item.tags && item.tags.includes(name);
                return `
                    <div onclick="Finder.toggleTag('${itemId}', '${name}')"
                         style="display:flex; align-items:center; gap:6px; cursor:pointer; padding:6px 10px; border-radius:8px; background:${hasTag ? color : 'rgba(0,0,0,0.05)'}; color:${hasTag ? 'white' : '#111'}; font-size:12px; font-weight:500; transition:all 0.15s;">
                        <div style="width:10px; height:10px; border-radius:50%; background:${hasTag ? 'white' : color};"></div>
                        <span style="text-transform:capitalize;">${name}</span>
                    </div>
                `;
            }).join('')}
        </div>
        <div onclick="Finder.closeAllPopovers()" style="text-align:center; margin-top:16px; font-size:12.5px; font-weight:600; color:#0a84ff; cursor:pointer;">Done</div>
    `;

    document.body.appendChild(picker);
}

function toggleTag(itemId, tagName) {
    const item = FS[itemId];
    if (!item) return;
    if (!item.tags) item.tags = [];

    const idx = item.tags.indexOf(tagName);
    if (idx >= 0) item.tags.splice(idx, 1);
    else item.tags.push(tagName);

    render();
    showTagPicker(itemId);
}

function filterByTag(tagName) {
    if (state._tagFilter === tagName) {
        state._tagFilter = null;
        showToast('Cleared tag filter');
    } else {
        state._tagFilter = tagName;
        showToast(`Filtered by tag: ${tagName}`);
    }
    render();
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────
function navigateTo(folderId) {
    if (!FS[folderId]) return;

    state._tagFilter = null;
    state.searchQuery = '';

    // Build breadcrumb path stack
    const newPath = [];
    let curr = FS[folderId];
    let depth = 0;
    while (curr && depth < 20) {
        newPath.unshift(curr.id);
        if (!curr.parent || curr.id === curr.parent) break;
        curr = FS[curr.parent];
        depth++;
    }

    state.currentPath = newPath.length ? newPath : [folderId];

    // Push to History
    state.history = state.history.slice(0, state.historyPos + 1);
    state.history.push([...state.currentPath]);
    state.historyPos = state.history.length - 1;

    state.selected.clear();
    render();
}

function navigateBack() {
    if (state.historyPos <= 0) return;
    state.historyPos--;
    state.currentPath = [...state.history[state.historyPos]];
    state.selected.clear();
    render();
}

function navigateForward() {
    if (state.historyPos >= state.history.length - 1) return;
    state.historyPos++;
    state.currentPath = [...state.history[state.historyPos]];
    state.selected.clear();
    render();
}

function updateNavButtons() {
    const back = document.getElementById('nav-back');
    const fwd  = document.getElementById('nav-forward');
    if (back) back.disabled = state.historyPos <= 0;
    if (fwd)  fwd.disabled  = state.historyPos >= state.history.length - 1;
}

function setViewMode(mode) {
    state.viewMode = mode;
    render();
}

function setSort(by) {
    if (state.sortBy === by) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortBy = by;
        state.sortDir = 'asc';
    }
    render();
}

function search(query) {
    state.searchQuery = query.trim();
    render();
}

function showToast(msg) {
    const existing = document.getElementById('finder-toast');
    if (existing) existing.remove();

    const t = document.createElement('div');
    t.id = 'finder-toast';
    t.style.cssText = `position:fixed; bottom:70px; left:50%; transform:translateX(-50%); background:rgba(28,28,30,0.92); color:white; padding:8px 18px; border-radius:20px; font-size:12px; font-weight:500; z-index:70000; pointer-events:none; box-shadow:0 8px 24px rgba(0,0,0,0.3); backdrop-filter:blur(20px);`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2400);
}

// ─────────────────────────────────────────────────────────────────────────────
// KEYBOARD SHORTCUTS
// ─────────────────────────────────────────────────────────────────────────────
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        const win = document.getElementById('finder-window');
        if (!win || !win.classList.contains('active')) return;
        if (e.target.tagName === 'INPUT' || e.target.contentEditable === 'true') return;

        if (e.metaKey || e.ctrlKey) {
            if (e.key === 'a') { e.preventDefault(); selectAll(); }
            else if (e.key === 'c') { e.preventDefault(); if (state.selected.size) copyItem([...state.selected][0]); }
            else if (e.key === 'v') { e.preventDefault(); pasteItems(); }
            else if (e.key === 'd') { e.preventDefault(); if (state.selected.size) duplicateItem([...state.selected][0]); }
            else if (e.key === 'i') { e.preventDefault(); if (state.selected.size) showGetInfo([...state.selected][0]); }
            else if (e.key === '1') { e.preventDefault(); setViewMode('icon'); }
            else if (e.key === '2') { e.preventDefault(); setViewMode('list'); }
            else if (e.key === '3') { e.preventDefault(); setViewMode('column'); }
            else if (e.key === '4') { e.preventDefault(); setViewMode('gallery'); }
            else if (e.key === 'f') { e.preventDefault(); const s = document.querySelector('.tb-search'); if (s) { s.focus(); s.select(); } }
            else if (e.shiftKey && e.key === 'N') { e.preventDefault(); newFolder(); }
            else if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); if (state.selected.size) deleteItem([...state.selected][0]); }
            else if (e.key === '[' || e.key === 'ArrowLeft') { e.preventDefault(); navigateBack(); }
            else if (e.key === ']' || e.key === 'ArrowRight') { e.preventDefault(); navigateForward(); }
        } else if (e.key === ' ') {
            e.preventDefault();
            if (state.selected.size) openQuickLook([...state.selected][0]);
        } else if (e.key === 'Escape') {
            closeQuickLook();
            closeGetInfo();
            closeAllPopovers();
            state.selected.clear();
            render();
        } else if (e.key === 'Enter') {
            if (state.selected.size === 1) startRename([...state.selected][0]);
        } else if (e.key === 'F2') {
            if (state.selected.size === 1) startRename([...state.selected][0]);
        }
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// INITIALIZATION
// ─────────────────────────────────────────────────────────────────────────────
function init() {
    // Wire up search bar
    const searchEl = document.querySelector('.tb-search');
    if (searchEl) {
        searchEl.addEventListener('input', (e) => search(e.target.value));
        searchEl.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchEl.value = '';
                search('');
            }
        });
    }

    // Wire up status zoom slider
    const zoomEl = document.querySelector('.finder-zoom');
    if (zoomEl) {
        zoomEl.addEventListener('input', (e) => {
            state.iconSize = parseInt(e.target.value, 10);
            if (state.viewMode === 'icon') render();
        });
    }

    initKeyboard();
    navigateTo('recents');
}

// Expose FS and Finder globally
window.FS = FS;

return {
    init,
    render,
    navigateTo,
    navigateBack,
    navigateForward,
    setViewMode,
    setSort,
    setGroup,
    search,
    filterByTag,
    newFolder,
    startRename,
    deleteItem,
    duplicateItem,
    copyItem,
    pasteItems,
    compressItem,
    openItem,
    selectAll,
    showGetInfo,
    closeGetInfo,
    openQuickLook,
    closeQuickLook,
    showTagPicker,
    toggleTag,
    toggleGroupMenu,
    toggleActionMenu,
    toggleShareMenu,
    toggleTagMenu,
    toggleAirDropDiscovery,
    setAirDropDiscovery,
    sendAirDrop,
    closeAllPopovers,
    showToast,
    state,
    FS
};

})();

window.Finder = Finder;
