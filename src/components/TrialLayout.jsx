import { useEffect, useRef } from 'react'
import PhoneFrame from './PhoneFrame'
import ProgressBar from './ProgressBar'

// Shared shell for the 4 trial screens: alarm icon + progress bar on top, content in the middle,
// fail message + failed attempts footer at the bottom. Shakes whenever failedAttempts increases.
export default function TrialLayout({ step, failedAttempts, message, children }) {
  const shakeRef = useRef(null)
  const prevFailedAttempts = useRef(failedAttempts)

  useEffect(() => {
    if (failedAttempts > prevFailedAttempts.current && shakeRef.current) {
      const el = shakeRef.current
      el.classList.remove('shake')
      void el.offsetWidth // force reflow so the animation restarts
      el.classList.add('shake')
    }
    prevFailedAttempts.current = failedAttempts
  }, [failedAttempts])

  return (
    <PhoneFrame background="trial" time={`7:4${step}`}>
      <div ref={shakeRef} className="flex-1 flex flex-col min-h-0">
        <div className="flex flex-col items-center gap-[9px]">
          <img src="/alarm-icon.svg" alt="" className="h-28 w-auto" />
          <ProgressBar step={step} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          {children}
          <p key={failedAttempts} className={`text-sm h-5 ${message ? 'fail-msg' : ''}`}>
            {message}
          </p>
        </div>

        <p className="text-center text-xs text-white/50 pb-6">Failed attempts: {failedAttempts}</p>
      </div>
    </PhoneFrame>
  )
}
