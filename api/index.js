import express from "express";
const app = express();
app.get("/api", (req, res) => {
    res.json({ msg: "Express on Vercel" });
});
// app.listen(5000, () => {
//   console.log("Running on port 5000.");
// });
export default app;
