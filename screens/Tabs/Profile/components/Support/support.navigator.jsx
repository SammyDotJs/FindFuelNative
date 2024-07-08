import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Contact, Support, Faq, Chatbot } from "../../../../index";
import { Platform } from "react-native";

const ios = Platform.OS === "ios";

const SupportStack = createStackNavigator();

const ScreenOptions = {
  headerShown: false,
  ...(ios
    ? TransitionPresets.SlideFromRightIOS
    : TransitionPresets.FadeFromBottomAndroid),
};
export default function SupportNavigator() {
  return (
    <SupportStack.Navigator screenOptions={ScreenOptions} initialRouteName="Support">
      <SupportStack.Screen name="SupportScreen" component={Support} />
      <SupportStack.Screen name="Contact" component={Contact} />
      <SupportStack.Screen name="Chatbot" component={Chatbot} />
      <SupportStack.Screen name="FAQ" component={Faq} />
    </SupportStack.Navigator>
  );
}
