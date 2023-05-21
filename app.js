const gameBoard = document.querySelector('#game-board');
const playerDisplay = document.querySelector('#player');
let infoDisplay = document.querySelector('#info-display');
let playerGo = 'black';
playerDisplay.textContent = playerGo;

const width = 8;

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

const createBoard = () => {
    startPieces.forEach((startPiece, i)=>{
        const square = document.createElement('div');
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute('draggable', true);
        square.classList.add('square');
        square.setAttribute('square-id', i);
        const row = Math.floor((63 - i) / 8) + 1;
        if (row % 2 === 0){
            square.classList.add(i % 2 === 0 ? 'beige' : 'brown')
        } else {
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige')   
        }
        gameBoard.append(square);

        if(i <= 15){
            square.firstChild.firstChild.classList.add('black');
        }

        if(i >= 48){
            square.firstChild.firstChild.classList.add('white');
        }
    })
}

createBoard();


const allSquares = document.querySelectorAll("#game-board .square");


allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
})

let startPosition;
let draggedElement;

function dragStart(e) {
    startPosition = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e){
    e.stopPropagation();
    
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);
    const taken = e.target.classList.contains('piece');
    const opponentGo = playerGo === 'white' ? 'black' : 'white';
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);
    const valid = checkIfValid(e.target)

      if(correctGo) {
        
        if(takenByOpponent && valid) { 
            e.target.parentNode.append(draggedElement);
            e.target.remove();
            checkForWin();
            changePlayer();
            return
        } 
        if(taken && !takenByOpponent){
            infoDisplay.textContent = "You cannot go here";
            setTimeout(()=>
                infoDisplay.textContent = "",
                2000
            )
            return
        }
        if(valid){
            e.target.append(draggedElement);
            checkForWin();
            changePlayer();
            return
        }
    }
}

