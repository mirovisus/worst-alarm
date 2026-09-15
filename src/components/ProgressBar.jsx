export default function ProgressBar({ step, total = 4 }) {
  const pct = (step / total) * 100
  return (
    <div className="w-full px-8">
      <p className="text-center text-xs text-white/60 mb-2">Step {step} / {total}</p>
      <div className="w-full h-[10px] rounded-full bg-white/15 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#8bb8ff] to-[#3b7dff] shadow-[0_0_8px_#4a9eff]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
