import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Modal,
    FlatList,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { ChevronDown, Plus, ChevronRight, X, Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

import { MOCK_ENTRIES, MOODS } from '../data/mockData';

const HistoryScreen = () => {
    const navigation = useNavigation<any>();
    const [selectedMonth, setSelectedMonth] = useState('December');
    const [selectedYear, setSelectedYear] = useState(2025);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isMonthEntriesModalVisible, setIsMonthEntriesModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeMoodFilter, setActiveMoodFilter] = useState<string | null>(null);

    const daysInMonth = 31; // Simplified for Dec
    const startDay = 0; // Mon

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const years = [2024, 2025, 2026];

    const MOOD_FILTERS = MOODS;

    const renderCalendarGrid = () => {
        const days = [];
        for (let i = 0; i < startDay; i++) {
            days.push(<View key={`empty-${i}`} style={styles.dayBox} />);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const isToday = d === 27; // Mock today
            // Dec 27 is today
            const entry = MOCK_ENTRIES.find(e => e.day === d);

            const isFuture = d > 27; // Disable future dates

            days.push(
                <TouchableOpacity
                    key={d}
                    disabled={isFuture}
                    style={[
                        styles.dayBox,
                        entry && styles.journaledDay,
                        isToday && styles.todayBox,
                        isFuture && styles.futureDay
                    ]}
                    onPress={() => {
                        if (entry) {
                            navigation.navigate('EntryDetail', { id: entry.id });
                        } else {
                            // If it's today, we want the 60s limit (noLimit: false)
                            // If it's a past date (15, 19), we want no limit (noLimit: true)
                            navigation.navigate('PreMoodCheck', {
                                date: `${selectedMonth} ${d}, ${selectedYear}`,
                                noLimit: isToday ? false : true,
                                isPastDate: !isToday
                            });
                        }
                    }}
                >
                    <Text style={[
                        styles.dayText,
                        entry && styles.journaledDayText,
                        isToday && styles.todayText,
                        isFuture && styles.futureDayText
                    ]}>
                        {d}
                    </Text>
                </TouchableOpacity>
            );
        }
        return days;
    };
    const selectedEntry = MOCK_ENTRIES.find(e => e.day === selectedDay);

    // Map full month names to short versions used in mock data
    const monthMap: { [key: string]: string } = {
        'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
        'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
        'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
    };

    const monthEntries = MOCK_ENTRIES.filter(e => e.date.includes(monthMap[selectedMonth]));
    const recentLimit = monthEntries.slice(-4).reverse();

    const filteredMonthEntries = monthEntries.filter(entry => {
        const matchesSearch = entry.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.date.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMood = activeMoodFilter ? entry.postMood.type === activeMoodFilter : true;
        return matchesSearch && matchesMood;
    }).reverse();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>History</Text>
                    <TouchableOpacity
                        style={styles.monthSelector}
                        onPress={() => setIsPickerVisible(true)}
                    >
                        <Text style={styles.monthSelectorText}>{selectedMonth} {selectedYear}</Text>
                        <ChevronDown size={20} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Calendar Grid */}
                <View style={styles.calendarCard}>
                    <View style={styles.daysOfWeekHeader}>
                        {DAYS_OF_WEEK.map(day => (
                            <Text key={day} style={styles.dayOfWeekText}>{day}</Text>
                        ))}
                    </View>
                    <View style={styles.grid}>{renderCalendarGrid()}</View>
                </View>

                {/* Recent Entries Section */}
                <View style={styles.recentSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Entries This Month</Text>
                        {monthEntries.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setIsMonthEntriesModalVisible(true)}
                                style={styles.viewAllPill}
                            >
                                <Text style={styles.viewAllPillText}>View all</Text>
                                <ChevronRight size={14} color={theme.colors.white} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {monthEntries.length === 0 ? (
                        <View style={styles.noEntriesContainer}>
                            <Text style={styles.noEntriesText}>No entries for this month yet.</Text>
                        </View>
                    ) : (
                        recentLimit.map(entry => (
                            <TouchableOpacity
                                key={entry.id}
                                style={styles.recentEntryCard}
                                onPress={() => navigation.navigate('EntryDetail', { id: entry.id })}
                            >
                                <View style={styles.recentEntryInfo}>
                                    <Text style={styles.recentEntryDate}>{entry.date}</Text>
                                    <Text style={styles.recentEntryEmoji}>{entry.postMood.emoji}</Text>
                                </View>
                                <Text style={styles.recentEntryText} numberOfLines={2}>{entry.text}</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </View>

                {/* View All Entries Button (Across All Time) */}
                <View style={styles.bottomActions}>
                    <TouchableOpacity
                        style={styles.viewAllGlobalButton}
                        onPress={() => navigation.navigate('AllEntries')}
                    >
                        <Text style={styles.viewAllGlobalButtonText}>Show All Entries</Text>
                        <ChevronRight size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Month/Year Picker Modal */}
            <Modal
                visible={isPickerVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsPickerVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsPickerVisible(false)}
                >
                    <View style={styles.pickerModal}>
                        <Text style={styles.modalTitle}>Select Month & Year</Text>
                        <View style={styles.pickerContainer}>
                            <FlatList
                                data={months}
                                keyExtractor={item => item}
                                style={styles.pickerList}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.pickerItem, selectedMonth === item && styles.selectedPickerItem]}
                                        onPress={() => {
                                            setSelectedMonth(item);
                                            setIsPickerVisible(false);
                                        }}
                                    >
                                        <Text style={[styles.pickerItemText, selectedMonth === item && styles.selectedPickerItemText]}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <FlatList
                                data={years}
                                keyExtractor={item => item.toString()}
                                style={styles.pickerList}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.pickerItem, selectedYear === item && styles.selectedPickerItem]}
                                        onPress={() => {
                                            setSelectedYear(item);
                                            setIsPickerVisible(false);
                                        }}
                                    >
                                        <Text style={[styles.pickerItemText, selectedYear === item && styles.selectedPickerItemText]}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* View All This Month Modal */}
            <Modal
                visible={isMonthEntriesModalVisible}
                animationType="slide"
                onRequestClose={() => setIsMonthEntriesModalVisible(false)}
            >
                <SafeAreaView style={styles.monthModalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setIsMonthEntriesModalVisible(false)} style={styles.closeButton}>
                            <X size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.modalHeaderTitle}>This Month</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    <View style={styles.searchSection}>
                        <View style={styles.searchBar}>
                            <Search size={20} color={theme.colors.textMuted} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder={`Search in ${selectedMonth}...`}
                                placeholderTextColor={theme.colors.textMuted}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        <View style={styles.filterContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                                <TouchableOpacity
                                    style={[styles.moodChip, !activeMoodFilter && styles.activeMoodChip]}
                                    onPress={() => setActiveMoodFilter(null)}
                                >
                                    <Text style={[styles.moodChipText, !activeMoodFilter && styles.activeMoodChipText]}>All</Text>
                                </TouchableOpacity>
                                {MOOD_FILTERS.map((mood) => (
                                    <TouchableOpacity
                                        key={mood.type}
                                        style={[styles.moodChip, activeMoodFilter === mood.type && styles.activeMoodChip]}
                                        onPress={() => setActiveMoodFilter(activeMoodFilter === mood.type ? null : mood.type)}
                                    >
                                        <Text style={styles.moodEmojiText}>{mood.emoji}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>

                    <FlatList
                        data={filteredMonthEntries}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.modalListContent}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalEntryCard}
                                onPress={() => {
                                    setIsMonthEntriesModalVisible(false);
                                    navigation.navigate('EntryDetail', { id: item.id });
                                }}
                            >
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryDateText}>{item.date}</Text>
                                    <Text style={styles.entryMoodEmoji}>{item.postMood.emoji}</Text>
                                </View>
                                <Text style={styles.entryTextPreview} numberOfLines={3}>
                                    {item.text}
                                </Text>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                            <View style={styles.emptySearch}>
                                <Text style={styles.emptySearchText}>No entries match your filters.</Text>
                            </View>
                        }
                    />
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
    },
    headerTitle: {
        ...theme.typography.h1,
        fontSize: 32,
        marginBottom: 16,
    },
    monthSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    monthSelectorText: {
        ...theme.typography.h3,
        fontSize: 18,
        color: theme.colors.text,
    },
    calendarCard: {
        backgroundColor: theme.colors.white,
        marginHorizontal: 16,
        padding: 20,
        borderRadius: 24,
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    daysOfWeekHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dayOfWeekText: {
        ...theme.typography.caption,
        fontWeight: '700',
        color: theme.colors.textMuted,
        width: 42,
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 8,
    },
    dayBox: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 4,
    },
    dayText: {
        ...theme.typography.body,
        fontSize: 14,
        fontWeight: '500',
    },
    journaledDay: {
        backgroundColor: theme.colors.primary,
    },
    journaledDayText: {
        color: theme.colors.white,
        fontWeight: '700',
    },
    todayBox: {
        backgroundColor: theme.colors.white,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    todayText: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
    futureDay: {
        opacity: 0.3,
    },
    futureDayText: {
        color: theme.colors.textMuted,
    },
    selectedDayBox: {
        backgroundColor: theme.colors.primary + '15',
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    selectedDayText: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
    selectedDateSection: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    entryPreviewCard: {
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    entryDateText: {
        ...theme.typography.caption,
        fontWeight: '700',
        color: theme.colors.text,
    },
    entryTimeText: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
        marginTop: 2,
    },
    entryMoodEmoji: {
        fontSize: 24,
    },
    entryTextPreview: {
        ...theme.typography.body,
        fontSize: 14,
        color: theme.colors.textMuted,
        lineHeight: 20,
    },
    emptyStateCard: {
        backgroundColor: theme.colors.white,
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: theme.colors.border,
    },
    emptyStateTitle: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
        marginBottom: 16,
    },
    addEntryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 8,
    },
    addEntryButtonText: {
        ...theme.typography.body,
        color: theme.colors.white,
        fontWeight: '600',
        fontSize: 14,
    },
    recentSection: {
        marginTop: 32,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        ...theme.typography.h3,
        fontSize: 20,
    },
    viewAllPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
    },
    viewAllPillText: {
        ...theme.typography.caption,
        color: theme.colors.white,
        fontWeight: '700',
    },
    viewAllRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    viewAllLabel: {
        ...theme.typography.small,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    recentEntryCard: {
        backgroundColor: theme.colors.white,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    recentEntryInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    recentEntryDate: {
        ...theme.typography.caption,
        fontWeight: '700',
        color: theme.colors.text,
    },
    recentEntryEmoji: {
        fontSize: 16,
    },
    recentEntryText: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
        lineHeight: 18,
    },
    bottomActions: {
        marginTop: 12,
        paddingBottom: 40,
    },
    viewAllGlobalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        gap: 8,
    },
    viewAllGlobalButtonText: {
        ...theme.typography.h3,
        fontSize: 16,
        color: theme.colors.primary,
    },
    noEntriesContainer: {
        padding: 32,
        backgroundColor: theme.colors.white,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderStyle: 'dashed',
    },
    noEntriesText: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 24,
    },
    pickerModal: {
        backgroundColor: theme.colors.white,
        borderRadius: 24,
        padding: 24,
        maxHeight: '60%',
    },
    modalTitle: {
        ...theme.typography.h2,
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    pickerContainer: {
        flexDirection: 'row',
        height: 300,
    },
    pickerList: {
        flex: 1,
    },
    pickerItem: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginVertical: 2,
    },
    selectedPickerItem: {
        backgroundColor: theme.colors.primary + '10',
    },
    pickerItemText: {
        ...theme.typography.body,
        textAlign: 'center',
    },
    selectedPickerItemText: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
    // Month Modal Styles
    monthModalContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    closeButton: {
        padding: 8,
    },
    modalHeaderTitle: {
        ...theme.typography.h3,
        fontWeight: '700',
    },
    searchSection: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 52,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        ...theme.typography.body,
        fontSize: 16,
    },
    filterContainer: {
        flexDirection: 'row',
    },
    filterScroll: {
        gap: 10,
        paddingRight: 20,
    },
    moodChip: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    activeMoodChip: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    moodChipText: {
        ...theme.typography.caption,
        fontWeight: '700',
    },
    activeMoodChipText: {
        color: theme.colors.white,
    },
    moodEmojiText: {
        fontSize: 20,
    },
    modalListContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    modalEntryCard: {
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    emptySearch: {
        alignItems: 'center',
        marginTop: 40,
    },
    emptySearchText: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
    },
});

export default HistoryScreen;
