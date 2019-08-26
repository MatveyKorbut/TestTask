class Draw {
  constructor(width, height) {
    this.points = [];
    this.canvasHeight = height + 1;
    this.canvasWidth = width + 1;
    while (this.points.push([]) <= this.canvasHeight);
    this.bufferCanvas(width, height);
  }

  bufferCanvas(width, height) {
    let x1 = 0;
    let y1 = 0;
    let x2 = width + 1;
    let y2 = height + 1;
    this.bufferLine(x1, y1, x1, y2, '|', true);
    this.bufferLine(x2, y1, x2, y2, '|', true);
    this.bufferLine(x1, y1, x2, y1, '-', true);
    this.bufferLine(x1, y2, x2, y2, '-', true);
  }

  bufferLine(x1, y1, x2, y2, character, canvas) {
    if (!canvas) {
      this.validateCoordinate(x1, y1);
      this.validateCoordinate(x2, y2);
    }
    if (x1 == x2) {
      //vertical
      if (y1 > y2) {
        let _y1 = y1;
        y1 = y2;
        y2 = _y1;
      }
      for (let i = y1; i <= y2; i++) {
        this.points[i][x1] = character;
      }
    } else if (y1 == y2) {
      //horizontal
      if (x1 > x2) {
        let _x1 = x1;
        x1 = x2;
        x2 = _x1;
      }
      for (let i = x1; i <= x2; i++) {
        this.points[y1][i] = character;
      }
    } else {
      alert('The coordinates do not form a straight line.');
    }
  }

  bufferRectangle(x1, y1, x2, y2, character) {
    this.bufferLine(x1, y1, x2, y1, character);
    this.bufferLine(x1, y2, x2, y2, character);
    this.bufferLine(x1, y1, x1, y2, character);
    this.bufferLine(x2, y1, x2, y2, character);
  }

  bufferBucketFill(x, y, newColor) {
    this.validateCoordinate(x, y);
    let currentColor = this.points[y][x];
    if (currentColor === newColor) {
      return;
    }
    this._bufferBucketFill(x, y, currentColor, newColor);
  }

  _bufferBucketFill(x, y, currentColor, newColor) {
    if (currentColor !== this.points[y][x]) {
      return;
    }
    this.points[y][x] = newColor;
    this._bufferBucketFill(x, y + 1, currentColor, newColor);
    this._bufferBucketFill(x + 1, y, currentColor, newColor);
    this._bufferBucketFill(x, y - 1, currentColor, newColor);
    this._bufferBucketFill(x - 1, y, currentColor, newColor);
  }

  draw() {
    let block = '';
    for (let y = 0; y <= this.canvasHeight; y++) {
      for (let x = 0; x <= this.canvasWidth; x++) {
        var node = this.points[y][x];
        block += node || ' ';
      }
      block += '\n';
    }
    return block;
  }

  validateCoordinate(x, y) {
    if (x < 1 || y < 1 || x >= this.canvasWidth || y >= this.canvasHeight) {
     alert('Invalid coordinates. The coordinates must be pointed inside the canvas');
    }
  }

}
