// import {useTheme} from "@/contexts/ThemeContext";
// import React, {useState} from "react";
// import {Dimensions, Text, View} from "react-native";
// import {Gesture, GestureDetector} from "react-native-gesture-handler";
// import Animated, {
//   runOnJS,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
// } from "react-native-reanimated";
// import Icon from "../common/Icon";

// interface SwipeToPayButtonProps {
//   onConfirm: () => void;
//   amount: string;
//   loading: boolean;
// }

// const SwipeToPayButton: React.FC<SwipeToPayButtonProps> = ({
//   onConfirm,
//   amount,
//   loading,
// }) => {
//   const {theme} = useTheme();
//   const [confirmed, setConfirmed] = useState(false);
//   const translateX = useSharedValue(0);
//   const buttonWidth = Dimensions.get("window").width - 32;
//   const buttonHeight = 60;
//   const swipeThreshold = buttonWidth - buttonHeight - 16;

//   const handleConfirm = () => {
//     setConfirmed(true);
//     onConfirm();
//   };

//   const panGesture = Gesture.Pan()
//     .onUpdate(e => {
//       if (e.translationX < 0) return;
//       translateX.value = e.translationX;
//     })
//     .onEnd(e => {
//       if (e.translationX >= swipeThreshold) {
//         translateX.value = withSpring(buttonWidth - buttonHeight - 8);
//         runOnJS(handleConfirm)(); // Call non-worklet function via runOnJS
//       } else {
//         translateX.value = withTiming(0);
//       }
//     });

//   const thumbStyle = useAnimatedStyle(() => ({
//     transform: [{translateX: translateX.value}],
//   }));

//   const fillStyle = useAnimatedStyle(() => ({
//     width: translateX.value + buttonHeight,
//     backgroundColor: theme.primary,
//   }));

//   return (
//     <GestureDetector gesture={panGesture}>
//       <View
//         style={{
//           width: buttonWidth,
//           height: buttonHeight,
//           borderRadius: 30,
//           backgroundColor: theme.surface,
//           overflow: "hidden",
//           justifyContent: "center",
//           shadowColor: "#000",
//           shadowOffset: {width: 0, height: 6},
//           shadowOpacity: 0.15,
//           shadowRadius: 10,
//           elevation: 6,
//         }}>
//         {/* Fill Layer */}
//         <Animated.View
//           style={[
//             {
//               height: buttonHeight,
//               position: "absolute",
//               left: 0,
//               borderRadius: 30,
//               zIndex: 1,
//             },
//             fillStyle,
//           ]}
//         />
//         {/* Amount & Swipe Text */}
//         <View
//           style={{
//             flex: 1,
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//             position: "absolute",
//             left: 72,
//             right: 16,
//             zIndex: 3,
//           }}>
//           {/* Amount */}
//           <Text
//             style={{
//               fontWeight: "800",
//               fontSize: 18,
//               color: theme.text,
//             }}>
//             {amount}
//           </Text>
//           {/* Swipe Label */}
//           <Text
//             style={{
//               fontWeight: "600",
//               fontSize: 16,
//               color: theme.text,
//             }}>
//             {loading ? "Processing..." : "Swipe to Pay"}
//           </Text>
//         </View>
//         {/* Swipe Thumb */}
//         <Animated.View
//           style={[
//             thumbStyle,
//             {
//               width: buttonHeight,
//               height: buttonHeight,
//               borderRadius: 30,
//               backgroundColor: theme.primary,
//               justifyContent: "center",
//               alignItems: "center",
//               position: "absolute",
//               left: 0,
//               zIndex: 4,
//             },
//           ]}>
//           <Icon
//             type="ion"
//             name={confirmed ? "checkmark-circle" : "arrow-forward"}
//             size={24}
//             color={theme.text}
//           />
//         </Animated.View>
//       </View>
//     </GestureDetector>
//   );
// };

// export default SwipeToPayButton;
