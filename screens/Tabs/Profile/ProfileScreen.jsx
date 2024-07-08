import { View, Text } from "react-native";
import React from "react";
import { SafeArea } from "../../../components/utils/Safe-area.component";
import Animated from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackButton } from "../Map";
import { styles } from "./Styles/profile.styles";
import ProfileList from "./components/profile.list";

export default function ProfileScreen({ navigation }) {

  return (
    <SafeArea>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: hp(11) }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        scrollEventThrottle={16}
      >
        <View style={styles.top}>
          <BackButton />
        </View>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileText}>{"G"}</Text>
          </View>
          <Text style={styles.h2}>Guest</Text>
          <Text style={styles.yellowH1}>guest@gmail.com</Text>
        </View>

        {/*profile list*/}
        <View style={styles.marginHorizontal}>
          <ProfileList navigation={navigation}/>
        </View>
      </Animated.ScrollView>
    </SafeArea>
  );
}
