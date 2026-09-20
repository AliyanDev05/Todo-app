import { Router } from "express";
import {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import { registerUser } from "../controllers/register.controller.js";

const router = Router();

router.route("/").get(getTodos).post(createTodo);
router.route("/:id").get(getTodo).patch(updateTodo).delete(deleteTodo);
router.route("/register").post(registerUser);

export default router;
