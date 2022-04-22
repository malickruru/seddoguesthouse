const burger = document.querySelector('#burger')

var burgerOpen = false;




burger.addEventListener('click', () => {
    if (!burgerOpen){
        gsap.to('.menu-overlay', {width: '100vw'});
        burgerOpen = true;
    }else{
        gsap.to('.menu-overlay', {width: '0'});
        burgerOpen = false;
    }
    
    
})