let lastScroll = 0;

const cabecalho = document.getElementById("cabecalho");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Descendo
  if (currentScroll > lastScroll) {
    cabecalho.classList.add("hide");
  }
  // Subindo
  else {
    cabecalho.classList.remove("hide");
  }

  lastScroll = currentScroll;
});


// =========================
// TEMA CLARO / ESCURO
// =========================

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


// =========================
// BOTÃO "MAIS NOTÍCIAS"
// =========================

const botoes = document.querySelectorAll(".btn-toggle");

botoes.forEach((btn) => {

  btn.addEventListener("click", () => {

    const alvo = document.getElementById(btn.dataset.target);

    if (getComputedStyle(alvo).display === "none") {

      alvo.style.display = "grid";
      btn.textContent = "Mostrar menos";

    } else {

      alvo.style.display = "none";
      btn.textContent = "Mais notícias";

    }

  });

});


// =========================
// MENU MOBILE
// =========================

const toggle = document.querySelector(".menu-toggle");
const header = document.querySelector("#cabecalho");

toggle.addEventListener("click", () => {
  header.classList.toggle("active");
});


// =========================
// DROPDOWN MOBILE
// =========================

document.querySelectorAll(".menu-item").forEach(item => {

  item.addEventListener("click", () => {

    if (window.innerWidth <= 900) {
      item.classList.toggle("active");
    }

  });

});