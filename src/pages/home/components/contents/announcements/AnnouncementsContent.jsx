import React from 'react'
import styled from 'styled-components'
import { Palette } from '../../../../../shared/styled/theme'
import { Table, TableHead, TableRow, TableCell } from '../../../components/table';

function AnnouncementsContent() {
  return (
    <Container>
      <TopBar>
        <SearchInput
          type="text"
          placeholder="Search announcements..."
          // value={searchTerm}
          // onChange={handleSearchChange}
        />
        <AddAnnouncementButton 
        // disabled={isModalOpened} 
        // onClick={() => {
        //   setShowAccountRegisterModal(true);
        //   setIsModalOpened(true);
        // }}
        >Add Account</AddAnnouncementButton>
      </TopBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
        </tbody>
      </Table>
    </Container>
  )
}

const Container = styled.div`
  padding: 1em;
  box-sizing: border-box;
  position: relative;
  height: 100%;
`
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`

const SearchInput = styled.input`
  padding: 0.5em;
  border: 1px solid ${Palette.Secondary};
  border-radius: 5px;
  flex: 1;
  margin-right: 1em;
`

const AddAnnouncementButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    /* background-color: ${Palette.Accent}; */
  }
`

export default AnnouncementsContent