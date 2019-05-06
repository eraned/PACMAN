//VAR DECELERATION
var context = canvas.getContext("2d");
var Pacman = new Object();
var board = document.getElementById("canvas");
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var Game_song = new Audio('project_files/audio/you_are_totahh.mp3');
var Player_name;
var color_5P;
var color_15P;
var color_25P;
var Balls_num;
var Game_time;
var Monster_num;
var Key_up = 38;
var Key_down = 40;
var Key_left = 37;
var Key_right = 39;
var lives;
var Max_points;
var verdict;
var B_interval;
var M_interval;
var X_monster1 = 0;
var Y_monster1 = 0;
var X_monster2 = 0;
var Y_monster2 = 9;
var X_monster3 = 9;
var Y_monster3 = 0;
var X_Life;
var Y_Life;
var X_Mushroom;
var Y_Mushroom;
var X_Boost;
var Y_Boost;
var currPos = 4;


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

function ClearAll() {
    document.getElementById('BallsOption').checked = false;
    document.getElementById('TimeOption').checked = false;
    document.getElementById('MonsterOption').checked = false;
    document.getElementById('ColorOption').attr("value","white");
}


////<-- game -->////
function New_Game() {
    Show_Tab('game_page1');
    window.clearInterval(interval);
    window.clearInterval(B_interval);
    window.clearInterval(M_interval);
    lives = 3;
    UpdateLives();
    Balls_num = document.querySelector('input[name="BallsOption"]:checked').value;
    Game_time = document.querySelector('input[name="TimeOption"]:checked').value;
    Monster_num = document.querySelector('input[name="MonsterOption"]:checked').value;
    color_5P = Math.floor(0.6 * Balls_num);
    color_15P = Math.floor(0.3 * Balls_num);
    color_25P = Math.floor(0.1 * Balls_num);
    Max_points = 50 + 5 * color_5P + 15 * color_15P + 25 * color_25P;


    ///get keys hereee





    if (Monster_num == 3) {
        X_monster1 = 0;
        Y_monster1 = 0;
        X_monster2 = 0;
        Y_monster2 = 9;
        X_monster3 = 9;
        Y_monster3 = 0;
    } else if (Monster_num == 2) {
        X_monster1 = 0;
        Y_monster1 = 0;
        X_monster2 = 0;
        Y_monster2 = 9;
        X_monster3 = -1;
        Y_monster3 = -1;
    } else if (Monster_num == 1) {
        X_monster1 = 0;
        Y_monster1 = 0;
        X_monster2 = -1;
        Y_monster2 = -1;
        X_monster3 = -1;
        Y_monster3 = -1;
    }
    // Start_Game();
}

function myKeyPress(e, event) {
    var k = event.keyCode;
    var type = e.id;

    if (type == "UP") {
        Key_up = k;

    } else if (type == "DOWN") {
        Key_down = k;

    } else if (type == "LEFT") {

        Key_left = k;
    } else if (type == "RIGHT") {

        Key_right = k;
    }
    alert(String.fromCharCode(k));
}

function RandomSettings() {
    let Rand_Balls_num = Math.floor(Math.random() * (5));
    $('input:radio[name=BallsOption]')[Rand_Balls_num].checked = true;
    $("#5P_color").attr("value", RandomColor());
    $("#15P_color").attr("value", RandomColor());
    $("#25P_color").attr("value", RandomColor());
    let Rand_Game_time = Math.floor(Math.random() * (3));
    $('input:radio[name=TimeOption]')[Rand_Game_time].checked = true;
    let Rand_Monster_num = Math.floor(Math.random() * (3));
    $('input:radio[name=MonsterOption]')[Rand_Monster_num].checked = true;
    New_Game();
}

function RandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function Start_Game() {
    Show_Tab('game_page2');
    Game_song.loop = true;
    Game_song.play();
    Start();
    Draw();
}


