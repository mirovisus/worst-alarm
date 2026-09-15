import { useRef, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import PhoneFrame from '../components/PhoneFrame'

const THRESHOLD = 80
const MAX_LIFT = 200

export default function MainScreen({ onStart }) {
  const [lift, setLift] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startY = useRef(null)
  const fired = useRef(false)

  const progress = Math.min(lift / THRESHOLD, 1)

  const handlePointerDown = (e) => {
    if (fired.current) return
    e.currentTarget.setPointerCapture(e.pointerId)
    startY.current = e.clientY
    setDragging(true)
  }

  const handlePointerMove = (e) => {
    if (startY.current === null || fired.current) return
    const dy = Math.min(Math.max(startY.current - e.clientY, 0), MAX_LIFT)
    setLift(dy)
    if (dy >= THRESHOLD) {
      fired.current = true
      onStart()
    }
  }

  const release = () => {
    startY.current = null
    setDragging(false)
    setLift(0)
  }

  return (
    <PhoneFrame background="main" time="7:41">
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <p className="text-[96px] leading-none font-extralight tracking-tight">07:41</p>
        <p className="text-sm text-white/70">Alarm 07:30 - 8:00</p>
      </div>
      <div className="flex flex-col items-center gap-6 pb-10">
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={release}
          onPointerCancel={release}
          className="relative p-10 -m-10 select-none cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
        >
          <div
            aria-hidden
            className="absolute left-1/2 w-[280px] h-[200px] pointer-events-none"
            style={{
              top: `calc(50% - ${lift}px)`,
              transform: 'translate(-50%, -35%)',
              opacity: progress * 0.5,
              background:
                'radial-gradient(ellipse closest-side at 50% 50%, rgba(200,225,255,0.4) 0%, rgba(150,190,255,0.12) 50%, transparent 100%)',
              transition: dragging ? 'none' : 'opacity 0.3s ease-out, top 0.3s ease-out',
            }}
          />
          <div
            className="relative flex flex-col items-center gap-3 text-white text-base font-medium tracking-wide"
            style={{
              transform: `translateY(-${lift}px)`,
              transition: dragging ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            <ChevronUp size={32} strokeWidth={1.25} className={dragging ? '' : 'swipe-hint'} />
            Turn off alarm
          </div>
        </div>
        <p
          className="text-xs text-white/50"
          style={{ opacity: 1 - progress, transition: dragging ? 'none' : 'opacity 0.3s ease-out' }}
        >
          Complete challenge to turn off
        </p>
      </div>
    </PhoneFrame>
  )
}
