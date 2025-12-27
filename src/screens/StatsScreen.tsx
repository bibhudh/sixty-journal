import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Flame, PenTool, TrendingUp, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const StatsScreen = () => {
    const weeklyData = [
        { day: 'M', entries: 1, color: theme.colors.primary },
        { day: 'T', entries: 1, color: theme.colors.primary },
        { day: 'W', entries: 0, color: theme.colors.border },
        { day: 'T', entries: 1, color: theme.colors.primary },
        { day: 'F', entries: 1, color: theme.colors.primary },
        { day: 'S', entries: 1, color: theme.colors.primary },
        { day: 'S', entries: 1, color: theme.colors.primary },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Insights</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.primaryStats}>
                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: theme.colors.error + '20' }]}>
                            <Flame size={24} color={theme.colors.error} fill={theme.colors.error} />
                        </View>
                        <Text style={styles.statValue}>7</Text>
                        <Text style={styles.statLabel}>Day Streak</Text>
                        <Text style={styles.statSub}>Keep going! 🔥</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                            <PenTool size={24} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.statValue}>24</Text>
                        <Text style={styles.statLabel}>Total Entries</Text>
                        <Text style={styles.statSub}>1,847 words written</Text>
                    </View>
                </View>

                <View style={styles.moodTrendCard}>
                    <View style={styles.cardHeader}>
                        <TrendingUp size={20} color={theme.colors.primary} />
                        <Text style={styles.cardTitle}>Mood Trend (7 Days)</Text>
                    </View>
                    <View style={styles.trendInfo}>
                        <Text style={styles.trendValue}>Upward</Text>
                        <Text style={styles.trendSub}>Your mood has improved by 15% this week.</Text>
                    </View>
                    <View style={styles.trendViz}>
                        <Svg height="120" width="100%" viewBox="0 0 300 120">
                            {/* The Line Chart */}
                            <Path
                                d="M 20 90 L 60 80 L 100 65 L 140 55 L 180 40 L 220 25 L 260 15"
                                fill="none"
                                stroke={theme.colors.primary}
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            {/* Points on the line */}
                            <Circle cx="20" cy="90" r="4" fill={theme.colors.primary} />
                            <Circle cx="60" cy="80" r="4" fill={theme.colors.primary} />
                            <Circle cx="100" cy="65" r="4" fill={theme.colors.primary} />
                            <Circle cx="140" cy="55" r="4" fill={theme.colors.primary} />
                            <Circle cx="180" cy="40" r="4" fill={theme.colors.primary} />
                            <Circle cx="220" cy="25" r="4" fill={theme.colors.primary} />
                            <Circle cx="260" cy="15" r="4" fill={theme.colors.primary} />
                        </Svg>
                        <View style={styles.trendLabels}>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                <Text key={day} style={styles.trendDayLabel}>{day}</Text>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={styles.weeklyCard}>
                    <Text style={styles.cardTitle}>Weekly Activity</Text>
                    <View style={styles.barChart}>
                        {weeklyData.map((data, i) => (
                            <View key={i} style={styles.barContainer}>
                                <View
                                    style={[
                                        styles.bar,
                                        {
                                            backgroundColor: data.color,
                                            height: data.entries > 0 ? 80 : 10
                                        }
                                    ]}
                                />
                                <Text style={styles.barLabel}>{data.day}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.infoRow}>
                        <Info size={14} color={theme.colors.textMuted} />
                        <Text style={styles.infoText}>You are most active in the mornings (9:00 AM).</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        padding: 24,
    },
    title: {
        ...theme.typography.h1,
        fontSize: 28,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    primaryStats: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
        alignItems: 'center',
    },
    statIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statValue: {
        ...theme.typography.h1,
        fontSize: 32,
        marginBottom: 4,
    },
    statLabel: {
        ...theme.typography.small,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: 4,
    },
    statSub: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
    },
    moodTrendCard: {
        backgroundColor: theme.colors.white,
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 24,
        ...theme.shadows.small,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    cardTitle: {
        ...theme.typography.h3,
        fontSize: 18,
    },
    trendInfo: {
        marginBottom: 24,
    },
    trendValue: {
        ...theme.typography.h2,
        color: theme.colors.success,
        marginBottom: 4,
    },
    trendSub: {
        ...theme.typography.body,
        fontSize: 15,
        color: theme.colors.textMuted,
    },
    trendViz: {
        marginTop: 12,
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: 16,
    },
    trendLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingHorizontal: 8,
    },
    trendDayLabel: {
        ...theme.typography.caption,
        fontSize: 10,
        fontWeight: '700',
        color: theme.colors.textMuted,
        width: 32,
        textAlign: 'center',
    },
    weeklyCard: {
        backgroundColor: theme.colors.white,
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    barChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 120,
        marginVertical: 24,
    },
    barContainer: {
        alignItems: 'center',
        width: 32,
    },
    bar: {
        width: 12,
        borderRadius: 6,
    },
    barLabel: {
        ...theme.typography.caption,
        marginTop: 8,
        fontWeight: '700',
        color: theme.colors.textMuted,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: theme.colors.surface,
        padding: 12,
        borderRadius: 12,
    },
    infoText: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
        flex: 1,
    },
});

export default StatsScreen;
