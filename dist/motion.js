/* Lucide icons, ISC license, https://lucide.dev */
const trustPaths = {
  'NATIONWIDE DELIVERY': '<path d="M10 17h4V5H2v12h3"/><path d="M14 9h4l4 4v4h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>',
  'SECURE PAYMENTS': '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11"/><path d="m9 12 2 2 4-4"/>',
  'EASY RETURNS': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  'APPROVED REVIEWS': '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>'
};
let stopSiteMotion = () => {};
window.setupSiteMotion = () => {
  stopSiteMotion();
  document.querySelectorAll('[data-trust-icon]').forEach(el => {
    el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${trustPaths[el.dataset.trustIcon] || ''}</svg>`;
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
  }), {threshold: .08});
  document.querySelectorAll('.section-head,.categories,.trust>div,.card,.panel,.feature-story,.journal-list article,.runway-products article').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', `${Math.min(i % 5 * 65, 260)}ms`);
    el.classList.add('reveal'); observer.observe(el);
  });
  const row = document.querySelector('.featured-scroll');
  let frame = 0, last = 0, hover = false, focused = false, touchUntil = 0, visible = false;
  let rowObserver;
  if (row) {
    rowObserver = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; });
    rowObserver.observe(row);
    const track = row.querySelector('.products');
    const originals = [...track.children];
    originals.forEach(el => {
      const clone = el.cloneNode(true);
      clone.classList.remove("reveal"); clone.classList.add("revealed");
      clone.setAttribute('aria-hidden', 'true'); clone.inert = true;
      clone.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
      track.append(clone);
    });
    row.onmouseenter = () => hover = true;
    row.onmouseleave = () => hover = false;
    row.onfocusin = () => focused = true;
    row.onfocusout = e => focused = row.contains(e.relatedTarget);
    row.onpointerdown = () => touchUntil = performance.now() + 5000;
    row.onwheel = () => touchUntil = performance.now() + 5000;
    let position = row.scrollLeft;
    
    const tick = now => {
      const dt = last ? Math.min(now - last, 50) : 0; last = now;
      if (!reduced.matches && visible && !document.hidden && !hover && !focused && now > touchUntil) {
        const distance = track.children[originals.length].offsetLeft - track.children[0].offsetLeft;
        position += dt * .025;
        if (distance > 0 && position >= distance) position -= distance;
        
        row.scrollLeft = position;
      } else { position = row.scrollLeft; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }
  stopSiteMotion = () => { cancelAnimationFrame(frame); observer.disconnect(); rowObserver?.disconnect(); };
};
