import React, { useContext, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../Context';
import client from '../../services/api/api.client';
import { TitleH1Styled, UserAvatarStyled } from '../../styled';
import { HeaderStyled, OutButton, UserDropdownStyled } from './styled';
import SearchBar from '../SearchBar/index';

export default function Header({ followedUsers }) {
  const navigate = useNavigate();
  const [logOutButton, setLogOutButton] = useState(false);
  const { user } = useContext(Context);

  function logOut() {
    const promise = client.delete('/log-out', {});

    promise
      .then(() => {
        navigate('/');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      .catch(() => {
        navigate('/');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
  }

  return (
    <>
      <div>
        <HeaderStyled>
          <Link to="/timeline">
            <TitleH1Styled>linkr</TitleH1Styled>
          </Link>
          <DesktopSearchBarDisplay>
            <SearchBar followedUsers={followedUsers} />
          </DesktopSearchBarDisplay>
          <UserDropdownStyled onClick={() => setLogOutButton(!logOutButton)}>
            {logOutButton === false ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowUp />
            )}
            <UserAvatarStyled data-test="avatar" src={user?.photo} alt="avatar" />
          </UserDropdownStyled>
        </HeaderStyled>
        {logOutButton === false ? null : (
          <div data-test="menu">
            <OutButton data-test="logout" onClick={() => logOut()}>Log Out</OutButton>
          </div>
        )}
      </div>
      <MobileSearchBarDisplay>
        <MobileAbsolute>
          <SearchBar />
        </MobileAbsolute>
      </MobileSearchBarDisplay>
    </>
  );
}

const DesktopSearchBarDisplay = styled.div`
  width: 563px;
  @media (max-width: 850px) {
    display: none;
  }
`;

const MobileSearchBarDisplay = styled.div`
  position: relative;
  margin-right: 24px;
  margin-left: 24px;
`;

const MobileAbsolute = styled.div`
  top: 82px;
  position: absolute;
  width: 100%;
  @media (min-width: 850px) {
    display: none;
  }
`;
