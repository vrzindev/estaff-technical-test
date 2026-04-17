import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../components/ui/Typography';
import { Avatar } from '../components/ui/Avatar';
import { MetricsCard } from '../components/ui/MetricsCard';
import { ListItem } from '../components/ui/ListItem';
import { COLORS, SPACING } from '../constants/theme';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Basic type for profile stack routes
export type ProfileStackParamList = {
  Profile: undefined;
  ProfessionalInfo: undefined;
};

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Utiliza useFocusEffect para garantir que o handler de hardwareBackPress
  // só seja ativado quando o usuário estiver especificamente na raiz da aba Perfil.
  // Isso prioriza a navegação nas subtelas (onde este effect não estará ativo)
  // e bloqueia a saída da aba apenas quando não houver mais histórico na stack.
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Retornar 'true' informa ao React Native que o evento foi tratado.
        // O usuário ficará preso na tela "Perfil", impedindo o fechamento do app ou a troca de aba.
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => backHandler.remove();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Profile Info */}
        <View style={styles.headerInfo}>
          <Avatar 
            source={require('../../assets/figma/image/screenshot_1_1356.png')} 
            size={97} 
          />
          <Typography variant="title" style={styles.name}>Daniela Gois</Typography>
          <Typography variant="body" style={styles.role}>Garçom/Garçonete</Typography>
        </View>

        {/* Metrics Row */}
        <View style={styles.metricsWrapper}>
          <View style={styles.metricsLine} />
          <View style={styles.metricsContainer}>
            <MetricsCard 
              iconSource={require('../../assets/figma/image/screenshot_I1_1361;374_251;10_846.png')} 
              title="Avaliação" 
              value="4.75" 
            />
            <MetricsCard 
              iconSource={require('../../assets/figma/image/screenshot_I1_1361;374_251;10_846.png')} 
              title="Função principal" 
              value="Garçom" 
            />
            <MetricsCard 
              iconSource={require('../../assets/figma/image/screenshot_I1_1361;374_251;10_846.png')} 
              title="Conquistas" 
              value="Em breve" 
            />
          </View>
        </View>

        {/* List Section */}
        <View style={styles.listContainer}>
          <ListItem 
            title="Informações pessoais" 
            subtitle="Exibido apenas para você" 
            onPress={() => {}} 
          />
          <ListItem 
            title="Informações profissionais" 
            subtitle="Visível para os estabelecimentos" 
            onPress={() => navigation.navigate('ProfessionalInfo')} 
          />
          <ListItem 
            title="Outros" 
            subtitle="Visível para os estabelecimentos" 
            onPress={() => {}} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flexGrow: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  headerInfo: {
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  name: {
    fontSize: 20,
    marginTop: SPACING.md,
    color: COLORS.textMain,
  },
  role: {
    fontSize: 14,
    color: COLORS.textPlaceholder,
    marginTop: 4,
  },
  metricsWrapper: {
    position: 'relative',
    marginBottom: SPACING.xl,
  },
  metricsLine: {
    position: 'absolute',
    top: '50%',
    left: -SPACING.md, // Extends past the padding to touch the edges
    right: -SPACING.md,
    height: 1,
    backgroundColor: '#bababa',
    zIndex: 0,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    zIndex: 1,
  },
  listContainer: {
    flex: 1,
  },
});
