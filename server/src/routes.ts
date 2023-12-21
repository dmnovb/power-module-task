import { Express, Request, Response } from "express";
import { voltageGenerator } from "./controller/voltage.controller";
import { ampGenerator } from "./controller/amp.controller";

const routes = (app: Express) => {
  app.get("/voltage", async (req: Request, res: Response) => {
    await voltageGenerator(res);
  });
  app.get("/amps", async (req: Request, res: Response) => {
    await ampGenerator(res);
  });
};

export default routes;
