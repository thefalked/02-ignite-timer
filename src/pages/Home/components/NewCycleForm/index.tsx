import React from 'react'
import { useFormContext } from 'react-hook-form'

import { useCycles } from '../../../../hooks/useCycles'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export const NewCycleForm: React.FC = () => {
  const { activeCycle } = useCycles()
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="tasks-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task', { required: true })}
      />

      <datalist id="tasks-suggestions">
        <option value="Projeto1"></option>
        <option value="Projeto2"></option>
        <option value="Projeto3"></option>
        <option value="Banana"></option>
      </datalist>

      <div>
        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={5}
          min={5}
          max={60}
          disabled={!!activeCycle}
          {...register('minutesAmount', {
            required: true,
            valueAsNumber: true,
          })}
        />

        <span>minutos.</span>
      </div>
    </FormContainer>
  )
}
