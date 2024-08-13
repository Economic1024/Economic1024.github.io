async function fetchVideos() {
  // Fetch the videos.json file
  try {
      const response = await fetch('video.json');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const videos = await response.json();
      const videoList = document.getElementById('videoList');
      
      videos.forEach(video => {
          const videoItem = document.createElement('div');
          videoItem.className = 'video-item';
          videoItem.innerHTML = `
              <h3>${video.title}</h3>
              <video width="320" controls>
                  <source src="video/${video.src}" type="video/mp4"> <!-- Ensure this path is correct -->
                  Your browser does not support the video tag.
              </video>
          `;
          videoList.appendChild(videoItem);
      });
  } catch (error) {
      console.error('Error fetching videos:', error);
  }
}

// Call the function on page load
window.onload = fetchVideos;
