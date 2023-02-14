
// Das gesamte Spiel "Whac A Mole" wurde in einer Funktion zusammengefasst
function whacMole(){
    // Hier werden alle Hilfsvariablen für die jeweiligen Anweisungen gelistet
    let holes,count,score,result,countDown,startTime,moles,firstRow,secondRow,thirdRow,audio,cursor,soundSwitch;
    // Hier werden die Variablen mit den HTML DIVs verknüpft
    cursor    = el('#cursor');        // Das DIV unseres Mauszeigers
    holes     = group('.hole');       // Ordnet die DIV mit der Klasse "hole" in einem Array an
    count     = el('#count');         // Das DIV für unseren Zeit-Zähler
    score     = el('#score');         // Das DIV für unseren Punkte-Zähler
    firstRow  = group('.row1');       // Ordnet alle DIV mit der Klasse ".row1" in einem Array an
    secondRow = group('.row2');       // Ordnet alle DIV mit der Klasse ".row2" in einem Array an
    thirdRow  = group('.row3');       // Ordnet alle DIV mit der Klasse ".row3" in einem Array an
    // In diesem Objekt werden Audio-Eigenschaften definiert
    const sounds ={

        molePlus : 'sound/break.mp3',       // Treffer mit positiven Punkten
        moleMinus: 'sound/shot.mp3',        // Treffer mit negativen Punkten
        winner   : 'sound/winner.mp3'       // Der Sound beim Spiel-Ende
    }; // Ende sounds Objekt
    // Diese Funktion definiert die Initialwerte der aufgeführten Variablen
    function initVaris(){  

        result      = 0;          // Die Punktzahl bei Spielbeginn
        countDown   = 60;         // Die Startzeit in Minuten bei Spielbeginn
        soundSwitch = true;       // Aktiviert den Sound bei Spielbeginn

        el('#result').innerText    = `Score: ${result}`;         // Setzt den Punkte-Zähler nach Neustart des Spiels auf 0
        el('#countdown').innerText = `Time: ${countDown}`;       // Setzt den Zeit-Zähler nach Neustart des Spiels auf 60 Sekunden
    }; // Ende initVaris Funktion
    // Diese Funktion entfernt alle "Mole-Klassen" aus den entsprechenden DIVs
    function removeMoles(array){
        // In dieser forEach funktion wird in jedem Schritt eine "Mole-Klasse" einzelnen entfernt
        array.forEach(row =>{                          // "row" lokaler Parameter nur für DIESE Funktion
            row.classList.remove('mole10');            // Entfernt die "10-Punkte-Klasse" / Internet-Recherche
            row.classList.remove('mole25');            // Entfernt die "25-Punkte-Klasse" / Internet-Recherche
            row.classList.remove('mole50');            // Entfernt die "50-Punkte-Klasse" / Internet-Recherche
            row.classList.remove('mole-minus');        // Entfernt die "Minus-Punkte-Klasse" / Internet-Recherche
        });
    }; // Ende removeMoles Funktion
    // Diese Funktion fügt die "Mole-Klassen" zufällig einem "hole-DIV" zu
    function randomHole(row){       // "row" lokaler Parameter nur für DIESE Funktion

        const moleArray = [         // Hilfs-Array um die "Mole-Klassen" zufällig einem DIV hinzuzufügen
            'mole10',
            'mole10',
            'mole-minus',
            'mole25',
            'mole-minus',
            'mole50',
            'mole-minus',
            'mole10',
            'mole25'
        ];
        
        removeMoles(row);       // Löscht die "Mole-Klassen" Zuweisung vor jeder neuen Zuweisung
        let randomPostion = row[ Math.floor(Math.random()*3)];       // Definiert zufällig das "Hole-DIV", in welchem eine "Mole-Klasse" hinzugefügt wird
        return randomPostion.classList.add( moleArray[Math.floor(Math.random()*9)]);       // Bestimmt eine zufällige "Mole-Klasse" welche dem entsprechenden DIV hinzugefügt wird
    }; // Ende randomHole Funktion
    // Diese Funktion fügt die zufällig ausgewählte "Mole-Klasse" den jeweiligen "row-DIVs" zu
    function randomMoles(){
    
        randomHole(firstRow);        // Erste Reihe Löcher
        randomHole(secondRow);       // Zweite Reihe Löcher
        randomHole(thirdRow);        // Dritte Reihe Löcher
    }; // Ende randomMoles Funktion
    // Diese Funktion lässt die "Mole-Klassen" jede Sekunde neu erscheinen
    function moveMoles(){

        moles = setInterval(randomMoles,800);       // "moles" wurde als Hilfsvariable für das Stoppen der randomMoles Funktion angelegt / Legt außerdem die Dauer zwischen den Vorgängen fest
    }; // Ende moveMoles Funktion
    // Diese Funktion definiert die Eigenschaften der Audio Wiedergabe
    function playAudio(path) {

        if (soundSwitch) {                    // Prüft ob soundSwitch = true oder = false
            audio        = new Audio();       // Erzeugt ein neues HTML Audio Objekt
            audio.volume = 0.5;               // Definiert die Lautstärke der abgespielten Audio Dateien
            audio.src    = path;              // Erzeugt das src Attribut mit Hilfe des path Paramters
            audio.play();                     // Spielt die Audiodateien ab
        };
    }; // Ende playAudio Funktion
    // Diese Funktion ermöglicht das Aktivieren & deaktivieren der Spiel-Sounds
    function soundOnOff(){

        soundSwitch = !soundSwitch;                      // "!" setzt immer den gegenteiligen Wert für diese Variable
        if(soundSwitch){
            el('#sound').innerText ="Sound ■ Off";       // Verbindet die Funktion mit dem Button und deaktiviert den Sound & ändert den Inhalt(Text)
        }else{
            el('#sound').innerText ="Sound ▶ On";       // Verbindet die Funktion mit dem Button und aktiviert den Sound & ändert den Inhalt(Text)
        };
    }; // Ende soundOnOff Funktion
    // Diese Funktion zählt die Treffer und summiert die jeweiligen Punkte
    function scoreCounter(){
        // classList.container = Internet Recherche
        if(this.classList.contains('mole10') )                  
        {   result += 10;                                       // Addiert aufgrund der "Mole-Klasse" 10 Punkte zum Gesamtergebnis
            playAudio(sounds.molePlus);
        }else if(this.classList.contains('mole25') ){
            result += 25;                                       // Addiert aufgrund der "Mole-Klasse" 25 Punkte zum Gesamtergebnis
            playAudio(sounds.molePlus);
        }else if(this.classList.contains('mole50') ){
            result += 50;                                       // Addiert aufgrund der "Mole-Klasse" 50 Punkte zum Gesamtergebnis
            playAudio(sounds.molePlus);
        }else if(this.classList.contains('mole-minus') ){
            result -= 25;                                       // Subtrahiert aufgrund der "Mole-Klasse" 25 Punkte vom Gesamtergebnis
            playAudio(sounds.moleMinus);
        };
        
        el('#result').innerText = `Score : ${result}`;          // Verbindet die Funktion mit dem "result-DIV" und spielt das Ergebnis aus
    }; // Ende scoreCounter Funktion
    // Diese Funktion startet das Spiel
    function start(){
        // setInterval = Internet Recherche
       startTime = setInterval(time,1000);       // "startTime" wurde als Hilfsvariable für das Stoppen des Zeit-Zählers angelegt / Legt außerdem die Dauer zwischen den Vorgängen fest
       moveMoles();                              // Führt die Funktion moveMoles aus
       el('#start').className='passive';         // Verbindet die Funktion mit dem Start-Button und fügt dem Button eine Klasse hinzu
       el('#cursor').className='active';         // Verbindet die Funktion mit dem cursor-DIV und ändert die DIV-Klasse
       el('#game').className='nocursor';         // Verbindet die Funktion mit dem game-DIV und fügt dem DIV eine Klasse hinzu
       el('#sound').className='active';          // Verbindet die Funktion mit dem sound-Button und ändert die DIV-Klasse
    }; // Ende start Funktion
    // Diese Funktion startet/beendet den Countdown des Spiels
    function time(){
    
        countDown--;                                  // "--" Definiert das der Countdown herunter zählt
        if(countDown === 0){                          // Prüft, ob der Countdown abgelaufen ist
            clearInterval(startTime);                 // Stoppt die Aufrufe der Hilfsvariable startTime bei Countdown-Ende - clearInterval = Internet Recherche
            clearInterval(moles);                     // Stoppt die Aufrufe der Hilfsvariable moles bei Countdown-Ende - clearInterval = Internet Recherche
            removeMoles(holes);                       // Diese Funktion entfernt alle zugewiesenen mole DIV-Klassen
            gameOver();                               // Das Ende des Spiels ist mit dem ausführen dieser Funktion erreicht
            el('#cursor').className ='passive';       // Ändert den Cursor wieder in die Standardanzeige
        };

        el('#countdown').innerText = `Time: ${countDown}`;       // Verbindet die Funktion mit dem countdown-DIV und zeigt den aktuellen Wert an
    }; // Ende time Funktion
    // Diese Funktion definiert den "Endbildschirm" des Spiels
    function createEnd(){

        el('#endGame').className    = 'active';                 // Ändert die Klasse des endGame-DIV
        el('#finalscore').innerText = `Score: ${result}`;       // Zeigt den finalen Wert aller erzielten Punkte an
    }; // Ende createEnd Funktion
    // Diese Funktion beendet Spiel
    function gameOver(){
    
        createEnd();                               // Zeigt den "Endbildschirm" im Browser an
        playAudio(sounds.winner);                  // Spielt den finalen Sound ab
        el('#wrapper').className ='passive';       // Fügt die Klasse im wrapper-DIV ein / ursprünglicher Wrapper wird ausgeblendet
    }; // Ende gameOver Funktion
    // Diese Funktion bereitet eine neue Runde des Spiels vor
    function newGame(){
       
        el('#game').classList.remove('nocursor');       // Zeigt den Mauszeiger wieder im kompletten Fenster an / classList.remove = Internet Recherche
        el('#sound').className='passive';               // Setzt die Klasse des sound-DIV wieder auf den Ausgangswert
        el('#wrapper').className='active';              // Entfernt die Klasse des wrapper-DIV wieder
        el('#endGame').className='passive';             // Setzt die Klasse des endGame-DIV wieder auf den Ausgangswert
        el('#start').className='active';                // Entfernt die Klasse des start-Button wieder
        audio.pause();                                  // Diese Funktion beendet die Soundwiedergabe bei Betätigung des "Replay-Buttons"
        initVaris();                                    // Setzt die in dieser Funktion enthaltenen Veriablen NUR bei Betätigung des "Replay-Button" wieder auf den Ausgangswert zurück
    }; // Ende newGame Funktion

    initVaris();       // Setzt die in dieser Funktion enthaltenen Veriablen wieder auf den Ausgangswert zurück
    // Diese Funktion erfasst die Klicks auf jedes einzelne "hole-DIV"
    holes.forEach(hole => {
        hole.addEventListener('click',scoreCounter)       // Bei jedem Klick wird hier die scoreCounter Funktion aufgerufen
    }); // Ende holes.forEach Funktion
    // Diese Funktion verbindet den (angepassten) Cursor mit der game Funktion / Internet-Recherche
    el('#game').addEventListener('mousemove', e => {
        cursor.style.top = e.pageY + 'px';        // Erfasst die Cursor-Position auf der Y Achse im game-DIV
        cursor.style.left = e.pageX + 'px';       // Erfasst die Cursor-Position auf der X Achse im game-DIV
        });

    el('#replay').addEventListener('click',newGame);         // Verbindet die newGame Funktion per Klick mit dem Replay Button

    el('#sound').addEventListener('click',soundOnOff);       // Verbindet die soundOnOff Funktion per Klick mit dem Sound Button

    el('#start').addEventListener('click',start);            // Verbindet die start Funktion per Klick mit dem Start Button

}; // Ende der kompletten Spiele-Funktion

whacMole();       // Führt die Whac-A-Mole Funktion [ - -=> das SUPER Spiel! (; <=- - ]- aus