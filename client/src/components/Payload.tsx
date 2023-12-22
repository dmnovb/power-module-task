import { CSSProperties, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAmps } from "../state/payloadSlice";
import { AppDispatch } from "../state/store";
import {
  addAmpNotification,
  removeAmpNotification,
} from "../state/notificationsSlice";

type PayloadProps = {
  connected: boolean;
  name: string;
  amps: number[];
  payloadId: number;
};

const disabledStyle: CSSProperties = {
  opacity: "0.5",
  pointerEvents: "none",
};

export const Payload = ({ name, amps, connected, payloadId }: PayloadProps) => {
  const [currentAmpIndex, setCurrentAmpIndex] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();

  const changeIndex = () => {
    setCurrentAmpIndex((prevIndex) => (prevIndex + 1) % (amps.length || 1));
  };

  useEffect(() => {
    dispatch(checkAmps());
  }, [dispatch]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (connected) {
      intervalId = setInterval(() => {
        changeIndex();
      }, 2500);
      setCurrentAmpIndex(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [amps, connected]);

  useEffect(() => {
    const currentAmp = amps[currentAmpIndex];

    if (currentAmp > 3) {
      dispatch(
        addAmpNotification({
          message: `${name} Extremely High Current Draw`,
          chargeType: "Amps",
          notificationType: "Danger",
          payloadId: payloadId,
        })
      );
    } else if (currentAmp > 2.5) {
      dispatch(
        addAmpNotification({
          message: `${name} High Current Draw`,
          chargeType: "Amps",
          notificationType: "Warning",
          payloadId: payloadId,
        })
      );
    } else {
      dispatch(removeAmpNotification(payloadId));
    }
  }, [dispatch, currentAmpIndex, payloadId, amps]);

  return (
    <div className="payload-container" style={connected ? {} : disabledStyle}>
      <h1 data-cy="amps" style={{ fontSize: "19px" }}>
        {connected ? amps[currentAmpIndex] : 0} A
      </h1>
      <p>{name} &apos;s Current Draw</p>
    </div>
  );
};