function Start() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 225;
    var food_remain = Balls_num;
    var pacman_remain = 1;
    start_time = new Date();
    time_elapsed = 0;
    for (var i = 0; i < 14; i++) {
        board[i] = new Array();
        for (var j = 0; j < 14; j++) {
            if (((i == 1 || i == 12) && (j == 2 || j == 3 || j == 4 || j == 9 || j == 10)) ||
                ((i == 2 || i == 11) && (j == 0 || j == 4 || j == 5 || j == 6 || j == 9 || j == 10 || j == 11)) ||
                ((i == 3 || i == 10) && (j == 6 || j == 11)) ||
                ((i == 4 || i == 9) && (j == 2 || j == 4 || j == 11)) ||
                ((i == 5 || i == 8) && (j == 2 || j == 6 || j == 7 || j == 11)) ||
                ((i == 6 || i == 7) && (j == 7))
            )
                board[i][j] = 4;
            else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    var tmp_rand = Math.random();
                    var tmp = food_remain;
                    if (tmp_rand < 0.6 && color_5P > 0) {
                        board[i][j] = 8;
                        food_remain--;
                        color_5P--;
                    } else if (tmp_rand > 0.6 && tmp_rand < 0.9 && color_15P > 0) {
                        board[i][j] = 9;
                        food_remain--;
                        color_15P--;
                    } else if (color_25P > 0) {
                        board[i][j] = 10;
                        food_remain--;
                        color_25P--;
                    }
                    if (food_remain == tmp) {
                        if (color_25P > 0) {
                            board[i][j] = 10;
                            food_remain--;
                            color_25P--;
                        } else if (color_15P > 0) {
                            board[i][j] = 9;
                            food_remain--;
                            color_15P--;
                        } else {
                            board[i][j] = 8;
                            food_remain--;
                            color_5P--;
                        }
                    }
                } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                    Pacman.i = i;
                    Pacman.j = j;
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
    B_interval = setInterval(UpdateMonsters, 880);
    M_interval = setInterval(RandBoost, 880);
}

function SetNewElemntsPos() {
    var tmpboost = findRandomEmptyCell(board);
    X_Boost = tmpboost[0];
    Y_Boost = tmpboost[1];
    board[tmpboost[0]][tmpboost[1]] = 11;
    var tmplife = findRandomEmptyCell(board);
    X_Life = tmplife[0];
    Y_Life = tmplife[1];
    board[tmplife[0]][tmplife[1]] = 12;
    var tmpmush = findRandomEmptyCell(board);
    X_Mushroom = tmpmush[0];
    Y_Mushroom = tmpmush[1];
    board[tmpmush[0]][tmpmush[1]] = 13;
}


function Draw(Pos) {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 14; j++) {
            var center = new Object();
            center.x = i * 35 + 18;
            center.y = j * 35 + 18;
            if (board[i][j] === 2) {
                context.beginPath();
                if (Pos == 1) {
                    context.arc(center.x, center.y, 18, 1.35 * Math.PI, 1.65 * Math.PI, true);
                } else if (Pos == 2) {
                    context.arc(center.x, center.y, 18, 0.35 * Math.PI, 0.65 * Math.PI, true);
                } else if (Pos == 3) {
                    context.arc(center.x, center.y, 18, 1.15 * Math.PI, 0.85 * Math.PI);
                } else {
                    context.arc(center.x, center.y, 18, 0.15 * Math.PI, 1.85 * Math.PI);
                }
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                if (Pos == 1) {
                    context.arc(center.x + 8, center.y - 4, 2, 0, 2 * Math.PI);
                } else if (Pos == 2) {
                    context.arc(center.x + 8, center.y + 4, 2, 0, 2 * Math.PI);
                } else if (Pos == 3) {
                    context.arc(center.x - 4, center.y - 8, 2, 0, 2 * Math.PI);
                } else {
                    context.arc(center.x + 4, center.y - 8, 2, 0, 2 * Math.PI);
                }
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 20, center.y - 20, 35, 35);
                context.fillStyle = "black"; //color
                context.fill();
                context.strokeRect(center.x - 20, center.y - 20, 35, 35);
            } else if (board[i][j] == 5) {
                var Monster1_img = document.getElementById("M1")
                context.drawImage(Monster1_img, 35 * X_monster1, 35 * Y_monster1, 35, 35);
            } else if (board[i][j] == 6) {
                var Monster2_img = document.getElementById("M2")
                context.drawImage(Monster2_img, 35 * X_monster2, 35 * Y_monster2, 35, 35);
            } else if (board[i][j] == 7) {
                var Monster3_img = document.getElementById("M3")
                context.drawImage(Monster3_img, 35 * X_monster3, 35 * Y_monster3, 35, 35);
            } else if (board[i][j] == 8) {
                context.beginPath();
                context.arc(center.x, center.y, 7, 0, 2 * Math.PI);
                context.fillStyle = document.getElementById("5P_color").value;
                context.fill();
            } else if (board[i][j] == 9) {
                context.beginPath();
                context.arc(center.x, center.y, 7, 0, 2 * Math.PI);
                context.fillStyle = document.getElementById("15P_color").value;
                context.fill();
            } else if (board[i][j] == 10) {
                context.beginPath();
                context.arc(center.x, center.y, 7, 0, 2 * Math.PI);
                context.fillStyle = document.getElementById("25P_color").value;
                context.fill();
            } else if (board[i][j] == 11) {
                var Boost_img = document.getElementById("Boost")
                context.drawImage(Boost_img, 35 * X_Boost, 35 * Y_Boost, 35, 35);
            } else if (board[i][j] == 12) {
                var Life_img = document.getElementById("Life")
                context.drawImage(Life_img, 35 * X_Life, 35 * Y_Life, 35, 35);
            } else if (board[i][j] == 13) {
                var Mush_img = document.getElementById("Mush")
                context.drawImage(Mush_img, 35 * X_Mushroom, 35 * Y_Mushroom, 35, 35);
            }
        }
    }
}


