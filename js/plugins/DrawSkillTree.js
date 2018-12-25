DrawSkillTree = Game_Interpreter.prototype.pluginCommand;
var drawification = new DrawSkillTree();

// Die IDs der Pictures sehen wie folgt aus:

// Skills [70-90]
// Cursor [91]
// Description [92]

var currentChar;
var changeValueOf;

// Diese Zahl gibt die Nummer des ersten Bilds an
var treePics = 71;

var distanceX = 150;
var distanceY = 140;

var actorX;
var actorY;

var menuX = 1;
var menuY = 11;

var cursorX;
var cursorY;

var cursorStartX = 110; // 113 mit Glow und 110 ohne
var cursorStartY = 119; // 107 mit Glow und 119 ohne

var skillCount = [];
var skillId = 0;

var descriptionX = 910;
var descriptionY = 460;

var skillsActivation = [
    {
        charId: 1,
        skills: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    },
    {
        charId: 2,
        skills: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    },
    {
        charId: 3,
        skills: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    },
    {
        charId: 4,
        skills: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    },
];

for (a = 0; a < 9; a += 2) {
    skillCount.push(a);
    // alt = 0,3,6,9,12
    // neu = 0,4,8,12
    // neuer = 0,2,4,6,8
}

Game_Interpreter.prototype.pluginCommand = function(command, args) {
    DrawSkillTree.call(this, command, args);

    switch(command) {
        case 'drawTree':
            drawTree();
            break;
        case 'showCursor':
            showCursor();
            break;
        case 'skillAvailable':
            skillAvailable();
            break;
        case 'updateSkill':
            updateSkill();
            break;
        case 'skillActive':
            skillActive();
            break;
        case 'increaseStrength':
            increaseStrength();
            break;
    }
}

function drawTree () {
    var picX = 110;
    var picY = 119;

    currentChar = $gameVariables.value(13);
    currentChar -= 1;

    for (i = 0; i < 15; i++) {
        var picId = i + treePics;

        $gameScreen.showPicture(picId, skillsActivation[currentChar].skills[i] + "-tree-skill-" + i, 0, picX, picY, 50, 50, 255, 0);

        if (i == 2 || i == 5 || i == 8 || i == 11) {
            picY = 119;
            picX += distanceX;
        } else {
            picY += distanceY;
        }
    }

    picX = 110;

    for (j = 15; j < 20; j++) {
        picId = j + treePics;

        $gameScreen.showPicture(picId, skillsActivation[currentChar].skills[j] + "-tree-skill-" + j, 0, picX, 640, 50, 50, 255, 0);
        picX += distanceX;
    }
}

function showCursor () {
    actorX = $gamePlayer.x;
    actorY = $gamePlayer.y;

    for (h = 0; h < 4; h++) {

        if (actorY == menuY+h) {

            for (j = 0; j < 5;j++) {

                var charX = j;
                charX += menuX;

                cursorX = cursorStartX;
                cursorY = cursorStartY;

                cursorX += j * distanceX;
                cursorY += h * distanceY;

                var menuOffsetX = actorX;
                menuOffsetX -= menuX;

                var menuOffsetY = actorY;
                menuOffsetY -= menuY;

                if (menuOffsetY < 3) {
                    if (menuOffsetX == j) { skillId = menuOffsetX + menuOffsetY + skillCount[j]; }
                } else if (menuOffsetY == 3) {
                    if (menuOffsetX == j) { skillId = menuOffsetX + menuOffsetY + 12; }
                }

                if (actorX == charX) {

                    if (actorY == 14) {

                        var tempCursorY = cursorY;
                        tempCursorY += 101;

                        $gameScreen.showPicture(91, "tree-cursor", 0, cursorX, tempCursorY, 50, 50, 255, 0);
                    } else {

                        $gameScreen.showPicture(91, "tree-cursor", 0, cursorX, cursorY, 50, 50, 255, 0);
                    }

                    // Description für die Skills (als Picture)
                    // $gameScreen.showPicture(92, "skill-description-" + skillId, 0, descriptionX, descriptionY, 50, 50, 255, 0);

                    // Description für die Skills (als variable safe)
                    var descTitle = skillCosts[skillId].name;
                    var descText = skillCosts[skillId].text;
                    var descEffect1 = skillCosts[skillId].effect1;
                    var descEffect2 = skillCosts[skillId].effect2;
                    var descEffect3 = skillCosts[skillId].effect3;
                    var descCosts = skillCosts[skillId].costs;

                    $gameVariables.setValue(166, descTitle);
                    $gameVariables.setValue(167, descText);
                    $gameVariables.setValue(168, descEffect1);
                    $gameVariables.setValue(169, descEffect2);
                    $gameVariables.setValue(170, descEffect3);


                    var currentChar = $gameVariables.value(13);
                    var skillForFreeWinner = $gameVariables.value(224);
                    var skillDoubleCost = $gameVariables.value(225);

                    if (skillDoubleCost == currentChar) { descCosts *= 2; }
                    if (skillForFreeWinner == currentChar) { descCosts = "Kostenlos"; }

                    $gameVariables.setValue(171, descCosts);


                    $gameVariables.setValue(34, skillId);
                }
            }
        }
    }
}

function skillAvailable() {
    changeValueOf = $gameVariables.value(34);

    switch (skillsActivation[currentChar].skills[changeValueOf]) {
        case 0:
            $gameVariables.setValue(38, 0);
            break;
        case 1:
            $gameVariables.setValue(38, 1);
            break;
        case 2:
            $gameVariables.setValue(38, 2);
            break;
    }
}

function updateSkill() {
    // var changeValueOf = $gameVariables.value(34);
    // console.log(changeValueOf);
    // Gewählten Skill eins hochzählen
    skillsActivation[currentChar].skills[changeValueOf] += 1;

    // Angrenzenden Skill auch eins hochzählen und dadurch freischalten
    var skillNumberArray = $gameVariables.value(34);

    // if (skillNumberArray >= 0 && skillNumberArray < 4 || skillNumberArray >= 5 && skillNumberArray < 9 || skillNumberArray >= 10 && skillNumberArray < 14 || skillNumberArray >= 15 && skillNumberArray < 19) {
    if (skillNumberArray != 2 && skillNumberArray != 5 && skillNumberArray != 8 && skillNumberArray != 11 && skillNumberArray != 14) {
        var tempChange = changeValueOf + 1;
        skillsActivation[currentChar].skills[tempChange] += 1;
    }

    // Die Angriffsstärke erhöhen bzw. die Funktion aufrufen
    if (changeValueOf >= 15 && changeValueOf <= 19) {
        increaseStrength();
    }


    var skillDoubleCost = $gameVariables.value(225);
    var payingChar = $gameVariables.value(13);
    
    if (skillDoubleCost == payingChar) {
        $gameVariables.setValue(225, 0);
    }
}

function skillActive() {
    var activeChar = $gameVariables.value(13);
    var whosTurn = activeChar;
    whosTurn -= 1;

    var dice = $gameVariables.value(18);
    var advSteps = dice;
    advSteps /= 2;
    var ceiledSteps = Math.ceil(advSteps);

    var currentSteps = activeChar;
    currentSteps += 85;
    var wayfarer = $gameVariables.value(currentSteps);
    var endSteps = ceiledSteps + dice;
}

function increaseStrength() {
    // Skill 'Waffentraining': Angriff wird um 3 verbessert
    var currentChar = $gameVariables.value(13);
    var strength = currentChar + 156;
    $gameVariables.setValue(strength, $gameVariables.value(strength) + 3);
}
