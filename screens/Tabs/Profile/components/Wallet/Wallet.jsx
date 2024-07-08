import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeArea } from "../../../../../components/utils/Safe-area.component";
import Animated from "react-native-reanimated";
import { styles } from "../../Styles/profile.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../../../../infrastructure/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BackButton } from "../../../Map";
import * as Clipboard from "expo-clipboard";

const Wallet = ({ navigation }) => {
  const [accountNumber, setAccountNumber] = useState();

  const accountDetails = {
    gateway: "Paystack account",
    accountNumber: 98948402776,
  };
  useEffect(() => {
    setAccountNumber(accountDetails.accountNumber);
  }, []);
  const navigateTo = () => {
    navigation.navigate("ProfileScreen");
  };
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${accountNumber}`);
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
            <Text style={styles.h2}>Wallet</Text>
          </View>
        </View>
        <View style={styles.walletContainer}>
          <View style={styles.availableBalance}>
            <Text style={styles.balanceText}>Available Balance</Text>
            <Text style={styles.balance}>₦2000</Text>
          </View>
          <View style={styles.fundWalletContainer}>
            <Text style={styles.fundWalletText}>Fund Wallet</Text>
            <View style={styles.paystackContainer}>
              <View style={styles.paystackDetails}>
                <Text style={styles.accountText}>{accountDetails.gateway}</Text>
                <Text style={styles.accountNumber}>{accountNumber}</Text>
              </View>
              <TouchableOpacity onPress={copyToClipboard} activeOpacity={0.8}>
                <View style={styles.copyIcon}>
                  <MaterialIcons
                    name="content-copy"
                    size={24}
                    color={theme.colors.bg.secondary}
                  />
                  <Text style={styles.copyText}>Copy</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeArea>
  );
};

export default Wallet;
