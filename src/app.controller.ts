import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService, Todo } from './app.service';
import { createTodoDto } from './dto/createTodoDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTodos(): Todo[] {
    return this.appService.getAllTodos();
  }

  @Post()
  postTodo(@Body() todo: createTodoDto) {
    return this.appService.addTodo(todo);
  }

  @Get(':id')
  getTodo(@Param('id') id: string) {
    console.log({ id });
    return this.appService.getTodo(id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string) {
    return this.appService.markAsCompleted(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.appService.deleteTodo(id);
  }
}
