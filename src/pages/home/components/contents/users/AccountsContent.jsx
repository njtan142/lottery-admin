import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { listenToCollectionChanges, filterMapListByValue, registerUser, saveData, getUID } from '../../../functions';
import { auth, firestore, getTemporaryAuth } from '../../../../../apis/firebase/firebase';
import AccountRegisterModal from './AccountRegisterModal';
import AccountEditModal from './AccountEditModal';
import { signOut } from '@firebase/auth';
import { Palette } from '../../../../../shared/styled/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../../../../settings/constants';
import { Table, TableHead, TableRow, TableCell, ActionButton } from '../../../components/table';

function AccountsContent() { // Templated
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAccountRegisterModal, setShowAccountRegisterModal] = useState(false);
  const [showAccountEditModal, setShowAccountEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const colName = 'users'

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 3;

    const fetchData = () => {
      try {
        listenToCollectionChanges(firestore, colName, (data) => {
          setAccounts(data);
          setFilteredAccounts(data);
        });
      } catch (error) {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(fetchData, 2000); // retry after 2 seconds
        } else {
          alert("Failed to fetch data after multiple attempts. Please try again later.");
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    try {
      if (accounts.length > 0) {
        const filtered = filterMapListByValue(accounts, searchTerm, 'includes');
        setFilteredAccounts(filtered);
      } else {
        console.warn("Accounts list is empty, skipping filter operation.");
      }
    } catch (error) {
      console.error("Error filtering accounts: ", error);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRegisterModalClose = () => {
    setShowAccountRegisterModal(false);
    setIsModalOpened(false);
  }

  const onRegisterModalSubmit = async (formData, password) => {
    try {
      const auth = getTemporaryAuth();
      const userCredential = await registerUser(auth, formData.email, password);
      if (userCredential != null) {
        await signOut(auth);
        await saveData(firestore, colName, formData, null, userCredential.user.uid);
        alert("Successfully registered!");
        handleRegisterModalClose();
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      alert("Failed to register. Please try again.");
    }
  }

  const handleEditModalOpen = (account) => {
    setSelectedAccount(account);
    setShowAccountEditModal(true);
    setIsModalOpened(true);
  }

  const handleEditModalClose = () => {
    setShowAccountEditModal(false);
    setIsModalOpened(false);
  }

  const onEditModalSubmit = async (formData) => {
    const {id, ...accountData} = {...selectedAccount};
    const newData = {...accountData, ...formData};

    if(!selectedAccount.privilege.admin && newData.privilege.admin) {
      if (!window.confirm('You\'re assigning admin privileges to this account. You cannot undo this action, continue?')) {
        return;
      }
    }

    if(selectedAccount.privilege.admin && selectedAccount.privilege.admin !== newData.privilege.admin) {
     if(id != getUID(auth)) {
      alert("Removing other account's admin privileges is not allowed.");
      return;
     }
    }

    let willSignOut = false;
    if(id == getUID(auth)) {
      if (window.confirm('Changing your own privileges will sign you out, continue?')) {
        willSignOut = true;
      } else {
        return;
      }
    }

    await saveData(firestore, colName, newData, null, id);
    handleEditModalClose();

    if(willSignOut) {
      await signOut(auth);
    }
  }

  return (
    <Container>
      <TopBar>
        <SearchInput
          type="text"
          placeholder="Search accounts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <AddAccountButton disabled={isModalOpened} onClick={() => {
            setShowAccountRegisterModal(true);
            setIsModalOpened(true);
        }}>Add Account</AddAccountButton>
      </TopBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Roles</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {(searchTerm.length > 0 ? filteredAccounts : accounts).map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.name != null ? `${account.name}` : `${account.firstName} ${account.lastName}`}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.privilege[ROLES.ADMIN] ? "Admin" : '  ' + account.privilege[ROLES.USER] ? "User" : ""}</TableCell>
              <TableCell className='flex gap-1'>
                <ActionButton disabled={isModalOpened} onClick={() => {
                    handleEditModalOpen(account);
                    setIsModalOpened(true);
                }}><FontAwesomeIcon icon={faEdit} /></ActionButton>
                <ActionButton disabled={isModalOpened} onClick={() => {alert("Roses are red, violets are blue, You should implement this yourself")}}><FontAwesomeIcon icon={faTrash} /></ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {showAccountRegisterModal && <AccountRegisterModal onSubmit={onRegisterModalSubmit} onCancel={handleRegisterModalClose}/>}
      {showAccountEditModal && <AccountEditModal onSubmit={onEditModalSubmit} onCancel={handleEditModalClose} data={selectedAccount}/>}
    </Container>
  )
}


const Container = styled.div`
  padding: 1em;
  box-sizing: border-box;
  position: relative;
  height: 100%;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li::before {
    content: "#";
    margin-right: 0.5em;
  }
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

const AddAccountButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    /* background-color: ${Palette.Accent}; */
  }
`





export default AccountsContent
