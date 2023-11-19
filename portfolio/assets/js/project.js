// projects top mockup lightbox enable and disable
const lightboxTrigger = document.querySelector('.portfolio-lightbox-trigger');
const lightboxContainer = document.querySelector('.lightbox-container');
const lightboxImage = document.querySelector('.lightbox-image');
const closeLightbox = document.querySelector('.close-lightbox');
const lightboxOverlay = document.querySelector('.lightbox-overlay');

lightboxTrigger.addEventListener('click', function (event) {
event.preventDefault();
const imageSource = this.getAttribute('data-image');
lightboxImage.src = imageSource;
lightboxContainer.style.display = 'flex';
});

closeLightbox.addEventListener('click', closeLightboxAndOverlay);
lightboxOverlay.addEventListener('click', closeLightboxAndOverlay);

function closeLightboxAndOverlay() {
lightboxContainer.style.display = 'none';
}

