//apps/api/src/index.ts

import express from "express";
import { getDeadlinesForUser } from "@myorg/deadlines";

const app = express();

app.get("/deadlines", (req, res) => {
  const deadlines = getDeadlinesForUser();
  res.json(deadlines);
});

app.listen(3001, () => {
  console.log("API running on 3001");
});
