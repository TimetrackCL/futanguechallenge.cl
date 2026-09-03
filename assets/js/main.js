/* Futangue Challenge 2027 — interacciones de la landing */
(function () {
  'use strict';

  var header = document.getElementById('header');
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('menu');
  if (!header || !toggle || !menu) return;

  /* ---- header sólido al hacer scroll ---- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      header.classList.toggle('is-scrolled', window.scrollY > 80);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- menú móvil ---- */
  function setMenu(open) {
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
  }

  toggle.addEventListener('click', function () {
    setMenu(!header.classList.contains('is-open'));
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* al volver a desktop el overlay no debe quedar bloqueando el scroll */
  var desktop = window.matchMedia('(min-width: 901px)');
  var onChange = function (e) { if (e.matches) setMenu(false); };
  if (desktop.addEventListener) desktop.addEventListener('change', onChange);
  else desktop.addListener(onChange);

  /* ---- lightbox de mapas de circuito ---- */
  var modal = document.getElementById('mapModal');
  if (!modal || typeof modal.showModal !== 'function') return;

  var modalImg = document.getElementById('mapModalImg');
  var modalTitle = document.getElementById('mapModalTitle');
  var modalFull = document.getElementById('mapModalFull');
  var lastTrigger = null;

  document.querySelectorAll('[data-map]').forEach(function (el) {
    el.addEventListener('click', function () {
      lastTrigger = el;
      modalTitle.textContent = el.dataset.label;
      modalImg.src = el.dataset.map;
      modalImg.alt = 'Mapa del ' + el.dataset.label;
      modalFull.href = el.dataset.map;
      document.body.classList.add('is-locked');
      modal.showModal();
    });
  });

  document.getElementById('mapModalClose').addEventListener('click', function () {
    modal.close();
  });

  /* clic fuera del panel cierra */
  modal.addEventListener('click', function (e) {
    if (!e.target.closest('.lightbox__panel')) modal.close();
  });

  /* close() también lo dispara Escape */
  modal.addEventListener('close', function () {
    document.body.classList.remove('is-locked');
    modalImg.removeAttribute('src');
    modalImg.alt = '';
    if (lastTrigger) lastTrigger.focus();
  });
})();
