import { useState, useEffect } from 'react'
import TrialLayout from '../components/TrialLayout'

const COLORS = [
  { name: 'RED', css: '#ff4d6d' },
  { name: 'PURPLE', css: '#a855f7' },
  { name: 'GREEN', css: '#34d399' },
  { name: 'YELLOW', css: '#facc15' },
  { name: 'BLUE', css: '#4a9eff' },
  { name: 'PINK', css: '#f472b6' },
]

function generate() {
  const wordIndex = Math.floor(Math.random() * COLORS.length)
  let colorIndex = Math.floor(Math.random() * (COLORS.length - 1))
  if (colorIndex >= wordIndex) colorIndex += 1 // guarantees a different color than the word
  return { wordIndex, colorIndex }
}

export default function Trial3_Stroop({ step, failedAttempts, onSuccess, onFail }) {
  const [round, setRound] = useState(generate)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(''), 1500)
    return () => clearTimeout(t)
  }, [message])

  function handleClick(index) {
    if (index === round.colorIndex) {
      onSuccess()
      return
    }
    onFail()
    setMessage('Close, try again!')
    setRound(generate())
  }

  const word = COLORS[round.wordIndex].name
  const color = COLORS[round.colorIndex].css

  return (
    <TrialLayout step={step} failedAttempts={failedAttempts} message={message}>
      <div className="text-center">
        <h2 className="text-2xl font-medium">What color is the text?</h2>
        <p className="text-sm text-white/55 mt-1">Ignore the word</p>
      </div>
      <p
        className="text-6xl font-semibold tracking-wide"
        style={{ color, filter: `drop-shadow(0 0 18px ${color})` }}
      >
        {word}
      </p>
      <div className="grid grid-cols-3 gap-3 w-full">
        {COLORS.map((c, i) => (
          <button
            key={c.name}
            onClick={() => handleClick(i)}
            className="h-14 rounded-2xl text-sm font-semibold text-white backdrop-blur-md transition-transform active:scale-95"
            style={{
              backgroundColor: c.css + '55',
              border: `1px solid ${c.css}`,
              boxShadow: `0 0 14px ${c.css}55`,
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
    </TrialLayout>
  )
}
