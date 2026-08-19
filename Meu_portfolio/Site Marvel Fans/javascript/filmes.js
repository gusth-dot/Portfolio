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

/* Capa de filmes Vingadores */

const thanos = document.querySelector('.thanos-image-capa');
const vingadores = document.querySelector('.vingadores-image-capa');

if (thanos && vingadores) {

    let currentScroll = 0;
    let targetScroll = 0;

    window.addEventListener('scroll', () => {
        targetScroll = window.scrollY;
    });

    function animate() {

        currentScroll +=
            (targetScroll - currentScroll) * 0.08;

        thanos.style.transform =
            `translateY(${currentScroll * 0.15}px)`;

        vingadores.style.transform =
            `translateY(calc(20% + ${currentScroll * 0.35}px))`;

        requestAnimationFrame(animate);
    }

    animate();
}
/* =========================================================
   CARROSSEL PRINCIPAL DE BANNERS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const carrossel = document.querySelector(".carrossel-site");

    if (!carrossel) return;


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const imagemPrincipal =
        carrossel.querySelector("#imagemPrincipal");

    const miniaturas =
        carrossel.querySelectorAll(".miniatura");

    const setaEsquerda =
        carrossel.querySelector(".seta-esquerda");

    const setaDireita =
        carrossel.querySelector(".seta-direita");

    const miniaturasContainer =
        carrossel.querySelector(".miniaturas");

    const miniaturasArea =
        carrossel.querySelector(".miniaturas-area");


    /* =====================================================
       VERIFICAÇÃO
    ===================================================== */

    if (
        !imagemPrincipal ||
        miniaturas.length === 0 ||
        !setaEsquerda ||
        !setaDireita ||
        !miniaturasContainer ||
        !miniaturasArea
    ) {
        console.error("Carrossel: algum elemento não foi encontrado.");
        return;
    }


    /* =====================================================
       ÍNDICE ATUAL
    ===================================================== */

    let indiceAtual = 0;


    /* =====================================================
       TROCAR BANNER
    ===================================================== */

    function atualizarCarrossel() {

        const miniaturaAtual =
            miniaturas[indiceAtual];


        if (!miniaturaAtual) return;


        const imagemMiniatura =
            miniaturaAtual.querySelector("img");


        if (!imagemMiniatura) return;


        /* =============================================
           TROCA A IMAGEM PRINCIPAL
        ============================================= */

        imagemPrincipal.src =
            imagemMiniatura.src;


        /* =============================================
           ALT DA IMAGEM
        ============================================= */

        imagemPrincipal.alt =
            imagemMiniatura.alt;


        /* =============================================
           MINIATURA ATIVA
        ============================================= */

        miniaturas.forEach((miniatura, index) => {

            miniatura.classList.toggle(
                "ativa",
                index === indiceAtual
            );

        });


        /* =============================================
           DESLOCAMENTO DAS MINIATURAS
        ============================================= */

        const areaLargura =
            miniaturasArea.clientWidth;

        const centroMiniatura =
            miniaturaAtual.offsetLeft +
            miniaturaAtual.offsetWidth / 2;

        let deslocamento =
            centroMiniatura -
            areaLargura / 2;


        const limite =
            Math.max(
                0,
                miniaturasContainer.scrollWidth -
                areaLargura
            );


        deslocamento =
            Math.max(
                0,
                Math.min(
                    deslocamento,
                    limite
                )
            );


        miniaturasContainer.style.transform =
            `translateX(-${deslocamento}px)`;
    }


    /* =====================================================
       PRÓXIMO
    ===================================================== */

    function proximoBanner() {

        indiceAtual++;

        if (indiceAtual >= miniaturas.length) {
            indiceAtual = 0;
        }

        atualizarCarrossel();
    }


    /* =====================================================
       ANTERIOR
    ===================================================== */

    function bannerAnterior() {

        indiceAtual--;

        if (indiceAtual < 0) {
            indiceAtual = miniaturas.length - 1;
        }

        atualizarCarrossel();
    }


    /* =====================================================
       SETA DIREITA
    ===================================================== */

    setaDireita.addEventListener("click", (event) => {

        event.preventDefault();

        proximoBanner();

    });


    /* =====================================================
       SETA ESQUERDA
    ===================================================== */

    setaEsquerda.addEventListener("click", (event) => {

        event.preventDefault();

        bannerAnterior();

    });


    /* =====================================================
       CLIQUE NAS MINIATURAS
    ===================================================== */

    miniaturas.forEach((miniatura, index) => {

        miniatura.addEventListener("click", (event) => {

            event.preventDefault();

            indiceAtual = index;

            atualizarCarrossel();

        });

    });


    /* =====================================================
       INICIAR
    ===================================================== */

    atualizarCarrossel();

});

/* =========================================================
   ARRASTAR MINIATURAS COM MOUSE E TOUCH
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const area = document.querySelector(".miniaturas-area");
    const container = document.querySelector(".miniaturas");

    if (!area || !container) return;


    let arrastando = false;
    let inicioX = 0;
    let deslocamentoInicial = 0;


    /* =====================================================
       LIMITES
    ===================================================== */

    function limiteMaximo() {

        return Math.max(
            0,
            container.scrollWidth - area.clientWidth
        );

    }


    function limitarDeslocamento(valor) {

        return Math.max(
            0,
            Math.min(valor, limiteMaximo())
        );

    }


    /* =====================================================
       MOUSE - COMEÇAR
    ===================================================== */

    area.addEventListener("mousedown", (e) => {

        if (e.button !== 0) return;

        arrastando = true;

        inicioX = e.clientX;

        const transformacao =
            new DOMMatrix(getComputedStyle(container).transform);

        deslocamentoInicial =
            transformacao.m41 * -1;


        area.classList.add("arrastando");

    });


    /* =====================================================
       MOUSE - ARRASTAR
    ===================================================== */

    window.addEventListener("mousemove", (e) => {

        if (!arrastando) return;

        e.preventDefault();

        const distancia =
            e.clientX - inicioX;


        const novoDeslocamento =
            limitarDeslocamento(
                deslocamentoInicial - distancia
            );


        container.style.transform =
            `translateX(-${novoDeslocamento}px)`;

    });


    /* =====================================================
       MOUSE - SOLTAR
    ===================================================== */

    window.addEventListener("mouseup", () => {

        if (!arrastando) return;

        arrastando = false;

        area.classList.remove("arrastando");

    });


    /* =====================================================
       TOUCH
    ===================================================== */

    area.addEventListener("touchstart", (e) => {

        inicioX =
            e.touches[0].clientX;


        const transformacao =
            new DOMMatrix(getComputedStyle(container).transform);


        deslocamentoInicial =
            transformacao.m41 * -1;

    }, {
        passive: true
    });


    area.addEventListener("touchmove", (e) => {

        const distancia =
            e.touches[0].clientX - inicioX;


        const novoDeslocamento =
            limitarDeslocamento(
                deslocamentoInicial - distancia
            );


        container.style.transform =
            `translateX(-${novoDeslocamento}px)`;

    }, {
        passive: true
    });

});


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


const cards = document.querySelectorAll(".filmeAll");
const grid = document.querySelector(".movies-grid");

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