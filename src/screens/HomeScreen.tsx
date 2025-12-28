import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Flame, Calendar, Sparkles, ChevronRight, Play, Info } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

import { MOCK_ENTRIES, USER_PROFILE, MOCK_TODAY } from '../data/mockData';

const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const [showAlreadyJournaledModal, setShowAlreadyJournaledModal] = useState(false);

    // Check if there is an entry for "today"
    const hasJournaledToday = MOCK_ENTRIES.some(e => e.date === MOCK_TODAY);

    const today = MOCK_TODAY;

    const handleStartJournal = () => {
        if (hasJournaledToday) {
            setShowAlreadyJournaledModal(true);
        } else {
            navigation.navigate('PreMoodCheck');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.userName}>{USER_PROFILE.name.split(' ')[0]}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.profileToggle}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>{USER_PROFILE.avatarInitials}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.streakContainer}>
                    <View style={styles.streakCard}>
                        <View style={styles.streakHeader}>
                            <Flame size={24} color={theme.colors.error} fill={theme.colors.error} />
                            <Text style={styles.streakTitle}>Current Streak</Text>
                        </View>
                        <View style={styles.streakValueContainer}>
                            <Text style={styles.streakValue}>7</Text>
                            <Text style={styles.streakUnit}>Days</Text>
                        </View>
                        <Text style={styles.streakMessage}>You're doing great! Keep it up. 🔥</Text>
                    </View>
                </View>

                <View style={styles.promptCard}>
                    <View style={styles.promptHeader}>
                        <Calendar size={18} color={theme.colors.textMuted} />
                        <Text style={styles.dateText}>{today}</Text>
                    </View>
                    <Text style={styles.promptTitle}>Today's Prompt</Text>
                    <Text style={styles.promptText}>
                        "What's one small thing that made you smile today?"
                    </Text>
                    <View style={styles.promptBadge}>
                        <Sparkles size={14} color={theme.colors.primary} />
                        <Text style={styles.badgeText}>60-Second Reflection</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.mainCTA}
                    onPress={handleStartJournal}
                    activeOpacity={0.9}
                >
                    <View style={styles.ctaIconContainer}>
                        <Play size={24} color={theme.colors.white} fill={theme.colors.white} />
                    </View>
                    <View style={styles.ctaTextContainer}>
                        <Text style={styles.ctaTitle}>Start 60-Second Journal</Text>
                        <Text style={styles.ctaSubtitle}>Find your clarity for today</Text>
                    </View>
                    <ChevronRight size={24} color={theme.colors.white} style={{ opacity: 0.6 }} />
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={showAlreadyJournaledModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowAlreadyJournaledModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <View style={styles.infoIconContainer}>
                            <Info size={32} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.modalTitle}>You've Already Journaled Today</Text>
                        <Text style={styles.modalMessage}>
                            Your next entry will be available tomorrow at 12:01 AM. Keep up the great habit!
                        </Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.modalPrimaryButton}
                                onPress={() => {
                                    setShowAlreadyJournaledModal(false);
                                    navigation.navigate('EntryDetail', { id: MOCK_ENTRIES[0].id });
                                }}
                            >
                                <Text style={styles.modalPrimaryButtonText}>View Today's Entry</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalSecondaryButton}
                                onPress={() => setShowAlreadyJournaledModal(false)}
                            >
                                <Text style={styles.modalSecondaryButtonText}>Back Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 24,
    },
    greeting: {
        ...theme.typography.body,
        fontSize: 16,
        color: theme.colors.textMuted,
    },
    userName: {
        ...theme.typography.h1,
        fontSize: 28,
    },
    profileToggle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.white,
        ...theme.shadows.small,
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
        backgroundColor: theme.colors.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary + '30',
    },
    avatarText: {
        ...theme.typography.h3,
        color: theme.colors.primary,
        fontSize: 20,
    },
    streakContainer: {
        marginBottom: 20,
    },
    streakCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        padding: 20,
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    streakHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    streakTitle: {
        ...theme.typography.small,
        fontWeight: '600',
        color: theme.colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    streakValueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
        marginBottom: 8,
    },
    streakValue: {
        ...theme.typography.h1,
        fontSize: 40,
        color: theme.colors.text,
    },
    streakUnit: {
        ...theme.typography.h3,
        color: theme.colors.textMuted,
    },
    streakMessage: {
        ...theme.typography.small,
        color: theme.colors.textMuted,
    },
    promptCard: {
        backgroundColor: theme.colors.primary + '10',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: theme.colors.primary + '20',
    },
    promptHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    dateText: {
        ...theme.typography.caption,
        fontWeight: '600',
        color: theme.colors.textMuted,
    },
    promptTitle: {
        ...theme.typography.small,
        color: theme.colors.primary,
        fontWeight: '700',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    promptText: {
        ...theme.typography.h3,
        fontSize: 22,
        lineHeight: 30,
        marginBottom: 16,
    },
    promptBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: 'flex-start',
        gap: 6,
    },
    badgeText: {
        ...theme.typography.caption,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    mainCTA: {
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
        ...theme.shadows.small,
    },
    ctaIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: theme.colors.white + '30',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    ctaTextContainer: {
        flex: 1,
    },
    ctaTitle: {
        ...theme.typography.h3,
        color: theme.colors.white,
        marginBottom: 2,
    },
    ctaSubtitle: {
        ...theme.typography.small,
        color: theme.colors.white,
        opacity: 0.8,
    },
    recentHeroContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        ...theme.typography.h3,
    },
    entryCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    entryTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 8,
    },
    entryDate: {
        ...theme.typography.caption,
        fontWeight: '700',
        color: theme.colors.text,
    },
    entryEmoji: {
        fontSize: 16,
    },
    entryPreview: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
        fontSize: 13,
    },
    viewAllLink: {
        alignSelf: 'flex-end',
        marginTop: 4,
        marginBottom: 20,
    },
    viewAllText: {
        ...theme.typography.small,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalCard: {
        backgroundColor: theme.colors.white,
        width: '100%',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        ...theme.shadows.medium,
    },
    infoIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        ...theme.typography.h2,
        color: theme.colors.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    modalMessage: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
    },
    modalActions: {
        width: '100%',
        gap: 12,
    },
    modalPrimaryButton: {
        backgroundColor: theme.colors.primary,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    modalPrimaryButtonText: {
        ...theme.typography.h3,
        color: theme.colors.white,
        fontSize: 16,
    },
    modalSecondaryButton: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalSecondaryButtonText: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
});

export default HomeScreen;
