"use client";
import { FC, createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import InfoPopup from "../_components/ui/modals/InfoPopup";
import { HIDE_INFOPOPUP_AFTER_DEFAULT_MS } from "../_lib/constants/constants";
import {
  AppContextValue,
  InfoPopupType,
  InfoPopup as InfoPopupT,
} from "../_types/context/AppContext";

const appContextDefaultValue: AppContextValue = {
  infoPopup: {
    isShown: false,
    type: "info",
    message: "",
    hideAfterMs: HIDE_INFOPOPUP_AFTER_DEFAULT_MS,
  },
  showInfoPopup: (
    message: string,
    type: InfoPopupType,
    hideAfterMs?: number
  ) => {},
}; 

const AppContext = createContext(appContextDefaultValue);

type Props = { children: React.ReactNode };

const AppContextProvider: FC<Props> = ({ children }) => {
  const [isDOMReady, setIsDOMReady] = useState(false);
  const [infoPopup, setInfoPopup] = useState<InfoPopupT>(
    appContextDefaultValue.infoPopup
  );

  // create portal only if DOM is ready
  useEffect(() => {
    setIsDOMReady(true);
  }, []);

  // hide informational popup
  useEffect(() => {
    const timer = setTimeout(() => {
      setInfoPopup({
        ...infoPopup,
        isShown: false,
      });
    }, infoPopup.hideAfterMs);
    return () => clearTimeout(timer);
  }, [infoPopup]);

  const showInfoPopup = (
    message: string,
    type: InfoPopupType,
    hideAfterMs: number = HIDE_INFOPOPUP_AFTER_DEFAULT_MS
  ) => {
    const newInfoPopup: InfoPopupT = {
      ...infoPopup,
      isShown: true,
      message,
      type,
      hideAfterMs,
    };
    setInfoPopup(newInfoPopup);
  };

  return (
    <AppContext.Provider value={{ infoPopup, showInfoPopup }}>
      {children}
      {isDOMReady &&
        createPortal(<InfoPopup />, document.getElementById("info-popup")!)}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
