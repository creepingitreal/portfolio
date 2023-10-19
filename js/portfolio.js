const track = document.querySelector('.carousel_track');
let slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
// const slideWidth = slideSize.width;

// adding .json here (19/11/23)

fetch('/data.json').then(function(response) {
    return response.json()
}).then(function(portfolioData){
    const displayTarget = track

    let output = ''

    portfolioData.forEach(function(project){
        output += `
        <li class="carousel_slide">

        <br /> <h3>${project.title}</h3>

        <br /> <img src="${project.image}" class="slider-size" />
        
        <br /> <p class="is-hidden">${project.description}</p>
        
        </li> `;

    })

    displayTarget.innerHTML = output
 
    const firstSlide = track.querySelector('.carousel_slide')
    firstSlide.classList.add('current-slide')    

    slides = Array.from(track.children)

    slides.forEach(setSlidePosition)    

    console.log(output)
})



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


const hideShowArrows = function(slide, prevButton, nextButton, targetIndex) {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length -1) {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.add('is-hidden')
    } else {
        prevButton.classList.remove('is-hidden')
        nextButton.classList.remove('is-hidden')
    }
}








// click left, move                 //copied function from click right
prevButton.addEventListener('click', function(){
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;  
    
    const currentDot = dotsNav.querySelector('.current-slide')
    const prevDot = currentDot.previousElementSibling

    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot)
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
})


// click right, move
nextButton.addEventListener('click', function(e) {
    const currentSlide = track.querySelector('.current-slide');

    console.log(currentSlide)

    const nextSlide = currentSlide.nextElementSibling;  // move to next slide
    const amountToMove = nextSlide.style.left; //how far the element must move
    

    const currentDot = dotsNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling

    const nextIndex = slides.findIndex(slide => slide === nextSlide)

    console.log(nextIndex)

    // track.style.transform = 'translateX(-' + amountToMove + ')';
    // currentSlide.classList.remove('current-slide')
    // nextSlide.classList.add('current-slide')
    moveToSlide(track, currentSlide, nextSlide)
    updateDots(currentDot, nextDot) // update dots applied here
    hideShowArrows(slides, prevButton, nextButton, nextIndex);

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
        hideShowArrows(slides, prevButton, nextButton, targetIndex);

    }})



// Contact Me
// 
const contactMe = document.querySelector('.callMeMaybe')
const enquiryForm = document.querySelector('.overlay')

contactMe.addEventListener('click', function() {
    enquiryForm.classList.remove('is-hidden')

    console.log (contactMe)
})

const closeBox = document.querySelector('.close-button')

closeBox.addEventListener('click', function(){
    enquiryForm.classList.add('is-hidden')

})