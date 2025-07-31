/ Update footer with current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = document.lastModified;

// Optional: Intersection Observer for more control over lazy loading
// This is in addition to the native lazy loading
const images = document.querySelectorAll('img[loading="lazy"]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});