import {useTheme} from "@/contexts/ThemeContext";
import {StatusBar} from "react-native";

import {useEffect, useState} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useAuth} from "./contexts/AuthContext";
import "./global.css";
import RootNavigator from "./navigation/navigators/RootNavigator";
import Providers from "./providers/Provider";
import SplashScreen from "./screens/auth/SplashScreen";

function AppContent() {
  const {statusBarStyle, theme} = useTheme();
  const {isLoading, isAuthenticated} = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1200); // 1.2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        translucent={false}
        backgroundColor={theme.bg}
      />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Providers>
        <AppContent />
      </Providers>
    </GestureHandlerRootView>
  );
}
