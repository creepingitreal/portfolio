const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
// const slideWidth = slideSize.width;



// arrange slides next to each other - currently on top of each other

// slides[0].style.left = * 0 + 'px';
// slides[1].style.left = slideWidth + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (function(slide, index) {
    slide.style.left = slideWidth * index +'px'
});

// slides.forEach(function (slide, index) {
//     slide.style.left = slideWidth * index + 'px';
// })   ---> added this into a function stored in a variable above.

slides.forEach(setSlidePosition) //used variable function here


// click left, move




// click right, move
nextButton.addEventListener('click', function(e) {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;  // move to next slide
    const amountToMove = nextSlide.style.left; //how far the element must move

    // console.log(currentSlide) ;
    track.style.transform = 'translateX(" + amountToMove + ")';
})
// click nav dots change to relevant slide

