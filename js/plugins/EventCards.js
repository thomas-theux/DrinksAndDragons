EventCards = Game_Interpreter.prototype.pluginCommand;
var _eventification = new EventCards();

var randomCard;
var chosenCard;

var playerCount = 0;
var playerArr = [];

var regionId;

// RULES 100 - 290
var rules = [
    {
        title: "Halt die..!",
        text: "Besoffene Goblins jagen euch. Ihr seid gefährdet, wenn ihr zu viel plappert.",
        effect: "Es dürfen keine Namen mehr genannt werden.",
        id: 100
    },
    {
        title: "Schweigepflicht",
        text: "Ihr seid von den Truppen von Presidente Manu gefangen genommen. Ihr dürft ihnen nichts von euren Plänen verraten.",
        effect: "Es darf ab jetzt nicht mehr Ja und Nein gesagt werden.",
        id: 110
    },
    {
        title: "Gefesselt!",
        text: "Auf eurer Reise trefft ihr auf die betörende Wolkenmeisterin. Sie fesselt euch die rechte Hand auf den Rücken.",
        effect: "Jeder Spieler muss ab jetzt mit der 'falschen' Hand trinken.",
        id: 120
    },
    {
        title: "Fallende Hüllen",
        text: "Beim Laufen durch die Brandwüste, merkst du, dass deine Rüstung ganz schön heiß wird.",
        effect: "Spieler <randPlayer> zieht ein Kleidungsstück aus.",
        id: 130
    },
    {
        title: "Black or not?",
        text: "Die dunklen Brüder der Diebesgilde versammeln sich um ihren letzten Raubzug zu feiern. Gehörst du dazu?",
        effect: "Alle mit einem schwarzen Kleidungsstück trinken 2 Schlücke.",
        id: 140
    },
    {
        title: "Verdammtes S",
        text: "Bei der nächtlichen Sauftour in der Bar, dreht das Heer seine Runden und kontrolliert die Anwesenden.",
        effect: "Jeder Spieler mit einem 'S' im Vor- oder Nachnamen, trinkt 1 Schluck.",
        id: 150
    },
    {
        title: "Deffsch it laut saga",
        text: "Eure Quest treibt euch durch die Stadt der schlafenden Toten. Vorsichtig schleicht ihr euch durch.",
        effect: "Für 3 Runden wird nur noch geflüstert.",
        id: 160
    },
    {
        title: "Such & Sauf",
        text: "Beim alljährlichen Narrenmarkt in Aeras nehmt ihr an den verrückten Spielen teil. Es geht los..",
        effect: "Jeder Spieler sucht einen weißen Gegenstand. Der Erste darf soviele Schlücke verteilen wie es Spieler gibt.",
        id: 170
    },
    {
        title: "FEHLT",
        text: "Auf deinem Weg durch den Venushügelwald siehst du Zwei die es miteinander treiben.",
        effect: "Was machst du?",
        id: 180
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Wer von euch hatte schonmal Sex an einem öffentlichen Platz?",
        id: 190
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Erzähl uns von 3 Orten an denen du Sex hattest.",
        id: 200
    },
    {
        title: "FEHLT",
        text: "Spieler <randPlayer> wurde soeben von Herzog Edolf Hettler zum Baron der Alkoholiker ernannt.",
        effect: "Wer ihn ab sofort nicht mit Baron Alki anspricht, trinkt.",
        id: 210
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Jeder Gefährte nennt reihum <randBrand>. Wer nicht mehr weiter weiß trinkt.",
        id: 220
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Jeder Gefährte nennt reihum <randBrand>. Wer nicht mehr weiter weiß trinkt.",
        id: 230
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Jeder entledigt sich eines Kleidungsstücks.",
        id: 240
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Du darfst dir selber eine Regel ausdenken.",
        id: 250
    }
];

