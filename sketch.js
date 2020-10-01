let grid = [];
let palette = [];
let w = 3;
let h = 20;
let startHue = 60;
let empty;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function setup() {
    createCanvas(300,300);
    colorMode(HSL);

    // create color palette
    let colorSteps = floor(w*h/2);
    let colorProgression = 100/colorSteps;
    let paletteColor = color(startHue, 100, 50);
    for (let i = 0; i < colorSteps; i++) {
        palette.push(paletteColor);
        let newColor = color(hue(paletteColor),saturation(paletteColor)-colorProgression,lightness(paletteColor));
        paletteColor = newColor;
    }
    if (colorSteps % 2 != 0) {
        palette.push(paletteColor);
    }
    paletteColor = color((startHue+180) % 360, colorProgression, 50);    
    for (let i = 0; i < colorSteps; i++) {
        palette.push(paletteColor);
        let newColor = color(hue(paletteColor),saturation(paletteColor)+colorProgression,lightness(paletteColor));
        paletteColor = newColor;
    }   

    // init grid
    empty = color(0,0,100);
    for (let i = 0; i < w; i++) {
        grid[i] = [];
        for (let j = 0; j < h; j++) {
            grid[i][j] = empty;
        }
    }

    // paint grid
    let emptyCells = [];
    let lastColor = palette.splice(0,1)[0];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == empty) {
                emptyCells.push(createVector(i,j));
            }
        }
    }
    while (emptyCells.length > 0) {
        let start = emptyCells[floor(random(emptyCells.length))];
        let dir = floor(random(4));
        let cursor = createVector(start.x,start.y,dir);
        grid[cursor.x][cursor.y] = lastColor;   
        lastColor = paint(cursor,grid);
        emptyCells = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == empty) {
                    emptyCells.push(createVector(i,j));
                }
            }
        }        
    }
}

function draw() {
    background(255);
    //draw grid
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            noStroke();
            fill(grid[i][j]);
            rect(i*width/w,j*height/h,width/w,height/h);
        }
    }
    noLoop();
} 

function paint(cursor,grid) {
    let c = nextCursor(cursor);
    if (c && grid[c.x][c.y] == empty) {
        grid[c.x][c.y] = palette.splice(0,1)[0];
    } else {
        c = newDirCursor(cursor,grid);
    } 
    if (c) {
        return paint(c,grid);
    } else {
        return grid[cursor.x][cursor.y];
    }
}

function newDirCursor(cursor,grid) {
    let newDir = [];
    // up
    if (cursor.y > 0 && grid[cursor.x][cursor.y-1] == empty && cursor.z != DOWN) newDir.push(UP);
    // right
    if (cursor.x < w - 1 && grid[cursor.x+1][cursor.y] == empty && cursor.z != LEFT) newDir.push(RIGHT);
    // down
    if (cursor.y < h - 1 && grid[cursor.x][cursor.y+1] == empty && cursor.z != UP) newDir.push(DOWN);
    // left
    if (cursor.x > 0 && grid[cursor.x-1][cursor.y] == empty && cursor.z != RIGHT) newDir.push(LEFT);
    if (newDir.length == 0) {
        return false;
    } else {
        return createVector(cursor.x,cursor.y,newDir[floor(random(newDir.length))]);
    }    
}

function nextCursor(currentCursor) {
    let c = createVector(currentCursor.x,currentCursor.y,currentCursor.z);
    switch(c.z) {
        case UP:
            if (c.y > 0) c.y--;
            break;
        case RIGHT:
            if (c.x < w - 1) c.x++;
            break;
        case DOWN:
            if (c.y < h - 1) c.y++;
            break;
        case LEFT:
            if (c.x > 0) c.x--;
            break;
    }
    if (c.dist(currentCursor) == 0) {
        return false;
    } else {
        return c;
    }
}