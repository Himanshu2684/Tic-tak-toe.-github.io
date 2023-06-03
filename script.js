const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

// initialized game 
function initGame(){
    currentPlayer = "X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText= "";
        boxes[index].style.pointerEvent = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    
}

initGame();

// when player click on boxes
boxes.forEach((box,index)=>{
    box.addEventListener("click", ()=>{
        handleCheck(index);
    })
})

function handleCheck(index){
    if(gameGrid[index]===""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvent = "none";
        if(currentPlayer==="X"){
            boxes[index].classList.add("yPlayer");
        }
        else{
            boxes[index].classList.add("xPlayer");
        }
        // swap turn of player
        swapTurn();
        // check wins
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//check gameOver
function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position)=>{
        
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") 
        && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){
            
            if(gameGrid[position[0]]==="X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            // Winner mil gaya h ab koi click krne pr action na ho ishliye logic likh raha hu
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer!==""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box!=""){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameInfo.innerText = `Game Tied !`;
        newGameBtn.classList.add("active");
    }
}

// when player click on new game then it goes to its initial state
newGameBtn.addEventListener("click", initGame);