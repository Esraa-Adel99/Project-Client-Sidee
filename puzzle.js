var divrows = 3 , divCol = 3, currTile ,otherTile, turns = 0;

window.onload = function() {
  
    for (var r = 0; r < divrows; r++) {
        for (var c = 0; c < divCol; c++) {
         
            var tile = document.createElement("img");
            tile.src = "alt.png";
            
          
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);   
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave); 
            tile.addEventListener("drop", dragDrop);       
            tile.addEventListener("dragend", dragEnd);      

            document.getElementById("board").append(tile);
        }
    }

    
    var pieces = [];
    for (var i=1; i <= divrows*divCol; i++) {
        pieces.push(i.toString()); 
    }
    pieces.reverse();
    for (var i =0; i < pieces.length; i++) {
        var j = Math.floor(Math.random() * pieces.length);

    
        var tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (var i = 0; i < pieces.length; i++) {
        var tile = document.createElement("img");
        tile.src = "./images/" + pieces[i] + ".jpg";
       

        
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);  
        tile.addEventListener("dragenter", dragEnter); 
        tile.addEventListener("dragleave", dragLeave); 
        tile.addEventListener("drop", dragDrop);       
        tile.addEventListener("dragend", dragEnd);     

        document.getElementById("pieces").append(tile);
    }
}

function dragStart() {
    currTile = this; 
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; 
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    var currImg = currTile.src;
    var  otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}


imgg1=document.getElementById("imgg");
 

setTimeout(function(){
    imgg1.style.opacity=0;

}, 1000);

    var l=59;
    var k=0;
    var over = false;
    function Time1()
    {
        

        var timerGame=document.querySelector('#time');
        var timerGamer=`00:0${k}:${l}`;
        timerGame.innerHTML=timerGamer;

        if(l>0){
            l--;
        }
       if(l==0)
         { 
            var gameover = document.getElementById("board");
            gameover.innerHTML = "Game Over";
            
           
            over = true;

            

         }
         
        }
if(over == false){

    setInterval(Time1,1000);

}
