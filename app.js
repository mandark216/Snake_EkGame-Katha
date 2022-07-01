// game const and varibles

let direction = { x: 0, y: 0 };
const foodeat = new Audio('Eat.mp3');
const over = new Audio('gameove.mp3');
const music = new Audio('BKM.mp3');
const move = new Audio('Move.mp3')
let speed = 5;
 let inputdir = { x: 0, y: 0 } 
let score =0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }]

food = {
    x: 16, y: 5
}

// game function

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}

function coli(snake){
    // if you umb into yourself
    for (let i = 1; i < snakeArr.length; i++) {
if(snake[i].x === snake[0].x   && snake[i].y === snake[0].y) {
    return true;
} }
if (snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y<=0  )   {
    return true;
}   
     
}

function gameEngine() {
    // part-1  update snke array and food


    if(coli(snakeArr)){
        over.play();
        music.pause();
        inputdir={x:0,y:0};
        alert("Game is Over. Press any key to play again")
        snakeArr = [
            { x: 13, y: 15 }]
            music.play();
            score = 0;
        
    }

    //  if you have eaten the food 

    if (snakeArr[0].y == food.y && snakeArr[0].x==food.x){
        foodeat.play();
        score +=1;
       scoreBox.innerHTML="Score : "+score;

       if(score>HiScoreVal){
        HiScoreVal=score;
        localStorage.setItem("HiScore",JSON.stringify(HiScoreVal))
        HB.innerHTML='Hi Score :'+ HiScoreVal;

       }
       if(score>=3){
        speed=6;
       }
       if(score>=7){
        speed=9;
       }
       if(score>=15){
        speed=12;
       }
       if(score>=25){
        speed=16;
       }

        snakeArr.unshift({x:snakeArr[0].x + inputdir.x ,y:snakeArr[0].y + inputdir.y})
        let a=2;
        let b=16;

        food =  {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }

    // moving array
    for (let i = snakeArr.length-2; i >=0 ; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x  += inputdir.x;
    snakeArr[0].y  += inputdir.y;

    // part-2 display the food and snake
    //snake element

    board.innerHTML = " ";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // // food element
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}








// main logic start here

let HiScore=localStorage.getItem('HiScore');
if(HiScore===null)
{
    HiScoreVal=0;
    localStorage.setItem('HiScore',JSON.stringify(HiScoreVal))
}
else{
    HiScoreVal=JSON.parse(HiScore)
    HB.innerHTML='Hi Score :'+HiScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }  
    //game staart
    move.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp")
            inputdir.x= 0 ;
            inputdir.y=-1 ;
            break;

        case "ArrowDown":
            // console.log("ArrowDown")
            inputdir.x= 0 ;
            inputdir.y= 1;
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft")
            inputdir.x= -1;
            inputdir.y= 0;
            break;
            case "ArrowRight":
                // console.log("ArrowRight")
                inputdir.x= 1;
                inputdir.y= 0;
                break;

        default:
            break;
    }
})