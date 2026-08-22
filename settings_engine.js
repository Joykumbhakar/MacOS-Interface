// ═══════════════════════════════════════════════════════════════════════════
// MacSettings — Live Settings Engine
// Applies every setting change to the actual running UI in real time.
// ═══════════════════════════════════════════════════════════════════════════

const MacSettings = {
    // ── Persisted state ────────────────────────────────────────────────────
    state: JSON.parse(localStorage.getItem('macSettings') || 'null') || {
        appearance:    'light',
        accentColor:   '#0a84ff',
        wallpaper:     'images/Wallpapers/26-Tahoe-Light-6K.jpg',
        lockWallpaper: 'images/Wallpapers/27-Golden-Gate-Dark.jpg',
        lockPassword:  '',
        userName:      'Ashley Rico',
        dockSize:      48,
        dockMagnify:   true,
        dockAutoHide:  false,
        dockPosition:  'bottom',
        outputVolume:  65,
        inputVolume:   80,
        brightness:    85,
        wifiEnabled:   true,
        bluetoothOn:   true,
        doNotDisturb:  false,
        nightShift:    false,
        reduceMotion:  false,
        reduceTransparency: false,
        soundUnlock:   true,
        soundOpen:     true,
        soundClose:    true,
        soundTrash:    true,
        soundMinimize: true,
        soundMaximize: true,
        soundKey:      true,
        soundSlider:   true,
        soundToggle:   true,
        soundTap:      true,
    },

    save() { localStorage.setItem('macSettings', JSON.stringify(this.state)); },

    // ── Apply all settings on boot ─────────────────────────────────────────
    applyAll() {
        // Upgrade legacy default wallpapers from localStorage
        if (this.state.wallpaper === 'images/Wallpapers/27-Golden-Gate.jpg') {
            this.state.wallpaper = 'images/Wallpapers/26-Tahoe-Light-6K.jpg';
        }
        if (this.state.lockWallpaper === 'images/Wallpapers/lockscreen_wallpaper_defualt.jpg') {
            this.state.lockWallpaper = 'images/Wallpapers/27-Golden-Gate-Dark.jpg';
        }
        this.save();

        this.applyAppearance(this.state.appearance);
        this.applyWallpaper(this.state.wallpaper);
        this.applyLockWallpaper(this.state.lockWallpaper);
        this.applyAccentColor(this.state.accentColor);
        this.applyDock();
        this.applyBrightness(this.state.brightness);
    },

    // ── Appearance (Light / Dark / Auto) ───────────────────────────────────
    applyAppearance(mode) {
        this.state.appearance = mode;
        document.documentElement.setAttribute('data-theme', mode);
        const root = document.documentElement;
        if (mode === 'dark') {
            root.style.setProperty('--bg-primary',   '#1c1c1e');
            root.style.setProperty('--bg-secondary',  '#2c2c2e');
            root.style.setProperty('--bg-tertiary',   '#3a3a3c');
            root.style.setProperty('--text-primary',  '#ffffff');
            root.style.setProperty('--text-secondary','#ebebf5');
            root.style.setProperty('--border-color',  'rgba(255,255,255,0.1)');
            root.style.setProperty('--sidebar-bg',    '#1c1c1e');
            root.style.setProperty('--window-bg',     '#2c2c2e');
            document.querySelectorAll('.mac-window').forEach(w => {
                w.style.background = '#2c2c2e';
                w.style.color = '#fff';
            });
            document.querySelectorAll('.settings-sidebar').forEach(s => {
                s.style.background = '#1c1c1e';
            });
            document.querySelectorAll('.set-section').forEach(s => {
                s.style.background = 'rgba(255,255,255,0.06)';
                s.style.borderColor = 'rgba(255,255,255,0.06)';
            });
            document.querySelectorAll('.set-nav-item').forEach(n => {
                n.style.color = '#fff';
            });
            document.querySelectorAll('.set-row').forEach(r => {
                r.style.borderColor = 'rgba(255,255,255,0.06)';
                r.style.color = '#fff';
            });
        } else {
            root.style.setProperty('--bg-primary',   '#f5f5f7');
            root.style.setProperty('--bg-secondary',  '#ffffff');
            root.style.setProperty('--bg-tertiary',   '#f2f2f7');
            root.style.setProperty('--text-primary',  '#1c1c1e');
            root.style.setProperty('--text-secondary','#3c3c43');
            root.style.setProperty('--border-color',  'rgba(0,0,0,0.08)');
            root.style.setProperty('--sidebar-bg',    '#f0f0f2');
            root.style.setProperty('--window-bg',     '#fdfdfd');
            document.querySelectorAll('.mac-window').forEach(w => {
                w.style.background = '#fdfdfd';
                w.style.color = '#111';
            });
            document.querySelectorAll('.settings-sidebar').forEach(s => {
                s.style.background = '#f0f0f2';
            });
            document.querySelectorAll('.set-section').forEach(s => {
                s.style.background = 'white';
                s.style.borderColor = 'rgba(0,0,0,0.05)';
            });
            document.querySelectorAll('.set-nav-item').forEach(n => {
                n.style.color = '#111';
            });
        }
        this.save();
    },

    // ── Accent Color ───────────────────────────────────────────────────────
    applyAccentColor(color) {
        this.state.accentColor = color;
        document.documentElement.style.setProperty('--accent', color);
        document.querySelectorAll('.set-toggle.on').forEach(t => { t.style.background = color; });
        document.querySelectorAll('input[type=range]').forEach(r => { r.style.accentColor = color; });
        document.querySelectorAll('.set-nav-item.active').forEach(n => { n.style.background = color + '22'; });
        this.save();
    },

    // ── Desktop Wallpaper ──────────────────────────────────────────────────
    applyWallpaper(url) {
        this.state.wallpaper = url;
        const desktop = document.querySelector('.macos-body') || document.getElementById('macos-container') || document.body;
        if (desktop) {
            desktop.style.backgroundImage = `url('${url}')`;
            desktop.style.backgroundSize = 'cover';
            desktop.style.backgroundPosition = 'center';
            desktop.style.backgroundRepeat = 'no-repeat';
        }
        // Highlight the selected thumbnail in the desktop wallpaper grid
        document.querySelectorAll('.wallpaper-thumb-desktop').forEach(t => {
            t.style.border = t.getAttribute('data-url') === url ? '3px solid #0a84ff' : '1.5px solid rgba(0,0,0,0.08)';
        });
        const preview = document.getElementById('wallpaper-preview');
        if (preview) preview.src = url;
        this.save();
    },

    // ── Lock Screen Wallpaper ──────────────────────────────────────────────
    applyLockWallpaper(url) {
        this.state.lockWallpaper = url;
        const ls = document.getElementById('lock-screen');
        if (ls) {
            ls.style.backgroundImage = `url('${url}')`;
            ls.style.backgroundSize = 'cover';
            ls.style.backgroundPosition = 'center';
            ls.style.backgroundRepeat = 'no-repeat';
        }
        // Highlight the selected thumbnail in the lock screen wallpaper grid
        document.querySelectorAll('.wallpaper-thumb-lock').forEach(t => {
            t.style.border = t.getAttribute('data-url') === url ? '3px solid #0a84ff' : '1.5px solid rgba(0,0,0,0.08)';
        });
        const preview = document.getElementById('lock-wallpaper-preview');
        if (preview) preview.src = url;
        this.save();
    },

    // ── Show Lock Screen ───────────────────────────────────────────────────
    showLockScreen() {
        const ls = document.getElementById('lock-screen');
        if (ls) {
            ls.style.display = 'flex';
            setTimeout(() => {
                ls.style.opacity = '1';
                ls.style.transform = 'none';
            }, 10);
            const pwdContainer = document.getElementById('ls-pwd-container');
            const fpContainer = document.getElementById('ls-fingerprint-container');
            const pwdInput = document.getElementById('lock-password');
            if (pwdContainer) pwdContainer.style.display = 'none';
            if (fpContainer) fpContainer.style.display = 'flex';
            if (pwdInput) pwdInput.value = '';
        }
    },

    // ── Lock Password ──────────────────────────────────────────────────────
    setLockPassword(pwd) {
        this.state.lockPassword = pwd;
        this.save();
        return true;
    },

    getPassword() {
        return this.state.lockPassword || '';
    },

    checkPassword(pwd) {
        // Empty password means no lock
        if (!this.state.lockPassword) return true;
        return pwd === this.state.lockPassword;
    },

    // ── Dock ───────────────────────────────────────────────────────────────
    applyDock() {
        const dock = document.getElementById('dockPanel');
        const dockWrapper = document.querySelector('.dock-wrapper');
        if (!dockWrapper) return;
        if (this.state.dockAutoHide) {
            dockWrapper.style.transform = 'translateY(100%)';
            dockWrapper.style.transition = 'transform 0.3s ease';
            document.body.addEventListener('mousemove', this._dockAutoHideHandler = (e) => {
                const threshold = window.innerHeight - 10;
                if (e.clientY > threshold) dockWrapper.style.transform = 'translateY(0)';
                else dockWrapper.style.transform = 'translateY(100%)';
            });
        } else {
            dockWrapper.style.transform = '';
            if (this._dockAutoHideHandler) {
                document.body.removeEventListener('mousemove', this._dockAutoHideHandler);
            }
        }
        this.save();
    },

    setDockSize(size) {
        this.state.dockSize = size;
        // Update the CONFIG baseIconSize used by the dock animation engine
        if (window.dockCONFIG) window.dockCONFIG.baseIconSize = size;
        this.save();
    },

    // ── Brightness ─────────────────────────────────────────────────────────
    applyBrightness(val) {
        this.state.brightness = val;
        const overlay = document.getElementById('brightness-overlay');
        if (overlay) overlay.style.opacity = (1 - val / 100) * 0.7;
        this.save();
    },

    // ── Volume (Web Audio API) ─────────────────────────────────────────────
    setVolume(val) {
        this.state.outputVolume = val;
        this.save();
    },

    // ── Wi-Fi ──────────────────────────────────────────────────────────────
    setWifi(on) {
        this.state.wifiEnabled = on;
        const icon = document.querySelector('.topbar-wifi-svg');
        if (icon) icon.style.opacity = on ? 1 : 0.3;
        this.save();
    },

    // ── Bluetooth ──────────────────────────────────────────────────────────
    setBluetooth(on) {
        this.state.bluetoothOn = on;
        if (typeof window.updateIslandIdle === 'function') {
            window.updateIslandIdle();
        }
        this.save();
    },

    // ── Night Shift ────────────────────────────────────────────────────────
    setNightShift(on) {
        this.state.nightShift = on;
        const overlay = document.getElementById('nightshift-overlay');
        if (overlay) overlay.style.opacity = on ? 0.12 : 0;
        this.save();
    },

    // ── Reduce Motion ──────────────────────────────────────────────────────
    setReduceMotion(on) {
        this.state.reduceMotion = on;
        document.documentElement.style.setProperty('--transition-speed', on ? '0ms' : '200ms');
        this.save();
    },

    // ── Reduce Transparency ────────────────────────────────────────────────
    setReduceTransparency(on) {
        this.state.reduceTransparency = on;
        if (on) {
            document.querySelectorAll('.mac-window,.dock-panel,.mac-control-center').forEach(el => {
                el.style.backdropFilter = 'none';
                el.style.webkitBackdropFilter = 'none';
            });
        } else {
            document.querySelectorAll('.mac-window,.dock-panel,.mac-control-center').forEach(el => {
                el.style.backdropFilter = '';
                el.style.webkitBackdropFilter = '';
            });
        }
        this.save();
    },

    // ── User Name ──────────────────────────────────────────────────────────
    setUserName(name) {
        this.state.userName = name;
        document.querySelectorAll('.user-name-display').forEach(el => { el.textContent = name; });
        this.save();
    },
};

// Expose globally
window.MacSettings = MacSettings;

