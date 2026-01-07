<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface QueueStats {
  email: {
    waiting: number
    active: number
    completed: number
    failed: number
    delayed: number
    isPaused: boolean
  }
  totals: {
    totalJobs: number
    successRate: number
    failedJobs: number
  }
}

interface FailedJob {
  id: string
  name: string
  data: Record<string, unknown>
  failedReason: string
  attemptsMade: number
  processedOn: number
  finishedOn: number
}

const props = defineProps<{
  isSuperAdmin?: boolean
}>()

const queueStats = ref<QueueStats | null>(null)
const failedJobs = ref<FailedJob[]>([])
const loading = ref(true)
const actionLoading = ref(false)
const error = ref<string | null>(null)
const showFailedJobs = ref(false)
let refreshInterval: ReturnType<typeof setInterval> | null = null

const fetchQueueStats = async () => {
  try {
    error.value = null
    const response = await fetch('/admin/api/queue-stats')
    const result = await response.json()

    if (result.success) {
      queueStats.value = result.data
    } else {
      error.value = result.message || 'Failed to fetch queue stats'
    }
  } catch (err) {
    error.value = 'Failed to connect to server'
  } finally {
    loading.value = false
  }
}

const fetchFailedJobs = async () => {
  try {
    const response = await fetch('/admin/queue/email/failed')
    const result = await response.json()

    if (result.success) {
      failedJobs.value = result.data
    }
  } catch (err) {
    console.error('Failed to fetch failed jobs:', err)
  }
}

