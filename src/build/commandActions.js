"use strict";
exports.__esModule = true;
var fs = require("fs");
var CommandAction = (function () {
    function CommandAction() {
        this.fileName = "todo.json";
        console.log(fs);
    }
    CommandAction.prototype.createFolder = function () {
        fs.mkdirSync("teste");
    };
    return CommandAction;
}());
exports["default"] = CommandAction;
