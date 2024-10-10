import styled from 'styled-components'
import { Palette } from '../../../shared/styled/theme';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHead = styled.thead`
  background-color: ${Palette.Primary300};
`

export const TableRow = styled.tr`
  border-bottom: 1px solid  ${Palette.Background300};
`

export const TableCell = styled.td`
  padding: 0.5em;
  text-align: left;
`

export const ActionButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${Palette.Accent};
  }
`
