const vids = document.querySelector(".vids");
mainVideo = vids.querySelector("video");
progressBar = vids.querySelector(".progress-bar"); //Videó csík-sáv haladása automatikusan
videoTimeLine = vids.querySelector(".video-timeline"); //Videó csík-sáv tekerés
playPauseBtn = vids.querySelector(".play-pause i"); //Videó indítás gomb

volumeBtn = vids.querySelector(".volume i"); //Hangerő gomb  - némítás/hang
volumeSlider = vids.querySelector(".left input"); //Hangerő szabályzógomb

skipBackward = vids.querySelector(".skip-backward i"); //Videó Hátratekerés gomb 
skipForward = vids.querySelector(".skip-forward i"); //Videó Előretekerés gomb 
currentVidTime = vids.querySelector(".current-time"); //Eltelt Idő mutatása
videoDuration = vids.querySelector(".video-duration"); //Időtartam

speedBtn = vids.querySelector(".playback-speed i"); //Beállítások -> Videó Gyorsítás gomb
speedOptions = vids.querySelector(".speed-options"); //Videó gyorsítás beállítások

picInPicBtn = vids.querySelector(".pic-in-pic i"); //Kép kiküldése új ablakban
fullScreenBtn = vids.querySelector(".fullscreen i"); //Teljesképernyő
let timer;


const HideControls = () => { // Videó hud eltüntetése, 2 sec után, ha az egér nem mozog
    if (mainVideo.paused) return;
    timer = setTimeout(() => {
        vids.classList.remove("show-controls");
    }, 2000);
}
HideControls();

vids.addEventListener("mousemove", () => { //Videó hud megjelenése, ha az egér mozog
    vids.classList.add("show-controls");
    clearTimeout(timer);
    HideControls();
});


const formatTime = time => {
    //definiálni(értéket adni) a másodperceket, perceket, órákat
    let seconds = Math.floor(time % 60),
        minutes = Math.floor(time / 60) % 60,
        hours = Math.floor(time / 3600);

    //Ha kisebb az érték mint 10, akkor 0-át hozzáadni!
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours == 0) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}

mainVideo.addEventListener("timeupdate", BackAndForward => {
    let { currentTime, duration } = BackAndForward.target; //kapott jelenlegi idő  ÉS  videó időtartalma
    let percent = (currentTime / duration) * 100; //kapott százalék
    progressBar.style.width = `${percent}%`; //százalékos haladás mutatása a progressbaron
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", BackAndForward => {
    videoDuration.innerText = formatTime(BackAndForward.target.duration); //Formázott szöveggel formatTime() - al az idő kiíratása
});

videoTimeLine.addEventListener("click", BackAndForward => {
    let timelineWidth = videoTimeLine.clientWidth;
    mainVideo.currentTime = (BackAndForward.offsetX / timelineWidth) * mainVideo.duration; //csík-sáv (timeline) beletekerés
});


const DraggableProgressBar = BackAndForward => { //A Videó Progress Bar-on a videó időtartalmának mutatása
    let timelineWidth = videoTimeLine.clientWidth;
    progressBar.style.width = `${BackAndForward.offsetX}px`;
    mainVideo.currentTime = (BackAndForward.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime); //Formázás formatTime()-al
}
//Egérgomb lenyomva tartva, beletekerés és idő mutatása
videoTimeLine.addEventListener("mousedown", () => {
    videoTimeLine.addEventListener("mousemove", DraggableProgressBar);
});
document.addEventListener("mouseup", () => {
    videoTimeLine.removeEventListener("mousemove", DraggableProgressBar);
});
videoTimeLine.addEventListener("mousemove", BackAndForward => {
    const progressTime = videoTimeLine.querySelector("span");
    let offsetX = BackAndForward.offsetX;
    progressTime.style.left = `${offsetX}px`;
    let timelineWidth = videoTimeLine.clientWidth;
    let percent = (BackAndForward.offsetX / timelineWidth) * mainVideo.duration;
    progressTime.innerText = formatTime(percent);
});


volumeBtn.addEventListener("click", () => {
    if (!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5; //Hangerőnek alapértelmezett értéke
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high"); //Ikon csere
    }
    else {
        mainVideo.volume = 0.0; //"némítás"
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark"); //Ikon csere
    }
    volumeSlider.value = mainVideo.volume; //Slider(csúszka) frissül, ha mute/unmute -olva van a hangerő
});


volumeSlider.addEventListener("input", BackAndForward => {
    mainVideo.volume = BackAndForward.target.value;
    if (BackAndForward.target.value == 0) { //Ha 0 értéknél van a slider(csúszka), akkor ikoncsere és némítás
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    } else {
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    }
});


speedBtn.addEventListener("click", () => {
    speedOptions.classList.toggle("show"); //Videó Gyorsítás menü megjelenítése
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed; //data felülírása, a videó új sebességével
        speedOptions.querySelector(".active").classList.remove("active"); //Bootstrap class eltörlése
        option.classList.add("active"); //Bootstrap class hozzáadva.(Így mindig az utolsó li elem kapja meg a bootstrap class-t)
    });
});

document.addEventListener("click", BackAndForward => {
    if (BackAndForward.target.tagName !== "I" || BackAndForward.target.className !== "fa-solid fa-gear") {
        speedOptions.classList.remove("show"); //Videó Gyorsítás menü elrejtése
    }
});

picInPicBtn.addEventListener("click", () => {
    mainVideo.requestPictureInPicture(); //Videómód megváltoztatása(Képernyő kiküldése külön ablakban)
});

fullScreenBtn.addEventListener("click", () => {
    vids.classList.toggle("fullscreen");
    if (document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    vids.requestFullscreen(); //Teljesképernyő mód
});

//---------- Visszatekerés  ,  Indítás/Stop  ,  Előretekerés ----------//
skipBackward.addEventListener("click", () => {
    mainVideo.currentTime -= 5; //Videó hátratekerése
});

skipForward.addEventListener("click", () => {
    mainVideo.currentTime += 5; //Videó előretekerése
});

//Indítás/Stop
playPauseBtn.addEventListener("click", () => {
    if (mainVideo.paused) {
        mainVideo.play(); //Videó indítása

    }
    else {
        mainVideo.pause(); //Videó leállítása
    }
});

mainVideo.addEventListener("play", () => {
    playPauseBtn.classList.replace("fa-play", "fa-pause"); //Ikon kicserélése
});
mainVideo.addEventListener("pause", () => {
    playPauseBtn.classList.replace("fa-pause", "fa-play"); //Ikon kicserélése
});