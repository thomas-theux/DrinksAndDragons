PlaceCursor = Game_Interpreter.prototype.pluginCommand;
var placification = new PlaceCursor();

var descX = 1042;
var descY = 152;

var rowOneX = 81;
var rowTwoX = 276;
var rowThreeX = 471;
var rowFourX = 666;
var rowFiveX = 872;

var rowOneY = 239;
var rowTwoY = 343;
var rowThreeY = 447;
var rowFourY = 607;
var rowFiveY = 711;

var rowTwoSpeY = 357;
var rowThreeSpeY = 475;
var rowFourSpeY = 593;


var skillPics = [
    'fitness-0',
    'ausdauer-1',
    'charisma-2',
    'glueck-3',
    'fitness-4',
    'ausdauer-5',
    'charisma-6',
    'glueck-7',
    'fitness-8',
    'ausdauer-9',
    'charisma-10',
    'glueck-11',
    'fitness-12',
    'ausdauer-13',
    'charisma-14',
    'glueck-15',
    'fitness-16',
    'ausdauer-17',
    'charisma-18',
    'glueck-19',
    'special-20',
    'special-21',
    'special-22',
    'special-23',
    'special-24'
];

var menuX = 1;
var menuY = 11;

var basic = 'cursor-bas';
var advanced = 'cursor-adv';
var special = 'cursor-spe';


Game_Interpreter.prototype.pluginCommand = function(command, args) {
    PlaceCursor.call(this, command, args);

    switch(command) {
        case 'Cursor':
            placeCursor();
            break;
    }
}

function placeCursor() {
    var playerX = $gamePlayer.x;
    var playerY = $gamePlayer.y;

//for (h = 0; h<5)

    if (playerY == menuY+0) {
        for (i = 0; i < 4; i++) {
            var temp1 = i;
            temp1 += menuX;

            var rowX1 = rowOneX;
            rowX1 += i * 195;

            if (playerX == temp1) { $gameScreen.showPicture(27, basic, 0, rowX1, rowOneY, 100, 100, 255, 0); $gameVariables.setValue(34, i); $gameScreen.showPicture(28, skillPics[i], 0, descX, descY, 50, 50, 255, 0); }
            if (playerX == menuX+4) { $gameScreen.showPicture(27, special, 0, rowX1+206, rowOneY, 100, 100, 255, 0); $gameVariables.setValue(34, 20); $gameScreen.showPicture(28, skillPics[20], 0, descX, descY, 50, 50, 255, 0); }
        }
    } else

    if (playerY == menuY+1) {
        for (j = 0; j < 4; j++) {
            var temp2 = j;
            temp2 += menuX;

            var rowX2 = rowOneX;
            rowX2 += j * 195;

            var second = j;
            second += 4;

            if (playerX == temp2) { $gameScreen.showPicture(27, basic, 0, rowX2, rowTwoY, 100, 100, 255, 0); $gameVariables.setValue(34, second); $gameScreen.showPicture(28, skillPics[second], 0, descX, descY, 50, 50, 255, 0); }
            if (playerX == menuX+4) { $gameScreen.showPicture(27, special, 0, rowX2+206, rowTwoSpeY, 100, 100, 255, 0); $gameVariables.setValue(34, 21); $gameScreen.showPicture(28, skillPics[21], 0, descX, descY, 50, 50, 255, 0); }
        }
    } else

    if (playerY == menuY+2) {
        for (k = 0; k < 4; k++) {
            var temp3 = k;
            temp3 += menuX;

            var rowX3 = rowOneX;
            rowX3 += k * 195;

            var third = k;
            third += 8;

            if (playerX == temp3) { $gameScreen.showPicture(27, basic, 0, rowX3, rowThreeY, 100, 100, 255, 0); $gameVariables.setValue(34, third); $gameScreen.showPicture(28, skillPics[third], 0, descX, descY, 50, 50, 255, 0); }
            if (playerX == menuX+4) { $gameScreen.showPicture(27, special, 0, rowX3+206, rowThreeSpeY, 100, 100, 255, 0); $gameVariables.setValue(34, 22); $gameScreen.showPicture(28, skillPics[22], 0, descX, descY, 50, 50, 255, 0); }
        }
    } else

    if (playerY == menuY+3) {
        for (l = 0; l < 4; l++) {
            var temp4 = l;
            temp4 += menuX;

            var rowX4 = rowOneX;
            rowX4 += l * 195;

            var fourth = l;
            fourth += 12;

            if (playerX == temp4) { $gameScreen.showPicture(27, advanced, 0, rowX4, rowFourY, 100, 100, 255, 0); $gameVariables.setValue(34, fourth); $gameScreen.showPicture(28, skillPics[fourth], 0, descX, descY, 50, 50, 255, 0); }
            if (playerX == menuX+4) { $gameScreen.showPicture(27, special, 0, rowX4+206, rowFourSpeY, 100, 100, 255, 0); $gameVariables.setValue(34, 23); $gameScreen.showPicture(28, skillPics[23], 0, descX, descY, 50, 50, 255, 0); }
        }
    } else

    if (playerY == menuY+4) {
        for (m = 0; m < 4; m++) {
            var temp5 = m;
            temp5 += menuX;

            var rowX5 = rowOneX;
            rowX5 += m * 195;

            var fifth = m;
            fifth += 16;

            if (playerX == temp5) { $gameScreen.showPicture(27, advanced, 0, rowX5, rowFiveY, 100, 100, 255, 0); $gameVariables.setValue(34, fifth); $gameScreen.showPicture(28, skillPics[fifth], 0, descX, descY, 50, 50, 255, 0); }
            if (playerX == menuX+4) { $gameScreen.showPicture(27, special, 0, rowX5+206, rowFiveY, 100, 100, 255, 0); $gameVariables.setValue(34, 24); $gameScreen.showPicture(28, skillPics[24], 0, descX, descY, 50, 50, 255, 0); }
        }
    }
}
