var posCurrent = $gameVariables.value(14) + "." + $gameVariables.value(15);

var posOne = $gameVariables.value(1) + "." + $gameVariables.value(2);
var posTwo = $gameVariables.value(3) + "." + $gameVariables.value(4);
var posThree = $gameVariables.value(5) + "." + $gameVariables.value(6);
var posFour = $gameVariables.value(7) + "." + $gameVariables.value(8);

var posAll = [posOne, posTwo, posThree, posFour];

var currentChar = $gameVariables.value(13);

if (currentChar == 1) { posAll.splice(1, 1); } else
if (currentChar == 2) { posAll.splice(2, 1); } else
if (currentChar == 3) { posAll.splice(3, 1); } else
if (currentChar == 4) { posAll.splice(4, 1); }

var same = posAll.indexOf(posCurrent);

while (same > -1) {
    this.character(0).moveForward();
    same = -1;
    same = posAll.indexOf(posCurrent);
}
