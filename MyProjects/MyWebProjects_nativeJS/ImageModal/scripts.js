const gallery = document.querySelectorAll(".gallery .image"),
    previewBox = document.querySelector(".preview-box"),
    previewImg = previewBox.querySelector("img"),
    closeIcon = document.querySelector(".fa-square-xmark"),
    currentImg = document.querySelector(".current-img"),
    totalImg = document.querySelector(".total-img"),
    shadow = document.querySelector(".shadow");


window.onload = () => {
    for (let i = 0; i < gallery.length; i++) { //Az összes képen végigmegyünk, hogy mindegyik képen müködjön a script.
        totalImg.textContent = gallery.length;
        let newIndex = i;
        let clickImgIndex;

        //Kattintás pillanatában, megjelenik a nagyobb ablak(Modal)
        gallery[i].onclick = () => {
            clickImgIndex = newIndex;

            function Preview() {
                currentImg.textContent = newIndex + 1;
                let selectedImgUrl = gallery[newIndex].querySelector("img").src;
                previewImg.src = selectedImgUrl;
            }
            Preview();
            previewBox.classList.add("show"); //Kép megnyitása nagyban.
            shadow.style.display = "block"; // Ha a Kép megvan nyitva nagyban, akkor a háttér kapjon sötétítést.



            //Vissza és előre gombok | Kattintásra menjen az előző/következő képre.
            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");
            if (newIndex == 0) {
                prevBtn.style.display = "none";
            }
            if (newIndex >= gallery.length - 1) {
                nextBtn.style.display = "none";
            }

            prevBtn.onclick = () => { //newIndexValue csökkentés, így visszalép az előző képekre.
                newIndex--;
                if (newIndex == 0) { //Ha 0 a value, akkor tünjön el a visszagomb.(Mert különben menne az érték minuszba is)
                    Preview();
                    prevBtn.style.display = "none";
                } else {
                    Preview();
                    nextBtn.style.display = "block";
                }
            }

            nextBtn.onclick = () => { //newIndexValue növelése, így a következő képekre megy.
                newIndex++;
                if (newIndex >= gallery.length - 1) { //None, ha értéken kívülre esik, egyébként pedig block(látszódó elem)
                    Preview();
                    nextBtn.style.display = "none";
                } else {
                    Preview();
                    prevBtn.style.display = "block";
                }
            }



            closeIcon.onclick = () => {
                newIndex = clickImgIndex;
                prevBtn.style.display = "block"; //Visszagomb bezárása után is block elem lesz, none helyett.
                nextBtn.style.display = "block"; //Előregomb bezárása után is block elem lesz, none helyett.
                previewBox.classList.remove("show"); //Az  X  ikonra kattintva, záródjon be a nagyobb ablak(Modal)
                shadow.style.display = "none"; //háttérsötétítés leszedése.
            }
        }
    }
}