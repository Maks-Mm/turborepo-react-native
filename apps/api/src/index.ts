//apps/api/src/index.ts

import express from 'express';
import deadlinesRouter from './routes/deadlines.js';
import dashboardRouter from './routes/dashboard.js'; // 👈 NEU

const app = express();

app.use(express.json());

// Routes
app.use('/api/deadlines', deadlinesRouter);
app.use('/api/dashboard', dashboardRouter); // 👈 NEU

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});