function checkIfValid(target){
    const targetID = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startID = Number(startPosition)
    const piece = draggedElement.id
    console.log(targetID)
    console.log(startID)
    console.log(piece)

    switch(piece){
        case 'pawn' :
            const starterRow = [8,9,10,11,12,13,14,15]
            if(starterRow.includes(startID) && startID+width*2 === targetID 
                || startID+width === targetID 
                || startID+width-1 === targetID && document.querySelector(`[square-id="${startID+width-1}"]`).firstChild
                || startID+width+1 === targetID && document.querySelector(`[square-id="${startID+width+1}"]`).firstChild) {
                return true;
            }
            break;
        case 'knight' :
            if(startID+width*2-1 === targetID 
                || startID+width*2+1 === targetID 
                || startID+width-2 === targetID
                || startID+width-2 === targetID
                || startID-width*2-1 === targetID 
                || startID-width*2+1 === targetID
                || startID+width-2 === targetID
                || startID+width-2 === targetID) {
                return true;
            }
            break;
        case 'bishop' :
            if(startID+width+1 === targetID 
                || startID+width-1 === targetID
                || startID+width*2+2 === targetID && !document.querySelector(`[square-id="${startID+width+1}"]`).firstChild
                || startID+width*3+3 === targetID && !document.querySelector(`[square-id="${startID+width*2+2}"]`).firstChild
                || startID+width*4+4 === targetID && !document.querySelector(`[square-id="${startID+width*3+3}"]`).firstChild
                || startID+width*5+5 === targetID && !document.querySelector(`[square-id="${startID+width*4+4}"]`).firstChild
                || startID+width*6+6 === targetID && !document.querySelector(`[square-id="${startID+width*5+5}"]`).firstChild
                || startID+width*7+7 === targetID && !document.querySelector(`[square-id="${startID+width*6+6}"]`).firstChild
                || startID-width-1 === targetID 
                || startID-width*2-2 === targetID && !document.querySelector(`[square-id="${startID-width-1}"]`).firstChild
                || startID-width*3-3 === targetID && !document.querySelector(`[square-id="${startID-width*2-2}"]`).firstChild
                || startID-width*4-4 === targetID && !document.querySelector(`[square-id="${startID-width*3-3}"]`).firstChild
                || startID-width*5-5 === targetID && !document.querySelector(`[square-id="${startID-width*4-4}"]`).firstChild
                || startID-width*6-6 === targetID && !document.querySelector(`[square-id="${startID-width*5-5}"]`).firstChild
                || startID-width*7-7 === targetID && !document.querySelector(`[square-id="${startID-width*-6}"]`).firstChild
                || startID-width+1 === targetID 
                || startID-width*2+2 === targetID && !document.querySelector(`[square-id="${startID-width+1}"]`).firstChild
                || startID-width*3+3 === targetID && !document.querySelector(`[square-id="${startID-width*2+2}"]`).firstChild
                || startID-width*4+4 === targetID && !document.querySelector(`[square-id="${startID-width*3+3}"]`).firstChild
                || startID-width*5+5 === targetID && !document.querySelector(`[square-id="${startID-width*4+4}"]`).firstChild
                || startID-width*6+6 === targetID && !document.querySelector(`[square-id="${startID-width*5+5}"]`).firstChild
                || startID-width*7+7 === targetID && !document.querySelector(`[square-id="${startID-width*6+6}"]`).firstChild
                || startID+width-1 === targetID 
                || startID+width*2-2 === targetID && !document.querySelector(`[square-id="${startID+width-1}"]`).firstChild
                || startID+width*3-3 === targetID && !document.querySelector(`[square-id="${startID+width*2-2}"]`).firstChild
                || startID+width*4-4 === targetID && !document.querySelector(`[square-id="${startID+width*3-3}"]`).firstChild
                || startID+width*5-5 === targetID && !document.querySelector(`[square-id="${startID+width*4-4}"]`).firstChild
                || startID+width*6-6 === targetID && !document.querySelector(`[square-id="${startID+width*5-5}"]`).firstChild
                || startID+width*7-7 === targetID && !document.querySelector(`[square-id="${startID+width*-6}"]`).firstChild) {
                    return true;
                }
                break;
        case 'rook':
            if(startID+width === targetID
                || startID+width*2 === targetID && !document.querySelector(`[square-id="${startID+width}"]`).firstChild
                || startID+width*3 === targetID && !document.querySelector(`[square-id="${startID+width*2}"]`).firstChild
                || startID+width*4 === targetID && !document.querySelector(`[square-id="${startID+width*3}"]`).firstChild
                || startID+width*5 === targetID && !document.querySelector(`[square-id="${startID+width*4}"]`).firstChild
                || startID+width*6 === targetID && !document.querySelector(`[square-id="${startID+width*5}"]`).firstChild
                || startID+width*7 === targetID && !document.querySelector(`[square-id="${startID+width*6}"]`).firstChild
                || startID-width === targetID
                || startID-width*2 === targetID && !document.querySelector(`[square-id="${startID-width}"]`).firstChild
                || startID-width*3 === targetID && !document.querySelector(`[square-id="${startID-width*2}"]`).firstChild
                || startID-width*4 === targetID && !document.querySelector(`[square-id="${startID-width*3}"]`).firstChild
                || startID-width*5 === targetID && !document.querySelector(`[square-id="${startID-width*4}"]`).firstChild
                || startID-width*6 === targetID && !document.querySelector(`[square-id="${startID-width*5}"]`).firstChild
                || startID-width*7 === targetID && !document.querySelector(`[square-id="${startID-width*6}"]`).firstChild
                || startID+1 === targetID
                || startID+2 === targetID && !document.querySelector(`[square-id="${startID+1}"]`).firstChild
                || startID+3 === targetID && !document.querySelector(`[square-id="${startID+2}"]`).firstChild
                || startID+4 === targetID && !document.querySelector(`[square-id="${startID+3}"]`).firstChild
                || startID+5 === targetID && !document.querySelector(`[square-id="${startID+4}"]`).firstChild
                || startID+6 === targetID && !document.querySelector(`[square-id="${startID+5}"]`).firstChild
                || startID+7 === targetID && !document.querySelector(`[square-id="${startID+6}"]`).firstChild
                || startID-1 === targetID
                || startID-2 === targetID && !document.querySelector(`[square-id="${startID-1}"]`).firstChild
                || startID-3 === targetID && !document.querySelector(`[square-id="${startID-2}"]`).firstChild
                || startID-4 === targetID && !document.querySelector(`[square-id="${startID-3}"]`).firstChild
                || startID-5 === targetID && !document.querySelector(`[square-id="${startID-4}"]`).firstChild
                || startID-6 === targetID && !document.querySelector(`[square-id="${startID-5}"]`).firstChild
                || startID-7 === targetID && !document.querySelector(`[square-id="${startID-6}"]`).firstChild){
                return true;
            }
            break;
        case 'queen':
            if(startID+width === targetID
                || startID+width*2 === targetID && !document.querySelector(`[square-id="${startID+width}"]`).firstChild
                || startID+width*3 === targetID && !document.querySelector(`[square-id="${startID+width*2}"]`).firstChild
                || startID+width*4 === targetID && !document.querySelector(`[square-id="${startID+width*3}"]`).firstChild
                || startID+width*5 === targetID && !document.querySelector(`[square-id="${startID+width*4}"]`).firstChild
                || startID+width*6 === targetID && !document.querySelector(`[square-id="${startID+width*5}"]`).firstChild
                || startID+width*7 === targetID && !document.querySelector(`[square-id="${startID+width*6}"]`).firstChild
                || startID-width === targetID
                || startID-width*2 === targetID && !document.querySelector(`[square-id="${startID-width}"]`).firstChild
                || startID-width*3 === targetID && !document.querySelector(`[square-id="${startID-width*2}"]`).firstChild
                || startID-width*4 === targetID && !document.querySelector(`[square-id="${startID-width*3}"]`).firstChild
                || startID-width*5 === targetID && !document.querySelector(`[square-id="${startID-width*4}"]`).firstChild
                || startID-width*6 === targetID && !document.querySelector(`[square-id="${startID-width*5}"]`).firstChild
                || startID-width*7 === targetID && !document.querySelector(`[square-id="${startID-width*6}"]`).firstChild
                || startID+1 === targetID
                || startID+2 === targetID && !document.querySelector(`[square-id="${startID+1}"]`).firstChild
                || startID+3 === targetID && !document.querySelector(`[square-id="${startID+2}"]`).firstChild
                || startID+4 === targetID && !document.querySelector(`[square-id="${startID+3}"]`).firstChild
                || startID+5 === targetID && !document.querySelector(`[square-id="${startID+4}"]`).firstChild
                || startID+6 === targetID && !document.querySelector(`[square-id="${startID+5}"]`).firstChild
                || startID+7 === targetID && !document.querySelector(`[square-id="${startID+6}"]`).firstChild
                || startID-1 === targetID
                || startID-2 === targetID && !document.querySelector(`[square-id="${startID-1}"]`).firstChild
                || startID-3 === targetID && !document.querySelector(`[square-id="${startID-2}"]`).firstChild
                || startID-4 === targetID && !document.querySelector(`[square-id="${startID-3}"]`).firstChild
                || startID-5 === targetID && !document.querySelector(`[square-id="${startID-4}"]`).firstChild
                || startID-6 === targetID && !document.querySelector(`[square-id="${startID-5}"]`).firstChild
                || startID-7 === targetID && !document.querySelector(`[square-id="${startID-6}"]`).firstChild
                || startID+width+1 === targetID 
                || startID+width-1 === targetID
                || startID+width*2+2 === targetID && !document.querySelector(`[square-id="${startID+width+1}"]`).firstChild
                || startID+width*3+3 === targetID && !document.querySelector(`[square-id="${startID+width*2+2}"]`).firstChild
                || startID+width*4+4 === targetID && !document.querySelector(`[square-id="${startID+width*3+3}"]`).firstChild
                || startID+width*5+5 === targetID && !document.querySelector(`[square-id="${startID+width*4+4}"]`).firstChild
                || startID+width*6+6 === targetID && !document.querySelector(`[square-id="${startID+width*5+5}"]`).firstChild
                || startID+width*7+7 === targetID && !document.querySelector(`[square-id="${startID+width*6+6}"]`).firstChild
                || startID-width-1 === targetID 
                || startID-width*2-2 === targetID && !document.querySelector(`[square-id="${startID-width-1}"]`).firstChild
                || startID-width*3-3 === targetID && !document.querySelector(`[square-id="${startID-width*2-2}"]`).firstChild
                || startID-width*4-4 === targetID && !document.querySelector(`[square-id="${startID-width*3-3}"]`).firstChild
                || startID-width*5-5 === targetID && !document.querySelector(`[square-id="${startID-width*4-4}"]`).firstChild
                || startID-width*6-6 === targetID && !document.querySelector(`[square-id="${startID-width*5-5}"]`).firstChild
                || startID-width*7-7 === targetID && !document.querySelector(`[square-id="${startID-width*-6}"]`).firstChild
                || startID-width+1 === targetID 
                || startID-width*2+2 === targetID && !document.querySelector(`[square-id="${startID-width+1}"]`).firstChild
                || startID-width*3+3 === targetID && !document.querySelector(`[square-id="${startID-width*2+2}"]`).firstChild
                || startID-width*4+4 === targetID && !document.querySelector(`[square-id="${startID-width*3+3}"]`).firstChild
                || startID-width*5+5 === targetID && !document.querySelector(`[square-id="${startID-width*4+4}"]`).firstChild
                || startID-width*6+6 === targetID && !document.querySelector(`[square-id="${startID-width*5+5}"]`).firstChild
                || startID-width*7+7 === targetID && !document.querySelector(`[square-id="${startID-width*6+6}"]`).firstChild
                || startID+width-1 === targetID 
                || startID+width*2-2 === targetID && !document.querySelector(`[square-id="${startID+width-1}"]`).firstChild
                || startID+width*3-3 === targetID && !document.querySelector(`[square-id="${startID+width*2-2}"]`).firstChild
                || startID+width*4-4 === targetID && !document.querySelector(`[square-id="${startID+width*3-3}"]`).firstChild
                || startID+width*5-5 === targetID && !document.querySelector(`[square-id="${startID+width*4-4}"]`).firstChild
                || startID+width*6-6 === targetID && !document.querySelector(`[square-id="${startID+width*5-5}"]`).firstChild
                || startID+width*7-7 === targetID && !document.querySelector(`[square-id="${startID+width*-6}"]`).firstChild){
                    return true;
                }
                break;
        case 'king':
            if(startID + 1 === targetID
                || startID - 1 === targetID
                || startID + width === targetID
                || startID - width === targetID
                || startID + width - 1 === targetID
                || startID + width + 1 === targetID
                || startID - width + 1 === targetID
                || startID - width - 1 === targetID){
                return true;
            }
    }
}

function changePlayer(){
    if(playerGo === "black"){
        playerDisplay.textContent = "white";
        playerGo = "white";
        reverseId();
    } else {
        playerDisplay.textContent = "black";
        playerGo = "black";
        revertId();
    }
}

function reverseId(){
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => square.setAttribute('square-id', (width * width - 1) - i))
}

function revertId(){
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => square.setAttribute('square-id',  i))
}

function checkForWin() {
    const kings = Array.from(document.querySelectorAll('#king'));
    if(!kings.some(king => king.firstChild.classList.contains('white'))){
        playerDisplay.innerHTML = "Game Over"
        infoDisplay.innerHTML = "Black Players Wins!!"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square=> square.firstChild?.setAttribute('draggable', false))
    }

    if(!kings.some(king => king.firstChild.classList.contains('black'))){
        playerDisplay.innerHTML = "Game Over"
        infoDisplay.innerHTML = "White Players Wins!!"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square=> square.firstChild?.setAttribute('draggable', false))
    }
}