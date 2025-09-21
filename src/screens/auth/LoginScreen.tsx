import Icon from "@/components/common/Icon";
import {useAuth} from "@/contexts/AuthContext";
import {useTheme} from "@/contexts/ThemeContext";
import {AuthStackParamList} from "@/navigation/navigators/AuthStackNavigator";
import {LoginSchema, LoginSchemaType} from "@/schemas/auth/index";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {toast} from "sonner-native";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {theme} = useTheme();
  const {login, isLoading} = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async ({email, password}: LoginSchemaType) => {
    try {
      await login({email, password});
      // on success, AuthProvider sets user and navigation switches automatically
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "Login failed";
      const description = error?.response?.data?.details?.[0]?.message;

      toast.error(message, {
        ...(description && {description}),
        style: {
          backgroundColor: "red",
        },
      });
    }
  };

  return (
    <View className="flex-1" style={{backgroundColor: theme.bg}}>
      <ScrollView
        className="flex-grow px-6"
        contentContainerClassName="justify-center flex-grow"
        keyboardShouldPersistTaps="handled">
        <Text
          className="text-center text-[28px] font-bold mb-1.5"
          style={{color: theme.text}}>
          Welcome back!
        </Text>
        <Text
          className="text-center text-[15px] mb-7"
          style={{color: theme.subText}}>
          Log in to access your account
        </Text>

        <Controller
          control={control}
          name="email"
          render={({field: {value, onChange}}) => {
            const hasError = !!errors.email;
            return (
              <>
                <TextInput
                  className={`rounded-xl px-4 py-3 mb-3 text-[15px] ${
                    hasError ? "border border-red-500" : ""
                  }`}
                  style={{
                    backgroundColor: theme.card,
                    color: theme.text,
                    ...theme.shadow,
                  }}
                  placeholder="Email"
                  placeholderTextColor={theme.placeholder}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                />
                {hasError && (
                  <Text className="text-red-500 text-[13px] mb-2">
                    {errors.email?.message}
                  </Text>
                )}
              </>
            );
          }}
        />

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          render={({field: {value, onChange}}) => {
            const hasError = !!errors.password;
            return (
              <>
                <View className="relative mb-2">
                  <TextInput
                    className={`rounded-xl px-4 py-3 pr-12 text-[15px] ${
                      hasError ? "border border-red-500" : ""
                    }`}
                    style={{
                      backgroundColor: theme.card,
                      color: theme.text,
                      ...theme.shadow,
                    }}
                    placeholder="Password"
                    placeholderTextColor={theme.placeholder}
                    secureTextEntry={!showPassword}
                    value={value}
                    onChangeText={onChange}
                  />
                  <TouchableOpacity
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2"
                    onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      type="ion"
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color={theme.subText}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-[13px] mb-2">
                    {errors.password?.message}
                  </Text>
                )}
              </>
            );
          }}
        />

        {/* Login Button */}
        <TouchableOpacity
          className="py-4 rounded-2xl mt-2 items-center shadow-md"
          style={{backgroundColor: theme.primary}}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}>
          <Text className="text-white text-[16px] font-semibold">
            {isLoading ? "Logging you in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text
          className="text-center text-[12px] mt-4 leading-[18px]"
          style={{color: theme.subText}}>
          By logging in, you agree to our{" "}
          <Text className="font-medium" style={{color: theme.primary}}>
            Terms & Conditions
          </Text>{" "}
          and{" "}
          <Text className="font-medium" style={{color: theme.primary}}>
            Privacy Policy
          </Text>
          .
        </Text>

        {/* Signup Link */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          className="mt-6 items-center">
          <Text className="text-[14px]" style={{color: theme.subText}}>
            New here?{" "}
            <Text className="font-semibold" style={{color: theme.primary}}>
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
