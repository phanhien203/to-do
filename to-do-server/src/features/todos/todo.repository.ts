import { TodoModel } from './todo.model';
import { CreateTodoInput } from './create/createTodo.types';
import { UpdateTodoInput } from './update/updateTodo.types';
import { ClientSession } from 'mongoose';

export class TodoRepository {
  async create(data: CreateTodoInput, session?: ClientSession) {
    const [doc] = await TodoModel.create([data], { session });
    return doc;
  }

  async findById(id: string) {
    return TodoModel.findById(id).exec();
  }

  async findAll() {
    return TodoModel.find().sort({ createdAt: -1 }).exec();
  }

  async update(id: string, data: UpdateTodoInput) {
    return TodoModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return TodoModel.findByIdAndDelete(id).exec();
  }
}
