export const Logger = {
  error: (context: string, error: unknown) => {
    if (__DEV__) {
      console.error(`[${context}]:`, error);
    } else {
      // Integração futura com Sentry ou Crashlytics
      // Crashlytics.recordError(error);
    }
  },
  info: (context: string, message: string) => {
    if (__DEV__) {
      console.log(`[${context}]:`, message);
    }
  }
};
