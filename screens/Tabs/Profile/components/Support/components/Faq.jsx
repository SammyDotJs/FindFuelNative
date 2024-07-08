import { View, Text } from "react-native";
import React from "react";
import { SafeArea } from "../../../../../../components/utils/Safe-area.component";
import Animated from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Data } from "./data/accordion.data";
import Accordion from "./components/Accordion";
import { BackButton } from "../../../../Map";
import { styles } from "../../../Styles/profile.styles";

const Faq = ({ navigation }) => {
  const navigateTo = () => {
    navigation.navigate("SupportScreen");
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
            <Text style={styles.h2}>FAQ</Text>
          </View>
        </View>
        <View style={styles.faqContainer}>
          {Data.map((value, index) => {
            return <Accordion key={index} value={value} />;
          })}
        </View>
      </Animated.ScrollView>
    </SafeArea>
  );
};

export default Faq;
