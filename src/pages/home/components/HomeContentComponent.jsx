import React, { useEffect } from 'react'
import styled from 'styled-components'
import HomeContent from './contents/home/HomeContent';
import AccountsContent from './contents/users/AccountsContent'
import LotteryContent from './contents/lottery/LotteryContent';
import WalletContent from './contents/wallet/WalletContent';
import AnnouncementsContent from './contents/announcements/AnnouncementsContent';

function HomeContentComponent({
  selectedTab,
  addSpecialTab,
  setMainTab,
  setSpecialTabs,
  getSpecialTabs,
  deleteSpecialTab,
  inEditMode,
  setInEditMode,
  userData,
  title
}) {

  return (
    <Container>
      {(() => {
        switch (selectedTab) { // 100 for admin, 200 for organizer
          case 101:
            return <HomeContent />;
          case 102:
            return <AccountsContent />;
          case 103:
            return <AnnouncementsContent />;
          case 104:
            return <LotteryContent />;
          case 105:
            return <WalletContent />;
          default:
            return <div>Loading...</div>;
        }
      })()}
      {
        title && title
      }
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding-top: 5em;
  position: relative;
`

export default HomeContentComponent
