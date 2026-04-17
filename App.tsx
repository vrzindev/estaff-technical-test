import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/theme';
import { useState, useEffect } from 'react';
import { CustomSplashScreen } from './src/screens/SplashScreen';
import * as SplashScreen from 'expo-splash-screen';
import { ErrorBoundary } from './src/components/ui/ErrorBoundary';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <View style={styles.container}>
          {isAppReady ? <AppNavigator /> : <CustomSplashScreen onFinish={() => setIsAppReady(true)} />}
          <StatusBar style="auto" />
        </View>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
