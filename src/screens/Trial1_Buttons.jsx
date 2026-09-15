import { useState, useEffect } from 'react'
import TrialLayout from '../components/TrialLayout'

const LABELS = [
  'Snooze', 'Skip', 'Deactivate', 'Delay', 'End', 'Done',
  'Stop', 'Mute', 'Silence', 'Quiet', 'Turn Off', 'Turn Off Alarm',
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generate() {
  return {
    labels: shuffle(LABELS),
    correctIndex: Math.floor(Math.random() * LABELS.length),
  }
}

// Visual noise only: 3-4 random buttons look dimmed but still work.
function pickDimmed() {
  const count = 3 + Math.floor(Math.random() * 2)
  return shuffle(LABELS.map((_, i) => i)).slice(0, count)
}

const COLORS = ['glass-btn-purple', 'glass-btn-cyan', 'glass-btn-blue', 'glass-btn-pink']

// Color has no bearing on which button is correct — pure visual noise.
function pickColors() {
  const colors = LABELS.map((_, i) => COLORS[i % COLORS.length])
  return shuffle(colors)
}

export default function Trial1_Buttons({ step, failedAttempts, onSuccess, onFail }) {
  const [round] = useState(generate)
  const [dimmed] = useState(pickDimmed)
  const [colors] = useState(pickColors)
  const [disabled, setDisabled] = useState([]) // indexes of wrong buttons already tried
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(''), 1500)
    return () => clearTimeout(t)
  }, [message])

  function handleClick(index) {
    if (index === round.correctIndex) {
      onSuccess()
      return
    }
    onFail()
    setMessage('Close, try again!')
    setDisabled((d) => [...d, index])
  }

  return (
    <TrialLayout step={step} failedAttempts={failedAttempts} message={message}>
      <div className="text-center">
        <h2 className="text-2xl font-medium">Find the right button</h2>
        <p className="text-sm text-white/55 mt-1">Only one button dismisses the alarm</p>
      </div>
      <div className="grid grid-cols-3 gap-3 w-full">
        {round.labels.map((label, i) => (
          <button
            key={`${label}-${i}`}
            onClick={() => handleClick(i)}
            disabled={disabled.includes(i)}
            className={`glass-btn ${colors[i]} h-14 px-2 text-sm leading-tight ${dimmed.includes(i) ? 'text-white/40' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </TrialLayout>
  )
}