// PHYSICALS 300 - 490
var physicals = [
    {
        title: "Der Spaß beginnt",
        text: "Du sitzt beim Feierabendbier mit den Saufnasen des Imperiumheers. Nach 4-8 Bieren wirst du immer geselliger.",
        effect: "Imitiere jemanden, den du kennst.",
        id: 300
    },
    {
        title: "Silence!",
        text: "Du hast einen Schwarzmagier geärgert der dir daraufhin 'Stumm' angehängt hat." + "\n" + "Du brauchst aber was zu essen und versuchst es dem Wirt zu erklären.",
        effect: "Zeichne das, was du gestern Abend gegessen hast.",
        id: 310
    },
    {
        title: "Karaoke!",
        text: "Eine Sirene versucht dich in ihren Bann zu singen. Du musst ihren Tönen entgegenwirken und singst mit Engelsstimmen.",
        effect: "Singe ein Lied; die anderen müssen es erraten.",
        id: 320
    },
    {
        title: "Spieglein, Spieglein",
        text: "Du bittest das Orakel von Selfie um Hilfe bei deiner Quest. Im Gegenzug verlangt es eine Kleinigkeit von dir.",
        effect: "Schicke ein Selfie an die zwölfte Person in deiner Liste.",
        id: 330
    },
    {
        title: "Der absinthe Barde",
        text: "Nach einer halben Flasche Absinth erscheint dir der von zuviel Absinth in der Birne dahingeschiedene Dorfbarde. Er sucht nach neuer Inspiration.",
        effect: "Denke dir einen Vierzeiler aus und trage ihn vor.",
        id: 340
    },
    {
        title: "Kater deines Lebens",
        text: "Durch die letzte Sauftour bist du deutlich geschwächt. Damit du für den nächsten Kampf bereit bist, solltest du trainieren.",
        effect: "Mache 10 Liegestütze.",
        id: 350
    },
    {
        title: "Völlig verpeilt",
        text: "Du hast komplett den Überblick verloren, findest deine Karte nicht und auch sonst stimmt bei dir so einiges nicht.",
        effect: "Dreh dich 10 Mal im Kreis.",
        id: 360
    },
    {
        title: "Kampf der Giganten",
        text: "In der Schenke kommt es zu einem Disput. Es kann nur durch einen ehrenvollen Wettstreit aus der Welt geschaffen werden.",
        effect: "Schnick, Schnack, Schnuck gegen den Mitspieler rechts von dir.",
        id: 370
    },
    {
        title: "Große Zuneigung",
        text: "Als Helden seid ihr ziemlich gut, der Zusammenhalt könnte allerdings besser sein.",
        effect: "Umarme Spieler <randPlayer>.",
        id: 380
    },
    {
        title: "Der Künstler",
        text: "Helden sollten gelegentlich auch mal den Künstler in ihnen rauslassen dürfen.",
        effect: "Male Spieler <randPlayer> etwas auf die Hand.",
        id: 390
    },
    {
        title: "Reise nach Methusalem",
        text: "Fette Helden können niemanden retten. Und wer sich nicht bewegt wird fett. Wir tun was dagegen.",
        effect: "Tausche deinen Platz mit Spieler <randPlayer> und trinke ab jetzt was vor dir steht.",
        id: 400
    },
    {
        title: "Moonshine",
        text: "Beim Wochenmarkt in Lichtport springst du im Vollsuff auf die Bühne, schreist rum und zeigst was du hast.",
        effect: "Zeige den andern Spielern deinen Hintern. Wer nicht hinsieht muss trinken.",
        id: 410
    },
    {
        title: "Klar Schiff",
        text: "'Meine Fresse, hier sieht's ja aus..' Dachtest du dir nach deinem letzten Suff als du verkotzt auf deinem Tisch aufwachst.",
        effect: "Räume den Tisch auf.",
        id: 420
    },
    {
        title: "Nachzieh'n!",
        text: "Ihr seid zwar hier um zu gewinnen aber der Spaß darf nicht fehlen. Und wenn einer keinen Spaß hat, zieht das alle runter.",
        effect: "Der am wenigsten betrunkene Spieler trinkt 4 Mal.",
        id: 430
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Mache 10 Kniebeugen.",
        id: 440
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Erzähle den anderen etwas, dass sie noch nicht von dir wissen.",
        id: 450
    },
    {
        title: "FEHLT",
        text: "Am Ende eines langen Dungeons gelangst du endlich wieder ans Tageslicht und siehst.. eine bunte Blumenwiese!",
        effect: "Lecke Spieler <randPlayer> den Handrücken!",
        id: 460
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Küsse Spieler <randPlayer> auf die Backe.",
        id: 470
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Mache einen Handstand. Oder versuch's zumindest..",
        id: 480
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Lasse Spieler <randPlayer> eine/n Ex anrufen und ihr/ihm sagen, dass du Sex brauchst.",
        id: 490
    }
];

// MENTALS 500 - 690
var mentals = [
    {
        title: "Sexy Floßfahrt",
        text: "Um die Flüsse von Meander zu durchqueren bist du auf die Hilfe der Floßfahrerin angewiesen. Sie hat einen lustigen Tag und will im Gegenzug etwas wissen.",
        effect: "Wann hattest du das letzte Mal Sex?",
        id: 500
    },
    {
        title: "Saufkumpanen",
        text: "Nach einem anstrengenden Tag leerst du dir zusammen mit den Einheimischen einen rein. Sie sind neugierig.",
        effect: "Was ist das peinlichste, das dir je passiert ist?",
        id: 510
    },
    {
        title: "Spaß unter Wilden",
        text: "Du stolperst unglücklich einen Hang hinunter und verlierst deine Kleidung. Unten landest du in einer Masse von nackten, maskierten Wilden. Eine Orgie! Und du mittendrin!",
        effect: "Welche 5 Personen stellst du dir darunter vor?",
        id: 520
    },
    {
        title: "Die Gefährten",
        text: "Ihr seid ein grandioses Team, das sich gut schlägt. Abends bei einem Bierchen am Lagerfeuer kommt ihr euch näher.",
        effect: "Mache Spieler <randPlayer> ein erotisches Kompliment.",
        id: 530
    },
    {
        title: "Love is in the Air",
        text: "Manchmal muss man sich einfach mal zusammenreißen, drauf scheißen und seiner großen Liebe gegenübertreten.",
        effect: "Beichte der 7. Person des anderen Geschlechts in deiner Kontaktliste deine Liebe.",
        id: 540
    },
    {
        title: "Jetzt geht's aber los!",
        text: "'Man muss sich einmal richtig anschreien, damit man sich näher kommt' sprach der Dorfjockel.",
        effect: "Beleidige Spieler <randPlayer>.",
        id: 550
    },
    {
        title: "Nettigkeitenaustausch",
        text: "Nach einer ordentlichen Prügelei untereinander steht auf einmal die Mutter von Spieler <randPlayer> vor der Türe.",
        effect: "Mache Spieler <randPlayer> ein ernst gemeintes Kompliment.",
        id: 560
    },
    {
        title: "Ein Jahr älter?",
        text: "Im Komplettsuff kann man schon mal was vergessen oder verwechseln. Dann gratuliert man lieber einmal zu oft.",
        effect: "Rufe den 14. Kontakt in deiner Liste an und wünsche ihm/ihr alles Gute zum Geburtstag.",
        id: 570
    },
    {
        title: "Nachrichten!",
        text: "Tja, es scheint als hättest du die Wette mit dem Dorfjockel verloren.",
        effect: "Spieler <randPlayer> liest deine letzten 3 Nachrichten vor.",
        id: 580
    },
    {
        title: "Musikalisch?!",
        text: "Musik kann die Stimmung anregen. Manchmal auch mehr als nur die Stimmung..",
        effect: "Hast du schonmal zu einem Musikvideo masturbiert?",
        id: 590
    },
    {
        title: "Ekel gegen Trieb",
        text: "FEHLT",
        effect: "Würdest du lieber Sex mit einem fetten Menschen haben oder mit einem Hässlichen?",
        id: 600
    },
    {
        title: "Aye Käpt'n",
        text: "Euer Schiff kentert bei der Überfahrt und du strandest auf einer Insel.",
        effect: "Wen aus der Runde würdest du am liebsten an deiner Seite haben?",
        id: 610
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Hattest du schonmal intimen Kontakt mit einem deiner Gefährten?",
        id: 620
    },
    {
        title: "FEHLT",
        text: "Oh eine bunte Blumenwiese!",
        effect: "Würdest du lieber einmal aus der Mülltonne essen oder einem Obdachlosen die Füße lecken?",
        id: 630
    },
    {
        title: "FEHLT",
        text: "Du schlenderst auf einer bunten Blumenwiese am Waldesrand entlang.",
        effect: "Würdest du lieber beim Analsex furzen müssen oder dich beim Oralsex übergeben?",
        id: 640
    },
    {
        title: "FEHLT",
        text: "FEHLT",
        effect: "Was macht dich am meisten an?",
        id: 650
    }
];

