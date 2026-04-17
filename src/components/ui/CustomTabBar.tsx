import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

export type TabRouteName = 'Home' | 'Notifications' | 'Jobs' | 'Profile';

export interface CustomTabBarProps {
  /** A aba que está ativa no momento */
  activeRoute: TabRouteName;
  /** Função de callback chamada quando uma aba é clicada */
  onTabPress: (route: TabRouteName) => void;
  /** Número a ser exibido no badge da aba de Notificações. Se 0 ou nulo, o badge é ocultado. */
  notificationsCount?: number;
  /** Cor do ícone e do texto quando a aba está ativa */
  activeColor?: string;
  /** Cor do ícone e do texto quando a aba está inativa */
  inactiveColor?: string;
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  activeRoute,
  onTabPress,
  notificationsCount = 0,
  activeColor = COLORS.primary,
  inactiveColor = '#787878',
}) => {
  const insets = useSafeAreaInsets();

  type IconName = keyof typeof Ionicons.glyphMap;

  const tabs: Array<{
    name: TabRouteName;
    label: string;
    iconActive: IconName;
    iconInactive: IconName;
    badge?: number;
  }> = [
    {
      name: 'Home',
      label: 'Home',
      iconActive: 'home',
      iconInactive: 'home-outline',
    },
    {
      name: 'Notifications',
      label: 'Notificações',
      iconActive: 'notifications',
      iconInactive: 'notifications-outline',
      badge: notificationsCount,
    },
    {
      name: 'Jobs',
      label: 'Vagas',
      iconActive: 'briefcase',
      iconInactive: 'briefcase-outline',
    },
    {
      name: 'Profile',
      label: 'Perfil',
      iconActive: 'person',
      iconInactive: 'person-outline',
    },
  ];

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {tabs.map((tab) => {
        const isActive = activeRoute === tab.name;
        const color = isActive ? activeColor : inactiveColor;
        const tabBadge = tab.badge;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabPress(tab.name)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={isActive ? { selected: true } : {}}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={isActive ? tab.iconActive : tab.iconInactive}
                size={26}
                color={color}
              />
              {!!tabBadge && tabBadge > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText} numberOfLines={1}>
                    {tabBadge > 99 ? '99+' : tabBadge}
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
