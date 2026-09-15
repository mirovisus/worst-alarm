import { useState } from 'react'
import MainScreen from './screens/MainScreen'
import Trial1_Buttons from './screens/Trial1_Buttons'
import Trial2_Reverse from './screens/Trial2_Reverse'
import Trial3_Stroop from './screens/Trial3_Stroop'
import Trial4_Hold from './screens/Trial4_Hold'
import SuccessScreen from './screens/SuccessScreen'

const TRIALS = {
  buttons: Trial1_Buttons,
  reverse: Trial2_Reverse,
  stroop: Trial3_Stroop,
  hold: Trial4_Hold,
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('main')
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [trialsOrder, setTrialsOrder] = useState([])

  function handleStart() {
    const order = shuffle(Object.keys(TRIALS))
    setStartTime(Date.now())
    setFailedAttempts(0)
    setTrialsOrder(order)
    setCurrentScreen(order[0])
  }

  function handleSuccess() {
    const index = trialsOrder.indexOf(currentScreen)
    const next = trialsOrder[index + 1]
    if (next) {
      setCurrentScreen(next)
    } else {
      setEndTime(Date.now())
      setCurrentScreen('success')
    }
  }

  function handleFail() {
    setFailedAttempts((n) => n + 1)
  }

  if (currentScreen === 'main') {
    return <MainScreen onStart={handleStart} />
  }

  if (currentScreen === 'success') {
    return (
      <SuccessScreen
        startTime={startTime}
        endTime={endTime}
        failedAttempts={failedAttempts}
      />
    )
  }

  const Trial = TRIALS[currentScreen]
  const step = trialsOrder.indexOf(currentScreen) + 1

  return (
    <Trial
      key={currentScreen}
      step={step}
      failedAttempts={failedAttempts}
      onSuccess={handleSuccess}
      onFail={handleFail}
    />
  )
}
