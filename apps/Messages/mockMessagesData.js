// Apple Messages (iMessage) Mock Data Engine & State Store with Official Apple Gradients

const INITIAL_CONVERSATIONS = [
    {
        id: 'c1',
        name: 'Tim Cook',
        avatarBg: 'linear-gradient(180deg, #38A0FF 0%, #007AFF 100%)',
        avatarInitials: 'TC',
        avatarImage: '',
        status: 'iMessage',
        phone: 'tim.cook@apple.com',
        isPinned: true,
        unread: 1,
        pinnedOrder: 1,
        messages: [
            {
                id: 'm1-1',
                sender: 'them',
                text: 'Good morning! Welcome to the new macOS web experience. ',
                time: '9:20 AM',
                timestamp: Date.now() - 1000 * 60 * 45,
                reactions: [{ emoji: '❤️', from: 'me' }]
            },
            {
                id: 'm1-2',
                sender: 'me',
                text: 'Thanks Tim! The design fidelity and smooth animations turned out amazing.',
                time: '9:25 AM',
                timestamp: Date.now() - 1000 * 60 * 40,
                status: 'Read 9:26 AM'
            },
            {
                id: 'm1-3',
                sender: 'them',
                text: 'Phenomenal work by the team. Let\'s do a quick design review later today. One more thing... make sure the dynamic island responds smoothly! 🚀',
                time: '9:30 AM',
                timestamp: Date.now() - 1000 * 60 * 35,
                reactions: [{ emoji: '👍', from: 'me' }]
            },
            {
                id: 'm1-4',
                sender: 'them',
                text: 'How is the new Messages interface feeling?',
                time: '9:41 AM',
                timestamp: Date.now() - 1000 * 60 * 5,
                isUnread: true
            }
        ],
        autoReplies: [
            "We think you're going to love it. It's the best update yet! ",
            "Innovation is in our DNA. Truly magical performance.",
            "Can't wait to share this with our developers worldwide.",
            "That sounds like a great idea. Let me connect with Craig and the software engineering team."
        ]
    },
    {
        id: 'c2',
        name: 'Craig Federighi',
        avatarBg: 'linear-gradient(180deg, #FF9F0A 0%, #FF6B00 100%)',
        avatarInitials: 'CF',
        avatarImage: '',
        status: 'iMessage',
        phone: 'craig.federighi@apple.com',
        isPinned: true,
        unread: 0,
        pinnedOrder: 2,
        messages: [
            {
                id: 'm2-1',
                sender: 'them',
                text: 'Hair Force One checking in! 🎸 Ready to drop some sweet Swift features.',
                time: 'Yesterday',
                timestamp: Date.now() - 1000 * 60 * 60 * 24,
                reactions: [{ emoji: '😂', from: 'me' }]
            },
            {
                id: 'm2-2',
                sender: 'me',
                text: 'Haha, the Dynamic Island and window manager animations are silky smooth!',
                time: 'Yesterday',
                timestamp: Date.now() - 1000 * 60 * 60 * 23,
                status: 'Delivered'
            },
            {
                id: 'm2-3',
                sender: 'them',
                text: 'That 60fps gesture curve is pure satisfaction. Check this out: 🔥',
                time: 'Yesterday',
                timestamp: Date.now() - 1000 * 60 * 60 * 22,
                image: 'images/Wallpapers/27-Golden-Gate.jpg'
            }
        ],
        autoReplies: [
            "Boom! That's what I'm talking about! 🤘",
            "Silky 120Hz ProMotion smoothness! Let's ship it!",
            "I'm currently tuning the Metal shaders, but looks super fast!",
            "High five! Let's get some espresso and celebrate ☕️"
        ]
    },
    {
        id: 'c3',
        name: 'Sarah Jenkins',
        avatarBg: 'linear-gradient(180deg, #BF5AF2 0%, #8944AB 100%)',
        avatarInitials: 'SJ',
        status: 'iMessage',
        phone: '+1 (408) 555-0199',
        isPinned: true,
        unread: 0,
        pinnedOrder: 3,
        messages: [
            {
                id: 'm3-1',
                sender: 'them',
                text: 'Hey Joy! Just pushed the updated Figma mockups for the new Liquid Glass effects.',
                time: '10:14 AM',
                timestamp: Date.now() - 1000 * 60 * 120
            },
            {
                id: 'm3-2',
                sender: 'them',
                text: 'Voice note breakdown of the sidebar blur ratios:',
                time: '10:15 AM',
                timestamp: Date.now() - 1000 * 60 * 119,
                audio: { duration: '0:24', waves: [30, 45, 80, 60, 95, 40, 70, 85, 30, 60, 90, 45, 55, 75, 40, 65, 80, 50] }
            },
            {
                id: 'm3-3',
                sender: 'me',
                text: 'Looks gorgeous Sarah. The typography contrast and squircle radiuses are spot on.',
                time: '10:18 AM',
                timestamp: Date.now() - 1000 * 60 * 115,
                status: 'Read 10:19 AM'
            }
        ],
        autoReplies: [
            "Awesome! Glad you like the blur and shadow adjustments! 🎨",
            "I'll update the typography tokens in the design library right away.",
            "Can you check if the dark mode contrast passes WCAG AAA? Thanks!",
            "Super clean! Let's sync on tomorrow's standup."
        ]
    },
    {
        id: 'c4',
        name: 'Apple Developer Team',
        avatarBg: 'linear-gradient(180deg, #30D158 0%, #1B9E3E 100%)',
        avatarInitials: 'DT',
        status: 'iMessage • 4 People',
        phone: 'Group Chat',
        isPinned: true,
        unread: 0,
        pinnedOrder: 4,
        messages: [
            {
                id: 'm4-1',
                sender: 'them',
                senderName: 'Alex',
                text: 'All build tests passed on GitHub Actions! Zero errors. 🟢',
                time: '8:05 AM',
                timestamp: Date.now() - 1000 * 60 * 180,
                reactions: [{ emoji: '👍', from: 'me' }]
            },
            {
                id: 'm4-2',
                sender: 'them',
                senderName: 'Elena',
                text: 'Local server is active on port 3000 with real-time hot reload enabled.',
                time: '8:12 AM',
                timestamp: Date.now() - 1000 * 60 * 170
            },
            {
                id: 'm4-3',
                sender: 'me',
                text: 'Awesome work everyone. All macOS apps and icons are fully integrated.',
                time: '8:15 AM',
                timestamp: Date.now() - 1000 * 60 * 165,
                status: 'Delivered'
            }
        ],
        autoReplies: [
            "Merged into main branch! Ready for next release.",
            "CI/CD pipeline running smoothly 🚀",
            "Great catch on that CSS selector specificity!",
            "Everything looks rock solid on WebKit and Chromium engines."
        ]
    },
    {
        id: 'c5',
        name: 'Steve Jobs',
        avatarBg: 'linear-gradient(180deg, #5E5E62 0%, #2C2C2E 100%)',
        avatarInitials: 'SJ',
        status: 'iMessage',
        phone: 'steve@apple.com',
        isPinned: false,
        unread: 0,
        messages: [
            {
                id: 'm5-1',
                sender: 'them',
                text: 'Details matter. It\'s worth waiting to get it right. Make every pixel count.',
                time: 'Sep 4',
                timestamp: Date.now() - 1000 * 60 * 60 * 48,
                reactions: [{ emoji: '❤️', from: 'me' }]
            },
            {
                id: 'm5-2',
                sender: 'me',
                text: 'Simplicity is the ultimate sophistication.',
                time: 'Sep 4',
                timestamp: Date.now() - 1000 * 60 * 60 * 47,
                status: 'Read Sep 4'
            }
        ],
        autoReplies: [
            "Stay hungry, stay foolish.",
            "The only way to do great work is to love what you do.",
            "Design is not just what it looks like and feels like. Design is how it works."
        ]
    },
    {
        id: 'c6',
        name: 'Apple Support',
        avatarBg: 'linear-gradient(180deg, #64D2FF 0%, #0A84FF 100%)',
        avatarIcon: 'apple',
        avatarInitials: 'AS',
        status: 'Verified Business',
        phone: '1-800-MY-APPLE',
        isPinned: false,
        unread: 0,
        messages: [
            {
                id: 'm6-1',
                sender: 'them',
                text: 'Your Apple ID was used to sign in to macOS on Joy\'s MacBook Pro.',
                time: 'Tuesday',
                timestamp: Date.now() - 1000 * 60 * 60 * 72
            },
            {
                id: 'm6-2',
                sender: 'them',
                text: 'Two-Factor Authentication is active. If this was you, no action is required.',
                time: 'Tuesday',
                timestamp: Date.now() - 1000 * 60 * 60 * 71
            }
        ],
        autoReplies: [
            "Thank you for reaching out to Apple Support. How can we assist you today?",
            "Your devices are all up to date and protected by iCloud Keychain.",
            "AppleCare+ coverage is active on this Mac."
        ]
    },
    {
        id: 'c7',
        name: 'Alex Rivera',
        avatarBg: 'linear-gradient(180deg, #34C759 0%, #169E38 100%)',
        avatarInitials: 'AR',
        status: 'SMS',
        phone: '+1 (555) 349-2041',
        isPinned: false,
        unread: 0,
        messages: [
            {
                id: 'm7-1',
                sender: 'them',
                text: 'Hey! Are we still grabbing coffee and coding at 5 PM?',
                time: 'Monday',
                timestamp: Date.now() - 1000 * 60 * 60 * 96
            },
            {
                id: 'm7-2',
                sender: 'me',
                text: 'Definitely! I\'ll bring the M3 Max MacBook. See you at Blue Bottle.',
                time: 'Monday',
                timestamp: Date.now() - 1000 * 60 * 60 * 95,
                status: 'Sent as Text Message'
            }
        ],
        autoReplies: [
            "Sounds great! Looking forward to it ☕️",
            "See you soon!",
            "I'm bringing some fresh design ideas for the dark mode theme!"
        ]
    }
];

window.MacMessagesData = {
    conversations: INITIAL_CONVERSATIONS,
    getConversations: function() {
        return this.conversations;
    },
    saveConversations: function(newConvs) {
        this.conversations = newConvs;
    }
};
