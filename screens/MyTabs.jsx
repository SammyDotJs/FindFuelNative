import { KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { ScreenOptions } from "./TabScreenOptions";
import HomeScreenNavigator from "./Tabs/Home/homescreen.navigator";
import { HistoryScreen } from "./index";
import NewMapScreen from "./Tabs/Map/NewMapScreen";
import ProfileNavigator from "./Tabs/Profile/profile.navigator";
import { TransitionSpecs } from "@react-navigation/bottom-tabs";

const ios = Platform.OS === "ios";

const Tab = createBottomTabNavigator();

export default function MyTabs({ navigation }) {
  const openBot = () => {
    navigation.navigate("chatbot");
  };
  return (
    <KeyboardAvoidingView behavior={ios ? "padding" : null} style={{ flex: 1 }}>
      <Tab.Navigator initialRouteName="Home" screenOptions={ScreenOptions}>
        <Tab.Screen name="Home" component={HomeScreenNavigator} />
        <Tab.Screen name="Map" component={NewMapScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
        />
      </Tab.Navigator>
      <ExpoStatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
