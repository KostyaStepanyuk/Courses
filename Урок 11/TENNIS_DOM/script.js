window.addEventListener('load', setEntities);

let isGameOn = false;

let currentScore = [0, 0];

let ballParameters = {
    speedX : 3,
    speedY : 2,
    posX : 0,
    posY : 0,
    width : 50,
    height : 50,

    update : function() {
        const ballElem = document.getElementById('ball');
        ballElem.style.left = this.posX + "px";
        ballElem.style.top = this.posY + "px";
    }
}

let racketsParameters = {
    height : 100,
    width : 15,
    left : {
        speedY : 0,
        posY : 0,
        update : function() {
            const racketElem = document.getElementById('leftRacket');
            racketElem.style.top = this.posY + "px";
        }
    },

    right : {
        speedY : 0,
        posY : 0,
        update : function() {
            const racketElem = document.getElementById('rightRacket');
            racketElem.style.top = this.posY + "px";
        }
    }    
}

let fieldParameters = {
    width : 1000,
    height : 600
}

function readEntities(){
    ballParameters.posX = document.getElementById('ball').offsetLeft;
    ballParameters.posY = document.getElementById('ball').offsetTop;

    racketsParameters.left.posY = document.getElementById('leftRacket').offsetTop;
    racketsParameters.right.posY = document.getElementById('rightRacket').offsetTop;
}

function setEntities(){
    createField();
    createBall();
    createRackets();
    readEntities();
    createScore();
    changePositions();
    
    window.addEventListener('keydown', moveRacket, false);
    window.addEventListener('keyup', moveRacket, false);
}

function createScore(){
    let score = document.createElement("div");
    score.innerHTML = "0:0";
    score.style.position = "absolute";
    score.style.fontSize = "2rem";
    score.id = "score";
    document.body.appendChild(score);

    score.style.top = "0px";
    score.style.left = ballParameters.posX + "px";
}

function createField(){
    let field = document.createElement("div");
    field.style.marginTop = "10px";
    field.style.width = fieldParameters.width + "px";
    field.style.height = fieldParameters.height + "px";
    field.style.backgroundColor = "rgb(255, 255, 135)";
    field.style.position = "relative";
    field.id = "field";
    document.body.appendChild(field);
};

function createBall(){
    let field = document.getElementById("field");

    let oldBall = document.getElementById("ball");
    if (oldBall) field.removeChild(oldBall);

    let ball = document.createElement("div");
    ball.style.width = ballParameters.width + "px";
    ball.style.height = ballParameters.height + "px";
    ball.style.borderRadius = "50%";
    ball.style.backgroundColor = "red";
    ball.style.position = "absolute";
    ball.id = "ball";
    field.appendChild(ball);

    ball.style.left = fieldParameters.width / 2 - ball.offsetWidth / 2 + "px";
    ball.style.top = fieldParameters.height / 2 - ball.offsetHeight / 2 + "px";
};

function createRackets(){
    let field = document.getElementById("field");

    let oldLeftRacket = document.getElementById("leftRacket");
    if (oldLeftRacket) field.removeChild(oldLeftRacket);
    let oldRightRacket = document.getElementById("rightRacket");
    if (oldRightRacket) field.removeChild(oldRightRacket);
    
    let leftRacket = document.createElement("div");
    let rightRacket = document.createElement("div");

    leftRacket.style.width = racketsParameters.width + "px";
    leftRacket.style.height = racketsParameters.height + "px";
    leftRacket.style.position = "absolute";
    leftRacket.id = "leftRacket";

    rightRacket.style.width = racketsParameters.width + "px";
    rightRacket.style.height = racketsParameters.height + "px";
    rightRacket.style.position = "absolute";
    rightRacket.id = "rightRacket";
    
    leftRacket.style.left = 0;
    leftRacket.style.backgroundColor = "green";
    
    rightRacket.style.right = 0;
    rightRacket.style.backgroundColor = "blue";

    field.appendChild(leftRacket);
    field.appendChild(rightRacket);
    
    leftRacket.style.top = fieldParameters.height / 2 - leftRacket.offsetHeight / 2 + "px";
    rightRacket.style.top = fieldParameters.height / 2 - leftRacket.offsetHeight / 2 + "px";
}

function changeScore(side){
    let score = document.getElementById("score");
    if (side === "left"){
        currentScore[0]++;
    }
    if (side === "right"){
        currentScore[1]++;
    }
    score.innerHTML = currentScore[0] + ":" + currentScore[1];
}

function generateBallAngle(){
    ballParameters.speedY = Math.random() * (3 - -3 + 1) + -3;
    if (ballParameters.speedY < 1.5 && ballParameters.speedY > -1.5){
        generateBallAngle();
    }
    let buff = Math.random();
    if (buff > 0.5) ballParameters.speedX = -ballParameters.speedX;
}

