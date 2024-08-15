document.addEventListener('DOMContentLoaded', function () {
    const yearLinks = document.querySelectorAll('nav ul li a');
    const gallerySections = document.querySelectorAll('.gallery-section');
    const mediaTypeSelect = document.getElementById('mediaType');
    const categorySelect = document.getElementById('category');

    function filterGallery() {
        // Get the selected year, default to '2022' if no year is selected
        const selectedYear = document.querySelector('nav ul li a.active')?.dataset.year || '2022';
        const selectedMediaType = mediaTypeSelect.value;
        const selectedCategory = categorySelect.value;

        // Hide all gallery sections
        gallerySections.forEach(section => {
            section.style.display = 'none';
        });

        // Show the active gallery section based on the selected year
        const activeGallery = document.getElementById(`gallery${selectedYear}`);
        if (activeGallery) {
            activeGallery.style.display = 'flex';
        }

        // Filter items within the active gallery section
        const items = activeGallery?.querySelectorAll('.gallery-item') || [];
        items.forEach(item => {
            const matchesMedia = selectedMediaType === 'all' || item.dataset.media === selectedMediaType;
            const matchesCategory = selectedCategory === 'all' || item.dataset.category === selectedCategory;
            item.style.display = matchesMedia && matchesCategory ? 'block' : 'none';
        });
    }

    // Add click event listeners to year links
    yearLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            yearLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            filterGallery();
        });
    });

    // Add change event listeners to dropdowns
    mediaTypeSelect.addEventListener('change', filterGallery);
    categorySelect.addEventListener('change', filterGallery);

    // Initialize the gallery
    filterGallery();

    // Add zoom effect to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function () {
            // Remove zoom from any currently zoomed item
            const currentlyZoomed = document.querySelector('.gallery-item.zoomed');
            if (currentlyZoomed && currentlyZoomed !== this) {
                currentlyZoomed.classList.remove('zoomed');
            }

            // Toggle zoom effect on the clicked item
            this.classList.toggle('zoomed');
        });
    });
});
