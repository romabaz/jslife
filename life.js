var p_canvas, p_context 
var rect_size = 5
var world

//draw single lifeform
function drawRect(x, y) {
  p_context.fillRect(x, y, rect_size, rect_size);
}

//delete single lifeform
function delRect(x, y) {
  p_context.clearRect(x, y, rect_size, rect_size);
}

//draw world grid
function drawGrid() {
  for (var x = 0.5; x < p_canvas.width; x += rect_size) {
    p_context.moveTo(x, 0);
    p_context.lineTo(x, p_canvas.height);
  }
  for (var y = 0.5; y < p_canvas.height; y += rect_size) {
    p_context.moveTo(0, y);
    p_context.lineTo(p_canvas.width, y);
  }
  p_context.strokeStyle = "#eee";
  p_context.stroke();
}

//create world array
function createWorld(rows, columns) {
  var arr = [];
  for(var i=0; i<columns; i+=rect_size){
    arr[i] = [];
    for(var j=0; j<rows; j+=rect_size){
      arr[i][j] = Math.floor((Math.random()*10)+1) > 8 ? 1 : 0;
    }
  }
  return arr;
}


//draw world based on world array
function drawWorld() {
   for (var i=0; i<world.length; i+=rect_size){
     for (var j=0; j<world[i].length; j+=rect_size){
        if (world[i][j] == 1){
            drawRect(i,j)
        } else {
            delRect(i,j)
        }
     }
   }   
}

//returns number of alive neighbours
function getAliveNeibs(x, y){
    if (x%rect_size != 0) {
        x = x-x%rect_size
    }
    if (y%rect_size != 0) {
        y = y-y%rect_size
    }
    var x_left, x_right, y_up, y_down
    
    var alive_cnt = 0
    if (y < rect_size) {
        y_up = p_canvas.height-rect_size;
    } else {
        y_up = y-rect_size;
    }
    
    if (x < rect_size) {
        x_left = p_canvas.width-rect_size;
    } else {
        x_left = x-rect_size;
    }
    
    if (y >= p_canvas.height - rect_size) {
        y_down = 0
    } else {
        y_down = y+rect_size;
    }
    
    if (x >= p_canvas.width - rect_size) {
        x_right = 0
    } else {
        x_right = x+rect_size;
    }
    
    alive_cnt = world[x][y_up] + world[x][y_down] + world[x_left][y] + world[x_right][y]+
                world[x_left][y_up] + world[x_right][y_up] + world[x_left][y_down] + world[x_right][y_down]
    
    return alive_cnt
    

}

function onLoad() {
  p_canvas = document.getElementById("panel");
  p_context = p_canvas.getContext("2d");
  world = createWorld(p_canvas.width, p_canvas.height);
  drawWorld();
  //drawGrid();
  setInterval(onClick, 80)
}

function onClick(){
  var nextWorld = []
  for (var i=0;i<p_canvas.width;i+=rect_size){
    nextWorld[i] = []
    for(var j=0;j<p_canvas.height;j+=rect_size){
        cnt = getAliveNeibs(i,j)
        if (world[i][j] == 0){
            if (cnt == 3) nextWorld[i][j] = 1
            else nextWorld[i][j] = 0
        } else {
            if (cnt >= 2 && cnt <= 3) nextWorld[i][j] = 1
            else nextWorld[i][j] = 0
        }
    }
  }
  world = nextWorld
  drawWorld();
  //drawGrid();
}

