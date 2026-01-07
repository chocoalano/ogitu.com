<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import type {
  AdminOrder,
  OrderStats,
  StatusOption,
  Courier,
  OrderPagination,
  ShippingFormData,
} from '~/types/admin_order'
import { useOrderActions } from '~/composables/use_order_actions'

// Components
import OrderStatsCards from '~/components/admin/orders/OrderStatsCards.vue'
import OrderFilters from '~/components/admin/orders/OrderFilters.vue'
import OrderList from '~/components/admin/orders/OrderList.vue'
import ShippingModal from '~/components/admin/orders/ShippingModal.vue'
import CancelModal from '~/components/admin/orders/CancelModal.vue'

defineOptions({
  layout: AdminLayout,
})

// Props
interface PaginatedOrders {
  data: AdminOrder[]
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    firstPageUrl: string | null
    lastPageUrl: string | null
    nextPageUrl: string | null
    previousPageUrl: string | null
  }
}

interface Props {
  admin?: {
    id: number
    storeName: string
    cityId: string
    districtId: string
  }
  orders?: PaginatedOrders | AdminOrder[]
  pagination?: OrderPagination
  stats?: OrderStats
  filters?: {
    status: string
    search: string
    sortBy: string
    sortOrder: string
  }
  couriers?: Courier[]
  statusOptions?: StatusOption[]
}

const props = withDefaults(defineProps<Props>(), {
  admin: () => ({ id: 0, storeName: '', cityId: '', districtId: '' }),
  orders: () => ({ data: [], meta: { total: 0, perPage: 10, currentPage: 1, lastPage: 1, firstPage: 1, firstPageUrl: null, lastPageUrl: null, nextPageUrl: null, previousPageUrl: null } }),
  pagination: () => ({ currentPage: 1, lastPage: 1, total: 0, perPage: 10 }),
  stats: () => ({ total: 0, pendingPayment: 0, paid: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, needsAction: 0 }),
  filters: () => ({ status: '', search: '', sortBy: 'created_at', sortOrder: 'desc' }),
  couriers: () => [],
  statusOptions: () => [],
})

// Computed to handle both array and paginated object formats
const ordersList = computed(() => {
  if (Array.isArray(props.orders)) {
    return props.orders
  }
  return props.orders?.data ?? []
})

const paginationData = computed(() => {
  if (Array.isArray(props.orders)) {
    return props.pagination
  }
  const meta = (props.orders as PaginatedOrders)?.meta
  return {
    currentPage: meta?.currentPage ?? 1,
    lastPage: meta?.lastPage ?? 1,
    total: meta?.total ?? 0,
    perPage: meta?.perPage ?? 10,
    hasNextPage: meta?.nextPageUrl !== null,
    hasPrevPage: meta?.previousPageUrl !== null,
  }
})

// Computed for pagination display
const paginationInfo = computed(() => {
  const current = paginationData.value.currentPage
  const perPage = paginationData.value.perPage
  const total = paginationData.value.total

  const start = total === 0 ? 0 : (current - 1) * perPage + 1
  const end = Math.min(current * perPage, total)

  return { start, end, total }
})

// Show pagination only if more than one page
const showPagination = computed(() => paginationData.value.lastPage > 1)

// Composables
const { processOrder, submitShipping, cancelOrder, reloadOrders } = useOrderActions()

// Filter State
const selectedStatus = ref(props.filters.status)
const searchQuery = ref(props.filters.search)
const isLoading = ref(false)

// Modal State
const showShippingModal = ref(false)
const showCancelModal = ref(false)
const selectedOrder = ref<AdminOrder | null>(null)
const isSubmitting = ref(false)

// Stats cards configuration
const statsCards = computed(() => [
  {
    label: 'Perlu Tindakan',
    value: props.stats?.needsAction ?? 0,
    color: 'warning' as const,
    icon: 'i-heroicons-exclamation-circle',
  },
  {
    label: 'Sedang Dikirim',
    value: props.stats?.shipped ?? 0,
    color: 'primary' as const,
    icon: 'i-heroicons-truck',
  },
  {
    label: 'Selesai',
    value: props.stats?.delivered ?? 0,
    color: 'success' as const,
    icon: 'i-heroicons-check-circle',
  },
  {
    label: 'Total Pesanan',
    value: props.stats?.total ?? 0,
    color: 'neutral' as const,
    icon: 'i-heroicons-shopping-bag',
  },
])

// Filter orders
const applyFilters = () => {
  isLoading.value = true
  router.get(
    '/admin/orders',
    {
      status: selectedStatus.value,
      search: searchQuery.value,
    },
    {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => {
        isLoading.value = false
      },
    }
  )
}

// Watch for filter changes with debounce
let searchTimeout: ReturnType<typeof setTimeout>
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(applyFilters, 500)
})

watch(selectedStatus, () => {
  applyFilters()
})

// Handle view order
const handleViewOrder = (order: AdminOrder) => {
  router.visit(`/admin/orders/${order.id}`)
}

