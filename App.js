import { View, ActivityIndicator, StyleSheet } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import {
  useFonts as usePoppins,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { theme } from "./infrastructure/theme";
import { LocationContextProvider } from "./services/LocationContext";
import UserContextProvider from "./services/user/UserContext";
import { ExpoStatusBar } from "./navigation";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { UserLocationContext } from "./services/user/UserLocationContext";
import { SelectMarkerContext } from "./services/SelectMarkerContext";
import { BottomSheetProvider } from "./services/BottomSheetContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MapViewProvider } from "./services/MapViewContext";
import Loader from "./components/Loader";
import { TrackingBottomSheetProvider } from "./services/TrackingBottomSheetContext";
import * as SplashScreen from "expo-splash-screen";
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';




export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [location, setLocation] = useState(null);
  const [stationLocation, setStationLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [placeListData, setPlaceListData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [showDirections, setShowDirections] = useState(false);
  const [initialRoute, setInitialRoute] = useState(null);

  const [region, setRegion] = useState({});

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setStationLocation(location);
      setRegion({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.02731,
      });

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000, // Update every 2 seconds
          distanceInterval: 1, // Update every meter
        },
        (newLocation) => {
          setLocation(newLocation);
          console.log(newLocation);
        }
      );
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log(appIsReady);
      console.log("loaddd");
      // This tells the splash screen to hide as soon as the app is ready
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const [poppinsLoaded] = usePoppins({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_500Medium,
  });

  if (!poppinsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Loader /> */}
      </View>
    );
  }
  return (
    <GestureHandlerRootView>
      <MapViewProvider>
        <BottomSheetProvider>
          <TrackingBottomSheetProvider>
            <BottomSheetModalProvider>
              <SelectMarkerContext.Provider
                value={{ selectedMarker, setSelectedMarker }}
              >
                <UserLocationContext.Provider
                  value={{
                    location,
                    setLocation,
                    isFetching,
                    setIsFetching,
                    placeListData,
                    setPlaceListData,
                    stationLocation,
                    setStationLocation,
                    showDirections,
                    setShowDirections,
                    region,
                    setRegion,
                    initialRoute,
                    setInitialRoute,
                  }}
                >
                  <UserContextProvider>
                    <LocationContextProvider>
                      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                        <AppNavigation />
                      </View>
                    </LocationContextProvider>
                    <ExpoStatusBar style="auto" />
                  </UserContextProvider>
                </UserLocationContext.Provider>
              </SelectMarkerContext.Provider>
            </BottomSheetModalProvider>
          </TrackingBottomSheetProvider>
        </BottomSheetProvider>
      </MapViewProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.bg.primary,
  },
  loadingBox: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: theme.colors.bg.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
