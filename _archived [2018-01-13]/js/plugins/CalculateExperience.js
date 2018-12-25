Enable = Game_Interpreter.prototype.pluginCommand;
var enablification = new Enable();

var countOne = 0;
var countTwo = 0;
var countThree = 0;
var countFour = 0;

var countAll = 0;

var addingSpeed = 0;
var division = 400;

var expArray = [];

Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Enable.call(this, command, args);

    switch(command) {
        case 'calcExp':
            calcExp();
            break;
        case 'showingExp':
            showingExp();
            break;
    }
}

function calcExp() {
    for (i = 1; i < 5; i++) {
        var dust = $gameVariables.value(i+20);
        var quests = $gameVariables.value(i+40);
        var drinks = $gameVariables.value(i+50);

        quests *= 5000;
        drinks *= 2000;

        var experience = dust + quests + drinks;

        $gameVariables.setValue(i+55, experience);

        expArray.push(experience);

        whoWon = expArray.indexOf(Math.max.apply(null,expArray));
        whoWon += 1;
        $gameVariables.setValue(67, whoWon);

        winnerScore = Math.max.apply(null, expArray);
        $gameVariables.setValue(60, winnerScore);

        addingSpeed = winnerScore / division;
    }
}

function showingExp() {
    for (j = 1; j < 5; j++) {
        var showExp = $gameVariables.value(j+60);
        var actualExp = $gameVariables.value(j+55);

        if (showExp < actualExp) {
            $gameVariables.setValue(j+60, $gameVariables.value(j+60) + addingSpeed);
        }
    }

    if ($gameVariables.value(61) >= $gameVariables.value(56) && countOne == 0) {
        AudioManager.playSe({name:'Cancel 1', volume:100, pitch:100, pan:0})
        countOne++;
    }

    if ($gameVariables.value(62) >= $gameVariables.value(57) && countTwo == 0) {
        AudioManager.playSe({name:'Cancel 1', volume:100, pitch:100, pan:0})
        countTwo++;
    }

    if ($gameVariables.value(63) >= $gameVariables.value(58) && countThree == 0) {
        AudioManager.playSe({name:'Cancel 1', volume:100, pitch:100, pan:0})
        countThree++;
    }

    if ($gameVariables.value(64) >= $gameVariables.value(59) && countFour == 0) {
        AudioManager.playSe({name:'Cancel 1', volume:100, pitch:100, pan:0})
        countFour++;
    }

    if (countAll < 5) {
        countAll = countOne + countTwo + countThree + countFour;
    }

    if (countAll == 4) {
        countAll++;
        $gameSwitches.setValue(34, true);
    }
}
