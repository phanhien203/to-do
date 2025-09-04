import { TodoRepository } from '../todo.repository';
import { UpdateTodoInput } from './updateTodo.types';
import { NotFoundError } from '../../../shared/errors/notFoundError';

export class UpdateTodoService {
  constructor(private repo = new TodoRepository()) {}

  async execute(id: string, input: UpdateTodoInput) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new NotFoundError(`Todo với id=${id} không tồn tại`);
    return this.repo.update(id, input);
  }
}
