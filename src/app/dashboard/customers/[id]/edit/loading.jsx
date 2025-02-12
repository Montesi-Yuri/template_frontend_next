export default function LoadingCustomerEdit() {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-prussian/80 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Caricamento...
          </p>
        </div>
      </div>
    </div>
  );
} 