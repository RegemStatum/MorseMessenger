type InfoPopupType = "info" | "error" | "warning" | "success";

type InfoPopup = {
  isShown: boolean;
  type: InfoPopupType;
  message: string;
  hideAfterMs: number;
};

type AppContextValue = {
  infoPopup: InfoPopup;
  showInfoPopup: (
    message: string,
    type: InfoPopupType,
    hideAfterMs?: number
  ) => void;
};

export type { InfoPopupType, InfoPopup, AppContextValue };
