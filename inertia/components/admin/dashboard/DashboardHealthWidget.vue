<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  message: string
  latency?: number
}

interface HealthData {
  timestamp: string
  uptime: number
  services: {
    database: HealthStatus
    redis: HealthStatus
    queue: HealthStatus
  }
  memory: {
    used: number
    total: number
    percentage: number
  }
}

const healthData = ref<HealthData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
let refreshInterval: ReturnType<typeof setInterval> | null = null

const fetchHealth = async () => {
  try {
    error.value = null
    const response = await fetch('/admin/api/health')
    const result = await response.json()

    if (result.success) {
      healthData.value = result.data
    } else {
      error.value = result.message || 'Failed to fetch health data'
    }
  } catch (err) {
    error.value = 'Failed to connect to server'
  } finally {
    loading.value = false
  }
}

const refreshHealth = async () => {
  await fetchHealth()
}

// Overall status
const overallStatus = computed(() => {
  if (!healthData.value) return 'unknown'
  const statuses = Object.values(healthData.value.services)
  if (statuses.some((s) => s.status === 'unhealthy')) return 'unhealthy'
  if (statuses.some((s) => s.status === 'degraded')) return 'degraded'
  return 'healthy'
})

// Status colors
const statusConfig = {
  healthy: {
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'i-heroicons-check-circle',
    label: 'Sehat',
  },
  degraded: {
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: 'i-heroicons-exclamation-triangle',
    label: 'Degradasi',
  },
  unhealthy: {
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: 'i-heroicons-x-circle',
    label: 'Tidak Sehat',
  },
  unknown: {
    color: 'text-gray-500',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/20',
    icon: 'i-heroicons-question-mark-circle',
    label: 'Unknown',
  },
}

const getStatusConfig = (status: string) => {
  return statusConfig[status as keyof typeof statusConfig] || statusConfig.unknown
}

// Format uptime
const formatUptime = (seconds: number) => {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (days > 0) return `${days}h ${hours}j ${minutes}m`
  if (hours > 0) return `${hours}j ${minutes}m`
  return `${minutes}m`
}

// Services list for iteration
const services = computed(() => {
  if (!healthData.value) return []
  return [
    {
      key: 'database',
      name: 'Database',
      icon: 'i-heroicons-circle-stack',
      ...healthData.value.services.database,
    },
    {
      key: 'redis',
      name: 'Redis',
      icon: 'i-heroicons-server',
      ...healthData.value.services.redis,
    },
    {
      key: 'queue',
      name: 'Queue',
      icon: 'i-heroicons-queue-list',
      ...healthData.value.services.queue,
    },
  ]
})

onMounted(() => {
  fetchHealth()
  // Auto-refresh every 30 seconds
  refreshInterval = setInterval(fetchHealth, 30000)
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
            class="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
          >
            <UIcon name="i-heroicons-heart" class="w-4 h-4 text-white" />
          </div>
          <h3 class="font-semibold text-slate-900 dark:text-white">System Health</h3>
        </div>
        <div class="flex items-center gap-2">
          <!-- Overall status badge -->
          <span
            v-if="healthData"
            :class="[
              'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
              getStatusConfig(overallStatus).bg,
              getStatusConfig(overallStatus).color,
            ]"
          >
            <UIcon :name="getStatusConfig(overallStatus).icon" class="w-3 h-3" />
            {{ getStatusConfig(overallStatus).label }}
          </span>
          <UButton
            icon="i-heroicons-arrow-path"
            color="neutral"
            variant="ghost"
            size="xs"
            :loading="loading"
            @click="refreshHealth"
          />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-4">
      <!-- Loading state -->
      <div v-if="loading && !healthData" class="flex items-center justify-center py-8">
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
          @click="refreshHealth"
        />
      </div>

      <!-- Health data -->
      <template v-else-if="healthData">
        <!-- Services Status -->
        <div class="space-y-2">
          <div
            v-for="service in services"
            :key="service.key"
            :class="[
              'flex items-center justify-between p-3 rounded-xl',
              getStatusConfig(service.status).bg,
              'border',
              getStatusConfig(service.status).border,
            ]"
          >
            <div class="flex items-center gap-3">
              <UIcon :name="service.icon" :class="['w-5 h-5', getStatusConfig(service.status).color]" />
              <div>
                <p class="font-medium text-sm text-slate-900 dark:text-white">{{ service.name }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ service.message }}</p>
              </div>
            </div>
            <div class="text-right">
              <UIcon
                :name="getStatusConfig(service.status).icon"
                :class="['w-5 h-5', getStatusConfig(service.status).color]"
              />
              <p v-if="service.latency" class="text-xs text-slate-400 mt-1">
                {{ service.latency }}ms
              </p>
            </div>
          </div>
        </div>

        <!-- Memory & Uptime -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Memory -->
          <div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <div class="flex items-center gap-2 mb-2">
              <UIcon name="i-heroicons-cpu-chip" class="w-4 h-4 text-slate-400" />
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Memory</span>
            </div>
            <div class="flex items-end gap-2">
              <span class="text-lg font-bold text-slate-900 dark:text-white">
                {{ healthData.memory.percentage }}%
              </span>
              <span class="text-xs text-slate-400 mb-0.5">
                {{ healthData.memory.used }}MB / {{ healthData.memory.total }}MB
              </span>
            </div>
            <div class="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                :class="[
                  'h-full rounded-full transition-all',
                  healthData.memory.percentage > 80
                    ? 'bg-red-500'
                    : healthData.memory.percentage > 60
                      ? 'bg-amber-500'
                      : 'bg-emerald-500',
                ]"
                :style="{ width: `${healthData.memory.percentage}%` }"
              />
            </div>
          </div>

          <!-- Uptime -->
          <div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <div class="flex items-center gap-2 mb-2">
              <UIcon name="i-heroicons-clock" class="w-4 h-4 text-slate-400" />
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Uptime</span>
            </div>
            <div class="flex items-end gap-2">
              <span class="text-lg font-bold text-slate-900 dark:text-white">
                {{ formatUptime(healthData.uptime) }}
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-2">Server aktif</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