/*
// TEAM DECISIONS 700 - 890
var teamDecisions = [
    {
        title: "Facepalm",
        text: "Wer macht immer die peinlichsten Sachen?",
        effect: "Der Auserwählte darf trinken.",
        id: 700
    },
    {
        title: "Mathe 1",
        text: "Wer ist der intelligenteste im Raum?",
        effect: "Der Auserwählte darf trinken.",
        id: 710
    },
    {
        title: "Suffkopp",
        text: "Wer säuft grundsätzlich alle unter den Tisch?",
        effect: "Der Auserwählte darf trinken.",
        id: 720
    },
    {
        title: "Feierschwein",
        text: "Wer feiert gerne so richtig?",
        effect: "Der Auserwählte darf trinken.",
        id: 730
    },
    {
        title: "Schwinger",
        text: "Wer ist der tanzwütigste unter euch?",
        effect: "Der Auserwählte darf trinken.",
        id: 740
    },
    {
        title: "Schwedische Gardinen",
        text: "Wer wird von euch am ehesten im Gefängnis landen?",
        effect: "Der Auserwählte darf trinken.",
        id: 750
    },
    {
        title: "Jeder kennt einen",
        text: "Wer lacht am dreckigsten?",
        effect: "Der Auserwählte darf trinken.",
        id: 760
    },
    {
        title: "Menschus Perversus",
        text: "Wer steht auf die versautesten Dinge?",
        effect: "Der Auserwählte darf trinken.",
        id: 770
    },
    {
        title: "Weg damit",
        text: "Wer würde versuchen, kaputte/gebrauchte Dinge als Neu zu verkaufen?",
        effect: "Der Auserwählte darf trinken.",
        id: 780
    },
    {
        title: "Sieben",
        text: "Wer hat bisher die meisten Todsünden begangen?",
        effect: "Der Auserwählte darf trinken.",
        id: 790
    },
    {
        title: "Vorbild?!",
        text: "Wer ist der Anständigste unter euch?",
        effect: "Der Auserwählte darf trinken.",
        id: 800
    },
    {
        title: "Ach komm schon",
        text: "Wer würde niemals einen über den Durst trinken?",
        effect: "Der Auserwählte darf trinken.",
        id: 810
    },
    {
        title: "Der Coup",
        text: "Wem würde das perfekte Verbrechen gelingen?",
        effect: "Der Auserwählte darf trinken.",
        id: 820
    },
    {
        title: "Der Führer",
        text: "Wer gibt gerne den Ton an?",
        effect: "Der Auserwählte darf trinken.",
        id: 830
    },
    {
        title: "Das M in SM",
        text: "Wer macht alles was man ihm/ihr sagt?",
        effect: "Der Auserwählte darf trinken.",
        id: 840
    },
    {
        title: "Der Lässige",
        text: "Wer geht am liebsten in die Sauna?",
        effect: "Der Auserwählte darf trinken.",
        id: 850
    },
    {
        title: "Spaßverderber",
        text: "Wer nörgelt am meisten?",
        effect: "Der Auserwählte darf trinken.",
        id: 860
    },
    {
        title: "Der Genießer",
        text: "Wer genießt Oralsex am meisten?",
        effect: "Der Auserwählte darf trinken.",
        id: 870
    }
];
*/

// Good EVENTS 900 - 1090
var good = [
    // random Events die immer irgendwas Dummes auslösen
    // --> es kommt ein Geist angeflogen, der Unfug macht (allen Geld abnimmt, alle zurücksetzt, Plätze der Charaktere vertauscht, eine Runde "ich hab noch nie"..)
    {
        title: "NAMEOFTHEBROTHER",
        text: "Moin ihr Verrückten, lasst uns eine Runde spielen! Der Hauptgewinn diesmal ist:",
        effect: "Der Gewinner sammelt in den nächsten 3 Runden doppelt so viel Sternenstaub.",
        id: 900
    },
    {
        title: "Der Gute",
        text: "Moin ihr Verrückten, lasst uns eine Runde spielen! Der Hauptgewinn diesmal ist:",
        effect: "Der Gewinner bekommt von mir <randDust> Sternenstaub.",
        id: 910
    },
    /*
    {
        title: "Der Gute",
        text: "Moin ihr Verrückten, lasst uns eine Runde spielen! Der Hauptgewinn diesmal ist:",
        effect: "Der Gewinner darf 2 Felder nach vorne.",
        id: 920
    },
    */
    {
        title: "Der Gute",
        text: "Moin ihr Verrückten, lasst uns eine Runde spielen! Der Hauptgewinn diesmal ist:",
        effect: "Die Chance, dass der Gewinner den Navigations Ring beim nächsten Mal 2 Mal drehen darf, steigt auf 80%.",
        id: 930
    },
    {
        title: "Der Gute",
        text: "Moin ihr Verrückten, lasst uns eine Runde spielen! Der Hauptgewinn diesmal ist:",
        effect: "Der Gewinner darf kostenlos einen Skill erlernen.",
        id: 940
    },
    {
        title: "Der Gute",
        text: "Moin ihr Verrückten, lasst uns eine Runde spielen! Der Hauptgewinn diesmal ist:",
        effect: "Der Auserwählte darf einem anderen Spieler 2 Schlücke geben.",
        id: 950
    },
    {
        title: "Der Gute",
        text: "Moin ihr Verrückten, lasst uns eine Runde spielen! Der Hauptgewinn diesmal ist:",
        effect: "Der Auserwählte füllt das Glas eines anderen Spielers so wie er es will.",
        id: 960
    },
    {
        title: "Der Gute",
        text: "Moin ihr Verrückten, lasst uns eine Runde spielen! Der Hauptgewinn diesmal ist:",
        effect: "Der Auserwählte bekommt soviel Sternenstaub wie er bereits Schritte gelaufen ist.",
        id: 970
    },
    /*
    {
        title: "Der Gute",
        text: "Moin ihr Verrückten, lasst uns eine Runde spielen! Der Hauptgewinn diesmal ist:",
        effect: "Der Auserwählte darf einen Spieler bestimmen, der <randPlayer> Schritte zurückgehen muss.",
        id: 980
    },
    */
    {
        title: "Der Gute",
        text: "Moin ihr Verrückten, lasst uns eine Runde spielen! Der Hauptgewinn diesmal ist:",
        effect: "Für jeden aktivierten Skill bekommt der Auserwählte 5* geschenkt.",
        id: 990
    }
];

