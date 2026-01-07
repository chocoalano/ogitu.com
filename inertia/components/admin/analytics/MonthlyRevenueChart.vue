<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { MonthlyRevenue } from '~/types/analytics'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  data: MonthlyRevenue[]
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.data.map((d) => d.month),
  datasets: [
    {
      label: 'Pendapatan',
      data: props.data.map((d) => d.revenue),
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(context.parsed.y)
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value: any) {
          return 'Rp ' + new Intl.NumberFormat('id-ID').format(value)
        },
      },
    },
  },
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold">Pendapatan Bulanan</h3>
    </template>
    <div class="h-80">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </UCard>
</template>
