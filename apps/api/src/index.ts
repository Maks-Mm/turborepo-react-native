//apps/api/src/index.ts

import dotenv from "dotenv";
dotenv.config({ path: "../../packages/db/.env" });
import express from "express";
import deadlinesRouter from "./routes/deadlines.js";
import dashboardRouter from "./routes/dashboard.js";
import documentsRouter from "./routes/documents.js";
import billingRouter from "./routes/billing.js";
import consultingRouter from "./routes/consulting.js";
import messagesRouter from "./routes/messages.js";
//import updatesRouter from "./routes/updates.js";
import taxRouter from "./routes/tax.js";;

const app = express();

app.use(express.json());

app.use("/api/taxes", taxRouter);
app.use("/api/deadlines", deadlinesRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/documents", documentsRouter);
app.use("/api/billing", billingRouter);
app.use("/api/consulting", consultingRouter);
app.use("/api/messages", messagesRouter);
//app.use("/api/updates", updatesRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});