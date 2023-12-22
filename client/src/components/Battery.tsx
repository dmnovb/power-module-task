import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { checkVoltage } from "../state/batterySlice";
import { notificationSupplier } from "../state/notificationsSlice";

type BatteryProps = {
  name: string;
  voltage: number[];
};

export const Battery = ({ name, voltage }: BatteryProps) => {
  const [currentVoltageIndex, setCurrentVoltageIndex] = useState<number>(0);

  const dispatch: AppDispatch = useDispatch();

  const changeIndex = () => {
    setCurrentVoltageIndex(
      (prevIndex) => (prevIndex + 1) % (voltage.length || 1)
    );
  };

  useEffect(() => {
    dispatch(checkVoltage());
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      changeIndex();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [voltage]);

  useEffect(() => {
    if (voltage[currentVoltageIndex] < 18) {
      dispatch(
        notificationSupplier({
          message: "Low Voltage",
          notificationType: "Danger",
          chargeType: "Voltage",
        })
      );
    } else {
      dispatch(
        notificationSupplier({
          message: null,
          notificationType: null,
          chargeType: "Voltage",
        })
      );
    }
  }, [dispatch, currentVoltageIndex, voltage]);

  return (
    <div className="battery-container">
      <h1 data-cy="voltage">{voltage[currentVoltageIndex]} V</h1>
      <p>{name} Voltage</p>
    </div>
  );
};
