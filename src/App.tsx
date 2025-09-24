import {useTheme} from "@/contexts/ThemeContext";
import {StatusBar} from "react-native";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useAuth} from "./contexts/AuthContext";
import "./global.css";
import RootNavigator from "./navigation/navigators/RootNavigator";
import Providers from "./providers/Provider";
import SplashScreen from "./screens/auth/SplashScreen";

function AppContent() {
  const {statusBarStyle, theme} = useTheme();
  const {isLoading} = useAuth();

  if (isLoading) {
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
