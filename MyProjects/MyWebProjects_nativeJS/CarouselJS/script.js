const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");


let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const ShowHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block"; //ne menjen minusz értékbe az görgetésnél a carousel img, mert elcsúszhat, ezért legyen none
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block"; //ne menjen plusz értékbe
}


arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; //first img szélesség ÉS 14 margin érték(value) hozzáadása
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => ShowHideIcons(), 60); //60 ms után jelenjen meg egyből az icon, ha eltünne a Scrollolás végett
    });
});


//automatikusan mozgó slider (mindig +14 value-ként)
const AutoSlide = () => {
    if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return; //Ha már nincs kész, akkor menjen visszafele (return)

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;


    if (positionDiff > firstImgWidth / 3) {
        carousel.scrollLeft += valDifference; //menjen addig, amíg nincs a legvégén
    } else {
        carousel.scrollLeft -= positionDiff; //ha már a legvégére ért, akkor visszafele menjen
    }
}


//Global variables value,  mousedown eventkor
const DragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}


//scroll images, Balra a Mouse pointer szerint.
const Dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("Dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    ShowHideIcons();
}


const DragStop = (e) => {
    isDragStart = false;
    carousel.classList.remove("Dragging");

    if (!isDragging) return;
    isDragging = false;
    AutoSlide();
}



carousel.addEventListener("mousedown", DragStart);
carousel.addEventListener("touchstart", DragStart);

carousel.addEventListener("mousemove", Dragging);
carousel.addEventListener("touchmove", Dragging);

carousel.addEventListener("mouseup", DragStop);
carousel.addEventListener("mouseleave", DragStop);
carousel.addEventListener("touchend", DragStop);