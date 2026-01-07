// Composable for countdown timer
import { ref, onUnmounted } from 'vue'
import type { Countdown } from '../types/home.js'

export function useCountdown(initialHours = 12, initialMinutes = 34, initialSeconds = 56) {
  const countdown = ref<Countdown>({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  })

  const interval = setInterval(() => {
    if (countdown.value.seconds > 0) {
      countdown.value.seconds--
    } else if (countdown.value.minutes > 0) {
      countdown.value.minutes--
      countdown.value.seconds = 59
    } else if (countdown.value.hours > 0) {
      countdown.value.hours--
      countdown.value.minutes = 59
      countdown.value.seconds = 59
    }
  }, 1000)

  onUnmounted(() => {
    clearInterval(interval)
  })

  const reset = (hours: number, minutes: number, seconds: number) => {
    countdown.value = { hours, minutes, seconds }
  }

  return {
    countdown,
    reset
  }
}
