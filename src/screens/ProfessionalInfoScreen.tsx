import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ListItem } from '../components/ui/ListItem';
import { COLORS, SPACING } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DadosIcon, ExperienciaIcon, IdiomasIcon } from '../components/ui/SVGIcons';

// Add DataAndSkills route to the same stack to navigate
export type InfoStackParamList = {
  ProfessionalInfo: undefined;
  DataAndSkills: undefined;
};

type NavigationProp = NativeStackNavigationProp<InfoStackParamList, 'ProfessionalInfo'>;

export const ProfessionalInfoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ListItem 
          title="Dados e competências" 
          subtitle="Edite sua bio e habilidades profissionais" 
          LeftSvgIcon={DadosIcon}
          onPress={() => navigation.navigate('DataAndSkills')} 
        />
        <ListItem 
          title="Experiências prévias e formação" 
          subtitle="Acrescente experiências anteriores" 
          LeftSvgIcon={ExperienciaIcon}
          onPress={() => {}} 
        />
        <ListItem 
          title="Idiomas" 
          subtitle="Acrescente idiomas ao seu perfil" 
          LeftSvgIcon={IdiomasIcon}
          onPress={() => {}} 
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
  },
});
