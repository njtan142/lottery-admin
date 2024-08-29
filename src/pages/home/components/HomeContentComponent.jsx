import React, { useEffect } from 'react'
import styled from 'styled-components'
import HomeContent from './contents/HomeContent'
import AccountsContent from './contents/admin_accounts/AccountsContent';

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
