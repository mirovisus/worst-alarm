import { Signal, Wifi, BatteryFull } from 'lucide-react'

export default function StatusBar({ time = '7:41' }) {
  return (
    <div className="hidden sm:flex h-11 shrink-0 items-center justify-between px-7 text-white text-sm font-semibold">
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal size={16} strokeWidth={2.5} />
        <Wifi size={16} strokeWidth={2.5} />
        <BatteryFull size={20} strokeWidth={2} />
      </div>
    </div>
  )
}
