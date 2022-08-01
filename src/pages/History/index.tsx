import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React from 'react'
import { useCycles } from '../../hooks/useCycles'
import { HistoryContainer, HistoryList, Status } from './styles'

export const History: React.FC = () => {
  const { cycles } = useCycles()

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td data-label="Tarefa">{cycle.task}</td>
                <td data-label="Duração">{cycle.minutesAmount} minutos</td>
                <td data-label="Início">
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td data-label="Status">
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}

                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}

                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
