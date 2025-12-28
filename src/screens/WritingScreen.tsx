import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Animated,
    Keyboard,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Circle } from 'react-native-svg';
import { theme } from '../theme';
import { ChevronLeft, Settings, Info } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { MOCK_ENTRIES } from '../data/mockData';

const { width } = Dimensions.get('window');
const TIMER_SIZE = 120;
const STROKE_WIDTH = 8;
const RADIUS = (TIMER_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const WritingScreen = ({ route }: any) => {
    const { date, noLimit, isPastDate } = route?.params || {};
    const [text, setText] = React.useState('');
    const [timeLeft, setTimeLeft] = React.useState(60);
    const [isFinished, setIsFinished] = React.useState(false);
    const navigation = useNavigation<any>();

    const timerAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (noLimit) return; // Skip timer if no limit

        // Start total timer animation
        Animated.timing(timerAnim, {
            toValue: 1,
            duration: 60000,
            useNativeDriver: true,
        }).start();

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [noLimit]);

    const strokeDashoffset = timerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, CIRCUMFERENCE],
    });

    const getTimerColor = () => {
        if (timeLeft > 30) return theme.colors.success;
        if (timeLeft > 10) return theme.colors.mood.happy;
        return theme.colors.error;
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmit = () => {
        navigation.navigate('PostMoodCheck');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {isPastDate ? `Entry for ${date}` : "Today's Entry"}
                </Text>
                <TouchableOpacity>
                    <Settings size={24} color={theme.colors.text} />
                </TouchableOpacity>
            </View>

            {!noLimit && (
                <View style={styles.timerContainer}>
                    <View style={styles.timerWrapper}>
                        <Svg width={TIMER_SIZE.toString()} height={TIMER_SIZE.toString()} style={styles.timerSvg}>
                            <Circle
                                cx={TIMER_SIZE / 2}
                                cy={TIMER_SIZE / 2}
                                r={RADIUS}
                                stroke={theme.colors.border}
                                strokeWidth={STROKE_WIDTH}
                                fill="transparent"
                            />
                            <AnimatedCircle
                                cx={TIMER_SIZE / 2}
                                cy={TIMER_SIZE / 2}
                                r={RADIUS}
                                stroke={getTimerColor()}
                                strokeWidth={STROKE_WIDTH}
                                fill="transparent"
                                strokeDasharray={`${CIRCUMFERENCE}, ${CIRCUMFERENCE}`}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                            />
                        </Svg>
                        <View style={styles.timerTextContainer}>
                            <Text style={[styles.timerText, { color: getTimerColor() }]}>
                                {formatTime(timeLeft)}
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            <View style={styles.promptCard}>
                <Text style={styles.promptText}>
                    {isPastDate
                        ? `What's one small thing that made you smile on ${date}?`
                        : MOCK_ENTRIES[0].prompt}
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Start typing your thoughts here..."
                    placeholderTextColor={theme.colors.textMuted}
                    multiline
                    autoFocus
                    value={text}
                    onChangeText={setText}
                    editable={!isFinished}
                    textAlignVertical="top"
                />
                <View style={styles.inputFooter}>
                    <Text style={styles.charCount}>{text.length} characters</Text>
                </View>
            </View>

            <TouchableOpacity
                style={[
                    styles.submitButton,
                    text.length === 0 ? styles.disabledButton : {},
                ]}
                onPress={handleSubmit}
                disabled={text.length === 0}
            >
                <Text style={styles.submitButtonText}>
                    {isFinished || noLimit ? 'Complete Entry' : 'Finish Early'}
                </Text>
            </TouchableOpacity>
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
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
    },
    timerContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    timerWrapper: {
        width: TIMER_SIZE,
        height: TIMER_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerSvg: {
        position: 'absolute',
        transform: [{ rotate: '-90deg' }],
    },
    timerTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        ...theme.typography.h2,
        fontSize: 24,
        fontWeight: '700',
    },
    promptCard: {
        backgroundColor: theme.colors.white,
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },
    promptText: {
        ...theme.typography.body,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    input: {
        flex: 1,
        ...theme.typography.body,
        fontSize: 18,
        lineHeight: 28,
        color: theme.colors.text,
    },
    inputFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: 12,
    },
    charCount: {
        ...theme.typography.caption,
        color: theme.colors.textMuted,
    },
    timeUpBadge: {
        backgroundColor: theme.colors.error + '20',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    timeUpText: {
        ...theme.typography.caption,
        color: theme.colors.error,
        fontWeight: '700',
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        margin: 20,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    disabledButton: {
        backgroundColor: theme.colors.border,
        opacity: 0.6,
    },
    submitButtonText: {
        ...theme.typography.h3,
        color: theme.colors.white,
    },
});

export default WritingScreen;
