import React, { useState } from 'react'
import styled from 'styled-components'
import { Palette } from '../../shared/styled/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

function ProfileFAB({ onSignOut }) { //Templated
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container onClick={toggleDropdown}>
      <Avatar>
        <FontAwesomeIcon icon={faUser} />
      </Avatar>
      <DropdownIcon >
        <FontAwesomeIcon icon={faCaretDown} />
      </DropdownIcon>
      {isOpen && (
        <DropdownList>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem onClick={onSignOut}>Logout</DropdownItem>
        </DropdownList>
      )}
    </Container>
  )
}

export default ProfileFAB

const DropdownIcon = styled.div`
`;

const Avatar = styled.div`
  border: 2px solid black;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Palette.Background200};
`;

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: calc(10px + 1em);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: ${Palette.Background100};
  border: 1px solid ${Palette.Background200};
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 120px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${Palette.Background200};
  }
`;