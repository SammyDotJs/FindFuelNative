import { View, Text, Image } from "react-native";
import React from "react";
import { SafeArea } from "../../../../../components/utils/Safe-area.component";
import Animated from "react-native-reanimated";
import { BackButton } from "../../../Map";
import { styles } from "../../Styles/profile.styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import SupportList from "./components/SupportList/SupportList";

const Support = ({ navigation }) => {
  const navigateTo = () => {
    navigation.navigate("ProfileScreen");
  };
  return (
    <SafeArea>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: hp(11) }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        scrollEventThrottle={16}
      >
        <View style={[styles.top, styles.flex]}>
          <BackButton onPress={navigateTo} />
          <View style={styles.align}>
            <Text style={styles.h2}>Support</Text>
          </View>
        </View>
        <View style={styles.chatbotContainer}>
          <Image source={require("../../../../../assets/chatbot.png")} style={styles.chatbotImage}/>
          <Text style={[styles.h2, styles.textWidth]}>Hello,How can we Help you?</Text>
        </View>
        <View style={styles.supportListContainer}>
          <SupportList navigation={navigation} />
        </View>
      </Animated.ScrollView>
    </SafeArea>
  );
};

export default Support;
