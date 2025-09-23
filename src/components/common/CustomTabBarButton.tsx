import {BottomTabBarButtonProps} from "@react-navigation/bottom-tabs";
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  Platform,
  TargetedEvent,
  TouchableOpacity,
  Vibration,
} from "react-native";
import HapticFeedback, {
  HapticFeedbackTypes,
  HapticOptions,
} from "react-native-haptic-feedback";

let RNHapticFeedback: {
  trigger(
    type?: keyof typeof HapticFeedbackTypes | HapticFeedbackTypes,
    options?: HapticOptions,
  ): void;
} | null = null;
try {
  RNHapticFeedback = HapticFeedback;
} catch (e) {
  RNHapticFeedback = null;
}

const triggerHaptic = (
  type:
    | "selection"
    | "impactLight"
    | "impactMedium"
    | "impactHeavy" = "selection",
) => {
  if (RNHapticFeedback?.trigger) {
    RNHapticFeedback.trigger(type, {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    return;
  }

  // fallback
  if (Platform.OS === "android") {
    Vibration.vibrate(10);
  } else {
    Vibration.vibrate(1);
  }
};

const TabBarButton: React.FC<BottomTabBarButtonProps> = ({
  children,
  onPress,
  onLongPress,
  onBlur,
  onFocus,
  delayLongPress,
  disabled,
  accessibilityState,
  style,
}) => {
  const handlePress = (e: GestureResponderEvent) => {
    triggerHaptic("selection");
    onPress?.(e);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      onLongPress={onLongPress ?? undefined}
      onBlur={
        (onBlur as
          | ((e: NativeSyntheticEvent<TargetedEvent>) => void)
          | undefined) ?? undefined
      }
      onFocus={
        (onFocus as
          | ((e: NativeSyntheticEvent<TargetedEvent>) => void)
          | undefined) ?? undefined
      }
      delayLongPress={delayLongPress ?? undefined}
      disabled={disabled ?? undefined}
      accessibilityState={accessibilityState}
      style={[
        {flex: 1, alignItems: "center", justifyContent: "center"},
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

export default TabBarButton;
