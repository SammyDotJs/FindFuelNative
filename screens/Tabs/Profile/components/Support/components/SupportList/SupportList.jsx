import { View, Text, Platform } from "react-native";
import React, { useEffect } from "react";
import { theme } from "../../../../../../../infrastructure/theme";
import { styles } from "../../../../Styles/profile.styles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
// import {
//   initialize,
//   showMessaging,
// } from '@robbywh/react-native-zendesk-messaging';
// const ANDROID_CHANNEL_KEY =
//   "eyJzZXR0aW5nc191cmwiOiJodHRwczovL2NlbnRlcmZvcnJvYm90aWNzLnplbmRlc2suY29tL21vYmlsZV9zZGtfYXBpL3NldHRpbmdzLzAxSjI0NVpaM0VEQ0JKTVBDMzhDSDdaWVFKLmpzb24ifQ==";
// const IOS_CHANNEL_KEY =
//   "eyJzZXR0aW5nc191cmwiOiJodHRwczovL2NlbnRlcmZvcnJvYm90aWNzLnplbmRlc2suY29tL21vYmlsZV9zZGtfYXBpL3NldHRpbmdzLzAxSjI0NzVDS01aU04wNk1NSjRFUURLOTJYLmpzb24ifQ==";
const SupportItems = [
  {
    id: 1,
    icon: (
      <MaterialIcons
        name="support-agent"
        size={28}
        color={theme.colors.bg.primary}
      />
    ),
    name: "Chat with Fuelly",
    navigate: "Chatbot",
  },
  {
    id: 2,
    icon: (
      <MaterialCommunityIcons
        name="email-outline"
        size={28}
        color={theme.colors.bg.primary}
      />
    ),
    name: "Send us an Email",
    navigate: "Contact",
  },
  {
    id: 3,
    icon: (
      <MaterialCommunityIcons
        name="frequently-asked-questions"
        size={28}
        color={theme.colors.bg.primary}
      />
    ),
    name: "FAQ",
    navigate: "FAQ",
  },
];

const SupportList = ({ navigation }) => {
  // const CHANNEL_KEY =
  //   Platform.OS === "android" ? ANDROID_CHANNEL_KEY : IOS_CHANNEL_KEY;

  // useEffect(() => {
  //   initialize(CHANNEL_KEY)
  // }, []);
  const list = SupportItems.map((item) => {
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.5}
        onPress={() => {
          // item.chatbot && console.log("");
          navigation.navigate(item.navigate);
        }}
      >
        <View style={styles.supportItem}>
          <View style={styles.iconInfo}>
            {item.icon}
            <Text style={styles.h3}>{item.name}</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={hp(3.5)}
            color={theme.colors.bg.primary}
          />
        </View>
      </TouchableOpacity>
    );
  });
  return <View>{list}</View>;
};

export default SupportList;
