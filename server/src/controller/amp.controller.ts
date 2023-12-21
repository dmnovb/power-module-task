import { Response } from "express";

export const ampGenerator = async (res: Response) => {
  const maxAmps = 4;
  const steps = 8;
  const amps: number[] = [];

  const updateVoltage = (amp: number): void => {
    amps.push(Number(amp.toFixed(2)));
  };

  for (let i = 1; i <= steps; i++) {
    const voltage = (i / steps) * maxAmps;
    updateVoltage(voltage);
  }

  for (let i = steps - 1; i >= 1; i--) {
    const voltage = (i / steps) * maxAmps;
    updateVoltage(voltage);
  }
  res.send(amps);
};
