import Icon from "@/components/common/Icon";
import {useAuth} from "@/contexts/AuthContext";
import {useTheme} from "@/contexts/ThemeContext";
import {AuthStackParamList} from "@/navigation/navigators/AuthStackNavigator";

import {SignUpSchema, SignUpSchemaType} from "@/schemas/auth";
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

type SignupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const {theme} = useTheme();
  const {signup, isLoading} = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async ({
    name,
    email,
    password,
    confirmPassword,
  }: SignUpSchemaType) => {
    try {
      await signup({
        name,
        email,
        password,
        confirmPassword,
      });
      // on success, AuthProvider sets user and navigation switches automatically
      navigation.navigate("Login");
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "Signup failed";
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
        contentContainerClassName="flex-grow justify-center px-6"
        keyboardShouldPersistTaps="handled">
        <Text
          className="text-center text-[28px] font-bold mb-1.5"
          style={{color: theme.text}}>
          Create Account
        </Text>
        <Text
          className="text-center text-[15px] mb-7"
          style={{color: theme.subText}}>
          Rent Your Wheels by creating an account
        </Text>

        {/* Name */}
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, value}}) => {
            const hasError = !!errors.name;
            return (
              <>
                <TextInput
                  className="px-4 py-3.5 rounded-xl mb-2 text-[15px]"
                  style={{
                    backgroundColor: theme.card,
                    color: theme.text,
                    ...(hasError && {borderWidth: 1, borderColor: "red"}),
                    ...theme.shadow,
                  }}
                  placeholder="Full Name"
                  placeholderTextColor={theme.placeholder}
                  value={value}
                  onChangeText={onChange}
                />
                {hasError && (
                  <Text className="text-sm text-red-500 mb-2">
                    {errors.name?.message}
                  </Text>
                )}
              </>
            );
          }}
        />

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({field: {value, onChange}}) => {
            const hasError = !!errors.email;
            return (
              <>
                <TextInput
                  className="px-4 py-3.5 rounded-xl mb-2 text-[15px]"
                  style={{
                    backgroundColor: theme.card,
                    color: theme.text,
                    ...(hasError && {borderWidth: 1, borderColor: "red"}),
                    ...theme.shadow,
                  }}
                  placeholder="Email"
                  placeholderTextColor={theme.placeholder}
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                />
                {hasError && (
                  <Text className="text-sm text-red-500 mb-2">
                    {errors.email?.message}
                  </Text>
                )}
              </>
            );
          }}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({field: {value, onChange}}) => {
            const hasError = !!errors.password;
            return (
              <>
                <View className="relative mb-2">
                  <TextInput
                    className="px-4 py-3.5 rounded-xl text-[15px] pr-12"
                    style={{
                      backgroundColor: theme.card,
                      color: theme.text,
                      ...(hasError && {borderWidth: 1, borderColor: "red"}),
                      ...theme.shadow,
                    }}
                    placeholder="Password"
                    placeholderTextColor={theme.placeholder}
                    secureTextEntry={!showPassword}
                    value={value}
                    onChangeText={onChange}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon
                      type="ion"
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color={theme.subText}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-sm text-red-500 mb-2">
                    {errors.password?.message}
                  </Text>
                )}
              </>
            );
          }}
        />

        {/* Confirm Password */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({field: {value, onChange}}) => {
            const hasError = !!errors.confirmPassword;
            return (
              <>
                <View className="relative mb-2">
                  <TextInput
                    className="px-4 py-3.5 rounded-xl text-[15px] pr-12"
                    style={{
                      backgroundColor: theme.card,
                      color: theme.text,
                      ...(hasError && {borderWidth: 1, borderColor: "red"}),
                      ...theme.shadow,
                    }}
                    placeholder="Confirm Password"
                    placeholderTextColor={theme.placeholder}
                    secureTextEntry={!showConfirmPassword}
                    value={value}
                    onChangeText={onChange}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon
                      type="ion"
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={22}
                      color={theme.subText}
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text className="text-sm text-red-500 mb-2">
                    {errors.confirmPassword?.message}
                  </Text>
                )}
              </>
            );
          }}
        />

        {/* Signup Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="py-4 rounded-2xl mt-2 items-center"
          style={{backgroundColor: theme.primary, ...theme.shadow}}
          disabled={isLoading}>
          <Text className="text-white text-[15px] font-semibold">
            {isLoading ? "Signing you up..." : "Sign up"}
          </Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text
          className="text-xs text-center mt-4 leading-5"
          style={{color: theme.subText}}>
          By signing up, you agree to our{" "}
          <Text style={{color: theme.primary, fontWeight: "500"}}>
            Terms & Conditions
          </Text>{" "}
          and{" "}
          <Text style={{color: theme.primary, fontWeight: "500"}}>
            Privacy Policy
          </Text>
          .
        </Text>

        {/* Login Link */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="mt-6 items-center">
          <Text className="text-sm" style={{color: theme.subText}}>
            Already have an account?{" "}
            <Text style={{color: theme.primary, fontWeight: "600"}}>
              Log In
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;
