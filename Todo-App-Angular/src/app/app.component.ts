import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItem } from './model/todo-item/todo-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items: TodoItem[] = [];
  textInput = '';

  public addItem(): void {
    this.items.push(new TodoItem(this.textInput));
    this.textInput = ''; 
  }
}
