const items = document.querySelectorAll('.tabheader__item');
const content = document.querySelectorAll('.tabcontent');
const btnForms = document.querySelectorAll('[data-btn]');
const modal = document.querySelector('.modal');

// создадим элемент с прокруткой
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

function remiveActiveTab() {
    items.forEach((i, j) => {
        i.classList.remove('tabheader__item_active')
        content[j].classList.remove('tabcontent_active')
    })
}



items.forEach((i, j) => {

    i.addEventListener('click', () => {
        remiveActiveTab(),
            i.classList.add('tabheader__item_active');
        content[j].classList.add('tabcontent_active');


    })
})

function openModal() {
    modal.classList.add('modal_active', 'fade')
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = scrollWidth + 'px';
}
btnForms.forEach(i => {
    i.addEventListener('click', () => {
        openModal()
    })
})

const cross = modal.querySelector('.modal__close');
cross.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '0';

})

document.body.addEventListener('keydown', (e) => {
    if (e.code == 'Escape') {
        modal.classList.remove('modal_active');
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '0';
    }
});

//e.target – это исходный элемент, на котором произошло событие, в процессе всплытия он неизменен. 
modal.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.remove('modal_active');
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '0';
    }
})

// сработка модального окна по таймеру
// setTimeout (openModal, 3000);


function showModalScroll() {
    if ((document.documentElement.clientHeight + document.documentElement.scrollTop) >= document.documentElement.scrollHeight - 1) {
        openModal();
        window.removeEventListener('scroll', showModalScroll)


    }
}
// window.addEventListener('scroll',
//     showModalScroll);

const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const slides = document.querySelectorAll('.offer__slide');


const current = document.getElementById('current');
const total = document.getElementById('total');

function totalAll() {
    total.textContent = slides.length >= 10 ? `${slides.length}` : `0${slides.length}`
    // slides.length >= 10 ?  total.textContent = `${slides.length}` : total.textContent = `0${slides.length}`;
    // if (slides.length >= 10) {
    //     total.textContent = `${slides.length}`
    // }
    // else {
    //     total.textContent = `0${slides.length}`
    // }

}

totalAll();





// function createDots() {
//     let slid = document.querySelector('.offer__slider');
//     let dots = document.createElement('ul');
//     slides.forEach((i, j) => {
//         const dot = document.createElement('li');
//         dots.classList.add('offer__dots');
//         if (i.classList.contains('offer__slide--active')) {
//             dot.classList.add('offer__dot', 'offer__active')
//         }
//         else{
//             dot.classList.add('offer__dot');
//         }



//         dots.appendChild(dot);


//     });

//     slid.appendChild(dots);
// };
function createDots() {
    let slid = document.querySelector('.offer__slider');
    let dots = document.createElement('ul');
    slides.forEach((i, j) => {
        let dot = document.createElement('li');
        dots.classList.add('offer__dots');
        i.classList.contains('offer__slide--active') ? dot.classList.add('offer__dot', 'offer__active') : dot.classList.add('offer__dot');
        dots.appendChild(dot);
    });
    slid.appendChild(dots);
};


createDots();
let dotAll = document.querySelectorAll('.offer__dot');




prev.addEventListener('click', () => {

    for (let j = 0; j < slides.length; j++) {
        const i = slides[j];
        if (i.classList.contains('offer__slide--active') && (j != 0)) {
            i.classList.remove('offer__slide--active', 'fade');
            slides[j - 1].classList.add('offer__slide--active', 'fade');
            dotAll[j - 1].classList.add('offer__active');
            dotAll[j].classList.remove('offer__active');


            if (j >= 10) {


                current.textContent = `${(j)}`;

            }
            else {
                current.textContent = `0${(j)}`;

            }

            break;
        }
        else if (j == 0 && i.classList.contains('offer__slide--active')) {

            slides[slides.length - 1].classList.add('offer__slide--active', 'fade');
            i.classList.remove('offer__slide--active', 'fade');
            current.textContent = slides.length >= 10 ? `${(slides.length)}` : `0${(slides.length)}`
            dotAll[0].classList.remove('offer__active')
            dotAll[dotAll.length - 1].classList.add('offer__active');

            break;

        }


    };



});






next.addEventListener('click', () => {


    for (let j = 0; j < slides.length; j++) {
        const i = slides[j];


        if (i.classList.contains('offer__slide--active') && ((slides.length - 1) != j)) {
            i.classList.remove('offer__slide--active', 'fade');
            slides[j + 1].classList.add('offer__slide--active', 'fade');
            if (j >= 8) {
                current.textContent = `${(j + 2)}`
            }
            else {
                current.textContent = `0${(j + 2)}`
            }


            break;
        }
        else if ((slides.length - 1) == j && i.classList.contains('offer__slide--active')) {
            i.classList.remove('offer__slide--active', 'fade');
            slides[0].classList.add('offer__slide--active', 'fade');
            current.textContent = `0${(1)}`;
            break;

        }
    };
    dotAll.forEach((i, j) => {
        if (slides[j].classList.contains('offer__slide--active') && (j != 0)) {

            i.classList.add('offer__active');
            dotAll[j - 1].classList.remove('offer__active');



            console.log(dotAll);
        }
        else if ((j == 0) && slides[j].classList.contains('offer__slide--active')) {
            i.classList.add('offer__active');
            dotAll[dotAll.length - 1].classList.remove('offer__active');



        }
    });
})

