import React, { useState } from 'react'
import HTabs from '../../HTabs'
import { WALLET_TABS } from '../../../../../shared/states/tabs'
import { Palette } from '../../../../../shared/styled/theme'
import styled from 'styled-components'
import WithdrawsContent from './tabs/withdraws/WithdrawsContent'
import DepositsContent from '../deposits/DepositsContent'
import TransactionsContent from './tabs/transactions/TransactionsContent'

function WalletContent() {
    const [selectedTab, setSelectedTab] = useState(WALLET_TABS.SUMMARY)

    const handleTabChange = (tab) => {
        setSelectedTab(tab)
    }

    return (
        <Container>
            <HTabs selectedTab={selectedTab} onSelected={handleTabChange} TabsEnum={WALLET_TABS} />
            <Divider></Divider>
            {(() => {
                switch (selectedTab) { // 100 for admin, 200 for organizer
                    case WALLET_TABS.SUMMARY:
                        return <><h1>Under Development</h1></>;
                    case WALLET_TABS.WITHDRAWS:
                        return <WithdrawsContent />;
                    case WALLET_TABS.DEPOSITS:
                        return <DepositsContent />;
                    case WALLET_TABS.TRANSACTIONS:
                        return <TransactionsContent />;
                    default:
                        return <div>Loading...</div>;
                }
            })()}
        </Container>
    )
}

export default WalletContent



const Container = styled.div`
  padding: 1em;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${Palette.Secondary100};
    margin-top: 0.5rem;
`;