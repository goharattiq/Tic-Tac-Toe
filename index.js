// Game Board
var tab = $("table");
var cell = 0;
var array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var player_1=0;
var player_2=0;
gameBoard();

function gameBoard(){
  $(".player_1 p").text(player_1);
  $(".player_2 p").text(player_2);
  for (var i = 0; i < 3; i++) {
    var row = "<tr>";
    for (var j = 0; j < 3; j++) {
      row += "<th class='cell' id='cell-" + cell + "'>" +array[cell]+ "</th>";
      cell++;
    }
    row += '</tr>';
    tab.append(row);
  }
  cell = 0;
  $("th").click(function() {
    changeElement($(this));
  });
}



//Game Play

//event Listenr

cell = 0;
var cellEle = 'X';
$("th").click(function() {
  changeElement($(this));
});

function changeElement(TH) {
  var soudPlayer = " ";
  var text = TH.text();
  if (text === 'X' || text === 'O') {} else {
    if (cell % 2 === 0) {
      cellEle = 'X';
      soundPlayer = "player1";
    } else {
      cellEle = 'O';
      soundPlayer = "player2";
    }

    TH.text(cellEle);
    gameSound(soundPlayer);
    array[Number(text)] = cellEle;
    cell++;
    cellEle = checkGameBoard(cellEle);

    //Game Win
    if (cellEle[0] != "None") {
      gameWin(cellEle);
      gameSound("win");
      setTimeout(function() {
        gameReset();
        gameBoard();
      }, 1000);
    }


    //Game Draw
    if (cell === 9) {
      gameDraw();
      gameSound("draw");
      setTimeout(function() {
        gameReset();
        gameBoard();
      }, 1000);

    }
  }
}

function checkGameBoard(cellEle) {
  if (array[0] === array[1] && array[1] === array[2] && array[0] === cellEle) {
    return [cellEle, 0, 1, 2];
  }
  if (array[3] === array[4] && array[4] === array[5] && array[5] === cellEle) {
    return [cellEle, 3, 4, 5];
  }
  if (array[6] === array[7] && array[8] === array[7] && array[6] === cellEle) {
    return [cellEle, 6, 7, 8];
  }
  if (array[0] === array[3] && array[3] === array[6] && array[6] === cellEle) {
    return [cellEle, 0, 3, 6];
  }
  if (array[1] === array[4] && array[4] === array[7] && array[4] === cellEle) {
    return [cellEle, 1, 4, 7];
  }
  if (array[2] === array[5] && array[5] === array[8] && array[8] === cellEle) {
    return [cellEle, 2, 5, 8];
  }
  if (array[0] === array[4] && array[4] === array[8] && array[8] === cellEle) {
    return [cellEle, 0, 4, 8];
  }
  if (array[2] === array[4] && array[4] === array[6] && array[6] === cellEle) {
    return [cellEle, 2, 4, 6];
  }
  cellEle = "None";
  return [cellEle];
}



function gameWin(cellEle) {
  var winner = " ";
  if (cellEle[0] === "X") {
    winner = "Player 1";
    player_1+=1;

  } else {
    winner = "Player 2";
    player_2+=1;
  }



  for (var i = 1; i < cellEle.length; i++) {
    $("#cell-" + cellEle[i]).addClass("game-win");
  }
  setTimeout(function() {
    $("#cell-" + cellEle[1]).removeClass("game-win");
  }, 400);
  setTimeout(function() {
    $("#cell-" + cellEle[2]).removeClass("game-win");
  }, 400);
  setTimeout(function() {
    $("#cell-" + cellEle[3]).removeClass("game-win");
  }, 400);
}

function gameDraw() {
  $("th").addClass("game-over");
  setTimeout(function() {
    $("th").removeClass("game-over");
  }, 400);
}

function gameSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function gameReset(){
    cell=0;
    array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    $("th").remove();
}

function resetPlayers(){
  gameReset();
  player_2=0;
  player_1=0;
}