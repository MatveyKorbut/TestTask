class CommandDecoder {
  constructor(commandLine) {
    this.commands = [];
    this.validateCommands(commandLine);
    this.drawingTool = new Draw(this.canvasCommand.width, this.canvasCommand.height);
  }

  draw() {
    let outputText = this.drawingTool.draw();
    for (let i = 0; i < this.commands.length; i++) {
      var command = this.commands[i];
      if (command.type == 'L') {
        this.drawingTool.bufferLine(command.x1, command.y1, command.x2, command.y2, 'x');
        outputText += this.drawingTool.draw();
      } else if (command.type == 'R') {
        this.drawingTool.bufferRectangle(command.x1, command.y1, command.x2, command.y2, 'x');
        outputText += this.drawingTool.draw();
      } else if (command.type == 'B') {
        this.drawingTool.bufferBucketFill(command.x, command.y, command.symbol);
        outputText += this.drawingTool.draw();
      }
    }
    return outputText;
  }

  validateCommands(commandLine) {
    let commands = commandLine.split('\n');
    commands = commands.filter(function (n) { return n });
    this.validateCanvasCommand(commands[0]);
    for (let i = 1; i < commands.length; i++) {
      var command = commands[i];
      let commandType = command[0];
      if (commandType == 'L' || commandType == 'R') {
        let shapeCommand = this.formatShapeCommand(command);
        this.commands.push(shapeCommand);
      }
      else if (commandType == 'B') {
        let bucketFillCommand = this.formatBucketFillCommand(command);
        this.commands.push(bucketFillCommand);
      } else {
        alert('Invalid command. Look at the commands and fix input.txt');
      }
    }
  }

  validateCanvasCommand(command) {
    let commandSplitted = command.split(' ');
    if (command[0] !== 'C') {
      alert('The first command must be C width height');
    }
    this.canvasCommand = {
      width: +(commandSplitted[1]),
      height: +(commandSplitted[2])
    };
    if (this.canvasCommand.width < 1 || this.canvasCommand.height < 1) {
      alert('The canvas parameters must be a positive number');
    }
  }

  formatShapeCommand(command) {
    let commandSplitted = command.split(' ');
    return {
      type: command[0],
      x1: +(commandSplitted[1]),
      y1: +(commandSplitted[2]),
      x2: +(commandSplitted[3]),
      y2: +(commandSplitted[4])
    };
  }

  formatBucketFillCommand(command) {
    let commandSplitted = command.split(' ');
    return {
      type: 'B',
      x: +(commandSplitted[1]),
      y: +(commandSplitted[2]),
      symbol: commandSplitted[3]
    }
  }

}
