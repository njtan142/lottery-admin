import React, { useState } from 'react'
import styled from 'styled-components'
import HTabs from '../../HTabs'
import { HOMETABS } from '../../../../../shared/states/tabs'
import { Palette } from '../../../../../shared/styled/theme'


function HomeContent() {
  const [selectedTab, setSelectedTab] = useState(HOMETABS.DASHBOARD)
  
  const handleTabChange = (tab) => {
    setSelectedTab(tab)
  }
  
  return (
    <Container>
      <HTabs selectedTab={selectedTab} onSelected={handleTabChange} TabsEnum={HOMETABS}/>
      <Divider></Divider>
    </Container>
  )
}

export default HomeContent


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