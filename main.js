document.addEventListener('DOMContentLoaded', function() {
    // ----- COMMENT SECTION TOGGLE -----
    const commentToggle = document.querySelector('.show-hide-comments');
    const commentSection = document.querySelector('.comment-section');
    
    if (commentToggle && commentSection) {
        commentToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            commentSection.hidden = isExpanded;
            this.textContent = isExpanded ? 'Show Comments' : 'Hide Comments';
        });

        // Make toggle keyboard accessible
        commentToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

  
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('comment-name').value.trim();
            const comment = document.getElementById('comment-text').value.trim();
            
            if (name && comment) {
                const commentList = document.querySelector('.comment-list');
                const newComment = document.createElement('li');
                newComment.innerHTML = `
                    <p class="comment-author">${name}</p>
                    <p class="comment-text">${comment}</p>
                `;
                commentList.appendChild(newComment);
                
                // Reset form
                this.reset();
                
                // Set focus back to name field
                document.getElementById('comment-name').focus();
            }
        });
    }

    // Add captions to images programmatically
    const images = document.querySelectorAll('article img');
    images.forEach(img => {
        const altText = img.getAttribute('alt');
        if (altText) {
            const caption = document.createElement('p');
            caption.className = 'image-caption';
            caption.textContent = altText;
            img.insertAdjacentElement('afterend', caption);
        }
    });


    // External link indicators
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            link.innerHTML += ' <span aria-hidden="true">↗</span>';
            link.setAttribute('aria-label', `${link.textContent} (opens in new tab)`);
        }
    });

    // Track keyboard navigation for focus styles
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('using-keyboard');
        }
    });

    document.addEventListener('mousedown', function() {
        document.documentElement.classList.remove('using-keyboard');
    });
});

// Audio player fallback for older browsers
function initAudioFallback() {
    const audio = document.querySelector('audio');
    if (audio && !audio.canPlayType) {
        const fallback = document.createElement('div');
        fallback.className = 'audio-fallback';
        fallback.innerHTML = `
            <p>Audio player not supported. Download the audio:</p>
            <ul>
                <li><a href="bear.mp3">MP3 format</a></li>
                <li><a href="bear.ogg">OGG format</a></li>
            </ul>
        `;
        audio.parentNode.replaceChild(fallback, audio);
    }
}

// Initialize when DOM is ready
if (document.readyState !== 'loading') {
    initAudioFallback();
} else {
    document.addEventListener('DOMContentLoaded', initAudioFallback);


// This ensures images load properly and provides fallbacks
document.addEventListener('DOMContentLoaded', function() {
  // Check if images loaded
  document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
      this.alt = 'Image failed to load: ' + this.alt;
      this.style.border = '2px dashed #ccc';
    };
  });
  
  // Audio player fallback
  const audio = document.querySelector('audio');
  if (audio && !audio.canPlayType) {
    audio.insertAdjacentHTML('afterend', 
      '<div class="audio-fallback"><p>Audio not supported. <a href="bear.mp3">Download audio file</a></p></div>');
  }
});

            // Get references to the show/hide comments button and the comments section.
        const showHideCommentsButton = document.getElementById("show-hide-comments");
        const commentsSection = document.getElementById("comments");

        // Check if the elements exist before adding the event listener.
        if (showHideCommentsButton && commentsSection) {
            // Add an event listener to the button.
            showHideCommentsButton.addEventListener("click", function() {
                // Toggle the display of the comments section.
                if (commentsSection.style.display === "none") {
                    commentsSection.style.display = "block";
                    showHideCommentsButton.textContent = "Hide comments";
                } else {
                    commentsSection.style.display = "none";
                    showHideCommentsButton.textContent = "Show comments";
                }
            });

            // Add keyboard accessibility to the button.
            showHideCommentsButton.addEventListener("keydown", function(event) {
                // Check if the Enter key was pressed.
                if (event.key === "Enter") {
                    // Trigger the click event.
                    showHideCommentsButton.click();
                }
            });
        }
