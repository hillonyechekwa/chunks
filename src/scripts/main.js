const navbar = document.querySelector('.navigation')

const supportPageOffset = window.pageXOffset !== undefined;
const isCSS1Compat = (document.compatMode || "") === "CSS1Compat"
const logo = document.querySelector(".logo") 
let previousScrollPosition = 0
var throttleWait

console.log(navbar)

logo.onclick = () => {
    window.location.assign('/')
}

const isScrollingDown = () => {
    let currentScrolledPosition = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
    let scrollingDown

    if(currentScrolledPosition > previousScrollPosition){
        scrollingDown = true
    }else{
        scrollingDown = false
    }

    previousScrollPosition = currentScrolledPosition
    return scrollingDown;
}

const handleNavScroll = () => {
    if(isScrollingDown() && !navbar.contains(document.activeElement)) {
        navbar.classList.add("scroll-down")
        navbar.classList.remove("scroll-up")
    } else {
        navbar.classList.add('scroll-up')
        navbar.classList.remove('scroll-down')
    }
}



const throttle = (callback, time) => {
    if(throttleWait) return;
    
    
    throttleWait = true

    setTimeout(() => {
        callback()

        throttleWait = false
    }, (time));
}


const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");


window.addEventListener("scroll", () => {
    if(mediaQuery && !mediaQuery.matches){
        throttle(handleNavScroll, 250)
    }
})



