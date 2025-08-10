enum PRIORITY_ENUM {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2
}

export interface CreateTodosRequestBody {
  title: string;
  description: string;
  priority: PRIORITY_ENUM;
  dueDate: Date;
}
