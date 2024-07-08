import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { theme } from "../../../../../../infrastructure/theme";
import { styles } from "../../../Styles/profile.styles";
import { TextInput } from "react-native-gesture-handler";

const InfoItems = [
  {
    id: 1,
    label: "Full Name",
    textInput: "John Doe",
    keyboardType: "default",
  },
  {
    id: 2,
    label: "Phone Number",
    textInput: "+234 708 3674 4738",
    verified: true,
    keyboardType: "number-pad",
  },
  {
    id: 3,
    label: "Email",
    textInput: "johndoe455@gmail.com",
    verified: true,
    keyboardType: "default",
  },
];

const PersonalInfoList = ({ navigation }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [name, setName] = useState("");
  const handleEdit = () => {
    setReadOnly(false);
  };
  const onBlur = () => {
    setReadOnly(true);
  };
  const handleNameChange = (text) => {
    setName(text);
  };
  const list = InfoItems.map((item) => {
    // setName(item.textInput)
    return (
      <View style={styles.personalInfoItem} key={item.id}>
        <View style={styles.textAndLabel}>
          <Text style={styles.textLabel}>{item.label}</Text>
          <TextInput
            defaultValue={item.textInput}
            readOnly={readOnly}
            style={styles.textInput}
            onChange={handleNameChange}
            onBlur={onBlur}
            keyboardType={item.keyboardType}
          />
        </View>
        <View style={styles.verifiedAndEdit}>
          {item.verified && (
            <Octicons
              name="verified"
              size={24}
              color={theme.colors.bg.secondary}
            />
          )}
          <TouchableOpacity
            onPress={handleEdit}
            activeOpacity={0.6}
            style={styles.mlAuto}
          >
            <AntDesign name="edit" size={28} color={theme.colors.bg.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  });
  return <View>{list}</View>;
};

export default PersonalInfoList;
