import React, { createContext, useRef, useContext } from "react";

const TrackingBottomSheetContext = createContext();

export const TrackingBottomSheetProvider = ({ children }) => {
  const sheetRef = useRef(null);

  return (
    <TrackingBottomSheetContext.Provider value={sheetRef}>
      {children}
    </TrackingBottomSheetContext.Provider>
  );
};

export const useTrackBottomSheet = () => useContext(TrackingBottomSheetContext);
