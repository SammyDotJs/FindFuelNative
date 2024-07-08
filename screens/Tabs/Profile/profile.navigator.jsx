import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import {
  ProfileScreen,
  PersonalInformation,
  Wallet,
} from "../../index";
import { Platform } from "react-native";
import SupportNavigator from "./components/Support/support.navigator";

const ios = Platform.OS === "ios";

const ProfileStack = createStackNavigator();

const ScreenOptions = {
  headerShown: false,
  ...(ios
    ? TransitionPresets.SlideFromRightIOS
    : TransitionPresets.FadeFromBottomAndroid),
};
export default function ProfileNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={ScreenOptions}
      initialRouteName="ProfileScreen"
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen
        name="PersonalInfo"
        component={PersonalInformation}
      />
      <ProfileStack.Screen name="Wallet" component={Wallet} />
      <ProfileStack.Screen name="Support" component={SupportNavigator} />
    </ProfileStack.Navigator>
  );
}
