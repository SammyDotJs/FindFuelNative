import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { theme } from "../../../../infrastructure/theme";
import { styles } from "../Styles/profile.styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const profileItems = [
  {
    id: 1,
    icon: <Feather name="user" size={28} color={theme.colors.bg.primary} />,
    name: "Personal Information",
    navigate: "PersonalInfo",
  },
  {
    id: 2,
    icon: (
      <MaterialCommunityIcons
        name="wallet-outline"
        size={28}
        color={theme.colors.bg.primary}
      />
    ),
    name: "Wallet",
    navigate: "Wallet",
  },
  {
    id: 3,
    icon: (
      <MaterialIcons
        name="support-agent"
        size={28}
        color={theme.colors.bg.primary}
      />
    ),
    name: "Support",
    navigate: "Support",
  },
];

const ProfileList = ({ navigation }) => {
  const list = profileItems.map((item) => {
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.5}
        onPress={() => navigation.navigate(item.navigate)}
      >
        <View style={styles.listItem}>
          <View style={styles.iconInfo}>
            <View style={styles.listIcon}>{item.icon}</View>
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

export default ProfileList;
