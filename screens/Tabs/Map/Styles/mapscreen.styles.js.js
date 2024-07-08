import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../../../../infrastructure/theme";

export const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  searchbar: {
    position: "absolute",
    zIndex: 10,
    width: "80%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: 100,
  },
  backButtonContainer: {
    position: "absolute",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: hp(12),
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  drivingText: {
    fontSize: hp(2),
    fontFamily: theme.fonts.heading,
    color: theme.colors.text.primary,
  },
  firstTrackRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop:20,
    width: "90%",
  },
  thirdTrackRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    width: "75%",
    marginTop: 30,
  },
  thirdRowColumn1: {
    alignItems: "flex-start",
  },
  duration: {
    fontFamily: theme.fonts.medium,
    color: theme.colors.text.primary,
    fontSize: hp(1.8),
    textAlign: "center",
  },
  imageStyle: {
    borderRadius: 15,
  },
  imageStyleContainer: {
    position: "relative",
  },
  fillingStationImage: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: wp(35),
    height: hp(11),
    padding: wp(3),
  },
  imageContainer: {},
  loadingImage: {
    position: "absolute",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: wp(35),
    height: hp(11),
    padding: wp(3),
  },
});
