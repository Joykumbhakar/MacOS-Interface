const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { autoUpdater } = require('electron-updater');

// ─────────────────────────────────────────────────────────────────────────────
// AUTO-UPDATER SETUP
// ─────────────────────────────────────────────────────────────────────────────
autoUpdater.autoDownload = false;     // Don't download silently — ask the user first
autoUpdater.autoInstallOnAppQuit = false;

let mainWindowRef = null;

function sendToRenderer(channel, data) {
    if (mainWindowRef && !mainWindowRef.isDestroyed()) {
        mainWindowRef.webContents.send(channel, data);
    }
}

autoUpdater.on('checking-for-update', () => {
    sendToRenderer('update-status', { type: 'checking' });
});

autoUpdater.on('update-available', (info) => {
    sendToRenderer('update-status', {
        type:    'available',
        version: info.version,
        notes:   info.releaseNotes || 'Bug fixes and improvements.',
    });
});

autoUpdater.on('update-not-available', () => {
    sendToRenderer('update-status', { type: 'not-available' });
});

autoUpdater.on('download-progress', (progress) => {
    sendToRenderer('update-status', {
        type:    'downloading',
        percent: Math.round(progress.percent),
        speed:   Math.round(progress.bytesPerSecond / 1024) + ' KB/s',
    });
});

autoUpdater.on('update-downloaded', (info) => {
    sendToRenderer('update-status', {
        type:    'downloaded',
        version: info.version,
    });
});

