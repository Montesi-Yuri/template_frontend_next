import AuthenticatedHeader from '@/components/auth/AuthenticatedHeader'

export default function AuthenticatedLayout({ children }) {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(#284b63_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] pointer-events-none" />
      <AuthenticatedHeader />
      <div className='bg-gradient-custom m-1 mt-0 rounded-[12px] flex-grow'>
        {children}
      </div>
    </div>

  )
}