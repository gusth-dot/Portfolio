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


    
/*=======================================================================================
FADE-IN DAS ÚLTIMAS SÉRIES
=======================================================================================*/

const cards = document.querySelectorAll(".serie-ultimas");

if (cards.length) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            // Se o card ainda não entrou na tela, não faz nada
            if (!entry.isIntersecting) return;

            const card = entry.target;

            // Descobre a posição do card
            const index = [...cards].indexOf(card);

            /*
             * Cria um pequeno atraso entre os cards,
             * mas impede que o atraso fique enorme
             * conforme a página aumenta.
             *
             * 0ms
             * 60ms
             * 120ms
             * 180ms
             * 240ms
             * 300ms
             * depois reinicia
             */
            const delay = (index % 6) * 60;

            card.style.transitionDelay = `${delay}ms`;

            // Ativa o fade-in
            card.classList.add("show");

            // Não observa novamente esse card
            observer.unobserve(card);

        });

    }, {

        /*
         * O card começa a animação assim que
         * aproximadamente 5% dele aparece na tela.
         */
        threshold: 0.05

    });


    // Observa todos os cards
    cards.forEach(card => {
        observer.observe(card);
    });

}

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