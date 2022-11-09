const urlField = document.querySelector(".field input"),
    previewArea = document.querySelector(".preview-area"),
    imgTag = previewArea.querySelector(".thumbnail"),
    hiddenInput = previewArea.querySelector(".hidden-input");


urlField.onkeyup = () => {
    let imgUrl = urlField.value; //a mezőbe beírt url megkapása
    previewArea.classList.add("active"); //.active css class hozzáadás

    if (imgUrl.indexOf("https://www.youtube.com/watch?v=") != -1) { //Ha egy youtube video url bevan rakva
        let vidId = imgUrl.split("v=")[1].substring(0, 11); //Szétválasztás(splittelés) az url -t a  v= -tól, így csak a videó id(azonosító)-ját kapjuk meg.
        let ytThumbUrl = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`; //Ez a youtube thumbnail url
        imgTag.src = ytThumbUrl;

    } else if (imgUrl.indexOf("https://youtu.be/") != -1) { //Ha egy videólink így néz ki, akkor: 
        let vidId = imgUrl.split("be/")[1].substring(0, 11); //Szétválasztás(splittelés) az url -t a  be/ -tól
        let ytThumbUrl = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`; //Ez a youtube thumbnail url
        imgTag.src = ytThumbUrl;

    } else if (imgUrl.match(/\.(jpe?g|png|gif|bmp|webp)$/i)) { //Ha a megadott érték más képfájl
        imgTag.src = imgUrl;

    } else {
        imgTag.src = "";
        previewArea.classList.remove("active");
    }

    hiddenInput.value = imgTag.src;
}

