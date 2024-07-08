import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { TransitionSpecs } from "@react-navigation/stack";
import {
  OnboardingScreen,
  ExpoStatusBar,
  MyTabs,
  AuthScreen,
  LoginScreen,
  SignUpScreen,
  OtpScreen,
  SignUpSuccess,
} from "./index";
import { Platform, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLocationContext } from "../services/user/UserLocationContext";
import Loader from "../components/Loader";
import { View } from "react-native-animatable";

const ios = Platform.OS === "ios";

const Stack = createNativeStackNavigator();

const ScreenOptions = {
  headerShown: false,
  ...(ios
    ? TransitionPresets.SlideFromRightIOS
    : TransitionPresets.FadeFromBottomAndroid),
};

const AppNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [initialRoute, setInitialRoute] = useState(null);
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkInitialRoute = async () => {
      const onboardingCompleted = await AsyncStorage.getItem(
        "onboardingCompleted"
      );
      const token = await AsyncStorage.getItem("userToken");
      if (onboardingCompleted) {
        console.log(onboardingCompleted);
        if (token) {
          setInitialRoute("Tabs");
        } else {
        setInitialRoute("Auth");
        }
      } else {
        setInitialRoute("Onboarding");
      }
    };

    checkInitialRoute();
  }, []);
  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    setInitialRoute("Auth");
  };

  const handleLogin = async (token) => {
    console.log(token);
    await AsyncStorage.setItem("userToken", token);
    setInitialRoute("Tabs");
  };
  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Tabs" options={ScreenOptions} component={MyTabs} />
        <Stack.Screen name="Onboarding" options={ScreenOptions}>
          {(props) => (
            <OnboardingScreen {...props} onLoad={handleOnboardingComplete} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Auth"
          options={ScreenOptions}
          component={AuthScreen}
        />
        <Stack.Screen name="Login" options={ScreenOptions}>
          {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen
          name="SignUp"
          options={ScreenOptions}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="otp"
          options={ScreenOptions}
          component={OtpScreen}
        />
        <Stack.Screen
          name="SignUpSuccess"
          options={ScreenOptions}
          component={SignUpSuccess}
        />
      </Stack.Navigator>
      <ExpoStatusBar style="auto" />
    </NavigationContainer>
  );
};

export default AppNavigation;
