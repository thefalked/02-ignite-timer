import styled from 'styled-components'

export const HistoryContainer = styled.div`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }

  @media (max-width: 768px) {
    padding: 3.5rem 0 0;
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      flex: 1;
      white-space: nowrap;

      &:first-child {
        width: 100%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }

  @media (max-width: 768px) {
    padding-right: 1rem;

    table {
      width: 100%;
      min-width: initial;

      thead {
        display: none;
      }

      tr {
        border-bottom: 3px solid ${(props) => props.theme['gray-100']};
        display: block;
        margin-bottom: 0.625em;
      }

      td {
        border-bottom: 1px solid ${(props) => props.theme['gray-100']};
        display: block;
        font-size: 0.8em;
        text-align: right;

        &::before {
          content: attr(data-label);
          float: left;
          font-weight: bold;
          text-transform: uppercase;
          color: ${(props) => props.theme['gray-100']};
        }

        &:first-child {
          width: initial;
          padding: 1rem;
        }

        &:last-child {
          border-bottom: 0;
          padding: 1rem;
        }
      }
    }
  }
`

const STATUS_COLORS = {
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