// Bad EVENTS 1100 - 1290
var bad = [
    /*
    {
        title: "Der Böse",
        text: "Ha, da bin ich wieder! Lasst uns wieder ein Opfer finden! Der Preis diesmal ist:",
        effect: "Der Auserwählte geht 4 Felder zurück.",
        id: 1100
    },
    */
    {
        title: "Der Böse",
        text: "Ha, da bin ich wieder! Lasst uns wieder ein Opfer finden! Der Preis diesmal ist:",
        effect: "Der Auserwählte zahlt mir <randDust>*.",
        id: 1110
    },
    {
        title: "Der Böse",
        text: "Ha, da bin ich wieder! Lasst uns wieder ein Opfer finden! Der Preis diesmal ist:",
        effect: "Der Auserwählte hat das Pech und zahlt für den nächsten Skill doppelt so viel.",
        id: 1120
    },
    {
        title: "Der Böse",
        text: "Ha, da bin ich wieder! Lasst uns wieder ein Opfer finden! Der Preis diesmal ist:",
        effect: "Der Navigations Ring des Auserwählten wird für's nächste Mal gekürzt.",
        id: 1130
    },
    {
        title: "Der Böse",
        text: "Ha, da bin ich wieder! Lasst uns wieder ein Opfer finden! Der Preis diesmal ist:",
        effect: "Beim nächsten Mal, sammelt der Auserwählte nur halb so viel Sternenstaub ein.",
        id: 1140
    },
    {
        title: "Der Böse",
        text: "Ha, da bin ich wieder! Lasst uns wieder ein Opfer finden! Der Preis diesmal ist:",
        effect: "Das Opfer trinkt jetzt erstmal sein Glas leer.",
        id: 1150
    },
    /*
    {
        title: "Der Böse",
        text: "Ha, da bin ich wieder! Lasst uns wieder ein Opfer finden! Der Preis diesmal ist:",
        effect: "Das Opfer trinkt beim nächsten Mal doppelt so viel wie angegeben.",
        id: 1160
    },
    */
    {
        title: "Der Böse",
        text: "Ha, da bin ich wieder! Lasst uns wieder ein Opfer finden! Der Preis diesmal ist:",
        effect: "Das Opfer zahlt Spieler <randPlayer> <randDust>*.",
        id: 1170
    },
    {
        title: "Der Böse",
        text: "Ha, da bin ich wieder! Lasst uns wieder ein Opfer finden! Der Preis diesmal ist:",
        effect: "Für jeden nicht-aktivierten Skill, zahlt mir das Opfer 3*.",
        id: 1180
    },
    {
        title: "Der Böse",
        text: "Ha, da bin ich wieder! Lasst uns wieder ein Opfer finden! Der Preis diesmal ist:",
        effect: "Das Opfer wirft eine Münze. Hast du Zahl, trinkt die ganze Mannschaft.",
        id: 1190
    },
];

// Bad EVENTS 1300 - 1490
var weird = [
    {
        title: "Der Verrückte",
        text: "Tüdelüü ihr Saufnasen, ich bin zurück und will Quatsch machen. Dieses mal machen wir folgendes:",
        effect: "Spieler <randPlayer> und Spieler <randPlayer> tauschen ihre Plätze.",
        id: 1300
    },
    {
        title: "Der Verrückte",
        text: "Tüdelüü ihr Saufnasen, ich bin zurück und will Quatsch machen. Dieses mal machen wir folgendes:",
        effect: "Spieler <randPlayer> tauscht sein Getränk mit Spieler <randPlayer>.",
        id: 1310
    },
    {
        title: "Der Verrückte",
        text: "Tüdelüü ihr Saufnasen, ich bin zurück und will Quatsch machen. Dieses mal machen wir folgendes:",
        effect: 'Lasst uns eine Runde "Ich hab noch nie.."" spielen.',
        id: 1320
    },
    {
        title: "Der Verrückte",
        text: 'Tüdelüü ihr Saufnasen, ich bin zurück und will Quatsch machen. Dieses mal machen wir folgendes:',
        effect: "Eine Runde 'Would you rather..'! Spieler <randPlayer>! Würdest du lieber nach Kacke stinken und es nicht wissen oder immer Kackeduft in der Nase haben aber nicht stinken?",
        id: 1330
    },
    {
        title: "Der Verrückte",
        text: 'Tüdelüü ihr Saufnasen, ich bin zurück und will Quatsch machen. Dieses mal machen wir folgendes:',
        effect: "Wir spielen 'Who is it'! Wer von euch steht auf die versautesten Dinge?",
        id: 1340
    },
    /*
    {
        title: "Der Verrückte",
        text: "Tüdelüü ihr Saufnasen, ich bin zurück und will Quatsch machen. Dieses mal machen wir folgendes:",
        effect: "Jeder geht so viele Schritte zurück wie er bereits getrunken hat.",
        id: 1350
    },
    */
    {
        title: "Der Verrückte",
        text: "Tüdelüü ihr Saufnasen, ich bin zurück und will Quatsch machen. Dieses mal machen wir folgendes:",
        effect: "Der Sternenstaub von allen Spielern wird eingezogen und gleichmäßig wieder verteilt.",
        id: 1360
    },
    {
        title: "Der Verrückte",
        text: "Tüdelüü ihr Saufnasen, ich bin zurück und will Quatsch machen. Dieses mal machen wir folgendes:",
        effect: "1% des Sternenstaubs von Spieler <randPlayer> verwandelt sich in getrunkene Schlücke.",
        id: 1370
    },
    {
        title: "Der Verrückte",
        text: "Tüdelüü ihr Saufnasen, ich bin zurück und will Quatsch machen. Dieses mal machen wir folgendes:",
        effect: "Spieler <randPlayer> darf sich aussuchen, wieviel er trinkt. Soviel darf er beim nächsten Mal dann auch zusätzlich nach vorne gehen.",
        id: 1380
    },
    {
        title: "Der Verrückte",
        text: "Tüdelüü ihr Saufnasen, ich bin zurück und will Quatsch machen. Dieses mal machen wir folgendes:",
        effect: "Spieler <randPlayer> und Spieler <randPlayer>: zwei Mal im Kreis drehen und dann High Five. Wer nicht lachen muss trinkt.",
        id: 1390
    },
    {
        title: "Der Verrückte",
        text: "Schaut mal da! Eine bunte Blumenwiese.",
        effect: "Alle Spieler hauen ihr Glas weg!",
        id: 1400
    },
];



