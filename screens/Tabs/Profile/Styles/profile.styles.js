import { StyleSheet } from "react-native";
import { theme } from "../../../../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  top: {
    marginTop: hp(5),
  },
  profileInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.bg.tertiary,
  },
  profileText: {
    fontSize: hp(3),
    fontFamily: theme.fonts.heading,
    color: theme.colors.text.primary,
  },
  h2: {
    fontSize: hp(2.5),
    fontFamily: theme.fonts.heading,
    color: theme.colors.text.primary,
    marginTop: hp(1),
  },
  yellowH1: {
    fontSize: hp(1.5),
    fontFamily: theme.fonts.medium,
    color: theme.colors.text.secondary,
    marginTop: -10,
  },
  h3: {
    fontSize: hp(1.7),
    fontFamily: theme.fonts.medium,
    color: theme.colors.text.primary,
    marginLeft: wp(3),
  },
  listIcon: {
    backgroundColor: theme.colors.bg.tertiary,
    borderRadius: 6,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#D4D4D4",
  },
  marginHorizontal: {
    marginHorizontal: wp(4),
    alignItems: "center",
    marginTop: hp(5),
  },
  iconInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  align: {
    alignItems: "center",
    marginLeft: wp(6),
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  personalInfoContainer: {
    marginHorizontal: wp(4),
    marginTop: hp(7),
  },
  personalInfoItem: {
    backgroundColor: theme.colors.bg.tertiaryFaint,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 10,
    marginVertical: hp(2),
  },
  textLabel: {
    fontSize: hp(1.5),
    fontFamily: theme.fonts.medium,
    color: theme.colors.text.primaryFaint,
  },
  textAndLabel: {
    justifyContent: "space-between",
    width: "70%",
  },
  textInput: {
    width: "100%",
    padding: 0,
    color: theme.colors.text.primary,
    fontSize: hp(1.7),
    fontFamily: theme.fonts.body,
    margin: 0,
  },
  verifiedAndEdit: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
  },
  mlAuto: { marginLeft: "auto" },
  walletContainer: {
    marginHorizontal: wp(4),
    marginTop: hp(7),
  },
  availableBalance: {
    backgroundColor: theme.colors.bg.primary,
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    height: hp(18),
  },
  balanceText: {
    fontSize: hp(2.2),
    fontFamily: theme.fonts.body,
    color: theme.colors.text.secondary,
  },
  balance: {
    fontSize: hp(4),
    fontFamily: theme.fonts.heading,
    color: theme.colors.text.white,
  },
  fundWalletContainer: {
    backgroundColor: theme.colors.bg.taintedWhite,
    borderRadius: 15,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    height: hp(13),
    flexDirection: "row",
    marginTop: hp(4),
  },
  fundWalletText: {
    fontSize: hp(2.2),
    fontFamily: theme.fonts.body,
    color: theme.colors.text.primary,
  },
  paystackContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.bg.primary,
    borderRadius: 15,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
  paystackDetails: {
    alignItems: "flex-start",
  },
  accountText: {
    color: theme.colors.text.white,
    fontFamily: theme.fonts.body,
    fontSize: hp(1.5),
  },
  accountNumber: {
    color: theme.colors.text.white,
    fontFamily: theme.fonts.body,
    fontSize: hp(2.2),
  },
  copyText: {
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.body,
    fontSize: hp(1.2),
  },
  copyIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatbotContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(6),
  },
  chatbotImage: {
    resizeMode: "contain",
    width: 200,
    height: 300,
  },
  textWidth: {
    width: 250,
    textAlign: "center",
    marginTop: 0,
  },
  supportListContainer: {
    marginHorizontal: wp(4),
    marginTop: hp(3),
  },
  supportItem: {
    backgroundColor: theme.colors.bg.tertiaryFaint,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 15,
    marginVertical: hp(1),
  },
  accordion: {
    backgroundColor: theme.colors.bg.tertiaryFaint,
    marginVertical: 15,
    borderRadius: 10,
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5.84,
    elevation: 20,
    alignItems: "flex-start",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  accordionTitle: {
    fontFamily: theme.fonts.medium,
    fontSize: hp(1.7),
    color: theme.colors.text.primary,
  },
  accordionDescription: {
    fontFamily: theme.fonts.body,
    fontSize: hp(1.4),
    color: theme.colors.text.primary,
    width: "90%",
  },
  faqContainer: {
    marginHorizontal: wp(4),
    marginTop: hp(3),
  },
  accordionInfoContainer: {
    width: "100%",
  },
  accordionTitleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "90%",
  },
  accordionDescriptionContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  description: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: theme.colors.bg.tertiaryFaint,
  },
  accordionCollapsed: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
