/**
 * electron-bridge.js
 *
 * Loaded only when running inside Electron (detected by presence of
 * window.require). Reads real local files via IPC and injects them into
 * the Finder FS and the Music library � while keeping all built-in
 * mock files intact.
 */
(async function () {
    // Only run inside Electron
    if (typeof window === 'undefined' || !window.process || !window.process.versions || !window.process.versions.electron) {
        return;
    }

    const { ipcRenderer } = require('electron');

    // -------------------------------------------------------------------------
    // WAIT FOR FINDER TO INITIALIZE
    // -------------------------------------------------------------------------
    function waitFor(fn, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
                const result = fn();
                if (result) { resolve(result); return; }
                if (Date.now() - start > timeout) { reject(new Error('waitFor timed out')); return; }
                setTimeout(check, 100);
            };
            check();
        });
    }

    try {
        // Wait until Finder's global FS is available
        await waitFor(() => window.FS && typeof window.FS === 'object');

        // -----------------------------------------------------------------
        // FETCH LOCAL FILE SYSTEM FROM MAIN PROCESS
        // -----------------------------------------------------------------
        const { allNodes, folderPatch, musicFiles, username } = await ipcRenderer.invoke('get-local-fs');

        // -----------------------------------------------------------------
        // FETCH SYSTEM INFO FOR SETTINGS APP
        // -----------------------------------------------------------------
        window.MacSystemInfo   = await ipcRenderer.invoke('system-info').catch(() => ({}));
        window.MacDiskInfo     = await ipcRenderer.invoke('disk-info').catch(() => ({}));
        window.MacNetworkStatus = await ipcRenderer.invoke('network-status').catch(() => ({ online: true }));

        // -----------------------------------------------------------------
        // INJECT INTO FINDER FS
        // -----------------------------------------------------------------

        // 1. Merge all new nodes into the global FS
        Object.assign(window.FS, allNodes);

        // 2. Add a "Local Files" top-level section in the sidebar
        if (!window.FS['local-root']) {
            window.FS['local-root'] = {
                id:       'local-root',
                name:     username || 'Local Files',
                type:     'folder',
                icon:     'folder-blue',
                parent:   null,
                children: [],
                isLocal:  true,
            };
        }

        // 3. Inject real children into standard Finder folders
        //    (Desktop, Documents, Downloads, Pictures, Music, Videos)
        for (const [fsId, newChildIds] of Object.entries(folderPatch)) {
            if (!window.FS[fsId]) continue;
            if (!window.FS[fsId].children) window.FS[fsId].children = [];
            // Prepend real children before mock children so they appear first
            window.FS[fsId].children = [...newChildIds, ...window.FS[fsId].children];
            if (fsId === 'desktop') { const desktopContainer = document.getElementById('desktop-icons-container'); if (desktopContainer) { newChildIds.forEach(childId => { const node = window.FS[childId]; if (!node) return; const div = document.createElement('div'); div.className = 'desktop-item'; div.setAttribute('data-id', node.id); if (node.type === 'folder') { div.setAttribute('data-target', node.id); } let iconSrc = 'images/Icons/File.png'; if (node.icon === 'folder-blue' || node.type === 'folder') iconSrc = 'images/Icons/Dev Tools Icons/folder.png'; else if (node.isAudio) iconSrc = 'images/Icons/AudioFile.png'; else if (node.isVideo) iconSrc = 'images/Icons/VideoFile.png'; else if (node.icon === 'image-file') iconSrc = 'images/Icons/ImageFile.png'; else if (node.icon === 'doc-text') iconSrc = 'images/Icons/TextFile.png'; div.innerHTML = '<img src="' + iconSrc + '" onerror="this.src=''images/Icons/File.png''" alt="' + node.name + '"><span>' + node.name + '</span>'; desktopContainer.appendChild(div); }); if (window.DesktopIcons) { window.DesktopIcons.init(); if (typeof window.DesktopIcons.applySavedOrInitialPositions === 'function') { window.DesktopIcons.applySavedOrInitialPositions(); } } } }
        }

        // 4. Update the username in the sidebar (Ashley -> real username)
        if (window.FS['user-ashley']) {
            window.FS['user-ashley'].name = username || 'Me';
        }

        // -----------------------------------------------------------------
        // INJECT INTO MUSIC APP
        // -----------------------------------------------------------------
        if (musicFiles && musicFiles.length > 0) {
            const localTracks = musicFiles.map((node, i) => ({
                id:         'local-track-' + i,
                title:      node.name.replace(/\.[^.]+$/, ''), // strip extension
                artist:     'Local File',
                album:      'My Music',
                duration:   0,
                // Music app checks currentTrack.url || currentTrack.previewUrl
                url:        node.localUrl,
                previewUrl: node.localUrl,
                cover:      null,
                isLocal:    true,
                realPath:   node.realPath,
            }));

            window.__localMusicFiles = localTracks;

            // If APPLE_MUSIC_DATA is already loaded, inject now
            function injectIntoMusicData() {
                if (window.APPLE_MUSIC_DATA && window.APPLE_MUSIC_DATA.songs) {
                    // Add a "Local Files" section header track (visual separator)
                    window.APPLE_MUSIC_DATA.songs = [
                        ...window.APPLE_MUSIC_DATA.songs,
                        ...localTracks,
                    ];
                    console.log(`[Electron Bridge] Injected ${localTracks.length} local tracks into Music library.`);
                    return true;
                }
                return false;
            }

            // If already ready inject immediately, otherwise wait
            if (!injectIntoMusicData()) {
                window.__musicBridgeReady = (tracks) => {
                    if (window.APPLE_MUSIC_DATA && window.APPLE_MUSIC_DATA.songs) {
                        window.APPLE_MUSIC_DATA.songs = [
                            ...window.APPLE_MUSIC_DATA.songs,
                            ...tracks,
                        ];
                    }
                };
                // Also try after a delay
                setTimeout(injectIntoMusicData, 2000);
                setTimeout(injectIntoMusicData, 5000);
            }
        }

        // -----------------------------------------------------------------
        // ADD "Add Folder" BUTTON TO FINDER SIDEBAR
        // -----------------------------------------------------------------
        function injectAddFolderButton() {
            const sidebar = document.querySelector('.finder-sidebar');
            if (!sidebar || document.getElementById('electron-add-folder')) return;

            const btn = document.createElement('div');
            btn.id = 'electron-add-folder';
            btn.style.cssText = `
                display: flex; align-items: center; gap: 6px;
                padding: 4px 12px; margin-top: 8px; cursor: pointer;
                font-size: 11px; color: #0a84ff; border-radius: 6px;
                transition: background 0.15s;
            `;
            btn.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Folder...
            `;
            btn.addEventListener('mouseover', () => btn.style.background = 'rgba(10,132,255,0.08)');
            btn.addEventListener('mouseout',  () => btn.style.background = '');
            btn.addEventListener('click', async () => {
                const result = await ipcRenderer.invoke('open-folder-dialog');
                if (!result) return;

                const { nodes, rootNode, musicFiles: newMusic } = result;

                // Merge into global FS
                Object.assign(window.FS, nodes);

                // Add to sidebar local-root
                if (!window.FS['local-root'].children.includes(rootNode.id)) {
                    window.FS['local-root'].children.push(rootNode.id);
                }

                // Add new audio to local music
                if (newMusic && newMusic.length > 0 && window.__localMusicFiles) {
                    const offset = window.__localMusicFiles.length;
                    const newTracks = newMusic.map((node, i) => ({
                        id:       'local-track-' + (offset + i),
                        title:    node.name.replace(/\.[^.]+$/, ''),
                        artist:   'Local File',
                        album:    rootNode.name,
                        duration: 0,
                        src:      node.localUrl,
                        cover:    null,
                        isLocal:  true,
                        realPath: node.realPath,
                    }));
                    window.__localMusicFiles.push(...newTracks);
                    if (window.__musicBridgeReady) {
                        window.__musicBridgeReady(window.__localMusicFiles);
                    }
                }

                // Re-render the Finder if it is open
                if (window.Finder && window.Finder.navigate) {
                    window.Finder.navigate('local-root');
                }

                console.log('[Electron Bridge] Added folder:', rootNode.name, 'with', Object.keys(nodes).length, 'items');
            });

            sidebar.appendChild(btn);
        }

        // Wait a tick for Finder to render before injecting the button
        setTimeout(injectAddFolderButton, 1500);

        // Re-render Finder to show newly injected files
        if (window.Finder && window.Finder.navigate) {
            window.Finder.navigate(window.Finder.state ? window.Finder.state.currentPath[window.Finder.state.currentPath.length - 1] : 'desktop');
        }

        console.log(
            `[Electron Bridge] Injected ${Object.keys(allNodes).length} local file/folder nodes into Finder.`,
            `Found ${musicFiles.length} local audio tracks.`
        );

    } catch (err) {
        console.warn('[Electron Bridge] Could not load local files:', err.message);
    }
})();

// -----------------------------------------------------------------------------
// AUTO-UPDATE NOTIFICATION SYSTEM
// Listens for update events from main.js and shows a native Apple OS-style
// notification banner with Download / Install & Restart / Dismiss actions.
// -----------------------------------------------------------------------------
(function () {
    if (typeof window === 'undefined' || !window.process || !window.process.versions || !window.process.versions.electron) return;

    const { ipcRenderer } = require('electron');

    // -- Inject styles ---------------------------------------------------------
    const style = document.createElement('style');
    style.textContent = `
        #electron-update-banner {
            position: fixed;
            bottom: 28px;
            right: 24px;
            width: 340px;
            background: rgba(255,255,255,0.82);
            backdrop-filter: blur(28px) saturate(180%);
            -webkit-backdrop-filter: blur(28px) saturate(180%);
            border: 0.5px solid rgba(0,0,0,0.12);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08);
            padding: 16px 18px 14px;
            z-index: 999999;
            font-family: -apple-system, sans-serif;
            display: flex;
            flex-direction: column;
            gap: 10px;
            animation: update-slide-in 0.4s cubic-bezier(0.16,1,0.3,1);
            transform-origin: bottom right;
        }
        #electron-update-banner.hiding {
            animation: update-slide-out 0.3s cubic-bezier(0.4,0,1,1) forwards;
        }
        @keyframes update-slide-in {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
        @keyframes update-slide-out {
            from { opacity: 1; transform: translateY(0)  scale(1); }
            to   { opacity: 0; transform: translateY(16px) scale(0.95); }
        }
        .update-banner-header {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .update-banner-icon {
            width: 36px; height: 36px; border-radius: 8px;
            background: linear-gradient(135deg, #1d62f0, #0a84ff);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .update-banner-title {
            font-size: 13px; font-weight: 600; color: #1d1d1f; line-height: 1.3;
        }
        .update-banner-sub {
            font-size: 11.5px; color: #6e6e73; line-height: 1.4; margin-top: 1px;
        }
        .update-banner-dismiss {
            position: absolute; top: 10px; right: 12px;
            width: 20px; height: 20px; border-radius: 50%;
            background: rgba(0,0,0,0.08);
            border: none; cursor: pointer; display: flex;
            align-items: center; justify-content: center;
            font-size: 11px; color: #6e6e73;
            transition: background 0.15s;
        }
        .update-banner-dismiss:hover { background: rgba(0,0,0,0.15); }
        .update-banner-actions {
            display: flex; gap: 8px; margin-top: 2px;
        }
        .update-btn {
            flex: 1; padding: 7px 0; border-radius: 9px;
            border: none; cursor: pointer; font-size: 12px;
            font-weight: 500; font-family: inherit;
            transition: opacity 0.15s, transform 0.1s;
        }
        .update-btn:active { transform: scale(0.97); }
        .update-btn-primary {
            background: #0a84ff; color: #fff;
        }
        .update-btn-primary:hover { opacity: 0.88; }
        .update-btn-secondary {
            background: rgba(0,0,0,0.06); color: #1d1d1f;
        }
        .update-btn-secondary:hover { background: rgba(0,0,0,0.1); }
        .update-progress-bar-wrap {
            height: 4px; background: rgba(0,0,0,0.08); border-radius: 2px; overflow: hidden;
        }
        .update-progress-bar-fill {
            height: 100%; background: #0a84ff; border-radius: 2px;
            transition: width 0.3s ease; width: 0%;
        }
        .update-progress-label {
            font-size: 11px; color: #6e6e73; text-align: right;
        }
    `;
    document.head.appendChild(style);

    // -- Banner helpers --------------------------------------------------------
    function removeBanner() {
        const el = document.getElementById('electron-update-banner');
        if (!el) return;
        el.classList.add('hiding');
        setTimeout(() => el.remove(), 300);
    }

    function createBanner(innerHTML) {
        removeBanner();
        const div = document.createElement('div');
        div.id = 'electron-update-banner';
        div.innerHTML = innerHTML;
        document.body.appendChild(div);

        const dismiss = div.querySelector('.update-banner-dismiss');
        if (dismiss) dismiss.addEventListener('click', removeBanner);
        return div;
    }

    function iconSVG() {
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
            <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
        </svg>`;
    }

    // -- Handle update events from main process --------------------------------
    ipcRenderer.on('update-status', (_, info) => {
        if (info.type === 'available') {
            const banner = createBanner(`
                <button class="update-banner-dismiss" title="Dismiss">&#x2715;</button>
                <div class="update-banner-header">
                    <div class="update-banner-icon">${iconSVG()}</div>
                    <div>
                        <div class="update-banner-title">Update Available � v${info.version}</div>
                        <div class="update-banner-sub">${String(info.notes).replace(/<[^>]+>/g, '').slice(0, 80)}</div>
                    </div>
                </div>
                <div class="update-banner-actions">
                    <button class="update-btn update-btn-primary" id="update-download-btn">Download Update</button>
                    <button class="update-btn update-btn-secondary" id="update-later-btn">Later</button>
                </div>
            `);
            banner.querySelector('#update-download-btn').addEventListener('click', () => {
                ipcRenderer.invoke('update-download');
            });
            banner.querySelector('#update-later-btn').addEventListener('click', removeBanner);
        }

        if (info.type === 'downloading') {
            const existing = document.getElementById('electron-update-banner');
            if (existing) {
                const fill  = existing.querySelector('.update-progress-bar-fill');
                const label = existing.querySelector('.update-progress-label');
                if (fill)  fill.style.width  = info.percent + '%';
                if (label) label.textContent  = `${info.percent}% � ${info.speed}`;
            } else {
                createBanner(`
                    <div class="update-banner-header">
                        <div class="update-banner-icon">${iconSVG()}</div>
                        <div>
                            <div class="update-banner-title">Downloading Update�</div>
                            <div class="update-banner-sub">Please wait while the update is downloaded.</div>
                        </div>
                    </div>
                    <div class="update-progress-bar-wrap">
                        <div class="update-progress-bar-fill" style="width:${info.percent}%"></div>
                    </div>
                    <div class="update-progress-label">${info.percent}% � ${info.speed}</div>
                `);
            }
            // Replace actions if they still exist
            const actionsEl = document.querySelector('#electron-update-banner .update-banner-actions');
            if (actionsEl) {
                actionsEl.outerHTML = `
                    <div class="update-progress-bar-wrap">
                        <div class="update-progress-bar-fill" style="width:${info.percent}%"></div>
                    </div>
                    <div class="update-progress-label">${info.percent}% � ${info.speed}</div>
                `;
            }
        }

        if (info.type === 'downloaded') {
            const banner = createBanner(`
                <button class="update-banner-dismiss" title="Dismiss">&#x2715;</button>
                <div class="update-banner-header">
                    <div class="update-banner-icon" style="background:linear-gradient(135deg,#34c759,#30d158)">${iconSVG()}</div>
                    <div>
                        <div class="update-banner-title">Ready to Install � v${info.version}</div>
                        <div class="update-banner-sub">The update has been downloaded. Restart to apply it.</div>
                    </div>
                </div>
                <div class="update-banner-actions">
                    <button class="update-btn update-btn-primary" id="update-install-btn">Install &amp; Restart</button>
                    <button class="update-btn update-btn-secondary" id="update-later-btn">Later</button>
                </div>
            `);
            banner.querySelector('#update-install-btn').addEventListener('click', () => {
                ipcRenderer.invoke('update-install');
            });
            banner.querySelector('#update-later-btn').addEventListener('click', removeBanner);
        }

        if (info.type === 'error') {
            console.warn('[Electron Updater] Error:', info.message);
        }
    });
})();

