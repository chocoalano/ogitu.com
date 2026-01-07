import { ref, onMounted, onUnmounted } from 'vue'
import type { TOCItem } from '../types/article.js'

/**
 * Composable for Table of Contents navigation with active heading tracking
 */
export function useTableOfContents() {
  const activeHeadingId = ref('')
  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    if (typeof globalThis.IntersectionObserver === 'undefined') return

    observer = new globalThis.IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            activeHeadingId.value = entry.target.id
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    // Observe all headings after a brief delay for render
    setTimeout(() => {
      if (typeof globalThis.document === 'undefined') return
      const contentEl = globalThis.document.querySelector('.article-content')
      if (contentEl) {
        const headings = contentEl.querySelectorAll('h1, h2, h3, h4')
        headings.forEach((heading: Element) => {
          if (heading.id) observer?.observe(heading)
        })
      }
    }, 200)
  }

  const scrollToHeading = (id: string) => {
    if (typeof globalThis.document === 'undefined') return
    const element = globalThis.document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      activeHeadingId.value = id
    }
  }

  const getHeadingClass = (heading: TOCItem) => {
    const baseClass = heading.level === 3 ? 'pl-4' : ''
    const activeClass =
      activeHeadingId.value === heading.id
        ? 'text-primary-500 font-medium'
        : 'text-gray-600 dark:text-gray-400 hover:text-primary-500'

    return `${baseClass} ${activeClass}`.trim()
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    activeHeadingId,
    scrollToHeading,
    getHeadingClass,
  }
}
