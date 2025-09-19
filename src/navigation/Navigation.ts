import {RootStackParamList} from '@/routes/types';
import Logger from '@/utils/Logger';
import {
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import React from 'react';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function parseAndLogRoute(state: NavigationState | undefined) {
  if (!state) return;

  const {routes, index} = state;
  const currentRoute = routes[index];
  Logger.info('Current route: ', {
    name: currentRoute?.name,
    params: currentRoute?.params,
  });
}

export function setIsnavigationReady() {
  Logger.info('Navigation is ready.');
}

// Some Notes:
/**
 * navigationRef:
 * ------------------
 * - A reference to the NavigationContainer.
 * - Allows navigation to be triggered outside of React components.
 * - Useful when you want to navigate from:
 *    • Redux middleware
 *    • Context providers
 *    • Services (e.g., push notifications, API interceptors)
 *    • Error handlers (e.g., redirecting to Login if token expires)
 *
 * Example usage (anywhere in your app):
 *   navigationRef.current?.navigate("Home");
 */

// ------------------

/**
 * parseAndLogRoute:
 * ------------------
 * - Reads the current active route from the navigation state.
 * - Logs route name + params using the Logger utility.
 * - Why it’s important:
 *    • Debugging: see where the user currently is.
 *    • Analytics: track screen views for Mixpanel/Firebase/etc.
 *    • Error tracing: correlate crashes/logs with the active screen.
 *
 * Typically called from NavigationContainer's onStateChange:
 *   <NavigationContainer
 *      ref={navigationRef}
 *      onStateChange={parseAndLogRoute}
 *   >
 */

// -------------------

/**
 * setIsnavigationReady:
 * ----------------------
 * - Called when NavigationContainer has mounted and is ready.
 * - Currently just logs "Navigation is ready".
 * - In production apps, this is commonly used to:
 *    • Trigger deep linking setup.
 *    • Mark navigation as ready for background services.
 *    • Start analytics tracking.
 *    • Initialize features that depend on navigation.
 *
 * Typically called from NavigationContainer's onReady:
 *   <NavigationContainer
 *      ref={navigationRef}
 *      onReady={setIsnavigationReady}
 *   >
 */
