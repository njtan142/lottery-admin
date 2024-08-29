import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkLoggedIn, listenToCollectionChanges } from './functions';
import { auth, firestore } from '@/apis/firebase/firebase';
import HomeHeaderComponent from './components/HomeHeaderComponent';
import styled from 'styled-components';
import HomeSidebarComponent from './components/HomeSidebarComponent';
import HomeContentComponent from './components/HomeContentComponent';
import { getDocument } from '@/shared/functions/database';
import { checkMultipleUserPrivileges } from '../../shared/functions/data';
import { ROLES, VIEWMODE } from '../../settings/constants';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AsyncBoolean from '../../shared/states/async_boolean';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import ProfileFAB from './ProfileFAB';
import Title from './title';


function HomePage() {
    const [selectedTab, setSelectedTab] = useState(101); //100 for admin, 200 for organizer
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(AsyncBoolean.CHECKING)
    const [userData, setUserData] = useState(null);
    const [specialTabs, setSpecialTabs] = useState([]);
    const [inEditMode, setInEditMode] = useState(false);

    useEffect(() => { //check if the user is logged in
        /**
         * TODO: Uncomment this to check if the user is logged in
         */
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(AsyncBoolean.TRUE)
            } else {
                setLoggedIn(AsyncBoolean.FALSE)
            }
        })
        setLoggedIn(AsyncBoolean.TRUE)
    }, [])

    useEffect(() => { //handle loggedIn state
        if (loggedIn === AsyncBoolean.CHECKING) {
            return;
        }
        if (loggedIn === AsyncBoolean.FALSE) {
            navigate('/login')
        }
        if (loggedIn === AsyncBoolean.TRUE) {
            getUserData();
        }
    }, [loggedIn])

    const getUserData = async () => {
        /**
         * TODO: Uncomment this to get the user data
         */
        // const user = auth.currentUser;
        // const userData = await getDocument(firestore, "users", user.uid)
        setUserData({});
    }

    const handleSignOut = async () => {
        await signOut(auth)
        console.log("signed out")
        setLoggedIn(AsyncBoolean.FALSE)
    }

    const addSpecialTab = (tab) => {
        if (!specialTabs.some(existingTab => existingTab.id === tab.id)) {
            setSpecialTabs([...specialTabs, tab]);
        }
    }

    const deleteSpecialTab = (tab, doFallBack = true) => {
        setSpecialTabs(specialTabs.filter(existingTab => {
            return existingTab.id !== tab.id
        }));
        if (!doFallBack) {
            return;
        }
        setTimeout(() => {
            if (selectedTab === tab.id) {
                if (tab.fallback) {
                    setSelectedTab(tab.fallback);
                } else if (isAdmin) {
                    setSelectedTab(101);
                } else if (isOrganizer) {
                    setSelectedTab(201);
                }
            } else {
                setSelectedTab(selectedTab)
            }
        }, 300);
    }

    const getSpecialTabs = () => {
        return specialTabs;
    }


    return loggedIn == AsyncBoolean.CHECKING ? (
        <div>
            Loading...
        </div>
    ) : (
        <Container>
            <Content>
                <HomeSidebarComponent
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    specialTabs={specialTabs}
                    deleteSpecialTab={deleteSpecialTab}
                    inEditMode={inEditMode}
                    setInEditMode={setInEditMode}
                    userData={userData}
                    header={
                        <HomeHeaderComponent onSignOut={handleSignOut} userData={userData} />
                    }

                />
                <HomeContentComponent
                    selectedTab={selectedTab}
                    addSpecialTab={addSpecialTab}
                    setMainTab={setSelectedTab}
                    setSpecialTabs={setSpecialTabs}
                    getSpecialTabs={getSpecialTabs}
                    deleteSpecialTab={deleteSpecialTab}
                    inEditMode={inEditMode}
                    setInEditMode={setInEditMode}
                    userData={userData}
                    title={
                        <Title />
                    }
                />

            </Content>
            <ProfileFAB onSignOut={handleSignOut} />
        </Container>
    )
}

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
    /* overflow-y: auto; */
    overflow-x: auto;       
    box-sizing: border-box;
`;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
`;

export default HomePage