// -----------------------------------------------------------------------------
// LOCAL MUSIC LIBRARY SYSTEM
// Full local music folder management, scanning, and playback integration.
// Injects a "Local Library" tab into the Music app with folder settings.
// -----------------------------------------------------------------------------
(function () {
    if (typeof window === 'undefined' || !window.process || !window.process.versions || !window.process.versions.electron) return;

    const { ipcRenderer } = require('electron');

    // State
    let localTracks  = [];
    let localFolders = [];
    let currentLocalTrack = null;
    let localAudio   = null; // Dedicated Audio element for local files
    let isLocalPlaying = false;

    // -- Audio Engine ------------------------------------------------------------
    function getLocalAudio() {
        if (!localAudio) {
            localAudio = new Audio();
            localAudio.volume = window.systemVolume !== undefined ? window.systemVolume : 0.8;
            window.addEventListener('system-volume-changed', (e) => { if (localAudio) localAudio.volume = e.detail; });
            localAudio.addEventListener('ended', () => {
                const idx = localTracks.findIndex(t => t.id === currentLocalTrack?.id);
                if (idx !== -1 && idx + 1 < localTracks.length) {
                    playLocalTrack(localTracks[idx + 1]);
                } else {
                    isLocalPlaying = false;
                    updateLocalUI();
                }
            });
            localAudio.addEventListener('timeupdate', () => {
                const bar  = document.getElementById('local-progress-bar-fill');
                const time = document.getElementById('local-current-time');
                const dur  = document.getElementById('local-duration');
                if (!localAudio.duration) return;
                const pct = (localAudio.currentTime / localAudio.duration) * 100;
                if (bar)  bar.style.width = pct + '%';
                if (time) time.textContent = fmt(localAudio.currentTime);
                if (dur)  dur.textContent  = fmt(localAudio.duration);
                // Sync Dynamic Island
                if (window.MacIsland && currentLocalTrack) {
                    window.MacIsland.media(
                        currentLocalTrack.title, currentLocalTrack.artist || 'Local File',
                        isLocalPlaying, null,
                        fmt(localAudio.currentTime), fmt(localAudio.duration),
                        Math.round(pct), '-' + fmt(localAudio.duration - localAudio.currentTime)
                    );
                }
            });
            localAudio.addEventListener('error', (e) => {
                console.warn('[Local Audio] Error playing:', localAudio.src, e);
                showLocalToast('Could not play this file. Format may not be supported.');
            });
        }
        return localAudio;
    }

    function fmt(secs) {
        if (!secs || isNaN(secs)) return '0:00';
        const m = Math.floor(secs / 60), s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function playLocalTrack(track) {
        const audio = getLocalAudio();
        // Pause any built-in Music app playback first
        const amAudio = document.querySelector('#music-window audio');
        if (amAudio) amAudio.pause();

        currentLocalTrack = track;
        isLocalPlaying = true;
        audio.src = track.url || track.previewUrl;
        audio.play().catch(err => {
            console.warn('[Local Audio] Play failed:', err.message);
            showLocalToast('Playback error: ' + err.message);
        });
        updateLocalUI();
        renderTrackList();
    }

    function toggleLocalPlay() {
        const audio = getLocalAudio();
        if (isLocalPlaying) {
            audio.pause();
            isLocalPlaying = false;
        } else {
            audio.play().catch(() => {});
            isLocalPlaying = true;
        }
        updateLocalUI();
    }

    function skipLocalTrack(dir) {
        const idx = localTracks.findIndex(t => t.id === currentLocalTrack?.id);
        const next = idx + dir;
        if (next >= 0 && next < localTracks.length) playLocalTrack(localTracks[next]);
    }

    function seekLocal(e) {
        const audio = getLocalAudio();
        if (!audio.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        audio.currentTime = pct * audio.duration;
    }

    // -- Toast --------------------------------------------------------------------
    function showLocalToast(msg) {
        const t = document.createElement('div');
        t.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
            background:rgba(0,0,0,0.75);color:#fff;padding:8px 16px;border-radius:20px;
            font-size:12px;z-index:999998;pointer-events:none;white-space:nowrap;`;
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }

    // -- Settings Panel Styles ---------------------------------------------------
    const style = document.createElement('style');
    style.textContent = `
        #local-library-panel {
            position: absolute; inset: 0; background: rgba(249,249,249,0.96);
            backdrop-filter: blur(20px); z-index: 200;
            display: flex; flex-direction: column;
            font-family: -apple-system,sans-serif;
            overflow: hidden;
        }
        #local-library-panel.hidden { display: none; }
        .ll-topbar {
            display: flex; align-items: center; gap: 10px;
            padding: 14px 18px 10px; border-bottom: 0.5px solid rgba(0,0,0,0.1);
        }
        .ll-topbar h2 { font-size: 17px; font-weight: 700; color: #1d1d1f; flex: 1; margin: 0; }
        .ll-topbar-btn {
            border: none; cursor: pointer; border-radius: 8px; padding: 6px 12px;
            font-size: 12px; font-weight: 500; font-family: inherit; transition: opacity 0.15s;
        }
        .ll-topbar-btn:hover { opacity: 0.8; }
        .ll-topbar-btn.primary { background: #fa243c; color: #fff; }
        .ll-topbar-btn.settings { background: rgba(0,0,0,0.06); color: #1d1d1f; }
        .ll-body { display: flex; flex: 1; overflow: hidden; }
        .ll-sidebar {
            width: 200px; flex-shrink: 0; border-right: 0.5px solid rgba(0,0,0,0.1);
            display: flex; flex-direction: column; overflow: hidden;
        }
        .ll-sidebar-section { padding: 12px 10px 4px; font-size: 10px; font-weight: 600;
            color: #8e8e93; text-transform: uppercase; letter-spacing: 0.5px; }
        .ll-folder-item {
            display: flex; align-items: center; gap: 6px; padding: 6px 10px;
            font-size: 12px; color: #1d1d1f; cursor: default; border-radius: 6px; margin: 1px 4px;
        }
        .ll-folder-item:hover { background: rgba(0,0,0,0.05); }
        .ll-folder-item span { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ll-folder-remove { font-size: 11px; color: #8e8e93; cursor: pointer; padding: 2px; }
        .ll-folder-remove:hover { color: #fa243c; }
        .ll-add-folder-btn {
            margin: 6px 8px; padding: 7px 10px; border-radius: 8px;
            border: 1.5px dashed #0a84ff; background: none; color: #0a84ff;
            font-size: 12px; cursor: pointer; font-family: inherit; font-weight: 500;
            transition: background 0.15s;
        }
        .ll-add-folder-btn:hover { background: rgba(10,132,255,0.06); }
        .ll-search-wrap { padding: 10px 14px 6px; }
        .ll-search { width: 100%; padding: 7px 10px; border-radius: 8px; border: none;
            background: rgba(0,0,0,0.07); font-size: 12px; font-family: inherit; outline: none; box-sizing: border-box; }
        .ll-track-list { flex: 1; overflow-y: auto; padding: 4px 0; }
        .ll-track-list::-webkit-scrollbar { width: 4px; }
        .ll-track-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 2px; }
        .ll-track-row {
            display: grid; grid-template-columns: 28px 1fr 110px 55px 52px; align-items: center;
            gap: 6px; padding: 5px 14px; cursor: pointer; border-radius: 6px; margin: 1px 6px;
            transition: background 0.1s;
        }
        .ll-track-row:hover { background: rgba(0,0,0,0.05); }
        .ll-track-row.active { background: rgba(250,36,60,0.07); }
        .ll-track-num { font-size: 11px; color: #8e8e93; text-align: right; }
        .ll-track-info { overflow: hidden; }
        .ll-track-title { font-size: 12px; font-weight: 500; color: #1d1d1f; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ll-track-title.playing { color: #fa243c; }
        .ll-track-sub { font-size: 10.5px; color: #8e8e93; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ll-track-album { font-size: 11px; color: #8e8e93; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ll-track-ext { font-size: 10px; color: #8e8e93; text-align: center; }
        .ll-track-dur { font-size: 11px; color: #8e8e93; text-align: right; }
        .ll-table-header {
            display: grid; grid-template-columns: 28px 1fr 110px 55px 52px; align-items: center;
            gap: 6px; padding: 4px 14px; margin: 0 6px;
            border-bottom: 0.5px solid rgba(0,0,0,0.08); margin-bottom: 4px;
        }
        .ll-th { font-size: 10px; font-weight: 600; color: #8e8e93; text-transform: uppercase; letter-spacing: 0.4px; }
        .ll-th:last-child { text-align: right; }
        .ll-now-playing {
            border-top: 0.5px solid rgba(0,0,0,0.1);
            padding: 10px 14px; display: flex; align-items: center; gap: 12px;
            background: rgba(255,255,255,0.8);
        }
        .ll-np-controls { display: flex; align-items: center; gap: 10px; }
        .ll-np-btn { background: none; border: none; cursor: pointer; padding: 4px; color: #1d1d1f; border-radius: 6px; }
        .ll-np-btn:hover { background: rgba(0,0,0,0.07); }
        .ll-np-info { flex: 1; overflow: hidden; }
        .ll-np-title { font-size: 12px; font-weight: 600; color: #1d1d1f; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ll-np-artist { font-size: 10.5px; color: #8e8e93; }
        .ll-np-progress { display: flex; flex-direction: column; gap: 3px; width: 160px; flex-shrink: 0; }
        .ll-np-bar-wrap { height: 3px; background: rgba(0,0,0,0.1); border-radius: 2px; cursor: pointer; }
        .ll-np-bar-fill { height: 100%; background: #fa243c; border-radius: 2px; width: 0%; transition: width 0.5s linear; }
        .ll-np-times { display: flex; justify-content: space-between; font-size: 9.5px; color: #8e8e93; }
        .ll-empty { display: flex; flex-direction: column; align-items: center; justify-content: center;
            height: 200px; color: #8e8e93; gap: 8px; text-align: center; padding: 20px; }
        .ll-empty-title { font-size: 14px; font-weight: 600; color: #3c3c43; }
        .ll-empty-sub { font-size: 12px; color: #8e8e93; }
    `;
    document.head.appendChild(style);

    // -- Build Panel HTML ---------------------------------------------------------
    function buildPanel() {
        const panel = document.createElement('div');
        panel.id = 'local-library-panel';
        panel.className = 'hidden';
        panel.innerHTML = `
            <div class="ll-topbar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fa243c" stroke-width="2" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                <h2>Local Library</h2>
                <button class="ll-topbar-btn settings" id="ll-settings-toggle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px;margin-right:4px;"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 0-14.14 0M4.93 19.07a10 10 0 0 0 14.14 0"/></svg>
                    Folders
                </button>
                <button class="ll-topbar-btn settings" id="ll-close-btn" style="padding:6px 8px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
            <div class="ll-body">
                <div class="ll-sidebar" id="ll-sidebar">
                    <div class="ll-sidebar-section">Music Folders</div>
                    <div id="ll-folder-list"></div>
                    <button class="ll-add-folder-btn" id="ll-add-folder-btn">+ Add Folder</button>
                    <div style="flex:1;"></div>
                    <div style="padding:10px;font-size:10px;color:#8e8e93;border-top:0.5px solid rgba(0,0,0,0.08);" id="ll-stats"></div>
                </div>
                <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
                    <div class="ll-search-wrap">
                        <input class="ll-search" id="ll-search" type="search" placeholder="Search songs, artists, albums�">
                    </div>
                    <div class="ll-table-header">
                        <div class="ll-th">#</div>
                        <div class="ll-th">Title</div>
                        <div class="ll-th">Album / Folder</div>
                        <div class="ll-th" style="text-align:center;">Type</div>
                        <div class="ll-th" style="text-align:right;">Duration</div>
                    </div>
                    <div class="ll-track-list" id="ll-track-list"></div>
                </div>
            </div>
            <div class="ll-now-playing" id="ll-now-playing">
                <div class="ll-np-controls">
                    <button class="ll-np-btn" id="ll-prev-btn" title="Previous">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" stroke-width="2" fill="none"/></svg>
                    </button>
                    <button class="ll-np-btn" id="ll-play-btn" title="Play / Pause" style="background:rgba(0,0,0,0.07);border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" id="ll-play-icon"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </button>
                    <button class="ll-np-btn" id="ll-next-btn" title="Next">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2" fill="none"/></svg>
                    </button>
                </div>
                <div class="ll-np-info">
                    <div class="ll-np-title" id="ll-np-title">No track selected</div>
                    <div class="ll-np-artist" id="ll-np-artist">Select a song to start playing</div>
                </div>
                <div class="ll-np-progress">
                    <div class="ll-np-bar-wrap" id="ll-progress-bar" style="cursor:pointer;">
                        <div class="ll-np-bar-fill" id="local-progress-bar-fill"></div>
                    </div>
                    <div class="ll-np-times">
                        <span id="local-current-time">0:00</span>
                        <span id="local-duration">0:00</span>
                    </div>
                </div>
            </div>
        `;
        return panel;
    }

    // -- Render Folder List ------------------------------------------------------
    function renderFolderList() {
        const list = document.getElementById('ll-folder-list');
        if (!list) return;
        list.innerHTML = localFolders.map(f => `
            <div class="ll-folder-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                <span title="${f}">${f.split(/[\\/]/).pop()}</span>
                <span class="ll-folder-remove" data-path="${f}" title="Remove">&#x2715;</span>
            </div>
        `).join('');

        list.querySelectorAll('.ll-folder-remove').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const fp = btn.dataset.path;
                const res = await ipcRenderer.invoke('music-remove-folder', fp);
                localFolders = res.allFolders;
                localTracks  = localTracks.filter(t => !t.localPath || !t.localPath.startsWith(fp));
                renderFolderList();
                renderTrackList();
                updateStats();
            });
        });
    }

    // -- Render Track List -------------------------------------------------------
    function renderTrackList() {
        const list   = document.getElementById('ll-track-list');
        const search = (document.getElementById('ll-search') || {}).value || '';
        if (!list) return;

        const query    = search.toLowerCase();
        const filtered = query
            ? localTracks.filter(t =>
                (t.title || '').toLowerCase().includes(query) ||
                (t.artist || '').toLowerCase().includes(query) ||
                (t.album || '').toLowerCase().includes(query))
            : localTracks;

        if (!filtered.length) {
            list.innerHTML = `<div class="ll-empty">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                <div class="ll-empty-title">${localTracks.length ? 'No results for "' + search + '"' : 'No audio files found'}</div>
                <div class="ll-empty-sub">${localTracks.length ? 'Try a different search.' : 'Click "+ Add Folder" to select a music folder.'}</div>
            </div>`;
            return;
        }

        list.innerHTML = filtered.map((track, idx) => `
            <div class="ll-track-row ${currentLocalTrack && currentLocalTrack.id === track.id ? 'active' : ''}" data-id="${track.id}">
                <div class="ll-track-num">${currentLocalTrack && currentLocalTrack.id === track.id && isLocalPlaying
                    ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="#fa243c"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
                    : (idx + 1)}</div>
                <div class="ll-track-info">
                    <div class="ll-track-title ${currentLocalTrack && currentLocalTrack.id === track.id ? 'playing' : ''}">${track.title}</div>
                    <div class="ll-track-sub">${track.artist || 'Unknown Artist'}</div>
                </div>
                <div class="ll-track-album">${track.album || '�'}</div>
                <div class="ll-track-ext"><span style="background:rgba(0,0,0,0.07);padding:2px 5px;border-radius:4px;font-size:9px;">${(track.ext || 'mp3').toUpperCase()}</span></div>
                <div class="ll-track-dur">${track.duration || '�'}</div>
            </div>
        `).join('');

        list.querySelectorAll('.ll-track-row').forEach(row => {
            row.addEventListener('click', () => {
                const track = filtered.find(t => t.id === row.dataset.id);
                if (track) {
                    if (currentLocalTrack && currentLocalTrack.id === track.id) {
                        toggleLocalPlay();
                    } else {
                        playLocalTrack(track);
                    }
                }
            });
        });
    }

    function updateLocalUI() {
        const npTitle  = document.getElementById('ll-np-title');
        const npArtist = document.getElementById('ll-np-artist');
        const playIcon = document.getElementById('ll-play-icon');
        if (npTitle  && currentLocalTrack) npTitle.textContent  = currentLocalTrack.title;
        if (npArtist && currentLocalTrack) npArtist.textContent = currentLocalTrack.artist || currentLocalTrack.album || 'Local File';
        if (playIcon) {
            playIcon.innerHTML = isLocalPlaying
                ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
                : '<polygon points="5 3 19 12 5 21 5 3"/>';
        }
        renderTrackList();
    }

    function updateStats() {
        const el = document.getElementById('ll-stats');
        if (el) el.textContent = `${localTracks.length} songs � ${localFolders.length} folder${localFolders.length !== 1 ? 's' : ''}`;
    }

    // -- Attach Panel to Music Window --------------------------------------------
    async function attachLocalLibrary() {
        const musicWin = document.getElementById('music-window');
        if (!musicWin) return;

        const reactRoot = musicWin.querySelector('#music-react-root');
        if (!reactRoot) return;

        const panel = buildPanel();
        reactRoot.style.position = 'relative';
        reactRoot.appendChild(panel);

        // Wire close button
        document.getElementById('ll-close-btn').addEventListener('click', () => {
            panel.classList.add('hidden');
        });

        // Wire play/pause, prev, next
        document.getElementById('ll-play-btn').addEventListener('click', () => {
            if (!currentLocalTrack && localTracks.length) playLocalTrack(localTracks[0]);
            else toggleLocalPlay();
        });
        document.getElementById('ll-prev-btn').addEventListener('click', () => skipLocalTrack(-1));
        document.getElementById('ll-next-btn').addEventListener('click', () => skipLocalTrack(1));

        // Wire seek bar
        document.getElementById('ll-progress-bar').addEventListener('click', seekLocal);

        // Wire search
        document.getElementById('ll-search').addEventListener('input', renderTrackList);

        // Wire folder management
        document.getElementById('ll-add-folder-btn').addEventListener('click', async () => {
            const res = await ipcRenderer.invoke('music-add-folder');
            if (!res) return;
            localFolders = res.allFolders;
            // Deduplicate and merge
            const existingIds = new Set(localTracks.map(t => t.id));
            localTracks.push(...res.audioFiles.filter(t => !existingIds.has(t.id)));
            renderFolderList();
            renderTrackList();
            updateStats();
            showLocalToast(`Added ${res.audioFiles.length} songs from "${res.folderPath.split(/[\\/]/).pop()}"`);
        });

        // Load saved settings and scan
        const settings = await ipcRenderer.invoke('music-get-settings');
        const scanResult = await ipcRenderer.invoke('music-scan-all');
        localFolders = scanResult.folders;
        localTracks  = scanResult.audioFiles;
        renderFolderList();
        renderTrackList();
        updateStats();
    }

    // -- Inject "Local Library" button into Music sidebar -----------------------
    function injectSidebarButton() {
        const musicWin = document.getElementById('music-window');
        if (!musicWin) return;

        const sidebarNavItems = musicWin.querySelectorAll('.am-nav-item');
        if (!sidebarNavItems.length) return;
        if (document.getElementById('local-library-btn')) return;

        // Find sidebar nav container
        const navContainer = sidebarNavItems[0].parentElement;
        if (!navContainer) return;

        // Add separator
        const sep = document.createElement('div');
        sep.style.cssText = 'height:0.5px;background:rgba(0,0,0,0.08);margin:8px 10px;';
        navContainer.appendChild(sep);

        const btn = document.createElement('div');
        btn.id = 'local-library-btn';
        btn.className = 'am-nav-item';
        btn.style.cssText = 'display:flex;align-items:center;gap:8px;cursor:pointer;';
        btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
            </svg>
            Local Library
        `;
        btn.addEventListener('click', () => {
            const panel = document.getElementById('local-library-panel');
            if (panel) panel.classList.remove('hidden');
        });
        navContainer.appendChild(btn);
    }

    // -- Init --------------------------------------------------------------------
    // Wait for the Music window and React app to render
    let retries = 0;
    const tryInit = setInterval(async () => {
        const musicWin  = document.getElementById('music-window');
        const reactRoot = musicWin && musicWin.querySelector('#music-react-root');
        if (reactRoot && retries < 30) {
            clearInterval(tryInit);
            await attachLocalLibrary();
            injectSidebarButton();

            // Also inject tracks into APPLE_MUSIC_DATA for the built-in player
            if (window.APPLE_MUSIC_DATA && localTracks.length) {
                const existingIds = new Set(window.APPLE_MUSIC_DATA.songs.map(s => s.id));
                window.APPLE_MUSIC_DATA.songs.push(...localTracks.filter(t => !existingIds.has(t.id)));
            }
        }
        retries++;
        if (retries >= 30) clearInterval(tryInit);
    }, 500);

    // Re-inject sidebar button if music window is reopened
    window.addEventListener('music-window-opened', () => {
        setTimeout(injectSidebarButton, 300);
    });
})();




