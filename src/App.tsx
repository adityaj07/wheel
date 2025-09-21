import {ThemeProvider, useTheme} from "@/contexts/ThemeContext";
import {StatusBar} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import "./global.css";
import RootNavigator from "./navigation/navigators/RootNavigator";

function AppContent() {
  const {statusBarStyle, theme} = useTheme();

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
    <ThemeProvider>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
