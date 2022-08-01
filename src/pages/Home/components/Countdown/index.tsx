import { differenceInSeconds } from 'date-fns'
import React, { useEffect } from 'react'

import { useCycles } from '../../../../hooks/useCycles'

import { CountdownContainer, Separator } from './styles'

export const Countdown: React.FC = () => {
  const {
    activeCycle,
    amountSecondsPassed,
    setSecondsPast,
    markCycleAsFinished,
  } = useCycles()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCycleAsFinished()

          clearInterval(interval)
          setSecondsPast(totalSeconds)
        } else {
          setSecondsPast(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, markCycleAsFinished, setSecondsPast])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutesToDisplay = String(minutesAmount).padStart(2, '0')
  const secondsToDisplay = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer ${minutesToDisplay}:${secondsToDisplay}`
    }
  }, [minutesToDisplay, secondsToDisplay, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutesToDisplay[0]}</span>
      <span>{minutesToDisplay[1]}</span>
      <Separator>:</Separator>
      <span>{secondsToDisplay[0]}</span>
      <span>{secondsToDisplay[1]}</span>
    </CountdownContainer>
  )
}
