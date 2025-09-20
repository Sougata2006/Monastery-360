document.addEventListener('DOMContentLoaded', function () {
    // -----------------------------
    // Lightbox Functionality
    // -----------------------------
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

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => showLightbox(index));
    });

    closeBtn.addEventListener('click', () => lightbox.classList.add('hidden'));
    prevBtn.addEventListener('click', () => showLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length));
    nextBtn.addEventListener('click', () => showLightbox((currentIndex + 1) % galleryItems.length));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.add('hidden');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") lightbox.classList.add('hidden');
        if (e.key === "ArrowLeft") showLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length);
        if (e.key === "ArrowRight") showLightbox((currentIndex + 1) % galleryItems.length);
    });

    // -----------------------------
    // Enhanced Gallery Functionality
    // -----------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItemsFilter = document.querySelectorAll('.gallery-item');
    const searchInput = document.getElementById('gallery-search');

    // View More / View Less setup
    let visibleLimit = 8;   // default visible items
    let expanded = false;   // track expand state
    const viewMoreBtn = document.getElementById('landscapeViewMore');
    const viewLessBtn = document.getElementById('landscapeViewLess');

    viewMoreBtn.addEventListener('click', () => {
        expanded = true;
        viewMoreBtn.classList.add('hidden');
        viewLessBtn.classList.remove('hidden');
        filterGallery(getCurrentFilter(), searchInput.value.toLowerCase());
    });

    viewLessBtn.addEventListener('click', () => {
        expanded = false;
        viewLessBtn.classList.add('hidden');
        viewMoreBtn.classList.remove('hidden');
        filterGallery(getCurrentFilter(), searchInput.value.toLowerCase());
        window.scrollTo({ top: document.getElementById('gallery-grid').offsetTop, behavior: 'smooth' });
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            document.getElementById('current-filter').textContent = this.textContent.trim();

            // reset collapsed when switching filter
            expanded = false;
            viewLessBtn.classList.add('hidden');
            viewMoreBtn.classList.remove('hidden');

            filterGallery(filter);
        });
    });

    // Search
    searchInput.addEventListener('input', function () {
        expanded = false; // reset collapsed when searching
        viewLessBtn.classList.add('hidden');
        viewMoreBtn.classList.remove('hidden');
        filterGallery(getCurrentFilter(), this.value.toLowerCase());
    });

    // Tags
    const tags = document.querySelectorAll('[data-tag]');
    tags.forEach(tag => {
        tag.addEventListener('click', function () {
            const tagValue = this.dataset.tag;
            searchInput.value = tagValue;
            expanded = false;
            viewLessBtn.classList.add('hidden');
            viewMoreBtn.classList.remove('hidden');
            filterGallery(getCurrentFilter(), tagValue);
        });
    });

    function getCurrentFilter() {
        return document.querySelector('.filter-btn.active').dataset.filter;
    }

    function filterGallery(category, searchTerm = '') {
        let matchedItems = [];

        galleryItemsFilter.forEach(item => {
            const itemCategory = item.dataset.category;
            const itemText = item.textContent.toLowerCase();

            const categoryMatch = category === 'all' || itemCategory === category;
            const searchMatch = searchTerm === '' || itemText.includes(searchTerm.toLowerCase());

            if (categoryMatch && searchMatch) {
                matchedItems.push(item);
            } else {
                item.classList.add('hidden');
            }
        });

        // Apply visible limit if not expanded
        matchedItems.forEach((item, index) => {
            if (!expanded && index >= visibleLimit) {
                item.classList.add('hidden');
            } else {
                item.classList.remove('hidden');
            }
        });

        // Update stats
        document.getElementById('results-count').textContent =
            expanded ? matchedItems.length : Math.min(matchedItems.length, visibleLimit);
        document.getElementById('total-count').textContent = galleryItemsFilter.length;

        // Show/hide buttons
        if (matchedItems.length <= visibleLimit) {
            viewMoreBtn.classList.add('hidden');
            viewLessBtn.classList.add('hidden');
        } else if (!expanded) {
            viewMoreBtn.classList.remove('hidden');
            viewLessBtn.classList.add('hidden');
        }
    }

    // -----------------------------
    // Sorting
    // -----------------------------
    document.getElementById('sort-select').addEventListener('change', function () {
        const sortBy = this.value;
        sortGallery(sortBy);
    });

    function sortGallery(sortBy) {
        const container = document.getElementById('gallery-grid');
        const items = Array.from(container.children);

        items.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
                case 'popular':
                    return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
                case 'oldest':
                    return new Date(a.dataset.date || '2020-01-01') - new Date(b.dataset.date || '2020-01-01');
                case 'newest':
                default:
                    return new Date(b.dataset.date || '2024-01-01') - new Date(a.dataset.date || '2024-01-01');
            }
        });

        items.forEach(item => container.appendChild(item));
    }

    // -----------------------------
    // Grid/List Toggle
    // -----------------------------
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');
    const galleryGrid = document.getElementById('gallery-grid');

    listView.addEventListener('click', function () {
        galleryGrid.classList.remove('grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-4');
        galleryGrid.classList.add('grid-cols-1');
        gridView.classList.remove('bg-amber-500', 'text-white');
        gridView.classList.add('text-gray-600', 'dark:text-slate-400', 'hover:bg-gray-100', 'dark:hover:bg-slate-700');
        this.classList.add('bg-amber-500', 'text-white');
        this.classList.remove('text-gray-600', 'dark:text-slate-400', 'hover:bg-gray-100', 'dark:hover:bg-slate-700');
    });

    gridView.addEventListener('click', function () {
        galleryGrid.classList.add('grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-4');
        galleryGrid.classList.remove('grid-cols-1');
        listView.classList.remove('bg-amber-500', 'text-white');
        listView.classList.add('text-gray-600', 'dark:text-slate-400', 'hover:bg-gray-100', 'dark:hover:bg-slate-700');
        this.classList.add('bg-amber-500', 'text-white');
        this.classList.remove('text-gray-600', 'dark:text-slate-400', 'hover:bg-gray-100', 'dark:hover:bg-slate-700');
    });

    // -----------------------------
    // Floating Buttons
    // -----------------------------
    document.getElementById('scroll-to-top').addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('random-photo').addEventListener('click', function () {
        const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
        if (visibleItems.length > 0) {
            const randomItem = visibleItems[Math.floor(Math.random() * visibleItems.length)];
            randomItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            randomItem.style.transform = 'scale(1.05)';
            randomItem.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.5)';
            setTimeout(() => {
                randomItem.style.transform = '';
                randomItem.style.boxShadow = '';
            }, 1000);
        }
    });
});
