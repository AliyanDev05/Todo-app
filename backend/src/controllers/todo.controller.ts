import type { Request, Response } from "express";
import Todo from "../models/todo.model.js";

export const getTodos = async (_req: Request, res: Response) => {
  const todos = await Todo.find();
  res.status(200).json({
    success: true,
    data: todos,
  });
};

export const createTodo = async (req: Request, res: Response) => {
  const data = req.body;
  const todo = await Todo.create(data);
  res.status(201).json({
    success: true,
    data: todo,
  });
};

export const getTodo = async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: todo,
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(id, data, {
    new: true,
  });
  res.status(200).json({
    success: true,
    data: updatedTodo,
  });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    data: deletedTodo,
  });
};
