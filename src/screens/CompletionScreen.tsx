import React, { useEffect, useRef } from 'react';
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
import { CheckCircle2, ArrowRight } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

import { MOCK_ENTRIES } from '../data/mockData';

const CompletionScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const entry = MOCK_ENTRIES[0];
    const scaleAnim = React.useRef(new Animated.Value(0)).current;
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.animationContainer}>
                    {scaleAnim ? (
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <CheckCircle2 size={100} color={theme.colors.success} strokeWidth={1.5} />
                        </Animated.View>
                    ) : null}
                </View>

                <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
                    <Text style={styles.title}>Amazing! Entry Saved</Text>
                    <Text style={styles.subtitle}>
                        You've taken a significant step toward mental clarity today.
                    </Text>

                    <View style={styles.moodShiftCard}>
                        <Text style={styles.shiftTitle}>Your Mood Shift</Text>
                        <View style={styles.shiftRow}>
                            <View style={[styles.moodBadge, { backgroundColor: (theme.colors.mood as any)[entry.preMood.type] + '30' }]}>
                                <Text style={styles.moodEmoji}>{entry.preMood.emoji}</Text>
                                <Text style={styles.moodName}>{entry.preMood.label}</Text>
                            </View>
                            <ArrowRight size={20} color={theme.colors.textMuted} />
                            <View style={[styles.moodBadge, { backgroundColor: (theme.colors.mood as any)[entry.postMood.type] + '30' }]}>
                                <Text style={styles.moodEmoji}>{entry.postMood.emoji}</Text>
                                <Text style={styles.moodName}>{entry.postMood.label}</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.primaryButtonText}>Go Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('EntryDetail', { id: MOCK_ENTRIES[0].id })}
                    >
                        <Text style={styles.secondaryButtonText}>View Entry</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    animationContainer: {
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
    },
    textContainer: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        ...theme.typography.h1,
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        ...theme.typography.body,
        textAlign: 'center',
        color: theme.colors.textMuted,
        lineHeight: 24,
        marginBottom: 40,
    },
    moodShiftCard: {
        backgroundColor: theme.colors.white,
        width: '100%',
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    shiftTitle: {
        ...theme.typography.small,
        fontWeight: '700',
        color: theme.colors.textMuted,
        textAlign: 'center',
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    shiftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    moodBadge: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        minWidth: 100,
    },
    moodEmoji: {
        fontSize: 32,
        marginBottom: 4,
    },
    moodName: {
        ...theme.typography.small,
        fontWeight: '600',
        color: theme.colors.text,
    },
    footer: {
        width: '100%',
        marginTop: 40,
        gap: 16,
    },
    primaryButton: {
        backgroundColor: theme.colors.primary,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    primaryButtonText: {
        ...theme.typography.h3,
        color: theme.colors.white,
    },
    secondaryButton: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    secondaryButtonText: {
        ...theme.typography.h3,
        color: theme.colors.text,
    },
});

export default CompletionScreen;
