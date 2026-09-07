// Apple Music Database & State Engine - Professional Gradients Edition

// High-fidelity Apple Music Mesh Gradient & Vinyl Cover Generator
function createGradientCover(text, artist, _bgGrad, textColor, variation) {
    const cleanTitle = (text || 'MUSIC').trim();
    const displayTitle = cleanTitle.length > 24 ? cleanTitle.slice(0, 24) + '...' : cleanTitle;
    const displayArtist = (artist || 'Apple Music').toUpperCase().slice(0, 30);

    let hash = 0;
    const str = cleanTitle + displayArtist;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    const idx = Math.abs(hash) % 8;
    let v = (typeof variation === 'number') ? variation % 8 : idx;

    // Ultra-vibrant professional Apple-style mesh palettes
    const themes = [
        // 0: Crimson Flare & Coral Glow
        { bg: '#0e0208', c1: '#ff2d55', c2: '#ff9500', c3: '#e0115f', isDark: true },
        // 1: Midnight Electric Neon (Sapphire & Cyan)
        { bg: '#030712', c1: '#007aff', c2: '#5856d6', c3: '#00f2fe', isDark: true },
        // 2: Aurora Borealis (Deep Teal & Vibrant Emerald)
        { bg: '#02130e', c1: '#00c7be', c2: '#30d158', c3: '#10b981', isDark: true },
        // 3: Cyber Magenta & Velvet Purple
        { bg: '#0c0214', c1: '#bf5af2', c2: '#ff375f', c3: '#5e5ce6', isDark: true },
        // 4: Lava Inferno (Crimson & Amber Glow)
        { bg: '#140303', c1: '#ff3b30', c2: '#ff9500', c3: '#990000', isDark: true },
        // 5: Tokyo Phonk (Ultra Violet & Cyan Drift)
        { bg: '#070014', c1: '#7928ca', c2: '#ff0080', c3: '#00dfd8', isDark: true },
        // 6: Royal Sunburst (Gold Rush & Amber)
        { bg: '#140c00', c1: '#ff9f0a', c2: '#ffd60a', c3: '#ff453a', isDark: true },
        // 7: Deep Pacific Ocean & Aqua
        { bg: '#010d1a', c1: '#0a84ff', c2: '#64d2ff', c3: '#004080', isDark: true }
    ];
    const t = themes[v];

    const txtColor = '#ffffff';
    const subColor = 'rgba(255,255,255,0.78)';
    const appleLogoColor = 'rgba(255,255,255,0.95)';

    const layout = Math.abs(hash) % 3;
    let textSVG = '';

    if (layout === 0) {
        textSVG = `
        <g transform="translate(24, 236)">
            <text x="0" y="0" font-family="-apple-system, 'system-ui', 'Helvetica Neue', sans-serif" font-size="22" font-weight="700" fill="${txtColor}" letter-spacing="-0.5">${displayTitle}</text>
            <text x="0" y="22" font-family="-apple-system, 'Helvetica Neue', sans-serif" font-size="12" font-weight="600" fill="${subColor}" letter-spacing="0.5">${displayArtist}</text>
        </g>`;
    } else if (layout === 1) {
        textSVG = `
        <g transform="translate(150, 145)">
            <text x="0" y="0" text-anchor="middle" font-family="-apple-system, 'system-ui', 'Helvetica Neue', sans-serif" font-size="24" font-weight="800" fill="${txtColor}" letter-spacing="-0.6">${displayTitle.toUpperCase()}</text>
            <text x="0" y="26" text-anchor="middle" font-family="-apple-system, 'Helvetica Neue', sans-serif" font-size="11" font-weight="600" fill="${subColor}" letter-spacing="1.8">${displayArtist}</text>
        </g>`;
    } else {
        textSVG = `
        <g transform="translate(24, 75)">
            <text x="0" y="0" font-family="-apple-system, 'system-ui', 'Helvetica Neue', sans-serif" font-size="23" font-weight="800" fill="${txtColor}" letter-spacing="-0.5">${displayTitle}</text>
            <rect x="0" y="12" width="34" height="3" fill="${t.c2}" rx="1.5" />
            <text x="0" y="34" font-family="-apple-system, 'Helvetica Neue', sans-serif" font-size="11.5" font-weight="600" fill="${subColor}" letter-spacing="0.5">${displayArtist}</text>
        </g>`;
    }

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
        <defs>
            <filter id="meshBlur_${v}" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="36" />
            </filter>
            <radialGradient id="r1_${v}" cx="25%" cy="25%" r="75%">
                <stop offset="0%" stop-color="${t.c1}" stop-opacity="1" />
                <stop offset="100%" stop-color="${t.c1}" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="r2_${v}" cx="75%" cy="75%" r="75%">
                <stop offset="0%" stop-color="${t.c2}" stop-opacity="1" />
                <stop offset="100%" stop-color="${t.c2}" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="r3_${v}" cx="50%" cy="15%" r="65%">
                <stop offset="0%" stop-color="${t.c3}" stop-opacity="1" />
                <stop offset="100%" stop-color="${t.c3}" stop-opacity="0" />
            </radialGradient>
            <linearGradient id="overlayGrad_${v}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgba(255,255,255,0.12)" />
                <stop offset="100%" stop-color="rgba(0,0,0,0.4)" />
            </linearGradient>
        </defs>
        
        <!-- Deep Base -->
        <rect width="300" height="300" fill="${t.bg}" />
        
        <!-- Glowing Fluid Mesh Orbs -->
        <g filter="url(#meshBlur_${v})">
            <circle cx="60" cy="60" r="160" fill="url(#r1_${v})" />
            <circle cx="240" cy="240" r="170" fill="url(#r2_${v})" />
            <circle cx="150" cy="40" r="150" fill="url(#r3_${v})" />
            <circle cx="260" cy="70" r="130" fill="${t.c1}" opacity="0.65" />
            <circle cx="40" cy="260" r="140" fill="${t.c3}" opacity="0.75" />
        </g>
        
        <!-- Subtle Specular Glass Sheen -->
        <rect width="300" height="300" fill="url(#overlayGrad_${v})" />

        <!-- Apple Music Badge -->
        <g transform="translate(18, 18) scale(0.6)" opacity="0.92">
            <path d="M 20.35,14.61 C 20.37,11.23 23.11,9.6 23.23,9.52 C 21.67,7.24 19.16,6.92 18.25,6.8 C 16.27,6.6 14.33,7.96 13.3,7.96 C 12.28,7.96 10.68,6.83 9.04,6.86 C 6.9,6.89 4.93,8.1 3.82,9.99 C 1.55,13.88 3.24,19.64 5.46,22.84 C 6.54,24.39 7.82,26.13 9.48,26.07 C 11.08,26.01 11.7,25.05 13.62,25.05 C 15.53,25.05 16.08,26.07 17.75,26.04 C 19.46,26.01 20.55,24.45 21.61,22.89 C 22.88,21.05 23.4,19.26 23.44,19.17 C 23.36,19.14 20.32,17.97 20.35,14.61 Z M 16.23,4.55 C 17.11,3.48 17.72,1.96 17.56,0.44 C 16.28,0.5 14.66,1.29 13.73,2.34 C 12.92,3.27 12.18,4.82 12.37,6.31 C 13.81,6.42 15.34,5.61 16.23,4.55 Z" fill="${appleLogoColor}" />
            <text x="32" y="22" font-family="-apple-system, 'Helvetica Neue', sans-serif" font-size="18" font-weight="700" fill="${appleLogoColor}" letter-spacing="0">Music</text>
        </g>
        
        ${textSVG}
    </svg>`;
    
    try {
        const base64 = btoa(unescape(encodeURIComponent(svg)));
        return `data:image/svg+xml;base64,${base64}`;
    } catch (e) {
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }
}
window.createGradientCover = createGradientCover;

// Real Tracks Database (Native Local MP3s with Full Metadata)
const allSongs = [
    {
        id: 'track-1',
        title: 'All The Stars',
        artist: 'Kendrick Lamar & SZA',
        album: 'Black Panther: The Album',
        duration: '3:52',
        durationSec: 232,
        genre: 'Hip-Hop / R&B',
        year: 2018,
        plays: '42,918,102',
        url: 'Tracks/All The Stars - Music Video _ Black Panther _ Kendrick Lamar _ SZA _ Chadwick Boseman.mp3',
        cover: createGradientCover('All The Stars', 'Kendrick & SZA', null, null, 0),
        bannerGrad: 'linear-gradient(135deg, #180210 0%, #4d0a2f 35%, #b81545 70%, #ff4b4b 100%)',
        youtubeId: 'GfCqMv--ncA',
        format: 'Lossless â€¢ Dolby Atmos',
        lyrics: [
            { time: 0, text: "Love, let's talk about love" },
            { time: 6, text: "Is it anything and everything you hoped for?" },
            { time: 13, text: "Or do the feeling keep you on the run?" },
            { time: 20, text: "I may be close to love, but I'll never love you again" },
            { time: 28, text: "This may be the night that my dreams might let me know" },
            { time: 35, text: "All the stars are closer, all the stars are closer" },
            { time: 42, text: "All the stars are closer, all the stars are closer" },
            { time: 49, text: "Tell me what you gon' do to me" },
            { time: 54, text: "Confrontation ain't nothin' new to me" },
            { time: 61, text: "You can bring a bullet, bring a sword, bring a morgue" },
            { time: 68, text: "Skin covered in ego, get to the core" }
        ]
    },
    {
        id: 'track-2',
        title: 'Sunflower',
        artist: 'Post Malone & Swae Lee',
        album: 'Spider-Man: Into the Spider-Verse',
        duration: '2:38',
        durationSec: 158,
        genre: 'Pop / Hip-Hop',
        year: 2018,
        plays: '68,241,900',
        url: 'Tracks/Post Malone, Swae Lee - Sunflower (Spider-Man_ Into the Spider-Verse).mp3',
        cover: createGradientCover('Sunflower', 'Post Malone & Swae Lee', null, null, 6),
        bannerGrad: 'linear-gradient(135deg, #1a0f00 0%, #542d00 35%, #b86400 70%, #ffbb00 100%)',
        youtubeId: 'ApXoWvfEYVU',
        format: 'Hi-Res Lossless â€¢ Apple Digital Master',
        lyrics: [
            { time: 0, text: "Ayy, ayy, ayy, ayy (ooh)" },
            { time: 4, text: "Ooh, ooh, ooh, ooh (ooh)" },
            { time: 8, text: "Needless to say, I keep in check" },
            { time: 13, text: "She was a bad-bad, nevertheless (yeah)" },
            { time: 18, text: "Callin' it quits now, baby, I'm a wreck" },
            { time: 23, text: "Crash at my place, baby, you're a wreck" },
            { time: 28, text: "Thinkin' in a bad way, losin' your grip" },
            { time: 33, text: "Screamin' at my face, baby, don't trip" },
            { time: 38, text: "Someone took a big L, don't know how that felt" },
            { time: 43, text: "Lookin' at you sideways, party on tilt" },
            { time: 48, text: "Ooh-ooh-ooh, some things you just can't refuse" },
            { time: 53, text: "She wanna ride me like a cruise and I'm not tryna lose" },
            { time: 58, text: "Then you're left in the dust, unless I stuck by ya" },
            { time: 64, text: "You're the sunflower, I think your love would be too much" }
        ]
    },
    {
        id: 'track-3',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: '3:20',
        durationSec: 200,
        genre: 'Synth-Pop / 80s',
        year: 2020,
        plays: '94,120,410',
        url: 'Tracks/The Weeknd - Blinding Lights (Official Video).mp3',
        cover: 'images/Music_Alums/album2.png',
        bannerGrad: 'linear-gradient(135deg, #140003 0%, #45030d 35%, #940a1c 70%, #fa243c 100%)',
        youtubeId: '4NRXx6U8ABQ',
        format: 'Hi-Res Lossless â€¢ Dolby Atmos',
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
        ]
    },
    {
        id: 'track-4',
        title: 'LET THE WORLD BURN',
        artist: 'Chris Grey',
        album: 'LET THE WORLD BURN - Single',
        duration: '2:40',
        durationSec: 160,
        genre: 'Dark Pop / Alternative',
        year: 2023,
        plays: '19,530,220',
        url: 'Tracks/Chris Grey - LET THE WORLD BURN (Official Lyric Video).mp3',
        cover: createGradientCover('LET THE WORLD BURN', 'Chris Grey', null, null, 4),
        bannerGrad: 'linear-gradient(135deg, #180400 0%, #4a0f00 35%, #9e2800 70%, #ff5722 100%)',
        youtubeId: 'tKkS6H4gPso',
        format: 'Lossless â€¢ Spatial Audio',
        lyrics: [
            { time: 0, text: "I would let the world burn for you" },
            { time: 8, text: "Watch it turn to ash in front of us" },
            { time: 16, text: "If it means that I could keep you safe" },
            { time: 24, text: "I'd sacrifice tomorrow for today" },
            { time: 32, text: "There's nothing I wouldn't do" },
            { time: 40, text: "I would burn the stars right out the sky" },
            { time: 48, text: "Just to see the light inside your eyes" }
        ]
    },
    {
        id: 'track-5',
        title: 'Boom Shaka',
        artist: 'KR$NA & Dhanda Nyoliwala',
        album: 'Boom Shaka - Single',
        duration: '3:05',
        durationSec: 185,
        genre: 'Desi Hip-Hop',
        year: 2024,
        plays: '28,490,110',
        url: 'Tracks/Boom Shaka (Official Music Video) _ KR$NA _  Dhanda Nyoliwala.mp3',
        cover: createGradientCover('Boom Shaka', 'KR$NA & Dhanda', null, null, 2),
        bannerGrad: 'linear-gradient(135deg, #02140d 0%, #083b27 35%, #10754e 70%, #00e676 100%)',
        youtubeId: '47pL5-QZ4pI',
        format: 'Lossless â€¢ Apple Digital Master',
        lyrics: [
            { time: 0, text: "Boom Shaka laka, drop the bass now" },
            { time: 8, text: "KR$NA in the booth, hold the crown down" },
            { time: 16, text: "Representing from the North side to the globe" },
            { time: 24, text: "Every bar a strike, that's the heavy mode" },
            { time: 32, text: "Dhanda with the flow, we never slow" }
        ]
    },
    {
        id: 'track-6',
        title: 'LOSER',
        artist: 'Tame Impala',
        album: 'Spider-Man: Brand New Day',
        duration: '3:45',
        durationSec: 225,
        genre: 'Psychedelic Rock / Indie',
        year: 2024,
        plays: '15,820,300',
        url: 'Tracks/LOSER - Tame Impala _ Spider-Man_ Brand New Day.mp3',
        cover: createGradientCover('LOSER', 'Tame Impala', null, null, 5),
        bannerGrad: 'linear-gradient(135deg, #0a0118 0%, #29074d 35%, #6917b8 70%, #b82bf2 100%)',
        youtubeId: 'b7k00pQZkpo',
        format: 'Lossless â€¢ Dolby Atmos',
        lyrics: [
            { time: 0, text: "(Psychedelic synth intro)" },
            { time: 12, text: "Feeling like I'm drifting away again" },
            { time: 24, text: "Looking for a sign from a brand new day" },
            { time: 36, text: "They called me a loser, but I'm still here" },
            { time: 48, text: "Rays of light cut through the morning air" }
        ]
    },
    {
        id: 'track-7',
        title: 'Timeless',
        artist: 'Spider-Verse & Metro Boomin',
        album: 'Spider-Verse: The Soundtrack',
        duration: '3:15',
        durationSec: 195,
        genre: 'Trap / Cinematic',
        year: 2023,
        plays: '31,440,890',
        url: 'Tracks/Timeless _ Spider-Verse.mp3',
        cover: createGradientCover('Timeless', 'Spider-Verse', null, null, 1),
        bannerGrad: 'linear-gradient(135deg, #02091c 0%, #072352 35%, #0f4fba 70%, #00d2ff 100%)',
        youtubeId: 'Z9p8N-qB7oI',
        format: 'Lossless â€¢ Spatial Audio',
        lyrics: [
            { time: 0, text: "Across dimensions, across the time" },
            { time: 10, text: "We carry on the rhythm and the rhyme" },
            { time: 20, text: "Through neon cities and falling skies" },
            { time: 30, text: "Timeless spirit that never dies" }
        ]
    },
    {
        id: 'track-8',
        title: 'Banjaare',
        artist: 'Barsaat x Spider-Man',
        album: 'Brand New Day Edition',
        duration: '3:10',
        durationSec: 190,
        genre: 'Fusion / Pop',
        year: 2024,
        plays: '11,200,450',
        url: 'Tracks/Banjaare _ Barsaat x Spider-Man (Brand New Day Edition).mp3',
        cover: createGradientCover('Banjaare', 'Barsaat Edition', null, null, 7),
        bannerGrad: 'linear-gradient(135deg, #17041a 0%, #440c4d 35%, #9217a6 70%, #e040fb 100%)',
        youtubeId: 'kP8w-B8p3oA',
        format: 'Lossless',
        lyrics: [
            { time: 0, text: "Banjaare hum chale kahan..." },
            { time: 12, text: "Yeh raste yeh dhuwan dhuwan" },
            { time: 24, text: "Spider webs across the skyline" },
            { time: 36, text: "Every beat aligns in time" }
        ]
    },
    {
        id: 'track-9',
        title: 'KALYANI PHONK',
        artist: 'MASHUQ HAQUE',
        album: 'Phonk Odyssey',
        duration: '2:15',
        durationSec: 135,
        genre: 'Drift Phonk',
        year: 2023,
        plays: '45,820,110',
        url: 'Tracks/MASHUQ HAQUE - KALYANI PHONK (PHONK).mp3',
        cover: createGradientCover('KALYANI PHONK', 'MASHUQ HAQUE', null, null, 1),
        bannerGrad: 'linear-gradient(135deg, #030a1c 0%, #0b2659 35%, #1459b8 70%, #00f2fe 100%)',
        youtubeId: 'qW9pL8zKpoI',
        format: 'Lossless',
        lyrics: [
            { time: 0, text: "(Heavy cowbell melody echoes)" },
            { time: 15, text: "(Deep 808 sub drops)" },
            { time: 30, text: "Drifting through the midnight fog..." },
            { time: 45, text: "(Phonk bassline intensifies)" }
        ]
    },
    {
        id: 'track-10',
        title: 'MONTAGEM URANIUM',
        artist: 'DJ Uranium Beats',
        album: 'Brazilian Phonk Ultra',
        duration: '2:10',
        durationSec: 130,
        genre: 'Brazilian Phonk',
        year: 2024,
        plays: '52,190,000',
        url: 'Tracks/MONTAGEM URANIUM (Ultra Slowed).mp3',
        cover: createGradientCover('MONTAGEM URANIUM', 'Ultra Slowed', null, null, 3),
        bannerGrad: 'linear-gradient(135deg, #0e0214 0%, #35084a 35%, #7614a3 70%, #c438ff 100%)',
        youtubeId: 'tK9b0-wXoPA',
        format: 'Lossless',
        lyrics: [
            { time: 0, text: "(Slowed rhythm begins)" },
            { time: 14, text: "(Ultra reverb & atmospheric drift)" },
            { time: 28, text: "Feel the uranium wave vibrance" },
            { time: 42, text: "(Heavy sub bass harmonic resonance)" }
        ]
    },
    {
        id: 'track-11',
        title: 'MONTAGEM PEGADORA',
        artist: 'DJ Funk Master',
        album: 'Favela Drift',
        duration: '2:05',
        durationSec: 125,
        genre: 'Brazilian Funk / Phonk',
        year: 2024,
        plays: '38,710,000',
        url: 'Tracks/MONTAGEM PEGADORA (Slowed).mp3',
        cover: createGradientCover('MONTAGEM PEGADORA', 'DJ Funk Master', null, null, 4),
        bannerGrad: 'linear-gradient(135deg, #180308 0%, #520b1f 35%, #b31945 70%, #ff4b72 100%)',
        youtubeId: 'mN8kL9zOqP1',
        format: 'Lossless',
        lyrics: [
            { time: 0, text: "(Slowed funk intro beat)" },
            { time: 12, text: "Pegadora no beat..." },
            { time: 24, text: "(Synth lead drop)" }
        ]
    },
    {
        id: 'track-12',
        title: 'FUNK ABNORMAL',
        artist: 'DJ V12',
        album: 'Speedway Slowed',
        duration: '2:12',
        durationSec: 132,
        genre: 'Drift Phonk',
        year: 2023,
        plays: '27,650,400',
        url: 'Tracks/FUNK ABNORMAL (Slowed) - DJ V12.mp3',
        cover: createGradientCover('FUNK ABNORMAL', 'DJ V12', null, null, 5),
        bannerGrad: 'linear-gradient(135deg, #0b0117 0%, #2e0854 35%, #7013cc 70%, #b84dff 100%)',
        youtubeId: 'v12Abn0rm4l',
        format: 'Lossless',
        lyrics: [
            { time: 0, text: "(Low-frequency pulse activates)" },
            { time: 15, text: "Abnormal frequencies locked in" }
        ]
    },
    {
        id: 'track-13',
        title: 'FUNK TAKA',
        artist: 'Taka Collective',
        album: 'Night Tokyo Phonk',
        duration: '2:08',
        durationSec: 128,
        genre: 'Tokyo Drift / Phonk',
        year: 2024,
        plays: '33,900,100',
        url: 'Tracks/FUNK TAKA (SLOWED).mp3',
        cover: createGradientCover('FUNK TAKA', 'Taka Collective', null, null, 0),
        bannerGrad: 'linear-gradient(135deg, #17020a 0%, #4d0a22 35%, #ad164c 70%, #ff3875 100%)',
        youtubeId: 't4k4Ph0nk99',
        format: 'Lossless',
        lyrics: [
            { time: 0, text: "(Tokyo midnight bassline starts)" },
            { time: 18, text: "Speed through the neon expressways" }
        ]
    },
    {
        id: 'track-14',
        title: 'Khat',
        artist: 'Navjot Ahuja',
        album: 'Khat - Official Collection',
        duration: '3:30',
        durationSec: 210,
        genre: 'Punjabi / Indie Acoustic',
        year: 2023,
        plays: '14,320,000',
        url: 'Tracks/Navjot Ahuja - Khat (Official Audio).mp3',
        cover: createGradientCover('Khat', 'Navjot Ahuja', null, null, 6),
        bannerGrad: 'linear-gradient(135deg, #170a00 0%, #4d2300 35%, #ab4e00 70%, #ff8c00 100%)',
        youtubeId: 'khat0ff1c1al',
        format: 'Lossless â€¢ Apple Digital Master',
        lyrics: [
            { time: 0, text: "Khat tera aaya si jadon..." },
            { time: 14, text: "Yaadan vich kho gaye si sab pal" },
            { time: 28, text: "Dil nu tasalli de gaye bol tere" },
            { time: 42, text: "Har lafz ch wasda ae pyar tera" }
        ]
    },
    {
        id: 'track-15',
        title: 'Ð‘Ð°Ð·Ð¾Ð²Ñ‹Ð¹ Ð¼Ð¸Ð½Ð¸Ð¼ÑƒÐ¼',
        artist: 'Sabi & MIA BOYKA',
        album: 'Bare Minimum EP',
        duration: '2:45',
        durationSec: 165,
        genre: 'Euro Pop / Dance',
        year: 2024,
        plays: '18,440,000',
        url: 'Tracks/Sabi, MIA BOYKA - %D0%91%D0%B0%D0%B7%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BC%D0%B8%D0%BD%D0%B8%D0%BC%D1%83%D0%BC%20(Bare%20minimum).mp3',
        cover: createGradientCover('Ð‘Ð°Ð·Ð¾Ð²Ñ‹Ð¹ Ð¼Ð¸Ð½Ð¸Ð¼ÑƒÐ¼', 'Sabi & MIA BOYKA', null, null, 7),
        bannerGrad: 'linear-gradient(135deg, #010c1c 0%, #062f6b 35%, #0f63d6 70%, #00bfff 100%)',
        youtubeId: 'm14B0yk4S4b1',
        format: 'Lossless â€¢ Dolby Atmos',
        lyrics: [
            { time: 0, text: "Ð‘Ð°Ð·Ð¾Ð²Ñ‹Ð¹ Ð¼Ð¸Ð½Ð¸Ð¼ÑƒÐ¼ Ð´Ð»Ñ ÑÑ‡Ð°ÑÑ‚ÑŒÑ..." },
            { time: 12, text: "Ð¢Ð°Ð½Ñ†Ñ‹ Ð¿Ð¾Ð´ Ð·Ð²Ñ‘Ð·Ð´Ð°Ð¼Ð¸ Ð´Ð¾ ÑƒÑ‚Ñ€Ð°" },
            { time: 24, text: "ÐœÑƒÐ·Ñ‹ÐºÐ° Ð² ÑÐµÑ€Ð´Ñ†Ðµ Ð·Ð²ÑƒÑ‡Ð¸Ñ‚ Ð²ÑÐµÐ³Ð´Ð°" }
        ]
    }
];

// Curated Albums
const albums = [
    {
        id: 'album-spiderman',
        title: 'Spider-Man: Into the Spider-Verse',
        artist: 'Various Artists',
        year: 2018,
        genre: 'Soundtrack / Hip-Hop',
        cover: createGradientCover('Spider-Verse', 'Soundtrack', null, null, 6),
        description: 'The Grammy-nominated powerhouse soundtrack featuring iconic anthems from Post Malone, Swae Lee, Kendrick Lamar, and more.',
        tracks: ['track-2', 'track-1', 'track-7', 'track-6', 'track-8']
    },
    {
        id: 'album-afterhours',
        title: 'After Hours',
        artist: 'The Weeknd',
        year: 2020,
        genre: 'Synth-Pop / R&B',
        cover: 'images/Music_Alums/album2.png',
        description: 'The monumental 80s synth-wave and dark-pop masterpiece that dominated global charts for years.',
        tracks: ['track-3', 'track-4']
    },
    {
        id: 'album-phonk-anthology',
        title: 'Phonk Odyssey & Drift Anthology',
        artist: 'MASHUQ HAQUE & Friends',
        year: 2024,
        genre: 'Drift Phonk / EDM',
        cover: createGradientCover('Phonk Odyssey', 'Anthology', null, null, 1),
        description: 'Adrenaline-fueled underground drift phonk, atmospheric Brazilian bass, and heavy cowbell leads.',
        tracks: ['track-9', 'track-10', 'track-11', 'track-12', 'track-13']
    },
    {
        id: 'album-dawn-sessions',
        title: 'Dawn (Acoustic Sessions)',
        artist: 'Acoustic Sessions & Navjot Ahuja',
        year: 2023,
        genre: 'Acoustic / Indie Folk',
        cover: 'images/Music_Alums/album1.png',
        description: 'Organic morning acoustics, peaceful guitar chords, and emotional vocals recorded in high resolution.',
        tracks: ['track-14', 'track-8', 'track-6']
    },
    {
        id: 'album-global-hits',
        title: 'Global Hits & Urban Waves',
        artist: 'KR$NA, Chris Grey, Sabi',
        year: 2024,
        genre: 'Hip-Hop / Global Pop',
        cover: 'images/Music_Alums/album3.png',
        description: 'Cutting-edge lyricism and international chart toppers from urban studios across the world.',
        tracks: ['track-5', 'track-4', 'track-15', 'track-1']
    }
];

// Curated Artists
const artists = [
    {
        id: 'artist-kendrick',
        name: 'Kendrick Lamar',
        monthlyListeners: '64.8M',
        bio: 'Pulitzer Prize-winning visionary rapper and songwriter known for cinematic storytelling and genre-defining masterpieces.',
        image: createGradientCover('Kendrick Lamar', 'Artist Spotlight', null, null, 0),
        topSongIds: ['track-1']
    },
    {
        id: 'artist-postmalone',
        name: 'Post Malone',
        monthlyListeners: '78.2M',
        bio: 'Multi-diamond certified genre-blending superstar with timeless hooks, infectious energy, and emotional ballads.',
        image: createGradientCover('Post Malone', 'Artist Spotlight', null, null, 6),
        topSongIds: ['track-2']
    },
    {
        id: 'artist-theweeknd',
        name: 'The Weeknd',
        monthlyListeners: '109.5M',
        bio: 'Global R&B and synth-pop king behind After Hours, Starboy, and record-shattering worldwide hits.',
        image: 'images/Music_Alums/album2.png',
        topSongIds: ['track-3']
    },
    {
        id: 'artist-krsna',
        name: 'KR$NA',
        monthlyListeners: '6.4M',
        bio: 'Pioneer of lyrical Desi Hip-Hop renowned for complex rhyme schemes, sharp wordplay, and relentless flow.',
        image: createGradientCover('KR$NA', 'Artist Spotlight', null, null, 2),
        topSongIds: ['track-5']
    },
    {
        id: 'artist-tameimpala',
        name: 'Tame Impala',
        monthlyListeners: '32.1M',
        bio: 'Kevin Parkerâ€™s multi-instrumentalist psychedelic synth project crafting ethereal soundscapes and retro-futuristic beats.',
        image: createGradientCover('Tame Impala', 'Artist Spotlight', null, null, 5),
        topSongIds: ['track-6']
    },
    {
        id: 'artist-phonk-allstars',
        name: 'Phonk Drift Collective',
        monthlyListeners: '22.7M',
        bio: 'The high-octane collective uniting MASHUQ HAQUE, DJ Uranium, DJ V12, and the global drift community.',
        image: createGradientCover('Phonk Collective', 'Artist Spotlight', null, null, 1),
        topSongIds: ['track-9', 'track-10', 'track-11', 'track-12', 'track-13']
    }
];

// Curated Radio Stations
const radioStations = [
    {
        id: 'radio-am1',
        name: 'Apple Music 1',
        host: 'Zane Lowe, Ebro Darden & Rebecca Judd',
        frequency: 'Live 24/7 Global Broadcast',
        description: 'The worldâ€™s flagship live radio station with exclusive artist interviews, world premieres, and cultural conversation.',
        color: 'linear-gradient(135deg, #e50914 0%, #fa243c 45%, #764ba2 100%)',
        badge: 'LIVE ON AIR',
        sampleTrackId: 'track-1'
    },
    {
        id: 'radio-hits',
        name: 'Apple Music Hits',
        host: 'Estelle & Jayde Donovan',
        frequency: 'Live Worldwide Stream',
        description: 'The defining pop, hip-hop, and R&B smashes of the 80s, 90s, 2000s, and today that everyone knows by heart.',
        color: 'linear-gradient(135deg, #f77062 0%, #fe5196 50%, #f093fb 100%)',
        badge: 'FEATURED',
        sampleTrackId: 'track-3'
    },
    {
        id: 'radio-drift',
        name: 'Phonk & Drift Night Station',
        host: 'Night Drift Radio Tokyo',
        frequency: '108.4 FM Live Stream',
        description: 'Heavy bass, slowed reverb, atmospheric drift phonk, and nocturnal highway rhythms nonstop.',
        color: 'linear-gradient(135deg, #09122c 0%, #1e3c72 50%, #2a5298 100%)',
        badge: 'STREAMING',
        sampleTrackId: 'track-9'
    },
    {
        id: 'radio-acoustic',
        name: 'Dawn Chill & Acoustic Flow',
        host: 'Ambient Sound Lab',
        frequency: 'Hi-Res Spatial Stream',
        description: 'Serene instrumental morning melodies, soft acoustic guitars, and restorative ambient peace.',
        color: 'linear-gradient(135deg, #0b302c 0%, #11998e 50%, #38ef7d 100%)',
        badge: 'CALM',
        sampleTrackId: 'track-14'
    }
];

// Curated Playlists
const defaultPlaylists = [
    {
        id: 'pl-today-hits',
        name: "Today's Top Hits",
        curator: 'Apple Music',
        description: 'The most played, most loved tracks streaming around the globe right now.',
        cover: createGradientCover("Today's Hits", 'Apple Music', null, null, 0),
        tracks: ['track-1', 'track-2', 'track-3', 'track-4', 'track-5', 'track-6', 'track-7']
    },
    {
        id: 'pl-spiderverse',
        name: 'Spider-Verse & Cinematic Heroes',
        curator: 'Apple Music Curated',
        description: 'High flying cinematic anthems, multiversal beats, and comic-book high-energy soundtrack favorites.',
        cover: createGradientCover('Spider-Verse', 'Curated', null, null, 6),
        tracks: ['track-2', 'track-1', 'track-7', 'track-6', 'track-8']
    },
    {
        id: 'pl-phonk-drive',
        name: 'Phonk Drift 2026',
        curator: 'Apple Music Electronic',
        description: 'Aggressive cowbells, deep 808 sub drops, slowed Brazilian funk, and Tokyo expressway drift music.',
        cover: createGradientCover('Phonk Drift', 'Electronic', null, null, 1),
        tracks: ['track-9', 'track-10', 'track-11', 'track-12', 'track-13']
    },
    {
        id: 'pl-night-synthwave',
        name: 'Night Drive & Synthwave',
        curator: 'Apple Music Pop',
        description: 'Neon retro-futuristic synthesizers, nocturnal late night drives, and melancholic pop hooks.',
        cover: createGradientCover('Night Drive', 'Synthwave', null, null, 4),
        tracks: ['track-3', 'track-4', 'track-6', 'track-7']
    },
    {
        id: 'pl-deep-focus',
        name: 'Acoustic Dawn & Deep Focus',
        curator: 'Apple Music Chill',
        description: 'Organic acoustic resonance, smooth folk rhythms, and peaceful mindfulness tracks.',
        cover: 'images/Music_Alums/album1.png',
        tracks: ['track-14', 'track-8', 'track-6']
    }
];

// Local Storage Helper
const Storage = {
    getPinnedIds: () => {
        try {
            const val = localStorage.getItem('mac_music_pins');
            return val ? JSON.parse(val) : ['track-1', 'track-2', 'album-spiderman', 'pl-today-hits'];
        } catch (e) {
            return ['track-1', 'track-2', 'album-spiderman', 'pl-today-hits'];
        }
    },
    setPinnedIds: (pins) => {
        try {
            localStorage.setItem('mac_music_pins', JSON.stringify(pins));
        } catch (e) {}
    },
    getLovedIds: () => {
        try {
            const val = localStorage.getItem('mac_music_loved');
            return val ? JSON.parse(val) : ['track-1', 'track-2', 'track-3'];
        } catch (e) {
            return ['track-1', 'track-2', 'track-3'];
        }
    },
    setLovedIds: (loved) => {
        try {
            localStorage.setItem('mac_music_loved', JSON.stringify(loved));
        } catch (e) {}
    },
    getUserPlaylists: () => {
        try {
            const val = localStorage.getItem('mac_music_custom_playlists');
            return val ? JSON.parse(val) : [];
        } catch (e) {
            return [];
        }
    },
    saveUserPlaylists: (pls) => {
        try {
            localStorage.setItem('mac_music_custom_playlists', JSON.stringify(pls));
        } catch (e) {}
    },
    getRecentlyPlayedIds: () => {
        try {
            const val = localStorage.getItem('mac_music_history');
            return val ? JSON.parse(val) : ['track-3', 'track-2', 'track-1', 'track-9', 'track-5'];
        } catch (e) {
            return ['track-3', 'track-2', 'track-1', 'track-9', 'track-5'];
        }
    },
    addRecentlyPlayed: (id) => {
        try {
            const hist = Storage.getRecentlyPlayedIds().filter(x => x !== id);
            hist.unshift(id);
            if (hist.length > 20) hist.pop();
            localStorage.setItem('mac_music_history', JSON.stringify(hist));
        } catch (e) {}
    }
};

window.APPLE_MUSIC_DATA = {
    songs: allSongs,
    albums: albums,
    artists: artists,
    radioStations: radioStations,
    playlists: defaultPlaylists,
    storage: Storage
};
