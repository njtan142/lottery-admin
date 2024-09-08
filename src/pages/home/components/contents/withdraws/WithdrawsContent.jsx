import React, { useState } from 'react'
import HTabs from '../../HTabs'
import { WITHDRAW_TABS } from '../../../../../shared/states/tabs'
import { Palette } from '../../../../../shared/styled/theme'
import styled from 'styled-components'

function WithdrawsContent() {
    const [selectedTab, setSelectedTab] = useState(WITHDRAW_TABS.REQUESTS)

    const handleTabChange = (tab) => {
        setSelectedTab(tab)
    }

    return (
        <Container>
            <HTabs selectedTab={selectedTab} onSelected={handleTabChange} TabsEnum={WITHDRAW_TABS} />
            <Divider></Divider>
        </Container>
    )
}

export default WithdrawsContent



const Container = styled.div`
  padding: 1em;
  box-sizing: border-box;
  position: relative;
  height: 100%;
`
const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${Palette.Secondary100};
    margin-top: 0.5rem;
`;