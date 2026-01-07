<script setup lang="ts">
import { h, ref, resolveComponent } from 'vue'
import { router, Link } from '@inertiajs/vue3'
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import type { Customer, PaginationMeta } from './types'

const props = defineProps<{
  customers: Customer[]
  meta: PaginationMeta
  isLoading: boolean
}>()

const pagination = defineModel<{ pageIndex: number; pageSize: number }>('pagination', {
  default: () => ({ pageIndex: 0, pageSize: 10 }),
})

const globalFilter = defineModel<string>('globalFilter', { default: '' })

const emit = defineEmits<{
  toggleActive: [customer: Customer]
  toggleVerified: [customer: Customer]
  impersonate: [customer: Customer]
  delete: [customer: Customer]
  pageChange: [page: number]
}>()

// Table ref
const table = ref<{ tableApi?: any } | null>(null)

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

// Table columns with TanStack render functions
const columns: TableColumn<Customer>[] = [
  {
    accessorKey: 'fullName',
    header: 'Pelanggan',
    cell: ({ row }) => {
      const customer = row.original
      return h('div', { class: 'flex items-center gap-3' }, [
        h(
          'div',
          { class: 'w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center overflow-hidden shrink-0' },
          customer.avatar
            ? h('img', {
                src: customer.avatar,
                alt: customer.fullName,
                class: 'w-full h-full object-cover',
              })
            : h(resolveComponent('UIcon'), { name: 'i-heroicons-user', class: 'w-5 h-5 text-violet-500' })
        ),
        h('div', { class: 'min-w-0' }, [
          h(
            Link,
            {
              href: `/admin/customers/${customer.id}`,
              class: 'font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400',
            },
            () => customer.fullName
          ),
          customer.gender
            ? h('p', { class: 'text-xs text-slate-500 dark:text-slate-400' }, customer.gender === 'male' ? 'Laki-laki' : 'Perempuan')
            : null,
        ]),
      ])
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => h('span', { class: 'text-slate-600 dark:text-slate-400' }, row.original.email),
  },
  {
    accessorKey: 'phone',
    header: 'Telepon',
    cell: ({ row }) => h('span', { class: 'text-slate-600 dark:text-slate-400' }, row.original.phone || '-'),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const customer = row.original
      return h('div', { class: 'flex flex-col gap-1' }, [
        h(
          resolveComponent('UBadge'),
          { color: customer.isActive ? 'success' : 'error', variant: 'subtle', size: 'xs' },
          () => (customer.isActive ? 'Aktif' : 'Tidak Aktif')
        ),
        h(
          resolveComponent('UBadge'),
          { color: customer.isVerified ? 'primary' : 'neutral', variant: 'subtle', size: 'xs' },
          () => (customer.isVerified ? 'Terverifikasi' : 'Belum Verifikasi')
        ),
      ])
    },
  },
  {
    accessorKey: 'totalOrdersCount',
    header: 'Total Pesanan',
    cell: ({ row }) => h('span', { class: 'font-medium text-slate-900 dark:text-white' }, row.original.totalOrdersCount),
  },
  {
    accessorKey: 'totalSpent',
    header: () => h('div', { class: 'text-right' }, 'Total Belanja'),
    cell: ({ row }) =>
      h('div', { class: 'text-right font-medium text-emerald-600 dark:text-emerald-400' }, formatCurrency(row.original.totalSpent)),
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-right' }, 'Aksi'),
    cell: ({ row }) => {
      const customer = row.original
      const UDropdownMenu = resolveComponent('UDropdownMenu')
      const UButton = resolveComponent('UButton')

      const items = [
        [
          {
            label: 'Lihat Detail',
            icon: 'i-heroicons-eye',
            onSelect: () => router.visit(`/admin/customers/${customer.id}`),
          },
          {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square',
            onSelect: () => router.visit(`/admin/customers/${customer.id}/edit`),
          },
        ],
        [
          {
            label: 'Login sebagai Customer',
            icon: 'i-heroicons-user-circle',
            disabled: !customer.isActive,
            onSelect: () => emit('impersonate', customer),
          },
        ],
        [
          {
            label: customer.isActive ? 'Nonaktifkan' : 'Aktifkan',
            icon: customer.isActive ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle',
            onSelect: () => emit('toggleActive', customer),
          },
          {
            label: customer.isVerified ? 'Batalkan Verifikasi' : 'Verifikasi',
            icon: customer.isVerified ? 'i-heroicons-shield-exclamation' : 'i-heroicons-shield-check',
            onSelect: () => emit('toggleVerified', customer),
          },
        ],
        [
          {
            label: 'Hapus',
            icon: 'i-heroicons-trash',
            color: 'error' as const,
            onSelect: () => emit('delete', customer),
          },
        ],
      ]

      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: { align: 'end' },
            items,
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-heroicons-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              size: 'xs',
            })
        )
      )
    },
    enableSorting: false,
  },
]

const handlePageChange = (page: number) => {
  pagination.value.pageIndex = page - 1
  emit('pageChange', page)
}
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
    <slot name="filters" />

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="p-8 flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-violet-500 animate-spin" />
    </div>

    <!-- Table -->
    <UTable
      v-else
      ref="table"
      v-model:pagination="pagination"
      v-model:global-filter="globalFilter"
      :data="customers"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      class="flex-1"
    >
      <template #empty>
        <div class="px-4 py-12 text-center">
          <div class="flex flex-col items-center">
            <UIcon name="i-heroicons-users" class="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
            <p class="text-slate-500 dark:text-slate-400 mb-4">Belum ada pelanggan</p>
            <Link href="/admin/customers/create">
              <UButton icon="i-heroicons-plus" color="primary">
                Tambah Pelanggan
              </UButton>
            </Link>
          </div>
        </div>
      </template>
    </UTable>

    <!-- Pagination -->
    <div
      v-if="meta.lastPage > 1"
      class="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800"
    >
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Menampilkan {{ (meta.currentPage - 1) * meta.perPage + 1 }} -
        {{ Math.min(meta.currentPage * meta.perPage, meta.total) }}
        dari {{ meta.total }} pelanggan
      </p>
      <UPagination
        :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize || meta.perPage"
        :total="meta.total"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>
