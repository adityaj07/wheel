import {COLORS} from "@/theme/colors";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {StatusBarStyle, useColorScheme} from "react-native";

interface ThemeContextType {
  isDark: boolean;
  theme: typeof COLORS.lightTheme;
  toggleTheme: () => void;
  statusBarStyle: StatusBarStyle;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = isDark ? COLORS.darkTheme : COLORS.lightTheme;
  const statusBarStyle: StatusBarStyle = isDark
    ? "light-content"
    : "dark-content";

  return (
    <ThemeContext.Provider value={{isDark, theme, toggleTheme, statusBarStyle}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
