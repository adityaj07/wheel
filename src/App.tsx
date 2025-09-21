import {ThemeProvider, useTheme} from "@/contexts/ThemeContext";
import {StatusBar} from "react-native";
import {Toaster} from "sonner-native";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {AuthProvider} from "./contexts/AuthContext";
import "./global.css";
import RootNavigator from "./navigation/navigators/RootNavigator";

function AppContent() {
  const {statusBarStyle, theme} = useTheme();

  console.log("here => ", process.env.API_BASE_URL);

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
      <ThemeProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <AppContent />
            <Toaster />
          </AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
