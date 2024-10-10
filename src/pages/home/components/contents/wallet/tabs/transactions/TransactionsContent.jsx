import React from 'react'
import styled from 'styled-components'
import { Palette } from '../../../../../../../shared/styled/theme'
import { Table, TableHead, TableRow, TableCell, ActionButton } from '../../../../../components/table';


function TransactionsContent() {
  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Sender</TableCell>
            <TableCell>Receiver</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
        </tbody>
      </Table>
    </Container>
  )
}

const Container = styled.div`
  padding: 1em;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  flex: 1;
`


export default TransactionsContent