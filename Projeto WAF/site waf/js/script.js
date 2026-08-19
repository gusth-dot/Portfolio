const faders = document.querySelectorAll('.fade');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 }); // 0.2 = começa o efeito quando 20% do elemento aparece

  faders.forEach(fade => observer.observe(fade));