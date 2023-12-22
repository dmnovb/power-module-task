import { useDispatch } from "react-redux";
import {
  Payload,
  disconnectPayload,
  reconnectPayload,
} from "../state/payloadSlice";
import { removeAmpNotification } from "../state/notificationsSlice";

type CommandsProps = {
  payloads: Payload[];
};

export const Commands = ({ payloads }: CommandsProps) => {
  const dispatch = useDispatch();

  const handlePayloadDisconnect = (id: number) => {
    dispatch(disconnectPayload(id));

    //dispatch final notification
    dispatch(removeAmpNotification(id));
  };

  const handlePayloadReconnect = (id: number) => {
    dispatch(reconnectPayload(id));
  };

  return (
    <div className="commands-container">
      <h1 style={{ fontSize: "24px" }}>Commanding</h1>
      {payloads.map((payload: Payload) => (
        <>
          {payload.connected ? (
            <button
              data-cy={`disconnect-${payload.id}`}
              onClick={() => handlePayloadDisconnect(payload.id)}
            >
              {`Disconnect ${payload.id}`}
            </button>
          ) : (
            <button
              data-cy={`connect-${payload.id}`}
              onClick={() => handlePayloadReconnect(payload.id)}
            >
              {`Reconnect ${payload.id}`}
            </button>
          )}
        </>
      ))}
    </div>
  );
};
