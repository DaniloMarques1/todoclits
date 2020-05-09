"use strict";
exports.__esModule = true;
var fs = require("fs");
var Commands = (function () {
    function Commands() {
    }
    Commands.ADD = 'add';
    Commands.REMOVE = 'remove';
    Commands.LIST = 'list';
    Commands.HELP = 'help';
    return Commands;
}());
var CommandActions = (function () {
    function CommandActions() {
        this.fileName = __dirname + "/.todo";
        this.todos = this.readTodos();
    }
    CommandActions.prototype.addTodo = function (title) {
        this.todos.push(title);
        this.saveTodos();
    };
    CommandActions.prototype.removeTodo = function (index) {
        this.todos.splice(index - 1, 1);
        this.saveTodos();
    };
    CommandActions.prototype.listTodo = function () {
        if (this.todos.length === 0) {
            console.log("You have not added anything yet. Use the add command to add a new todo");
            return;
        }
        console.log("======================");
        var i = 1;
        for (var _i = 0, _a = this.todos; _i < _a.length; _i++) {
            var todo = _a[_i];
            console.log(i + "- " + todo);
            i++;
        }
        console.log("======================");
    };
    CommandActions.prototype.help = function () {
        throw new Error("Not implemented");
    };
    CommandActions.prototype.saveTodos = function () {
        var todoStr = JSON.stringify(this.todos);
        fs.writeFileSync(this.fileName, todoStr);
    };
    CommandActions.prototype.readTodos = function () {
        try {
            var todoStr = fs.readFileSync(this.fileName, { encoding: 'utf-8', flag: 'r' });
            return JSON.parse(todoStr);
        }
        catch (e) {
            return new Array();
        }
    };
    return CommandActions;
}());
function main() {
    console.log(__dirname);
    var actions = new CommandActions();
    var _a = process.argv, command = _a[2];
    if (!command) {
        console.log("You have to give one argument, type todo help to see the list");
        return;
    }
    switch (command) {
        case Commands.ADD: {
            var title = getTodo(process.argv.slice(3));
            actions.addTodo(title);
            break;
        }
        case Commands.REMOVE: {
            var index = process.argv[3];
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
        case Commands.HELP: {
            console.log("Help");
            break;
        }
        default:
            console.log("Please, type a valid argument");
            break;
    }
}
function getTodo(arg) {
    return arg.join(" ");
}
main();
