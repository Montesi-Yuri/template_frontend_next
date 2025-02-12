export const routes = {
  dashboard: '/dashboard',
  customers: {
    index: '/dashboard/customers',
    new: '/dashboard/customers/new',
    show: (id) => `/dashboard/customers/${id}`,
    edit: (id) => `/dashboard/customers/${id}/edit`,
    delete: (id) => `/dashboard/customers/${id}`,
  },
  users: {
    index: '/dashboard/users',
    new: '/dashboard/users/new',
    show: (id) => `/dashboard/users/${id}`,
    edit: (id) => `/dashboard/users/${id}/edit`,
    delete: (id) => `/dashboard/users/${id}`,
    roles: (id) => `/dashboard/users/${id}/roles`,
  },
  roles: {
    index: '/dashboard/roles',
    new: '/dashboard/roles/new',
    show: (id) => `/dashboard/roles/${id}`,
    edit: (id) => `/dashboard/roles/${id}/edit`,
    delete: (id) => `/dashboard/roles/${id}`,
    permissions: '/dashboard/roles/permissions',
  },
  invoices: {
    index: '/dashboard/invoices',
    new: '/dashboard/invoices/new',
    show: (id) => `/dashboard/invoices/${id}`,
    edit: (id) => `/dashboard/invoices/${id}/edit`,
    delete: (id) => `/dashboard/invoices/${id}`,
  },
  modules: {
    index: '/dashboard/modules',
    show: (id) => `/dashboard/modules/${id}`,
    edit: (id) => `/dashboard/modules/${id}/edit`,
  },
  settings: '/dashboard/settings',
  profile: '/dashboard/profile',
  // altre rotte...
}; 