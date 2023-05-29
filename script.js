// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());





let startPos = 0

let search_form = document.querySelector(".search-form")

let search_pic = document.querySelectorAll(".search__pic")

let search_form_close = document.querySelector(".search-form__close")

let slider_box = document.querySelector(".slider__box")

let slider_button = document.querySelectorAll(".slider__button")

let slider_pic = document.querySelectorAll(".slider__pic")

let slider_circle = document.querySelectorAll(".slider__circle")

let how_we_work_step = document.querySelectorAll(".how-we-work__step")

let how_we_work_wrapper = document.querySelectorAll(".how-we-work__wrapper")

let questions_card_close = document.querySelectorAll(".questions__card-close-pic")

let questions_card = document.querySelectorAll(".questions__card")

let header_burger = document.querySelector(".header__burger")

let header_nav_mobile = document.querySelector(".header__nav_mobile")

let header_nav_close = document.querySelector(".header__nav-close")

let header_item = document.querySelectorAll(".header__item")

function addActiveToForm() {
    search_form.classList.add('search-form_active')
    this.classList.add('search__pic_active')

}

function removeActiveToForm() {
    search_form.classList.remove('search-form_active')

    let search_pic_active = document.querySelector(".search__pic_active")

    search_pic_active.classList.remove('search__pic_active')
}

function swipeSlider(event) {

    slider_circle.forEach(function (element) {
        element.classList.remove("slider__circle_active")
    })

    let currentWidth = slider_box.clientWidth

    let maxPos = slider_pic.length * (currentWidth)

    if (this.classList.contains("slider__button")) {

        if (this.classList.contains("slider__button_right") === true) {
            startPos = startPos - currentWidth
        }

        else{
            startPos = startPos + currentWidth
        }

    }

    else{
        this.classList.add("slider__circle_active")
        let circleIndex = Array.from(slider_circle).indexOf(this)
        startPos = circleIndex * (-currentWidth)
    }

    if (startPos === -maxPos) {
        slider_box.style.left = 0 + "px"
        startPos = 0
    }
    else if (startPos === currentWidth) {
        slider_box.style.left = -(maxPos - currentWidth) + "px"
        startPos = -(maxPos - currentWidth)
    }

    else{
        slider_box.style.left = startPos + "px"
    }

    let currentCircle = Math.abs((startPos / (maxPos - currentWidth)) * (slider_pic.length-1))

    slider_circle[currentCircle].classList.add("slider__circle_active")

}


function howWeWorkActive() {
    how_we_work_step.forEach(function (element){
        element.classList.remove("how-we-work__step_active")
    })
    this.classList.add("how-we-work__step_active")

    let circleIndex = Array.from(how_we_work_step).indexOf(this)

    how_we_work_wrapper.forEach(function (element) {
        element.classList.remove("how-we-work__wrapper_active")
    })

    how_we_work_wrapper[circleIndex].classList.add("how-we-work__wrapper_active")
    how_we_work_wrapper[circleIndex].classList.add("how-we-work__wrapper_animation")

    setHeightToWork()
}


function setHeightToWork() {

    setTimeout(function () {

        let how_we_work_wrapper_active = document.querySelector(".how-we-work__wrapper_active")
        let currentHeight = how_we_work_wrapper_active.querySelector(".how-we-work__info-text").clientHeight

        let  how_we_work_box = how_we_work_wrapper_active.querySelector(".how-we-work__box")

        how_we_work_box.style.height = currentHeight + "px"

    }, 100)

}


function accordionActivate () {

    if (this.classList.contains("questions__card-close-pic_active")) {
        this.classList.remove("questions__card-close-pic_active")
    }
    else{
        questions_card_close.forEach(function (element) {
            element.classList.remove("questions__card-close-pic_active")
        })
        this.classList.add("questions__card-close-pic_active")
    }

    let closeIndex = Array.from(questions_card_close).indexOf(this)

    let currentHeight = questions_card[closeIndex].querySelector(".questions__card-bottom").scrollHeight

    for (let i = 0; i < questions_card.length; i++) {
        questions_card[i].querySelector(".questions__card-bottom").style.maxHeight = 0 + "px"
    }


    if (questions_card[closeIndex].querySelector(".questions__card-bottom").classList.contains("questions__card-bottom_active")) {
        questions_card[closeIndex].querySelector(".questions__card-bottom").style.maxHeight = 0 + "px"
        questions_card[closeIndex].querySelector(".questions__card-bottom").classList.remove("questions__card-bottom_active")

    }
    else{
        for (let i = 0; i < questions_card.length; i++) {
            questions_card[i].querySelector(".questions__card-bottom").classList.remove("questions__card-bottom_active")
        }
        questions_card[closeIndex].querySelector(".questions__card-bottom").style.maxHeight = currentHeight + "px"
        questions_card[closeIndex].querySelector(".questions__card-bottom").classList.add("questions__card-bottom_active")
    }

}

function activeBurger() {
    header_nav_mobile.classList.add("header__nav_mobile_active")
}

function closeBurger(){
    header_nav_mobile.classList.remove("header__nav_mobile_active")
}


document.addEventListener("DOMContentLoaded", setHeightToWork);
window.addEventListener("resize", setHeightToWork);


for (let i = 0; i < search_pic.length; i++) {
    search_pic[i].addEventListener("click", addActiveToForm)
}

search_form_close.addEventListener("click", removeActiveToForm)

for (let i = 0; i < slider_button.length; i++) {
    slider_button[i].addEventListener("click", swipeSlider)
}

for (let i = 0; i < slider_circle.length; i++) {
    slider_circle[i].addEventListener("click", swipeSlider)
}

for (let i = 0; i < how_we_work_step.length; i++) {
    how_we_work_step[i].addEventListener("click", howWeWorkActive)
}

for (let i = 0; i < questions_card_close.length; i++) {
    questions_card_close[i].addEventListener("click", accordionActivate)
}

for (let i = 0; i < header_item.length; i++) {
    header_item[i].addEventListener("click", closeBurger)
}


header_burger.addEventListener("click", activeBurger)

header_nav_close.addEventListener("click", closeBurger)






