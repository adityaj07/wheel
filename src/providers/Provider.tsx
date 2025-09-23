import {AuthProvider} from "@/contexts/AuthContext";
import {BookingsProvider} from "@/contexts/BookingsContext";
import {ThemeProvider} from "@/contexts/ThemeContext";
import {SafeAreaProvider} from "react-native-safe-area-context";

const Providers: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <BookingsProvider>{children}</BookingsProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default Providers;
