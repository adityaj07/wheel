import React, {useEffect, useRef} from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

interface OtpInputProps {
  value: string[];
  onChange: (otp: string[]) => void;
  length?: number;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>(new Array(length).fill(null));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === "") {
      const newOtp = [...value];
      newOtp[index] = text;
      onChange(newOtp);

      if (text && index < length - 1) inputRefs.current[index + 1]?.focus();
      else if (!text && index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      if (value[index] === "" && index > 0) {
        // Move the focus to prev box without changing the current state yet
        inputRefs.current[index - 1]?.focus();
      } else {
        // clear current box
        const newValue = [...value];
        newValue[index] = "";
        onChange(newValue);
      }
    }
  };

  return (
    <View className="flex-row justify-between w-full max-w-xs">
      {value.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputRefs.current[index] = ref;
          }}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          maxLength={1}
          keyboardType="number-pad"
          className="w-12 h-14 bg-gray-50 border border-gray-300 rounded-xl text-center text-lg font-semibold shadow-sm"
          placeholder="-"
          placeholderTextColor="#c4c4c4"
          textContentType="oneTimeCode" // iOS autofill
          autoComplete="sms-otp" // Android autofill
        />
      ))}
    </View>
  );
};
