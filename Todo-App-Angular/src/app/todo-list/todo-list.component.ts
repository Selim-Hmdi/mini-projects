import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../model/todo-item/todo-item';
import { TodoItemComponent, ItemDragEvent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  @Input()
  todoItems: TodoItem[] = []

  @Output()
  listUpdated = new EventEmitter<TodoItem>;

  private _itemDraggedId = 0

  dragStartHandler(ev: ItemDragEvent): void {
    this._itemDraggedId = ev.item.id;
  }

  dropHandler(ev: ItemDragEvent): void {
    const draggedIndex = this.todoItems.findIndex(item => item.id === this._itemDraggedId)
    const targetIndex = this.todoItems.findIndex(item => item.id === ev.item.id)

    // Swap dragged item with the one we dropped on
    const tmp = this.todoItems[draggedIndex]
    this.todoItems[draggedIndex] = this.todoItems[targetIndex];
    this.todoItems[targetIndex] = tmp;
  }
  
  public addItem(item: TodoItem) {
    this.todoItems.push(item);
    this.listUpdated.emit(item);
  }

  public deleteItem(id: number) {
    const index = this.todoItems.findIndex(item => item.id === id);
    this.todoItems.splice(index, 1);
  }

}
