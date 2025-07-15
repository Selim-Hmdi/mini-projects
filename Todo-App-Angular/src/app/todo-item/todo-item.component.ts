import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TodoItem } from '../model/todo-item/todo-item';
import { CommonModule } from '@angular/common';

export type ItemDragEvent = {
  item: TodoItem,
  event: DragEvent
}

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input({ required: true })
  item!: TodoItem;

  @Input({ transform: booleanAttribute })
  draggable: boolean = false;

  isEditing: boolean = false;

  @Output()
  deleteEvent: EventEmitter<number> = new EventEmitter();

  @Output()
  dragStartEvent: EventEmitter<ItemDragEvent> = new EventEmitter();

  @Output()
  dropEvent: EventEmitter<ItemDragEvent> = new EventEmitter();

  public enableEditionMode(): void {
    this.isEditing = true;

    // Prevent drag event from triggering when we cant to select item's text by holding left click and dragging mouse
    this.draggable = false;
  }

  public cancelEditionMode(): void {
    this.isEditing = false;
  }

  public onEdit(updatedContent: string): void {
    this.item.content = updatedContent;
    this.draggable = true
    this.cancelEditionMode();
  }

  public onClick(e: MouseEvent): void {
    // Clicking icon or input field when in edition mode shouldn't mark item as done
    if((e.target as HTMLElement).tagName === 'DIV') {
      this.item.done = !this.item.done;
    }
  }

  public onDelete(): void {
    this.deleteEvent.emit(this.item.id);
  }

  public onDragStart(ev: DragEvent): void {
    this.dragStartEvent.emit({
      item: this.item,
      event: ev,
    });
  }

  public onDrop(ev: DragEvent): void {
    ev.preventDefault();
    this.dropEvent.emit({
      item: this.item,
      event: ev,
    });
  }
}
