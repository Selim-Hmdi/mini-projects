import { Injectable } from '@angular/core';
import { TodoItem } from '../../model/todo-item/todo-item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  public save(todo: TodoItem): Observable<void> {
    return of(void 0);
  }
}
