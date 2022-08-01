import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer, CyclesState } from '../reducers/cycles/reducer'
import { verifyLocalStorageData } from '../utils/json'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  createNewCycle: (data: CreateCycleData) => void
  setSecondsPast: (seconds: number) => void
  handleInterruptCurrentCycle: () => void
  markCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

const LOCAL_STORAGE_KEY = '@ignite-time:cycles-state-1.0.0'

const defaultCyclesState: CyclesState = {
  cycles: [],
  activeCycleId: null,
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    defaultCyclesState,
    () => {
      const storedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

      if (storedStateJSON) {
        return verifyLocalStorageData(JSON.parse(storedStateJSON))
      }

      return defaultCyclesState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem(LOCAL_STORAGE_KEY, stateJSON)
  }, [cyclesState])

  const setSecondsPast = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle, id))
    setAmountSecondsPassed(0)
  }

  function handleInterruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  function markCycleAsFinished() {
    dispatch(markCycleAsFinishedAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        createNewCycle,
        setSecondsPast,
        markCycleAsFinished,
        handleInterruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
