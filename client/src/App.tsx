import { useSelector } from "react-redux";
import { Battery, Commands, NotificationTab, Payload } from "./components";
import type { Battery as BatteryType } from "./state/batterySlice";
import type { Payload as PayloadType } from "./state/payloadSlice";
import type { RootState } from "./state/store";

const App = () => {
  const batteries = useSelector(
    (state: RootState) => state.batteriesReducer.batteries
  );
  const payloads = useSelector(
    (state: RootState) => state.payloadsReducer.payloads
  );
  const notifications = useSelector(
    (state: RootState) => state.notificationsReducer.notifications
  );

  return (
    <>
      <div className="dash-container" data-cy="power-module">
        <div className="controls-container">
          <div className="batteries-container">
            {batteries.map((battery: BatteryType) => (
              <Battery
                key={battery.id}
                name={`Pack ${battery.id}`}
                voltage={battery.volts}
              />
            ))}
          </div>
          <div className="payloads-container">
            {payloads.map((payload: PayloadType) => {
              return (
                <Payload
                  connected={payload.connected}
                  key={payload.id}
                  name={`Payload ${payload.id}`}
                  amps={payload.amps}
                />
              );
            })}
          </div>
          <Commands payloads={payloads} />
        </div>
        <NotificationTab notifications={notifications} />
      </div>
    </>
  );
};

export default App;