/*
// WOULD YOU RATHER 1100 - 1290
var wouldYouRather = [
    {
        title: "Würdest du lieber..",
        text: "Dein Leben lang auf Käse verzichten oder lieber auf Oralsex?",
        effect: "",
        id: 1100
    },
    {
        title: "Würdest du lieber..",
        text: "Nach Kacke stinken und es nicht wissen oder immer Kackeduft in der Nase haben aber nicht stinken?",
        effect: "",
        id: 1110
    },
    {
        title: "Würdest du lieber..",
        text: "Mit einer Ziege Sex haben und keiner weiß es oder keinen Sex mit einer Ziege haben, aber jeder glaubt, dass du es hättest?",
        effect: "",
        id: 1120
    },
    {
        title: "Würdest du lieber..",
        text: "Wissen wann du stirbst oder wie du stirbst?",
        effect: "",
        id: 1130
    },
    {
        title: "Würdest du lieber..",
        text: "Die Unterhose von jemand anderem tragen oder die Zahnbürste von jemand anderem benutzen?",
        effect: "",
        id: 1140
    },
    {
        title: "Würdest du lieber..",
        text: "Jede Woche einmal in der Öffentlichkeit einnässen oder jeden Tag zu Hause einscheißen?",
        effect: "",
        id: 1150
    },
    {
        title: "Würdest du lieber..",
        text: "Ein Tattoo stechen oder einen Piercing machen lassen?",
        effect: "",
        id: 1160
    },
    {
        title: "Würdest du lieber..",
        text: "Die wahre Liebe finden oder im Lotto gewinnen?",
        effect: "",
        id: 1170
    },
    {
        title: "Würdest du lieber..",
        text: "Nie wieder Essen schmecken oder lieber Sex für immer aufgeben?",
        effect: "",
        id: 1180
    },
    {
        title: "Würdest du lieber..",
        text: "1 Millionen Euro geschenkt bekommen oder imstande sein durch Wände gehen zu können?",
        effect: "",
        id: 1190
    },
    {
        title: "Würdest du lieber..",
        text: "Fliegen können oder unsichtbar sein?",
        effect: "",
        id: 1200
    },
];
*/

// var cards = ["rules", "physicals", "mentals", "teamDecisions", "wouldYouRather"];

Game_Interpreter.prototype.pluginCommand = function(command, args) {
    EventCards.call(this, command, args);

    switch(command) {
        case 'DrawCard':
            getCard();
            break;
    }
}

function randomPlayer() {
    playerCount = $gameVariables.value(10);
    for (i = 1; i < playerCount + 1; i++) { playerArr.push(i); }
    randPlayer = playerArr[Math.floor(Math.random()*playerArr.length)];
}

