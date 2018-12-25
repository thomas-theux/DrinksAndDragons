CharacterSelection = Game_Interpreter.prototype.pluginCommand;
var selectification = new CharacterSelection();


var firstPicId = 40;
var drawPosX = 40;
var distanceChars = 171;

var drawTempX;
var exists;
var j;

var charArray = [];
var charList = ["Tharys", "Flayke", "Merrick", "Avior", "Sely", "June", "Sod", "Lili"]
var positionsX = [];

var alreadyChosen = "Diesen Charakter hat schon jemand anderes gewählt."

Game_Interpreter.prototype.pluginCommand = function(command, args) {
    CharacterSelection.call(this, command, args);

    switch (command) {
        case 'drawChars':
            drawChars();
            break;
        case 'startSelecting':
            startSelecting();
            break;
        case 'chooseChar':
            chooseChar();
            break;
    }
}

function drawChars () {
    for (i = 0; i < 8; i++) {
        var tempDraw = drawPosX;
        tempDraw += i * distanceChars;

        $gameScreen.showPicture(firstPicId, 'character-' + i, 0, tempDraw, 300, 50, 50, 255, 0);
        firstPicId++;
    }
}

function startSelecting () {
    var playerX = $gamePlayer.x;
    var playerY = $gamePlayer.y;

    var tempPlayerPos = playerX - 1;

    for (j = 0; j < 8; j++) {
        drawTempX = drawPosX;
        drawTempX += j * distanceChars;

        positionsX.push(drawTempX);

        if (tempPlayerPos == j) {
        $gameScreen.showPicture(100, 'selectChar', 0, drawTempX, 300, 50, 50, 255, 0);
        $gameVariables.setValue(40, j);
        $gameVariables.setValue(228, charList[j]);
        }
    }
}

function chooseChar () {
    var playerCount = $gameVariables.value(10);
    exists = $gameVariables.value(40);

    if (charArray.length < playerCount) {
        if (charArray.indexOf(exists) > -1) {
            $gameMessage.add(alreadyChosen);
        } else {
            var charSelect = $gameVariables.value(40);
            charArray.push(charSelect);

            switch (charSelect) {
                case 0:
                    AudioManager.playSe({ name: "1 - Tharys - Ants in my Pants", volume: 100, pitch: 100, pan: 0});
                    break;
                case 1:
                    AudioManager.playSe({ name: "2 - Flayke - Giggle", volume: 100, pitch: 100, pan: 0});
                    break;
                case 2:
                    AudioManager.playSe({ name: "3 - Merrick - Arrr", volume: 100, pitch: 100, pan: 0});
                    break;
                case 3:
                    AudioManager.playSe({ name: "4 - Avior - Death is just another path", volume: 100, pitch: 100, pan: 0});
                    break;
                case 4:
                    AudioManager.playSe({ name: "5 - Sely - Snap", volume: 100, pitch: 100, pan: 0});
                    break;
                case 5:
                    AudioManager.playSe({ name: "6 - June - Matter with you", volume: 100, pitch: 100, pan: 0});
                    break;
                case 6:
                    AudioManager.playSe({ name: "7 - Sod - Laugh", volume: 100, pitch: 100, pan: 0});
                    break;
                case 7:
                    AudioManager.playSe({ name: "8 - Lili - Ready to work", volume: 100, pitch: 100, pan: 0});
                    break;
            }

            // Der Name und das Bild des gewählten Charakters werden in die Actor Details gespeichert
            var currentPlayer = charArray.length;
            $gameActors.actor(currentPlayer).setName(charList[exists]);
            $gameActors.actor(currentPlayer).setFaceImage('Characters', exists);

            var disable = $gameVariables.value(40);
            disable += 40;

            var selectedPosX = $gameVariables.value(40);

            $gameScreen.movePicture(disable, 0, positionsX[selectedPosX], 300, 50, 50, 128, 0, 10);
        }
    }

    if (charArray.length == playerCount) {
        $gameSwitches.setValue(31, true);
    }
}
