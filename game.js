const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnDown = document.querySelector('#down')
const btnRight = document.querySelector('#right')
const btnLeft = document.querySelector('#left')
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult= document.querySelector('#result');


let canvasSize; 
let elementsSize ;
let level = 0;
let lives = 3;

let timeStart ;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined
};
const giftPosition = {
    x: undefined,
    y: undefined
};

let enemyPosition = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);




function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth *0.75;
    } else {
        canvasSize = window.innerHeight *0.75;
    }
    
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)
    
    elementsSize = canvasSize/10;

    startGame();
}

function startGame() {

    console.log({canvasSize, elementsSize});
 
     game.font = elementsSize+'px Verdana';
     game.textAlign ='end'
     
    const map =maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime,100)
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row=> row.trim().split(''));
    console.log({map, mapRows, mapRowsCols});

    showLives();
    enemyPosition = [];
    game.clearRect(0,0,canvasSize,canvasSize)
    mapRowsCols.forEach((row, rowI) => {
        row.forEach( (col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI+1);
            const posY = elementsSize * (rowI +1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            }else if (col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if (col == 'X'){
                enemyPosition.push({
                    x: posX,
                    y: posY,
                })
            }


            game.fillText(emoji,posX,posY);

            console.log({row, rowI,col,colI});
        });
    });
    movePlayer();
 }

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3); 
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision){
        levelWin();
    }

    const enemyCollision = enemyPosition.find(enemy => {
       const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3)
       const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3)
       return enemyCollisionX && enemyCollisionY; 
    });

    if(enemyCollision){
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
    
}

function levelWin() {
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail() {
    console.log('Chocaste con una bomba');
    lives --;

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('Teminaste el juego');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'Superaste el Record';
        }else{
            pResult.innerHTML = 'Lo siento, no superaste el record :(';
        }
    }else {
        localStorage.setItem('record_time', playerTime);
    }
    console.log({recordTime, playerTime});

}
function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART'])  //[,,,]

    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart));
    
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time')
}

 btnUp.addEventListener('click',moveUp);
 btnLeft.addEventListener('click',moveLeft);
 btnDown.addEventListener('click',moveDown);
 btnRight.addEventListener('click',moveRight);

 window.addEventListener('keydown', moveByKeys);

 function moveByKeys(event) {
    if (event.key == 'ArrowUp') {
        moveUp();
    }else if (event.key == 'ArrowDown'){
        moveDown();
    }else if (event.key == 'ArrowRight'){
        moveRight();
    }else if (event.key == 'ArrowLeft'){
        moveLeft();
    }
 }

 function moveUp() {
    console.log('Arriba');

    if ((playerPosition.y.toFixed(3) - elementsSize.toFixed(3)) < elementsSize.toFixed(3)) {
        console.log('Out');
    }else{
        playerPosition.y -= elementsSize;
        startGame();
    }
 }

 function moveDown() {
    console.log('Abajo');
    if ((playerPosition.y.toFixed(3) + elementsSize.toFixed(3)) > canvasSize.toFixed(3)) {
        console.log('Out');
    }else{
        playerPosition.y += elementsSize;
        startGame();
    }
 }

 function moveRight() {
    console.log('Derecha');
    if ((playerPosition.x.toFixed(3) + elementsSize.toFixed(3)) > canvasSize.toFixed(3)) {
        console.log('Out');
    }else{
        playerPosition.x += elementsSize;
        startGame();
    }
 }

 function moveLeft() {
    console.log('Izquierda');
    if ((playerPosition.x.toFixed(3) - elementsSize.toFixed(3)) < elementsSize.toFixed(3)) {
        console.log('Out');
    }else{
        playerPosition.x -= elementsSize;
        startGame();
    }
 
 }