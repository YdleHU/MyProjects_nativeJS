const uploadBox = document.querySelector(".upload-box");
fileInput = uploadBox.querySelector("input"),
    previewImg = uploadBox.querySelector("img"),
    widthInput = document.querySelector(".width input"),
    heightInput = document.querySelector(".height input"),
    ratioInput = document.querySelector(".ratio input"),
    qualityInput = document.querySelector(".quality input"),
    downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;


const loadFile = (e) => {
    const file = e.target.files[0]; //kiválasztott file
    if (!file) { //Ha nincs kiválasztva semmi, akkor csak térjen vissza.
        return;
    }
    previewImg.src = URL.createObjectURL(file); //ObjectURL a kiválasztott preview.src alapján létrehozás
    previewImg.addEventListener("load", () => { //töltse be a képet
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight; //A megadott ImageRatio alapján
        document.querySelector(".wrapper").classList.add("active"); //active class hozzárendelése, ez alapján a kép 100%-os elhelyezése a keretben.
    });
}


widthInput.addEventListener("keyup", () => {
    //A Height according megkapva, ha a checkbox ratio kipipálva van
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});


const ResizeAndDownload = () => {
    const canvas = document.createElement("canvas"); //canvas tag létrehozása
    const a = document.createElement("a"); //<a> </a>  tag létrehozása
    const ctx = canvas.getContext("2d");
    const imgQuality = qualityInput.checked ? 0.7 : 1.0; // 1.0 esetében 100% ,  0.7 esetében 70% lesz a kép minősége. (0.1 - 1.0 -ig)

    canvas.width = widthInput.value; //a kép szélessége legyen megegyező azzal, amit a width mezőbe írok
    canvas.height = heightInput.value;  //a kép magassága legyen megegyező azzal, amit a height mezőbe írok

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height); //Kép létrehozása, a megadott paraméterek alapján.
    a.href = canvas.toDataURL("image/jpeg", imgQuality);  //Létrehozott kép elmentése, megadott file formátum, és a megadott kép minőség szerint.
    a.download = new Date().getTime(); //letöltési dátum hozzárendelése
    a.click(); // <a></a> tag, file letöltése
}


heightInput.addEventListener("keyup", () => {
    //Ha a checkbox ratio ki van pipálva és amit írok a width mezőbe, akkor a height mező mindig: 'Ratio osztva érték' legyen.
    const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});


downloadBtn.addEventListener("click", ResizeAndDownload);
fileInput.addEventListener("change", loadFile); //Ebben az esetben ha kiválasztottunk egy képet a tallózóból, akkor rögtön töltse is be
uploadBox.addEventListener("click", () => fileInput.click()); //Kattintás pillanatában jelenjen meg a tallózás