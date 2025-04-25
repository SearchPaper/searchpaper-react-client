import { Alert, useAlertStore } from "../stores/alertStore";

function Alerts({ alerts }: { alerts: Alert[] }) {
  return (
    <>
      {alerts.map((alert) => {
        const alertSuccess = "alert-success";
        const alertError = "alert-error";
        const { response, message } = alert;

        const { status, ok } = response;

        return (
          <div
            className={`alert ${ok ? alertSuccess : alertError}`}
            key={alert._id}
          >
            <span>{status}</span>
            <span>{message}</span>
          </div>
        );
      })}
    </>
  );
}

export default function ResponseAlerts() {
  const alerts = useAlertStore((state) => state.alerts);
  return (
    <div className="toast toast-top toast-center">
      <Alerts alerts={alerts} />
    </div>
  );
}
