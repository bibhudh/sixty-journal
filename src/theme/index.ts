export const theme = {
    colors: {
        primary: '#208090', // Primary Teal
        primaryLight: '#32B8C6', // Light Teal
        background: '#FCFCF9', // Off-white
        surface: '#FFFFFF',
        text: '#134252', // Text Dark
        textMuted: '#626C71', // Text Gray
        border: '#E5E5E5',
        error: '#FF6347', // Tomato
        success: '#198754',
        white: '#FFFFFF',

        // Mood Colors
        mood: {
            happy: '#FFD700',
            calm: '#87CEEB',
            anxious: '#FF9999',
            sad: '#4169E1',
            angry: '#FF6347',
        }
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32,
        xxxl: 48,
    },
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 20,
        full: 9999,
    },
    typography: {
        h1: {
            fontSize: 28,
            fontWeight: '600' as const,
            color: '#134252',
        },
        h2: {
            fontSize: 24,
            fontWeight: '600' as const,
            color: '#134252',
        },
        h3: {
            fontSize: 20,
            fontWeight: '600' as const,
            color: '#134252',
        },
        body: {
            fontSize: 16,
            fontWeight: '400' as const,
            color: '#134252',
            lineHeight: 24,
        },
        small: {
            fontSize: 14,
            fontWeight: '400' as const,
            color: '#626C71',
        },
        caption: {
            fontSize: 12,
            fontWeight: '400' as const,
            color: '#626C71',
        },
    },
    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 5,
        },
    }
};

export type Theme = typeof theme;
