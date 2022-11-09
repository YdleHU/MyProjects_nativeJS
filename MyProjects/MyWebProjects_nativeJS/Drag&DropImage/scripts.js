const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");

let file; //global variable



//Ha kattintunk a gombra, akkor jelenjen meg a tallózó
button.onclick = () => {
    input.click();
}


input.addEventListener("change", function () {
    file = this.files[0];
    dropArea.classList.add("active");
    ShowFile();
});


//Ha a csíkozott keretbe viszem a képet, akkor legyen kitöltött keret
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});


//Ha a képet elviszem a keretből, akkor legyen újra csíkozott
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});


//Ha a képet a kereten belül engedem el, akkor jelenjen meg a file tallózó
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    ShowFile();
});


function ShowFile() {
    let fileType = file.type;
    //console.log(fileType);

    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //ezeket a formátumokat fogja "látni"
    if (validExtensions.includes(fileType)) { //Ha jó a file formátum, akkor kép beolvasása és megjelenítése
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="">`;
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("Nem támogatott formátum!"); //Egyébként, írja ki, hogy: "Nem támogatott"
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}