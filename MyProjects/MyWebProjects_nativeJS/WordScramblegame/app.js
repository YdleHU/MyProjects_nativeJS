const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word");

let correctWord, timer;


//Timer Beállításai
const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        //Ha nagyobb mint 0, akkor csökkenjen a számláló (30-tól egészen 0-ig)
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        //Ha elérte a 0 -át, akkor clear-elje, és írja ki, hogy Time off! Majd restart.
        clearInterval(timer);
        alert(`TIME OFF! ${correctWord.toUpperCase()} is not a correct word`);
        initGame(); //Restart app
    }, 1000);
}


const initGame = () => {
    initTimer(30); //30 másodperces timer
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split(""); //karakterek között szünet(space)

    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //Megkapni a Random számot
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join(""); //Összekevert szó mint word text
    hintText.innerText = randomObj.hint; //Az Összekevert szóhoz tartozó hint
    correctWord = randomObj.word.toLowerCase();
    inputField.value = ""; //Korrekt szó után legyen mindig üres a mező
    inputField.setAttribute("maxlength", correctWord.length); //A maximum leghosszabb korrekt szónál, több karaktert ne lehessen beírni
}
initGame();


const CheckWord = () => {
    let userWord = inputField.value.toLowerCase();//Megkapni a value-t LowerCase betütípusban
    //Ha üresen hagyod a mezőt
    if (!userWord) {
        return alert("Please enter a word!");
    }

    //Ha a beírt szó nem egyezik meg a korrekt szóval
    if (userWord !== correctWord) {
        return alert(`Oops! ${userWord} is not a correct word`);
    }
    else {
        alert(`Congrats! ${userWord.toUpperCase()} is correct!`);
        initGame();
    }
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", CheckWord);