import Todo from "../models/todo.model.js";
import {
  todoUpdateValidation,
  todoValidation,
} from "../validation/todo.validation.js";
import { stripUndefined } from "../utils/stripUndefined.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/async-handler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getTodos = asyncHandler(async (_req, res) => {
  const todos = await Todo.find();
  const response = new ApiResponse(200, todos);
  res.status(response.statusCode).json(response);
});

export const createTodo = asyncHandler(async (req, res) => {
  const data = req.body;
  const validatedData = todoValidation.parse(data);
  const todo = await Todo.create(stripUndefined(validatedData));
  const response = new ApiResponse(201, todo);
  res.status(response.statusCode).json(response);
});

export const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    throw new ApiError(404, "Todo with this ID not found");
  }
  const response = new ApiResponse(200, todo);
  res.status(response.statusCode).json(response);
});

export const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const validData = todoUpdateValidation.parse(data);
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    stripUndefined(validData),
    { new: true, runValidators: true },
  );
  if (!updatedTodo) {
    throw new ApiError(404, "Todo with this ID not found");
  }
  const response = new ApiResponse(200, updatedTodo);
  res.status(response.statusCode).json(response);
});

export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) {
    throw new ApiError(404, "Todo with this ID not found");
  }
  const response = new ApiResponse(200, deletedTodo);
  res.status(response.statusCode).json(response);
});
