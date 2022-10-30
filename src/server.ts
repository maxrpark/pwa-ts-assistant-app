import { Request, Response, Application } from "express";
import express from "express";

const app: Application = express();

app.get("/api", (req: Request, res: Response) => {
  res.send("Express on Vercel");
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;
