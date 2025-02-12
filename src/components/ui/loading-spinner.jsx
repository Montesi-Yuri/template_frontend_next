'use client'

import { Loader2 } from 'lucide-react'

export const LoadingSpinner = ({
	message = 'Caricamento...',
	fullScreen = false
}) => {
	const containerClasses = fullScreen
		? "fixed inset-0 flex items-center justify-center bg-white/60 dark:bg-prussian/80 backdrop-blur-sm z-50"
		: "w-full h-full flex items-center justify-center min-h-[200px]"

	return (
		<div className={containerClasses}>
			<div className="flex flex-col items-center justify-center space-y-4 p-6 rounded-lg">
				<Loader2 className="animate-spin h-10 w-10 text-indigo-600 dark:text-indigo-400" />
				<p className="text-base font-medium text-prussian-600 dark:text-ivory/90">
					{message}
				</p>
			</div>
		</div>
	)
} 