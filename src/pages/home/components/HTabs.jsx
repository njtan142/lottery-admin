import React from 'react'
import styled from 'styled-components'
import {Palette} from '../../../shared/styled/theme'

function HTabs({ selectedTab, onSelected, TabsEnum }) {
    const tabs = Object.values(TabsEnum).filter(tab => tab !== '');
    return (
        <div>
            <Container>
                {tabs.map((tab, index) => (
                    <Tab key={index} selected={selectedTab === tab} onClick={() => onSelected(tab)}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Tab>
                ))}
            </Container>
        </div>
    );
}

export default HTabs;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const Tab = styled.div`
  padding: 0.5em 1em;
  cursor: pointer;
  border-bottom: ${(props) => (props.selected ? `2px solid ${Palette.Accent}` : "none")};
`;

