import { CreateTodosRequestBody } from '../dto/todo.dto';
import { Todo, TodoModel } from '../models/todo.model';
import { Validator } from '../utils/validator';

export class TodoService {
  constructor() {
  }

  public async createTodo(body: CreateTodosRequestBody): Promise<TodoModel> {

    this.validateCreateTodo(body);
    const { title, description, priority, dueDate } = body;

    const todo = new Todo({
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined
    });
    await todo.save();
    return todo;

  }

  private validateCreateTodo(body: CreateTodosRequestBody) {
    const { title, description, priority, dueDate } = body;
    const titleError = Validator.validate({
      name: 'title',
      isRequired: true,
      value: title
    });


    if (titleError) {
      throw {
        name: 'ValidationError',
        message: titleError
      };
    }

  }
}
