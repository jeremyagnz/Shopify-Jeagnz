import { useEffect, useState } from 'react'

export interface ToastMessage {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
}

interface ToastProps {
  message: ToastMessage
  onClose: (id: string) => void
}

function Toast({ message, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after mount - small delay ensures CSS transition is applied
    // This allows the component to render in its initial state before transitioning
    setTimeout(() => setIsVisible(true), 10)

    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(message.id), 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [message.id, onClose])

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[message.type || 'success']

  return (
    <div
      className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } flex items-center gap-3 min-w-[280px] max-w-md`}
    >
      <div className="flex-1">
        <p className="font-medium text-sm sm:text-base">{message.message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => onClose(message.id), 300)
        }}
        className="text-white hover:text-neutral-200 transition-colors"
        aria-label="Close notification"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  )
}

export default Toast
