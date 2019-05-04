//VAR DECELERATION
var context = canvas.getContext("2d");
var shape = new Object();
var board = document.getElementById("canvas");
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var Game_song = new Audio('project_files/audio/you_are_totahh.mp3');
var playername;
var color_5P;
var color_15P;
var color_25P;
var Balls_num;
var Game_time;
var Monster_num;
var Key_up;
var Key_down;
var Key_left;
var Key_right;
var lives = 3;
var verdict;
var FG_interval;
var G_interval;
var X_monster1 = 0;
var Y_monster1 = 0;
var X_monster2 = 0;
var Y_monster2 = 9;
var X_monster3 = 9;
var Y_monster3 = 0;
var X_Pac = 9;
var Y_Pac = 9;
var X_Life;
var Y_Life;
var X_Mushroom;
var Y_Mushroom;


//FUNCTIONS

////<-- about -->////
function Game_About() {


}

////<-- user registraion -->////
function Game_Register() {


}

////<-- user login -->////
function Game_Login() {


}

function First_Load() {
    Show_Tab('Home');
}


function Show_Tab(id) {
    var Home_tab = document.getElementById('Home');
    Home_tab.style.display = "none";
    var Register_tab = document.getElementById('Register');
    Register_tab.style.display = "none";
    var Login_tab = document.getElementById('Login');
    Login_tab.style.display = "none";
    var About_tab = document.getElementById('About');
    About_tab.style.display = "none";
    var Game_tab1 = document.getElementById('game_page1');
    Game_tab1.style.display = "none";
    var Game_tab2 = document.getElementById('game_page2');
    Game_tab2.style.display = "none";
    var Game_tab3 = document.getElementById('game_page3');
    Game_tab3.style.display = "none";


    //current tab presenteds
    var Current = document.getElementById(id);
    Current.style.display = "block";
}


////<-- game -->////
function New_Game() {
    Show_Tab('game_page1');
    Game_song.loop = true;
    Game_song.pause();
    window.clearInterval(interval);
    window.clearInterval(FG_interval);
    window.clearInterval(G_nterval);
}

function RandomSettings() {


}


function Start_Game() {
    Start();
    Draw();
    Show_Tab('game_page2');
}


function Start() {
    Balls_num = $('input[name=BallsOption]:checked').val();
    color_5P = Math.floor(0.6 * Balls_num);
    color_15P = Math.floor(0.3 * Balls_num);
    color_25P = Math.floor(0.1 * Balls_num);
    Game_time = $('input[name=TimeOption]:checked').val();
    Monster_num = $('input[name=MonsterOption]:checked').val();
    Key_up = document.getElementById("UP").value;
    Key_down = document.getElementById("DOWN").value;
    Key_left = document.getElementById("LEFT").value;
    Key_right = document.getElementById("RIGHT").value;
    document.getElementById("lblLive").value = lives;


    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = Balls_num;
    var pacman_remain = 1;
    start_time = new Date();


    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    // food_remain--;
                    // board[i][j] = 1;
                    var tmp_rand = Math.random();
                    var tmp = food_remain;
                    if (tmp_rand < 0.6 && color_5P > 0) {
                        board[i][j] = 1;
                        food_remain--;
                        color_5P--;
                    } else if (tmp_rand > 0.6 && tmp_rand < 0.9 && color_15P > 0) {
                        board[i][j] = 5;
                        food_remain--;
                        color_15P--;
                    } else if (color_25P > 0) {
                        board[i][j] = 6;
                        food_remain--;
                        color_25P--;
                    }
                    if (food_remain == tmp) {
                        if (color_25P > 0) {
                            board[i][j] = 6;
                            food_remain--;
                            color_25P--;
                        } else if (color_15P > 0) {
                            board[i][j] = 5;
                            food_remain--;
                            color_15P--;
                        } else {
                            board[i][j] = 1;
                            food_remain--;
                            color_5P--;
                        }
                    }
                } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }

    SetNewElemntsPos();
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval = setInterval(UpdatePosition, 130);
    FG_interval = setInterval(UpdateMonsters, 880);
    G_interval = setInterval(UpdatePacman, 880);

    function myKeyPress(e) {
        var keynum;

        if (window.event) {
            keynum = e.keyCode;
        } else if (e.which) {
            keynum = e.which;
        }
        alert(String.fromCharCode(keynum));
    }
}

function SetNewElemntsPos() {
    var tmplife = findRandomEmptyCell(board);
    X_Life = tmplife[0];
    Y_Life = tmplife[1];
    board[tmplife[0]][tmplife[1]] = 9;
    var tmpmush = findRandomEmptyCell(board);
    X_Mushroom = tmpmush[0];
    Y_Mushroom = tmpmush[1];
    board[tmpmush[0]][tmpmush[1]] = 10;
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 9) + 1);
    var j = Math.floor((Math.random() * 9) + 1);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 9) + 1);
        j = Math.floor((Math.random() * 9) + 1);
    }
    return [i, j];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown['ArrowUp']) {
        return 1;
    }
    if (keysDown['ArrowDown']) {
        return 2;
    }
    if (keysDown['ArrowLeft']) {
        return 3;
    }
    if (keysDown['ArrowRight']) {
        return 4;
    }
}

