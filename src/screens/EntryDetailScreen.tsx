import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { ChevronLeft, Edit2, Trash2, ArrowRight } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EntryDetailScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { day } = route.params || { day: 20 };
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    const handleDelete = () => {
        setShowDeleteModal(false);
        // In a real app, delete logic here
        navigation.navigate('Home', { screen: 'History' });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>December {day}, 2025 • 9:15 PM</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.moodSection}>
                    <Text style={styles.sectionTitle}>Emotional Shift</Text>
                    <View style={styles.moodRow}>
                        <View style={[styles.moodBadge, { backgroundColor: theme.colors.mood.anxious + '20' }]}>
                            <Text style={styles.moodEmoji}>😟</Text>
                            <Text style={styles.moodText}>Anxious</Text>
                        </View>
                        <ArrowRight size={20} color={theme.colors.textMuted} />
                        <View style={[styles.moodBadge, { backgroundColor: theme.colors.mood.calm + '20' }]}>
                            <Text style={styles.moodEmoji}>😌</Text>
                            <Text style={styles.moodText}>Calm</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.promptSection}>
                    <Text style={styles.sectionTitle}>Prompt</Text>
                    <View style={styles.promptCard}>
                        <Text style={styles.promptText}>
                            "What's one small thing that made you smile today?"
                        </Text>
                    </View>
                </View>

                <View style={styles.entrySection}>
                    <Text style={styles.sectionTitle}>Your Reflection</Text>
                    <Text style={styles.entryText}>
                        Today was quite a busy day at work. I felt overwhelmed with meetings and deadlines.
                        However, when I stepped outside for a quick coffee break, I saw a small puppy playing
                        in the park. Its pure joy and energy were so contagious that I couldn't help but smile.
                        It reminded me that beauty exists in small moments, even on stressful days.
                        Writing this down for 60 seconds helped me realize that the stress is temporary,
                        but these little moments are what truly matter. I feel much more centered now.
                    </Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('EntryEditor')}
                    >
                        <Edit2 size={20} color={theme.colors.text} />
                        <Text style={styles.editButtonText}>Edit Entry</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => setShowDeleteModal(true)}
                    >
                        <Trash2 size={20} color={theme.colors.error} />
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                visible={showDeleteModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDeleteModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Delete Entry?</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure? This entry will be permanently deleted and cannot be undone.
                        </Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.modalDeleteButton}
                                onPress={handleDelete}
                            >
                                <Text style={styles.modalDeleteButtonText}>Delete Entry</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={() => setShowDeleteModal(false)}
                            >
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        ...theme.typography.small,
        fontWeight: '600',
        color: theme.colors.text,
    },
    scrollContent: {
        padding: 24,
    },
    moodSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        ...theme.typography.caption,
        fontWeight: '700',
        color: theme.colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },
    moodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: 20,
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    moodBadge: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        minWidth: 90,
    },
    moodEmoji: {
        fontSize: 24,
        marginBottom: 4,
    },
    moodText: {
        ...theme.typography.caption,
        fontWeight: '600',
        color: theme.colors.text,
    },
    promptSection: {
        marginBottom: 32,
    },
    promptCard: {
        backgroundColor: theme.colors.primary + '05',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.primary + '15',
    },
    promptText: {
        ...theme.typography.body,
        fontStyle: 'italic',
        color: theme.colors.primary,
        fontWeight: '500',
    },
    entrySection: {
        marginBottom: 40,
    },
    entryText: {
        ...theme.typography.body,
        lineHeight: 26,
        color: theme.colors.text,
    },
    actions: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 40,
    },
    editButton: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: 8,
    },
    editButtonText: {
        ...theme.typography.h3,
        fontSize: 16,
        color: theme.colors.text,
    },
    deleteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.error + '30',
        gap: 4,
    },
    deleteButtonText: {
        ...theme.typography.h3,
        fontSize: 14,
        color: theme.colors.error,
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
        padding: 24,
        alignItems: 'center',
        ...theme.shadows.medium,
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
        marginBottom: 24,
        lineHeight: 22,
    },
    modalActions: {
        width: '100%',
        gap: 12,
    },
    modalDeleteButton: {
        backgroundColor: theme.colors.error,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalDeleteButtonText: {
        ...theme.typography.h3,
        color: theme.colors.white,
        fontSize: 16,
    },
    modalCancelButton: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCancelButtonText: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
});

export default EntryDetailScreen;
