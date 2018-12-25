CheckMap = Game_Interpreter.prototype.pluginCommand;
var countification = new CheckMap();

var x = 30;
var y = 19;

var regionID;

var battleTiles = 0;
var teamTiles = 0;
var ruleTiles = 0;
var physicalTiles = 0;
var mentalTiles = 0;
var stardustTiles = 0;

var mapIDs = [];
var allTogether;

Game_Interpreter.prototype.pluginCommand = function(command, args) {
    CheckMap.call(this, command, args);

    switch(command) {
        case 'countIDs':
            countIDs();
            break;
    }
}

function countIDs () {
    for (m = 0; m < x; m++) {
        for (n = 0; n < y; n++) {
            $gameMap.event(17).setPosition(m, n);
            regionID = $gameMap.event(17).regionId();

            switch (regionID) {
                case 1:
                case 3:
                    battleTiles++;
                    break;
                case 5:
                    ruleTiles++;
                    break;
                case 2:
                case 6:
                    physicalTiles++;
                    break;
                case 4:
                case 7:
                    mentalTiles++;
                    break;
                case 8:
                    stardustTiles++;
                    break;
            }
        }
    }
    mapIDs.push(battleTiles, teamTiles, ruleTiles, physicalTiles, mentalTiles, stardustTiles);
    allTogether = mapIDs.reduce(function(a, b) { return a + b; }, 0);

    $gameVariables.setValue(79, mapIDs);
    $gameVariables.setValue(80, allTogether);
}
