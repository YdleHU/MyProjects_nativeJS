const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#size-slider"),
    ColorsBtns = document.querySelectorAll(".colors .option"),
    ColorPicker = document.querySelector("#color-picker"),
    ClearCanvas = document.querySelector(".clear-canvas"),
    SaveImg = document.querySelector(".save-img"),
    ctx = canvas.getContext("2d");


//Globális változók alapértékkel
let prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5,
    selectedColor = "#000";


const SetCanvasBackground = () => { //kép letöltésnél a háttér fehér színü legyen.
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    SetCanvasBackground();
});


const DrawRect = (e) => { //négyszög rajzolása
    if (!fillColor.checked) { //Ha a fill bepipálva, akkor:
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY); //négyszög rajzolásnál legyen kitöltve.
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY); //csak a border-je legyen rajzolva, és ne legyen kitöltve.
}


const DrawCircle = (e) => { //kör rajzolása
    ctx.beginPath(); //új útvonal a circle rajzolásához (innen skálázódik)
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2)); //circle radius-a, mouse pointerrel
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);

    if (fillColor.checked) { //Ha Fill color be van pipálva, akkor:
        ctx.fill(); //A circle-t kitölti.
    } else {
        ctx.stroke(); //Csak a circle border -jét rajzolja.
    }
}


const DrawTriangle = (e) => {
    ctx.beginPath(); //új útvonal a circle rajzolásához (innen skálázódik)
    ctx.moveTo(prevMouseX, prevMouseY); //triangle mozgatása a mouse pointerhez.
    ctx.lineTo(e.offsetX, e.offsetY); //első vonal létrehozása a mouse pointertől
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); //triangle bottom line készítése
    ctx.closePath(); //bezárja az utat automatikusan a triangle-hez, ezzel készíti a harmadik utat, és létrehozza a háromszöget.

    if (fillColor.checked) { //Ha Fill color be van pipálva, akkor:
        ctx.fill(); //A triangle-t kitölti.
    } else {
        ctx.stroke(); //Csak a triangle border -jét rajzolja.
    }
}


const StartDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; //A MouseX pozíció megegyezzen a MouseX értékkel (position = value)
    prevMouseY = e.offsetY; //A MouseY pozíció megegyezzen a MouseY értékkel (position = value)
    ctx.beginPath(); //új vonal létrehozása.  (azért szükséges, mert enélkül az előzőtől fogja folytatni, távolságtól függetlenül)
    ctx.lineWidth = brushWidth; //nagyobb vonalméret (5)
    ctx.strokeStyle = selectedColor; //kiválasztott színnel(border) rajzolás.
    ctx.fillStyle = selectedColor; //kiválasztott színnel alakzat kitöltés.
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height); //"canvas data" ,ez kihagyja a kanyarodást/vonszolást a képen, ha alakzat módban rajzolunk.
}


const Drawing = (e) => {
    if (!isDrawing) return; //Ha false az isDrawing, akkor térjen ide vissza
    ctx.putImageData(snapshot, 0, 0);//másolt "canvas data" hozzáadása ide

    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); //Új vonal létrehozása.   ctx.lineTo(x-koordináta, y-koordináta)
        ctx.stroke(); //rajzolás/kitöltés új színnel. 
    } else if (selectedTool === "rectangle") {
        DrawRect(e);
    } else if (selectedTool === "circle") {
        DrawCircle(e);
    } else {
        DrawTriangle(e);
    }

}


toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { //Az összes tool -hoz (ezért kellett a forEach ciklus),  click esemény hozzáadása.
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    })
});


sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); //brush mérete. alapértelmezett értéke: 5.  (1-30)


ColorsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color"); //btn background color = selectedColor értékével(value)
    });
});


ColorPicker.addEventListener("change", () => {
    ColorPicker.parentElement.style.background = ColorPicker.value; //színválasztóból kiválasztott színnel, rajzoljon. (parentElement)
    ColorPicker.parentElement.click();
});


ClearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear image
    SetCanvasBackground();
});


SaveImg.addEventListener("click", () => {
    const link = document.createElement("a"); //creating <a> tag
    link.download = `${Date.now()}.jpg`; //mai dátummal, jpg formátummal
    link.href = canvas.toDataURL(); //canvasdata:  " <a href="link"></a> "
    link.click(); //kattintással kép letöltése.
});


canvas.addEventListener("mousedown", StartDraw);
canvas.addEventListener("mousemove", Drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);

