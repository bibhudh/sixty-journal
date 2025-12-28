export interface Mood {
    emoji: string;
    type: string;
    label: string;
    color: string;
}

export interface JournalEntry {
    id: string;
    day: number;
    date: string;
    time: string;
    preMood: Mood;
    postMood: Mood;
    prompt: string;
    text: string;
}

const MOODS: Mood[] = [
    { emoji: '😊', type: 'happy', label: 'Happy', color: '#FFD700' },
    { emoji: '😌', type: 'calm', label: 'Calm', color: '#87CEEB' },
    { emoji: '😟', type: 'anxious', label: 'Anxious', color: '#FF9999' },
    { emoji: '😔', type: 'sad', label: 'Sad', color: '#4169E1' },
    { emoji: '😠', type: 'angry', label: 'Angry', color: '#FF6347' },
];

const SAMPLE_TEXTS = [
    "What's one small thing that made you smile today? I saw a puppy playing in the leaves.",
    "Today was a productive day. I managed to clear my inbox and felt a huge sense of relief.",
    "A quiet evening reflecting on the past year. I'm excited for what's coming in 2026.",
    "Feeling a bit overwhelmed but writing this down helped a lot. I need to prioritize my sleep.",
    "The weather was beautiful today, went for a long walk in the park. Nature is so grounding.",
    "Had a great conversation with an old friend. Connection is so important for the soul.",
];

const PROMPTS = [
    "What's one small thing that made you smile today?",
    "What's weighing on your mind right now?",
    "Describe your day in three words.",
    "What are you grateful for today?",
    "What challenge did you overcome today?"
];

const GENERATE_MOCK_YEAR_ENTRIES = (): JournalEntry[] => {
    const entries: JournalEntry[] = [];
    const months = [
        { name: 'Jan', days: 31 }, { name: 'Feb', days: 28 }, { name: 'Mar', days: 31 },
        { name: 'Apr', days: 30 }, { name: 'May', days: 31 }, { name: 'Jun', days: 30 },
        { name: 'Jul', days: 31 }, { name: 'Aug', days: 31 }, { name: 'Sep', days: 30 },
        { name: 'Oct', days: 31 }, { name: 'Nov', days: 30 }, { name: 'Dec', days: 31 }
    ];

    let entryCounter = 0;

    months.forEach((month, monthInd) => {
        // Generate entries for most days, maybe skip a few to make it realistic
        for (let d = 1; d <= month.days; d++) {
            // Skip future dates if we are currently in Dec
            if (month.name === 'Dec' && d > 27) break;

            // Randomly skip some days (90% consistency)
            if (Math.random() > 0.9) continue;

            const preMoodIndex = Math.floor(Math.random() * MOODS.length);
            const postMoodIndex = Math.floor(Math.random() * MOODS.length);
            const textIndex = (d + monthInd) % SAMPLE_TEXTS.length;

            entries.push({
                id: `${month.name.toLowerCase()}-${d}`,
                day: d,
                date: `${month.name} ${d}, 2025`,
                time: '9:15 PM',
                preMood: MOODS[preMoodIndex],
                postMood: MOODS[postMoodIndex],
                prompt: PROMPTS[(d + monthInd) % PROMPTS.length],
                text: SAMPLE_TEXTS[textIndex],
            });
            entryCounter++;
        }
    });

    // Sort logic handled implicitly by generation order, effectively sorted by date
    return entries;
};

export const MOCK_ENTRIES = GENERATE_MOCK_YEAR_ENTRIES();

// Export MOODS for use in filters
export { MOODS };

export const USER_PROFILE = {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatarInitials: 'S'
};

export const MOCK_TODAY = "Dec 27, 2025";
