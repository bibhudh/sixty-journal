import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Flame, PenTool, TrendingUp, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

import { MOCK_ENTRIES } from '../data/mockData';

const StatsScreen = () => {
    const [timeFilter, setTimeFilter] = React.useState('Week');

    // Mood Scoring
    const getMoodScore = (type: string) => {
        switch (type) {
            case 'happy': return 5;
            case 'calm': return 4;
            case 'anxious': return 3;
            case 'sad': return 2;
            case 'angry': return 1;
            default: return 3;
        }
    };

    // Calculate chart data based on filter
    const getChartData = () => {
        const dataPoints: { label: string; score: number }[] = [];

        if (timeFilter === 'Week') {
            // Last 7 days
            for (let i = 6; i >= 0; i--) {
                const d = new Date(2025, 11, 27); // Mock current date: Dec 27
                d.setDate(d.getDate() - i);

                const dayStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                // Simple check for mock data matching the day date string logic is complex with pure string IDs
                // Let's rely on MOCK_ENTRIES being generated for 2025.

                // Find entries for this day
                const dayMonth = d.toLocaleDateString('en-US', { month: 'short' });
                const dayNum = d.getDate();
                const matchingEntry = MOCK_ENTRIES.find(e => {
                    // e.date format "Dec 27, 2025" or "Jan 1, 2025"
                    return e.date.startsWith(`${dayMonth} ${dayNum},`);
                });

                if (matchingEntry) {
                    dataPoints.push({
                        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
                        score: getMoodScore(matchingEntry.postMood.type)
                    });
                } else {
                    // Fill gap with previous or default
                    dataPoints.push({
                        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
                        score: 3 // Neutral fallback
                    });
                }
            }
        } else if (timeFilter === '6 Months' || timeFilter === '12 Months') {
            const monthsBack = timeFilter === '6 Months' ? 6 : 12;
            const currentMonthIdx = 11; // Dec

            for (let i = monthsBack - 1; i >= 0; i--) {
                const targetMonthIdx = (currentMonthIdx - i + 12) % 12; // Handle wrap if needed, mainly 0-11
                const targetMonthName = new Date(2025, targetMonthIdx).toLocaleDateString('en-US', { month: 'short' });

                // Average for month
                const monthEntries = MOCK_ENTRIES.filter(e => e.date.startsWith(targetMonthName));
                const totalScore = monthEntries.reduce((acc, curr) => acc + getMoodScore(curr.postMood.type), 0);
                const avgScore = monthEntries.length > 0 ? totalScore / monthEntries.length : 3;

                dataPoints.push({
                    label: targetMonthName,
                    score: avgScore
                });
            }
        }
        return dataPoints;
    };

    const chartData = getChartData();

    // Generate Path for SVG
    const getChartPath = () => {
        if (chartData.length < 2) return "";

        const cardWidth = Math.max(width - 120, chartData.length * 50);
        // Map scores 1..5 to Y coordinates (15..135)
        // 5 -> 15 (top)
        // 1 -> 135 (bottom)
        const getY = (score: number) => 15 + (5 - score) * 30;
        const getX = (index: number) => (index * cardWidth) / (chartData.length - 1);

        let d = `M ${getX(0)} ${getY(chartData[0].score)}`;
        for (let i = 1; i < chartData.length; i++) {
            d += ` L ${getX(i)} ${getY(chartData[i].score)}`;
        }
        return d;
    };

    const getTrendText = () => {
        const start = chartData[0].score;
        const end = chartData[chartData.length - 1].score;
        const diff = end - start;

        if (diff > 0.5) return "Upward Trend";
        if (diff < -0.5) return "Downward Trend";
        return "Stable Mood";
    };

    // Calculate basic stats
    const totalEntries = MOCK_ENTRIES.length;
    const totalWords = MOCK_ENTRIES.reduce((acc, curr) => acc + curr.text.split(' ').length, 0);

    // Mock week: Dec 22 (Mon) to Dec 28 (Sun) 2025
    // Data exists up to Dec 26.
    const getEntriesCount = (day: number) => MOCK_ENTRIES.find(e => e.day === day && e.date.startsWith('Dec')) ? 1 : 0;

    // Determine bar color based on activity
    const getBarColor = (count: number) => count > 0 ? theme.colors.primary : theme.colors.border;

    const weeklyData = [
        { day: 'M', entries: getEntriesCount(22), color: getBarColor(getEntriesCount(22)) },
        { day: 'T', entries: getEntriesCount(23), color: getBarColor(getEntriesCount(23)) },
        { day: 'W', entries: getEntriesCount(24), color: getBarColor(getEntriesCount(24)) },
        { day: 'T', entries: getEntriesCount(25), color: getBarColor(getEntriesCount(25)) },
        { day: 'F', entries: getEntriesCount(26), color: getBarColor(getEntriesCount(26)) },
        { day: 'S', entries: getEntriesCount(27), color: getBarColor(getEntriesCount(27)) },
        { day: 'S', entries: getEntriesCount(28), color: getBarColor(getEntriesCount(28)) },
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
                        <Text style={styles.statValue}>5</Text>
                        <Text style={styles.statLabel}>Day Streak</Text>
                        <Text style={styles.statSub}>Keep going! 🔥</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                            <PenTool size={24} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.statValue}>{totalEntries}</Text>
                        <Text style={styles.statLabel}>Total Entries</Text>
                        <Text style={styles.statSub}>{totalWords.toLocaleString()} words written</Text>
                    </View>
                </View>

                <View style={[styles.moodTrendCard, { paddingLeft: 8, paddingRight: 24 }]}>
                    <View style={[styles.cardHeader, { paddingLeft: 16 }]}>
                        <TrendingUp size={20} color={theme.colors.primary} />
                        <Text style={styles.cardTitle}>Mood Trend</Text>
                    </View>

                    {/* Filter Tabs */}
                    <View style={styles.filterContainer}>
                        {['Week', '6 Months', '12 Months'].map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                style={[styles.filterTab, timeFilter === filter && styles.activeFilterTab]}
                                onPress={() => setTimeFilter(filter)}
                            >
                                <Text style={[styles.filterText, timeFilter === filter && styles.activeFilterText]}>
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.trendInfoContainer}>
                        <Text style={styles.trendValue}>{getTrendText()}</Text>
                    </View>

                    <View style={styles.chartRow}>
                        {/* Y-Axis Labels - Fixed */}
                        <View style={styles.yAxis}>
                            {['Happy', 'Calm', 'Anxious', 'Sad', 'Angry'].map((label, index) => (
                                <View key={label} style={styles.yAxisLabelContainer}>
                                    <Text style={styles.yAxisLabel}>{label}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Chart Area - Scrollable */}
                        <View style={styles.chartArea}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingRight: 20 }}
                            >
                                <View>
                                    <Svg height="150" width={Math.max(width - 120, chartData.length * 50)} viewBox={`0 0 ${Math.max(width - 120, chartData.length * 50)} 150`}>
                                        {/* Grid Lines */}
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <Path
                                                key={i}
                                                d={`M 0 ${15 + i * 30} H ${Math.max(width - 120, chartData.length * 50)}`}
                                                stroke={theme.colors.border}
                                                strokeWidth="1"
                                                strokeDasharray="4 4"
                                            />
                                        ))}

                                        {/* The Line Chart */}
                                        {chartData.length > 1 && (
                                            <Path
                                                d={getChartPath()}
                                                fill="none"
                                                stroke={theme.colors.primary}
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        )}

                                        {/* Data Points */}
                                        {chartData.map((point, index) => (
                                            <Circle
                                                key={index}
                                                cx={(index * Math.max(width - 120, chartData.length * 50)) / (chartData.length - 1 || 1)}
                                                cy={15 + (5 - point.score) * 30}
                                                r="4"
                                                fill={theme.colors.primary}
                                            />
                                        ))}
                                    </Svg>

                                    {/* X-Axis Labels inside scroll view */}
                                    <View style={[styles.xAxis, { width: Math.max(width - 120, chartData.length * 50) }]}>
                                        {chartData.map((point, index) => (
                                            <Text
                                                key={index}
                                                style={[
                                                    styles.xAxisLabel,
                                                    {
                                                        width: 50,
                                                        position: 'absolute',
                                                        left: (index * Math.max(width - 120, chartData.length * 50)) / (chartData.length - 1 || 1) - 25
                                                    }
                                                ]}
                                            >
                                                {point.label}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            </ScrollView>
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
    filterContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    filterTab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeFilterTab: {
        backgroundColor: theme.colors.white,
        ...theme.shadows.small,
    },
    filterText: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
    activeFilterText: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
    trendInfoContainer: {
        marginBottom: 8,
        paddingHorizontal: 16,
    },
    chartRow: {
        flexDirection: 'row',
        height: 150,
        alignItems: 'flex-start', // Top align to match SVG 0 coordinate
    },
    yAxis: {
        width: 60,
        height: 150,
        justifyContent: 'flex-start',
        paddingVertical: 0,
        alignItems: 'flex-start',
    },
    yAxisLabelContainer: {
        height: 30,
        justifyContent: 'center',
    },
    yAxisLabel: {
        fontSize: 10,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
    chartArea: {
        flex: 1,
    },
    xAxis: {
        marginTop: 4,
    },
    xAxisLabel: {
        fontSize: 10,
        color: theme.colors.textMuted,
        textAlign: 'center',
    },
});

export default StatsScreen;
