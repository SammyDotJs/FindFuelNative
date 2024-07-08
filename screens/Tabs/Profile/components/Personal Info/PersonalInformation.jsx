import { View, Text } from "react-native";
import React from "react";
import { SafeArea } from "../../../../../components/utils/Safe-area.component";
import Animated from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BackButton } from "../../../Map";
import { styles } from "../../Styles/profile.styles";

import PersonalInfoList from "./components/PersonalInfoList";

const PersonalInformation = ({ navigation }) => {
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
            <Text style={styles.h2}>Personal Information</Text>
          </View>
        </View>
        <View style={styles.personalInfoContainer}>
          <PersonalInfoList />
        </View>
      </Animated.ScrollView>
    </SafeArea>
  );
};

export default PersonalInformation;
