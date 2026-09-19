import express from "express";
import cors from "cors";
import todoRoute from "./routes/todo.route.js";

const app = express();
app.use(express());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("hello Aliyan");
});

app.use("/", todoRoute);

export default app;
