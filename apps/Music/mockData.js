// Apple Music Database with High-Fidelity Artwork & Previews

// Helper to create reliable SVG gradient covers
function createGradientCover(text, artist, bgGrad, textColor = '#ffffff') {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
        <defs>
            <!-- Album Art Inset Gradient -->
            <linearGradient id="artBg" x1="0%" y1="0%" x2="100%" y2="100%">
                ${bgGrad}
            </linearGradient>

            <!-- Book Spine Leather/Cloth Gradient -->
            <linearGradient id="spineLeather" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#18181c" />
                <stop offset="35%" stop-color="#303036" />
                <stop offset="70%" stop-color="#222228" />
                <stop offset="100%" stop-color="#121215" />
            </linearGradient>

            <!-- Gold Foil Accent Gradient -->
            <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffe4a0" />
                <stop offset="25%" stop-color="#ffd07b" />
                <stop offset="50%" stop-color="#fff2c8" />
                <stop offset="75%" stop-color="#d49c43" />
                <stop offset="100%" stop-color="#f5c767" />
            </linearGradient>

            <!-- Anisotropic Vinyl Sheen -->
            <linearGradient id="aniso" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28" />
                <stop offset="30%" stop-color="#ffffff" stop-opacity="0.06" />
                <stop offset="50%" stop-color="#ffffff" stop-opacity="0.2" />
                <stop offset="70%" stop-color="#ffffff" stop-opacity="0.04" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0.22" />
            </linearGradient>

            <!-- Spine Crease Shadow -->
            <linearGradient id="creaseShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#000000" stop-opacity="0.5" />
                <stop offset="40%" stop-color="#000000" stop-opacity="0.18" />
                <stop offset="100%" stop-color="#000000" stop-opacity="0" />
            </linearGradient>

            <!-- Layered Page Edge Stack -->
            <linearGradient id="pageEdges" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#e2e2e6" />
                <stop offset="50%" stop-color="#fafafc" />
                <stop offset="100%" stop-color="#c8c8cc" />
            </linearGradient>
        </defs>

        <!-- Hardcover Base Jacket -->
        <rect width="300" height="300" rx="6" fill="#18181c" />

        <!-- Visible Layered Paper Pages Stack on Right Edge -->
        <rect x="292" y="6" width="5" height="288" rx="1.5" fill="url(#pageEdges)" />
        <line x1="293.5" y1="6" x2="293.5" y2="294" stroke="#bcbcc2" stroke-width="0.5" />
        <line x1="295" y1="7" x2="295" y2="293" stroke="#dcdce2" stroke-width="0.5" />

        <!-- Front Hardcover Board Surface -->
        <rect x="0" y="0" width="292" height="300" rx="5" fill="#202028" />
        
        <!-- Bound Book Spine (Left Strip) -->
        <rect x="0" y="0" width="24" height="300" rx="4" fill="url(#spineLeather)" />
        <line x1="0.75" y1="0" x2="0.75" y2="300" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" />

        <!-- Gold Foil Thread Stitching along Spine Hinge -->
        <g stroke="url(#goldFoil)" stroke-width="1.5" stroke-linecap="round" opacity="0.9">
            <line x1="12" y1="14" x2="12" y2="24" />
            <line x1="12" y1="38" x2="12" y2="48" />
            <line x1="12" y1="62" x2="12" y2="72" />
            <line x1="12" y1="86" x2="12" y2="96" />
            <line x1="12" y1="110" x2="12" y2="120" />
            <line x1="12" y1="134" x2="12" y2="144" />
            <line x1="12" y1="158" x2="12" y2="168" />
            <line x1="12" y1="182" x2="12" y2="192" />
            <line x1="12" y1="206" x2="12" y2="216" />
            <line x1="12" y1="230" x2="12" y2="240" />
            <line x1="12" y1="254" x2="12" y2="264" />
            <line x1="12" y1="278" x2="12" y2="288" />
        </g>

        <!-- Spine Hinge Crease Line & Depth Shadow -->
        <line x1="24" y1="0" x2="24" y2="300" stroke="#000000" stroke-width="1.5" />
        <rect x="24" y="0" width="14" height="300" fill="url(#creaseShadow)" />
        <line x1="25.5" y1="0" x2="25.5" y2="300" stroke="rgba(255,255,255,0.14)" stroke-width="1" />

        <!-- Debossed Artwork Inset Picture Window -->
        <rect x="34" y="14" width="248" height="272" rx="6" fill="#121215" />
        <rect x="35" y="15" width="246" height="270" rx="5" fill="url(#artBg)" />

        <!-- High-Fidelity Vinyl Sound Grooves inside Art Window -->
        <circle cx="158" cy="150" r="105" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <circle cx="158" cy="150" r="90" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="0.75" />
        <circle cx="158" cy="150" r="75" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1" />
        <circle cx="158" cy="150" r="60" fill="none" stroke="rgba(0,0,0,0.07)" stroke-width="0.75" />
        <circle cx="158" cy="150" r="46" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

        <!-- Anisotropic Light Reflections in Inset Art -->
        <path d="M 35,15 L 158,150 L 281,15 Z" fill="url(#aniso)" opacity="0.38" />
        <path d="M 35,285 L 158,150 L 281,285 Z" fill="url(#aniso)" opacity="0.38" />

        <!-- 3D Gold-Foil Apple Music Emblem -->
        <!-- Drop Shadow -->
        <path d="M136 195 C 136 209, 124.5 220, 110 220 C 95.5 220, 84 209, 84 195 C 84 181, 95.5 170, 110 170 C 119 170, 126 174, 130 181 L 130 85 L 230 62 L 230 170 C 230 184, 218.5 195, 204 195 C 189.5 195, 178 184, 178 170 C 178 156, 189.5 145, 204 145 C 213 145, 220 149, 224 156 L 224 96 L 136 117 Z" fill="#000000" opacity="0.32" transform="translate(0, 3)" />
        
        <!-- Gold Foil Note Body -->
        <path d="M136 195 C 136 209, 124.5 220, 110 220 C 95.5 220, 84 209, 84 195 C 84 181, 95.5 170, 110 170 C 119 170, 126 174, 130 181 L 130 85 L 230 62 L 230 170 C 230 184, 218.5 195, 204 195 C 189.5 195, 178 184, 178 170 C 178 156, 189.5 145, 204 145 C 213 145, 220 149, 224 156 L 224 96 L 136 117 Z" fill="url(#goldFoil)" stroke="rgba(255,255,255,0.75)" stroke-width="1.2" />
        
        <!-- Top Beam Specular Light -->
        <path d="M130 85 L 230 62 L 230 66 L 130 89 Z" fill="#ffffff" opacity="0.95" />

        <!-- Inset Frame Deboss Border -->
        <rect x="35" y="15" width="246" height="270" rx="5" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="1.5" />
        <rect x="36" y="16" width="244" height="268" rx="4" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1" />

        <!-- Outer Hardcover Book Edge Bevel Highlight -->
        <rect x="0.75" y="0.75" width="298.5" height="298.5" rx="5.5" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" />
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

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
