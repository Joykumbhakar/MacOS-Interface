// Apple Music Database with High-Fidelity Artwork & Previews

// Helper to detect/assign theme based on song characteristics
function detectCoverStyle(text = '', artist = '') {
    const combined = `${text} ${artist}`.toLowerCase();
    if (combined.includes('phonk') || combined.includes('slowed') || combined.includes('funk') || combined.includes('midnight') || combined.includes('v12') || combined.includes('uranium') || combined.includes('blinding') || combined.includes('after hours')) {
        return 'synthwave';
    }
    if (combined.includes('starboy') || combined.includes('boom shaka') || combined.includes('burn') || combined.includes('krsna') || combined.includes('kendrick') || combined.includes('black panther')) {
        return 'dark';
    }
    if (combined.includes('sunflower') || combined.includes('levitating') || combined.includes('bad habits') || combined.includes('stay') || combined.includes('today') || combined.includes('hits') || combined.includes('pegadora')) {
        return 'bauhaus';
    }
    if (combined.includes('tame impala') || combined.includes('watermelon') || combined.includes('harry') || combined.includes('as it was') || combined.includes('west end') || combined.includes('louis')) {
        return 'retro';
    }
    if (combined.includes('timeless') || combined.includes('khat') || combined.includes('peaches') || combined.includes('midnights') || combined.includes('anti-hero') || combined.includes('deep focus') || combined.includes('spider')) {
        return 'abstract';
    }
    return 'landscape'; // Default organic/acoustic
}

