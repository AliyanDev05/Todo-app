import express from "express";
import cors from "cors";
import todoRoute from "./routes/todo.route.js";
import { errorMiddleware } from "./middlewares/todo.middleware.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("hello Aliyan");
});

app.use("/api/todos", todoRoute);

//middlewares
app.use(errorMiddleware);

export default app;
