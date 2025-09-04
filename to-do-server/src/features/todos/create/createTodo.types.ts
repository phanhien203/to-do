export interface CreateTodoInput {
  title: string;
  description?: string;
  priority?: 'low'|'medium'|'high';
  dueDate?: string;
}
