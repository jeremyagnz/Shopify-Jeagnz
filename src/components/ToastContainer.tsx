import Toast from './Toast'
import type { ToastMessage } from './Toast'

interface ToastContainerProps {
  toasts: ToastMessage[]
  onClose: (id: string) => void
}

function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast} onClose={onClose} />
      ))}
    </div>
  )
}

export default ToastContainer
