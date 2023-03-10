const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currenTime =document.getElementById("currenTime");
const totalTime =document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls")


let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;
const handlePlayClick=(e)=>{
    console.log(video)
    if(video.paused){

        video.play();
    }
    else{
        
        video.pause();
    }
    playBtn.innerText=video.paused?"Play":"Pause"
};



const handleMuteClick=(e)=>{
    if(video.muted){
        video.muted=false;
    }else{
        video.muted = true;
        
    }
    muteBtn.innerText = video.muted?"UnMute":"Mute";
    volumeRange.value = video.muted?0:volumeValue;
};

const handleVolumeChange=(event)=>{

    const {target:{value}}=event; //event.target.value
    
    if(video.muted){
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
}
const formatTime = (seconds)=>{
    return new Date(seconds*1000).toISOString().substring(11,19);
 
}

const handleLoadedMetadata = (e) =>{
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max=Math.floor(video.duration);
};

const handleTimeUpdate = (e) =>{
    currenTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
};

const handleFullscreen = () =>{
    const fullscreen = document.fullscreenElement;
    if(fullscreen){
        document.exitFullscreen();
        fullScreenBtn.innerText = "Enter Full Screen";
    }else{
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText="Exit Full Screen";
    }

};


const handleTimelineChange =(event) =>{

    const{
        target:{value},
    } =event;
    video.currentTime=value;
}

const hideControls=()=>{
    videoControls.classList.remove("showing");
}
const handleMouseMove = (event) =>{

if(controlsTimeout){
    clearTimeout(controlsTimeout);
    controlsTimeout=null;
}
if(controlsMovementTimeout){

    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout=null;
}
videoControls.classList.add("showing");
controlsMovementTimeout = setTimeout(hideControls,3000);
}

const handleMouseLeave = (event) =>{
    controlsTimeout = setTimeout(hideControls,3000)
}

const handletimeUpdate =(event) =>{


}

const handleEnded = (e) =>{
    const {id}=videoContainer.dataset;
    fetch(`/api/videos/${id}/view`, {
        method: "POST",
      });

}

playBtn.addEventListener("click",handlePlayClick);
muteBtn.addEventListener("click",handleMuteClick);
volumeRange.addEventListener("input",handleVolumeChange);
video.addEventListener("loadedmetadata",handleLoadedMetadata);
video.addEventListener("timeupdate",handleTimeUpdate);
video.addEventListener("timeupdate",handletimeUpdate);
timeline.addEventListener("input",handleTimelineChange);
fullScreenBtn.addEventListener("click",handleFullscreen);
videoContainer.addEventListener("mousemove",handleMouseMove);
videoContainer.addEventListener("mouseleave",handleMouseLeave);
video.addEventListener("ended",handleEnded);