function Draw(P) {
    var Monster1_img = document.getElementById("M1")
    var Monster2_img = document.getElementById("M2")
    var Monster3_img = document.getElementById("M3")
    var Pacman_img = document.getElementById("Pac")
    var Mush_img = document.getElementById("Mush")
    var Life_img = document.getElementById("Life")


    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] === 2) {
                // // context.beginPath();
                // context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                // // context.lineTo(center.x, center.y);
                // // context.fillStyle = pac_color; //color
                //
                // // context.fill();
                // // context.beginPath();
                // context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                // // context.fillStyle = "black"; //color
                // // context.fill();


                if (P == 1) //up
                {
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();

                }
                if (P == 2) //down
                {
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();

                }
                if (P == 3) // left
                {
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
                if (P == 4) // right
                {
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();

                }
            } else if (board[i][j] === 1) {
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();

            } else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();

            } else if (board[i][j] == 5) {
                context.beginPath();
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = color15; //color
                context.fill();
            } else if (board[i][j] == 6) {
                context.beginPath();
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = color25; //color
                context.fill();
            }
        }
    }

    context.drawImage(Monster1_img, 25 * xM1, 25 * yM1, 23, 23);
    context.drawImage(Monster2_img, 25 * xM2, 25 * yM2, 23, 23);
    context.drawImage(Monster3_img, 25 * xM3, 25 * yM3, 23, 23);
    context.drawImage(Pacman_img, 25 * xMsPac, 25 * yMsPac, 23, 23);
    context.drawImage(Mush_img, 25 * xCerry, 25 * yCherry, 23, 23);
    context.drawImage(Life_img, 25 * xClock, 25 * yClock, 23, 23);
}


/////////////
function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }
    }
    if (x === 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
    }
    if (x === 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] === 1) {
        score++;
    }
    if (board[shape.i][shape.j] === 5) {
        score++;
    }
    if (board[shape.i][shape.j] === 6) {
        score++;
    }

    if (shape.i==lifex && shape.j == lifey) {
        board[lifex][lifey]=0;
        lifex=-1;
        lifey=-1;
        numOfLife++;
        board[shape.i][shape.j]=2;
    }

    if (shape.i == xMsPac && shape.j == yMsPac) {
        score += 50;
        xMsPac = 70;
        yMsPac = 70;
    }

    // board[shape.i][shape.j] = 2;
    // var currentTime = new Date();
    // time_elapsed = (currentTime - start_time) / 1000;
    // if (score >= 20 && time_elapsed <= 10) {
    //     pac_color = "green";
    // }
    // if (score === 50) {
    //     window.clearInterval(interval);
    //     window.alert("Game completed");
    // } else {
    //     Draw();
    // }


    if ((shape.i==gst1X && shape.j == gst1Y)||(shape.i==gst2X && shape.j == gst2Y)|| (shape.i==gst3X && shape.j == gst3Y)){
        numOfLife--;
        if(numOfLife!=0)
        {
            pausetime=new Date();
            window.alert("Stay Away From Ghosts!! "+numOfLife+ " Life left");
            var d=new Date();
            timechange+=(d-pausetime)/1000;
        }
        else
        {
            window.alert("Game Over!! "+numOfLife+ " Life left");
            window.clearInterval(interval);
            window.clearInterval(foodghoustinterval);
            window.clearInterval(Ghoustinterval);
            audio.pause();
            return;
        }
        document.getElementById("lbllife").value=numOfLife;

        if(gst1X!=-1&& gst1Y!=-1)
        {
            board[gst1X][gst1Y]=0;
            gst1X=0;
            gst1Y=0;
            board[gst1X][gst1Y]=6;
        }
        if(gst2X!=-1 && gst2Y!=-1)
        {
            board[gst2X][gst2Y]=0;
            gst2X=0;
            gst2Y=15;
            board[gst2X][gst2Y]=7;
        }
        if(gst3X!=-1&& gst3Y!=-1)
        {
            board[gst3X][gst3Y]=0;
            gst3X=15;
            gst3Y=0;
            board[gst3X][gst3Y]=8;
        }
        board[shape.i][shape.j]=0;
        var pacnewPos=findRandomEmptyCell(board);
        shape.i=pacnewPos[0];
        shape.j=pacnewPos[1];
        board[shape.i][shape.j]=2;
        position=4;
        keysDown = {};
        addEventListener("keydown", function (e) {
            keysDown[e.keyCode] = true;
        }, false);
        addEventListener("keyup", function (e) {
            keysDown[e.keyCode] = false;
        }, false);
    }

    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000- timechange;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (time_elapsed>=gameTime || score==maxScore) {
        if(score>=150)
        {
            window.alert("We Have a Winner!");
        }
        else
        {
            window.alert("You can do better!");
        }
        window.clearInterval(interval);
        window.clearInterval(foodghoustinterval);
        window.clearInterval(Ghoustinterval);
        audio.pause();
        audio.load();
    }
    else {
        Draw(position);
    }

}

