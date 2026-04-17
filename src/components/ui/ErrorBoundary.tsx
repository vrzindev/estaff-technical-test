import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { COLORS, SPACING } from '../../constants/theme';
import { Button } from './Button';
import { Logger } from '../../services/loggerService';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Logger.error('ErrorBoundary', error);
    Logger.error('ErrorBoundary Info', errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Typography variant="title" style={styles.title}>Ops, algo deu errado!</Typography>
          <Typography variant="body" color={COLORS.textSecondary} style={styles.message}>
            Ocorreu um erro inesperado no aplicativo. Nossa equipe já foi notificada.
          </Typography>
          <Button 
            title="Tentar Novamente" 
            onPress={() => this.setState({ hasError: false })} 
          />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
  },
  title: {
    marginBottom: SPACING.md,
  },
  message: {
    textAlign: 'center',
    marginBottom: SPACING.xl,
  }
});