let gender, weight, height, age, ratio;


let result = document.querySelector('.calculating__result span');
weight = document.getElementById('weight');
height = document.getElementById('height');
age = document.getElementById('age');
ratio = 1.35;

gender = 'Женщина';

// сделать событие input для переменных через функцию
function dinamicInfo() {
    let dinValue = document.querySelector('.calculating__choose_medium');
    dinValue.addEventListener('input', () => {
        totalResult();
    })

}
dinamicInfo();
function staticInfo(parantSelector) {

    const staticValues = document.querySelectorAll(`${parantSelector} div`);
    staticValues.forEach(i => {
        i.addEventListener('click', () => {
            staticValues.forEach(i => {
                i.classList.remove('calculating__choose-item_active');
            })
            i.classList.add('calculating__choose-item_active');
            if (i.hasAttribute('data-ratio')) {
                ratio = +i.getAttribute('data-ratio');
            }
            else {
                gender = i.textContent;

            }
            totalResult();
        })
    })

}

staticInfo('#gender');
staticInfo('.calculating__choose_big');

function totalResult() {
    // Для женщин: 655,1 + (9,563 × вес в кг) + (1,85 × рост в см) - (4,676 × возраст в годах);
    // Для мужчин: 66,5 + (13,75 × вес в кг) + (5,003 × рост в см) - (6,775 × возраст в годах).

    if (!weight.value || !height.value || !age.value) {
        result.textContent = '0';
        return
    };
    console.log(gender);
    switch (gender) {

        case 'Женщина':
            result.textContent = Math.round((655.1 + (9.563 * weight.value) + (1.85 * height.value) - (4.676 * age.value)) * ratio);
            break;
        case 'Мужчина':
            result.textContent = Math.round((66.5 + (13.75 * weight.value) + (5.003 * height.value) - (6.775 * age.value)) * ratio);
            break;
        // default:
        //     result.textContent = Math.round((655.1 + (9.563 * weight.value) + (1.85 * height.value) - (4.676 * age.value)) * ratio);

    }

}


totalResult();

class Menu {
    constructor(imgSrc, title, descr, price) {
        this.imgSrc = imgSrc;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.chengeToDollar();
    }

    chengeToDollar() {
        this.price = Math.round(this.price / 90);
    }

    render() {

        const div = document.createElement('div');
        div.innerHTML = ` <div class="menu__item">
        <img src=${this.imgSrc} alt="elite">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> $/день</div>
        </div>
    </div>`;
        let field = document.querySelector('.menu__field .container');
        field.appendChild(div);
    }
}

new Menu(
    "img/tabs/vegy.jpg", 'Меню "Фитнес"', `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
    овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
    ценой и высоким качеством!`, 229

).render();
new Menu(
    "img/tabs/elite.jpg", 'Меню “Премиум”', `В меню “Премиум” мы используем не только красивый дизайн упаковки, но
    и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
    в ресторан!`, 550

).render();
new Menu(
    "img/tabs/post.jpg", 'Меню "Постное"', `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
    продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
    количество белков за счет тофу и импортных вегетарианских стейков.`, 430

).render();


function timer() {

    let dataOne = Date.parse(new Date());

    let endData = Date.parse('2024-04-07');

    let t = endData - dataOne;
    let days, hours, min, sec;
    days = document.getElementById('days').innerHTML = `${Math.floor(t / (1000 * 60 * 60 * 24))}`;

    hours = document.getElementById('hours').innerHTML = `${Math.floor((t / (1000 * 60 * 60)) % 24)}`;

    min = document.getElementById('minutes').innerHTML = `${Math.floor((t / (1000 * 60)) % 60)}`;

    sec = document.getElementById('seconds').innerHTML = `${Math.floor((t / 1000) % 60)}`;
    console.log(t);
    if (t <= 0) {
        clearInterval(timerId);
        days = document.getElementById('days').innerHTML = `0`;

        hours = document.getElementById('hours').innerHTML = `00`;

        min = document.getElementById('minutes').innerHTML = `00`;

        sec = document.getElementById('seconds').innerHTML = `00`;
    }

}

let timerId = setInterval(timer, 1000);






function textShow() {
    let ptext = document.createElement('p');
    const formMail = document.getElementById('formMail');
    let modalInput = document.querySelectorAll('.modal__input');
    if (modalInput != false) {
        ptext.textContent = `Спасибо, с Вами свяжутся`;
        ptext.style =
            "display: flex; justify-content: center; margin-top: 20px;color: red;"
        formMail.append(ptext);
    }



}
function closeCross() {
    modal.classList.remove('modal_active');
    document.body.style.overflowY = '';
    document.body.style.paddingRight = '0';
};

const btnInput = document.getElementById('mail')
btnInput.addEventListener('click', () => {

    textShow();
    setTimeout(closeCross, 10000);




});










