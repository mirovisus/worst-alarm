import PhoneFrame from '../components/PhoneFrame'

// Rotating daily CTA - hardcoded for now.
const DAILY_CTA = 'warm-up'

function formatElapsed(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export default function SuccessScreen({ startTime, endTime, failedAttempts }) {
  const elapsed = formatElapsed(endTime - startTime)
  return (
    <PhoneFrame background="final" time="7:45">
      <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="text-5xl font-extralight tracking-tight">Alarm Dismissed</h1>
        <p className="text-sm text-white/70">Took you {elapsed} and {failedAttempts} attempts</p>
        <p className="text-sm text-white/50 mt-8">Today: do a {DAILY_CTA}</p>
      </div>
      <div className="flex justify-center px-6 pb-20">
        <button className="glass-btn glass-btn-start-warmup w-full py-4 text-base">Start {DAILY_CTA}</button>
      </div>
    </PhoneFrame>
  )
}
