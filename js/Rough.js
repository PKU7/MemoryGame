   var Tile = function (x, y, figures) {
        this.x = x;
        this.y = y;
        this.figures = figures;
        this.width = 75;
    };

    Tile.prototype.drawFaceUp = function () {
        fill(214, 247, 202);
        strokeWeight(2);
        rect(this.x, this.y, this.width, this.width, 10);
        image(this.face, this.x, this.y, this.width, this.width);
        this.isFaceUp = true;
    };
    // Global config
    var NUM_COLS = 5;
    var NUM_ROWS = 1;