function getCard() {

    regionId = $gameVariables.value(16);

    switch (regionId) {
        case 1:
            // Replaced by Battle Tiles and by Event Tiles

            /*
            randomCard = wouldYouRather[Math.floor(Math.random()*wouldYouRather.length)];
            var remove = wouldYouRather.indexOf(randomCard);
            wouldYouRather.splice(remove, 1);

            $gameVariables.setValue(76, $gameVariables.value(76) + 1);
            break;


            randomCard = teamDecisions[Math.floor(Math.random()*teamDecisions.length)];
            var remove = teamDecisions.indexOf(randomCard);
            teamDecisions.splice(remove, 1);

            $gameVariables.setValue(75, $gameVariables.value(75) + 1);
            break;
            */

        case 5:
            randomCard = rules[Math.floor(Math.random()*rules.length)];
            var remove = rules.indexOf(randomCard);
            rules.splice(remove, 1);

            $gameVariables.setValue(72, $gameVariables.value(72) + 1);
            break;

        case 2:
        case 6:
            randomCard = physicals[Math.floor(Math.random()*physicals.length)];
            var remove = physicals.indexOf(randomCard);
            physicals.splice(remove, 1);

            $gameVariables.setValue(73, $gameVariables.value(73) + 1);
            break;

        case 3:
        case 4:
        case 7:
            randomCard = mentals[Math.floor(Math.random()*mentals.length)];
            var remove = mentals.indexOf(randomCard);
            mentals.splice(remove, 1);

            $gameVariables.setValue(74, $gameVariables.value(74) + 1);
            break;

        // The Good, the Bad and the Weird
        case 11:
            randomCard = good[Math.floor(Math.random()*good.length)];
            var remove = good.indexOf(randomCard);
            break;
        case 12:
            randomCard = bad[Math.floor(Math.random()*bad.length)];
            var remove = bad.indexOf(randomCard);
            break;
        case 13:
            randomCard = weird[Math.floor(Math.random()*weird.length)];
            var remove = weird.indexOf(randomCard);
            break;
    }

    $gameVariables.setValue(28, randomCard.title);

    // Randomly pick a Player
    playerCount = $gameVariables.value(10);
    var currentChar = $gameVariables.value(13);
    for (i = 1; i < playerCount + 1; i++) {
        if (i != currentChar) {
            playerArr.push(i);
        }
    }

    // Randomly select a brand
    var brandArr = [
        "eine Zigarettenmarke",
        "ein alkoholisches Getränk",
        "eine Stellung beim Sex",
        "einen (realistischen) Fetisch",
        "eine Schuhmarke",
        "eine Serie",
        "etwas vegetarisches zum essen",
        "die Tasten auf einer deutschen Tastatur. Beginnend von links oben mit Q",
        "aufsteigend die römischen Zahlen",
        "einen Charakter aus GZSZ",
        "eine Pornodarstellerin",
        "eine Klasse in einem Rollenspiel",
        "ein Land in Afrika",
        "einen Film mit Dwayne 'The Rock' Johnson",
        "eine Boygroup",
        "ein soziales Netzwerk",
        "ein Lied von Britney Spears",
        "einen Song zum Thema Sex",
        "ein Musikfestival",
        "einen IKEA Möbelnamen"
    ];

    // Randomly set an amount of Stardust
    var randDust = Math.floor((Math.random() * 80) + 20);
    $gameVariables.setValue(203, randDust);

    // Randomly set a brand
    var picked = Math.floor(Math.random()*brandArr.length);
    var randBrand = brandArr[picked];
    brandArr.splice(picked, 1);

    var cardText = randomCard.effect;

    // Replace randPlayer with a random Player
    var matches = cardText.match(/<randPlayer>/g);

    if (matches) {
        matches.forEach(function(match) {
            var randPlayerIndex = Math.floor(Math.random()*playerArr.length);

            cardText = cardText.replace('<randPlayer>', playerArr[randPlayerIndex]);
            $gameVariables.setValue(209, playerArr[randPlayerIndex]);

            playerArr.splice(randPlayerIndex, 1);
        });
    }


    var text = cardText.replace('<randDust>', randDust).replace('<randBrand>', randBrand);

    $gameVariables.setValue(29, randomCard.text);
    $gameVariables.setValue(30, text);

    if (regionId > 4) {
        chosenCard = randomCard.id;
        replaceCard();
    }
}

function replaceCard() {
    switch(chosenCard) {

        /*default:
            console.log('nice');
            break;*/

// RULES 100 - 290
        case 100:
            rules.push({
                title: randomCard.title,
                text: "Ihr habt die verrückten Goblins abgehängt und seid außer Gefahr.",
                effect: "Ihr dürft euch wieder beim Namen nennen.",
                id: randomCard.id + 1
            });
            break;

        case 110:
            rules.push({
                title: randomCard.title,
                text: "El Presidente Manu war gnädig genug und hat kapiert, dass ihr nichts ausplaudern wollt.",
                effect: "Ihr dürft wieder Ja und Nein sagen.",
                id: randomCard.id + 1
            });
            break;

        case 120:
            rules.push({
                title: randomCard.title,
                text: "Nach einer Menge Spaß mit der holden Domina, lässt sie euch wieder gehen.",
                effect: "Ihr dürft wieder beide Hände benutzen.",
                id: randomCard.id + 1
            });
            break;

        case 130:
            rules.push({
                title: randomCard.title,
                text: "Mittlerweile hat es nun alle erwischt. Es ist einfach zu heiß..",
                effect: "Alle Spieler ziehen ein Kleidungsstück aus.",
                id: randomCard.id + 1
            });
            break;

        case 140:
            rules.push({
                title: randomCard.title,
                text: "Nachdem die Diebesgilde schon gut gesoffen hat, wird es immer interessanter.",
                effect: "Alle die ein cooles/sexy Kleidungsstück tragen, dürfen 2 Schlücke verteilen.",
                id: randomCard.id + 1
            });
            break;

        case 150:
            rules.push({
                title: randomCard.title,
                text: "Das Imperiumsheer ist ein asoziales Pack. Sie kommen zurück und kontrollieren noch einmal.",
                effect: "Jeder Spieler mit einem E im Vor- oder Nachnamen trinkt 2 Schlücke.",
                id: randomCard.id + 1
            });
            break;

        case 160:
            rules.push({
                title: randomCard.title,
                text: "Nachdem ihr die Flüstertour hinter euch habt, seid ihr im Katertal gelandet und müsst euch wieder anpassen.",
                effect: "Für 3 Runden muss jeder wie ein Mongo sprechen.",
                id: randomCard.id + 1
            });
            break;

        case 170:
            rules.push({
                title: randomCard.title,
                text: "Die Spiele auf dem Narrenmarkt gehen weiter und ihr habt Spaß daran.",
                effect: "Jeder Spieler sucht einen pinken Gegenstand. Der Letzte muss 5 Schlücke trinken.",
                id: randomCard.id + 1
            });
            break;

        case 180:
            rules.push({
                title: randomCard.title,
                text: "Du siehst die Zwei aus dem Venushügelwald erneut. Diesmal bist du näher dran und erkennst, dass es 2 deiner Freunde sind.",
                effect: "Was machst du?",
                id: randomCard.id + 1
            });
            break;

        case 190:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "Wer von euch hatte schonmal Sex an einem öffentlichen Platz?",
                id: randomCard.id + 1
            });
            break;

        case 200:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "An welchem Ort hattest du zuletzt Sex?",
                id: randomCard.id + 1
            });
            break;

        case 210:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "Der Adelstitel des Barons wird aufgrund von Inkompetenz wieder aberkannt.",
                id: randomCard.id + 1
            });
            break;

        case 220:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "Jeder Gefährte nennt reihum <randBrand>. Wer nicht mehr weiter weiß trinkt.",
                id: randomCard.id + 1
            });
            break;

        case 230:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "Jeder Gefährte nennt reihum <randBrand>. Wer nicht mehr weiter weiß trinkt.",
                id: randomCard.id + 1
            });
            break;

        case 240:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "Jede Dame tauscht ein Kleidungsstück mit einem Herren.",
                id: randomCard.id + 1
            });
            break;

        case 250:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "Die vom Spieler vorher ausgedachte Regel wird zerstört.",
                id: randomCard.id + 1
            });
            break;

