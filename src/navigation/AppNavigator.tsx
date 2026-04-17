import React, { useState } from 'react';
import { Platform, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CustomTabBar, TabRouteName } from '../components/ui/CustomTabBar';

import { ProfileScreen } from '../screens/ProfileScreen';
import { ProfessionalInfoScreen } from '../screens/ProfessionalInfoScreen';
import { DataAndSkillsScreen } from '../screens/DataAndSkillsScreen';
import { COLORS } from '../constants/theme';

// Para mockar as outras telas da tab -> To mock the other tab screens
const DummyScreen = () => null;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tabs Principais (Root Tabs)
function MainTabs() {
  // Mock first access state (true to block other tabs initially)
  const [isFirstAccess] = useState(true);

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBar={({ navigation, state }) => {
        const routeName = state.routes[state.index].name as TabRouteName;
        return (
          <CustomTabBar
            activeRoute={routeName}
            onTabPress={(route) => {
              if (isFirstAccess && route !== 'Profile') {
                return;
              }
              navigation.navigate(route);
            }}
            notificationsCount={23}
          />
        );
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={DummyScreen} 
      />
      <Tab.Screen 
        name="Notifications" 
        component={DummyScreen} 
      />
      <Tab.Screen 
        name="Jobs" 
        component={DummyScreen} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: true,
          headerTitleStyle: { 
            color: COLORS.textMain, 
            fontSize: 18, 
            fontWeight: '600',
            fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'
          },
          headerTintColor: COLORS.textMain,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          // Garante espaçamento em devices com notch, punch-hole, etc
          headerStyle: { 
            backgroundColor: COLORS.white,
          },
        }}
      >
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProfessionalInfo" 
          component={ProfessionalInfoScreen} 
          options={({ navigation }) => ({ 
            title: 'Informações profissionais',
            headerLeft: () => (
              <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={{ padding: 4, marginLeft: 8 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialCommunityIcons 
                  name="arrow-left" 
                  size={24} 
                  color={COLORS.textMain} 
                />
              </TouchableOpacity>
            )
          })} 
        />
        <Stack.Screen 
          name="DataAndSkills" 
          component={DataAndSkillsScreen} 
          options={({ navigation }) => ({ 
            title: 'Dados e competências',
            headerLeft: () => (
              <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={{ padding: 4, marginLeft: 8 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialCommunityIcons 
                  name="arrow-left" 
                  size={24} 
                  color={COLORS.textMain} 
                />
              </TouchableOpacity>
            )
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
