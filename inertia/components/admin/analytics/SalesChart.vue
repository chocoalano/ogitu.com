<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import type { DailySale } from '~/types/analytics'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Props {
  data: DailySale[]
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.data.map((d) =>
    new Date(d.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  ),
  datasets: [
    {
      label: 'Pendapatan',
      data: props.data.map((d) => d.revenue),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      yAxisID: 'y',
    },
    {
      label: 'Pesanan',
      data: props.data.map((d) => d.orders),
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: false,
      tension: 0.4,
      yAxisID: 'y1',
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || ''
          if (label) {
            label += ': '
          }
          if (context.parsed.y !== null) {
            if (context.datasetIndex === 0) {
              label += new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(context.parsed.y)
            } else {
              label += context.parsed.y + ' pesanan'
            }
          }
          return label
        },
      },
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      title: {
        display: true,
        text: 'Pendapatan (Rp)',
      },
      ticks: {
        callback: function (value: any) {
          return 'Rp ' + new Intl.NumberFormat('id-ID').format(value)
        },
      },
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      title: {
        display: true,
        text: 'Jumlah Pesanan',
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold">Grafik Penjualan</h3>
    </template>
    <div class="h-80">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </UCard>
</template>