// PHYSICALS 300 - 490
        case 300:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Die Imitation hat das Imperiumheer beeindruckt. Sie wollen, dass du sie weiter unterhältst.",
                effect: "Erzähle den anderen einen Witz.",
                id: randomCard.id + 1
            });
            break;

        case 310:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Du kannst es einfach nicht lassen. Die Wirkung von 'Stumm' hat nachgelassen aber du ärgerst den Magier schon wieder. Diesmal macht er dich blind.",
                effect: "Du musst die nächste Runde blind spielen.",
                id: randomCard.id + 1
            });
            break;

        case 320:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Du hast dir die Seele aus dem Leib gesungen. Nice! Dumm nur, dass dir die Stimmbänder heiß gelaufen sind.",
                effect: "Die nächsten 2 Runden bleibst du stumm.",
                id: randomCard.id + 1
            });
            break;

        case 330:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Das Orakel von Selfie ist noch nicht befriedigt und verlangt mehr Opfergaben. Diesmal von allen Gefährten!",
                effect: "Jeder macht ein Selfie von der Gruppe und schickt es an den zwölften Kontakt.",
                id: randomCard.id + 1
            });
            break;

        case 340:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Der Geist des Barden scheint nicht wieder verschwinden zu wollen. Diesmal verlangt er ein Elfchen von dir (11 Wörter: 1-2-3-4-1).",
                effect: "Wenn ihr googlen müsst, trinkt jeder.",
                id: randomCard.id + 1
            });
            break;

        case 350:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Die Liegestütze reichen nicht aus, um den Kater wegzubekommen und fit für die nächste Sauftour zu sein.",
                effect: "Steh auf einem Bein, halt dir die Nase zu und sing 'Alle meine Entchen'.",
                id: randomCard.id + 1
            });
            break;

        case 360:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Jetzt hast du vor lauter Trotteligkeit auch noch deine Hose verloren und musst sie suchen gehn.",
                effect: "Spiele eine Runde lang ohne Hose.",
                id: randomCard.id + 1
            });
            break;

        case 370:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Der Disput artet komplett aus. Die ganze Schenke hängt sich in den Haaren.",
                effect: "Macht einen Gruppen-Schnick.",
                id: randomCard.id + 1
            });
            break;

        case 380:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Der Zusammenhalt unter euch kann nicht genug verbessert werden.",
                effect: "Jeder Spieler umarmt jeden.",
                id: randomCard.id + 1
            });
            break;

        case 390:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Die Malerei hat euch so viel Spaß gemacht, dass ihr jetzt komplett ausrastet.",
                effect: "Male allen Spielern etwas ins Gesicht (dir selbst auch). Alle Spieler, außer dem zu Bemalenden, entscheiden was es wird.",
                id: randomCard.id + 1
            });
            break;

        case 400:
            physicals.push({
                title: randomCard.title + " #2",
                text: "So, und damit alle Gefährten von Fettleibigkeit verschont bleiben, bewegt sich jetzt jeder.",
                effect: "Alle Spieler tauschen die Plätze eins weiter und trinken ab jetzt das was vor ihnen steht.",
                id: randomCard.id + 1
            });
            break;

        case 410:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Nach deinem Suff-Ausraster auf dem Wochenmarkt kannst du dich erstmal nicht mehr in der Öffentlichkeit zeigen.",
                effect: "Der Spieler der vorher seinen Hintern gezeigt hat, kann den anderen für 3 Runden nicht mehr in die Augen sehen.",
                id: randomCard.id + 1
            });
            break;

        case 420:
            physicals.push({
                title: randomCard.title + " #2",
                text: "FEHLT",
                effect: "Renne 3 Mal um den aufgeräumten Tisch, während du 3 Schlücke trinkst.",
                id: randomCard.id + 1
            });
            break;

        case 430:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Und weiter geht's mit der Spaßförderung. Wir versuchen mal den Pegel auszugleichen.",
                effect: "Der Spieler mit dem meisten im Glas tauscht mit dem, der noch am wenigsten hat.",
                id: randomCard.id + 1
            });
            break;

        case 440:
            physicals.push({
                title: randomCard.title + " #2",
                text: "FEHLT",
                effect: "Mache 1 einbeinige Kniebeuge. Versagst du, trinkst du!",
                id: randomCard.id + 1
            });
            break;

        case 450:
            physicals.push({
                title: randomCard.title + " #2",
                text: "FEHLT",
                effect: "Gib einen Fetisch von dir Preis.",
                id: randomCard.id + 1
            });
            break;

        case 460:
            physicals.push({
                title: randomCard.title + " #2",
                text: "Wunderschön. So rot und gelb und grün. Und dann dieser Duft. Eine bunte Blumenwiese!",
                effect: "Lecke allen Gefährten die Nase!",
                id: randomCard.id + 1
            });
            break;

        case 470:
            physicals.push({
                title: randomCard.title + " #2",
                text: "FEHLT",
                effect: "Der vorher Küssende wird von allen Spielern zurückgeküsst.",
                id: randomCard.id + 1
            });
            break;

        case 480:
            physicals.push({
                title: randomCard.title + " #2",
                text: "FEHLT",
                effect: "Derjenige der vorher den Handstand gemacht (oder versucht) hat, darf <randPlayer> Schlücke verteilen.",
                id: randomCard.id + 1
            });
            break;

        case 490:
            physicals.push({
                title: randomCard.title + " #2",
                text: "FEHLT",
                effect: "Sitze für eine Runde auf den Schoß von Spieler <randPlayer>.",
                id: randomCard.id + 1
            });
            break;

