
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
        return Horizontal_validator||Vertical_validator||Left_Diagonal_validator||Right_Diagonal_validator;
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

const game=(()=>{
    let currentPlayer;
    let turn;
    let player1;
    let player2;
    function toggleCurrentPlayer(){
        if(currentPlayer===0){
            currentPlayer=1;
        }
        else{
            currentPlayer=0;
        }
    }
    

    function start(event) {
        gameboard.initialize_board();
        display.renderBoard();
        let buttonDivs=document.querySelectorAll('.item');
console.log(buttonDivs);
buttonDivs.forEach((button)=>{button.addEventListener('click',game.gameController)});
        turn=0;
        currentPlayer=0;
        player1=createPlayer("X");
        player2=createPlayer("O");
    }

    function gameController(event){
        let elementId=event.target.id.slice(-2);
        let x=parseInt(elementId[0]);
        let y=parseInt(elementId[1]);
        game.makeMove(x,y,event);
    }

    function makeMove(x,y,event){
        let tempPlayer;
        if (currentPlayer === 0) {
            player1.updatePosition(x, y);
            tempPlayer=player1;
        } else {
            player2.updatePosition(x, y);
            tempPlayer=player2;
        }
        gameboard.markBoard(tempPlayer);
        event.target.innerText=tempPlayer.operator;
        if(gameboard.checkBoard(tempPlayer)===true)
        {
            display.renderWin(tempPlayer);
        }
        else if(turn>=8)
        {
            display.renderDraw();
        }
        else{
            turn++;
            toggleCurrentPlayer();
        }
}
return {start,gameController,makeMove}
})();



const display=(()=>{
    function renderBoard(){
        gameboard.initialize_board();
        board=gameboard.getBoard();
        let gameboardDiv=document.getElementById('gameBoard');
        for(let i=0;i<3;i++)
        {
            for(let j=0;j<3;j++)
            {
                gameboardDiv.innerHTML+=`<div class="item" id="item${i}${j}"></div>`;
            }
        }
    }

    function reRenderBoard(){
        gameboard.clearBoard();
        let gameboardDiv=document.getElementById('gameBoard');
        gameboardDiv.innerHTML="";
    }
       
    function renderWin(player){
        let container=document.querySelector('.container');
        let winDiv=document.createElement('div');
        winDiv.innerText=`Player with operator ${player.operator} wins`;
        container.append(winDiv);
    }
    function renderDraw(player){
        let container=document.querySelector('.container');
        let winDiv=document.createElement('div');
        winDiv.innerText=`It's a draw`;
        container.append(winDiv);
    }

    function addRestartEventListener(){
        const restartDiv=document.getElementById('restart-btn');
        restartDiv.addEventListener('click',reRenderBoard);
        restartDiv.addEventListener('click',game.start);
    }

    function addStartEventListener(){
        let startDiv=document.getElementById('start-btn');
        startDiv.addEventListener('click',game.start);
        display.addRestartEventListener();
    }
    return {renderBoard,renderWin,renderDraw,addRestartEventListener,addStartEventListener};
})();

display.addStartEventListener();
