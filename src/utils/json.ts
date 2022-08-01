import { add, differenceInMinutes } from 'date-fns'
import { CyclesState } from '../reducers/cycles/reducer'

export function verifyLocalStorageData(
  cyclesData: CyclesState,
): CyclesState | undefined {
  if (cyclesData) {
    const cyclesDateVerified = cyclesData.cycles.map((cycle) => {
      if (cycle.interruptedDate || cycle.finishedDate) {
        return cycle
      } else if (
        differenceInMinutes(new Date(), new Date(cycle.startDate)) >
        cycle.minutesAmount
      ) {
        return {
          ...cycle,
          finishedDate: add(new Date(cycle.startDate), {
            minutes: cycle.minutesAmount,
          }),
        }
      }

      return cycle
    })

    if (cyclesData.activeCycleId) {
      const activeCycle = cyclesDateVerified.find(
        (cycle) => cycle.id === cyclesData.activeCycleId,
      )

      if (activeCycle?.finishedDate) {
        return {
          activeCycleId: null,
          cycles: cyclesDateVerified,
        }
      }
    }

    return {
      ...cyclesData,
      cycles: cyclesDateVerified,
    }
  }
}