function UpdatePosition() {
    board[Pacman.i][Pacman.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        if (Pacman.j > 0 && board[Pacman.i][Pacman.j - 1] !== 4) {
            Pacman.j--;
        }
        currPos = x;
    }
    if (x === 2) {
        if (Pacman.j < 13 && board[Pacman.i][Pacman.j + 1] !== 4) {
            Pacman.j++;
        }
        currPos = x;
    }
    if (x === 3) {
        if (Pacman.i > 0 && board[Pacman.i - 1][Pacman.j] !== 4) {
            Pacman.i--;
        }
        currPos = x;
    }
    if (x === 4) {
        if (Pacman.i < 13 && board[Pacman.i + 1][Pacman.j] !== 4) {
            Pacman.i++;
        }
        currPos = x;
    }
    if (board[Pacman.i][Pacman.j] == 8) {
        score += 5;
    }
    if (board[Pacman.i][Pacman.j] == 9) {
        score += 15;
    }
    if (board[Pacman.i][Pacman.j] == 10) {
        score += 25;
    }
    if (Pacman.i == X_Boost && Pacman.j == Y_Boost) {
        score += 50;
        X_Boost = -1;
        Y_Boost = -1;
        board[Pacman.i][Pacman.j] = 2;
    }
    if (Pacman.i == X_Mushroom && Pacman.j == Y_Mushroom) {
        board[X_Mushroom][Y_Mushroom] = 0;
        score += 25;
        X_Mushroom = -1;
        Y_Mushroom = -1;
        board[Pacman.i][Pacman.j] = 2;
    }
    if (Pacman.i == X_Life && Pacman.j == Y_Life) {
        board[X_Life][Y_Life] = 0;
        X_Life = -1;
        Y_Life = -1;
        lives++;
        UpdateLives();
        board[Pacman.i][Pacman.j] = 2;
    }

    if ((Pacman.i == X_monster1 && Pacman.j == Y_monster1) || (Pacman.i == X_monster2 && Pacman.j == Y_monster2) || (Pacman.i == X_monster3 && Pacman.j == Y_monster3)) {
        lives--;
        UpdateLives();
        if (X_monster1 != -1 && Y_monster1 != -1) {
            board[X_monster1][Y_monster1] = 0;
            X_monster1 = 0;
            Y_monster1 = 0;
            board[X_monster1][Y_monster1] = 5;
        }
        if (X_monster2 != -1 && Y_monster2 != -1) {
            board[X_monster2][Y_monster2] = 0;
            X_monster2 = 0;
            Y_monster2 = 15;
            board[X_monster2][Y_monster2] = 6;
        }
        if (X_monster3 != -1 && Y_monster3 != -1) {
            board[X_monster3][Y_monster3] = 0;
            X_monster3 = 15;
            Y_monster3 = 0;
            board[X_monster3][Y_monster3] = 7;
        }
        board[Pacman.i][Pacman.j] = 0;
        var newPos = findRandomEmptyCell(board);
        Pacman.i = newPos[0];
        Pacman.j = newPos[1];
        board[Pacman.i][Pacman.j] = 2;
        currPos = 4;
        keysDown = {};
        addEventListener("keydown", function (e) {
            keysDown[e.keyCode] = true;
        }, false);
        addEventListener("keyup", function (e) {
            keysDown[e.keyCode] = false;
        }, false);
    }
    board[Pacman.i][Pacman.j] = 2;
    var currentTime = new Date();
    time_elapsed = Math.floor(Game_time - (currentTime - start_time) / 1000);
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (time_elapsed >= Game_time || score == Max_points || lives == 0) {
        Finish_Game();
    } else {
        Draw(currPos);
    }
}

