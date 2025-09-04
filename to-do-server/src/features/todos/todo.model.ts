import mongoose, { Document, Schema } from 'mongoose';

export interface TodoDocument extends Document {
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<TodoDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const TodoModel = mongoose.model<TodoDocument>('Todo', TodoSchema);
