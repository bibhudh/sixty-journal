import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
    const navigation = useNavigation<any>();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(20)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('Onboarding');
        }, 2500);

        return () => clearTimeout(timer);
    }, [fadeAnim, slideAnim, navigation]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[theme.colors.mood.calm, theme.colors.background]}
                style={styles.gradient}
            >
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.logo}>Sixty</Text>
                    <Text style={styles.tagline}>60 Seconds to Clarity</Text>
                </Animated.View>

                <Animated.View style={[styles.skipContainer, { opacity: fadeAnim }]}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => navigation.replace('Onboarding')}
                    >
                        <Text style={styles.skipText}>Get Started</Text>
                    </TouchableOpacity>
                </Animated.View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    logo: {
        ...theme.typography.h1,
        fontSize: 64, // Large logo
        color: theme.colors.primary,
        letterSpacing: -1,
    },
    tagline: {
        ...theme.typography.body,
        fontSize: 18,
        color: theme.colors.textMuted,
        marginTop: theme.spacing.sm,
        fontWeight: '500',
    },
    skipContainer: {
        position: 'absolute',
        bottom: 50,
    },
    skipButton: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.primary,
        ...theme.shadows.small,
    },
    skipText: {
        ...theme.typography.h3,
        fontSize: 16,
        color: theme.colors.white,
    },
});

export default SplashScreen;
