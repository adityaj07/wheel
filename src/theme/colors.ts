export const COLORS = {
  // Brand / Primary palette
  primary: "#FACC15",
  primaryDark: "#EAB308",
  secondary: "#2563EB",
  accent: "#F97316",

  // Backgrounds & Surfaces
  background: "#FAFAF9",
  surface: "#FFFFFF",
  surfaceMuted: "#F4F4F5",
  border: "#E5E7EB",

  // Text colors
  text: "#1F2937",
  textSecondary: "#6B7280",
  onPrimary: "#FFFFFF",

  // System / Utility
  success: "#22C55E",
  error: "#EF4444",
  warning: "#F59E0B",

  // Light Theme
  lightTheme: {
    bg: "#FAFAF9",
    card: "#FFFFFF",
    text: "#111827",
    subText: "#6B7280",
    placeholder: "#9CA3AF",
    primary: "#FACC15",
    primaryDark: "#EAB308", // add this
    onPrimary: "#111827", // or "#fff" depending on contrast
    error: "#EF4444", // add error color
    border: "#D1D5DB",
    shadow: {
      shadowColor: "#000",
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
  },

  // Dark Theme
  darkTheme: {
    bg: "#0F0F0F",
    card: "#1C1C1C",
    text: "#F5F5F5",
    subText: "#9CA3AF",
    placeholder: "#6B7280",
    primary: "#EAB308",
    primaryDark: "#FACC15", // optional, for gradient buttons
    onPrimary: "#0F0F0F", // contrast text for primary bg
    error: "#EF4444",
    border: "#2C2C2C",
    shadow: {
      shadowColor: "#000",
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 2,
    },
  },
};
