import { Response } from "express";

export const voltageGenerator = async (res: Response) => {
  const maxVoltage = 30;
  const steps = 8;
  const voltages: number[] = [];

  const updateVoltage = (voltage: number): void => {
    voltages.push(Math.floor(voltage));
  };

  for (let i = 1; i <= steps; i++) {
    const voltage = (i / steps) * maxVoltage;
    updateVoltage(voltage);
  }

  for (let i = steps - 1; i >= 1; i--) {
    const voltage = (i / steps) * maxVoltage;
    updateVoltage(voltage);
  }
  res.send(voltages);
};
