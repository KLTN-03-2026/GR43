import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MainScreen } from '../../features/main/screens/MainScreen';
import { MatchesScreen } from '../../features/main/screens/MatchesScreen';
import { NotificationsMainScreen } from '../../features/main/screens/NotificationsMainScreen';
import { MessagesScreen } from '../../features/main/screens/MessagesScreen';
import { ProfileMainScreen } from '../../features/main/screens/ProfileMainScreen';

export type MainTabParamList = {
  Main: undefined;
  Matches: undefined;
  Messages: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  Main: 'albums',
  Matches: 'heart-outline',
  Messages: 'chatbubble-ellipses-outline',
  Notifications: 'notifications-outline',
  Profile: 'person-outline',
};

const LABELS: Record<keyof MainTabParamList, string> = {
  Main: 'Cards',
  Matches: 'Matches',
  Messages: 'Messages',
  Notifications: 'Notifications',
  Profile: 'Profile',
};

export const MainBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabButton,
        tabBarLabel: ({ focused }) => {
          const routeName = route.name as keyof MainTabParamList;

          return (
            <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
              {LABELS[routeName]}
            </Text>
          );
        },
        tabBarIcon: ({ focused }) => {
          const routeName = route.name as keyof MainTabParamList;
          const iconColor = focused ? '#EE3F57' : '#ADAFBB';

          return (
            <View style={styles.tabInner}>
              <View style={[styles.topLine, focused && styles.topLineActive]} />
              <Ionicons name={ICONS[routeName]} size={22} color={iconColor} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Notifications" component={NotificationsMainScreen} />
      <Tab.Screen name="Profile" component={ProfileMainScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 0,
    elevation: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabInner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  topLine: {
    width: '100%',
    height: 3,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  topLineActive: {
    backgroundColor: '#EE3F57',
  },
  tabLabel: {
    marginTop: 2,
    fontSize: 11,
    color: '#ADAFBB',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#EE3F57',
    fontWeight: '700',
  },
});
