// Composable for scroll reveal animation
import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer: IntersectionObserver | null = null

  const observeElements = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer?.observe(el)
    })
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
