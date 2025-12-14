interface LoadingBannerProps {
  message?: string
  onRetry?: () => void
}

function LoadingBanner({ 
  message = 'Loading products from server... This may take a moment on first load.',
  onRetry 
}: LoadingBannerProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-4 mb-6 flex items-center gap-3">
      <div className="flex-shrink-0">
        <svg className="animate-spin h-5 w-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm text-blue-800 dark:text-blue-300">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex-shrink-0 px-3 py-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default LoadingBanner
