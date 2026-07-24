/**
 * REEF — One Reef, One Voice
 * Scroll story, reusable crossfade, impact widgets (no backend)
 */

(function () {
  "use strict";

  // ─── Constants ───────────────────────────────────────────
  /** sq.m restored/year ≈ hours/month × 12 × 0.5 */
  const REEF_SQM_PER_HOUR_YEAR = 0.5 * 12;

  const ADOPT_COPY = {
    fragment: {
      title: "Adopt a Coral Fragment",
      body: "Your gift nurtures one coral fragment from nursery to reef. In 12–18 months, that single piece can become a living colony — the first color returning to a bleached city.",
    },
    dive: {
      title: "Sponsor a Dive Team",
      body: "One sponsored dive puts trained hands, boats, and gear on a restoration site. Teams plant dozens of fragments in a single outing and monitor the reef's recovery.",
    },
    star: {
      title: "Fund a Reef Star",
      body: "A Reef Star is a full metal restoration frame seeded with coral. It becomes a constellation of life — shelter for fish, a nursery for new growth, and a beacon of hope.",
    },
  };

  // ─── Ocean particles (hero) ──────────────────────────────
  function initOceanCanvas() {
    const canvas = document.getElementById("ocean-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(90, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => spawn());
    }

    function spawn(yReset) {
      return {
        x: Math.random() * w,
        y: yReset ? h + Math.random() * 40 : Math.random() * h,
        r: 0.6 + Math.random() * 2.4,
        vy: -(0.15 + Math.random() * 0.55),
        vx: (Math.random() - 0.5) * 0.25,
        a: 0.15 + Math.random() * 0.45,
        hue: 160 + Math.random() * 40,
      };
    }

    function frame() {
      if (reduced) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10 || p.x < -10 || p.x > w + 10) {
          Object.assign(p, spawn(true));
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 70%, 75%, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (!reduced) frame();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced) frame();
    });
  }

  // ─── Reusable scroll crossfade ───────────────────────────
  /**
   * One function powers both story acts:
   *   Act 2 — layer A healthy, layer B bleached  (color drains)
   *   Act 3 — layer A bleached, layer B planted  (color returns)
   * Scroll progress 0→1 fades layer B in over layer A.
   * Sticky viewport is pure CSS; this only drives opacity + side effects.
   */
  function createCrossfade({ section, layerB, onProgress, scrub = 0.45 }) {
    if (!section || !layerB) return null;
    layerB.style.opacity = "0";

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      return gsap.fromTo(
        layerB,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub,
            onUpdate: (self) => {
              if (typeof onProgress === "function") onProgress(self.progress);
            },
          },
        }
      );
    }

    // No-GSAP fallback: rAF scroll progress
    function tick() {
      const r = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      layerB.style.opacity = String(p);
      if (typeof onProgress === "function") onProgress(p);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    return null;
  }

  // ─── Act 2: silence / bleach ─────────────────────────────
  function initSilence() {
    const section = document.getElementById("silence");
    const layerB = document.getElementById("silence-bleached");
    const overlay = document.getElementById("drain-overlay");
    const headline = document.getElementById("silence-headline");
    const counterEl = document.getElementById("reef-counter");
    if (!section || !layerB) return;

    let lastCount = -1;

    createCrossfade({
      section,
      layerB,
      onProgress: (progress) => {
        if (overlay) {
          overlay.style.background = `rgba(8, 20, 32, ${progress * 0.35})`;
        }
        if (headline) {
          headline.style.filter = `saturate(${1 - progress * 0.85})`;
          const c = Math.round(247 - progress * 90);
          const g = Math.round(252 - progress * 50);
          headline.style.color = `rgb(${c}, ${g}, ${Math.round(255 - progress * 40)})`;
        }
        if (counterEl) {
          const n = Math.round(progress * 50);
          if (n !== lastCount) {
            lastCount = n;
            counterEl.textContent = String(n);
          }
        }
      },
    });
  }

  // ─── Act 3: turn / plant (same crossfade, story reversed) ─
  function initTurn() {
    const section = document.getElementById("turn");
    const layerB = document.getElementById("turn-alive");
    const orb = document.getElementById("glow-orb");
    if (!section || !layerB) return;

    createCrossfade({
      section,
      layerB,
      onProgress: (progress) => {
        if (orb) {
          const scale = 0.3 + progress * 2.2;
          orb.style.opacity = String(Math.min(1, progress * 1.4));
          orb.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
      },
    });
  }

  // ─── Reveal on scroll ────────────────────────────────────
  function initReveals() {
    if (typeof gsap === "undefined") {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll(".reveal").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => el.classList.add("in"),
        onEnterBack: () => el.classList.add("in"),
      });
    });
  }

  // ─── Hero body fade-in ───────────────────────────────────
  function initHero() {
    const body = document.getElementById("hero-body");
    if (body) {
      requestAnimationFrame(() => body.classList.add("visible"));
    }
  }

  // ─── Nav scroll state ────────────────────────────────────
  function initNav() {
    const nav = document.getElementById("site-nav");
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ─── Impact calculator ───────────────────────────────────
  function initCalculator() {
    const slider = document.getElementById("hours-slider");
    const hoursVal = document.getElementById("hours-value");
    const sqmOut = document.getElementById("sqm-output");
    if (!slider || !hoursVal || !sqmOut) return;

    function update() {
      const hours = Number(slider.value);
      hoursVal.textContent = String(hours);
      slider.setAttribute("aria-valuenow", String(hours));
      const sqm = Math.round(hours * REEF_SQM_PER_HOUR_YEAR);
      sqmOut.textContent = String(sqm);
    }

    slider.addEventListener("input", update);
    update();
  }

  // ─── Adopt modals ────────────────────────────────────────
  function initModals() {
    const backdrop = document.getElementById("modal-backdrop");
    const title = document.getElementById("modal-title");
    const body = document.getElementById("modal-body");
    const closeBtn = document.getElementById("modal-close");
    const actionBtn = document.getElementById("modal-action");
    if (!backdrop) return;

    let lastFocus = null;

    function open(key) {
      const copy = ADOPT_COPY[key];
      if (!copy) return;
      lastFocus = document.activeElement;
      title.textContent = copy.title;
      body.textContent = copy.body;
      backdrop.hidden = false;
      requestAnimationFrame(() => backdrop.classList.add("open"));
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function close() {
      backdrop.classList.remove("open");
      document.body.style.overflow = "";
      setTimeout(() => {
        backdrop.hidden = true;
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }, 300);
    }

    document.querySelectorAll(".learn-more").forEach((btn) => {
      btn.addEventListener("click", () => open(btn.dataset.modal));
    });

    closeBtn?.addEventListener("click", close);
    actionBtn?.addEventListener("click", () => {
      close();
      showToast("Welcome to REEF — check your inbox 🌊");
    });

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop.classList.contains("open")) close();
    });
  }

  // ─── Volunteer form + toast ──────────────────────────────
  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("show"));
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.hidden = true;
      }, 400);
    }, 3200);
  }

  function initForm() {
    const form = document.getElementById("volunteer-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#vol-name");
      const email = form.querySelector("#vol-email");
      if (!name.value.trim() || !email.value.trim() || !email.checkValidity()) {
        form.reportValidity();
        return;
      }
      showToast("Welcome to REEF — check your inbox 🌊");
      form.reset();
    });
  }

  // ─── Boot ────────────────────────────────────────────────
  function boot() {
    initOceanCanvas();
    initHero();
    initNav();
    initCalculator();
    initModals();
    initForm();

    initSilence();
    initTurn();
    initReveals();
    if (typeof ScrollTrigger !== "undefined") {
      window.addEventListener("load", () => ScrollTrigger.refresh());
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
