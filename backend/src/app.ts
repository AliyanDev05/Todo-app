import express from "express";
import cors from "cors";

const app = express();
app.use(express());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("hello Aliyan");
});

export default app;
