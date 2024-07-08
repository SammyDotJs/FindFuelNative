import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { SafeArea } from "../../../../../../components/utils/Safe-area.component";
import { styles } from "../../../Styles/profile.styles";
import { BackButton } from "../../../../Map";

const Chatbot = ({ navigation }) => {
  const navigateTo = () => {
    navigation.navigate("SupportScreen");
  };
  return (
    <SafeArea>
      <View style={[styles.top, styles.flex]}>
        <BackButton onPress={navigateTo} />
        <View style={styles.align}>
          <Text style={styles.h2}>Chat with Fuelly</Text>
        </View>
      </View>
      <WebView
        source={{
          uri: "https://static.zdassets.com/web_widget/latest/liveChat.html?v=10#key=centerforrobotics.zendesk.com",
        }}
        style={{ flex: 1, width: "100%", height: "100%" }}
      />
    </SafeArea>
  );
};

export default Chatbot;
