import { useDispatch } from "react-redux";
import {
  Payload,
  disconnectPayload,
  reconnectPayload,
} from "../state/payloadSlice";
import { notificationSupplier } from "../state/notificationsSlice";

type CommandsProps = {
  payloads: Payload[];
};

export const Commands = ({ payloads }: CommandsProps) => {
  const payload1 = payloads[0];
  const payload2 = payloads[1];
  const dispatch = useDispatch();

  const handleDisconnect = (id: number) => {
    dispatch(disconnectPayload(id));

    //dispatch final notification
    dispatch(
      notificationSupplier({
        message: null,
        chargeType: "Amps",
        notificationType: null,
      })
    );
  };
  const handleReconnect = (id: number) => {
    dispatch(reconnectPayload(id));
  };

  return (
    <div className="commands-container">
      <h1 style={{ fontSize: "24px" }}>Commanding</h1>
      {payload1.connected ? (
        <button
          data-cy="disconnect-1"
          onClick={() => handleDisconnect(payload1.id)}
        >
          {`Disconnect ${payload1.id}`}
        </button>
      ) : (
        <button
          data-cy="connect-1"
          onClick={() => handleReconnect(payload1.id)}
        >
          {`Reconnect ${payload1.id}`}
        </button>
      )}
      {payload2.connected ? (
        <button
          data-cy="disconnect-2"
          onClick={() => handleDisconnect(payload2.id)}
        >
          {`Disconnect ${payload2.id}`}
        </button>
      ) : (
        <button
          data-cy="connect-2"
          onClick={() => handleReconnect(payload2.id)}
        >
          {`Reconnect ${payload2.id}`}
        </button>
      )}
    </div>
  );
};
