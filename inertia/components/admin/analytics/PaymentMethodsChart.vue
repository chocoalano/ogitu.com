<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import type { PaymentMethod } from '~/types/analytics'
import { formatCurrency, formatNumber } from '~/types/analytics'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  data: PaymentMethod[]
}

const props = defineProps<Props>()

const colors = [
  'rgb(59, 130, 246)',
  'rgb(16, 185, 129)',
  'rgb(251, 191, 36)',
  'rgb(139, 92, 246)',
  'rgb(236, 72, 153)',
  'rgb(249, 115, 22)',
]

const chartData = computed(() => ({
  labels: props.data.map((d) => d.method || 'Lainnya'),
  datasets: [
    {
      data: props.data.map((d) => d.total),
      backgroundColor: props.data.map((_, i) => colors[i % colors.length]),
      borderWidth: 0,
    },
  ],
}))

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
          const method = props.data[context.dataIndex]
          const percentage = ((context.parsed / context.dataset.data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1)
          return [
            `${context.label}: ${formatCurrency(context.parsed)}`,
            `${method.count} transaksi (${percentage}%)`,
          ]
        },
      },
    },
  },
}

const totalTransactions = computed(() =>
  props.data.reduce((sum, d) => sum + d.count, 0)
)

const totalAmount = computed(() =>
  props.data.reduce((sum, d) => sum + d.total, 0)
)
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Metode Pembayaran</h3>
        <div class="text-right text-sm text-gray-500">
          {{ formatNumber(totalTransactions) }} transaksi
        </div>
      </div>
    </template>
    <div class="h-64">
      <Pie v-if="data.length > 0" :data="chartData" :options="chartOptions" />
      <div v-else class="flex items-center justify-center h-full text-gray-500">
        Tidak ada data pembayaran
      </div>
    </div>
    <template #footer v-if="data.length > 0">
      <div class="text-center">
        <p class="text-sm text-gray-500">Total</p>
        <p class="text-lg font-bold text-green-600">{{ formatCurrency(totalAmount) }}</p>
      </div>
    </template>
  </UCard>
</template>
