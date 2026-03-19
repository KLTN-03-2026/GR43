/**
 * A centralized logger. In production, 'error's should be sent to a service like Sentry.
 */
export const Logger = {
  debug: (...args: any[]) => __DEV__ && console.debug('🐛 [DEBUG]:', ...args),
  info: (...args: any[]) => __DEV__ && console.info('🔵 [INFO]:', ...args),
  warn: (...args: any[]) => __DEV__ && console.warn('🟠 [WARN]:', ...args),
  error: (...args: any[]) => {
    if (__DEV__) {
      console.error('🔴 [ERROR]:', ...args);
    } else {
      // TODO: Report to Sentry/Crashlytics in Production
    }
  },
};
