'use client'

import Header from '@/components/landing/Header';

export default function GuestLayout({ children, hideNavigation = false }) {
  return (
    <div className="min-h-screen bg-gradient-custom relative">
      <div className="absolute inset-0 bg-[radial-gradient(#284b63_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] pointer-events-none" />
      <Header hideNavigation={hideNavigation} />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}