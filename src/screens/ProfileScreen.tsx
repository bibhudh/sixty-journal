import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { User, Settings, LogOut } from 'lucide-react-native';

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <User color={theme.colors.primary} size={40} />
                    </View>
                </View>
                <Text style={styles.userName}>User Name</Text>
                <Text style={styles.userEmail}>user@example.com</Text>
            </View>

            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Settings color={theme.colors.text} size={20} />
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
                    <LogOut color={theme.colors.error} size={20} />
                    <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        alignItems: 'center',
        padding: theme.spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    avatarContainer: {
        marginBottom: theme.spacing.md,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    userName: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    userEmail: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
    },
    menu: {
        padding: theme.spacing.lg,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        gap: theme.spacing.md,
    },
    menuText: {
        ...theme.typography.body,
        color: theme.colors.text,
    },
    logoutItem: {
        borderBottomWidth: 0,
        marginTop: theme.spacing.xl,
    },
    logoutText: {
        color: theme.colors.error,
    },
});

export default ProfileScreen;
