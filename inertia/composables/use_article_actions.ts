import { ref, computed } from 'vue'
import { useShare } from '@vueuse/core'
import { useToast } from './use_toast.js'

export interface SocialShareUrls {
  facebook: string
  twitter: string
  whatsapp: string
  telegram: string
  linkedin: string
}

export interface UseArticleActionsOptions {
  title: string
  excerpt: string | null
  slug: string
  initialLikeCount: number
}

/**
 * Composable for article sharing and like functionality
 */
export function useArticleActions(options: UseArticleActionsOptions) {
  const { title, excerpt, slug, initialLikeCount } = options
  const toast = useToast()

  // ==========================================================================
  // Share Functionality
  // ==========================================================================

  const { share, isSupported: isShareSupported } = useShare()

  const articleUrl = computed(() => `https://ogitu.com/artikel/${slug}`)

  const shareUrls = computed<SocialShareUrls>(() => {
    const url = encodeURIComponent(articleUrl.value)
    const encodedTitle = encodeURIComponent(title)
    const encodedText = encodeURIComponent(excerpt || title)

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodedTitle}&summary=${encodedText}`,
    }
  })

  const shareArticle = async () => {
    if (isShareSupported.value) {
      try {
        await share({
          title,
          text: excerpt || title,
          url: typeof globalThis.window !== 'undefined' ? globalThis.window.location.href : articleUrl.value,
        })
      } catch {
        // User cancelled or error - silently ignore
      }
    } else {
      await copyLink()
    }
  }

  const copyLink = async () => {
    try {
      const url = typeof globalThis.window !== 'undefined' ? globalThis.window.location.href : articleUrl.value
      if (typeof globalThis.navigator !== 'undefined' && globalThis.navigator.clipboard) {
        await globalThis.navigator.clipboard.writeText(url)
        toast.success('Link Disalin', 'Link artikel berhasil disalin ke clipboard')
      }
    } catch {
      toast.error('Gagal', 'Tidak dapat menyalin link')
    }
  }

  // ==========================================================================
  // Like Functionality
  // ==========================================================================

  const isLiked = ref(false)
  const localLikeCount = ref(initialLikeCount)

  const toggleLike = () => {
    isLiked.value = !isLiked.value
    localLikeCount.value += isLiked.value ? 1 : -1
    toast.success(isLiked.value ? 'Disukai!' : 'Batal menyukai', '')
  }

  return {
    // Share
    shareUrls,
    shareArticle,
    copyLink,
    isShareSupported,

    // Like
    isLiked,
    localLikeCount,
    toggleLike,
  }
}
