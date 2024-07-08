import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useTrackBottomSheet } from "../../../services/TrackingBottomSheetContext";
import { RenderTrackingBottomSheetView } from "./components/TrackingBottomSheetView";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  React,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  MapView,
  Marker,
  PROVIDER_GOOGLE,
  NewMapStyle,
  UserLocationContext,
  GoogleSearchBar,
  CustomMarkers,
  BackButton,
  BottomSheetModal,
  GestureHandlerRootView,
  SelectMarkerContext,
  useBottomSheet,
  styles,
  MapViewDirections,
  useMapRef,
  LocationIcon,
  RenderBottomSheet,
} from "./index";
import { useRef } from "react";
import LottieView from "lottie-react-native";

const NewMapScreen = ({ navigation }) => {
  const GOOGLE_MAPS_APIKEY = "AIzaSyAIMcELfgksPn1eLdImduIeNzJZd7HdUIY";
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
  const bottomSheetRef = useBottomSheet();
  const trackingBottomSheetRef = useTrackBottomSheet();
  const {
    location,
    placeListData,
    setStationLocation,
    showDirections,
    setShowDirections,
    region,
  } = useContext(UserLocationContext);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const animation = useRef(null);

  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);

  const snapPoints = useMemo(() => ["1%", "60%"]);
  const trackSnapPoints = useMemo(() => ["1%", "10", "40%"]);
  const mapRef = useMapRef(null);
  const [findBtn, setFindBtn] = useState(false);

  //UTIL FUNCTIONS
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
  };

  useEffect(() => {
    distance !== 0 && duration !== 0 && console.log(distance, duration);
  }, [duration, distance]);

  useEffect(() => {
    if (!findBtn && bottomSheetRef.current?.snapToIndex(1)) {
      setSelectedMarker({});
    }
  }, [selectedMarker]);

  // NAVIGATIONS
  const backToHome = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  //BOTTOM SHEET
  const handleSheetChanges = useCallback((index) => {
    setBottomSheetIndex(1);
    console.log("handle change", index);
    if (findBtn === false && index === 0) {
      bottomSheetRef?.current.snapToIndex(-1);
    }
  }, []);

  const handleTrackingSheetChanges = useCallback((index) => {
    setBottomSheetIndex(1);
    console.log("handle change track", index);
    // if (findBtn === false && index === 0) {
    //   trackingBottomSheetRef.current?.snapToIndex(-1);
    // }
  }, []);

  const handleCloseSheet = () => {
    bottomSheetRef?.current.dismiss();
  };
  const handleMarkerPress = (marker) => {
    setShowDirections(false);
    setSelectedMarker(marker);
    setBottomSheetIndex(1);
    if (
      selectedMarker &&
      bottomSheetRef.current &&
      bottomSheetRef.current !== null
    ) {
      bottomSheetRef.current.present();
    }
    bottomSheetRef.current !== null && bottomSheetRef?.current.present();
    bottomSheetRef.current === null &&
      setTimeout(() => {
        bottomSheetRef.current?.present();
      }, 1500); // Open the bottom sheet
  };

  const animateToRegion = () => {
    const newRegion = {
      latitude: location?.coords.latitude,
      longitude: location?.coords.longitude,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0021,
    };
    mapRef.current.animateToRegion(newRegion, 1000); // 1000 ms for the transition
    setStationLocation({
      coords: {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      },
    });
  };
  // MAP DIRECTIONS
  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };
  const onPLaceSelected = (details, flag) => {
    const set = flag === "origin" ? setOrigin : setDestination;

    const position = {
      latitude:
        flag === "destination"
          ? details?.geometry.location.lat || 0
          : details?.coords.latitude,
      longitude:
        flag === "destination"
          ? details?.geometry.location.lng || 0
          : details?.coords.longitude,
    };
    set(position);
    moveTo(position);
  };

  const edgePaddingValue = 300;

  const edgePadding = {
    top: edgePaddingValue,
    bottom: edgePaddingValue,
    right: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };
  useEffect(() => {
    const getRoutes = () => {
      if (location && selectedMarker) {
        onPLaceSelected(location, "origin");
        onPLaceSelected(selectedMarker, "destination");
      } else {
        console.error("Didn't get origin and destination");
      }
    };
    !isEmpty(selectedMarker) && getRoutes();
  }, [selectedMarker]);
  const traceRoute = () => {
    setFindBtn(true);
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
    bottomSheetRef.current?.dismiss();
    if (
      selectedMarker &&
      trackingBottomSheetRef.current &&
      trackingBottomSheetRef.current !== null
    ) {
      trackingBottomSheetRef.current.present();
    }
    trackingBottomSheetRef.current !== null &&
      trackingBottomSheetRef?.current.present();
    trackingBottomSheetRef.current === null &&
      setTimeout(() => {
        trackingBottomSheetRef.current?.present();
      }, 1500); // Open the bottom sheet
  };
  const onMapLoadEnd = () => {
    console.log("end load");
  };
  const handleCancel = () => {
    trackingBottomSheetRef.current?.dismiss();
    setShowDirections(false);
    setSelectedMarker({});
    setDistance(0);
    setDuration(0);
  };
  return (
    location?.coords.latitude && (
      <TouchableWithoutFeedback>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View>
            <View
              style={{
                zIndex: 11,
                width: "90%",
                position: "absolute",
                top: 70,
              }}
            >
              <View style={styles.backButtonContainer}>
                <BackButton onPress={backToHome} />
              </View>
              <View style={styles.searchbar}>
                <GoogleSearchBar
                  searchedLocation={(location) =>
                    setStationLocation({
                      coords: {
                        latitude: location.lat,
                        longitude: location.lng,
                      },
                    })
                  }
                  placeList={placeListData}
                  selectMarker={(item) => {
                    setSelectedMarker(item);
                    setTimeout(() => {
                      bottomSheetRef.current?.present();
                    }, 1500);
                  }}
                />
              </View>
            </View>
            <MapView
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              customMapStyle={NewMapStyle}
              region={region}
              onMapLoaded={onMapLoadEnd}
            >
              {location ? (
                <Marker
                  coordinate={{
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude,
                  }}
                >
                  <Image
                    source={require("../../../assets/Userpointer.png")}
                    style={{ width: 33, height: 33 }}
                  />
                </Marker>
              ) : null}

              {placeListData &&
                placeListData.map((item, index) => (
                  <CustomMarkers
                    key={index}
                    place={item}
                    isSelected={
                      selectedMarker &&
                      selectedMarker.place_id === item.place_id
                    }
                    onPress={() => handleMarkerPress(item)}
                  />
                ))}

              {showDirections && origin && destination && (
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={6}
                  strokeColor="#5D43FF"
                  onReady={traceRouteOnReady}
                />
              )}
            </MapView>
            <BottomSheetModal
              ref={trackingBottomSheetRef}
              snapPoints={trackSnapPoints}
              onChange={handleTrackingSheetChanges}
              index={2}
              backgroundStyle={{ borderRadius: 50 }}
              enablePanDownToClose={true}
              handleHeight={10}
              handleIndicatorStyle={{
                width: 100,
                marginTop: 10,
                height: 5,
                backgroundColor: "#455A64",
              }}
              onDismiss={() => trackingBottomSheetRef?.current.snapToIndex(-1)}
            >
              {distance && duration ? (
                <RenderTrackingBottomSheetView
                  selectedMarker={selectedMarker}
                  duration={duration}
                  onCancel={handleCancel}
                />
              ) : (
                <BottomSheetView
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: "transparent",
                    }}
                    source={require("../../../assets/aYZk6oIiT8.json")}
                  />
                </BottomSheetView>
              )}
            </BottomSheetModal>

            <BottomSheetModal
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              index={1}
              backgroundStyle={{ borderRadius: 50 }}
              enablePanDownToClose={true}
              handleHeight={10}
              handleIndicatorStyle={{
                width: 100,
                marginTop: 10,
                height: 5,
                backgroundColor: "#455A64",
              }}
            >
              <RenderBottomSheet
                selectedMarker={selectedMarker}
                traceRoute={() => traceRoute()}
              />
            </BottomSheetModal>

            <LocationIcon goTo={animateToRegion} />
          </View>
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    )
  );
};

export default NewMapScreen;
