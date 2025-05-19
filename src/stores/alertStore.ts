import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface Alert {
  _id: string;
  response: Response;
  message: string;
}

interface AlertStore {
  alerts: Alert[];
  pushAlert: (response: Response, message: string) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  pushAlert(response, message) {
    const _id = uuidv4();
    const alert: Alert = { response, _id, message };

    set((state) => {
      if (!response.ok) {
        alert["message"] = response.statusText;
      }
      return { alerts: [...state.alerts, alert] };
    });

    setTimeout(() => {
      set((state) => ({
        alerts: [...state.alerts].filter((it) => it._id !== _id),
      }));
    }, 2000);
  },
}));
