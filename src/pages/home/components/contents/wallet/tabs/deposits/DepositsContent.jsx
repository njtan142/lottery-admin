import React, { useState } from 'react'
import styled from 'styled-components'
import { DEPOSIT_TABS } from '../../../../../../../shared/states/tabs'
import HTabs from '../../../../HTabs'
import { Palette } from '../../../../../../../shared/styled/theme'
import { Table, TableHead, TableRow, TableCell, ActionButton } from '../../../../../components/table';

function DepositsContent() {
    const [selectedTab, setSelectedTab] = useState(DEPOSIT_TABS.REQUESTS)

    const handleTabChange = (tab) => {
        setSelectedTab(tab)
    }

  return (
    <Container>
            <HTabs selectedTab={selectedTab} onSelected={handleTabChange} TabsEnum={DEPOSIT_TABS} />
        <Divider></Divider>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Requester</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>GCash Number</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Action</TableCell>
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
  /* border: 1px solid red; */
  flex: 1;

 
`

const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${Palette.Secondary100};
    margin-top: 0.5rem;
`;

export default DepositsContent