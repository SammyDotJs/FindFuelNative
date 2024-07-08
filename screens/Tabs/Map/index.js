import {
    View,
    Image,
    TouchableWithoutFeedback,
    Text,
    ImageBackground,
  } from "react-native";
  import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
  import { NewMapStyle } from "./Styles/NEWMAPSTYLE";
  import { UserLocationContext } from "../../../services/user/UserLocationContext";
  import GoogleSearchBar from "../../../components/GoogleSearchBar";
  import CustomMarkers from "./CustomMarkers";
  import BackButton from "../../../components/BackButton";
  import { BottomSheetModal } from "@gorhom/bottom-sheet";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import { SelectMarkerContext } from "../../../services/SelectMarkerContext";
  import { useBottomSheet } from "../../../services/BottomSheetContext";
  import { styles } from "./Styles/mapscreen.styles.js";
  import MapViewDirections from "react-native-maps-directions";
  import { useMapRef } from "../../../services/MapViewContext";
  import LocationIcon from "./components/LocationIcon";
  import { RenderBottomSheet } from "./components/BottomSheetView";
  import Modal from "react-native-modal";
  import GlobalApi from "../../../utils/GlobalApi";
  
  export {
    View,
    Image,
    TouchableWithoutFeedback,
    Text,
    ImageBackground,
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
    Modal,
    GlobalApi,
  };
  