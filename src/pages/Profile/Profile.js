import { useEffect, useState } from 'react';
import styled from 'styled-components';

import api from '../../utils/api';
import getJwtToken from '../../utils/getJwtToken';

const Wrapper = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #979797;
  font-size: 24px;
  font-weight: bold;
`;

const Photo = styled.img`
  margin-top: 24px;
`;

const Content = styled.div`
  margin-top: 24px;
`;

const LogoutButton = styled.button`
  margin-top: 24px;
`;

function Profile() {
  const [profile, setProfile] = useState();

  useEffect(() => {
    async function getProfile() {
      let jwtToken = window.localStorage.getItem('jwtToken');

      if (!jwtToken) {
        try {
          jwtToken = await getJwtToken();
        } catch (e) {
          window.alert(e.message);
          return;
        }
      }
      window.localStorage.setItem('jwtToken', jwtToken);

      const { data } = await api.getProfile(jwtToken);
      setProfile(data);
    }
    getProfile();
  }, []);

  return (
    <Wrapper>
      <Title>會員基本資訊</Title>
      {profile && (
        <>
          <Photo src={profile.picture} />
          <Content>{profile.name}</Content>
          <Content>{profile.email}</Content>
          <LogoutButton
            onClick={() => window.localStorage.removeItem('jwtToken')}
          >
            登出
          </LogoutButton>
        </>
      )}
    </Wrapper>
  );
}

export default Profile;
