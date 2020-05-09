import * as fs from 'fs';
import HelperString from './HelperString';
import Commands from './Commands';

class CommandActions {
  private todos: string[];
  private fileName: string;

  constructor() {
    this.fileName = `${__dirname}/.todo`;
    this.todos = this.readTodos();
  }

  addTodo(title: string): void { 
    this.todos.push(title);
    this.saveTodos();
  }

  removeTodo(index: number): void { 
    this.todos.splice(index - 1, 1);
    this.saveTodos();
  }

  listTodo(): void { 
    if (this.todos.length === 0) {
      console.log("You have not added anything yet. Use the add command to add a new todo");
      return;
    }
    this.drawLine();
    let i = 1;
    for (const todo of this.todos) {
      console.log(`${i}- ${todo}`);
      i++;
    }
    this.drawLine();
  }

  help(command: string): void {
    this.drawLine();
    switch(command) {
      case Commands.ADD: {
        console.log(`todo add - ${HelperString.HELPER_ADD}`);
        break;
      }
      case Commands.REMOVE: {
        console.log(`todo remove - ${HelperString.HELPER_REMOVE}`);
        break;
      }
      case Commands.LIST: {
        console.log(`todo list - ${HelperString.HELPER_LIST}`);
        break;
      } 
      case Commands.CLEAN: {
        console.log(`todo clean - ${HelperString.HELPER_CLEAN}`);
        break;
      }
      default: {
        console.log(`todo add - ${HelperString.HELPER_ADD}`);
        console.log(`todo remove - ${HelperString.HELPER_REMOVE}`);
        console.log(`todo list - ${HelperString.HELPER_LIST}`);
        console.log(`todo clean - ${HelperString.HELPER_CLEAN}`);
        console.log(`todo help - ${HelperString.HELPER_HELP}`);
      }
    }
    this.drawLine();
  }

  clean(): void {
    this.todos = new Array<string>();
    this.saveTodos();
  }

  private saveTodos(): void {
    const todoStr = JSON.stringify(this.todos);
    fs.writeFileSync(this.fileName, todoStr);
  }

  private readTodos(): Array<string> {
    try {
      const todoStr = fs.readFileSync(this.fileName, {encoding: 'utf-8', flag: 'r'});
      return JSON.parse(todoStr);
    } catch(e) {
      return new Array<string>();
    }
  }

  private drawLine() {
    console.log("======================================================");
  }
}

export default CommandActions;
