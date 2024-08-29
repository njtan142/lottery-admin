import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Palette } from '../../../shared/styled/theme';

function HomeHeaderComponent({}) { //Templated
 

  useEffect(() => {
    /**
     * Do something if it needs to be changed
     */
  }, []);

  return (
    <Container>
      <h1>Lottery</h1>
    </Container>
  )
}

const Container = styled.div.attrs({
  className: "custom classes"
})`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 5px 2px ${Palette.Secondary200};
    padding: 1em;
    box-sizing: border-box;
    background-color: ${Palette.Background100};
    h1{
        margin: 0;
    }
`;



export default HomeHeaderComponent

