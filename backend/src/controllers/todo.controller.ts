import Todo from "../models/todo.model.js";
import {
  todoUpdateValidation,
  todoValidation,
} from "../validation/todo.validation.js";
import { stripUndefined } from "../utils/stripUndefined.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/async-handler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import queryValidation from "../validation/query.validation.js";
import type { QueryFilter, SortOrder } from "mongoose";

export const getTodos = asyncHandler(async (req, res) => {
  const { page, limit, completed, search, sort } = queryValidation.parse(
    req.query,
  );
  const filter: QueryFilter<typeof Todo> = {};
  if (completed !== undefined) {
    filter.completed = completed;
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  let sortOptions: Record<string, SortOrder> = { createdAt: -1 };
  if (sort) {
    const field = sort.replace("-", "");
    const direction = sort.startsWith("-") ? -1 : 1;
    sortOptions = {
      [field]: direction,
    };
  }
  const skip = (page - 1) * limit;
  const totalTodos = await Todo.countDocuments(filter);
  const totalPages = Math.ceil(totalTodos / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  const todos = await Todo.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);
  const response = new ApiResponse(200, {
    todos,
    pagination: {
      totalPages,
      hasNextPage,
      hasPreviousPage,
      currentPage: page,
      limit,
    },
  });
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