const retryJob = async (jobId: string) => {
  if (!props.isSuperAdmin) return

  actionLoading.value = true
  try {
    const response = await fetch(`/admin/queue/email/retry/${jobId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()

    if (result.success) {
      await fetchQueueStats()
      await fetchFailedJobs()
    }
  } catch (err) {
    console.error('Failed to retry job:', err)
  } finally {
    actionLoading.value = false
  }
}

const removeJob = async (jobId: string) => {
  if (!props.isSuperAdmin) return

  actionLoading.value = true
  try {
    const response = await fetch(`/admin/queue/email/job/${jobId}`, {
      method: 'DELETE',
    })
    const result = await response.json()

    if (result.success) {
      await fetchQueueStats()
      await fetchFailedJobs()
    }
  } catch (err) {
    console.error('Failed to remove job:', err)
  } finally {
    actionLoading.value = false
  }
}

const toggleQueuePause = async () => {
  if (!props.isSuperAdmin || !queueStats.value) return

  actionLoading.value = true
  const action = queueStats.value.email.isPaused ? 'resume' : 'pause'

  try {
    const response = await fetch(`/admin/queue/email/${action}`, {
      method: 'POST',
    })
    const result = await response.json()

    if (result.success) {
      await fetchQueueStats()
    }
  } catch (err) {
    console.error(`Failed to ${action} queue:`, err)
  } finally {
    actionLoading.value = false
  }
}

const cleanQueue = async () => {
  if (!props.isSuperAdmin) return

  actionLoading.value = true
  try {
    const response = await fetch('/admin/queue/email/clean', {
      method: 'POST',
    })
    const result = await response.json()

    if (result.success) {
      await fetchQueueStats()
      await fetchFailedJobs()
    }
  } catch (err) {
    console.error('Failed to clean queue:', err)
  } finally {
    actionLoading.value = false
  }
}

// Queue status indicator
const queueStatus = computed(() => {
  if (!queueStats.value) return 'unknown'
  if (queueStats.value.email.isPaused) return 'paused'
  if (queueStats.value.email.failed > 0) return 'warning'
  if (queueStats.value.email.active > 0) return 'processing'
  return 'idle'
})

const statusConfig = {
  processing: {
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'i-heroicons-arrow-path',
    label: 'Processing',
    animate: true,
  },
  idle: {
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'i-heroicons-check-circle',
    label: 'Idle',
    animate: false,
  },
  warning: {
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: 'i-heroicons-exclamation-triangle',
    label: 'Warning',
    animate: false,
  },
  paused: {
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    icon: 'i-heroicons-pause-circle',
    label: 'Paused',
    animate: false,
  },
  unknown: {
    color: 'text-gray-500',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/20',
    icon: 'i-heroicons-question-mark-circle',
    label: 'Unknown',
    animate: false,
  },
}

const currentStatusConfig = computed(() => {
  return statusConfig[queueStatus.value as keyof typeof statusConfig] || statusConfig.unknown
})

onMounted(() => {
  fetchQueueStats()
  if (props.isSuperAdmin) {
    fetchFailedJobs()
  }
  // Auto-refresh every 15 seconds
  refreshInterval = setInterval(() => {
    fetchQueueStats()
    if (props.isSuperAdmin && showFailedJobs.value) {
      fetchFailedJobs()
    }
  }, 15000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<template>
  <div
    class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
  >
    <!-- Header -->
    <div class="p-4 border-b border-slate-200 dark:border-slate-800">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center"
          >
            <UIcon name="i-heroicons-queue-list" class="w-4 h-4 text-white" />
          </div>
          <h3 class="font-semibold text-slate-900 dark:text-white">Email Queue</h3>
        </div>
        <div class="flex items-center gap-2">
          <!-- Status badge -->
          <span
            v-if="queueStats"
            :class="[
              'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
              currentStatusConfig.bg,
              currentStatusConfig.color,
            ]"
          >
            <UIcon
              :name="currentStatusConfig.icon"
              :class="['w-3 h-3', currentStatusConfig.animate ? 'animate-spin' : '']"
            />
            {{ currentStatusConfig.label }}
          </span>
          <UButton
            icon="i-heroicons-arrow-path"
            color="neutral"
            variant="ghost"
            size="xs"
            :loading="loading"
            @click="fetchQueueStats"
          />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-4">
      <!-- Loading state -->
      <div v-if="loading && !queueStats" class="flex items-center justify-center py-8">
        <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 text-slate-400 animate-spin" />
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center py-6 text-center"
      >
        <UIcon name="i-heroicons-exclamation-circle" class="w-10 h-10 text-red-400 mb-2" />
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ error }}</p>
        <UButton
          label="Coba Lagi"
          color="primary"
          variant="ghost"
          size="xs"
          class="mt-2"
          @click="fetchQueueStats"
        />
      </div>

      <!-- Queue Stats -->
      <template v-else-if="queueStats">
        <!-- Stats Grid -->
        <div class="grid grid-cols-3 gap-2">
          <div class="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-center">
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ queueStats.email.waiting }}
            </p>
            <p class="text-xs text-blue-500/80 dark:text-blue-400/80">Menunggu</p>
          </div>
          <div class="p-3 bg-violet-50 dark:bg-violet-500/10 rounded-xl text-center">
            <p class="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {{ queueStats.email.active }}
            </p>
            <p class="text-xs text-violet-500/80 dark:text-violet-400/80">Aktif</p>
          </div>
          <div class="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-center">
            <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {{ queueStats.email.completed }}
            </p>
            <p class="text-xs text-emerald-500/80 dark:text-emerald-400/80">Selesai</p>
          </div>
        </div>

        <!-- Additional stats -->
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600 dark:text-slate-400">Success Rate</span>
              <span
                :class="[
                  'text-sm font-bold',
                  queueStats.totals.successRate >= 90
                    ? 'text-emerald-500'
                    : queueStats.totals.successRate >= 70
                      ? 'text-amber-500'
                      : 'text-red-500',
                ]"
              >
                {{ queueStats.totals.successRate }}%
              </span>
            </div>
            <div class="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                :class="[
                  'h-full rounded-full transition-all',
                  queueStats.totals.successRate >= 90
                    ? 'bg-emerald-500'
                    : queueStats.totals.successRate >= 70
                      ? 'bg-amber-500'
                      : 'bg-red-500',
                ]"
                :style="{ width: `${queueStats.totals.successRate}%` }"
              />
            </div>
          </div>

          <div class="p-3 bg-red-50 dark:bg-red-500/10 rounded-xl">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600 dark:text-slate-400">Failed</span>
              <span class="text-sm font-bold text-red-500">
                {{ queueStats.email.failed }}
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-2">
              {{ queueStats.email.delayed }} tertunda
            </p>
          </div>
        </div>

        <!-- SuperAdmin Actions -->
        <div v-if="isSuperAdmin" class="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-700">
          <p class="text-xs font-medium text-slate-500 uppercase">Queue Management</p>

          <div class="flex flex-wrap gap-2">
            <UButton
              :icon="queueStats.email.isPaused ? 'i-heroicons-play' : 'i-heroicons-pause'"
              :label="queueStats.email.isPaused ? 'Resume' : 'Pause'"
              :color="queueStats.email.isPaused ? 'success' : 'warning'"
              variant="soft"
              size="xs"
              :loading="actionLoading"
              @click="toggleQueuePause"
            />
            <UButton
              icon="i-heroicons-trash"
              label="Clean"
              color="neutral"
              variant="soft"
              size="xs"
              :loading="actionLoading"
              @click="cleanQueue"
            />
            <UButton
              v-if="queueStats.email.failed > 0"
              icon="i-heroicons-eye"
              :label="`Failed (${queueStats.email.failed})`"
              color="error"
              variant="soft"
              size="xs"
              @click="showFailedJobs = !showFailedJobs"
            />
          </div>

          <!-- Failed Jobs List -->
          <div
            v-if="showFailedJobs && failedJobs.length > 0"
            class="mt-3 space-y-2 max-h-48 overflow-y-auto"
          >
            <div
              v-for="job in failedJobs"
              :key="job.id"
              class="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-xs"
            >
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-slate-700 dark:text-slate-300 truncate">
                    {{ job.name }}
                  </p>
                  <p class="text-red-500 truncate">{{ job.failedReason }}</p>
                  <p class="text-slate-400">Attempts: {{ job.attemptsMade }}</p>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                  <UButton
                    icon="i-heroicons-arrow-path"
                    color="primary"
                    variant="ghost"
                    size="xs"
                    :loading="actionLoading"
                    @click="retryJob(job.id)"
                  />
                  <UButton
                    icon="i-heroicons-trash"
                    color="error"
                    variant="ghost"
                    size="xs"
                    :loading="actionLoading"
                    @click="removeJob(job.id)"
                  />
                </div>
              </div>
            </div>
          </div>

          <p
            v-else-if="showFailedJobs && failedJobs.length === 0"
            class="text-sm text-slate-400 text-center py-2"
          >
            Tidak ada job yang gagal
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
