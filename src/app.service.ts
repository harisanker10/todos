import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { createTodoDto } from './dto/createTodoDto';

export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

@Injectable()
export class AppService {
  private todos: Record<string, Todo> = {};

  getAllTodos(): Todo[] {
    return Object.values(this.todos);
  }

  getTodo(id: string): Todo {
    return this.todos[id];
  }

  markAsCompleted(id: string): Todo {
    this.todos[id].isCompleted = true;
    return this.todos[id];
  }

  addTodo(createTodoDto: createTodoDto) {
    const id = randomUUID();
    const todo: Todo = { id, ...createTodoDto, isCompleted: false };
    this.todos[id] = todo;
    return todo;
  }

  deleteTodo(id: string): Todo {
    const todo = this.todos[id];
    delete this.todos[id];
    return todo;
  }
}
