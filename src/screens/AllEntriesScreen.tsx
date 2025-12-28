import React, { useState, useMemo } from 'react';
// Trigger refresh
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { ChevronLeft, Search, Filter } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

import { MOCK_ENTRIES, MOODS } from '../data/mockData';

const AllEntriesScreen = () => {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeMoodFilter, setActiveMoodFilter] = useState<string | null>(null);

    const filteredEntries = useMemo(() => {
        return MOCK_ENTRIES.filter(entry => {
            const matchesSearch = entry.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entry.date.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesMood = activeMoodFilter ? entry.postMood.type === activeMoodFilter : true;
            return matchesSearch && matchesMood;
        });
    }, [searchQuery, activeMoodFilter]);

    const renderEntryItem = ({ item }: { item: typeof MOCK_ENTRIES[0] }) => (
        <TouchableOpacity
            style={styles.entryCard}
            onPress={() => navigation.navigate('EntryDetail', { id: item.id })}
        >
            <View style={styles.entryHeader}>
                <Text style={styles.entryDate}>{item.date}</Text>
                <Text style={styles.entryEmoji}>{item.postMood.emoji}</Text>
            </View>
            <Text style={styles.entryText} numberOfLines={3}>
                {item.text}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>All Entries</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.searchSection}>
                <View style={styles.searchBar}>
                    <Search size={20} color={theme.colors.textMuted} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search your entries..."
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
                        {MOODS.map((mood) => (
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
                data={filteredEntries}
                keyExtractor={item => item.id}
                renderItem={renderEntryItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No entries found matching your search.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 8,
    },
    title: {
        ...theme.typography.h3,
        fontSize: 18,
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
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    entryCard: {
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: 20,
        marginBottom: 16,
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
    entryDate: {
        ...theme.typography.caption,
        fontWeight: '700',
        color: theme.colors.text,
    },
    entryEmoji: {
        fontSize: 18,
    },
    entryText: {
        ...theme.typography.body,
        fontSize: 14,
        color: theme.colors.textMuted,
        lineHeight: 20,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
    },
});

export default AllEntriesScreen;
