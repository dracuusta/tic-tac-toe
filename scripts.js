


// const readline=require('readline').createInterface({
//     input:process.stdin,
//     output: process.stdout
// })


  



const gameboard=(function(){
    let board=[];
    function initialize_board(){
         for(let i=0;i<3;i++)
        {
            board[i]=[];
            for(let j=0;j<3;j++)
            {
                board[i][j]="";
            }
        }

    }
    
    function getBoard(){
        return board;
    }
    function markBoard(player){
         if(isValidMove(player.getXPosition(),player.getYPosition())){board[player.getXPosition()][player.getYPosition()]=player.operator;}
         else{
            throw new Error("Wrong Coordinates Input");
         }
        
    }

    function isValidMove(x,y){
        if(x>=0&&x<3&&y>=0&&y<3&&board[x][y]!="X"&&board[x][y]!="O"){
            return true;
        }
        else{
            return false;
        }
    }

    function clearBoard(){
        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                board[i][j]="";
            }
        }
    }

    function checkBoard(player){

        let Horizontal_validator=true;
        let Vertical_validator=true;
        //check row
        for(let i=0;i<3;i++){
            if(board[player.getXPosition()][i]!=player.operator)
            {
                Horizontal_validator=false;
            }
            if(board[i][player.getYPosition()]!=player.operator)
            {
                Vertical_validator=false;
            }
        }
        let Left_Diagonal_validator=false;
        let Right_Diagonal_validator=false;
        if((board[0][0]==board[1][1])&&(board[1][1]===board[2][2])&&(board[2][2]===player.operator)){
            Left_Diagonal_validator=true;
        }
        if((board[0][2]==board[1][1])&&(board[1][1]===board[2][0])&&(board[2][0]===player.operator)){
            Right_Diagonal_validator=true;
        }
        return Horizontal_validator||Vertical_validator||Diagonal_validator||Right_Diagonal_validator;
    }
    return {initialize_board,getBoard,markBoard,clearBoard,checkBoard};
})();


function createPlayer(operator){
    let x_position=0;
    let y_position=0;
    function updatePosition(a,b){
        x_position=a;
        y_position=b;
    }
    function getXPosition(){
        return x_position;
    }
    function getYPosition(){
        return y_position;
    }

    return {operator, getXPosition,getYPosition, updatePosition};
}



const game=(function(){


function askMove(player, turn, player1, player2,x,y)
    {
    const currPlayer=turn%2?'1':'2';
    player.updatePosition(x,y);
    gameboard.markBoard(player);
    if(gameboard.checkBoard(player)){
        console.log(`Player ${currPlayer} Wins`);
    }
    else if(turn>=8)
    {
        console.log(`No result-> Draw`);
    }
    else{
        askMove()
    }


    // readline.question(`Player ${currPlayer}, enter your move(row, col) `,(input)=>{
    //     const [a, b]=input.split(',').map(Number);
    //     player.updatePosition(a,b);
    //     gameboard.markBoard(player);
    //     if(gameboard.checkBoard(player)){
    //         console.log(`Player ${currPlayer} Wins`);
    //         readline.close();
    //     }
    //     else if(turn>=8){
    //         console.log(`No result-> Draw`);
    //     }
    //     else{
    //         askMove(turn%2==0?player2:player1,turn+1,player1,player2);
    //     }
    // });
}
function createGame() {
    const player1 = createPlayer("X");
    const player2 = createPlayer("O");

    gameboard.initialize_board();
    askMove(player1, 0, player1, player2); // Start the game with player1 and pass both players for alternation
}})();

const display=(()=>{
    function renderBoard(){
        gameboard.initialize_board();
        board=gameboard.getBoard();
        let gameboardDiv=document.getElementById('gameBoard');
        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                board[i][j]="X";
                gameboardDiv.innerHTML+=`<div class="item" id="item${i}${j}"></div>`;
            }
        }
    }

    function addMark(){
        const btnsDiv=document.querySelectorAll('.item');
        btnsDiv.forEach((button)=>{
            button.addEventListener('click',function updatePostion() {
                let elementId=e.target.id.slice(-2);
                let row=parseInt(elementId[0]);
                let col=parseInt(elementId[1]);
                return [row ,col];
            })
        })
    }
    return {renderBoard,addMark};
})();

