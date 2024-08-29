import styled, { css } from 'styled-components'


const Card = styled.div<{ $radius: number, $elevation: number, $color: string }>`
  &:first-child {
  padding: 1em;
  }
  
  ${(props) =>
    (props.$radius && props.$elevation) &&
    css`
      background-color: ${props.$color};
      border-radius: ${props.$radius}px;
      box-shadow: 5px 5px 13px 2px rgba(0,0,0, ${(props.$elevation * 0.25)});
    `};
`


export default Card