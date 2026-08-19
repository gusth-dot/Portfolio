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



/* ======================================================
   CARROSSEL PRINCIPAL
====================================================== */

const slides = document.querySelector(".slides");

const slidesItems =
document.querySelectorAll(".slide-link");

const carouselSpider =
document.querySelector(".carrossel");

/* ======================================================
   VARIÁVEIS
====================================================== */

let index = 0;

let isDragging = false;

let startXSpider = 0;

let currentTranslate = 0;

let prevTranslate = 0;

let moved = false;

let autoSlide;

/* ======================================================
   ATUALIZAR
====================================================== */

function atualizarCarrossel(animar = true){

    if(animar){

        slides.style.transition =
        "transform .5s ease";

    }else{

        slides.style.transition =
        "none";

    }

    currentTranslate =
    -index * carouselSpider.offsetWidth;

    prevTranslate =
    currentTranslate;

    slides.style.transform =
    `translateX(${currentTranslate}px)`;

}

/* ======================================================
   NEXT
====================================================== */

function nextSlide(){

    index++;

    if(index >= slidesItems.length){

        index = 0;

    }

    atualizarCarrossel();

}

/* ======================================================
   PREV
====================================================== */

function prevSlide(){

    index--;

    if(index < 0){

        index = slidesItems.length - 1;

    }

    atualizarCarrossel();

}

/* ======================================================
   AUTOPLAY
====================================================== */

function iniciarAutoSlide(){

    autoSlide = setInterval(()=>{

        nextSlide();

    },5000);

}

function pararAutoSlide(){

    clearInterval(autoSlide);

}

iniciarAutoSlide();

/* ======================================================
   PEGAR POSIÇÃO
====================================================== */

function getPositionX(e){

    return e.type.includes("mouse")
    ? e.pageX
    : e.touches[0].clientX;

}

/* ======================================================
   START
====================================================== */

function dragStart(e){

    isDragging = true;

    moved = false;

    pararAutoSlide();

    startXSpider =
    getPositionX(e);

    slides.style.transition =
    "none";

    carouselSpider.classList.add(
        "dragging"
    );

}

/* ======================================================
   MOVE
====================================================== */

function dragMove(e){

    if(!isDragging) return;

    const currentPosition =
    getPositionX(e);

    const diff =
    currentPosition - startXSpider;

    if(Math.abs(diff) > 5){

        moved = true;

    }

    currentTranslate =
    prevTranslate + diff;

    /* =========================
       LIMITES
    ========================= */

    const maxTranslate = 0;

    const minTranslate =
    -(slidesItems.length - 1)
    * carouselSpider.offsetWidth;

    if(currentTranslate > maxTranslate){

        currentTranslate =
        maxTranslate;

    }

    if(currentTranslate < minTranslate){

        currentTranslate =
        minTranslate;

    }

    slides.style.transform =
    `translateX(${currentTranslate}px)`;

}

/* ======================================================
   END
====================================================== */

function dragEnd(){

    if(!isDragging) return;

    isDragging = false;

    const movedBy =
    currentTranslate - prevTranslate;

    /* =========================
       TROCAR SLIDE
    ========================= */

    if(
        movedBy < -100 &&
        index < slidesItems.length - 1
    ){

        index++;

    }

    if(
        movedBy > 100 &&
        index > 0
    ){

        index--;

    }

    atualizarCarrossel();

    carouselSpider.classList.remove(
        "dragging"
    );

    iniciarAutoSlide();

}

/* ======================================================
   EVENTOS MOUSE
====================================================== */

slides.addEventListener(
    "mousedown",
    dragStart
);

slides.addEventListener(
    "mousemove",
    dragMove
);

slides.addEventListener(
    "mouseup",
    dragEnd
);

slides.addEventListener(
    "mouseleave",
    dragEnd
);

/* ======================================================
   TOUCH MOBILE
====================================================== */

slides.addEventListener(
    "touchstart",
    dragStart
);

slides.addEventListener(
    "touchmove",
    dragMove
);

slides.addEventListener(
    "touchend",
    dragEnd
);

/* ======================================================
   EVITAR CLICK DURANTE DRAG
====================================================== */

document
.querySelectorAll(".slide-link")
.forEach(link=>{

    link.addEventListener(
        "click",
        (e)=>{

            if(moved){

                e.preventDefault();

            }

        }
    );

});

