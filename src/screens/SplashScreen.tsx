import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EstaffLogoAzul from '../../assets/figma/image/estaff-logo-azul.svg';
import * as SplashScreenNative from 'expo-splash-screen';

interface CustomSplashScreenProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

export const CustomSplashScreen: React.FC<CustomSplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Esconde a splash screen nativa o mais rápido possível
    SplashScreenNative.hideAsync().catch(() => {});

    // Exibe a splash customizada por 2.5 segundos, depois faz um fade out
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['#ffffff', '#f0f4ff', '#e0ebff']}
        style={styles.gradient}
      >
        {/* Main Logo (center) */}
        <View style={styles.centerContainer}>
          <Image 
            source={require('../../assets/image.png')} 
            style={styles.mainLogo}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Logo */}
        <View style={styles.bottomContainer}>
          <EstaffLogoAzul width={160} height={60} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999, // Fica sobre tudo
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLogo: {
    width: 200,
    height: 200,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
