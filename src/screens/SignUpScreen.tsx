import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Mail, Lock, Eye, EyeOff, ChevronLeft, CheckCircle2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [passwordStrength, setPasswordStrength] = React.useState(0); // 0-3
    const navigation = useNavigation<any>();

    React.useEffect(() => {
        // Basic password strength logic
        let strength = 0;
        if (password.length > 5) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    }, [password]);

    const handleSignUp = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('Home');
        }, 1500);
    };

    const isEmailValid = email.includes('@') && email.includes('.');

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ChevronLeft size={24} color={theme.colors.text} />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Start your 60-second journey today.</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <Mail size={20} color={theme.colors.textMuted} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    placeholderTextColor={theme.colors.textMuted}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {isEmailValid ? <CheckCircle2 size={20} color={theme.colors.success} /> : null}
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <Lock size={20} color={theme.colors.textMuted} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Create a password"
                                    placeholderTextColor={theme.colors.textMuted}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <EyeOff size={20} color={theme.colors.textMuted} />
                                    ) : (
                                        <Eye size={20} color={theme.colors.textMuted} />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {password.length > 0 ? (
                                <View style={styles.strengthContainer}>
                                    <View style={[styles.strengthBar, { backgroundColor: passwordStrength >= 1 ? theme.colors.error : theme.colors.border }]} />
                                    <View style={[styles.strengthBar, { backgroundColor: passwordStrength >= 2 ? theme.colors.mood.happy : theme.colors.border }]} />
                                    <View style={[styles.strengthBar, { backgroundColor: passwordStrength >= 3 ? theme.colors.success : theme.colors.border }]} />
                                    <Text style={styles.strengthText}>
                                        {passwordStrength === 0 ? 'Weak' : passwordStrength === 1 ? 'Fair' : passwordStrength === 2 ? 'Good' : 'Strong'}
                                    </Text>
                                </View>
                            ) : null}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <View style={styles.inputWrapper}>
                                <Lock size={20} color={theme.colors.textMuted} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Repeat your password"
                                    placeholderTextColor={theme.colors.textMuted}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showPassword}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.signUpButton, isLoading ? styles.disabledButton : {}]}
                            onPress={handleSignUp}
                            disabled={isLoading || !isEmailValid || password !== confirmPassword}
                            activeOpacity={0.8}
                        >
                            {isLoading ? (
                                <ActivityIndicator color={theme.colors.white} />
                            ) : (
                                <Text style={styles.signUpButtonText}>Create Account</Text>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.privacyNotice}>
                            By creating an account, you agree to our{' '}
                            <Text style={styles.linkText}>Terms</Text> and{' '}
                            <Text style={styles.linkText}>Privacy Policy</Text>.
                        </Text>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.signInLink}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    backButton: {
        marginTop: 16,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    header: {
        marginTop: 24,
        marginBottom: 32,
    },
    title: {
        ...theme.typography.h1,
        fontSize: 32,
        marginBottom: 8,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
    },
    form: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        ...theme.typography.small,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: 16,
        height: 56,
        backgroundColor: theme.colors.white,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        ...theme.typography.body,
        color: theme.colors.text,
    },
    strengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 8,
    },
    strengthBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
    },
    strengthText: {
        ...theme.typography.caption,
        marginLeft: 8,
        fontWeight: '600',
    },
    signUpButton: {
        backgroundColor: theme.colors.primary,
        height: 56,
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    disabledButton: {
        opacity: 0.7,
    },
    signUpButtonText: {
        ...theme.typography.h3,
        color: theme.colors.white,
        fontSize: 18,
    },
    privacyNotice: {
        ...theme.typography.caption,
        textAlign: 'center',
        marginTop: 24,
        color: theme.colors.textMuted,
    },
    linkText: {
        color: theme.colors.primary,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    footerText: {
        ...theme.typography.body,
        color: theme.colors.textMuted,
    },
    signInLink: {
        ...theme.typography.body,
        color: theme.colors.primary,
        fontWeight: '600',
    },
});

export default SignUpScreen;
