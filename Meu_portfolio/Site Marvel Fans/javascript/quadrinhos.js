let lastScroll = 0;

const cabecalho = document.getElementById("cabecalho");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // descendo
  if (currentScroll > lastScroll) {
    cabecalho.classList.add("hide");
  } 
  // subindo
  else {
    cabecalho.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

const themeSwitch = document.getElementById("theme-switch");

// Quando a página carregar
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeSwitch.checked = true;
}

// Quando o usuário mudar o tema
themeSwitch.addEventListener("change", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});

/*===================================================
Botão Sanduíche (mobile)
===================================================*/

const toggle = document.querySelector(".menu-toggle");
    const header = document.querySelector("#cabecalho");

      toggle.addEventListener("click", () => {
        header.classList.toggle("active");
      });

      /* Dropdown mobile */
      document.querySelectorAll(".menu-item").forEach(item => {

        item.addEventListener("click", () => {

          if(window.innerWidth <= 900){

            item.classList.toggle("active");

          }

        });

      });


/* ================================================================================================
   CARROSSEL 3D 
================================================================================================ */

const carousel = document.getElementById("carousel");
const slidesEl = document.getElementById("slides");
const slides3D = document.querySelectorAll("#slides .slide");

let isDown = false;
let startX2 = 0;

let current = 0;
let target = 0;
let velocity = 0;

let currentIndex = 0;

slidesEl.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

function animate(){
  current += (target - current) * 0.12;
  slidesEl.style.transform = `translateX(${current}px)`;
  requestAnimationFrame(animate);
}
animate();

function centerSlide(index){
  const slides = document.querySelectorAll('.slide');
  const slide = slides[index];

  if (!slide) return;

  const slideRect = slide.getBoundingClientRect();
  const carouselRect = carousel.getBoundingClientRect();

  const slideCenter = slideRect.left + slideRect.width / 2;
  const carouselCenter = carouselRect.left + carouselRect.width / 2;

  const offset = slideCenter - carouselCenter;

  target = current - offset;

  currentIndex = index;

  updateSlides();
}

function updateSlides(){
  const slides = document.querySelectorAll('.slide');

  slides.forEach((slide, i) => {
    slide.className = 'slide';

    const diff = i - currentIndex;

    if (diff === 0) slide.classList.add('center');
    else if (diff === -1) slide.classList.add('middle-left');
    else if (diff === 1) slide.classList.add('middle-right');
    else if (diff === -2) slide.classList.add('side-left');
    else if (diff === 2) slide.classList.add('side-right');
  });
}

slidesEl.addEventListener('pointerdown', (e) => {
  isDown = true;
  startX2 = e.clientX;
  velocity = 0;
});

slidesEl.addEventListener('pointermove', (e) => {
  if (!isDown) return;

  const dx = e.clientX - startX2;

  target += dx;
  startX2 = e.clientX;

  velocity = dx;
});

function endDrag2(){
  if (!isDown) return;

  isDown = false;
  target += velocity * 1.2;
  snapToClosest();
}

slidesEl.addEventListener('pointerup', endDrag2);
slidesEl.addEventListener('pointerleave', endDrag2);
slidesEl.addEventListener('pointercancel', endDrag2);

function snapToClosest(){
  const slides = document.querySelectorAll('.slide');

  let closestIndex = 0;
  let closestDistance = Infinity;

  slides.forEach((slide, index) => {
    const rect = slide.getBoundingClientRect();
    const carouselRect = carousel.getBoundingClientRect();

    const slideCenter = rect.left + rect.width / 2;
    const carouselCenter = carouselRect.left + carouselRect.width / 2;

    const distance = Math.abs(slideCenter - carouselCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  centerSlide(closestIndex);
  velocity = 0;
}

function scrollSlides(dir){
  const slides = document.querySelectorAll('.slide');

  currentIndex += dir;

  if (currentIndex < 0) currentIndex = slides.length - 1;
  if (currentIndex >= slides.length) currentIndex = 0;

  centerSlide(currentIndex);
}

document.querySelectorAll('.chev').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    scrollSlides(Number(btn.dataset.dir));
  });
});

window.addEventListener('load', () => {
  centerSlide(0);
});

// Centraliza automaticamente ao redimensionar a tela
let resizeTimer;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    centerSlide(currentIndex);
  }, 100);
});

/*======================================================================================================
Principais notícias sobre quadrinhos carrossel
======================================================================================================*/
/*===================================================================================================================================
Carrossel de notícias marvel
===================================================================================================================================*/

const slider = document.querySelector(".slider");

const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");

const card = document.querySelector(".card-noticia");

const gap = 25;

//========================
// BOTÕES
//========================

function larguraCard(){

    return card.offsetWidth + gap;

}

btnProximo.addEventListener("click",()=>{

    slider.scrollBy({

        left:larguraCard(),

        behavior:"smooth"

    });

});

btnAnterior.addEventListener("click",()=>{

    slider.scrollBy({

        left:-larguraCard(),

        behavior:"smooth"

    });

});

//========================
// DRAG COM MOUSE
//========================

let pressionado = false;

let inicioX = 0;

let scrollInicial = 0;

slider.addEventListener("mousedown",(e)=>{

    pressionado = true;

    slider.classList.add("dragging");

    inicioX = e.pageX;

    scrollInicial = slider.scrollLeft;

});

document.addEventListener("mouseup",()=>{

    pressionado = false;

    slider.classList.remove("dragging");

});

document.addEventListener("mousemove",(e)=>{

    if(!pressionado) return;

    e.preventDefault();

    const distancia = e.pageX - inicioX;

    slider.scrollLeft = scrollInicial - distancia;

});

//========================
// TOUCH
//========================

slider.addEventListener("touchstart",(e)=>{

    inicioX = e.touches[0].pageX;

    scrollInicial = slider.scrollLeft;

},{passive:true});

slider.addEventListener("touchmove",(e)=>{

    const distancia = e.touches[0].pageX - inicioX;

    slider.scrollLeft = scrollInicial - distancia;

},{passive:true});

//========================
// EVITA ARRASTAR IMAGENS
//========================

document.querySelectorAll(".card-noticia img").forEach(img=>{

    img.draggable = false;

});


const cards = document.querySelectorAll(".quadrinho-week");
const grid = document.querySelector(".quadrinhos-grid");

const observer = new IntersectionObserver((entries) => {
    const columns = getComputedStyle(grid)
        .gridTemplateColumns
        .split(" ").length;

    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const index = [...cards].indexOf(entry.target);
        const column = index % columns;

        entry.target.style.transitionDelay =
            `${(columns - 1 - column) * 120}ms`;

        entry.target.classList.add("show");
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.15
});

cards.forEach(card => observer.observe(card));