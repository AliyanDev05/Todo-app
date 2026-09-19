import type { Request, Response } from "express";
import Todo from "../models/todo.model.js";

const getTodos = async (_req: Request, res: Response) => {
  const todos = await Todo.find();
  res.status(200).json({
    success: true,
    data: todos,
  });
};

export default getTodos;
