document.addEventListener('DOMContentLoaded', function() {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');
  
  // Initialize as hidden
  commentWrapper.hidden = true;
  showHideBtn.setAttribute('aria-expanded', 'false');

  // Toggle visibility
  showHideBtn.addEventListener('click', function() {
    const isHidden = commentWrapper.hidden;
    commentWrapper.hidden = !isHidden;
    this.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    this.textContent = isHidden ? 'Hide comments' : 'Show comments';
  });

  // Comment form submission
  const commentForm = document.querySelector('.comment-form');
  commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
    const commentContainer = document.querySelector('.comment-container');
    
    if (nameInput.value.trim() && commentInput.value.trim()) {
      const newComment = document.createElement('li');
      newComment.innerHTML = `
        <p><strong>${nameInput.value}</strong></p>
        <p>${commentInput.value}</p>
      `;
      commentContainer.appendChild(newComment);

      nameInput.value = '';
      commentInput.value = '';

      nameInput.focus();
    }
  });
});
