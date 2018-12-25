LearnSkills = Game_Interpreter.prototype.pluginCommand;
var learnification = new LearnSkills();

var skillCosts = [
    // Navigation – Laufen
    {
        skillNo: 0,
        name: "DAS LETZTE",
        text: " ",
        effect1: "Wenn du Letzter bist, steigt die Chance,",
        effect2: "dass du den Navigations-Ring zwei Mal",
        effect3: "drehen darfst auf 50%",
        costs: 220,
    },
    {
        skillNo: 1,
        name: "HERMES' SOCKEN",
        text: " ",
        effect1: "Der Navigations-Ring wird um eine 7 und",
        effect2: "eine 8 erweitert",
        effect3: " ",
        costs: 370,
        // Location: Bei den Common Events unter Ring of Navigation – if-Abfrage
    },
    {
        skillNo: 2,
        name: "HERR DES RINGS",
        text: " ",
        effect1: "Der Navigations Ring hält sofort an, wenn",
        effect2: "du ihn stoppst",
        effect3: " ",
        costs: 920,
        // Location: Im Script Galv_PrizeWheel.js in der Scene_PrizeWheel.prototype.updateTimer = function() – ist extra kommentiert
    },

    // Wille – Saufen
    {
        skillNo: 3,
        name: "DER MIT-REIN-ZIEHER",
        text: " ",
        effect1: "Jedes Mal wenn du eine 1 drehst, darfst du",
        effect2: "jemanden bestimmen, der einen trinken",
        effect3: "muss",
        costs: 130,
        // Location: Bei den Common Events unter Ring of Navigation – if-Abfrage
    },
    {
        skillNo: 4,
        name: "NACHGETRETEN",
        text: " ",
        effect1: "Wenn dich ein anderer Spieler überholt,",
        effect2: "muss er eine “Drecks-Karte” ziehen",
        effect3: " ",
        costs: 420,
    },
    {
        skillNo: 5,
        name: "METERWEISE",
        text: " ",
        effect1: "Sobald du einen Meter füllst, muss jemand",
        effect2: "(den du bestimmst) ein halbes Glas exen",
        effect3: " ",
        costs: 780,
        // Location: Bei den Common Events "Player Drinks" – if-Abfrage weiter unten
    },

    // Segen - Kohle machen
    {
        skillNo: 6,
        name: "RING DES SEGENS",
        text: " ",
        effect1: "Du bekommst je nach Würfelzahl nochmal",
        effect2: "zusätzlich Sternenstaub (1 = 10, 6 = 60)",
        effect3: " ",
        costs: 560,
        // Location: Bei den jeweiligen Spielern – Tab 2 – Beim Würfeln weiter unten
    },
    {
        skillNo: 7,
        name: "KUHHANDEL",
        text: " ",
        effect1: "Jede Quest die du erledigst, gibt ab sofort",
        effect2: "zusätzlich zur Erfahrung Sternenstaub",
        effect3: " ",
        costs: 810,
        // Location: Teil 1 – Bei den Common Events unter Increase Quest EXP – extra Script am Ende
        //           Teil 2 – Bei den Common Events unter Event Tile – bei den jeweiligen Aufgaben (Mentals und Physicals) als if-Abfrage
    },
    {
        skillNo: 8,
        name: "ABSTAUBER",
        text: " ",
        effect1: "Sobald jemand Sternenstaub sammelt,",
        effect2: "bekommst du soviel wie er geteilt durch",
        effect3: "die Anzahl der Spieler",
        costs: 1100,
        // Location: Bei den Common Events "Stardust Tile": als gescriptete if-Abfrage weiter unten
    },

    // Schicksal - Destiny Ring
    {
        skillNo: 9,
        name: "GRÜNE ENTE",
        text: " ",
        effect1: "Die Chance, dass du den Schicksals-Ring",
        effect2: "2 Mal drehen darfst, steigt auf 50%",
        effect3: " ",
        costs: 120,
        // Location: Bei den Common Events unter Ring of Destiny – als extra if-Abfrage
    },
    {
        skillNo: 10,
        name: "ROSIGE ZEITEN",
        text: " ",
        effect1: "Erweitert deinen Schicksals-Ring um zwei",
        effect2: "positive Ereignisse",
        effect3: " ",
        costs: 530,
        // Location: Bei den Common Events "Ring of Destiny": if-Abfrage für Skill #16
    },
    {
        skillNo: 11,
        name: "SLOW THE MOTION",
        text: " ",
        effect1: "Je mehr du getrunken hast, umso",
        effect2: "langsamer dreht sich der Schicksals-Ring",
        effect3: " ",
        costs: 810,
        // Location: Im Script Galv_PrizeWheel.js in der Scene_PrizeWheel.prototype.initializeSpin = function() – ordentlich auskommentiert
    },

    // Weisheit - Erfahrung
    {
        skillNo: 12,
        name: "WANDERSMANN",
        text: " ",
        effect1: "Jeder Schritt gibt doppelt so viel Erfahrung",
        effect2: " ",
        effect3: " ",
        costs: 190,
        // Location: Bei den Common Events "Get EXP for Steps": if-Abfrage
    },
    {
        skillNo: 13,
        name: "LEVEL HOCH, GLÄSER HOCH",
        text: " ",
        effect1: "Bei jedem Levelaufstieg, darfst du",
        effect2: "jemanden bestimmen, der einen trinken",
        effect3: "muss",
        costs: 310,
    },
    {
        skillNo: 14,
        name: "ERFAHRUNGSGEMÄSS",
        text: " ",
        effect1: "Bei jeder 6, die du hast, bekommst du",
        effect2: "zusätzlich 10% deiner aktuellen EXP",
        effect3: " ",
        costs: 870,
        // Location: Bei den Common Events "Ring of Navigation": if-Abfrage ganz unten
    },

    // Metzelei - Angriffsstärke
    {
        skillNo: 15,
        name: "WAFFENTRAINING",
        text: " ",
        effect1: "Deine Angriffskraft steigt um 3",
        effect2: " ",
        effect3: " ",
        costs: 200,
    },
    {
        skillNo: 16,
        name: "WAFFENTRAINING",
        text: " ",
        effect1: "Deine Angriffskraft steigt um 3",
        effect2: " ",
        effect3: " ",
        costs: 300,
    },
    {
        skillNo: 17,
        name: "WAFFENTRAINING",
        text: " ",
        effect1: "Deine Angriffskraft steigt um 3",
        effect2: " ",
        effect3: " ",
        costs: 400,
    },
    {
        skillNo: 18,
        name: "WAFFENTRAINING",
        text: " ",
        effect1: "Deine Angriffskraft steigt um 3",
        effect2: " ",
        effect3: " ",
        costs: 500,
    },
    {
        skillNo: 19,
        name: "WAFFENTRAINING",
        text: " ",
        effect1: "Deine Angriffskraft steigt um 3",
        effect2: " ",
        effect3: " ",
        costs: 600,
    }
]

// Ausrechnen, wieviel Sternenstaub insgesamt gesammelt werden muss, um alle Skills zu erlernen
var totalCosts = 0;
for (p = 0; p < 20; p++){
    totalCosts += skillCosts[p].costs;
}
// console.log(totalCosts);


Game_Interpreter.prototype.pluginCommand = function(command, args) {
    LearnSkills.call(this, command, args);

    switch (command) {
        case 'checkMoney':
            checkMoney();
            break;
    }
}

function checkMoney () {
    var currentChar = $gameVariables.value(13);
    var stardustCount = $gameVariables.value(currentChar+20);
    $gameVariables.setValue(36, stardustCount);

    var tempCosts = $gameVariables.value(34);


    var howMuch = skillCosts[tempCosts].costs;

    var skillDoubleCost = $gameVariables.value(225);
    if (skillDoubleCost == currentChar) { howMuch *= 2; }

    $gameVariables.setValue(37, howMuch);
}
