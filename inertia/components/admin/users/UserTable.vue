<script setup lang="ts">
import { h, ref, resolveComponent } from 'vue'
import { router, Link } from '@inertiajs/vue3'
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import type { User, PaginationMeta } from './types'

const props = defineProps<{
  users: User[]
  meta: PaginationMeta
  isLoading: boolean
}>()

const pagination = defineModel<{ pageIndex: number; pageSize: number }>('pagination', {
  default: () => ({ pageIndex: 0, pageSize: 10 }),
})

const globalFilter = defineModel<string>('globalFilter', { default: '' })

const emit = defineEmits<{
  delete: [user: User]
  pageChange: [page: number]
}>()

// Table ref
const table = ref<{ tableApi?: any } | null>(null)

// Table columns with TanStack render functions
const columns: TableColumn<User>[] = [
  {
    accessorKey: 'fullName',
    header: 'Nama',
    cell: ({ row }) => {
      const user = row.original
      return h('div', { class: 'flex items-center gap-3' }, [
        h(
          'div',
          { class: 'w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0' },
          h(resolveComponent('UIcon'), { name: 'i-heroicons-user', class: 'w-5 h-5 text-violet-500' })
        ),
        h('div', { class: 'min-w-0' }, [
          h(
            Link,
            {
              href: `/admin/users/${user.id}`,
              class: 'font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400',
            },
            () => user.fullName || '-'
          ),
          h('p', { class: 'text-xs text-slate-500 dark:text-slate-400' }, user.email),
        ]),
      ])
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.original.role
      return h(
        resolveComponent('UBadge'),
        { color: role === 'superadmin' ? 'primary' : 'neutral', variant: 'subtle' },
        () => (role === 'superadmin' ? 'Super Admin' : 'Admin')
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Tanggal Dibuat',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      return h('span', { class: 'text-slate-600 dark:text-slate-400' }, date)
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-right' }, 'Aksi'),
    cell: ({ row }) => {
      const user = row.original
      const UDropdownMenu = resolveComponent('UDropdownMenu')
      const UButton = resolveComponent('UButton')

      const items = [
        [
          {
            label: 'Lihat Detail',
            icon: 'i-heroicons-eye',
            onSelect: () => router.visit(`/admin/users/${user.id}`),
          },
          {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square',
            onSelect: () => router.visit(`/admin/users/${user.id}/edit`),
          },
        ],
        [
          {
            label: 'Hapus',
            icon: 'i-heroicons-trash',
            color: 'error' as const,
            onSelect: () => emit('delete', user),
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
      :data="users"
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
            <p class="text-slate-500 dark:text-slate-400 mb-4">Belum ada pengguna</p>
            <Link href="/admin/users/create">
              <UButton icon="i-heroicons-plus" color="primary">
                Tambah Pengguna
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
        dari {{ meta.total }} pengguna
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
