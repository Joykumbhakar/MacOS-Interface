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
