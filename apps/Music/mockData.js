// Apple Music Database with High-Fidelity Artwork & Previews

// Helper to create reliable SVG gradient covers — album-book sleeve + vinyl disc design
// Based on song_cover_design.html reference — 8 distinct visual variations
function createGradientCover(text, artist, _bgGrad, textColor, variation) {
    const cleanTitle = (text || 'DAWN').replace(/[^a-zA-Z0-9 ]/g, '').trim();
    const displayTitle = (cleanTitle.length > 8 ? cleanTitle.slice(0, 8) : cleanTitle || 'DAWN').split('').join(' ').toUpperCase();
    const displayArtist = (artist || 'ACOUSTIC SESSIONS').toUpperCase().slice(0, 22);

    // 8 thematic sleeve variations — each a distinct visual mood
    const themes = [
        // 0 — DAWN: warm amber/rose sunrise (original reference palette)
        {
            paper: ['#f6f3ee','#eeebe4','#dfdad1'],
            sky: ['#ebdcd1','30%','#f3ceb5','65%','#f0a37c','100%','#8f8582'],
            mist: '#efebe5',
            mtn1: '#848a91', mtn2: '#596168', mtn3: '#2b2f33',
            sun: '#ffffff', sunGlow: '#ffb469',
            labelFill: '#e6dfd3', labelStroke: '#cdc8be', labelText: '#2a2a2a', labelSub: '#666666',
            titleColor: '#1c202a', artistColor: '#666666', accentColor: '#a0a0a0', catColor: '#888888',
        },
        // 1 — MIDNIGHT: deep navy/indigo city-light dusk
        {
            paper: ['#1a1d2e','#22253a','#2d3252'],
            sky: ['#0d0d1a','30%','#141433','65%','#1e2a5e','100%','#2d3252'],
            mist: '#1a1d2e',
            mtn1: '#0a0a1a', mtn2: '#0e1030', mtn3: '#080812',
            sun: '#ffe066', sunGlow: '#4488ff',
            labelFill: '#1e2240', labelStroke: '#2d3466', labelText: '#c8cfff', labelSub: '#7a88cc',
            titleColor: '#d0d8ff', artistColor: '#8894dd', accentColor: '#4455aa', catColor: '#5566bb',
        },
        // 2 — FOREST: deep green, misty jungle dawn
        {
            paper: ['#e8efe5','#dde8d8','#cdddc5'],
            sky: ['#d4ead0','30%','#a8d4a0','65%','#72b86a','100%','#3a6e35'],
            mist: '#e8efe5',
            mtn1: '#4a7a44', mtn2: '#2d5628', mtn3: '#162c12',
            sun: '#fffde0', sunGlow: '#aadd88',
            labelFill: '#ddf0d8', labelStroke: '#b8d8b0', labelText: '#1a3318', labelSub: '#4a7040',
            titleColor: '#1a3318', artistColor: '#3a5e30', accentColor: '#6a9a58', catColor: '#5a8848',
        },
        // 3 — DUSK: purple-rose sunset, golden horizon
        {
            paper: ['#f5ebe8','#eededb','#e8d0cc'],
            sky: ['#ffd6cc','30%','#ffaabb','65%','#cc66aa','100%','#7722aa'],
            mist: '#f5ebe8',
            mtn1: '#88446a', mtn2: '#552244', mtn3: '#221122'],
            sun: '#fff5bb', sunGlow: '#ffcc44',
            labelFill: '#f2e0e8', labelStroke: '#d8c0cc', labelText: '#331122', labelSub: '#885566',
            titleColor: '#220011', artistColor: '#662244', accentColor: '#aa6688', catColor: '#997766',
        },
        // 4 — OCEAN: teal/cyan coastal morning haze
        {
            paper: ['#e8f4f5','#d8eef0','#c5e5ea'],
            sky: ['#cceeff','30%','#88ddee','65%','#44aacc','100%','#1a6688'],
            mist: '#e8f4f5',
            mtn1: '#2a7a99', mtn2: '#1a5577', mtn3: '#0d2e44'],
            sun: '#ffffff', sunGlow: '#88eeff',
            labelFill: '#d8f0f5', labelStroke: '#aaddee', labelText: '#0a2233', labelSub: '#2a6688',
            titleColor: '#0a2233', artistColor: '#1a5577', accentColor: '#44aacc', catColor: '#3399bb',
        },
        // 5 — EMBER: deep crimson/orange fiery dusk
        {
            paper: ['#f7e8e0','#f0dbd0','#e8cabb'],
            sky: ['#ffcc88','30%','#ff8844','65%','#cc2200','100%','#661100'],
            mist: '#f7e8e0',
            mtn1: '#882200', mtn2: '#551100', mtn3: '#220800'],
            sun: '#ffff88', sunGlow: '#ff6600',
            labelFill: '#f0ddd5', labelStroke: '#d4bba8', labelText: '#330800', labelSub: '#884422',
            titleColor: '#330800', artistColor: '#772200', accentColor: '#cc5500', catColor: '#aa4400',
        },
        // 6 — STORM: grey-blue, overcast & dramatic
        {
            paper: ['#e0e4ea','#d4d9e2','#c5ccd8'],
            sky: ['#b0bbc8','30%','#8898aa','65%','#607080','100%','#384050'],
            mist: '#e0e4ea',
            mtn1: '#4a5560', mtn2: '#30404d', mtn3: '#182028'],
            sun: '#ddeeff', sunGlow: '#aabbcc',
            labelFill: '#d8dde6', labelStroke: '#b8bfcc', labelText: '#1a2030', labelSub: '#4a5566',
            titleColor: '#1a2030', artistColor: '#3a4a5a', accentColor: '#5a7088', catColor: '#506070',
        },
        // 7 — AURORA: deep arctic night, northern lights green/violet
        {
            paper: ['#0d1a22','#111e2a','#152535'],
            sky: ['#050e1a','30%','#0a1e2e','65%','#0e3322','100%','#112800'],
            mist: '#0d1a22',
            mtn1: '#0a2a1a', mtn2: '#061e10', mtn3: '#030e08'],
            sun: '#88ffcc', sunGlow: '#44aa88',
            labelFill: '#0e2030', labelStroke: '#1a3a4a', labelText: '#88ffcc', labelSub: '#44aa88',
            titleColor: '#88ffdd', artistColor: '#44ccaa', accentColor: '#226644', catColor: '#228855',
        },
    ];

    // Derive variation from _bgGrad (legacy) or passed variation number
    let v = (typeof variation === 'number') ? variation % 8 : 0;
    // Heuristic fallback: pick variation based on the gradient string content
    if (typeof variation === 'undefined' || variation === null) {
        const g = (_bgGrad || '');
        if (g.includes('#4158D0') || g.includes('#2b5876') || g.includes('#0072ff') || g.includes('#667eea') || g.includes('#4A00E0') || g.includes('#21D4FD') || g.includes('#0093E9') || g.includes('#30cfd0') || g.includes('#4e4376') || g.includes('#1e3c72')) v = 1; // blues → midnight
        else if (g.includes('#38ef7d') || g.includes('#11998e') || g.includes('#2BFF88') || g.includes('#80D0C7')) v = 2; // greens → forest
        else if (g.includes('#ee0979') || g.includes('#a18cd1') || g.includes('#8E2DE2') || g.includes('#8A2387') || g.includes('#FA8BFF') || g.includes('#B721FF')) v = 3; // purples → dusk
        else if (g.includes('#B2FEFA') || g.includes('#0ED2F7') || g.includes('#2BD2FF')) v = 4; // cyans → ocean
        else if (g.includes('#fc4a1a') || g.includes('#ff0844') || g.includes('#FF0844') || g.includes('#b22222')) v = 5; // reds → ember
        else if (g.includes('#FFCC70') || g.includes('#FEE140') || g.includes('#FF9A8B') || g.includes('#ffb199') || g.includes('#FA709A') || g.includes('#fee140')) v = 0; // warm → dawn
        else v = 0;
    }
    const t = themes[v];

    // Paper gradient string for SVG
    const paperGrad = `<stop offset="0%" stop-color="${t.paper[0]}"/><stop offset="45%" stop-color="${t.paper[1]}"/><stop offset="100%" stop-color="${t.paper[2]}"/>`;
    // Sky gradient string
    const skyGrad = `<stop offset="0%" stop-color="${t.sky[0]}"/><stop offset="${t.sky[1]}" stop-color="${t.sky[2]}"/><stop offset="${t.sky[3]}" stop-color="${t.sky[4]}"/><stop offset="100%" stop-color="${t.sky[6]}"/>`;
    // Is dark theme?
    const isDark = (v === 1 || v === 7);

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

            <!-- Sleeve Paper -->
            <linearGradient id="sleevePaper" x1="0%" y1="0%" x2="100%" y2="100%">
                ${paperGrad}
            </linearGradient>

            <!-- Sky -->
            <linearGradient id="artSky" x1="0%" y1="0%" x2="0%" y2="100%">
                ${skyGrad}
            </linearGradient>

            <!-- Mist overlay -->
            <linearGradient id="artMist" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${t.mist}" stop-opacity="0"/>
                <stop offset="50%" stop-color="${t.mist}" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="${t.mist}" stop-opacity="0.95"/>
            </linearGradient>

            <!-- Vinyl Disc Body -->
            <radialGradient id="vinylBody" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#1a1a1a"/>
                <stop offset="40%" stop-color="#0c0c0c"/>
                <stop offset="85%" stop-color="#060606"/>
                <stop offset="100%" stop-color="#020202"/>
            </radialGradient>

            <!-- Radial center glow -->
            <radialGradient id="vinylCenter" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
                <stop offset="40%" stop-color="#ffffff" stop-opacity="0.04"/>
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </radialGradient>

            <!-- Chrome Spindle -->
            <radialGradient id="spindleHub" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="35%" stop-color="#d4d4d4"/>
                <stop offset="70%" stop-color="#8c8c8c"/>
                <stop offset="100%" stop-color="#3a3a40"/>
            </radialGradient>

            <!-- Glass wave -->
            <linearGradient id="glassWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="${isDark ? '0.12' : '0.30'}"/>
                <stop offset="50%" stop-color="#ffffff" stop-opacity="0.04"/>
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </linearGradient>

            <!-- Top glare -->
            <linearGradient id="sleeveGlare" x1="0%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="${isDark ? '0.25' : '0.70'}"/>
                <stop offset="25%" stop-color="#ffffff" stop-opacity="${isDark ? '0.06' : '0.10'}"/>
                <stop offset="50%" stop-color="#ffffff" stop-opacity="0"/>
            </linearGradient>

            <!-- Sleeve clip — square with semicircular notch on right centre -->
            <clipPath id="sleeveClip">
                <path d="
                    M 16,8 H 196 C 200,8 202,10 202,32
                    V 115 C 202,127 180,133 180,150
                    C 180,167 202,173 202,185
                    V 268 C 202,290 200,292 196,292
                    H 16 C 8,292 8,284 8,276
                    V 24 C 8,10 12,8 16,8 Z
                "/>
            </clipPath>
        </defs>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- VINYL RECORD -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <g id="vinyl-disc">
            <circle cx="218" cy="150" r="93" fill="url(#vinylBody)"/>

            <!-- Micro-grooves -->
            <circle cx="218" cy="150" r="90" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            <circle cx="218" cy="150" r="87" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="1"/>
            <circle cx="218" cy="150" r="84" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
            <circle cx="218" cy="150" r="81" fill="none" stroke="rgba(0,0,0,0.45)" stroke-width="1"/>
            <circle cx="218" cy="150" r="78" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            <circle cx="218" cy="150" r="75" fill="none" stroke="rgba(0,0,0,0.40)" stroke-width="1"/>
            <circle cx="218" cy="150" r="72" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
            <circle cx="218" cy="150" r="69" fill="none" stroke="rgba(0,0,0,0.40)" stroke-width="1"/>
            <circle cx="218" cy="150" r="66" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            <circle cx="218" cy="150" r="63" fill="none" stroke="rgba(0,0,0,0.40)" stroke-width="1"/>
            <circle cx="218" cy="150" r="60" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
            <circle cx="218" cy="150" r="57" fill="none" stroke="rgba(0,0,0,0.40)" stroke-width="1"/>
            <circle cx="218" cy="150" r="54" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            <circle cx="218" cy="150" r="51" fill="none" stroke="rgba(0,0,0,0.40)" stroke-width="1"/>
            <circle cx="218" cy="150" r="48" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
            <circle cx="218" cy="150" r="45" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="1"/>
            <circle cx="218" cy="150" r="42" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            <circle cx="218" cy="150" r="39" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="1"/>
            <circle cx="218" cy="150" r="36" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

            <!-- Iridescent conic sheen arcs -->
            <path d="M 218,150 L 174,89 A 72 72 0 0 1 248,80 Z" fill="#ffffff" opacity="0.22"/>
            <path d="M 218,150 L 262,211 A 72 72 0 0 1 188,220 Z" fill="#ffffff" opacity="0.16"/>
            <circle cx="218" cy="150" r="93" fill="url(#vinylCenter)"/>

            <!-- Center Paper Label -->
            <circle cx="218" cy="150" r="32" fill="${t.labelFill}" stroke="${t.labelStroke}" stroke-width="1"/>
            <circle cx="218" cy="150" r="30" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>

            <!-- Mountain emblem -->
            <path d="M 204,145 L 211,137 L 218,145" fill="none" stroke="${t.labelText}" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/>
            <path d="M 214,145 L 222,134 L 230,145" fill="none" stroke="${t.labelText}" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/>
            <path d="M 222,137 L 220,141" stroke="${t.labelText}" stroke-width="0.8" stroke-linecap="round"/>

            <!-- Label text -->
            <text x="218" y="157" font-family="'Helvetica Neue',Helvetica,Arial,sans-serif" font-size="4.5" font-weight="700" fill="${t.labelText}" text-anchor="middle" letter-spacing="1.5">${cleanTitle.slice(0, 10).toUpperCase()}</text>
            <text x="218" y="163" font-family="'Helvetica Neue',Helvetica,Arial,sans-serif" font-size="3" font-weight="400" fill="${t.labelSub}" text-anchor="middle" letter-spacing="0.6">${displayArtist.slice(0, 16)}</text>
            <line x1="212" y1="167" x2="224" y2="167" stroke="${t.labelStroke}" stroke-width="0.5"/>

            <!-- Chrome spindle -->
            <circle cx="218" cy="150" r="8" fill="url(#spindleHub)" stroke="rgba(0,0,0,0.4)" stroke-width="0.6"/>
            <circle cx="218" cy="150" r="3" fill="#111111"/>
        </g>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SLEEVE -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <g id="sleeve-jacket" clip-path="url(#sleeveClip)">

            <!-- Sleeve base -->
            <rect x="8" y="8" width="194" height="284" fill="url(#sleevePaper)"/>

            <!-- Artwork window (bottom 75%) -->
            <g transform="translate(8, 78)">
                <rect width="194" height="214" fill="url(#artSky)"/>

                <!-- Sun / Moon element -->
                <circle cx="118" cy="65" r="7" fill="${t.sun}" opacity="0.95"/>
                <circle cx="118" cy="65" r="16" fill="${t.sunGlow}" opacity="0.35"/>

                <!-- Mountain layers -->
                <path d="M -5,95 Q 40,42 70,65 T 140,52 T 199,82 V 214 H -5 Z" fill="${t.mtn1}" opacity="0.55"/>
                <path d="M -5,120 Q 55,72 108,102 T 199,90 V 214 H -5 Z" fill="${t.mtn2}" opacity="0.9"/>
                <path d="M -5,148 Q 28,112 58,138 T 118,110 T 170,130 T 199,118 V 214 H -5 Z" fill="${t.mtn3}" opacity="1"/>

                <!-- Mist -->
                <rect width="194" height="214" fill="url(#artMist)"/>

                <!-- Glass wave 1 (upper) -->
                <path d="M -5,82 C 42,82 85,122 128,68 C 158,32 178,48 202,40 V 214 H -5 Z" fill="url(#glassWave1)"/>
                <path d="M -5,82 C 42,82 85,122 128,68 C 158,32 178,48 202,40" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>

                <!-- Glass wave 2 (lower) -->
                <path d="M -5,115 C 38,120 76,138 110,162 C 142,188 172,160 202,148 V 214 H -5 Z" fill="${t.mist}" opacity="0.75"/>
                <path d="M -5,115 C 38,120 76,138 110,162 C 142,188 172,160 202,148" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2"/>
            </g>

            <!-- Top glare -->
            <path d="M 8,8 L 202,8 L 202,42 L 8,155 Z" fill="url(#sleeveGlare)"/>

            <!-- Title -->
            <text x="26" y="50" font-family="'Helvetica Neue',Helvetica,Arial,sans-serif" font-size="15" font-weight="300" fill="${t.titleColor}" letter-spacing="5">${displayTitle}</text>

            <!-- Artist -->
            <text x="26" y="63" font-family="'Helvetica Neue',Helvetica,Arial,sans-serif" font-size="6" font-weight="500" fill="${t.artistColor}" letter-spacing="1.8">${displayArtist}</text>

            <!-- Accent line -->
            <line x1="26" y1="70" x2="56" y2="70" stroke="${t.accentColor}" stroke-width="0.8"/>

            <!-- Catalog -->
            <text x="26" y="272" font-family="'Helvetica Neue',Helvetica,Arial,sans-serif" font-size="6" font-weight="500" fill="${t.catColor}" letter-spacing="1.5">VOL. 01</text>
        </g>

        <!-- Bevel highlight (top/left — white gloss) -->
        <path d="
            M 16,8 H 196 C 200,8 202,10 202,32
            V 115 C 202,127 180,133 180,150
            C 180,167 202,173 202,185
            V 268 C 202,290 200,292 196,292
            H 16 C 10,292 8,288 8,276
            V 24 C 8,12 10,8 16,8 Z
        " fill="none" stroke="${isDark ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.85)'}" stroke-width="1.5"/>

        <!-- Bevel shadow (bottom/right — dark edge) -->
        <path d="
            M 16.5,8.5 H 196 C 200,8.5 201.5,10 201.5,32
            V 115 C 201.5,127 179.5,133 179.5,150
            C 179.5,167 201.5,173 201.5,185
            V 268 C 201.5,290 200,291.5 196,291.5
            H 16.5 C 10,291.5 8.5,288 8.5,276
            V 24 C 8.5,12 10,8.5 16.5,8.5 Z
        " fill="none" stroke="${isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.12)'}" stroke-width="0.8"/>
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
        cover: 'images/Music_Alums/album2.png',
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
        cover: 'images/Music_Alums/album2.png',
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
        cover: 'images/Music_Alums/album1.png',
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
    { id: 101, name: 'Dawn Acoustic', description: 'Relaxing acoustic sessions & organic chill vibes', cover: 'images/Music_Alums/album1.png' },
    { id: 102, name: 'After Hours Radio', description: 'Synth-wave, late night drives & pop hits', cover: 'images/Music_Alums/album2.png' },
    { id: 103, name: 'Deep Focus', description: 'Ambient soundscapes & electronic flow', cover: createGradientCover('Deep Focus', 'Apple Music', '<stop offset="0%" stop-color="#30cfd0"/><stop offset="100%" stop-color="#330867"/>') },
    { id: 104, name: 'Today\'s Hits', description: 'The biggest songs on Apple Music right now', cover: createGradientCover('Today\'s Hits', 'Apple Music', '<stop offset="0%" stop-color="#fa709a"/><stop offset="100%" stop-color="#fee140"/>', '#111111') }
];

window.APPLE_MUSIC_DATA = {
    songs: mockSongs,
    playlists: mockPlaylists
};
