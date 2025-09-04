export interface UpdateTodoInput {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  priority?: 'low'|'medium'|'high';
  dueDate?: string;
}
