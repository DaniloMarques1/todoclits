import * as fs from 'fs';

class CommandAction {
  private fileName: String;

  constructor() {
    this.fileName = "todo.json";
    console.log(fs);
  }
  
  public createFolder() {
    fs.mkdirSync("teste");
  }
}

export default CommandAction;
