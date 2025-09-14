

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.group');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    function showLightbox(index) {
        const item = galleryItems[index].querySelector('img');
        lightboxImg.src = item.src;
        lightboxCaption.textContent = galleryItems[index].dataset.description || item.alt;
        lightbox.classList.remove('hidden');
        currentIndex = index;
    }

    // Add click event listeners to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => showLightbox(index));
    });

    // Lightbox control event listeners
    closeBtn.addEventListener('click', () => lightbox.classList.add('hidden'));
    prevBtn.addEventListener('click', () => showLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length));
    nextBtn.addEventListener('click', () => showLightbox((currentIndex + 1) % galleryItems.length));
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => { 
        if (e.target === lightbox) lightbox.classList.add('hidden'); 
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") lightbox.classList.add('hidden');
        if (e.key === "ArrowLeft") showLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length);
        if (e.key === "ArrowRight") showLightbox((currentIndex + 1) % galleryItems.length);
    });
});