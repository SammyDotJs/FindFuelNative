import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { theme } from "../../infrastructure/theme";
import Onboarding from "react-native-onboarding-swiper";
import { Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { styles } from "./Styles/onboarding.styles";

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
    // style={{
    //     width: 6,
    //     height: 6,
    //     marginHorizontal: 3,
    //     backgroundColor,
    // }}
    />
  );
};

const backgroundColor = (isLight) => (isLight ? "blue" : "lightblue");
const color = (isLight) => backgroundColor(!isLight);

const nextAndDoneStyle = {
  backgroundColor: theme.colors.bg.primary,
  borderRadius: 50,
  width: 50,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
  marginBottom: 20,
};

const Done = ({ isLight, ...props }) => (
  <Button
    title={
      <AntDesign name="arrowright" size={24} color={theme.colors.text.white} />
    }
    buttonStyle={nextAndDoneStyle}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
      backgroundColor: backgroundColor(isLight),
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  />
);

const Skip = ({ isLight, skipLabel, ...props }) => (
  <Text style={styles.skipStyle} {...props}>
    Skip
  </Text>
);

const Next = ({ isLight, ...props }) => (
  <Button
    title={
      <AntDesign name="arrowright" size={24} color={theme.colors.text.white} />
    }
    buttonStyle={nextAndDoneStyle}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,

      backgroundColor: theme.colors.bg.primary,
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  />
);

export default function OnboardingScreen({onLoad}) {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate("Auth");
  };
  return (
    <View style={styles.container} onLayout={onLoad}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHeight={70}
        bottomBarColor={theme.colors.bg.white}
        DotComponent={Square}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        subTitleStyles={{
          fontFamily: theme.fonts.heading,
          color: theme.colors.text.primary,
          fontSize: hp(4),
          fontWeight: "600",
          lineHeight: 60,
          paddingHorizontal: 20,
          marginLeft: 0,
          width: wp(100),
          marginTop: 20,
        }}
        titleStyles={{
          height: 0,
        }}
        imageContainerStyles={{
          paddingBottom: 0,
        }}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.onboardContainer}>
                <Image
                  style={styles.onboradImage}
                  source={require("../../assets/onboard-1.png")}
                />
              </View>
            ),
            title: "",
            subtitle: "Find fuel stations nearby, anytime, anywhere.",
            subTitleStyles: {
              textAlign: "left",
            },
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.onboardContainer}>
                <Image
                  style={styles.onboradImage}
                  source={require("../../assets/onboard-2.png")}
                />
              </View>
            ),
            title: "",
            subtitle:
              "Navigate fuel options and filter through prices effortlessly.",
            subTitleStyles: {
              textAlign: "right",
            },
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.onboardContainer}>
                <Image
                  style={styles.onboradImage}
                  source={require("../../assets/onboard-3.png")}
                />
              </View>
            ),
            title: "",
            subtitle:
              "Receive instant alerts on fuel availability and price fluctuations.",
            subTitleStyles: {
              textAlign: "left",
            },
          },
        ]}
      />
    </View>
  );
}