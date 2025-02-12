'use client'

import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="relative bg-white dark:bg-prussian-darker rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-prussian dark:text-ivory">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 