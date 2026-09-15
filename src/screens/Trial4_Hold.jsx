import { useState, useEffect, useRef } from 'react'
import TrialLayout from '../components/TrialLayout'

const TARGET = 5
const TOLERANCE = 0.5

export default function Trial4_Hold({ step, failedAttempts, onSuccess, onFail }) {
  const [holding, setHolding] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [message, setMessage] = useState('')
  const startRef = useRef(null)

  // Tick the displayed time while holding.
  useEffect(() => {
    if (!holding) return
    const id = setInterval(() => {
      setElapsed((Date.now() - startRef.current) / 1000)
    }, 50)
    return () => clearInterval(id)
  }, [holding])

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(''), 1500)
    return () => clearTimeout(t)
  }, [message])

  function start(e) {
    e.preventDefault()
    if (holding) return
    startRef.current = Date.now()
    setElapsed(0)
    setHolding(true)
  }

  function stop(e) {
    e.preventDefault()
    if (!holding) return
    const duration = (Date.now() - startRef.current) / 1000
    setHolding(false)
    setElapsed(0)
    if (duration >= TARGET - TOLERANCE && duration <= TARGET + TOLERANCE) {
      onSuccess()
      return
    }
    onFail()
    setMessage(`Released at ${duration.toFixed(1)}s. Try again!`)
  }

  return (
    <TrialLayout step={step} failedAttempts={failedAttempts} message={message}>
      <div className="text-center">
        <h2 className="text-2xl font-medium">Press &amp; Hold</h2>
        <p className="text-sm text-white/55 mt-1">
          Hold the button for exactly {TARGET} seconds.<br />No more, no less!
        </p>
      </div>
      <div className="w-full">
        <button
          onMouseDown={start}
          onMouseUp={stop}
          onMouseLeave={stop}
          onTouchStart={start}
          onTouchEnd={stop}
          onTouchCancel={stop}
          onContextMenu={(e) => e.preventDefault()}
          className="glass-btn relative overflow-hidden w-full py-4 text-lg font-medium tabular-nums select-none touch-none"
          style={{
            background: 'rgba(49, 111, 246, 0.5)',
            borderColor: 'rgba(69, 115, 255, 0.8)',
            color: '#6088FF',
          }}
        >
          <span
            className="absolute inset-y-0 left-0"
            style={{
              width: `${Math.min(elapsed / TARGET, 1) * 100}%`,
              background: '#0088FF',
              transition: holding ? 'none' : 'width 150ms ease',
            }}
          />
          <span className="relative">HOLD... {elapsed.toFixed(1)}s</span>
          <span
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              color: '#fff',
              clipPath: `inset(0 ${100 - Math.min(elapsed / TARGET, 1) * 100}% 0 0)`,
              transition: holding ? 'none' : 'clip-path 150ms ease',
            }}
          >
            HOLD... {elapsed.toFixed(1)}s
          </span>
        </button>
        <p className="text-xs text-white/50 mt-3 text-center">Tolerance: ±{TOLERANCE}s</p>
      </div>
    </TrialLayout>
  )
}