function restartGame(){
    if (!isGameOn){
        createBall();
        createRackets();
        readEntities();
        ballParameters.speedX = 3;
        generateBallAngle();
        isGameOn = true;
    }
}

function checkStates(){
    // вышла ли левая платформа выше границы поля?
    if (racketsParameters.left.posY < 0){
        racketsParameters.left.speedY = 0;
        racketsParameters.left.posY = 0;
    }
    // вышла ли левая платформа ниже границы поля?
    if (racketsParameters.left.posY > fieldParameters.height - racketsParameters.height){
        racketsParameters.left.speedY = 0;
        racketsParameters.left.posY = fieldParameters.height - racketsParameters.height;
    }
    // вышла ли правая платформа выше границы поля?
    if (racketsParameters.right.posY < 0){
        racketsParameters.right.speedY = 0;
        racketsParameters.right.posY = 0;
    }
    // вышла ли правая платформа ниже границы поля?
    if (racketsParameters.right.posY > fieldParameters.height - racketsParameters.height){
        racketsParameters.right.speedY = 0;
        racketsParameters.right.posY = fieldParameters.height - racketsParameters.height;
    }
    // коснулся ли мяч левой платформы?
    if (ballParameters.posX <= racketsParameters.width 
     && ballParameters.posY + ballParameters.height / 2 >= racketsParameters.left.posY 
     && ballParameters.posY + ballParameters.height / 2 <= racketsParameters.left.posY + racketsParameters.height){
        ballParameters.speedX =- ballParameters.speedX;
        ballParameters.posX = racketsParameters.width;
    }
    // коснулся ли мяч правой платформы?
    if (ballParameters.posX + ballParameters.width >= fieldParameters.width - racketsParameters.width 
        && ballParameters.posY + ballParameters.height / 2 >= racketsParameters.right.posY 
        && ballParameters.posY + ballParameters.height / 2 <= racketsParameters.right.posY + racketsParameters.height){
           ballParameters.speedX =- ballParameters.speedX;
           ballParameters.posX = fieldParameters.width - racketsParameters.width - ballParameters.width;
       }
    // вылетел ли мяч левее стены?
    if (ballParameters.posX < 0) {
        ballParameters.speedX = 0;
        ballParameters.speedY = 0;
        changeScore("right");
        isGameOn = false;
        return false;
    }
    // вылетел ли мяч правее стены?
    if (ballParameters.posX + ballParameters.width > fieldParameters.width){
        ballParameters.speedX = 0;
        ballParameters.speedY = 0;
        changeScore("left");
        isGameOn = false;
        return false;
    }
    // вылетел ли мяч ниже стены?
    if (ballParameters.posY + ballParameters.height > fieldParameters.height){
        ballParameters.speedY =- ballParameters.speedY;
        ballParameters.posY = fieldParameters.height - ballParameters.height;
    }
    // вылетел ли мяч выше стены?
    if (ballParameters.posY < 0) {
        ballParameters.speedY =- ballParameters.speedY;
        ballParameters.posY = 0;
    }
}

function changePositions(){
    if (isGameOn){
        ballParameters.posX += ballParameters.speedX;
        ballParameters.posY += ballParameters.speedY;

        racketsParameters.left.posY += racketsParameters.left.speedY;
        racketsParameters.left.update();
        racketsParameters.right.posY += racketsParameters.right.speedY;
        racketsParameters.right.update();
        checkStates();
    }

    ballParameters.update();
    requestAnimationFrame(changePositions);
}

function moveRacket(EO){
    EO = EO || window.event;
    EO.preventDefault();
    if (EO.type === "keydown"){
        // Левая платформа
        if (EO.key === "Shift"){
            racketsParameters.left.speedY = -3;
        }
        if (EO.key === "Control"){
            racketsParameters.left.speedY = 3;
        }
        // Правая платформа
        if (EO.key === "ArrowUp"){
            racketsParameters.right.speedY = -3;
        }
        if (EO.key === "ArrowDown"){
            racketsParameters.right.speedY = 3;
        }
    }
    if (EO.type === "keyup"){
        // Левая платформа
        if (EO.key === "Shift"){
            racketsParameters.left.speedY = 0;
        }
        if (EO.key === "Control"){
            racketsParameters.left.speedY = 0;
        }
        // Правая платформа
        if (EO.key === "ArrowUp"){
            racketsParameters.right.speedY = 0;
        }
        if (EO.key === "ArrowDown"){
            racketsParameters.right.speedY = 0;
        }
    }
}