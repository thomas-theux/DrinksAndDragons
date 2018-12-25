var currentChar = $gameVariables.value(13);
var regionId = $gameVariables.value(16);

currentChar += 2;

if (regionId == 1) {
 if (this.character(currentChar)._direction == 6) { this.character(currentChar).setDirection(2); } else
 if (this.character(currentChar)._direction == 8) { this.character(currentChar).setDirection(4); }
}

if (regionId == 2) {
 if (this.character(currentChar)._direction == 2) { this.character(currentChar).setDirection(4); } else
 if (this.character(currentChar)._direction == 6) { this.character(currentChar).setDirection(8); }
}

if (regionId == 3) {
 if (this.character(currentChar)._direction == 4) { this.character(currentChar).setDirection(2); } else
 if (this.character(currentChar)._direction == 8) { this.character(currentChar).setDirection(6); }
}

if (regionId == 4) {
 if (this.character(currentChar)._direction == 2) { this.character(currentChar).setDirection(6); } else
 if (this.character(currentChar)._direction == 4) { this.character(currentChar).setDirection(8); }
}
