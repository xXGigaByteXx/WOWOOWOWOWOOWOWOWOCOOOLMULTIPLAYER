var ball;
var database;
var pos;

function setup() {
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballPos = database.ref('ball/position');
    ballPos.on("value", readPosition, showError)
}

function draw(){
    background("white");
    if(keyDown("a")){
        writePosition(-5,0);
    }
    else if(keyDown("d")){
        writePosition(5,0);
    }
    else if(keyDown("w")){
        writePosition(0,-5);
    }
    else if(keyDown("s")){
        writePosition(0,+5);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x': pos.x + x,
        'y': pos.y + y,
    });
}
function readPosition(data) {
    pos = data.val();
    ball.x = pos.x;
    ball.y = pos.y;
}
function showError() {
    console.log("error database writing... thing");
}
