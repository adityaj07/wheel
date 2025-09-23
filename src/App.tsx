import {useTheme} from "@/contexts/ThemeContext";
import {StatusBar} from "react-native";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import "./global.css";
import RootNavigator from "./navigation/navigators/RootNavigator";
import Providers from "./providers/Provider";

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
    <GestureHandlerRootView style={{flex: 1}}>
      <Providers>
        <AppContent />
      </Providers>
    </GestureHandlerRootView>
  );
}