// Handle process order
const handleProcessOrder = async (order: AdminOrder) => {
  if (order.status !== 'paid') return
  const success = await processOrder(order.id)
  if (success) {
    reloadOrders()
  }
}

// Handle ship order - open modal
const handleShipOrder = (order: AdminOrder) => {
  selectedOrder.value = order
  showShippingModal.value = true
}

// Handle track order
const handleTrackOrder = (order: AdminOrder) => {
  router.visit(`/admin/orders/${order.id}`)
}

// Handle cancel order - open modal
const handleCancelOrder = (order: AdminOrder) => {
  selectedOrder.value = order
  showCancelModal.value = true
}

// Submit shipping form
const handleSubmitShipping = async (form: ShippingFormData, isUpdate: boolean) => {
  if (!selectedOrder.value) return
  isSubmitting.value = true
  const success = await submitShipping(selectedOrder.value.id, form, isUpdate)
  if (success) {
    showShippingModal.value = false
    reloadOrders()
  }
  isSubmitting.value = false
}

// Confirm cancel order
const handleConfirmCancel = async (reason: string) => {
  if (!selectedOrder.value) return
  isSubmitting.value = true
  const success = await cancelOrder(selectedOrder.value.id, reason)
  if (success) {
    showCancelModal.value = false
    reloadOrders()
  }
  isSubmitting.value = false
}

// Pagination
const goToPage = (page: number) => {
  router.get(
    '/admin/orders',
    {
      page,
      status: selectedStatus.value,
      search: searchQuery.value,
    },
    {
      preserveState: true,
      preserveScroll: true,
    }
  )
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pesanan</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Kelola pesanan dari pelanggan Anda
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <OrderStatsCards :stats="statsCards" />

    <!-- Filters -->
    <OrderFilters
      v-model:search="searchQuery"
      v-model:status="selectedStatus"
      :status-options="statusOptions"
    />

    <!-- Order List -->
    <OrderList
      :orders="ordersList"
      :total="paginationData?.total ?? 0"
      :loading="isLoading"
      @view="handleViewOrder"
      @process="handleProcessOrder"
      @ship="handleShipOrder"
      @track="handleTrackOrder"
      @cancel="handleCancelOrder"
    >
      <template v-if="showPagination" #pagination>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3">
          <!-- Info Text -->
          <p class="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
            Menampilkan <span class="font-medium text-gray-700 dark:text-gray-300">{{ paginationInfo.start }}</span> -
            <span class="font-medium text-gray-700 dark:text-gray-300">{{ paginationInfo.end }}</span> dari
            <span class="font-medium text-gray-700 dark:text-gray-300">{{ paginationInfo.total }}</span> pesanan
          </p>

          <!-- Pagination Controls -->
          <div class="flex items-center gap-2 order-1 sm:order-2">
            <!-- Previous Button -->
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              icon="i-heroicons-chevron-left"
              :disabled="paginationData.currentPage <= 1"
              @click="goToPage(paginationData.currentPage - 1)"
            />

            <!-- Page Numbers -->
            <div class="flex items-center gap-1">
              <!-- First page -->
              <UButton
                v-if="paginationData.currentPage > 2"
                color="neutral"
                :variant="1 === paginationData.currentPage ? 'solid' : 'ghost'"
                size="sm"
                @click="goToPage(1)"
              >
                1
              </UButton>

              <!-- Ellipsis before -->
              <span v-if="paginationData.currentPage > 3" class="px-2 text-gray-400">...</span>

              <!-- Page numbers around current -->
              <template v-for="page in paginationData.lastPage" :key="page">
                <UButton
                  v-if="page >= paginationData.currentPage - 1 && page <= paginationData.currentPage + 1"
                  :color="page === paginationData.currentPage ? 'primary' : 'neutral'"
                  :variant="page === paginationData.currentPage ? 'solid' : 'ghost'"
                  size="sm"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </UButton>
              </template>

              <!-- Ellipsis after -->
              <span v-if="paginationData.currentPage < paginationData.lastPage - 2" class="px-2 text-gray-400">...</span>

              <!-- Last page -->
              <UButton
                v-if="paginationData.currentPage < paginationData.lastPage - 1"
                color="neutral"
                :variant="paginationData.lastPage === paginationData.currentPage ? 'solid' : 'ghost'"
                size="sm"
                @click="goToPage(paginationData.lastPage)"
              >
                {{ paginationData.lastPage }}
              </UButton>
            </div>

            <!-- Next Button -->
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              icon="i-heroicons-chevron-right"
              :disabled="paginationData.currentPage >= paginationData.lastPage"
              @click="goToPage(paginationData.currentPage + 1)"
            />
          </div>
        </div>
      </template>
    </OrderList>

    <!-- Shipping Modal -->
    <ShippingModal
      v-model:open="showShippingModal"
      :order="selectedOrder"
      :couriers="couriers"
      :loading="isSubmitting"
      @submit="handleSubmitShipping"
    />

    <!-- Cancel Modal -->
    <CancelModal
      v-model:open="showCancelModal"
      :order="selectedOrder"
      :loading="isSubmitting"
      @confirm="handleConfirmCancel"
    />
  </div>
</template>
