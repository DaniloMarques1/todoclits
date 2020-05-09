import * as fs from 'fs';

class Commands {
  static ADD = 'add'; 
  static REMOVE = 'remove'; 
  static LIST = 'list'; 
  static HELP = 'help'; 
  static CLEAN = 'clean';
}

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
    console.log("======================");
    let i = 1;
    for (const todo of this.todos) {
      console.log(`${i}- ${todo}`);
      i++;
    }
    console.log("======================");
  }

  help(): void { 
    //TODO: implement
    throw new Error("Not implemented");
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
}


function main() {
  const actions = new CommandActions();
  const [,, command] = process.argv;
  if (!command) {
    console.log("You have to give one argument, type todo help to see the list");
    return;
  }

  switch (command) {
    case Commands.ADD: {
      const title = process.argv.slice(3).join(" ");
      actions.addTodo(title);
      break;
    }
    case Commands.REMOVE: {
      const index = process.argv[3];
      if (!index) {
        console.log("Please type the number of the task you want to remove");
        break;
      }
      actions.removeTodo(Number(index));
      break;
    }
    case Commands.LIST: {
      actions.listTodo();
      break;
    }
    case Commands.CLEAN: {
      actions.clean();
      break;
    }
    case Commands.HELP: {
      actions.help();
      break;
    }
    default:
      console.log("Please, type a valid argument");
      break;
  }
}

main();
