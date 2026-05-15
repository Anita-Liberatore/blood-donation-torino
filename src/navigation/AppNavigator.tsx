import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { DocumentsScreen } from '../screens/DocumentsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Colors } from '../theme/colors';
import { RootTabParamList } from '../types';

const Tab = createBottomTabNavigator<RootTabParamList>();

type IoniconName = keyof typeof Ionicons.glyphMap;

const tabIcons: Record<keyof RootTabParamList, { active: IoniconName; inactive: IoniconName }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Prenota: { active: 'calendar', inactive: 'calendar-outline' },
  Documenti: { active: 'document-text', inactive: 'document-text-outline' },
  Profilo: { active: 'person', inactive: 'person-outline' },
};

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.tabBarActive,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = tabIcons[route.name as keyof RootTabParamList];
          const iconName = focused ? icons.active : icons.inactive;
          return (
            <View style={[styles.tabIconWrap, focused && styles.tabIconActive]}>
              <Ionicons name={iconName} size={22} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Prenota" component={BookingScreen} options={{ tabBarLabel: 'Prenota' }} />
      <Tab.Screen name="Documenti" component={DocumentsScreen} options={{ tabBarLabel: 'Documenti' }} />
      <Tab.Screen name="Profilo" component={ProfileScreen} options={{ tabBarLabel: 'Profilo' }} />
    </Tab.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    height: 80,
    paddingBottom: 16,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 10,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabIconWrap: {
    width: 40,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    backgroundColor: Colors.primarySoft,
  },
});
