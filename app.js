let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rst-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;


const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [3,4,5],
    [6,7,8],
    [2,5,8],
];

const resetGame = ()=>{
    turnX = true;
    enableBtns();
    msg.innerText = `Player X's Turn`;
    newGamebtn.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnX){
            box.innerText="X";
            turnX = false;
            msg.innerText = `Player O's Turn`;
        }
        else{
            box.innerText="O";
            turnX = true;
            msg.innerText = `Player X's Turn`;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBtns=()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBtns=()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
    msg.innerText = `Congratulations the winner is ${winner} 🎉..!!`;
    newGamebtn.classList.remove("hide");
    disableBtns();
};

const checkWinner = () =>{
    let winnerFound = false;
    for(let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                winnerFound = true;
                return;
            }
        }
    }
    if (!winnerFound && Array.from(boxes).every(box => box.innerText !== "")) {
        msg.innerText = "It's a Tie! 🤝";
        newGamebtn.classList.remove("hide");
        disableBtns();
    }
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);