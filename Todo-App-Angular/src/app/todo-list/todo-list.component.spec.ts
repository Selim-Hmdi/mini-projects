import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoItem } from '../model/todo-item/todo-item';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent]
    })
    .compileComponents();
    
    
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todoItems = [new TodoItem('Item 1')];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show given items', () => {
    const componentElem = fixture.nativeElement as HTMLElement;
    expect(componentElem.innerHTML).toContain(component.todoItems[0].content)
  })

  it('should add new item and emit an event whose value is that new item', () => {
    const item = new TodoItem('Item 2');
    spyOn(component.listUpdated, 'emit');
    component.addItem(item);
    fixture.detectChanges();
    
    const componentElem = fixture.nativeElement as HTMLElement;
    expect(componentElem.innerHTML).toContain(component.todoItems[1].content);
    expect(component.listUpdated.emit).toHaveBeenCalledWith(item);
  })

  it('should delete item from the list by its id', () => {
    component.deleteItem(component.todoItems[0].id);
    expect(component.todoItems.length).toEqual(0);
  })
});
