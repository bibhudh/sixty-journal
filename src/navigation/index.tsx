import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Clock, BarChart2, Settings as SettingsIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    SplashScreen,
    OnboardingScreen,
    LoginScreen,
    SignUpScreen,
    HomeScreen,
    HistoryScreen,
    AllEntriesScreen,
    StatsScreen,
    SettingsScreen,
    MoodCheckScreen,
    WritingScreen,
    CompletionScreen,
    EntryDetailScreen,
    EntryEditorScreen,
} from '../screens';

import { theme } from '../theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            id="tab-navigator"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textMuted,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.border,
                    backgroundColor: theme.colors.white,
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom + 8,
                    paddingTop: 8,
                },
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'HomeTab') return <Home size={size} color={color} />;
                    if (route.name === 'History') return <Clock size={size} color={color} />;
                    if (route.name === 'Stats') return <BarChart2 size={size} color={color} />;
                    if (route.name === 'Settings') return <SettingsIcon size={size} color={color} />;
                    return null;
                },
            })}
        >
            <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Stats" component={StatsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                id="root-stack"
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Home" component={TabNavigator} />
                <Stack.Screen name="PreMoodCheck" component={MoodCheckScreen} />
                <Stack.Screen name="Writing" component={WritingScreen} />
                <Stack.Screen name="PostMoodCheck" component={MoodCheckScreen} initialParams={{ type: 'post' }} />
                <Stack.Screen name="Completion" component={CompletionScreen} />
                <Stack.Screen name="EntryDetail" component={EntryDetailScreen} />
                <Stack.Screen name="EntryEditor" component={EntryEditorScreen} />
                <Stack.Screen name="AllEntries" component={AllEntriesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
