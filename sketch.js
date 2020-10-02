let grid = [];
let palette = [];
let w = 4;
let h = 20;

const RED = 0;
const YELLOW = 60;
const GREEN = 120;
const CYAN = 180;
const VIOLET = 240;
const MAGENTA = 300;

let padding = 30;
let margin = 60;
let widthCanvas = 300;
let heightCanvas = 600;
let buttonSize = 50;
let buttonVMargin = 20;
let buttonHMargin = 24;
let selectedColor = RED;

let startHue = RED;
let empty;
let canvas;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function setup() {
    createCanvas(widthCanvas+padding*2+margin*2,heightCanvas+padding*2+margin*2+buttonSize+buttonVMargin*2);
    colorMode(HSL);
    generate();

}

function generate() {
    canvas = createGraphics(widthCanvas+margin*2,heightCanvas+margin*2);
    palette = [];

    // create color palette
    let colorSteps;
    if (startHue < 40) {            // reds
        colorSteps = floor(w*h*1/3);
    } else if (startHue < 70) {     // yellows
        colorSteps = floor(w*h*1/4);
    } else if (startHue < 130) {    // greens
        colorSteps = floor(w*h*1/2);
    } else if (startHue < 210) {    // cyans
        colorSteps = floor(w*h*2/3);
    } else if (startHue < 300) {    // violets
        colorSteps = floor(w*h*3/4);
    } else {                        // magentas
        colorSteps = floor(w*h*1/2);
    }

    let colorProgression = 100/colorSteps;
    let paletteColor = color(startHue, 100, 50);
    for (let i = 0; i < colorSteps; i++) {
        palette.push(paletteColor);
        let newColor = color(hue(paletteColor),saturation(paletteColor)-colorProgression,lightness(paletteColor));
        paletteColor = newColor;
    }
    palette.push(paletteColor);
    colorSteps = w*h - colorSteps;
    colorProgression = 100/colorSteps;
    paletteColor = color((startHue+180) % 360, colorProgression, 50);    
    for (let i = 0; i < colorSteps; i++) {
        palette.push(paletteColor);
        let newColor = color(hue(paletteColor),saturation(paletteColor)+colorProgression,lightness(paletteColor));
        paletteColor = newColor;
    }   
    palette.push(paletteColor);

    // init grid
    grid = [];
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
    background('#d3d3d3');
    
    canvas.background('#ffffff');    
    canvas.push();
    //draw grid
    canvas.translate(margin,margin);
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            canvas.stroke(grid[i][j]);
            canvas.fill(grid[i][j]);
            canvas.rect(i*widthCanvas/w,j*heightCanvas/h,widthCanvas/w,heightCanvas/h);
        }
    }
    canvas.pop();
    image(canvas,padding,padding);

    push();
    noStroke();
    ellipseMode(CORNER);
    push();
    if (selectedColor == RED) {
        strokeWeight(10);
        stroke(0,0,70);
    }    
    fill(0,100,50);
    ellipse(padding,padding+margin*2+heightCanvas+buttonVMargin,buttonSize,buttonSize);
    pop();
    push();
    if (selectedColor == YELLOW) {
        strokeWeight(10);
        stroke(0,0,70);
    }    
    fill(60,100,50);
    ellipse(padding+buttonSize*1+buttonHMargin*1,padding+margin*2+heightCanvas+buttonVMargin,buttonSize,buttonSize);
    pop();
    push();
    if (selectedColor == GREEN) {
        strokeWeight(10);
        stroke(0,0,70);
    }    
    fill(120,100,50);
    ellipse(padding+buttonSize*2+buttonHMargin*2,padding+margin*2+heightCanvas+buttonVMargin,buttonSize,buttonSize);
    pop();
    push();
    if (selectedColor == CYAN) {
        strokeWeight(10);
        stroke(0,0,70);
    }    
    fill(180,100,50);
    ellipse(padding+buttonSize*3+buttonHMargin*3,padding+margin*2+heightCanvas+buttonVMargin,buttonSize,buttonSize);
    pop();
    push();
    if (selectedColor == VIOLET) {
        strokeWeight(10);
        stroke(0,0,70);
    }    
    fill(240,100,50);
    ellipse(padding+buttonSize*4+buttonHMargin*4,padding+margin*2+heightCanvas+buttonVMargin,buttonSize,buttonSize);
    pop();
    push();
    if (selectedColor == MAGENTA) {
        strokeWeight(10);
        stroke(0,0,70);
    }
    fill(300,100,50);    
    ellipse(padding+buttonSize*5+buttonHMargin*5,padding+margin*2+heightCanvas+buttonVMargin,buttonSize,buttonSize);
    pop();
} 

function mouseClicked() {
    if (mouseY > padding+canvas.height+buttonVMargin && mouseY < padding+canvas.height+buttonVMargin+buttonSize) {
        if (mouseX > padding && mouseX < padding + buttonSize) {
            selectedColor = startHue = RED;
            generate();
        } else if (mouseX > padding+buttonSize*1+buttonHMargin*1 && mouseX < (padding+buttonSize*1+buttonHMargin*1) + buttonSize) {
            selectedColor = startHue = YELLOW;
            generate();
        } else if (mouseX > padding+buttonSize*2+buttonHMargin*2 && mouseX < (padding+buttonSize*2+buttonHMargin*2) + buttonSize) {
            selectedColor = startHue = GREEN;
            generate();
        } else if (mouseX > padding+buttonSize*3+buttonHMargin*3 && mouseX < (padding+buttonSize*3+buttonHMargin*3) + buttonSize) {
            selectedColor = startHue = CYAN;
            generate();
        } else if (mouseX > padding+buttonSize*4+buttonHMargin*4 && mouseX < (padding+buttonSize*4+buttonHMargin*4) + buttonSize) {
            selectedColor = startHue = VIOLET;
            generate();
        } else if (mouseX > padding+buttonSize*5+buttonHMargin*5 && mouseX < (padding+buttonSize*5+buttonHMargin*5) + buttonSize) {
            selectedColor = startHue = MAGENTA;
            generate();
        }          
    } else if (mouseX > padding && mouseX < padding + canvas.width && mouseY > padding && mouseY < padding + canvas.height) {
        save(canvas,'complementaryColors.png');
    }

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