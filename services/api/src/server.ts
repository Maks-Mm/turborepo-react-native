//services/api/src/server.ts

import express from "express";
import cors from "cors";
import updatesRoute from "./routes/updates";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/updates", updatesRoute);

app.listen(3001, () => {
  console.log("API running on port 3001");
});