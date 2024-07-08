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

export const RenderBottomSheet = ({ selectedMarker, traceRoute }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [prices, setPrices] = useState({
    name: "",
    prices: {
      fuel: 0,
      diesel: 0,
      kerosene: 0,
    },
    availability: false,
  });

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
  };

  rating = Math.round(selectedMarker?.rating ? selectedMarker.rating : 0);
  const ratingArray = Array.from({ length: 5 }, (_, i) => i + 1);

  for (let i = 0; i < rating; i++) {
    ratingArray[i] = i;
  }
  const stationsAndPrices = [
    {
      name: "NNPC",
      prices: {
        fuel: 690,
        diesel: 1290,
        kerosene: 100,
      },
      availability: true,
    },
    {
      name: "Bovas",
      prices: {
        fuel: 660,
        diesel: 1180,
        kerosene: 110,
      },
      availability: true,
    },
    {
      name: "unavailable",
      prices: {
        fuel: 0,
        diesel: 0,
        kerosene: 0,
      },
      availability: false,
    },
  ];
  useEffect(() => {
    stationsAndPrices.map((item) => {});
    const isItemAvailable = stationsAndPrices.find((item) =>
      selectedMarker.name.toUpperCase().includes(item.name.toUpperCase())
    );
    if (isItemAvailable) {
      setPrices(isItemAvailable.prices);
    } else {
      setPrices(
        {
          name: "unavailable",
          prices: {
            fuel: "--",
            diesel: "--",
            kerosene: "--",
          },
          availability: false,
        }.prices
      );
    }
  }, [selectedMarker]);
  const gasStationPrices = [
    {
      name: "Fuel",
      price: prices ? prices.fuel : 0,
      availability: "Available",
    },
    {
      name: "Diesel",
      price: prices ? prices.diesel : 0,
      availability: "Available",
    },
    {
      name: "Kerosene",
      price: prices ? prices.kerosene : 0,
      availability: "Available",
    },
  ];

  return !isEmpty(selectedMarker) ? (
    <BottomSheetView style={styles.contentContainer}>
      <View style={bs.container}>
        {isImageLoading && (
          <ImageBackground
            style={bs.loadingImage}
            imageStyle={bs.imageStyle}
            source={require("../../../../assets/ImageLoading.png")}
          />
        )}
        <ImageBackground
          style={bs.fillingStationImage}
          imageStyle={bs.imageStyle}
          source={
            selectedMarker?.photos
              ? {
                  uri: `${PLACE_PHOTO_BASE_URL}maxwidth=1200&photo_reference=${selectedMarker?.photos[0].photo_reference}&key=${GlobalApi.API_KEY}`,
                }
              : require("../../../../assets/ImageLoading.png")
          }
          onLoadStart={() => setIsImageLoading(true)}
          onLoadEnd={() => setIsImageLoading(false)}
        />
        <View>
          <View style={bs.nameAvailabilityContainer}>
            <Text style={bs.name}>
              {truncateText(selectedMarker?.name, 20)}
            </Text>
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
          <View style={bs.row}>
            <Feather name="map-pin" size={20} color={theme.colors.bg.primary} />
            <Text style={bs.location}>{selectedMarker.vicinity}</Text>
          </View>
        </View>
        <View>
          {gasStationPrices.map((item, index) => (
            <View key={index} style={bs.product}>
              <Text style={bs.productName}>{item.name}:</Text>
              <Text style={bs.productPrice}>{item.price}</Text>
              <Text style={bs.productAvailability}>{item.availability}</Text>
            </View>
          ))}
        </View>
        <Button
          title={"Find Fuel"}
          buttonStyle={bs.buttonStyle}
          containerStyle={bs.buttonContainerStyle}
          onPress={() => traceRoute()}
        />
      </View>
    </BottomSheetView>
  ) : (
    <Text style={{ textAlign: "center", color: theme.colors.text.primary }}>
      No Station Selected
    </Text>
  );
};
