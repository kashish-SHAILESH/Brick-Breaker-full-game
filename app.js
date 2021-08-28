var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var x = canvas.width/2
var y = canvas.height - 30
var dx = 2
var dy = -2
var ballRadius = 10
var paddleWidth = 75
var paddleHeight = 10
var paddleX = (canvas.width - paddleWidth)/2
var rightPressed = false
var leftPressed = false
var brickRowCount = 3
var brickColumnCount = 5
var brickWidth = 25
var brickHeight = 20
var brickPadding = 10
var brickOffsetTop = 30
var brickOffsetLeft = 30
var score = 0;

document.addEventListener("keydown",keyDownHandler,false);

document.addEventListener("keyup",keyUpHandler,false);

document.addEventListener("mousemove",mouseMoveHandler,false);

var bricks = []

for(var c = 0; c<brickColumnCount; c++){
    bricks[c] = []
    for(var r = 0; r<brickRowCount; r++){
        bricks[c][r] = {x:0,y:0}
    }
}


function drawBall(){
    ctx.beginPath()
    ctx.arc(x,y,ballRadius,0,Math.PI*2) 
    //In coding it's given as ctx.arc(x,y,ballRadius,0,Math.PI)
    ctx.fillStyle = 'orangered'
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){
    ctx.beginPath()
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight) 
    //In codealong it's given as ctx.rect(paddleX,canvas.height-paddleHeight,paddleHeight,paddleWidth)
    ctx.fillStyle = 'orangered'
    ctx.fill()
    ctx.closePath()
}

function drawBricks(){
    for(var c = 0; c<brickColumnCount; c++){
        for(var r = 0; r<brickRowCount; r++){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop
            bricks[c][r].x = brickX
            bricks[c][r].y = brickY
            ctx.beginPath()
            ctx.rect(0,0,brickWidth,brickHeight)
            ctx.fillStyle = 'orangered'
            ctx.fill()
            ctx.closePath()
        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "orangered";
    ctx.fillText("Score" + score,8,20);
}

function collisionDetection(){
    for(var c = 0; c < brickColumnCount; c++){
        for(var r = 0; r < brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y + brickHeight){
                dy = -dy;
                b.status = 0; 
                score ++;
                if(score == brickRowCount*brickColumnCount){
                    alert("YOU WIN, CONGRATS!");
                    document.location.reload();
                    clearInterval(interval);
                }
                }
            }
        }
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBricks()
    drawBall()
    drawPaddle()
    x += dx
    y += dy

    if(y+dy < ballRadius)
        dy = -dy

    if( y+dy >canvas.height - ballRadius){
        if(x>paddleX && x<(paddleX + paddleWidth)){
            dy = -dy
        }
        else{
            alert('GAME OVER')
            document.location.reload()
            clearInterval(interval)
        }
    }

    else if(x+dx < ballRadius || x+dx > canvas.width - ballRadius){
        dx = -dx
    }
    

    if(rightPressed){
        paddleX += 7
        if((paddleX + paddleWidth) > canvas.width){
            paddleX = canvas.width - paddleWidth
        }
    }

    if(leftPressed){
        paddleX -= 7
        if(paddleX < 0){
            paddleX = 0
        }
    }
}

function keyDownHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = true
    }
    else if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = true
    }
}

function keyUpHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = false
    }
    else if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = false
    }
}


function mouseMoveHandler(e){
    var relativeX = e.clientX -canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
}



var interval = setInterval(draw,10);