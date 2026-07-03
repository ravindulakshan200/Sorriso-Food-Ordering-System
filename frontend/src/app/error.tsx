'use client'
 
import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 flex-col text-center pt-24">
      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={48} className="text-red-500" />
      </div>
      <h2 className="font-heading text-5xl text-white mb-4">Something went wrong!</h2>
      <p className="text-text-muted mb-8 font-body max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <button
        onClick={() => reset()}
        className="bg-accent hover:bg-accent-hover text-background px-8 py-4 font-accent text-sm tracking-[0.2em] uppercase font-bold transition-all"
      >
        Try again
      </button>
    </div>
  )
}
