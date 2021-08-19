'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContet() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContet();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContet();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = '2021-08-17';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total'     : t,
            'days'      : days,
            'hours'     : hours,
            'minutes'   : minutes,
            'seconds'   : seconds
        };
    }

    function zeroDay (num) {
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
        
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
            updateClock();

        function updateClock (){
            const t = getTimeRemaining(endtime);
            
            days.innerHTML = zeroDay(t.days);
            hours.innerHTML = zeroDay(t.hours);
            minutes.innerHTML = zeroDay(t.minutes);
            seconds.innerHTML = zeroDay(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //modal

    const btnOpen = document.querySelectorAll('[data-modal]'),
          btnClosed = document.querySelector('[data-close]'),
          modalOpen = document.querySelector('.modal');

    function openModal () {
        modalOpen.classList.add('show');
        modalOpen.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    btnOpen.forEach((item) =>{
        item.addEventListener('click', openModal);
    });

    function closeModal () {
        modalOpen.classList.add('hide');
        modalOpen.classList.remove('show');
        document.body.style.overflow = '';
    }

    btnClosed.addEventListener('click', closeModal);

    modalOpen.addEventListener('click', (e) => {
        if (e.target === modalOpen){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalOpen.classList.contains('show')) {
            closeModal();
        }
    });

    //const modalTimerId = setTimeout(openModal, 5000);

    function showModalScroll () {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight){
                openModal();
                clearInterval(modalTimerId);
                window.removeEventListener('scroll', showModalScroll);
        }
    }

    window.addEventListener('scroll', showModalScroll);
    
    //Наше меню

   
    class MenuCls {
        constructor (src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
        }

        menuOutput() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCls (
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu__field .container'
    ).menuOutput();
    new MenuCls (
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu__field .container'
    ).menuOutput();
    new MenuCls (
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu__field .container'
    ).menuOutput();
});


