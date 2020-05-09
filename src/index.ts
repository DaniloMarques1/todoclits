import CommandActions from './CommandActions';
import Commands from './Commands';

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
      const arg = process.argv[3];
      actions.help(arg);
      break;
    }
    default:
      console.log("Please, type a valid argument");
      break;
  }
}

main();
