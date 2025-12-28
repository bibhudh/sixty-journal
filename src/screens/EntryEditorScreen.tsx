import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { ChevronLeft, Settings } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MOCK_ENTRIES } from '../data/mockData';

const EntryEditorScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { id } = route.params || {};

    const entry = MOCK_ENTRIES.find(e => e.id === id) || MOCK_ENTRIES[0];

    // Pre-filled data
    const [text, setText] = React.useState(entry.text);

    const handleSave = () => {
        // Logic to save changes would go here
        // Update mock data in memory for this session (if we wanted to go that far, but standard is fine)
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Entry</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Settings size={20} color={theme.colors.text} />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Date/Time Info */}
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateTimeText}>{entry.date} • {entry.time}</Text>
                    </View>

                    {/* Prompt Card */}
                    <View style={styles.promptCard}>
                        <Text style={styles.promptLabel}>The Prompt</Text>
                        <Text style={styles.promptText}>
                            {entry.prompt}
                        </Text>
                    </View>

                    {/* Writing Area */}
                    <View style={styles.writingArea}>
                        <TextInput
                            style={styles.input}
                            multiline
                            placeholder="Type your entry..."
                            placeholderTextColor={theme.colors.textMuted}
                            value={text}
                            onChangeText={setText}
                            textAlignVertical="top"
                        />
                        <View style={styles.footer}>
                            <Text style={styles.charCount}>{text.length} characters</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    flex: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        ...theme.typography.h3,
        fontWeight: '700',
    },
    iconButton: {
        padding: 4,
    },
    scrollContent: {
        padding: 24,
    },
    dateTimeContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    dateTimeText: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
    promptCard: {
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 24,
        ...theme.shadows.small,
    },
    promptLabel: {
        ...theme.typography.caption,
        color: theme.colors.primary,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    promptText: {
        ...theme.typography.body,
        fontSize: 16,
        color: theme.colors.text,
        lineHeight: 24,
    },
    writingArea: {
        flex: 1,
        minHeight: 300,
    },
    input: {
        ...theme.typography.body,
        fontSize: 18,
        color: theme.colors.text,
        lineHeight: 28,
        padding: 0,
    },
    footer: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        alignItems: 'flex-end',
    },
    charCount: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
    },
    buttonContainer: {
        padding: 24,
        gap: 12,
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    saveButtonText: {
        ...theme.typography.h3,
        color: theme.colors.white,
        fontSize: 16,
    },
    cancelButton: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonText: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
});

export default EntryEditorScreen;
