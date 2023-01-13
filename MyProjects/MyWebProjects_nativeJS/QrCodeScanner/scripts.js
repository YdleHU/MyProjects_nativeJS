const wrapper = document.querySelector(".wrapper"),
    form = wrapper.querySelector("form"),
    fileInp = form.querySelector("input"),
    infoText = form.querySelector("p"),
    closeBtn = wrapper.querySelector(".close"),
    copyBtn = wrapper.querySelector(".copy");



function fetchRequest(formData, file) {
    infoText.innerText = "Scanning QR Code..."; //A Betöltési idő alatt ezt a szöveget írja ki
    fetch("https://api.qrserver.com/v1/read-qr-code/", { //lekérjük a QR Code Scan API-t
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        if (!result) return; //Ha hibás a "végeredmény", akkor térjen vissza.
        wrapper.querySelector("textarea").innerText = result; //A megkapott "végeredményt" alakítsa át szöveggé a textarea -ban.
        form.querySelector("img").src = URL.createObjectURL(file);
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't Scan QR Code"; //Ha sikerült akkor az Upload-os szöveget írja ki, különben a Nem sikerültet.
        wrapper.classList.add("active"); //Ha betöltött, akkor .active class hozzáadása (animáció,details megjelenítése stb)
    }).catch(() => {
        infoText.innerText = "Couldn't Scan QR Code";
    });
}


fileInp.addEventListener("change", e => { //akkor aktiválódik, ha az elem értéke módosul
    let file = e.target.files[0]; //Tallózás
    if (!file) return; //Ha hibás, tallózásnál a file, akkor térjen vissza.
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(formData, file);
})


copyBtn.addEventListener("click", () => { //A textarea-ban található összes szöveg legyen kimásolva.
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});


form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));