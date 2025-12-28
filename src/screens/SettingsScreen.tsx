import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { USER_PROFILE } from '../data/mockData';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);
    const [reminders, setReminders] = React.useState(true);

    const SectionHeader = ({ title }: { title: string }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    const Divider = () => <View style={styles.divider} />;

    const ToggleItem = ({ label, value, onValueChange, subLabel }: any) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemRow}>
                <Text style={styles.itemLabel}>{label}</Text>
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                    thumbColor={theme.colors.white}
                />
            </View>
            {subLabel && (
                <Text style={styles.subLabel}>{subLabel}</Text>
            )}
        </View>
    );

    const LinkItem = ({ label, onPress, color = '#007AFF', showChevron = true }: any) => (
        <TouchableOpacity style={styles.itemRow} onPress={onPress} activeOpacity={0.7}>
            <Text style={[styles.itemLabel, { color }]}>{label}</Text>
            {showChevron && <ChevronRight size={18} color={theme.colors.border} />}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{USER_PROFILE.avatarInitials}</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{USER_PROFILE.name}</Text>
                        <Text style={styles.profileEmail}>{USER_PROFILE.email}</Text>
                    </View>
                </View>
                <Divider />

                {/* Preferences Section */}
                <SectionHeader title="Preferences" />
                <ToggleItem
                    label="Daily Reminder"
                    value={reminders}
                    onValueChange={setReminders}
                    subLabel="9:00 AM"
                />
                <ToggleItem
                    label="Notifications"
                    value={notifications}
                    onValueChange={setNotifications}
                />
                <ToggleItem
                    label="Dark Mode"
                    value={darkMode}
                    onValueChange={setDarkMode}
                />
                <Divider />

                {/* Privacy & Data Section */}
                <SectionHeader title="Privacy & Data" />
                <LinkItem label="Download My Data" />
                <LinkItem label="Export Entries as PDF" />
                <LinkItem label="Delete All Entries" color={theme.colors.error} />
                <Divider />

                {/* About Section */}
                <SectionHeader title="About" />
                <View style={styles.itemRow}>
                    <Text style={styles.versionText}>Version 1.0.0</Text>
                </View>
                <LinkItem label="Terms of Service" />
                <LinkItem label="Privacy Policy" />
                <LinkItem label="Contact Support" />

                {/* Bottom Section */}
                <TouchableOpacity style={styles.signOutButton} activeOpacity={0.8}>
                    <LogOut size={20} color={theme.colors.white} />
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: theme.colors.background,
    },
    headerTitle: {
        ...theme.typography.h3,
        fontWeight: '700',
    },
    backButton: {
        padding: 4,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 24,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.white,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        ...theme.typography.h3,
        fontSize: 18,
        color: theme.colors.text,
        marginBottom: 2,
    },
    profileEmail: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: 12,
        opacity: 0.5,
    },
    sectionHeader: {
        ...theme.typography.caption,
        fontWeight: '700',
        color: theme.colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginTop: 16,
        marginBottom: 12,
    },
    itemContainer: {
        marginBottom: 8,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
    },
    itemLabel: {
        ...theme.typography.body,
        fontSize: 16,
        color: theme.colors.text,
        fontWeight: '500',
    },
    subLabel: {
        ...theme.typography.caption,
        color: theme.colors.primary,
        fontWeight: '600',
        marginTop: -8,
        marginBottom: 8,
    },
    versionText: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.error,
        height: 56,
        borderRadius: 16,
        marginTop: 32,
        gap: 12,
        ...theme.shadows.small,
    },
    signOutText: {
        ...theme.typography.h3,
        color: theme.colors.white,
        fontSize: 16,
    },
});

export default SettingsScreen;
