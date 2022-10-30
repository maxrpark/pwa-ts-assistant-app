import express from "express";
const app = express();
app.get("/api", (req, res) => {
    res.json({ data: [{ _id: 2123123, task: "make it work" }] });
});
app.listen(5000, () => {
    console.log("Running on port 5000.");
});
export default app;