/* ======================================================
   BLOQUEAR DRAG NATIVO
====================================================== */

document
.querySelectorAll(".slide-link")
.forEach(link=>{

    link.addEventListener(
        "dragstart",
        (e)=>{

            e.preventDefault();

        }
    );

});

/* ======================================================
   RESPONSIVO
====================================================== */

window.addEventListener(
    "resize",
    ()=>{

        atualizarCarrossel(false);

    }
);

/* ======================================================
   INIT
====================================================== */

atualizarCarrossel(false);

/* ======================================================
   FADE NORMAL
====================================================== */

const faders =
    document.querySelectorAll('.fade');

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add('show');

        }

    });

},{
    threshold:0.2
});

faders.forEach(fade=>observer.observe(fade));

/* ======================================================
   FADE EM SEQUÊNCIA
====================================================== */

const observer2 =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const children =
                entry.target.querySelectorAll('.fade-item');

            children.forEach((el,index)=>{

                setTimeout(()=>{

                    el.classList.add('show');

                },index * 150);

            });

        }

    });

},{
    threshold:0.2
});

document
.querySelectorAll('.fade-container')
.forEach(container=>{

    observer2.observe(container);

});

/* ==============================================================================================
   CARROSSEL 3D 
============================================================================================== */

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

// =========================
// TROCAR VÍDEO
// =========================

function trocarVideo(
    videoID,
    titulo,
    descricao
){

    // TROCA O VÍDEO
    document
    .getElementById("videoPlayer")
    .src =
    `https://www.youtube.com/embed/${videoID}`;

    // TROCA O TÍTULO
    document
    .getElementById("tituloVideo")
    .innerText =
    titulo;

    // TROCA A DESCRIÇÃO
    document
    .getElementById("descricaoVideo")
    .innerText =
    descricao;
}

/* ======================================================
   GIF
====================================================== */


const section = document.querySelector(".HomemAranha");
const gif = document.querySelector(".img-gif");
let jaRodou = false;
let tempoGif = 2000;

function rodarGif() {
  gif.src = gif.src;
  gif.style.opacity = "1";

  setTimeout(() => {
    gif.style.opacity = "0";
  }, tempoGif);
}

const observerGif = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !jaRodou) {
      rodarGif();
      jaRodou = true;
    }
  });
}, { threshold: 0.5 });

observerGif.observe(section);

section.addEventListener("mouseenter", () => {
  rodarGif();
});



/* ===================================

NOVO CARROSSEL NETFLIX 3D

=================================== */

const netflixCards =
document.querySelectorAll(".netflix-card");

const prevNetflix =
document.querySelector(".netflix-btn.prev");

const nextNetflix =
document.querySelector(".netflix-btn.next");

const netflixTrack =
document.querySelector(".netflix-track");

let netflixIndex = 0;

/* ===================================
ATUALIZAR
=================================== */

function updateNetflixCarousel(){

  netflixCards.forEach(card=>{

    card.className = "netflix-card";

  });

  const total = netflixCards.length;

  const center =
  netflixIndex;

  const left1 =
  (netflixIndex - 1 + total) % total;

  const left2 =
  (netflixIndex - 2 + total) % total;

  const right1 =
  (netflixIndex + 1) % total;

  const right2 =
  (netflixIndex + 2) % total;

  netflixCards[center]
  .classList.add("center");

  netflixCards[left1]
  .classList.add("left-1");

  netflixCards[left2]
  .classList.add("left-2");

  netflixCards[right1]
  .classList.add("right-1");

  netflixCards[right2]
  .classList.add("right-2");

  netflixCards.forEach((card,index)=>{

    if(
      index !== center &&
      index !== left1 &&
      index !== left2 &&
      index !== right1 &&
      index !== right2
    ){

      card.classList.add("hidden");

    }

  });

}

/* ===================================
BOTÕES
=================================== */

nextNetflix.addEventListener("click",()=>{

  netflixIndex++;

  if(netflixIndex >= netflixCards.length){

    netflixIndex = 0;

  }

  updateNetflixCarousel();

});

prevNetflix.addEventListener("click",()=>{

  netflixIndex--;

  if(netflixIndex < 0){

    netflixIndex =
    netflixCards.length - 1;

  }

  updateNetflixCarousel();

});

