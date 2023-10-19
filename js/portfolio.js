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


 // now that we've got the next slide button working, 
    // best to create a function so we can use it for multiple things.

    const moveToSlide = function(track, currentSlide, targetSlide){
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; //need to add style.left in directly.
                                                                                // Because we using this for both prev and next slides, chage name to targetSlide.
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    } //Back to line nextButton


    const updateDots = function(currentDot, targetDot){
        currentDot.classList.remove('current-slide')
        targetDot.classList.add('current-slide')
    }               // created a new variable to contain the change in dots so that we can 
                    // apply it to all the js functions that move the slides



// click left, move                 //copied function from click right
prevButton.addEventListener('click', function(){
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;  
    
    const currentDot = dotsNav.querySelector('.current-slide')
    const prevDot = currentDot.previousElementSibling

    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot)
})


// click right, move
nextButton.addEventListener('click', function(e) {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;  // move to next slide
    const amountToMove = nextSlide.style.left; //how far the element must move
    
    const currentDot = dotsNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling

    // track.style.transform = 'translateX(-' + amountToMove + ')';
    // currentSlide.classList.remove('current-slide')
    // nextSlide.classList.add('current-slide')
    moveToSlide(track, currentSlide, nextSlide)
    updateDots(currentDot, nextDot) // update dots applied here


})

                // see line 30


// click nav dots change to relevant slide
dotsNav.addEventListener('click', function(e){    //what indicator has been clicked
    const targetDot = e.target.closest('button');

    if(targetDot && targetDot.classList.contains('carousel_indicator')){
        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(function(dot){return dot === targetDot});
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot)


    }})




