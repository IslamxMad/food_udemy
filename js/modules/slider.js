function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const windowForSlide = document.querySelector(wrapper);
    const carousel = document.querySelector(field);
    const width = window.getComputedStyle(windowForSlide).width;
    

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    carousel.style.width = 100 * slides.length + '%';
    carousel.style.display = 'flex';
    carousel.style.transition = '0.5s all';

    windowForSlide.style.overflow = 'hidden';

    slides.forEach(i => {
        i.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slideto', i + 1);
        dot.classList.add('dot');
        if(i == 0) {
            dot.style.opacity = '1';
        } 
        indicators.append(dot);
        dots.push(dot);
    }

    function pasteZero() {
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function notDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function dotOpacityToggler() {
        dots.forEach(dot => dot.style.opacity = '50%');
        dots[slideIndex - 1].style.opacity = '1';
    }

    next.addEventListener('click', () => {
        if (offset == notDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += notDigits(width);
        }
        carousel.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        pasteZero();
        
        dotOpacityToggler();
        
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = notDigits(width) * (slides.length - 1);
        } else {
            offset -= notDigits(width);
        }
        carousel.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        pasteZero();

        dotOpacityToggler();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e)=> {
            const slideTo = e.target.getAttribute('data-slideto');

            slideIndex = slideTo;
            offset = notDigits(width) * (slideTo - 1);
            carousel.style.transform = `translateX(-${offset}px)`;

            pasteZero();

            dotOpacityToggler();
        });
    });
}



export default slider;