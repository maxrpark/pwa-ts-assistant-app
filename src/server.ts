import { Request, Response, Application } from "express";
import express from "express";

// Initialize Express
const app: Application = express();

// Create GET request
app.get("/", (req: Request, res: Response) => {
  res.send("Express on Vercel");
});

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
