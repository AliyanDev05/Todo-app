import { Router } from "express";
import getTodos from "../controllers/todo.controller.js";

const router = Router();

router.route("/api/todos").get(getTodos);

export default router;
