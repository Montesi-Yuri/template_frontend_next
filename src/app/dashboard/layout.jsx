import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout'

export default function DashboardLayout({ children }) {
  return (
    <AuthenticatedLayout>
      <main className="relative z-10">
        {children}
      </main>
    </AuthenticatedLayout>
  )
} 