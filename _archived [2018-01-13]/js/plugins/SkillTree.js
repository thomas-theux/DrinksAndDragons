SkillTree = Game_Interpreter.prototype.pluginCommand;
var skillification = new SkillTree();

// Auflisten der 24 Skills jedes Charakters und in welchem Stadium sie sich befinden (0 = Locked, 1 = Unlocked, 2 = Activated)
var skillTree = [
    {
        charId: 1,
        skills: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        charId: 2,
        skills: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        charId: 3,
        skills: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        charId: 4,
        skills: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
];


var currentChar;



Game_Interpreter.prototype.pluginCommand = function(command, args) {
    SkillTree.call(this, command, args);

    switch(command) {
        case 'callSkills':
            getSkills();
            break;
        case 'skillAvailable':
            skillAvailable();
            break;
        case 'update':
            updateSkill();
            break;
    }
}

function getSkills() {

    var startingPic = 2;

    var basicOriginX = 92;
    var basicOriginY = 250;
    var basicX = basicOriginX;
    var basicY = basicOriginY;

    var advOriginX = 92;
    var advOriginY = 618;
    var advX = advOriginX;
    var advY = advOriginY;

    var specOriginX = 883;
    var specOriginY = 250;
    var specX = specOriginX;
    var specY = specOriginY;

    var distBasicX = 195;
    var distBasicY = 104;

    var distSpecY = 118;

    currentChar = $gameVariables.value(13);
    currentChar -= 1;

    for (var i = 0; i < 12; i++){
        var tempBasic = i;
        tempBasic += startingPic;

        if (skillTree[currentChar].skills[i] == 0) { $gameScreen.showPicture(tempBasic, '0-basic-locked', 0, basicX, basicY, 100, 100, 255, 0); } else
        if (skillTree[currentChar].skills[i] == 1) { $gameScreen.showPicture(tempBasic, '1-basic-unlocked', 0, basicX, basicY, 100, 100, 255, 0); } else
        if (skillTree[currentChar].skills[i] == 2) { $gameScreen.showPicture(tempBasic, '2-basic-activated', 0, basicX, basicY, 100, 100, 255, 0); }

        if (i == 3 || i == 7) { basicX = basicOriginX; basicY += distBasicY; } else { basicX += distBasicX; }
    }

    for (var j = 12; j < 20; j++){
        var tempAdv = j;
        tempAdv += startingPic;

        if (skillTree[currentChar].skills[j] == 0) { $gameScreen.showPicture(tempAdv, '0-advanced-locked', 0, advX, advY, 100, 100, 255, 0); } else
        if (skillTree[currentChar].skills[j] == 1) { $gameScreen.showPicture(tempAdv, '1-advanced-unlocked', 0, advX, advY, 100, 100, 255, 0); } else
        if (skillTree[currentChar].skills[j] == 2) { $gameScreen.showPicture(tempAdv, '2-advanced-activated', 0, advX, advY, 100, 100, 255, 0); }

        if (j == 15) { advX = advOriginX; advY += distBasicY; } else { advX += distBasicX; }
    }

    for (var k = 20; k < 25; k++){
        var tempSpec = k;
        tempSpec += startingPic;

        if (skillTree[currentChar].skills[k] == 0) { $gameScreen.showPicture(tempSpec, '0-special-locked', 0, specX, specY, 100, 100, 255, 0); } else
        if (skillTree[currentChar].skills[k] == 1) { $gameScreen.showPicture(tempSpec, '1-special-unlocked', 0, specX, specY, 100, 100, 255, 0); } else
        if (skillTree[currentChar].skills[k] == 2) { $gameScreen.showPicture(tempSpec, '2-special-activated', 0, specX, specY, 100, 100, 255, 0); }

        specY += distSpecY;
    }
}

function updateSkill() {
    var changeValueOf = $gameVariables.value(34);

    // Gewählten Skill eins hochzählen
    skillTree[currentChar].skills[changeValueOf] += 1;

    // Angrenzenden Skill auch eins hochzählen und dadurch freischalten
    var skillNumberArray = $gameVariables.value(34);
    if (skillNumberArray < 16) {
        var tempChange = changeValueOf + 4;
        skillTree[currentChar].skills[tempChange] += 1;
    }
}

function skillAvailable() {
    var changeValueOf = $gameVariables.value(34);
    switch (skillTree[currentChar].skills[changeValueOf]) {
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