autoUpdater.on('error', (err) => {
    sendToRenderer('update-status', {
        type:    'error',
        message: err.message,
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const AUDIO_EXTS  = new Set(['.mp3', '.m4a', '.flac', '.wav', '.ogg', '.aac', '.opus']);
const IMAGE_EXTS  = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.heic']);
const VIDEO_EXTS  = new Set(['.mp4', '.mov', '.mkv', '.avi', '.webm', '.m4v']);
const DOC_EXTS    = new Set(['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.md', '.csv', '.rtf', '.pages', '.numbers', '.key']);
const CODE_EXTS   = new Set(['.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.json', '.py', '.swift', '.kt', '.java', '.go', '.rs', '.cpp', '.c', '.sh']);

function getFileKind(ext) {
    if (AUDIO_EXTS.has(ext))  return 'Audio File';
    if (IMAGE_EXTS.has(ext))  return 'Image';
    if (VIDEO_EXTS.has(ext))  return 'Movie';
    if (DOC_EXTS.has(ext))    return 'Document';
    if (CODE_EXTS.has(ext))   return 'Source Code';
    return 'File';
}

function formatSize(bytes) {
    if (bytes < 1024)             return bytes + ' B';
    if (bytes < 1024 * 1024)      return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}

function formatDate(date) {
    const now = new Date();
    const d   = new Date(date);
    const diff = now - d;
    if (diff < 86400000)       return 'Today';
    if (diff < 172800000)      return 'Yesterday';
    if (diff < 604800000)      return d.toLocaleDateString('en-US', { weekday: 'long' });
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Recursively read a directory (max 2 levels deep) and convert it into
 * the FS node format consumed by finder.js.
 * Returns { nodes: {id: node}, rootIds: [id, ...] }
 */
function scanDirectory(realPath, parentId, depth = 0, maxDepth = 2) {
    const nodes   = {};
    const rootIds = [];

    let entries;
    try {
        entries = fs.readdirSync(realPath, { withFileTypes: true });
    } catch (_) {
        return { nodes, rootIds };
    }

    for (const entry of entries) {
        // Skip hidden files/system folders
        if (entry.name.startsWith('.')) continue;
        if (entry.name === 'node_modules' || entry.name === '$RECYCLE.BIN') continue;

        const fullPath = path.join(realPath, entry.name);
        const safeId   = 'local-' + fullPath.replace(/[^a-zA-Z0-9]/g, '_');

        if (entry.isDirectory()) {
            const node = {
                id:       safeId,
                name:     entry.name,
                type:     'folder',
                icon:     'folder-blue',
                parent:   parentId,
                realPath: fullPath,
                children: [],
                isLocal:  true,
            };

            if (depth < maxDepth) {
                const sub = scanDirectory(fullPath, safeId, depth + 1, maxDepth);
                Object.assign(nodes, sub.nodes);
                node.children = sub.rootIds;
            }

            nodes[safeId] = node;
            rootIds.push(safeId);

        } else if (entry.isFile()) {
            let stat;
            try { stat = fs.statSync(fullPath); } catch (_) { continue; }

            const ext  = path.extname(entry.name).toLowerCase();
            const node = {
                id:       safeId,
                name:     entry.name,
                type:     'file',
                kind:     getFileKind(ext),
                ext:      ext.replace('.', ''),
                size:     formatSize(stat.size),
                modified: formatDate(stat.mtime),
                parent:   parentId,
                realPath: fullPath,
                isLocal:  true,
            };

            // For audio — supply a file:// URL so the music player can stream it
            if (AUDIO_EXTS.has(ext)) {
                node.localUrl = 'file:///' + fullPath.replace(/\\/g, '/');
                node.isAudio  = true;
            }
            if (IMAGE_EXTS.has(ext)) {
                node.localUrl = 'file:///' + fullPath.replace(/\\/g, '/');
                node.isImage  = true;
            }

            nodes[safeId] = node;
            rootIds.push(safeId);
        }
    }

    return { nodes, rootIds };
}

/**
 * Scan the user's home directory standard folders and return the full FS patch.
 */
function buildLocalFS() {
    const homeDir = os.homedir();
    const username = os.userInfo().username;

    const standardFolders = [
        { key: 'desktop',    name: 'Desktop',    fsId: 'desktop'      },
        { key: 'documents',  name: 'Documents',  fsId: 'documents'    },
        { key: 'downloads',  name: 'Downloads',  fsId: 'downloads'    },
        { key: 'pictures',   name: 'Pictures',   fsId: 'pictures'     },
        { key: 'music',      name: 'Music',       fsId: 'music-folder' },
        { key: 'videos',     name: 'Videos',      fsId: 'movies'       },
    ];

    const allNodes    = {};
    const musicFiles  = []; // Flat list of audio nodes for the Music app
    const folderPatch = {}; // Maps fsId -> additional child IDs to inject

    for (const folder of standardFolders) {
        const realPath = path.join(homeDir, folder.name);
        if (!fs.existsSync(realPath)) continue;

        const { nodes, rootIds } = scanDirectory(realPath, folder.fsId, 0, 2);

        Object.assign(allNodes, nodes);
        folderPatch[folder.fsId] = rootIds;

        // Collect audio files for the Music app
        for (const node of Object.values(nodes)) {
            if (node.isAudio) musicFiles.push(node);
        }
    }

    return { allNodes, folderPatch, musicFiles, username };
}

// ─────────────────────────────────────────────────────────────────────────────
// WINDOW
// ─────────────────────────────────────────────────────────────────────────────
function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration:  true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'images/Icons/MacOS.png'),
        autoHideMenuBar: true,
    });

    mainWindowRef = mainWindow;

    mainWindow.loadFile('index.html');
    mainWindow.maximize();

    // Check for updates 3 seconds after the app has fully loaded
    mainWindow.webContents.once('did-finish-load', () => {
        setTimeout(() => {
            autoUpdater.checkForUpdates().catch(() => {});
        }, 3000);
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// IPC HANDLERS
// ─────────────────────────────────────────────────────────────────────────────

// Renderer calls this once on startup to hydrate the FS and Music library
ipcMain.handle('get-local-fs', async () => {
    try {
        return buildLocalFS();
    } catch (err) {
        console.error('get-local-fs error:', err);
        return { allNodes: {}, folderPatch: {}, musicFiles: [], username: os.userInfo().username };
    }
});

// Renderer calls this to open a native folder-picker dialog
ipcMain.handle('open-folder-dialog', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: 'Add folder to Finder',
    });
    if (canceled || !filePaths.length) return null;

    const chosen   = filePaths[0];
    const parentId = 'local-root';
    const safeId   = 'local-' + chosen.replace(/[^a-zA-Z0-9]/g, '_');

    const node = {
        id:       safeId,
        name:     path.basename(chosen),
        type:     'folder',
        icon:     'folder-blue',
        parent:   parentId,
        realPath: chosen,
        children: [],
        isLocal:  true,
    };

    const { nodes, rootIds } = scanDirectory(chosen, safeId, 0, 2);
    node.children = rootIds;
    nodes[safeId] = node;

    const musicFiles = Object.values(nodes).filter(n => n.isAudio);

    return { nodes, rootNode: node, musicFiles };
});

// User clicked "Download Update" in the notification banner
ipcMain.handle('update-download', async () => {
    autoUpdater.downloadUpdate();
});

// User clicked "Install & Restart" after download completed
ipcMain.handle('update-install', async () => {
    autoUpdater.quitAndInstall(false, true); // isSilent=false, isForceRunAfter=true
});

// User manually triggered an update check from Settings
ipcMain.handle('update-check', async () => {
    autoUpdater.checkForUpdates().catch(() => {});
});

// ─────────────────────────────────────────────────────────────────────────────
// APP LIFECYCLE
// ─────────────────────────────────────────────────────────────────────────────
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
