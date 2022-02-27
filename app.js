var canvas = document.querySelector('canvas')

var ctx = canvas.getContext('2d')

canvas.height = window.innerHeight
canvas.width = 800

window.addEventListener('resize',function(){
    canvas.height = window.innerHeight
    canvas.width = 800
})
var moveLeft = document.querySelector('.left')
var moveRight = document.querySelector('.right')

var idTimeout;
moveRight.addEventListener('touchstart', mousedown)
moveRight.addEventListener('touchend', mouseup)

moveLeft.addEventListener('touchstart', mousedown2)
moveLeft.addEventListener('touchend', mouseup2)

mouse = false;
function mousedown2()
{
    mouse = true;
    callEvent2();
}
function mouseup2()
{
    mouse =false;
    pandleIsMovingLeft = false
}
function callEvent2()
{
    if(mouse)
{
   // do whatever you want
   // it will continue executing until mouse is not released
    pandleIsMovingLeft = true
    if(pandle.x < 0){
        pandle.x =0
    }
    setTimeout("callEvent2()",5);
}
    else
    return;
}

function mousedown()
{
    mouse = true;
    callEvent();
}
function mouseup()
{
    mouse =false;
    pandleIsMovingRight = false
}
function callEvent()
{
    if(mouse)
{
   // do whatever you want
   // it will continue executing until mouse is not released
    pandleIsMovingRight = true
    if(pandle.x+pandleWidth >canvas.width){
        pandle.x = canvas.width - pandleWidth
    }
    setTimeout("callEvent()",5);
}
    else
    return;
}

window.addEventListener('mouseup', function() {
    clearTimeout(idTimeout);
    mouseIsDown = false;
});
var compterOrPhone = confirm('Chơi diện thoại thì nhấn "Huỷ" còn chơi máy tính thì nhấn "Ok" nhe người anh em :3')

if(!compterOrPhone){
    document.querySelector('div').style.display = 'flex'
}

// thanh điều khiển
function MovingPandle(x,y,width,height,color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height
    this.color = color

    this.draw = function(){
        ctx.beginPath()
        ctx.rect(this.x,this.y,this.width,this.height)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
    }
}
// Ball
dx = (Math.random()-0.5)*15+(Math.random()-0.5)*-15;
dy = 10
function Ball(x,y,radius,color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
    }

    this.update = function(){
        this.x += dx
        this.y -= dy
        if(this.x - radius/2 <0 || this.x + radius/2 > canvas.width){
            dx = - dx
        }
        if(this.y - radius/2 <0){
            dy = - dy
        }
        if(this.y - radius/2 > canvas.height){
            alert('thua gòi lại he :)')
            ball = new Ball(canvas.width/2,canvas.height/1.2,15,'black')
            dy = (Math.random()-0.5)*10 + 10
            bricks = []
            newBrick()
        }
        
        // pandle push ball
        if(ball.x >= pandle.x && ball.x <= pandle.x + pandleWidth && ball.y+ball.radius >= pandle.y && ball.y-ball.radius <= pandle.y + pandleHeight){
            dy = - dy
            dx = (Math.random()-0.5)*10;
        }

        this.draw()
    }
}
//ball
var ball = new Ball(canvas.width/2,canvas.height/1.1,15,'black')
// moving pandle
pandleIsMovingLeft = false
pandleIsMovingRight = false
addEventListener('keyup',function(e){
    if(e.keyCode === 39 && pandle.x + pandleWidth < canvas.width||e.key === 'd' && pandle.x + pandleWidth < canvas.width){
        pandleIsMovingRight = false
    }
    if(e.keyCode === 37 && pandle.x > 0||e.key ==='a'&& pandle.x > 0){
        pandleIsMovingLeft = false
    }
})
addEventListener('keydown',function(e){
    if(e.keyCode === 39 && pandle.x + pandleWidth < canvas.width||e.key === 'd' && pandle.x + pandleWidth < canvas.width){
        pandleIsMovingRight = true
    }
    if(e.keyCode === 37 && pandle.x > 0||e.key ==='a'&& pandle.x > 0){
        pandleIsMovingLeft = true
    }
})
//pandle
let pandleWidth = 200
let pandleHeight = 25
var pandle = new MovingPandle(canvas.width/2 - pandleWidth/2,canvas.height - 35,pandleWidth,pandleHeight)
// target
    var targetInt = {
        offSetX : 40,
        offSetY : 40,
        margin : 35,
        brickWidth : 109,
        brickHeight : 25,
        totalRows : 3,
        width : 109,
        height: 25,
        totalColomns : 5
    }
    var bricks = []
function newBrick(){
    for(i = 0; i < targetInt.totalRows;i++){
        for(j=0;j< targetInt.totalColomns;j++){
            bricks.push({
                x : targetInt.offSetX + j*(targetInt.width + targetInt.margin),
                y : targetInt.offSetY + i*(targetInt.height + targetInt.margin),
                isBreak: false
            })
            }
        }
}
function drawTargets(){
    bricks.forEach(e=>{
        if(!e.isBreak){
            ctx.rect(e.x,e.y,109,25)
            ctx.fill()
        }
    })
}
function handleHitTheBrick(){
    bricks.forEach((e,index) =>{
        if(!e.isBreak){
            if(ball.x>= e.x && ball.x <= e.x+targetInt.width && ball.y + ball.radius >= e.y && ball.y - ball.radius <= e.y+targetInt.height){
                dy = -dy
                e.isBreak = true
                bricks.splice(index,1)
            }
        }
    })
}
// console.log(ball.x)
function checkWin(){
    if(bricks.length == 0){
        alert('Win òi! Lại he :))')
        ball = new Ball(canvas.width/2,canvas.height/1.2,15,'black')
        bricks = []
        newBrick()
    }
}
//loop
function animation(){
    requestAnimationFrame(animation)
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    //contral
    if(pandleIsMovingLeft){
        pandle.x -= 10
    }
    if(pandleIsMovingRight){
        pandle.x += 10
    }
    //check border
    if(pandle.x <= 0 ){
        // pandle.x =0
        pandleIsMovingLeft = false
    }else if(pandle.x + pandleWidth >= canvas.width){
        // pandle.x = canvas.width - pandleWidth
        pandleIsMovingRight = false
    }
    //draw
    pandle.draw()
    ball.update()
    drawTargets()
    handleHitTheBrick()
    checkWin()
}
animation()
