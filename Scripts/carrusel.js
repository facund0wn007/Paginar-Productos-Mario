let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const carouselImages = document.querySelector('.carousel-images');

function moveSlide(direction) {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    slides[currentIndex].classList.add('active');
    const offset = -currentIndex * 100; // Calcula el desplazamiento
    carouselImages.style.transform = `translateX(${offset}%)`; // Mueve las imágenes
}