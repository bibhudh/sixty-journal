import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MOODS } from '../data/mockData';

const MoodCheckScreen = () => {
    const [selectedMood, setSelectedMood] = React.useState<string | null>(null);
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const isPost = route.params?.type === 'post';

    const scaleAnims = React.useRef(MOODS.reduce((acc, mood) => {
        acc[mood.type] = new Animated.Value(1);
        return acc;
    }, {} as any)).current;

    const handleMoodSelect = (moodType: string) => {
        setSelectedMood(moodType);

        // Animate selection
        MOODS.forEach((mood) => {
            Animated.spring(scaleAnims[mood.type], {
                toValue: mood.type === moodType ? 1.2 : 1,
                useNativeDriver: true,
            }).start();
        });
    };

    const handleContinue = () => {
        const nextParams = {
            mood: selectedMood,
            date: route.params?.date,
            noLimit: route.params?.noLimit,
            isPastDate: route.params?.isPastDate
        };

        if (isPost) {
            navigation.navigate('Completion', nextParams);
        } else {
            navigation.navigate('Writing', nextParams);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>
                        {isPost ? 'How are you feeling now?' : 'Before you write, how are you feeling?'}
                    </Text>
                </View>

                <View style={styles.moodGrid}>
                    {MOODS.map((mood) => (
                        <TouchableOpacity
                            key={mood.type}
                            style={styles.moodItem}
                            onPress={() => handleMoodSelect(mood.type)}
                            activeOpacity={0.7}
                        >
                            <Animated.View
                                style={[
                                    styles.moodCircle,
                                    { backgroundColor: mood.color + '20' },
                                    selectedMood === mood.type ? { borderColor: mood.color, borderWidth: 3 } : {},
                                    { transform: [{ scale: scaleAnims[mood.type] }] },
                                ]}
                            >
                                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                            </Animated.View>
                            <Text
                                style={[
                                    styles.moodLabel,
                                    selectedMood === mood.type ? { color: mood.color, fontWeight: '700' } : {},
                                ]}
                            >
                                {mood.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.footer}>
                    {!isPost && (
                        <Text style={styles.helperText}>
                            Your response helps us understand your emotional journey
                        </Text>
                    )}

                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            !selectedMood && styles.disabledButton,
                        ]}
                        onPress={handleContinue}
                        disabled={!selectedMood}
                    >
                        <Text style={styles.continueButtonText}>
                            {isPost ? 'Complete Entry' : 'Continue'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    backButton: {
        marginTop: 16,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    header: {
        marginTop: 40,
        marginBottom: 60,
    },
    title: {
        ...theme.typography.h1,
        fontSize: 28,
        textAlign: 'center',
        lineHeight: 36,
    },
    moodGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    moodItem: {
        alignItems: 'center',
        width: 80,
    },
    moodCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    moodEmoji: {
        fontSize: 32,
    },
    moodLabel: {
        ...theme.typography.small,
        color: theme.colors.textMuted,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 40,
        alignItems: 'center',
    },
    helperText: {
        ...theme.typography.small,
        color: theme.colors.textMuted,
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    continueButton: {
        backgroundColor: theme.colors.primary,
        height: 56,
        borderRadius: 28,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    disabledButton: {
        backgroundColor: theme.colors.border,
        opacity: 0.6,
    },
    continueButtonText: {
        ...theme.typography.h3,
        color: theme.colors.white,
    },
});

export default MoodCheckScreen;
