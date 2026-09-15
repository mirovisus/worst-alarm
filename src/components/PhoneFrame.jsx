import StatusBar from './StatusBar'

// background: "main" | "trial" | "final" -> /<name>.webp in public/
export default function PhoneFrame({ children, background = 'main', time = '7:41' }) {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-neutral-950 text-white overflow-hidden">
      <div
        className="relative w-full h-dvh sm:w-[390px] sm:h-[844px] sm:rounded-[48px] sm:border sm:border-neutral-700 sm:shadow-[0_30px_80px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col bg-cover bg-center bg-[#05061a]"
        style={{ backgroundImage: `url(/${background}.webp)` }}
      >
        {/* Notch (desktop only) */}
        <div className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[30px] rounded-full bg-black z-20" />

        <StatusBar time={time} />

        {children}

        {/* Fake home indicator (desktop only - real device already shows its own) */}
        <div className="hidden sm:flex shrink-0 h-6 items-end justify-center pb-2">
          <div className="w-[134px] h-[5px] rounded-full bg-white/80" />
        </div>
      </div>
    </div>
  )
}
