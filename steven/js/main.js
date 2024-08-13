async function fetchVideos() {
    try {
        const response = await fetch('video.json');
        if (!response.ok) throw new Error('Network response was not ok');

        const videos = await response.json();
        const buttonList = document.getElementById('buttonList');
        const videoPlayer = document.getElementById('videoPlayer');
        const videoElement = document.getElementById('videoElement');
        const backButton = document.getElementById('backButton');
        const episodeText = document.querySelector('.txtep'); // Select the [EPISODES] text
        const backwardBtn = document.getElementById('backwardBtn');
        const forwardBtn = document.getElementById('forwardBtn');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const audioToggleBtn = document.getElementById('audioToggleBtn');

        // Create buttons for each video
        videos.forEach(video => {
            const button = document.createElement('button');
            button.innerText = video.display; // Set button text to display value
            button.addEventListener('click', () => {
                videoElement.src = `video/${video.src}`;
                buttonList.style.display = 'none'; // Hide button list
                videoPlayer.style.display = 'block'; // Show video player
                episodeText.style.display = 'none'; // Hide [EPISODES] text
                adjustVideoSize(); // Adjust video size
                videoElement.play(); // Auto play video
            });
            buttonList.appendChild(button);
        });

        const adjustVideoSize = () => {
            const { innerWidth, innerHeight } = window; // Get window dimensions
            videoElement.style.width = `${innerWidth}px`; // Set video width to window width
            videoElement.style.height = `${innerHeight}px`; // Set video height to window height
        };
        backwardBtn.addEventListener('click', () => {
            videoElement.currentTime -= 10; // Go back 10 seconds
        });
        
        forwardBtn.addEventListener('click', () => {
            videoElement.currentTime += 10; // Go forward 10 seconds
        });
        
        playPauseBtn.addEventListener('click', () => {
            if (videoElement.paused) {
                videoElement.play();
                playPauseBtn.textContent = 'Pause';
            } else {
                videoElement.pause();
                playPauseBtn.textContent = 'Play';
            }
        });

        audioToggleBtn.addEventListener('click', () => {
            videoElement.muted = !videoElement.muted;
            audioToggleBtn.textContent = videoElement.muted ? 'Unmute' : 'Mute';
        });
        

        // Set initial video size
        adjustVideoSize();

        // Handle window resizing
        window.addEventListener('resize', adjustVideoSize);

        // Handle the back button to return to the episode list
        backButton.addEventListener('click', () => {
            videoPlayer.style.display = 'none'; // Hide video player
            buttonList.style.display = 'block'; // Show button list
            videoElement.pause(); // Pause video when going back
            episodeText.style.display = 'block'; // Show [EPISODES] text again
            videoElement.src = ''; // Clear video source
        });

    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}

// Call the function on page load
window.onload = fetchVideos;
