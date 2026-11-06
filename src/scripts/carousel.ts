// Shared behaviour for every [data-carousel] (see src/components/Carousel.astro).
// Scroll-snap track + prev/next + dots + counter + keyboard + optional autoplay.
// Touch/swipe is native scrolling. Autoplay is disabled under prefers-reduced-motion.

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initCarousel(root: HTMLElement) {
  if (root.dataset.ready) return;
  root.dataset.ready = 'true';

  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  if (!track) return;
  const slides = Array.from(track.children) as HTMLElement[];
  const n = slides.length;
  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
  const dotsWrap = root.querySelector<HTMLElement>('[data-carousel-dots]');
  const counter = root.querySelector<HTMLElement>('[data-carousel-counter]');
  const pauseBtn = root.querySelector<HTMLButtonElement>('[data-carousel-pause]');
  const loop = root.hasAttribute('data-loop');
  const interval = Number(root.dataset.autoplay || 0);

  slides.forEach((s, i) => {
    s.setAttribute('role', 'group');
    s.setAttribute('aria-roledescription', 'slide');
    s.setAttribute('aria-label', `${i + 1} of ${n}`);
  });

  if (n <= 1) {
    root.querySelectorAll<HTMLElement>('[data-carousel-controls]').forEach((el) => (el.hidden = true));
    return;
  }

  const step = () => (slides[1].offsetLeft - slides[0].offsetLeft) || track.clientWidth;
  const visible = () => Math.max(1, Math.round((track.clientWidth + 1) / step()));
  const maxIndex = () => Math.max(0, n - visible());
  const current = () => Math.min(maxIndex(), Math.round(track.scrollLeft / step()));

  const goTo = (i: number) => {
    const max = maxIndex();
    if (loop) i = i > max ? 0 : i < 0 ? max : i;
    else i = Math.max(0, Math.min(max, i));
    track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: reduceMotion() ? 'auto' : 'smooth' });
  };

  let dots: HTMLButtonElement[] = [];
  const buildDots = () => {
    if (!dotsWrap) return;
    const count = maxIndex() + 1;
    if (dots.length === count) return;
    dotsWrap.innerHTML = '';
    dots = Array.from({ length: count }, (_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'carousel-dot';
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      b.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(b);
      return b;
    });
  };

  const update = () => {
    const i = current();
    const max = maxIndex();
    dots.forEach((d, j) => d.setAttribute('aria-current', j === i ? 'true' : 'false'));
    if (counter) counter.textContent = `${i + 1} / ${max + 1}`;
    if (!loop) {
      if (prev) prev.disabled = i <= 0;
      if (next) next.disabled = i >= max;
    }
  };

  let raf = 0;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
  }, { passive: true });
  prev?.addEventListener('click', () => goTo(current() - 1));
  next?.addEventListener('click', () => goTo(current() + 1));

  root.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement;
    if (t.matches('input, textarea, select')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current() - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current() + 1); }
  });

  new ResizeObserver(() => { buildDots(); update(); }).observe(track);
  buildDots();
  update();

  // ---- Autoplay (testimonials). Pauses on hover/focus/hidden tab; user can stop it. ----
  if (interval > 0 && !reduceMotion()) {
    let timer = 0;
    let userPaused = false;
    let hover = false;
    let focus = false;
    const running = () => !userPaused && !hover && !focus && !document.hidden;
    const sync = () => {
      window.clearInterval(timer);
      track.setAttribute('aria-live', running() ? 'off' : 'polite');
      if (running()) timer = window.setInterval(() => goTo(current() + 1 > maxIndex() ? 0 : current() + 1), interval);
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-pressed', String(userPaused));
        pauseBtn.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
        pauseBtn.querySelector('[data-icon-pause]')?.toggleAttribute('hidden', userPaused);
        pauseBtn.querySelector('[data-icon-play]')?.toggleAttribute('hidden', !userPaused);
      }
    };
    root.addEventListener('mouseenter', () => { hover = true; sync(); });
    root.addEventListener('mouseleave', () => { hover = false; sync(); });
    root.addEventListener('focusin', () => { focus = true; sync(); });
    root.addEventListener('focusout', (e) => {
      if (!root.contains(e.relatedTarget as Node)) { focus = false; sync(); }
    });
    track.addEventListener('pointerdown', () => { userPaused = true; sync(); });
    document.addEventListener('visibilitychange', sync);
    pauseBtn?.addEventListener('click', () => { userPaused = !userPaused; sync(); });
    if (pauseBtn) pauseBtn.hidden = false;
    sync();
  }
}

export function initCarousels() {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(initCarousel);
}
