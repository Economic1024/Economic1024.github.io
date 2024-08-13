async function fetchVideos() {
  const response = await fetch('videos.json'); // Ensure this file is in the root
  const videos = await response.json();
  const videoList = document.getElementById('videoList');
  
  videos.forEach(video => {
      const videoItem = document.createElement('div');
      videoItem.className = 'video-item';
      videoItem.innerHTML = `
          <h3>${video.title}</h3>
          <video width="500" height="500" controls>
              <source src="video/${video.src}" type="video/mp4"> <!-- Correct video path -->
              Your browser does not support the video tag.
          </video>
      `;
      videoList.appendChild(videoItem);
  });
}

window.onload = fetchVideos;
