<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import type { SalesByStatus } from '~/types/analytics'
import { orderStatusLabels } from '~/types/analytics'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  data: SalesByStatus
}

const props = defineProps<Props>()

const statusColors: Record<string, string> = {
  pending_payment: 'rgb(251, 191, 36)',
  paid: 'rgb(16, 185, 129)',
  processing: 'rgb(59, 130, 246)',
  shipped: 'rgb(139, 92, 246)',
  delivered: 'rgb(34, 197, 94)',
  cancelled: 'rgb(239, 68, 68)',
}

const chartData = computed(() => {
  const labels: string[] = []
  const values: number[] = []
  const colors: string[] = []

  Object.entries(props.data).forEach(([key, value]) => {
    if (value > 0) {
      labels.push(orderStatusLabels[key] || key)
      values.push(value)
      colors.push(statusColors[key] || 'rgb(156, 163, 175)')
    }
  })

  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((context.parsed / total) * 100).toFixed(1)
          return `${context.label}: ${context.parsed} (${percentage}%)`
        },
      },
    },
  },
}

const totalOrders = computed(() =>
  Object.values(props.data).reduce((sum, val) => sum + val, 0)
)
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Pesanan Berdasarkan Status</h3>
        <UBadge color="gray" variant="soft">
          Total: {{ totalOrders }}
        </UBadge>
      </div>
    </template>
    <div class="h-64">
      <Doughnut v-if="totalOrders > 0" :data="chartData" :options="chartOptions" />
      <div v-else class="flex items-center justify-center h-full text-gray-500">
        Tidak ada data pesanan
      </div>
    </div>
  </UCard>
</template>
