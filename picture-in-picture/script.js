const videoElement = document.getElementById('video');
const button = document.getElementById('button')

// Prompt to select media stream, pass to video elem,ent, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch (error) {
        console.log('Oops! Error Here')
    }
};

button.addEventListener('click', async () => {
    // Disable the Button
    button.disabled = true;
    // Start Picture In Picture 
    await videoElement.requestPictureInPicture();
    // Reset the Button
    button.disabled = false;
});

// On Load
selectMediaStream();