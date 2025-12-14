interface ErrorBannerProps {
  message: string
  onRetry?: () => void
  type?: 'error' | 'warning'
}

function ErrorBanner({ message, onRetry, type = 'error' }: ErrorBannerProps) {
  const isWarning = type === 'warning'
  
  const bgColor = isWarning 
    ? 'bg-yellow-50 dark:bg-yellow-900/20' 
    : 'bg-red-50 dark:bg-red-900/20'
  const borderColor = isWarning
    ? 'border-yellow-300 dark:border-yellow-700'
    : 'border-red-300 dark:border-red-700'
  const textColor = isWarning
    ? 'text-yellow-800 dark:text-yellow-300'
    : 'text-red-800 dark:text-red-300'
  const buttonColor = isWarning
    ? 'bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600'
    : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'

  return (
    <div className={`${bgColor} border-2 ${borderColor} rounded-xl p-4 mb-6 flex items-start gap-3`}>
      <div className="flex-shrink-0 mt-0.5">
        {isWarning ? (
          <svg className={`h-5 w-5 ${textColor}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className={`h-5 w-5 ${textColor}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div className="flex-1">
        <p className={`text-sm ${textColor}`}>{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`flex-shrink-0 px-3 py-1 ${buttonColor} text-white text-sm rounded-lg transition-colors`}
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorBanner
