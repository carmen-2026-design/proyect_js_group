const video = document.getElementById("videoFondo");

video.addEventListener("loadedmetadata", () => {
  video.currentTime = 6;
});