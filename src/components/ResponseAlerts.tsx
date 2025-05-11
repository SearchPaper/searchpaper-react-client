import { Alert, useAlertStore } from "../stores/alertStore";

function Alerts({ alerts }: { alerts: Alert[] }) {
  const alertRow = alerts.map((alert) => {
    const alertSuccess = "alert-success";
    const alertError = "alert-error";
    const { response, message } = alert;

    const { ok } = response;

    return (
      <div
        className={`alert  ${ok ? alertSuccess : alertError}`}
        key={alert._id}
      >
        <span>{message}</span>
      </div>
    );
  });

  return alertRow;
}

export default function ResponseAlerts() {
  const alerts = useAlertStore((state) => state.alerts);
  return (
    <div className="toast toast-top toast-center z-50">
      <Alerts alerts={alerts} />
    </div>
  );
}
