import cors from "cors";
import express from "express";
import routes from "./routes";

const app = express();
const port = 1337;

app.use(cors());

app.listen(1337, () => {
  console.log(`listening on port ${port}`);
  routes(app);
});