function UpdateMonsters() {
    if (X_monster1 != -1 && Y_monster1 != -1)
        MonsterMove(1, X_monster1, Y_monster1);
    if (X_monster2 != -1 && Y_monster2 != -1)
        MonsterMove(2, X_monster2, Y_monster2);
    if (X_monster3 != -1 && Y_monster3 != -1)
        MonsterMove(3, X_monster3, Y_monster3);
}

function MonsterMove(monster, posX, posY) {
    var rightMove = 1000;
    var leftMove = 1000;
    var downMove = 1000;
    var upMove = 1000;
    if (posX + 1 < 14 && board[posX + 1][posY] != 4) {
        rightMove = CalcDistance(posX + 1, posY);
    }
    if (posX - 1 > -1 && board[posX - 1][posY] != 4) {
        leftMove = CalcDistance(posX - 1, posY);
    }
    if (posY + 1 < 14 && board[posX][posY + 1] != 4) {
        downMove = CalcDistance(posX, posY + 1);
    }
    if (posY - 1 > -1 && board[posX][posY - 1] != 4) {
        upMove = CalcDistance(posX, posY - 1);
    }
    var minMove = Math.min(upMove, downMove, rightMove, leftMove);
    if (minMove == upMove) {
        RelocatMon(monster, posX, posY - 1);
        return;
    }
    if (minMove == downMove) {
        RelocatMon(monster, posX, posY + 1);
        return;
    }
    if (minMove == rightMove) {
        RelocatMon(monster, posX + 1, posY);
        return;
    }
    if (minMove == leftMove) {
        RelocatMon(monster, posX - 1, posY);
        return;
    }
}

function RelocatMon(monster, posX, posY) {
    if (monster == 1) {
        board[X_monster1][Y_monster1] = 0;
        X_monster1 = posX;
        Y_monster1 = posY;
        board[X_monster1][Y_monster1] = 5;
    } else if (monster == 2) {
        board[X_monster2][Y_monster2] = 0;
        X_monster2 = posX;
        Y_monster2 = posY;
        board[X_monster2][Y_monster2] = 6;
    } else if (monster == 3) {
        board[X_monster3][Y_monster3] = 0;
        X_monster3 = posX;
        Y_monster3 = posY;
        board[X_monster3][Y_monster3] = 7;
    }
}

function CalcDistance(posX, posY) {
    var X_Pac = Pacman.i;
    var Y_Pac = Pacman.j;
    var XPow = Math.pow(X_Pac - posX, 2);
    var YPow = Math.pow(Y_Pac - posY, 2);
    return Math.sqrt(XPow + YPow);
}

function RandBoost() {
    if ((X_Boost == -1 && Y_Boost == -1) || X_Boost == undefined || Y_Boost == undefined)
        return;
    var random = Math.random();
    tmpX = X_Boost;
    tmpY = Y_Boost;

    // var up, down, ledt, right;
    if (tmpX + 1 < 14 && board[tmpX + 1][tmpY] != 4 && random <= 0.25) {
        board[X_Boost][Y_Boost] = 0;
        X_Boost = tmpX + 1;
        board[X_Boost][Y_Boost] = 11;
        return;
    }
    if (tmpX - 1 > -1 && board[tmpX - 1][tmpY] != 4 && random <= 0.5) {
        board[X_Boost][Y_Boost] = 0;
        X_Boost = tmpX - 1;
        board[X_Boost][Y_Boost] = 11;
        return;
    }
    if (tmpY + 1 < 14 && board[tmpX][tmpY + 1] != 4 && random <= 0.75) {
        board[X_Boost][Y_Boost] = 0;
        Y_Boost = tmpY + 1;
        board[X_Boost][Y_Boost] = 11;
        return;
    }
    if (tmpY - 1 > -1 && board[tmpX][tmpY - 1] != 4 && random <= 1) {
        board[X_Boost][Y_Boost] = 0;
        Y_Boost = tmpY - 1;
        board[X_Boost][Y_Boost] = 11;
        return;
    }
}

function UpdateLives() {
    document.getElementById("lblLive").value = lives;
}


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

function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 13) + 1);
    var j = Math.floor((Math.random() * 13) + 1);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 13) + 1);
        j = Math.floor((Math.random() * 13) + 1);
    }
    return [i, j];
}

function Finish_Game() {
    Show_Tab('game_page3');
    audio.pause();
    audio.load();
    if (lives == 0) {
        /////


        window.alert("Game Over!! " + numOfLife + " Life left");
    } else if (score >= 150) {
        ////
        window.alert("We Have a Winner!");
    } else {
        /////


        window.alert("You can do better!");
    }
    window.clearInterval(interval);
    window.clearInterval(B_interval);
    window.clearInterval(G_nterval);
    ClearAll();
}