// MENTALS 500 - 690
        case 500:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Du hast die Floßfahrt überstanden aber die lüsterne Floßfahrerin will noch mehr von dir wissen.",
                effect: "Wann hattest du dein erstes Mal?",
                id: randomCard.id + 1
            });
            break;

        case 510:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Die Saufkumpanen feiern dich und haben sich ordentlich über die Peinlichkeit amüsiert. Jetzt geht der Spaß erst richtig los.",
                effect: "Welches ist deine Lieblingsstellung?",
                id: randomCard.id + 1
            });
            break;

        case 520:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Nach knapp vierdreiviertel Stunden ist die Orgie endlich beendet. Völlig wund gehst du deiner Wege.",
                effect: "Was machst du nach dem Sex am liebsten?",
                id: randomCard.id + 1
            });
            break;

        case 530:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Der Abend am Lagerfeuer ist noch nicht zuende, es bricht gerade die Nacht herein und ihr versteht euch ziemlich gut.",
                effect: "Welchen Spieler der Runde würdest du am liebsten massieren?",
                id: randomCard.id + 1
            });
            break;

        case 540:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Und manchmal reicht es nicht, dem anderen nur seine Liebe zu gestehen.",
                effect: "Schreibe der 8. Person des anderen Geschlechts in deiner Kontaktliste, dass du Sex mit ihr möchtest.",
                id: randomCard.id + 1
            });
            break;

        case 550:
            mentals.push({
                title: randomCard.title + " #2",
                text: "'Und der Herr gibt und der Herr nimmt', der Dorfjockel scheint komplett am Sack zu sein.",
                effect: "Der beleidigte Spieler von vorher darf sich revanchieren.",
                id: randomCard.id + 1
            });
            break;

        case 560:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Nun steht auch noch die Mutter des andern Spielers vor der Türe.",
                effect: "Der komplimentierte Spieler von vorher macht dir nun ein Kompliment.",
                id: randomCard.id + 1
            });
            break;

        case 570:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Da du eh schon nichts mehr blickst in deiner Bierseligkeit, geht der Spaß grad so weiter.",
                effect: "Spieler <randPlayer> ruft den 16. Kontakt in seiner Liste an und bellt einfach nur.",
                id: randomCard.id + 1
            });
            break;

        case 580:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Schon wieder eine verlorene Wette? Der Dorfjockel freut sich und jockelt fröhlich rum.",
                effect: "Spieler <randPlayer> liest die letzten 5 Nachrichten der Kontakte des anderen Geschlechts vor.",
                id: randomCard.id + 1
            });
            break;

        case 590:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Nicht nur Musik kann anregend sein. Manchmal reichen die kleinen Sachen.. Mehrmals..",
                effect: "Hast du schonmal öfter als 3 Mal am Tag masturbiert?",
                id: randomCard.id + 1
            });
            break;

        case 600:
            mentals.push({
                title: randomCard.title + " #2",
                text: "FEHLT",
                effect: "Würdest du lieber Sex mit einem alten (90+) Menschen haben oder mit einem hübschen Schaf?",
                id: randomCard.id + 1
            });
            break;

        case 610:
            mentals.push({
                title: randomCard.title + " #2",
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 620:
            mentals.push({
                title: randomCard.title + " #2",
                text: "FEHLT",
                effect: "Mit welchem deiner Gefährten würdest du am ehesten Sex haben?",
                id: randomCard.id + 1
            });
            break;

        case 630:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Hoch in den Bergen, durch den kalten Eissturm, hinter all dem Eis und Schnee siehst du.. eine bunte Blumenwiese?!",
                effect: "Esse etwas aus der Mülltonne oder lecke einem Obdachlosen die Füße!",
                id: randomCard.id + 1
            });
            break;

        case 640:
            mentals.push({
                title: randomCard.title + " #2",
                text: "Als du am Abend müde in dein Bett fällst, träumst du von all den Abenteuern und einer bunten Blumenwiese!",
                effect: "Brüll rum wie ein Irrer während dir Spieler <randPlayer> das Glas auffüllt.",
                id: randomCard.id + 1
            });
            break;

        case 650:
            mentals.push({
                title: randomCard.title + " #2",
                text: "FEHLT",
                effect: "Wie würdest du jemanden verführen?",
                id: randomCard.id + 1
            });
            break;

/*
// EVENTS 900 - 1090
        case 900:
            cards.push({
                title: randomCard.title + " #2",
                text: "Das Glück scheint auf deiner Seite zu sein. Du scheinst immer noch nüchtern zu sein, was dir einen Vorteil verschafft.",
                effect: "Beim nächsten Mal sammelt Spieler <randPlayer> vier Mail soviel Sternenstaub.",
                id: randomCard.id + 1
            });
            break;

        case 910:
            cards.push({
                title: randomCard.title + " #2",
                text: "Dein Pech. Der Spieler dem du das Bein gestellt hast, hat Behemoths Reißzahn gefunden und rächt sich nun an dir indem er dich in ein Loch schubst.",
                effect: "Spieler <randPlayer> muss eine Runde aussetzen um aus dem Loch zu kriechen.",
                id: randomCard.id + 1
            });
            break;


        case 920:
            cards.push({
                title: randomCard.title + " #2",
                text: "Die Frau des Wirts beichtet ihm, dass das Kind nicht von ihm sei. Der Wirt rastet aus und leert den Krug in einem Zug. Grimmig schaut er euch an.",
                effect: "Ihr tut es ihm gleich.",
                id: randomCard.id + 1
            });
            break;
*/

// The Good 900 - 1090
        case 900:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 910:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 920:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 930:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 940:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 950:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 960:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 970:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

// The Bad 1100 - 1290
        case 1100:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1110:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1120:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1130:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1140:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1150:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1160:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1170:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;


// The Weird 1300 - 1490
        case 1300:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1310:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1320:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1330:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1340:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1350:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1360:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;

        case 1370:
            rules.push({
                title: randomCard.title,
                text: "FEHLT",
                effect: "FEHLT",
                id: randomCard.id + 1
            });
            break;
    }
}
