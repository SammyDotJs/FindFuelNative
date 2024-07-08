import { styles as bs } from "./bottomSheet.styles.js";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { styles } from "..//Styles/mapscreen.styles.js";
import GlobalApi from "../../../../utils/GlobalApi.js";
import { Button } from "@rneui/themed";
import { theme } from "../../../../infrastructure/theme/index.js";

const PLACE_PHOTO_BASE_URL =
  "https://maps.googleapis.com/maps/api/place/photo?";

export const RenderTrackingBottomSheetView = ({
  selectedMarker,
  duration,
  onCancel,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  rating = Math.round(selectedMarker?.rating ? selectedMarker.rating : 0);
  const ratingArray = Array.from({ length: 5 }, (_, i) => i + 1);

  for (let i = 0; i < rating; i++) {
    ratingArray[i] = i;
  }

  return !isEmpty(selectedMarker) ? (
    <BottomSheetView style={styles.modalView}>
      <View style={styles.firstTrackRow}>
        <Text style={styles.drivingText}>Driving To Destination</Text>
        <Text style={styles.duration}>{Math.ceil(duration)} min away</Text>
      </View>
      <View style={styles.imageContainer}>
        {isImageLoading && (
          <ImageBackground
            style={styles.loadingImage}
            imageStyle={styles.imageStyle}
            source={require("../../../../assets/ImageLoading.png")}
          />
        )}
        <ImageBackground
          style={styles.fillingStationImage}
          imageStyle={styles.imageStyle}
          source={
            selectedMarker?.photos
              ? {
                  uri: `${PLACE_PHOTO_BASE_URL}maxwidth=1200&maxheight=800&photo_reference=${selectedMarker?.photos[0].photo_reference}&key=${GlobalApi.API_KEY}`,
                }
              : require("../../../../assets/ImageLoading.png")
          }
          onLoadStart={() => setIsImageLoading(true)}
          onLoadEnd={() => setIsImageLoading(false)}
        />
      </View>
      <View style={styles.thirdTrackRow}>
        <View style={styles.thirdRowColumn1}>
          <Text style={styles.duration}>{selectedMarker?.name}</Text>
          <View style={bs.rating}>
            {ratingArray.map((_, i) => (
              <AntDesign
                key={i}
                name={_ <= rating ? "star" : "staro"}
                size={15}
                color={theme.colors.bg.primary}
              />
            ))}
          </View>
        </View>
        {selectedMarker.opening_hours ? (
          <Text
            style={
              selectedMarker?.opening_hours.open_now === true
                ? bs.availability
                : bs.availabilityClosed
            }
          >
            {selectedMarker?.opening_hours.open_now === true
              ? "Opened"
              : "Closed"}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <Button
        title={"Cancel"}
        buttonStyle={bs.buttonStyle}
        containerStyle={bs.buttonContainerStyle}
        onPress={() => onCancel()}
      />
    </BottomSheetView>
  ) : (
    <Text style={{ textAlign: "center", color: theme.colors.text.primary }}>
      No Station Selected
    </Text>
  );
};
