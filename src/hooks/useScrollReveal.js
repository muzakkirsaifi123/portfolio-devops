import {useEffect} from "react";

/**
 * Scroll-event based reveal — more reliable than IntersectionObserver
 * on React 16 + webpack 4 setups.
 *
 * Adds class "revealed" to every [data-reveal] element whose top edge
 * has scrolled into the top 92% of the viewport.
 */
export default function useScrollReveal() {
  useEffect(() => {
    function revealVisible() {
      const vh = window.innerHeight;
      const pending = document.querySelectorAll("[data-reveal]:not(.revealed)");
      pending.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < vh * 0.92) {
          el.classList.add("revealed");
        }
      });
    }

    // Run immediately (reveals anything already on screen)
    revealVisible();
    // Run again after a short delay so Lottie / lazy content is in DOM
    const t = setTimeout(revealVisible, 300);

    window.addEventListener("scroll", revealVisible, {passive: true});
    window.addEventListener("resize", revealVisible, {passive: true});

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", revealVisible);
      window.removeEventListener("resize", revealVisible);
    };
  }, []);
}
