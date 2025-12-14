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

  const styles = {
    success: {
      bg: 'bg-gradient-to-r from-green-500 to-green-600',
      icon: '✓',
      iconBg: 'bg-green-600'
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500 to-red-600',
      icon: '✕',
      iconBg: 'bg-red-600'
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: 'ℹ',
      iconBg: 'bg-blue-600'
    }
  }[message.type || 'success']

  return (
    <div
      className={`${styles.bg} text-white px-5 py-4 rounded-xl shadow-2xl transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
      } flex items-center gap-3 min-w-[300px] max-w-md backdrop-blur-sm`}
    >
      <div className={`${styles.iconBg} rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg flex-shrink-0`}>
        {styles.icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm sm:text-base leading-snug">{message.message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => onClose(message.id), 300)
        }}
        className="text-white hover:text-neutral-200 transition-colors hover:rotate-90 transform duration-200 flex-shrink-0"
        aria-label="Close notification"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
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