// ════════════════════════════════════════════════════════════════════════════════
// MULTI-STYLE SKEUOMORPHIC 1:1 SQUARE COVER GENERATOR
// ════════════════════════════════════════════════════════════════════════════════
function createGradientCover(text, artist, bgGrad, textColor = '#ffffff', isSpinning = false, customStyle = null) {
    const cleanTitle = (text || 'DAWN').replace(/[^a-zA-Z0-9 ]/g, '').trim();
    const displayTitle = (cleanTitle.length > 9 ? cleanTitle.slice(0, 9) : cleanTitle || 'DAWN').split('').join(' ').toUpperCase();
    const displayArtist = (artist || 'ACOUSTIC SESSIONS').toUpperCase().slice(0, 22);
    const style = customStyle || detectCoverStyle(text, artist);

    const isImage = bgGrad && (bgGrad.startsWith('images/') || bgGrad.startsWith('http'));

    // Style-specific configurations
    let sleeveBaseGrad = `<linearGradient id="sleevePaper" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f6f3ee" /><stop offset="100%" stop-color="#dfdad1" /></linearGradient>`;
    let sleeveBorderStroke = 'rgba(255,255,255,0.6)';
    let sleeveBorderDark = 'rgba(0,0,0,0.15)';
    let discLabelBg = '#ede9e2';
    let discLabelBorder = '#d5d0c7';
    let discLabelText = '#2a2824';
    let discLabelSub = '#6a6863';
    let artworkContent = '';
    let headerContent = '';
    let overlayContent = '';
    let discLabelArtwork = '';

    if (style === 'synthwave') {
        // ── Cyberpunk / Synth-wave / Phonk ─────────────────────────────
        sleeveBaseGrad = `<linearGradient id="sleevePaper" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#141520" /><stop offset="100%" stop-color="#08090f" /></linearGradient>`;
        sleeveBorderStroke = 'rgba(0, 243, 255, 0.4)';
        sleeveBorderDark = 'rgba(255, 0, 128, 0.25)';
        discLabelBg = '#0d0d14';
        discLabelBorder = '#ff007f';
        discLabelText = '#00f3ff';
        discLabelSub = '#ff007f';

        discLabelArtwork = `
            <circle cx="218" cy="150" r="26" fill="none" stroke="#00f3ff" stroke-width="0.75" opacity="0.8" />
            <circle cx="218" cy="150" r="21" fill="none" stroke="#ff007f" stroke-width="0.5" stroke-dasharray="3,2" />
            <!-- Frequency bars -->
            <line x1="208" y1="140" x2="208" y2="146" stroke="#00f3ff" stroke-width="1.2" />
            <line x1="213" y1="137" x2="213" y2="146" stroke="#00f3ff" stroke-width="1.2" />
            <line x1="218" y1="134" x2="218" y2="146" stroke="#ff007f" stroke-width="1.2" />
            <line x1="223" y1="137" x2="223" y2="146" stroke="#00f3ff" stroke-width="1.2" />
            <line x1="228" y1="140" x2="228" y2="146" stroke="#00f3ff" stroke-width="1.2" />
        `;

        headerContent = `
            <text x="24" y="72" font-family="'SF Mono', Menlo, monospace" font-size="10.5" font-weight="700" fill="#00f3ff" letter-spacing="2.5">[ ${displayTitle} ]</text>
            <text x="24" y="82" font-family="'SF Mono', Menlo, monospace" font-size="4.8" font-weight="600" fill="#ff007f" letter-spacing="1.2">DIGITAL MASTER // 48kHz</text>
            <line x1="24" y1="87" x2="48" y2="87" stroke="#00f3ff" stroke-width="0.8" />
        `;

        artworkContent = isImage ? `<image href="${bgGrad}" x="0" y="0" width="200" height="158" preserveAspectRatio="xMidYMid slice" />` : `
            <rect width="200" height="158" fill="url(#artBg)" />
            <!-- Glowing Grid Floor -->
            <path d="M 0,110 L 200,110 M 0,122 L 200,122 M 0,136 L 200,136 M 0,152 L 200,152" stroke="rgba(0,243,255,0.4)" stroke-width="0.8" />
            <path d="M 100,85 L 0,158 M 100,85 L 35,158 M 100,85 L 70,158 M 100,85 L 100,158 M 100,85 L 130,158 M 100,85 L 165,158 M 100,85 L 200,158" stroke="rgba(0,243,255,0.35)" stroke-width="0.8" />
            <!-- Neon Wire Sun -->
            <circle cx="100" cy="62" r="30" fill="none" stroke="#ff007f" stroke-width="2" />
            <line x1="72" y1="52" x2="128" y2="52" stroke="#141520" stroke-width="2" />
            <line x1="74" y1="60" x2="126" y2="60" stroke="#141520" stroke-width="2.5" />
            <line x1="78" y1="68" x2="122" y2="68" stroke="#141520" stroke-width="3" />
            <line x1="84" y1="76" x2="116" y2="76" stroke="#141520" stroke-width="3.5" />
            <!-- Glowing Laser Horizon -->
            <line x1="0" y1="85" x2="200" y2="85" stroke="#ff007f" stroke-width="1.5" />
            <line x1="0" y1="85" x2="200" y2="85" stroke="#ffffff" stroke-width="0.6" opacity="0.8" />
        `;

        overlayContent = `
            <text x="24" y="240" font-family="'SF Mono', Menlo, monospace" font-size="4.5" font-weight="600" fill="#00f3ff" letter-spacing="1">SYNTH-84 // RE_EDIT</text>
        `;

    } else if (style === 'bauhaus') {
        // ── Modern Pop / Swiss Bauhaus / Colorblock ────────────────────
        sleeveBaseGrad = `<linearGradient id="sleevePaper" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffffff" /><stop offset="100%" stop-color="#f0eee9" /></linearGradient>`;
        sleeveBorderStroke = 'rgba(255,255,255,0.8)';
        sleeveBorderDark = 'rgba(0,0,0,0.2)';
        discLabelBg = '#ffe600';
        discLabelBorder = '#ff2a5f';
        discLabelText = '#111111';
        discLabelSub = '#0038ff';

        discLabelArtwork = `
            <path d="M 218,125 A 25 25 0 0 1 218,175 Z" fill="#0038ff" />
            <circle cx="218" cy="150" r="24" fill="none" stroke="#111111" stroke-width="0.8" />
        `;

        headerContent = `
            <text x="24" y="72" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', Impact, sans-serif" font-size="13" font-weight="900" fill="#111111" letter-spacing="2">${displayTitle}</text>
            <text x="24" y="82" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="5.2" font-weight="700" fill="#ff2a5f" letter-spacing="1.2">${displayArtist}</text>
            <rect x="24" y="86" width="22" height="2.5" fill="#0038ff" />
        `;

        artworkContent = isImage ? `<image href="${bgGrad}" x="0" y="0" width="200" height="158" preserveAspectRatio="xMidYMid slice" />` : `
            <rect width="200" height="158" fill="url(#artBg)" />
            <!-- Bauhaus Geometric Color Blocks -->
            <circle cx="65" cy="80" r="48" fill="#ff2a5f" opacity="0.85" />
            <polygon points="0,0 130,0 50,158 0,158" fill="#ffe600" opacity="0.65" />
            <path d="M 120,158 V 65 A 40 40 0 0 1 200,65 V 158 Z" fill="#0038ff" opacity="0.75" />
            <!-- Halftone Dot Matrix Accent -->
            <circle cx="160" cy="35" r="2.5" fill="#ffffff" />
            <circle cx="170" cy="35" r="2.5" fill="#ffffff" />
            <circle cx="180" cy="35" r="2.5" fill="#ffffff" />
            <circle cx="160" cy="45" r="2.5" fill="#ffffff" />
            <circle cx="170" cy="45" r="2.5" fill="#ffffff" />
            <circle cx="180" cy="45" r="2.5" fill="#ffffff" />
            <circle cx="65" cy="80" r="14" fill="#ffffff" />
        `;

        overlayContent = `
            <!-- Stylized Barcode -->
            <g transform="translate(24, 225)">
                <line x1="0" y1="0" x2="0" y2="16" stroke="#111" stroke-width="1" />
                <line x1="2.5" y1="0" x2="2.5" y2="16" stroke="#111" stroke-width="1.8" />
                <line x1="6" y1="0" x2="6" y2="16" stroke="#111" stroke-width="0.8" />
                <line x1="8.5" y1="0" x2="8.5" y2="16" stroke="#111" stroke-width="1.5" />
                <line x1="12" y1="0" x2="12" y2="16" stroke="#111" stroke-width="1.2" />
                <line x1="15" y1="0" x2="15" y2="16" stroke="#111" stroke-width="2" />
                <line x1="19" y1="0" x2="19" y2="16" stroke="#111" stroke-width="0.8" />
                <line x1="22" y1="0" x2="22" y2="16" stroke="#111" stroke-width="1.5" />
                <line x1="25" y1="0" x2="25" y2="16" stroke="#111" stroke-width="1" />
                <text x="32" y="12" font-family="monospace" font-size="4.5" font-weight="700" fill="#111">LP-2026</text>
            </g>
        `;

    } else if (style === 'abstract') {
        // ── Cosmic / Ambient Fluid / Ethereal ──────────────────────────
        sleeveBaseGrad = `<linearGradient id="sleevePaper" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0c0e1a" /><stop offset="100%" stop-color="#05060d" /></linearGradient>`;
        sleeveBorderStroke = 'rgba(255,255,255,0.4)';
        sleeveBorderDark = 'rgba(0,0,0,0.5)';
        discLabelBg = '#16192b';
        discLabelBorder = '#8a94b8';
        discLabelText = '#ffffff';
        discLabelSub = '#8a94b8';

        discLabelArtwork = `
            <circle cx="218" cy="150" r="25" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8" />
            <circle cx="218" cy="150" r="18" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.5" />
            <polygon points="218,138 220,143 225,145 220,147 218,152 216,147 211,145 216,143" fill="#ffffff" opacity="0.9" />
        `;

        headerContent = `
            <text x="24" y="72" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', serif" font-size="11.5" font-weight="300" fill="#ffffff" letter-spacing="4.5">${displayTitle}</text>
            <text x="24" y="82" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', serif" font-size="4.8" font-style="italic" fill="#a0a8c2" letter-spacing="1.5">${displayArtist}</text>
            <line x1="24" y1="87" x2="38" y2="87" stroke="#a0a8c2" stroke-width="0.5" opacity="0.6" />
        `;

        artworkContent = isImage ? `<image href="${bgGrad}" x="0" y="0" width="200" height="158" preserveAspectRatio="xMidYMid slice" />` : `
            <rect width="200" height="158" fill="url(#artBg)" />
            <!-- Fluid Nebula Waves -->
            <path d="M 0,40 C 60,10 90,80 150,45 C 180,25 190,50 200,40 V 158 H 0 Z" fill="rgba(255,255,255,0.12)" />
            <path d="M 0,80 C 50,110 110,60 160,105 C 185,125 195,100 200,95 V 158 H 0 Z" fill="rgba(0,0,0,0.3)" />
            <!-- Luminous Glowing Orb -->
            <circle cx="130" cy="65" r="32" fill="#ffffff" opacity="0.18" />
            <circle cx="130" cy="65" r="22" fill="#ffffff" opacity="0.3" />
            <circle cx="130" cy="65" r="10" fill="#ffffff" opacity="0.75" />
            <!-- Star Particles -->
            <polygon points="45,35 46.5,39 50,40.5 46.5,42 45,46 43.5,42 40,40.5 43.5,39" fill="#ffffff" opacity="0.9" />
            <polygon points="175,120 176,123 179,124 176,125 175,128 174,125 171,124 174,123" fill="#ffffff" opacity="0.7" />
        `;

        overlayContent = `
            <text x="24" y="240" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="4.2" font-weight="500" fill="#a0a8c2" letter-spacing="1.5">IMMERSIVE AUDIO // SPATIAL</text>
        `;

    } else if (style === 'retro') {
        // ── Vintage Japanese City-Pop / Retro Cassette ─────────────────
        sleeveBaseGrad = `<linearGradient id="sleevePaper" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#eee6d8" /><stop offset="100%" stop-color="#d8c7b0" /></linearGradient>`;
        sleeveBorderStroke = 'rgba(255,255,255,0.7)';
        sleeveBorderDark = 'rgba(0,0,0,0.2)';
        discLabelBg = '#9c2424';
        discLabelBorder = '#d4af37';
        discLabelText = '#ffffff';
        discLabelSub = '#d4af37';

        discLabelArtwork = `
            <circle cx="218" cy="150" r="26" fill="none" stroke="#d4af37" stroke-width="1" />
            <circle cx="218" cy="150" r="23" fill="none" stroke="#d4af37" stroke-width="0.5" stroke-dasharray="2,2" />
            <text x="218" y="141" font-family="'SF Pro Display', sans-serif" font-size="3.5" font-weight="700" fill="#d4af37" text-anchor="middle" letter-spacing="1">SIDE A</text>
        `;

        headerContent = `
            <text x="24" y="71" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="11.5" font-weight="800" fill="#2d251e" letter-spacing="3">${displayTitle}</text>
            <text x="24" y="81" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="5" font-weight="600" fill="#8c6d48" letter-spacing="1.2">シティ・ポップ // ${displayArtist}</text>
            <line x1="24" y1="86" x2="45" y2="86" stroke="#b08d57" stroke-width="0.8" />
        `;

        artworkContent = isImage ? `<image href="${bgGrad}" x="0" y="0" width="200" height="158" preserveAspectRatio="xMidYMid slice" />` : `
            <rect width="200" height="158" fill="url(#artBg)" />
            <!-- Sunset Horizon Lines -->
            <circle cx="100" cy="75" r="34" fill="#ff4e50" opacity="0.9" />
            <line x1="0" y1="75" x2="200" y2="75" stroke="#f9d423" stroke-width="1.5" />
            <line x1="0" y1="85" x2="200" y2="85" stroke="#f9d423" stroke-width="1.2" />
            <line x1="0" y1="97" x2="200" y2="97" stroke="#f9d423" stroke-width="1" />
            <line x1="0" y1="112" x2="200" y2="112" stroke="#f9d423" stroke-width="0.8" />
            <!-- Palm Tree Silhouette -->
            <path d="M 30,158 Q 38,110 32,80 Q 24,65 10,68 M 32,80 Q 45,62 60,65 M 32,80 Q 40,75 55,85 M 32,80 Q 20,75 8,82 M 32,80 Q 32,58 35,48" fill="none" stroke="#2d251e" stroke-width="2.2" stroke-linecap="round" />
        `;

        overlayContent = `
            <!-- Vintage Red Stamp Badge -->
            <g transform="translate(145, 222)">
                <rect width="48" height="16" rx="3" fill="#9c2424" />
                <text x="24" y="11" font-family="'SF Pro Display', sans-serif" font-size="4.2" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="0.8">STEREO 33⅓</text>
            </g>
            <text x="24" y="240" font-family="'SF Pro Display', sans-serif" font-size="4.5" font-weight="700" fill="#8c6d48" letter-spacing="1">TOKYO FM MASTER</text>
        `;

    } else if (style === 'dark') {
        // ── Heavy Hip-Hop / Dark Trap / Metallic ───────────────────────
        sleeveBaseGrad = `<linearGradient id="sleevePaper" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#19191d" /><stop offset="100%" stop-color="#0a0a0c" /></linearGradient>`;
        sleeveBorderStroke = 'rgba(255,40,40,0.5)';
        sleeveBorderDark = 'rgba(0,0,0,0.6)';
        discLabelBg = '#0a0a0c';
        discLabelBorder = '#ff2424';
        discLabelText = '#ffffff';
        discLabelSub = '#ff2424';

        discLabelArtwork = `
            <circle cx="218" cy="150" r="26" fill="none" stroke="#ff2424" stroke-width="1.2" />
            <polygon points="218,136 226,150 218,145 210,150" fill="#ff2424" />
        `;

        headerContent = `
            <text x="24" y="72" font-family="'Impact', 'Arial Black', sans-serif" font-size="13" font-weight="900" fill="#ffffff" letter-spacing="2.5">${displayTitle}</text>
            <text x="24" y="82" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="5" font-weight="700" fill="#ff3333" letter-spacing="1.2">${displayArtist}</text>
            <rect x="24" y="86" width="30" height="2" fill="#ff3333" />
        `;

        artworkContent = isImage ? `<image href="${bgGrad}" x="0" y="0" width="200" height="158" preserveAspectRatio="xMidYMid slice" />` : `
            <rect width="200" height="158" fill="url(#artBg)" />
            <!-- Heavy Monolith Slashes -->
            <polygon points="40,0 90,0 50,158 0,158" fill="#000000" opacity="0.6" />
            <polygon points="120,0 170,0 130,158 80,158" fill="#ff2424" opacity="0.4" />
            <!-- High Contrast Crosshair -->
            <circle cx="100" cy="80" r="36" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.7" />
            <line x1="100" y1="35" x2="100" y2="125" stroke="#ffffff" stroke-width="0.8" opacity="0.7" />
            <line x1="55" y1="80" x2="145" y2="80" stroke="#ffffff" stroke-width="0.8" opacity="0.7" />
        `;

        overlayContent = `
            <!-- Parental Advisory Mini Badge -->
            <g transform="translate(142, 224)">
                <rect width="52" height="16" rx="2" fill="#ffffff" />
                <rect x="1" y="1" width="50" height="14" rx="1" fill="#000000" />
                <text x="26" y="7.5" font-family="'Arial Black', sans-serif" font-size="3" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">PARENTAL</text>
                <text x="26" y="12.5" font-family="'Arial Black', sans-serif" font-size="3" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">ADVISORY</text>
            </g>
            <text x="24" y="240" font-family="monospace" font-size="4.2" font-weight="700" fill="#ff3333" letter-spacing="1">[EXPLICIT_V2]</text>
        `;

    } else {
        // ── Default Organic / Minimalist Landscape ─────────────────────
        discLabelArtwork = `
            <path d="M 204,143 L 211,136 L 218,143" fill="none" stroke="#6a6863" stroke-width="1" stroke-linejoin="round" />
            <path d="M 215,143 L 223,134 L 231,143" fill="none" stroke="#6a6863" stroke-width="1" stroke-linejoin="round" />
        `;

        headerContent = `
            <text x="24" y="72" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" font-size="12" font-weight="700" fill="#1c202a" letter-spacing="3.5">${displayTitle}</text>
            <text x="24" y="82" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" font-size="5" font-weight="600" fill="#6a707e" letter-spacing="1.5">${displayArtist}</text>
            <line x1="24" y1="87" x2="42" y2="87" stroke="#a6abb6" stroke-width="0.7" />
        `;

        artworkContent = isImage ? `<image href="${bgGrad}" x="0" y="0" width="200" height="158" preserveAspectRatio="xMidYMid slice" />` : `
            <rect width="200" height="158" fill="url(#artBg)" />
            <!-- Mountain Silhouettes -->
            <path d="M 0,70 Q 40,30 70,50 T 140,40 T 200,65 V 158 H 0 Z" fill="#2b323c" opacity="0.85" />
            <path d="M 0,90 Q 60,55 110,80 T 200,75 V 158 H 0 Z" fill="#1b2027" opacity="0.95" />
            <!-- Glowing Sun/Dawn Core -->
            <circle cx="120" cy="45" r="6" fill="#fffbe8" />
            <circle cx="120" cy="45" r="13" fill="#ffb469" opacity="0.38" />
        `;

        overlayContent = `
            <!-- Frosted Glass Wave Ribbon 1 (Upper Translucent Layer) -->
            <path d="M 10,135 C 50,135 90,170 130,125 C 160,95 180,110 210,105 V 250 H 10 Z" fill="url(#glassWave1)" />
            <path d="M 10,135 C 50,135 90,170 130,125 C 160,95 180,110 210,105" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.85" />

            <!-- Frosted Glass Wave Ribbon 2 (Lower Cream Layer) -->
            <path d="M 10,165 C 45,168 80,182 112,205 C 148,230 180,205 210,192 V 250 H 10 Z" fill="#ded9d0" opacity="0.92" />
            <path d="M 10,165 C 45,168 80,182 112,205 C 148,230 180,205 210,192" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.9" />

            <text x="24" y="240" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" font-size="4.8" font-weight="600" fill="#6a707e" letter-spacing="1">VOL. 01</text>
        `;
    }

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
        <defs>
            <style>
                @keyframes spinVinylDisc {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .vinyl-rotating {
                    animation: spinVinylDisc 3s linear infinite;
                    transform-origin: 218px 150px;
                }
            </style>

            <!-- Inset Scenery / Artwork Gradient -->
            <linearGradient id="artBg" x1="0%" y1="0%" x2="100%" y2="100%">
                ${isImage ? '' : bgGrad}
            </linearGradient>

            <!-- Dynamic Sleeve Base Gradient -->
            ${sleeveBaseGrad}

            <!-- Vinyl Disc Body Gradient -->
            <radialGradient id="vinylBody" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#242428" />
                <stop offset="50%" stop-color="#141418" />
                <stop offset="85%" stop-color="#09090b" />
                <stop offset="100%" stop-color="#020202" />
            </radialGradient>

            <!-- Vinyl Metallic Conic / Radial Sheen -->
            <linearGradient id="vinylSheen1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.38" />
                <stop offset="25%" stop-color="#ffffff" stop-opacity="0.04" />
                <stop offset="50%" stop-color="#ffffff" stop-opacity="0.30" />
                <stop offset="75%" stop-color="#ffffff" stop-opacity="0.03" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0.35" />
            </linearGradient>

            <!-- Center Metal Spindle -->
            <radialGradient id="spindleHub" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="40%" stop-color="#d0d0d5" />
                <stop offset="80%" stop-color="#7a7a82" />
                <stop offset="100%" stop-color="#3a3a40" />
            </radialGradient>

            <!-- Frosted Glass Wave Overlays -->
            <linearGradient id="glassWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45" />
                <stop offset="40%" stop-color="#ffffff" stop-opacity="0.18" />
                <stop offset="80%" stop-color="#ffffff" stop-opacity="0.05" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0.12" />
            </linearGradient>

            <linearGradient id="glassGlare" x1="0%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
                <stop offset="35%" stop-color="#ffffff" stop-opacity="0.08" />
                <stop offset="70%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>

            <!-- Sleeve Notch Clip Path (Square 200x200 Sleeve) -->
            <clipPath id="sleeveClip">
                <path d="
                    M 26,50
                    H 194
                    Q 210,50 210,66
                    V 122
                    C 210,132 188,138 188,150
                    C 188,162 210,168 210,178
                    V 234
                    Q 210,250 194,250
                    H 26
                    Q 10,250 10,234
                    V 66
                    Q 10,50 26,50
                    Z
                " />
            </clipPath>
        </defs>

        <!-- ════════════════════════════════════════════════════════════════════ -->
        <!-- VINYL RECORD (SLIDING OUT ON THE RIGHT - ROTATES DYNAMICALLY) -->
        <!-- ════════════════════════════════════════════════════════════════════ -->
        <g id="vinyl-disc" class="${isSpinning ? 'vinyl-rotating' : ''}">
            <!-- Vinyl Outer Disc -->
            <circle cx="218" cy="150" r="88" fill="url(#vinylBody)" stroke="#050507" stroke-width="1.2" />

            <!-- Anisotropic Radial Light Flares (Specular Sheen) -->
            <path d="M 130,150 L 218,150 L 280,88 A 88 88 0 0 1 306,150 Z" fill="url(#vinylSheen1)" opacity="0.4" />
            <path d="M 218,150 L 156,212 A 88 88 0 0 1 130,150 Z" fill="url(#vinylSheen1)" opacity="0.4" />
            <path d="M 218,150 L 280,212 A 88 88 0 0 1 218,238 Z" fill="url(#vinylSheen1)" opacity="0.28" />
            <path d="M 218,150 L 156,88 A 88 88 0 0 1 218,62 Z" fill="url(#vinylSheen1)" opacity="0.28" />

            <!-- Concentric Sound Grooves -->
            <circle cx="218" cy="150" r="85" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="81" fill="none" stroke="rgba(0,0,0,0.45)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="77" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="73" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="69" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="65" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="61" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="57" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="53" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="49" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="45" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="41" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="37" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.75" />
            <circle cx="218" cy="150" r="33" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="0.75" />

            <!-- Center Paper Label -->
            <circle cx="218" cy="150" r="31" fill="${discLabelBg}" stroke="${discLabelBorder}" stroke-width="1" />
            <circle cx="218" cy="150" r="29" fill="none" stroke="${discLabelBorder}" stroke-width="0.5" />

            <!-- Label Artwork -->
            ${discLabelArtwork}
            
            <!-- Label Spindle Text -->
            <text x="218" y="157" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="4" font-weight="700" fill="${discLabelText}" text-anchor="middle" letter-spacing="1">${cleanTitle.slice(0, 10).toUpperCase()}</text>
            <text x="218" y="162" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="2.6" font-weight="500" fill="${discLabelSub}" text-anchor="middle" letter-spacing="0.5">${displayArtist.slice(0, 16)}</text>
            <line x1="212" y1="165" x2="224" y2="165" stroke="${discLabelBorder}" stroke-width="0.4" />

            <!-- Center Metallic Spindle Bushing & Hole -->
            <circle cx="218" cy="150" r="5" fill="url(#spindleHub)" stroke="#55555c" stroke-width="0.6" />
            <circle cx="218" cy="150" r="2.2" fill="#000000" />
        </g>

        <!-- ════════════════════════════════════════════════════════════════════ -->
        <!-- SLEEVE (FRONT COVER WITH NOTCH CUTOUT - 1:1 SQUARE 200x200) -->
        <!-- ════════════════════════════════════════════════════════════════════ -->
        <g id="sleeve-jacket" clip-path="url(#sleeveClip)">
            <!-- Sleeve Base Background -->
            <rect x="10" y="50" width="200" height="200" fill="url(#sleevePaper)" />

            <!-- Background Landscape / Artwork Window -->
            <g transform="translate(10, 92)">
                ${artworkContent}
            </g>

            <!-- Dynamic Overlays -->
            ${overlayContent}

            <!-- Diagonal Glass Sheen Glare across Top of Sleeve -->
            <path d="M 10,50 L 210,50 L 210,75 L 10,150 Z" fill="url(#glassGlare)" />

            <!-- ── Editorial Typography ─────────────────────────────────────── -->
            ${headerContent}
        </g>

        <!-- Sleeve Perimeter Bevel & Notch Outline Highlight (Square 200x200) -->
        <path d="
            M 26,50
            H 194
            Q 210,50 210,66
            V 122
            C 210,132 188,138 188,150
            C 188,162 210,168 210,178
            V 234
            Q 210,250 194,250
            H 26
            Q 10,250 10,234
            V 66
            Q 10,50 26,50
            Z
        " fill="none" stroke="${sleeveBorderStroke}" stroke-width="1.2" />

        <path d="
            M 26,50.5
            H 194
            Q 209.5,50.5 209.5,66
            V 122
            C 209.5,132 187.5,138 187.5,150
            C 187.5,162 209.5,168 209.5,178
            V 234
            Q 209.5,249.5 194,249.5
            H 26
            Q 10.5,249.5 10.5,234
            V 66
            Q 10.5,50.5 26,50.5
            Z
        " fill="none" stroke="${sleeveBorderDark}" stroke-width="0.8" />
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

window.createGradientCover = createGradientCover;

const mp3 = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

const mockSongs = [
    {
        id: 100,
        title: "Music Video _ Black Panther _ Kendrick Lamar _ SZA _ Chadwick Boseman",
        artist: "All The Stars",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/All The Stars - Music Video _ Black Panther _ Kendrick Lamar _ SZA _ Chadwick Boseman.mp3",
        cover: createGradientCover("Music Video _ B", "All The Stars", "<stop offset='0%' stop-color='#00c6ff' /><stop offset='100%' stop-color='#0072ff' />")
    },
    {
        id: 101,
        title: "Banjaare",
        artist: "Barsaat x Spider-Man (Brand New Day Edition)",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/Banjaare _ Barsaat x Spider-Man (Brand New Day Edition).mp3",
        cover: createGradientCover("Banjaare", "Barsaat x Spide", "<stop offset='0%' stop-color='#f77062' /><stop offset='100%' stop-color='#fe5196' />")
    },
    {
        id: 102,
        title: "Boom Shaka",
        artist: "KR$NA,  Dhanda Nyoliwala",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/Boom Shaka (Official Music Video) _ KR$NA _  Dhanda Nyoliwala.mp3",
        cover: createGradientCover("Boom Shaka", "KR$NA,  Dhanda ", "<stop offset='0%' stop-color='#11998e' /><stop offset='100%' stop-color='#38ef7d' />")
    },
    {
        id: 103,
        title: "LET THE WORLD BURN",
        artist: "Chris Grey",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/Chris Grey - LET THE WORLD BURN (Official Lyric Video).mp3",
        cover: createGradientCover("LET THE WORLD B", "Chris Grey", "<stop offset='0%' stop-color='#fc4a1a' /><stop offset='100%' stop-color='#f7b733' />")
    },
    {
        id: 104,
        title: "DJ V12",
        artist: "FUNK ABNORMAL (Slowed)",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/FUNK ABNORMAL (Slowed) - DJ V12.mp3",
        cover: createGradientCover("DJ V12", "FUNK ABNORMAL (", "<stop offset='0%' stop-color='#8E2DE2' /><stop offset='100%' stop-color='#4A00E0' />")
    },
    {
        id: 105,
        title: "FUNK TAKA",
        artist: "Unknown Artist",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/FUNK TAKA (SLOWED).mp3",
        cover: createGradientCover("FUNK TAKA", "Unknown Artist", "<stop offset='0%' stop-color='#1e3c72' /><stop offset='100%' stop-color='#2a5298' />")
    },
    {
        id: 106,
        title: "Tame Impala _ Spider-Man_ Brand New Day",
        artist: "LOSER",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/LOSER - Tame Impala _ Spider-Man_ Brand New Day.mp3",
        cover: createGradientCover("Tame Impala _ S", "LOSER", "<stop offset='0%' stop-color='#ee0979' /><stop offset='100%' stop-color='#ff6a00' />")
    },
    {
        id: 107,
        title: "KALYANI PHONK",
        artist: "MASHUQ HAQUE",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/MASHUQ HAQUE - KALYANI PHONK (PHONK).mp3",
        cover: createGradientCover("KALYANI PHONK", "MASHUQ HAQUE", "<stop offset='0%' stop-color='#B2FEFA' /><stop offset='100%' stop-color='#0ED2F7' />")
    },
    {
        id: 108,
        title: "MONTAGEM PEGADORA",
        artist: "Unknown Artist",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/MONTAGEM PEGADORA (Slowed).mp3",
        cover: createGradientCover("MONTAGEM PEGADO", "Unknown Artist", "<stop offset='0%' stop-color='#ff0844' /><stop offset='100%' stop-color='#ffb199' />")
    },
    {
        id: 109,
        title: "MONTAGEM URANIUM",
        artist: "Unknown Artist",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/MONTAGEM URANIUM (Ultra Slowed).mp3",
        cover: createGradientCover("MONTAGEM URANIU", "Unknown Artist", "<stop offset='0%' stop-color='#00c6ff' /><stop offset='100%' stop-color='#0072ff' />")
    },
    {
        id: 110,
        title: "Khat",
        artist: "Navjot Ahuja",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/Navjot Ahuja - Khat (Official Audio).mp3",
        cover: createGradientCover("Khat", "Navjot Ahuja", "<stop offset='0%' stop-color='#f77062' /><stop offset='100%' stop-color='#fe5196' />")
    },
    {
        id: 111,
        title: "Sunflower (Spider-Man_ Into the Spider-Verse)",
        artist: "Post Malone, Swae Lee",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/Post Malone, Swae Lee - Sunflower (Spider-Man_ Into the Spider-Verse).mp3",
        cover: createGradientCover("Sunflower (Spid", "Post Malone, Sw", "<stop offset='0%' stop-color='#11998e' /><stop offset='100%' stop-color='#38ef7d' />")
    },
    {
        id: 112,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/The Weeknd - Blinding Lights (Official Video).mp3",
        cover: createGradientCover("Blinding Lights", "The Weeknd", "<stop offset='0%' stop-color='#fc4a1a' /><stop offset='100%' stop-color='#f7b733' />")
    },
    {
        id: 113,
        title: "Timeless",
        artist: "Spider-Verse",
        album: "Local Tracks",
        duration: '3:00',
        url: "Tracks/Timeless _ Spider-Verse.mp3",
        cover: createGradientCover("Timeless", "Spider-Verse", "<stop offset='0%' stop-color='#8E2DE2' /><stop offset='100%' stop-color='#4A00E0' />")
    },

    { 
        id: 11, 
        title: 'Starboy', 
        artist: 'The Weeknd ft. Daft Punk', 
        album: 'Starboy', 
        duration: '3:50', 
        genre: 'R&B / Pop',
        youtubeUrl: 'https://www.youtube.com/watch?v=34Na4j8HLjc',
        youtubeId: '34Na4j8HLjc',
        cover: createGradientCover('Starboy', 'The Weeknd', '<stop offset="0%" stop-color="#b22222"/><stop offset="100%" stop-color="#000000"/>'),
        lyrics: [
            { time: 0, text: "I\'m tryna put you in the worst mood, ah" },
            { time: 5, text: "P1 cleaner than your church shoes, ah" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 12, 
        title: 'Levitating', 
        artist: 'Dua Lipa', 
        album: 'Future Nostalgia', 
        duration: '3:23', 
        genre: 'Pop / Disco',
        youtubeUrl: 'https://www.youtube.com/watch?v=TUVcZfQe-Kw',
        youtubeId: 'TUVcZfQe-Kw',
        cover: createGradientCover('Levitating', 'Dua Lipa', '<stop offset="0%" stop-color="#ff0844"/><stop offset="100%" stop-color="#ffb199"/>'),
        lyrics: [
            { time: 0, text: "If you wanna run away with me, I know a galaxy" },
            { time: 5, text: "And I can take you for a ride" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 13, 
        title: 'As It Was', 
        artist: 'Harry Styles', 
        album: 'Harry\'s House', 
        duration: '2:47', 
        genre: 'Pop',
        youtubeUrl: 'https://www.youtube.com/watch?v=H5v3kku4y6Q',
        youtubeId: 'H5v3kku4y6Q',
        cover: createGradientCover('Harry\'s House', 'Harry Styles', '<stop offset="0%" stop-color="#a18cd1"/><stop offset="100%" stop-color="#fbc2eb"/>'),
        lyrics: [
            { time: 0, text: "Come on, Harry, we wanna say goodnight to you" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 14, 
        title: 'Save Your Tears', 
        artist: 'The Weeknd', 
        album: 'After Hours', 
        duration: '3:35', 
        genre: 'Synth-wave / Pop',
        youtubeUrl: 'https://www.youtube.com/watch?v=XXYlCGsToLI',
        youtubeId: 'XXYlCGsToLI',
        cover: createGradientCover('Save Your Tears', 'The Weeknd', 'images/Music_Alums/album2.png'),
        lyrics: [
            { time: 0, text: "I saw you dancing in a crowded room" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 15, 
        title: 'Anti-Hero', 
        artist: 'Taylor Swift', 
        album: 'Midnights', 
        duration: '3:20', 
        genre: 'Pop',
        youtubeUrl: 'https://www.youtube.com/watch?v=b1kbLwvqugk',
        youtubeId: 'b1kbLwvqugk',
        cover: createGradientCover('Midnights', 'Taylor Swift', '<stop offset="0%" stop-color="#2b5876"/><stop offset="100%" stop-color="#4e4376"/>'),
        lyrics: [
            { time: 0, text: "I have this thing where I get older but just never wiser" }
        ],
        previewUrl: mp3 
    },

    { 
        id: 1, 
        title: 'Blinding Lights', 
        artist: 'The Weeknd', 
        album: 'After Hours', 
        duration: '3:20', 
        genre: 'Synth-wave / Pop',
        youtubeUrl: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
        youtubeId: '4NRXx6U8ABQ',
        previewUrl: mp3,
        cover: createGradientCover('Blinding Lights', 'The Weeknd', 'images/Music_Alums/album2.png'),
        lyrics: [
            { time: 0, text: "Yeah..." },
            { time: 8, text: "I've been tryin' to call" },
            { time: 14, text: "I've been on my own for long enough" },
            { time: 21, text: "Maybe you can show me how to love, maybe" },
            { time: 30, text: "I'm going through withdrawals" },
            { time: 37, text: "You don't even have to do too much" },
            { time: 41, text: "You can turn me on with just a touch, baby" },
            { time: 46, text: "I look around and Sin City's cold and empty" },
            { time: 52, text: "No one's around to judge me" },
            { time: 57, text: "I can't see clearly when you're gone" },
            { time: 63, text: "I said, ooh, I'm blinded by the lights" },
            { time: 70, text: "No, I can't sleep until I feel your touch" },
            { time: 77, text: "I said, ooh, I'm drowning in the night" },
            { time: 84, text: "Oh, when I'm like this, you're the one I trust" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 2, 
        title: 'Dawn (Acoustic Sessions)', 
        artist: 'Acoustic Sessions', 
        album: 'Dawn Vol. 01', 
        duration: '3:45', 
        genre: 'Acoustic / Indie',
        cover: createGradientCover('Dawn', 'Acoustic', 'images/Music_Alums/album1.png'),
        lyrics: [
            { time: 0, text: "(Gentle acoustic guitar strums)" },
            { time: 12, text: "Sun rising over misty mountain peaks" },
            { time: 24, text: "Golden light through the pine trees" },
            { time: 38, text: "A brand new morning begins..." },
            { time: 52, text: "Peace in the quiet dawn" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 3, 
        title: 'Midnight City', 
        artist: 'M83', 
        album: 'Hurry Up, We\'re Dreaming', 
        duration: '4:03', 
        genre: 'Electronic',
        cover: createGradientCover('Midnight City', 'M83', '<stop offset="0%" stop-color="#4158D0"/><stop offset="50%" stop-color="#C850C0"/><stop offset="100%" stop-color="#FFCC70"/>'),
        lyrics: [
            { time: 0, text: "Waiting in a car..." },
            { time: 10, text: "Waiting for the right time" },
            { time: 20, text: "The city is my church" },
            { time: 30, text: "It wraps in the blinding twilight" },
            { time: 45, text: "The city is my church" },
            { time: 60, text: "The sky is crying" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 3, 
        title: 'West End Blues', 
        artist: 'Louis Armstrong', 
        album: 'The Best of Louis Armstrong', 
        duration: '3:21', 
        genre: 'Jazz',
        cover: createGradientCover('West End Blues', 'Louis Armstrong', '<stop offset="0%" stop-color="#8A2387"/><stop offset="50%" stop-color="#E94057"/><stop offset="100%" stop-color="#F27121"/>'),
        lyrics: [
            { time: 0, text: "(Instrumental Trumpet Solo)" },
            { time: 25, text: "Ah, the sweet sound of New Orleans..." },
            { time: 45, text: "(Clarinet and Piano harmonizing)" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 4, 
        title: 'As It Was', 
        artist: 'Harry Styles', 
        album: 'Harry\'s House', 
        duration: '2:47', 
        genre: 'Pop',
        cover: createGradientCover('As It Was', 'Harry Styles', '<stop offset="0%" stop-color="#0093E9"/><stop offset="100%" stop-color="#80D0C7"/>'),
        lyrics: [
            { time: 0, text: "Come on, Harry, we wanna say goodnight to you" },
            { time: 8, text: "Holdin' me back" },
            { time: 14, text: "Gravity's holdin' me back" },
            { time: 22, text: "You know it's not the same as it was" },
            { time: 35, text: "In this world, it's just us" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 5, 
        title: 'Bad Habits', 
        artist: 'Ed Sheeran', 
        album: '=', 
        duration: '3:50', 
        genre: 'Pop',
        cover: createGradientCover('Bad Habits', 'Ed Sheeran', '<stop offset="0%" stop-color="#FF0844"/><stop offset="100%" stop-color="#FFB199"/>'),
        lyrics: [
            { time: 0, text: "One, two, three, four..." },
            { time: 10, text: "Every time you come around, you know I can't say no" },
            { time: 22, text: "My bad habits lead to late nights endin' alone" },
            { time: 35, text: "Conversations with a stranger I barely know" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 6, 
        title: 'Stay', 
        artist: 'The Kid LAROI, Justin Bieber', 
        album: 'F*CK LOVE 3: OVER YOU', 
        duration: '2:21', 
        genre: 'Pop',
        cover: createGradientCover('Stay', 'Kid LAROI & Bieber', '<stop offset="0%" stop-color="#21D4FD"/><stop offset="100%" stop-color="#B721FF"/>'),
        lyrics: [
            { time: 0, text: "I do the same thing I told you that I never would" },
            { time: 10, text: "I told you I'd change, even when I knew I never could" },
            { time: 20, text: "I need you to stay, yeah" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 7, 
        title: 'Levitating', 
        artist: 'Dua Lipa', 
        album: 'Future Nostalgia', 
        duration: '3:23', 
        genre: 'Disco Pop',
        cover: createGradientCover('Levitating', 'Dua Lipa', '<stop offset="0%" stop-color="#FA8BFF"/><stop offset="50%" stop-color="#2BD2FF"/><stop offset="100%" stop-color="#2BFF88"/>', '#111111'),
        lyrics: [
            { time: 0, text: "If you wanna run away with me, I know a galaxy" },
            { time: 12, text: "And I can take you for a ride" },
            { time: 24, text: "I had a premonition that we fell into a rhythm" },
            { time: 36, text: "You want me, I want you, baby! I'm levitating" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 8, 
        title: 'Watermelon Sugar', 
        artist: 'Harry Styles', 
        album: 'Fine Line', 
        duration: '2:53', 
        genre: 'Pop',
        cover: createGradientCover('Watermelon Sugar', 'Harry Styles', '<stop offset="0%" stop-color="#FEE140"/><stop offset="100%" stop-color="#FA709A"/>', '#111111'),
        lyrics: [
            { time: 0, text: "Tastes like strawberries on a summer evenin'" },
            { time: 12, text: "And it sounds just like a song" },
            { time: 24, text: "Watermelon sugar high!" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 9, 
        title: 'Peaches', 
        artist: 'Justin Bieber', 
        album: 'Justice', 
        duration: '3:18', 
        genre: 'R&B',
        cover: createGradientCover('Peaches', 'Justin Bieber', '<stop offset="0%" stop-color="#FF9A8B"/><stop offset="50%" stop-color="#FF6A88"/><stop offset="100%" stop-color="#FF99AC"/>'),
        lyrics: [
            { time: 0, text: "I got my peaches out in Georgia (oh, yeah, shit)" },
            { time: 12, text: "I get my weed from California (that's that shit)" },
            { time: 24, text: "I took that chick up to the North, yeah" }
        ],
        previewUrl: mp3 
    },
    { 
        id: 10, 
        title: 'Save Your Tears', 
        artist: 'The Weeknd', 
        album: 'After Hours', 
        duration: '3:35', 
        genre: 'Pop',
        cover: createGradientCover('Save Your Tears', 'The Weeknd', '<stop offset="0%" stop-color="#667eea"/><stop offset="100%" stop-color="#764ba2"/>'),
        lyrics: [
            { time: 0, text: "Na-na, yeah..." },
            { time: 12, text: "I saw you dancing in a crowded room" },
            { time: 24, text: "You look so happy when I'm not with you" },
            { time: 36, text: "Save your tears for another day" }
        ],
        previewUrl: mp3 
    }
];

const mockPlaylists = [
    { id: 101, name: 'Dawn Acoustic', description: 'Relaxing acoustic sessions & organic chill vibes', cover: createGradientCover('Dawn Acoustic', 'Playlist', 'images/Music_Alums/album1.png') },
    { id: 102, name: 'After Hours Radio', description: 'Synth-wave, late night drives & pop hits', cover: createGradientCover('After Hours', 'Playlist', 'images/Music_Alums/album2.png') },
    { id: 103, name: 'Deep Focus', description: 'Ambient soundscapes & electronic flow', cover: createGradientCover('Deep Focus', 'Apple Music', '<stop offset="0%" stop-color="#30cfd0"/><stop offset="100%" stop-color="#330867"/>') },
    { id: 104, name: 'Today\'s Hits', description: 'The biggest songs on Apple Music right now', cover: createGradientCover('Today\'s Hits', 'Apple Music', '<stop offset="0%" stop-color="#fa709a"/><stop offset="100%" stop-color="#fee140"/>', '#111111') }
];

window.APPLE_MUSIC_DATA = {
    songs: mockSongs,
    playlists: mockPlaylists
};
