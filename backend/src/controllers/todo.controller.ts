import type { Request, Response } from "express";
import Todo from "../models/todo.model.js";
import {
  todoUpdateValidation,
  todoValidation,
} from "../validation/todo.validation.js";
import { stripUndefined } from "../utils/stripUndefined.js";
import { error } from "node:console";

export const getTodos = async (_req: Request, res: Response) => {
  const todos = await Todo.find();
  res.status(200).json({
    success: true,
    data: todos,
  });
};

export const createTodo = async (req: Request, res: Response) => {
  const data = req.body;
  const validatedData = todoValidation.parse(data);
  const todo = await Todo.create(stripUndefined(validatedData));
  res.status(201).json({
    success: true,
    data: todo,
  });
};

export const getTodo = async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404).json({
      success: false,
      message: "Todo not found",
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: todo,
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const validData = todoUpdateValidation.parse(data);
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    stripUndefined(validData),
    { new: true, runValidators: true },
  );
  if (!updatedTodo) {
    res.status(404).json({
      success: false,
      message: "Todo with this ID not found",
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: updatedTodo,
  });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) {
    res.status(404).json({
      success: false,
      message: "Todo with this ID not found",
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: deletedTodo,
  });
};
