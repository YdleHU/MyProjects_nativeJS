const wrapper = document.querySelector(".wrapper"),
    generateBtn = wrapper.querySelector(".form button"),
    qrInput = wrapper.querySelector(".form input"),
    qrImg = wrapper.querySelector(".qr-code img");


generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;

    if (!qrValue) return; //ha az input üres, akkor térjen vissza
    generateBtn.innerText = "QR Code Generálás..."; //Text-ként
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`; //api segítségével qr code létrehozása, api visszatérés img src -> qrImage
    qrImg.addEventListener("load", () => { //QR Code img betöltése
        wrapper.classList.add("active"); //.active css class hozzáadása, a kép megjelenítéséhez
        generateBtn.innerText = "Generate QR Code"; //betöltés után, újra a Generate QR Code szöveg legyen megjelenítve
    });
});


qrInput.addEventListener("keyup", () => { //Ha kitörlöm a szöveget az input -ból, akkor újra legyen alapértelmezett (ne mutassa az előző QR code-ot)
    if (!qrInput.value) {
        wrapper.classList.remove("active");
    }
});