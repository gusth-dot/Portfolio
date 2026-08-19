const slidesEl = document.getElementById('slides');
const carousel = document.getElementById('carousel');
const year = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const downloadBtn = document.getElementById('downloadBtn');

year.textContent = new Date().getFullYear();

/* =========================
   BLOQUEAR DRAG NATIVO
========================= */
slidesEl.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

/* =========================
   CAROUSEL SMOOTH
========================= */

let isDown = false;
let startX = 0;

let current = 0;
let target = 0;
let velocity = 0;
let dragPreventClick = false;

const gap = 14;
const slideWidth = 280 + gap;

/* limite */
function getMaxScroll(){
  return -(slidesEl.scrollWidth - carousel.offsetWidth);
}

/* animação */
function animate(){
  current += (target - current) * 0.15;

  const maxScroll = getMaxScroll();

  if (current > 0) current = 0;
  if (current < maxScroll) current = maxScroll;

  slidesEl.style.transform = `translateX(${current}px)`;

  requestAnimationFrame(animate);
}
animate();

/* iniciar drag */
slidesEl.addEventListener('pointerdown', (e) => {
  if (e.button && e.button !== 0) return;

  isDown = true;
  slidesEl.classList.add('dragging');

  startX = e.clientX;
  dragPreventClick = false;
});

/* arrastar */
slidesEl.addEventListener('pointermove', (e) => {
  if (!isDown) return;

  const dx = e.clientX - startX;

  target += dx * 0.9;
  startX = e.clientX;

  velocity = dx;

  if (Math.abs(dx) > 5) {
    dragPreventClick = true;
  }
});

/* soltar */
function endDrag(){
  if (!isDown) return;

  isDown = false;

  target += velocity * 3;
}

slidesEl.addEventListener('pointerup', endDrag);
slidesEl.addEventListener('pointerleave', endDrag);
slidesEl.addEventListener('pointercancel', endDrag);

/* impedir clique ao arrastar */
slidesEl.addEventListener('click', (e) => {
  if (dragPreventClick) {
    e.preventDefault();
    e.stopPropagation();
    dragPreventClick = false;
  }
});

/* =========================
   BOTÕES
========================= */

function scrollSlides(dir){
  target -= dir * slideWidth;
}

document.querySelectorAll('.chev').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    scrollSlides(Number(btn.dataset.dir));
  });
});

/* =========================
   FORM
========================= */

contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  const btn = contactForm.querySelector('.primary');
  const prev = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(()=>{
    btn.textContent = 'Sent ✓';

    setTimeout(()=>{
      btn.textContent = prev;
      btn.disabled = false;
      contactForm.reset();
    }, 1200);

  }, 900);
});

/* =========================
   DOWNLOAD
========================= */

downloadBtn.addEventListener('click', ()=>{
  window.open('https://example.com/resume.pdf', '_blank', 'noopener');
});

/* =========================
   ACESSIBILIDADE
========================= */

carousel.setAttribute('role','region');
carousel.setAttribute('aria-roledescription','carousel');