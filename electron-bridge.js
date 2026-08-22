/**
 * electron-bridge.js
 *
 * Loaded only when running inside Electron (detected by presence of
 * window.require). Reads real local files via IPC and injects them into
 * the Finder FS and the Music library — while keeping all built-in
 * mock files intact.
 */
(async function () {
    // Only run inside Electron
    if (typeof window === 'undefined' || !window.process || !window.process.versions || !window.process.versions.electron) {
        return;
    }

    const { ipcRenderer } = require('electron');

    // ─────────────────────────────────────────────────────────────────────────
    // WAIT FOR FINDER TO INITIALIZE
    // ─────────────────────────────────────────────────────────────────────────
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

        // ─────────────────────────────────────────────────────────────────
        // FETCH LOCAL FILE SYSTEM FROM MAIN PROCESS
        // ─────────────────────────────────────────────────────────────────
        const { allNodes, folderPatch, musicFiles, username } = await ipcRenderer.invoke('get-local-fs');

        // ─────────────────────────────────────────────────────────────────
        // INJECT INTO FINDER FS
        // ─────────────────────────────────────────────────────────────────

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
        }

        // 4. Update the username in the sidebar (Ashley -> real username)
        if (window.FS['user-ashley']) {
            window.FS['user-ashley'].name = username || 'Me';
        }

        // ─────────────────────────────────────────────────────────────────
        // INJECT INTO MUSIC APP
        // ─────────────────────────────────────────────────────────────────
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

        // ─────────────────────────────────────────────────────────────────
        // ADD "Add Folder" BUTTON TO FINDER SIDEBAR
        // ─────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// AUTO-UPDATE NOTIFICATION SYSTEM
// Listens for update events from main.js and shows a native macOS-style
// notification banner with Download / Install & Restart / Dismiss actions.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
    if (typeof window === 'undefined' || !window.process || !window.process.versions || !window.process.versions.electron) return;

    const { ipcRenderer } = require('electron');

    // ── Inject styles ─────────────────────────────────────────────────────────
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
            font-family: -apple-system, 'SF Pro Text', sans-serif;
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

    // ── Banner helpers ────────────────────────────────────────────────────────
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

    // ── Handle update events from main process ────────────────────────────────
    ipcRenderer.on('update-status', (_, info) => {
        if (info.type === 'available') {
            const banner = createBanner(`
                <button class="update-banner-dismiss" title="Dismiss">&#x2715;</button>
                <div class="update-banner-header">
                    <div class="update-banner-icon">${iconSVG()}</div>
                    <div>
                        <div class="update-banner-title">Update Available — v${info.version}</div>
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
                if (label) label.textContent  = `${info.percent}% · ${info.speed}`;
            } else {
                createBanner(`
                    <div class="update-banner-header">
                        <div class="update-banner-icon">${iconSVG()}</div>
                        <div>
                            <div class="update-banner-title">Downloading Update…</div>
                            <div class="update-banner-sub">Please wait while the update is downloaded.</div>
                        </div>
                    </div>
                    <div class="update-progress-bar-wrap">
                        <div class="update-progress-bar-fill" style="width:${info.percent}%"></div>
                    </div>
                    <div class="update-progress-label">${info.percent}% · ${info.speed}</div>
                `);
            }
            // Replace actions if they still exist
            const actionsEl = document.querySelector('#electron-update-banner .update-banner-actions');
            if (actionsEl) {
                actionsEl.outerHTML = `
                    <div class="update-progress-bar-wrap">
                        <div class="update-progress-bar-fill" style="width:${info.percent}%"></div>
                    </div>
                    <div class="update-progress-label">${info.percent}% · ${info.speed}</div>
                `;
            }
        }

        if (info.type === 'downloaded') {
            const banner = createBanner(`
                <button class="update-banner-dismiss" title="Dismiss">&#x2715;</button>
                <div class="update-banner-header">
                    <div class="update-banner-icon" style="background:linear-gradient(135deg,#34c759,#30d158)">${iconSVG()}</div>
                    <div>
                        <div class="update-banner-title">Ready to Install — v${info.version}</div>
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
