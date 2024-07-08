import { StyleSheet } from "react-native";
import { theme } from "../../../../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authTextLabel: {
    color: theme.colors.text.foundation,
    fontSize: hp(2),
    fontFamily: theme.fonts.heading,
    padding: 0,
    textAlign: "left",
  },
  authTextInput: {
    width: wp(90),
    height: hp(3),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text.foundation,
    fontSize: hp(2),
    fontFamily: theme.fonts.medium,
  },
  authTextInputP: {
    width: wp(78),
    height: hp(3),
    fontSize: hp(2),
    fontFamily: theme.fonts.medium,
  },
  authPassword: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text.foundation,
  },
  onboardContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(100),
    height: hp(35),
    marginLeft: "auto",
    paddingBottom: 0,
  },
  onboradImage: {
    width: wp(50),
    resizeMode: "contain",
    padding: 0,
  },
  forgotPassword: {
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.text.secondary,
    fontSize: hp(1.6),
  },
  accountQuestion: {
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.text.secondary,
    fontSize: hp(1.6),
  },
  forgotPasswordText: {
    marginTop: hp(3),
    color: theme.colors.text.secondary,
    fontSize: hp(1.6),
    fontFamily: theme.fonts.body,
  },
  dashLine: {
    width: 100,
    margin: hp(1),
  },
  or: {
    flexDirection: "row",
    margin: "auto",
    height:hp(4),
    alignItems:"center"
  },
  ortext: {
    color: theme.colors.text.primary,
    fontSize: hp(2),
    fontWeight: "700",
    fontFamily: theme.fonts.body,
  },
  btns: {
    marginTop:hp(2)
  },
  mt: {
    justifyContent: "center",
    alignItems: "center",
  },
  signup: {
    marginTop: hp(3),
    color: theme.colors.text.primary,
    fontSize: hp(1.6),
    fontFamily: theme.fonts.body,
  },
  signupLink: {
    color: theme.colors.text.secondary,
    fontWeight: "600",
  },
  welcome: {
    color: theme.colors.text.primary,
    fontSize: hp(3.2),
    fontFamily: theme.fonts.bold,
  },
  subWelcome: {
    color: theme.colors.text.foundation,
    fontSize: hp(2),
    fontFamily: theme.fonts.body,
  },
  intro: {
    marginTop: hp(3),
    justifyContent:"center",
    alignItems:"center"
  },
});
