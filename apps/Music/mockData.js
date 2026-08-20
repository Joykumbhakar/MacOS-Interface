// ════════════════════════════════════════════════════════════════════════════════
// HIGH-FIDELITY 1:1 ALBUM BOOK COVER GENERATOR (UNCROPPED VINYL)
// ════════════════════════════════════════════════════════════════════════════════
function createGradientCover(text, artist, bgGrad, textColor = '#ffffff', isSpinning = false) {
    const cleanTitle = (text || 'MUSIC').replace(/[^a-zA-Z0-9 ]/g, '').trim();
    const displayTitle = (cleanTitle.length > 9 ? cleanTitle.slice(0, 9) : cleanTitle || 'MUSIC').split('').join(' ').toUpperCase();
    const displayArtist = (artist || 'ALL THE STARS').toUpperCase().slice(0, 22);

    const isImage = bgGrad && (bgGrad.startsWith('images/') || bgGrad.startsWith('http'));

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
                    transform-origin: 204px 150px;
                }
            </style>

            <!-- Inset Scenery / Artwork Gradient -->
            <linearGradient id="artBg" x1="0%" y1="0%" x2="100%" y2="100%">
                ${isImage ? '' : bgGrad}
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
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
                <stop offset="35%" stop-color="#ffffff" stop-opacity="0.08" />
                <stop offset="70%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>

            <!-- Sleeve Notch Clip Path (Square 186x186 Sleeve with Notch) -->
            <clipPath id="sleeveClip">
                <path d="
                    M 26,57
                    H 180
                    Q 196,57 196,73
                    V 122
                    C 196,132 174,138 174,150
                    C 174,162 196,168 196,178
                    V 227
                    Q 196,243 180,243
                    H 26
                    Q 10,243 10,227
                    V 73
                    Q 10,57 26,57
                    Z
                " />
            </clipPath>
        </defs>

        <!-- ════════════════════════════════════════════════════════════════════ -->
        <!-- VINYL RECORD (SLIDING OUT ON THE RIGHT - 100% UNCROPPED 204+88=292 < 300) -->
        <!-- ════════════════════════════════════════════════════════════════════ -->
        <g id="vinyl-disc" class="${isSpinning ? 'vinyl-rotating' : ''}">
            <!-- Vinyl Outer Disc -->
            <circle cx="204" cy="150" r="88" fill="url(#vinylBody)" stroke="#050507" stroke-width="1.2" />

            <!-- Anisotropic Radial Light Flares (Specular Sheen) -->
            <path d="M 116,150 L 204,150 L 266,88 A 88 88 0 0 1 292,150 Z" fill="url(#vinylSheen1)" opacity="0.4" />
            <path d="M 204,150 L 142,212 A 88 88 0 0 1 116,150 Z" fill="url(#vinylSheen1)" opacity="0.4" />
            <path d="M 204,150 L 266,212 A 88 88 0 0 1 204,238 Z" fill="url(#vinylSheen1)" opacity="0.28" />
            <path d="M 204,150 L 142,88 A 88 88 0 0 1 204,62 Z" fill="url(#vinylSheen1)" opacity="0.28" />

            <!-- Concentric Sound Grooves -->
            <circle cx="204" cy="150" r="85" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="81" fill="none" stroke="rgba(0,0,0,0.45)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="77" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="73" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="69" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="65" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="61" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="57" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="53" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="49" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="45" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="41" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="37" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.75" />
            <circle cx="204" cy="150" r="33" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="0.75" />

            <!-- Center Paper Label (Cream / Matte Off-White) -->
            <circle cx="204" cy="150" r="31" fill="#ede9e2" stroke="#d5d0c7" stroke-width="1" />
            <circle cx="204" cy="150" r="29" fill="none" stroke="#ded9cf" stroke-width="0.5" />

            <!-- Label Artwork / Minimal Mountain Emblem -->
            <path d="M 190,143 L 197,136 L 204,143" fill="none" stroke="#6a6863" stroke-width="1" stroke-linejoin="round" />
            <path d="M 201,143 L 209,134 L 217,143" fill="none" stroke="#6a6863" stroke-width="1" stroke-linejoin="round" />
            
            <!-- Label Spindle Text -->
            <text x="204" y="157" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="4" font-weight="700" fill="#2a2824" text-anchor="middle" letter-spacing="1">${cleanTitle.slice(0, 10).toUpperCase()}</text>
            <text x="204" y="162" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" font-size="2.6" font-weight="500" fill="#6a6863" text-anchor="middle" letter-spacing="0.5">${displayArtist.slice(0, 16)}</text>
            <line x1="198" y1="165" x2="210" y2="165" stroke="#b5b0a6" stroke-width="0.4" />

            <!-- Center Metallic Spindle Bushing & Hole -->
            <circle cx="204" cy="150" r="5" fill="url(#spindleHub)" stroke="#55555c" stroke-width="0.6" />
            <circle cx="204" cy="150" r="2.2" fill="#000000" />
        </g>

        <!-- ════════════════════════════════════════════════════════════════════ -->
        <!-- SLEEVE (FRONT COVER WITH NOTCH CUTOUT - EXACT 1:1 SQUARE 186x186) -->
        <!-- ════════════════════════════════════════════════════════════════════ -->
        <g id="sleeve-jacket" clip-path="url(#sleeveClip)">
            <!-- Sleeve Base Background -->
            <rect x="10" y="57" width="186" height="186" fill="url(#sleevePaper)" />

            <!-- Background Landscape / Vibrant Gradient Artwork Window -->
            <g transform="translate(10, 96)">
                ${isImage 
                    ? `<image href="${bgGrad}" x="0" y="0" width="186" height="147" preserveAspectRatio="xMidYMid slice" />`
                    : `<rect width="186" height="147" fill="url(#artBg)" />
                       <!-- Mountain Silhouettes -->
                       <path d="M 0,65 Q 38,28 65,46 T 130,38 T 186,60 V 147 H 0 Z" fill="#2b323c" opacity="0.85" />
                       <path d="M 0,85 Q 55,52 102,75 T 186,70 V 147 H 0 Z" fill="#1b2027" opacity="0.95" />
                       <!-- Glowing Sun/Dawn Core -->
                       <circle cx="112" cy="42" r="5.5" fill="#fffbe8" />
                       <circle cx="112" cy="42" r="12" fill="#ffb469" opacity="0.38" />`
                }
            </g>

            <!-- Frosted Glass Wave Ribbon 1 (Upper Translucent Layer) -->
            <path d="M 10,135 C 45,135 85,168 122,125 C 150,96 170,110 196,105 V 243 H 10 Z" fill="url(#glassWave1)" />
            <path d="M 10,135 C 45,135 85,168 122,125 C 150,96 170,110 196,105" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.85" />

            <!-- Frosted Glass Wave Ribbon 2 (Lower Cream Layer) -->
            <path d="M 10,165 C 42,168 75,180 105,202 C 138,226 168,202 196,190 V 243 H 10 Z" fill="#ded9d0" opacity="0.92" />
            <path d="M 10,165 C 42,168 75,180 105,202 C 138,226 168,202 196,190" fill="none" stroke="#ffffff" stroke-width="1.1" opacity="0.9" />

            <!-- Diagonal Glass Sheen Glare across Top of Sleeve -->
            <path d="M 10,57 L 196,57 L 196,80 L 10,150 Z" fill="url(#glassGlare)" />

            <!-- ── Editorial Typography ─────────────────────────────────────── -->
            <!-- Top Title -->
            <text x="24" y="77" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" font-size="11.5" font-weight="700" fill="#1c202a" letter-spacing="3.2">${displayTitle}</text>
            
            <!-- Subtitle -->
            <text x="24" y="87" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" font-size="4.8" font-weight="600" fill="#6a707e" letter-spacing="1.4">${displayArtist}</text>
            
            <!-- Horizontal Divider Line -->
            <line x1="24" y1="91" x2="42" y2="91" stroke="#a6abb6" stroke-width="0.7" />

            <!-- Bottom Left Catalog Number -->
            <text x="24" y="235" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" font-size="4.5" font-weight="600" fill="#6a707e" letter-spacing="1">VOL. 01</text>
        </g>

        <!-- Sleeve Perimeter Bevel & Notch Outline Highlight (Exact 1:1 Square 186x186) -->
        <path d="
            M 26,57
            H 180
            Q 196,57 196,73
            V 122
            C 196,132 174,138 174,150
            C 174,162 196,168 196,178
            V 227
            Q 196,243 180,243
            H 26
            Q 10,243 10,227
            V 73
            Q 10,57 26,57
            Z
        " fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" />

        <path d="
            M 26,57.5
            H 180
            Q 195.5,57.5 195.5,73
            V 122
            C 195.5,132 173.5,138 173.5,150
            C 173.5,162 195.5,168 195.5,178
            V 227
            Q 195.5,242.5 180,242.5
            H 26
            Q 10.5,242.5 10.5,227
            V 73
            Q 10.5,57.5 26,57.5
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
        title: "All The Stars",
        artist: "Kendrick Lamar & SZA",
        album: "Black Panther OST",
        duration: '3:52',
        url: "Tracks/All The Stars - Music Video _ Black Panther _ Kendrick Lamar _ SZA _ Chadwick Boseman.mp3",
        cover: createGradientCover("All Stars", "Kendrick & SZA", "<stop offset='0%' stop-color='#1a2a6c' /><stop offset='50%' stop-color='#b21f1f' /><stop offset='100%' stop-color='#fdbb2d' />")
    },
    {
        id: 101,
        title: "Banjaare",
        artist: "Barsaat x Spider-Man",
        album: "Brand New Day Edition",
        duration: '3:15',
        url: "Tracks/Banjaare _ Barsaat x Spider-Man (Brand New Day Edition).mp3",
        cover: createGradientCover("Banjaare", "Spider-Man", "<stop offset='0%' stop-color='#f857a6' /><stop offset='100%' stop-color='#ff5858' />")
    },
    {
        id: 102,
        title: "Boom Shaka",
        artist: "KR$NA & Dhanda Nyoliwala",
        album: "Singles",
        duration: '3:05',
        url: "Tracks/Boom Shaka (Official Music Video) _ KR$NA _  Dhanda Nyoliwala.mp3",
        cover: createGradientCover("Boom Shaka", "KR$NA", "<stop offset='0%' stop-color='#11998e' /><stop offset='100%' stop-color='#38ef7d' />")
    },
    {
        id: 103,
        title: "LET THE WORLD BURN",
        artist: "Chris Grey",
        album: "Let The World Burn",
        duration: '3:28',
        url: "Tracks/Chris Grey - LET THE WORLD BURN (Official Lyric Video).mp3",
        cover: createGradientCover("Burn", "Chris Grey", "<stop offset='0%' stop-color='#ff4e50' /><stop offset='100%' stop-color='#f9d423' />")
    },
    {
        id: 104,
        title: "DJ V12",
        artist: "FUNK ABNORMAL (Slowed)",
        album: "Phonk Sessions",
        duration: '2:48',
        url: "Tracks/FUNK ABNORMAL (Slowed) - DJ V12.mp3",
        cover: createGradientCover("DJ V12", "Funk Abnormal", "<stop offset='0%' stop-color='#8E2DE2' /><stop offset='100%' stop-color='#4A00E0' />")
    },
    {
        id: 105,
        title: "FUNK TAKA",
        artist: "Phonk Edition (Slowed)",
        album: "Drift Phonk",
        duration: '2:30',
        url: "Tracks/FUNK TAKA (SLOWED).mp3",
        cover: createGradientCover("Funk Taka", "Phonk", "<stop offset='0%' stop-color='#1f4037' /><stop offset='100%' stop-color='#99f2c8' />")
    },
    {
        id: 106,
        title: "Tame Impala",
        artist: "Spider-Man / Brand New Day",
        album: "LOSER Sessions",
        duration: '3:40',
        url: "Tracks/LOSER - Tame Impala _ Spider-Man_ Brand New Day.mp3",
        cover: createGradientCover("Tame Impala", "Brand New Day", "<stop offset='0%' stop-color='#ee0979' /><stop offset='100%' stop-color='#ff6a00' />")
    },
    {
        id: 107,
        title: "KALYANI PHONK",
        artist: "MASHUQ HAQUE",
        album: "Phonk Wave",
        duration: '2:25',
        url: "Tracks/MASHUQ HAQUE - KALYANI PHONK (PHONK).mp3",
        cover: createGradientCover("Kalyani", "Mashuq Haque", "<stop offset='0%' stop-color='#00c6ff' /><stop offset='100%' stop-color='#0072ff' />")
    },
    {
        id: 108,
        title: "MONTAGEM PEGADORA",
        artist: "Brazilian Phonk",
        album: "Pegadora",
        duration: '2:15',
        url: "Tracks/MONTAGEM PEGADORA (Slowed).mp3",
        cover: createGradientCover("Pegadora", "Brazilian Phonk", "<stop offset='0%' stop-color='#ff0844' /><stop offset='100%' stop-color='#ffb199' />")
    },
    {
        id: 109,
        title: "MONTAGEM URANIUM",
        artist: "Ultra Slowed",
        album: "Uranium",
        duration: '2:50',
        url: "Tracks/MONTAGEM URANIUM (Ultra Slowed).mp3",
        cover: createGradientCover("Uranium", "Montagem", "<stop offset='0%' stop-color='#30cfd0' /><stop offset='100%' stop-color='#330867' />")
    },
    {
        id: 110,
        title: "Khat",
        artist: "Navjot Ahuja",
        album: "Khat Singles",
        duration: '3:30',
        url: "Tracks/Navjot Ahuja - Khat (Official Audio).mp3",
        cover: createGradientCover("Khat", "Navjot Ahuja", "<stop offset='0%' stop-color='#f77062' /><stop offset='100%' stop-color='#fe5196' />")
    },
    {
        id: 111,
        title: "Sunflower",
        artist: "Post Malone & Swae Lee",
        album: "Spider-Man: Into the Spider-Verse",
        duration: '2:38',
        url: "Tracks/Post Malone, Swae Lee - Sunflower (Spider-Man_ Into the Spider-Verse).mp3",
        cover: createGradientCover("Sunflower", "Post Malone", "<stop offset='0%' stop-color='#f7971e' /><stop offset='100%' stop-color='#ffd200' />")
    },
    {
        id: 112,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: '3:20',
        url: "Tracks/The Weeknd - Blinding Lights (Official Video).mp3",
        cover: createGradientCover("Blinding", "The Weeknd", "<stop offset='0%' stop-color='#fc4a1a' /><stop offset='100%' stop-color='#f7b733' />")
    },
    {
        id: 113,
        title: "Timeless",
        artist: "Spider-Verse",
        album: "Original Soundtrack",
        duration: '3:10',
        url: "Tracks/Timeless _ Spider-Verse.mp3",
        cover: createGradientCover("Timeless", "Spider-Verse", "<stop offset='0%' stop-color='#654ea3' /><stop offset='100%' stop-color='#eaafc8' />")
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
        cover: createGradientCover('Starboy', 'The Weeknd', '<stop offset="0%" stop-color="#eb3349"/><stop offset="100%" stop-color="#f45c43"/>'),
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
        cover: createGradientCover('Levitating', 'Dua Lipa', '<stop offset="0%" stop-color="#fa709a"/><stop offset="100%" stop-color="#fee140"/>'),
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
        cover: createGradientCover('As It Was', 'Harry Styles', '<stop offset="0%" stop-color="#0093e9"/><stop offset="100%" stop-color="#80d0c7"/>'),
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
        cover: createGradientCover('Save Tears', 'The Weeknd', '<stop offset="0%" stop-color="#667eea"/><stop offset="100%" stop-color="#764ba2"/>'),
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