/* ===================================
AUTO PLAY
=================================== */

let netflixAutoPlay =
setInterval(()=>{

  netflixIndex++;

  if(netflixIndex >= netflixCards.length){

    netflixIndex = 0;

  }

  updateNetflixCarousel();

},4000);

/* ===================================
DRAG COM MOUSE
=================================== */

let isDraggingNetflix = false;

let startXNetflix = 0;

let movedNetflix = false;

/* START */

netflixTrack.addEventListener("mousedown",(e)=>{

  isDraggingNetflix = true;

  movedNetflix = false;

  startXNetflix = e.clientX;

  netflixTrack.style.cursor =
  "grabbing";

});

/* MOVE */

window.addEventListener("mousemove",(e)=>{

  if(!isDraggingNetflix) return;

  const diff =
  e.clientX - startXNetflix;

  if(Math.abs(diff) > 50){

    movedNetflix = true;

    if(diff < 0){

      netflixIndex++;

      if(netflixIndex >= netflixCards.length){

        netflixIndex = 0;

      }

    }else{

      netflixIndex--;

      if(netflixIndex < 0){

        netflixIndex =
        netflixCards.length - 1;

      }

    }

    updateNetflixCarousel();

    startXNetflix = e.clientX;

  }

});

/* END */

window.addEventListener("mouseup",()=>{

  isDraggingNetflix = false;

  netflixTrack.style.cursor =
  "grab";

});

/* ===================================
TOUCH MOBILE
=================================== */

netflixTrack.addEventListener("touchstart",(e)=>{

  startXNetflix =
  e.touches[0].clientX;

});

netflixTrack.addEventListener("touchmove",(e)=>{

  const diff =
  e.touches[0].clientX -
  startXNetflix;

  if(Math.abs(diff) > 50){

    if(diff < 0){

      netflixIndex++;

      if(netflixIndex >= netflixCards.length){

        netflixIndex = 0;

      }

    }else{

      netflixIndex--;

      if(netflixIndex < 0){

        netflixIndex =
        netflixCards.length - 1;

      }

    }

    updateNetflixCarousel();

    startXNetflix =
    e.touches[0].clientX;

  }

});

/* ===================================
PAUSAR AUTOPLAY NO HOVER
=================================== */

netflixTrack.addEventListener("mouseenter",()=>{

  clearInterval(netflixAutoPlay);

});

netflixTrack.addEventListener("mouseleave",()=>{

  netflixAutoPlay =
  setInterval(()=>{

    netflixIndex++;

    if(netflixIndex >= netflixCards.length){

      netflixIndex = 0;

    }

    updateNetflixCarousel();

  },4000);

});

/* ===================================
INIT
=================================== */

updateNetflixCarousel();

  // ===================================
// CARROSSEL VÍDEOS MOBILE
// ===================================

(() => {

  const slider = document.querySelector(".lista-videos");

  if (!slider) return;

  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;

  // =========================
  // START
  // =========================

  slider.addEventListener("mousedown", (e) => {

    isDragging = true;

    slider.classList.add("dragging");

    startX = e.pageX;
    scrollLeft = slider.scrollLeft;

  });

  // =========================
  // MOVE
  // =========================

  slider.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    e.preventDefault();

    const x = e.pageX;

    const walk = x - startX;

    slider.scrollLeft = scrollLeft - walk;

  });

  // =========================
  // END
  // =========================

  function stopDrag() {

    isDragging = false;

    slider.classList.remove("dragging");

  }

  slider.addEventListener("mouseup", stopDrag);
  slider.addEventListener("mouseleave", stopDrag);

  // =========================
  // TOUCH MOBILE
  // =========================

  slider.addEventListener("touchstart", (e) => {

    startX = e.touches[0].pageX;
    scrollLeft = slider.scrollLeft;

  });

  slider.addEventListener("touchmove", (e) => {

    const x = e.touches[0].pageX;

    const walk = x - startX;

    slider.scrollLeft = scrollLeft - walk;

  });

  slider.addEventListener("touchend", stopDrag);

  // =========================
  // BLOQUEIA DRAG DE IMAGEM
  // =========================

  slider.querySelectorAll("img").forEach(img => {

    img.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });

  });

})();

  