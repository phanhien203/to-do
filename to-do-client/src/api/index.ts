import { Todo } from '@todo/shared';
import baseApi from '../lib/axiosInstance';

export const getTodos = async () => {
  return await baseApi.get('/todos');
};

export const createTodo = async (data: any) => {
  return await baseApi.post('/todos', data);
};

export const updateTodo = async (id: string, data: any) => {
  return await baseApi.put(`/todos/${id}`, data);
};

export const deleteTodo = async (id: string) => {
  return await baseApi.delete(`/todos/${id}`);
};
