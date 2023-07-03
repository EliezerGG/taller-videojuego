const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnDown = document.querySelector('#down')
const btnRight = document.querySelector('#right')
const btnLeft = document.querySelector('#left')

let canvasSize; 
let elementsSize ;

const playerPosition = {
    x: undefined,
    y: undefined
};

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
     
    const map =maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row=> row.trim().split(''));
    console.log({map, mapRows, mapRowsCols});

    mapRowsCols.forEach((row, rowI) => {
        row.forEach( (col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI+1);
            const posY = elementsSize * (rowI +1);

            if (col == 'O') {
                playerPosition.x = posX;
                playerPosition.y = posY;
                console.log({playerPosition});
            }
            game.fillText(emoji,posX,posY);

            console.log({row, rowI,col,colI});
        });
    });

    //  for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //          game.fillText(emojis[mapRowsCols[row-1][col-1]],elementsSize*col,elementsSize*row)
            
    //     }
    // }
    
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
 }

 function moveDown() {
    console.log('Abajo');
 }

 function moveRight() {
    console.log('Derecha');
 }

 function moveLeft() {
    console.log('Izquierda');
 }