function UpdateMonsters() {
    if (gst1X != -1 && gst1Y != -1)
        calcGstMove(1, gst1X, gst1Y);
    if (gst2X != -1 && gst2Y != -1)
        calcGstMove(2, gst2X, gst2Y);
    if (gst3X != -1 && gst3Y != -1)
        calcGstMove(3, gst3X, gst3Y);
}

function MonsterMove(gst, gstX, gstY) {
    var upMove = 2560, downMove = 2560, rightMove = 2560, leftMove = 2560;

    //check that moves are leagel - not walls

    //up
    if (gstY - 1 >= 0 && isLegalMove(gstX, gstY - 1))
        upMove = ghostPacmanDistance(gstX, gstY - 1);

    //down
    if (gstY + 1 <= 15 && isLegalMove(gstX, gstY + 1))
        downMove = ghostPacmanDistance(gstX, gstY + 1);

    //right
    if (gstX + 1 <= 15 && isLegalMove(gstX + 1, gstY))
        rightMove = ghostPacmanDistance(gstX + 1, gstY);

    //left
    if (gstX - 1 >= 0 && isLegalMove(gstX - 1, gstY))
        leftMove = ghostPacmanDistance(gstX - 1, gstY);

    var minMove = Math.min(upMove, downMove, rightMove, leftMove);
    if (minMove == upMove) {
        changeMon(gst, gstX, gstY - 1);
        return;
    }
    if (minMove == downMove) {
        changeMon(gst, gstX, gstY + 1);
        return;
    }
    if (minMove == rightMove) {
        changeMon(gst, gstX + 1, gstY);
        return;
    }
    if (minMove == leftMove) {
        changeMon(gst, gstX - 1, gstY);
        return;
    }
}

function changeMon(mon, x, y) {
    if (mon == 1) {
        board[gst1X][gst1Y] = 0;
        gst1X = x;
        gst1Y = y;
        board[gst1X][gst1Y] = 6;
    } else if (mon == 2) {
        board[gst2X][gst2Y] = 0;
        gst2X = x;
        gst2Y = y;
        board[gst2X][gst2Y] = 7;
    } else if (mon == 3) {
        board[gst3X][gst3Y] = 0;
        gst3X = x;
        gst3Y = y;
        board[gst3X][gst3Y] = 8;
    }
}

function CalcDistance(posX, posY) {
    var xPac = shape.i;
    var yPca = shape.j;
    var xPow = Math.pow(xPac - posX, 2);
    var yPow = Math.pow(yPca - posY, 2);
    return Math.sqrt(xPow + yPow);

}

function UpdatePacman() {
    var positions = getAllPossibleMoves();
    var numOfMoves = positions.length;
    var rand = Math.random();
    if (numOfMoves == 1) {
        xMsPac = positions[0][0];
        yMsPac = positions[0][1];
    }
    if (numOfMoves == 2) {
        if (rand <= 0.5) {
            xMsPac = positions[0][0];
            yMsPac = positions[0][1];
        } else {
            xMsPac = positions[1][0];
            yMsPac = positions[1][1];
        }
    }
    if (numOfMoves == 3) {
        if (rand <= 0.33) {
            xMsPac = positions[0][0];
            yMsPac = positions[0][1];
        } else if (rand > 0.33 && rand < 0.66) {
            xMsPac = positions[1][0];
            yMsPac = positions[1][1];
        } else {
            xMsPac = positions[2][0];
            yMsPac = positions[2][1];
        }
    }
    if (numOfMoves == 4) {
        if (rand <= 0.25) {
            xMsPac = positions[0][0];
            yMsPac = positions[0][1];
        } else if (rand > 0.25 && rand < 0.5) {
            xMsPac = positions[1][0];
            yMsPac = positions[1][1];
        } else if (rand > 0.5 && rand <= 0.75) {
            xMsPac = positions[2][0];
            yMsPac = positions[2][1];
        } else {
            xMsPac = positions[3][0];
            yMsPac = positions[3][1];
        }
    }

}

function getAllPossibleMoves() {
    var arrayOfMoves = [];
    var posX = xMsPac;
    var posY = yMsPac;
    if (posX + 1 < 20 && board[posX + 1][posY] != 4) {
        arrayOfMoves.push([posX + 1, posY]);
    }
    if (posX - 1 > -1 && board[posX - 1][posY] != 4) {
        arrayOfMoves.push([posX - 1, posY]);
    }
    if (posY + 1 < 20 && board[posX][posY + 1] != 4) {
        arrayOfMoves.push([posX, posY + 1]);
    }
    if (posY - 1 > -1 && board[posX][posY - 1] != 4) {
        arrayOfMoves.push([posX, posY - 1]);
    }
    return arrayOfMoves;

}
