import { CSSProperties, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAmps } from "../state/payloadSlice";
import { AppDispatch } from "../state/store";
import { notificationSupplier } from "../state/notificationsSlice";

type PayloadProps = {
  connected: boolean;
  name: string;
  amps: number[];
};

const disabledStyle: CSSProperties = {
  opacity: "0.5",
  pointerEvents: "none",
};

export const Payload = ({ name, amps, connected }: PayloadProps) => {
  const [currentAmpIndex, setCurrentAmpIndex] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();

  const changeIndex = () => {
    setCurrentAmpIndex((prevIndex) => (prevIndex + 1) % (amps.length || 1));
  };

  useEffect(() => {
    dispatch(checkAmps());
  }, []);

  useEffect(() => {
    if (connected) {
      var intervalId = setInterval(() => {
        changeIndex();
      }, 2500);
      setCurrentAmpIndex(0);
    }

    return () => clearInterval(intervalId);
  }, [amps, connected]);

  useEffect(() => {
    if (amps[currentAmpIndex] > 3) {
      dispatch(
        notificationSupplier({
          message: "Extremely High Current Draw",
          chargeType: "Amps",
          notificationType: "Danger",
        })
      );
    } else if (amps[currentAmpIndex] > 2.5) {
      dispatch(
        notificationSupplier({
          message: "High Current Draw",
          chargeType: "Amps",
          notificationType: "Warning",
        })
      );
    } else {
      dispatch(
        notificationSupplier({
          message: null,
          chargeType: "Amps",
          notificationType: null,
        })
      );
    }
  }, [dispatch, currentAmpIndex, amps]);

  return (
    <div className="payload-container" style={connected ? {} : disabledStyle}>
      <h1 data-cy="amps" style={{ fontSize: "19px" }}>
        {connected ? amps[currentAmpIndex] : 0} A
      </h1>
      <p>{name} &apos;s Current Draw</p>
    </div>
  );
};
