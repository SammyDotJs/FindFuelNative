import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../../../../Styles/profile.styles";
import { theme } from "../../../../../../../infrastructure/theme";
import Animated, {
  Extrapolate,
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Accordion = ({ value }) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0)
  );
  const heightAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0, 1],
      [0, heightValue.value],
      Extrapolate.CLAMP
    ),
  }));
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * -180}deg` }],
    marginRight: 20,
  }));
  return (
    <View style={styles.accordion}>
      <View style={styles.accordionInfoContainer}>
        <View style={styles.accordionCollapsed}>
          <Pressable
            style={styles.accordionTitleContainer}
            onPress={() => {
              if (heightValue.value === 0) {
                runOnUI(() => {
                  "worklet", (heightValue.value = measure(listRef).height);
                })();
              }
              open.value = !open.value;
            }}
          >
            <Text style={styles.accordionTitle}>{value.title}</Text>
          </Pressable>
          <Animated.View style={iconStyle}>
            <AntDesign
              name="downcircle"
              size={22}
              color={theme.colors.bg.primary}
              style={[styles.arrowDown]}
              onPress={() => {
                if (heightValue.value === 0) {
                  runOnUI(() => {
                    "worklet", (heightValue.value = measure(listRef).height);
                  })();
                }
                open.value = !open.value;
              }}
            />
          </Animated.View>
        </View>
        <Animated.View style={heightAnimatedStyle}>
          <Animated.View
            ref={listRef}
            style={styles.accordionDescriptionContainer}
          >
            <View style={styles.description}>
              <Text style={styles.accordionDescription}>
                {value.description}
              </Text>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Accordion;
