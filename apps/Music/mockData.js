// Apple Music Database with High-Fidelity Artwork & Previews

// // Helper to create reliable SVG gradient covers with spinning vinyl disc
function createGradientCover(text, artist, bgGrad, textColor = '#ffffff', isSpinning = false) {
    const cleanTitle = (text || 'DAWN').replace(/[^a-zA-Z0-9 ]/g, '').trim();
    const displayTitle = (cleanTitle.length > 8 ? cleanTitle.slice(0, 8) : cleanTitle || 'DAWN').split('').join(' ').toUpperCase();
    const displayArtist = (artist || 'ACOUSTIC SESSIONS').toUpperCase().slice(0, 22);

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
                ${bgGrad}
            </linearGradient>

            <!-- Sleeve Cream Matte Base Gradient -->
            <linearGradient id="sleevePaper" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f6f3ee" />
                <stop offset="45%" stop-color="#eeebe4" />
                <stop offset="100%" stop-color="#dfdad1" />
            </linearGradient>

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
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.38" />
                <stop offset="35%" stop-color="#ffffff" stop-opacity="0.1" />
                <stop offset="70%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>

            <!-- Sleeve Notch Clip Path -->
            <clipPath id="sleeveClip">
                <path d="
                    M 30,10
                    H 178
                    Q 200,10 200,32
                    V 112
                    C 200,124 178,132 178,150
                    C 178,168 200,176 200,188
                    V 268
                    Q 200,290 178,290
                    H 30
                    Q 8,290 8,268
                    V 32
                    Q 8,10 30,10
                    Z
                " />
            </clipPath>
        </defs>

        <!-- Transparent Studio Canvas Background (No Black Box) -->

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

            <!-- Center Paper Label (Cream / Matte Off-White) -->
            <circle cx="218" cy="150" r="31" fill="#ede9e2" stroke="#d5d0c7" stroke-width="1" />
            <circle cx="218" cy="150" r="29" fill="none" stroke="#ded9cf" stroke-width="0.5" />

            <!-- Label Artwork / Minimal Mountain Emblem -->
            <path d="M 204,143 L 211,136 L 218,143" fill="none" stroke="#6a6863" stroke-width="1" stroke-linejoin="round" />
            <path d="M 215,143 L 223,134 L 231,143" fill="none" stroke="#6a6863" stroke-width="1" stroke-linejoin="round" />
            
            <!-- Label Spindle Text -->
            <text x="218" y="157" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="4.2" font-weight="700" fill="#2a2824" text-anchor="middle" letter-spacing="1.2">${cleanTitle.slice(0, 10).toUpperCase()}</text>
            <text x="218" y="162" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="2.8" font-weight="500" fill="#6a6863" text-anchor="middle" letter-spacing="0.5">ACOUSTIC SESSIONS</text>
            <line x1="212" y1="165" x2="224" y2="165" stroke="#b5b0a6" stroke-width="0.4" />

            <!-- Center Metallic Spindle Bushing & Hole -->
            <circle cx="218" cy="150" r="5" fill="url(#spindleHub)" stroke="#55555c" stroke-width="0.6" />
            <circle cx="218" cy="150" r="2.2" fill="#000000" />
        </g>

        <!-- ════════════════════════════════════════════════════════════════════ -->
        <!-- SLEEVE (FRONT COVER WITH NOTCH CUTOUT) -->
        <!-- ════════════════════════════════════════════════════════════════════ -->
        <g id="sleeve-jacket" clip-path="url(#sleeveClip)">
            <!-- Sleeve Base Background -->
            <rect x="8" y="10" width="192" height="280" fill="url(#sleevePaper)" />

            <!-- Background Landscape / Vibrant Gradient Artwork Window -->
            <g transform="translate(8, 75)">
                <rect width="192" height="205" fill="url(#artBg)" />
                <!-- Mountain Silhouettes -->
                <path d="M 0,95 Q 40,40 70,65 T 140,55 T 192,85 V 205 H 0 Z" fill="#2b323c" opacity="0.85" />
                <path d="M 0,120 Q 60,75 110,105 T 192,95 V 205 H 0 Z" fill="#1b2027" opacity="0.95" />
                <!-- Glowing Sun/Dawn Core -->
                <circle cx="120" cy="62" r="7.5" fill="#fffbe8" />
                <circle cx="120" cy="62" r="15" fill="#ffb469" opacity="0.38" />
            </g>

            <!-- Frosted Glass Wave Ribbon 1 (Upper Translucent Layer) -->
            <path d="M 8,130 C 50,130 90,175 130,120 C 160,80 178,95 200,88 V 290 H 8 Z" fill="url(#glassWave1)" />
            <path d="M 8,130 C 50,130 90,175 130,120 C 160,80 178,95 200,88" fill="none" stroke="#ffffff" stroke-width="1.8" opacity="0.85" />

            <!-- Frosted Glass Wave Ribbon 2 (Lower Cream Layer) -->
            <path d="M 8,168 C 45,172 80,188 112,218 C 148,252 178,218 200,202 V 290 H 8 Z" fill="#ded9d0" opacity="0.92" />
            <path d="M 8,168 C 45,172 80,188 112,218 C 148,252 178,218 200,202" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.9" />

            <!-- Diagonal Glass Sheen Glare across Top of Sleeve -->
            <path d="M 8,10 L 200,10 L 200,40 L 8,150 Z" fill="url(#glassGlare)" />

            <!-- ── Editorial Typography ─────────────────────────────────────── -->
            <!-- Top Title -->
            <text x="26" y="50" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" font-size="14.5" font-weight="700" fill="#1c202a" letter-spacing="4">${displayTitle}</text>
            
            <!-- Subtitle -->
            <text x="26" y="62.5" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" font-size="5.8" font-weight="600" fill="#6a707e" letter-spacing="1.8">${displayArtist}</text>
            
            <!-- Horizontal Divider Line -->
            <line x1="26" y1="70" x2="48" y2="70" stroke="#a6abb6" stroke-width="0.8" />

            <!-- Bottom Left Catalog Number -->
            <text x="26" y="270" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" font-size="5.8" font-weight="600" fill="#6a707e" letter-spacing="1.2">VOL. 01</text>
        </g>

        <!-- Sleeve Perimeter Bevel & Notch Outline Highlight -->
        <path d="
            M 30,10
            H 178
            Q 200,10 200,32
            V 112
            C 200,124 178,132 178,150
            C 178,168 200,176 200,188
            V 268
            Q 200,290 178,290
            H 30
            Q 8,290 8,268
            V 32
            Q 8,10 30,10
            Z
        " fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" />

        <path d="
            M 30,10.6
            H 178
            Q 199.4,10.6 199.4,32
            V 112
            C 199.4,124 177.4,132 177.4,150
            C 177.4,168 199.4,176 199.4,188
            V 268
            Q 199.4,289.4 178,289.4
            H 30
            Q 8.6,289.4 8.6,268
            V 32
            Q 8.6,10.6 30,10.6
            Z
        " fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="0.8" />
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
