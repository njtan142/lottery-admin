import React from 'react'
import styled from 'styled-components'

function Title() { //Templated
    const image = "https://cdn.vectorstock.com/i/500p/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
    return (
        <Container>
            <img
                src={image}
                alt="" 
            />
            Lottery
        </Container>
    )
}

export default Title

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5em;
  margin: 0.5em;
  display: flex;
  align-items: center;
  gap: 0.5em;

  img{
    height: 50px;
    width: 50px;
    object-fit: cover;
  }
`;