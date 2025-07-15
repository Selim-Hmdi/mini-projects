export class TodoItem {
  content: string;
  done: boolean;
  id: number;
  static sequenceId = 1; // There's no data persistence so I use in memory auto-increment id
  
  constructor(content: string) {
    this.content = content;
    this.id = TodoItem.sequenceId++;
    this.done = false;
  }
}
