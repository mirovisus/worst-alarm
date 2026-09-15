import { useState, useEffect } from 'react'
import TrialLayout from '../components/TrialLayout'

const WORDS = ['sleep', 'dream', 'night', 'alarm', 'snooze', 'wake']

function pickWord(exclude) {
  const pool = WORDS.filter((w) => w !== exclude)
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function Trial2_Reverse({ step, failedAttempts, onSuccess, onFail }) {
  const [word, setWord] = useState(() => pickWord())
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(''), 1500)
    return () => clearTimeout(t)
  }, [message])

  function handleSubmit(e) {
    e.preventDefault()
    const reversed = word.split('').reverse().join('')
    if (input.trim().toLowerCase() === reversed) {
      onSuccess()
      return
    }
    onFail()
    setMessage('Close, try again!')
    setWord(pickWord(word))
    setInput('')
  }

  return (
    <TrialLayout step={step} failedAttempts={failedAttempts} message={message}>
      <div className="text-center">
        <h2 className="text-2xl font-medium">Reverse the word</h2>
        <p className="text-sm text-white/55 mt-1">Type this word backwards</p>
      </div>
      <p className="text-6xl font-light tracking-wide">{word}</p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="glass-btn w-full px-4 py-4 text-center text-base placeholder:text-white/40 outline-none"
          style={{ background: 'rgba(0, 9, 59, 0.6)', borderColor: '#0088FF', color: '#6088FF' }}
        />
        <button
          type="submit"
          disabled={input.trim().length !== word.length}
          className="glass-btn w-full py-4 text-base"
          style={{
            background: input.trim().length === word.length ? '#0088FF' : 'transparent',
            borderColor: 'rgba(69, 115, 255, 0.8)',
            color: input.trim().length === word.length ? '#fff' : '#6088FF',
            fontWeight: input.trim().length === word.length ? 500 : undefined,
          }}
        >
          Submit
        </button>
      </form>
    </TrialLayout>
  )
}
