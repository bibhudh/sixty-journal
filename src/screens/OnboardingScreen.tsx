import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Animated,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Timer, Lock, Sparkles, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const SLIDES = [
    {
        id: '1',
        title: 'Why Journal?',
        description: 'Journaling helps reduce stress, increase clarity, and process emotions in just 60 seconds.',
        icon: Sparkles,
        color: theme.colors.mood.calm,
    },
    {
        id: '2',
        title: 'One Prompt, 60 Seconds',
        description: 'A daily prompt helps you reflect and build a consistent journaling habit.',
        icon: Timer,
        color: theme.colors.mood.happy,
    },
    {
        id: '3',
        title: 'Your Privacy is Sacred',
        description: 'All entries are encrypted and private. Only you can see your thoughts.',
        icon: Lock,
        color: theme.colors.primary,
    },
];

const OnboardingScreen = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const slidesRef = React.useRef<FlatList>(null);
    const { width } = useWindowDimensions();
    const navigation = useNavigation<any>();

    const viewableItemsChanged = React.useRef(({ viewableItems }: any) => {
        if (viewableItems[0]) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = React.useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = () => {
        if (currentIndex < SLIDES.length - 1) {
            slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.navigate('Login');
        }
    };

    const SlideItem = ({ item }: { item: typeof SLIDES[0] }) => {
        const Icon = item.icon;
        return (
            <View style={[styles.slideContainer, { width }]}>
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                    <Icon size={120} color={item.color} strokeWidth={1.5} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
        );
    };

    const Paginator = () => {
        return (
            <View style={styles.paginatorContainer}>
                {SLIDES.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10],
                        extrapolate: 'clamp',
                    });
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={i.toString()}
                            style={[styles.dot, { width: dotWidth, opacity, backgroundColor: theme.colors.primary }]}
                        />
                    );
                })}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={SLIDES}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
            />
            <View style={styles.footer}>
                <Paginator />
                <TouchableOpacity style={styles.button} onPress={scrollTo} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>
                        {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                    <ChevronRight size={20} color={theme.colors.white} />
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
    slideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    iconContainer: {
        width: 240,
        height: 240,
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        ...theme.typography.h1,
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        ...theme.typography.body,
        textAlign: 'center',
        color: theme.colors.textMuted,
        lineHeight: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingBottom: 40,
    },
    paginatorContainer: {
        flexDirection: 'row',
        height: 64,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        marginTop: 27,
    },
    button: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        gap: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    buttonText: {
        ...theme.typography.h3,
        fontSize: 16,
        color: theme.colors.white,
    },
});

export default OnboardingScreen;
