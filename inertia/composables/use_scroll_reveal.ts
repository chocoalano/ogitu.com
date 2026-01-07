// Composable for scroll reveal animation
import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer: IntersectionObserver | null = null

  const observeElements = () => {
    if (typeof globalThis.IntersectionObserver === 'undefined') return

    observer = new globalThis.IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (typeof globalThis.document !== 'undefined') {
      globalThis.document.querySelectorAll('.scroll-reveal').forEach((el: Element) => {
        observer?.observe(el)
      })
    }
  }

  onMounted(() => {
    // Small delay to ensure DOM is ready
    setTimeout(observeElements, 100)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    observeElements,
  }
}
