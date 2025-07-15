import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { TodoItem } from '../model/todo-item/todo-item';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent]
    })
    .compileComponents();

    let item = new TodoItem('Item 1');
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit item\'s id on deletion', () => {
    spyOn(component.deleteEvent, 'emit');
    component.onDelete();
    expect(component.deleteEvent.emit).toHaveBeenCalledWith(component.item.id);
  })

  it('should turn edition mode on when clicking edit icon', () => {
    component.enableEditionMode();
    fixture.detectChanges();

    const elem = fixture.nativeElement as HTMLElement;
    expect(component.isEditing).toEqual(true);
    expect(elem.innerHTML).toContain('input');
  })
});
