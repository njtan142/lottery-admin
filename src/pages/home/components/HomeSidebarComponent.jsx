import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import TabItem from './TabItem';
import { Palette } from '../../../shared/styled/theme';

function HomeSidebarComponent({ selectedTab, setSelectedTab, specialTabs, deleteSpecialTab, inEditMode, setInEditMode, userData, header }) {
  const containerRef = useRef(null);



  useEffect(() => {
    /**
     * Do something if it needs to be changed
     */
  }, [userData]);


  const startResizing = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
  };

  const resize = (e) => {
    if (containerRef.current) {
      containerRef.current.style.width = `${e.clientX - containerRef.current.getBoundingClientRect().left}px`;
    }
  };

  const stopResizing = () => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResizing);
  };

  const handleSelect = (index) => {
    if (inEditMode) {
      if (!window.confirm("You are in the midst of editing something, changing tabs will make you lose progress, continue?")) {
        return;
      }
    }
    setInEditMode(false);
    setSelectedTab(index);
  };

  return (
    <Container ref={containerRef}>
      {
        header && <>
          {
            header
          }
          <hr />
        </>
      }
      <ResizeHandle onMouseDown={startResizing} />
      <TabItem title="Home" selected={selectedTab === 101} onClick={() => handleSelect(101)} />
      <TabItem title="Users" selected={selectedTab === 102} onClick={() => handleSelect(102)} />
      <TabItem title="Announcements" selected={selectedTab === 103} onClick={() => handleSelect(103)} />
      <TabItem title="Lotteries" selected={selectedTab === 104} onClick={() => handleSelect(104)} />
      <TabItem title="Deposit" selected={selectedTab === 105} onClick={() => handleSelect(105)} />
      <TabItem title="Withdrawal" selected={selectedTab === 106} onClick={() => handleSelect(106)} />
      <TabItem title="Wallet" selected={selectedTab === 107} onClick={() => handleSelect(107)} />
      <TabItem title="Transactions" selected={selectedTab === 108} onClick={() => handleSelect(108)} />
      <TabItem title="Settings" selected={selectedTab === 109} onClick={() => handleSelect(109)} />
      {specialTabs.map((tab) => {
        return <TabItem key={tab.id} title={tab.name} selected={selectedTab === tab.id} onClick={() => handleSelect(tab.id)} onDelete={() => deleteSpecialTab(tab)} id={tab.id} />
      })}
    </Container>
  )

}

const Container = styled.div`
    width: 300px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    box-sizing: border-box;
    box-shadow: 2px 0px 2px 0px rgba(0, 0, 0, 0.1);
    background-color: ${Palette.Background100};
    gap: 1em;
    height: 100%;
    position: relative;
    hr{
      border-color: ${Palette.Background200};
    }
`;

const ResizeHandle = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 100%;
    cursor: ew-resize;
`;

export default HomeSidebarComponent
