import { useEffect, useState } from "react";
import styled from "styled-components";

import api from "../../utils/api";
import getJwtToken from "../../utils/getJwtToken";
import logo from "./logo.png";

const Wrapper = styled.div`
  height: calc(100vh - 255px);
  background: #f0f2f5;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const Title = styled.div`
//   padding-bottom: 16px;
//   border-bottom: 1px solid #979797;
//   font-size: 24px;
//   font-weight: bold;
// `;

// const Photo = styled.img`
//   margin-top: 24px;
// `;

// const Content = styled.div`
//   margin-top: 24px;
// `;

// const LogoutButton = styled.button`
//   margin-top: 24px;
// `;

const LoginContainer = styled.div`
  position: relative;
  border: 1px solid #dddfe2;
  width: 396px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0, rgba(0, 0, 0, 0.1) 0 8px 16px 0;
  padding: 16px 0;
`;

const Logo = styled.img.attrs({ src: logo })`
  width: 258px;
  height: 48px;
`;

const InputSection = styled.div`
  padding-top: 10px;
  margin-bottom: 6px;
`;

const InputContainer = styled.div`
  border-radius: 6px;
  width: 364px;
  height: 64px;
  padding: 6px 0;
  margin: auto;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #dddfe2;
  border-radius: 6px;
  padding: 14px 16px;
  line-height: 22px;
`;

const LoginButton = styled.button`
  background-color: light-grey;
  width: 364px;
  height: 48px;
  border-style: none;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  font-size: 21px;
  margin: 6px 0;
  ${"" /* :hover :background-color: #dfdfd; */}
`;

const Divider = styled.div`
  width: 364px;
  border-top: 1px solid #dddfe2;
  margin: 20px auto;
  padding: 0 16px;
`;

const FacebookLoginButton = styled.button`
  background-color: #1877f2;
  width: 364px;
  height: 48px;
  border-style: none;
  border-radius: 6px;
  color: #ffffff;
  font-weight: 500;
  font-size: 21px;
  margin: 6px 0;
`;

const RegisterButton = styled.button`
  width: 122px;
  height: 48px;
  line-height: 48px;
  background-color: #42b72a;
  border-style: none;
  color: #ffffff;
  padding: 0 16px;
  border-radius: 6px;
  text-align: center;
`;

const ReturnLoginButton = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 16px;
  left: 10px;
  cursor: pointer;
`;

function Profile() {
  const [profile, setProfile] = useState();
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [valid, setValid] = useState({
    name: "",
    account: "",
    password: "",
  });
  const validation = (e) => {
    if (e.target.placeholder === "請輸入名字") {
      if (e.target.value) {
        e.target.style.color = "black";
        e.target.style.borderColor = "#dddfe2";
        setValid((pre) => {
          return { ...pre, name: e.target.value };
        });
      } else {
        e.target.style.borderColor = "red";
        e.target.style.color = "red";
      }
    }
    if (e.target.className.match("accountValid")) {
      let result =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/.test(
          e.target.value
        );
      if (result) {
        e.target.style.color = "black";
        e.target.style.borderColor = "#dddfe2";
        setValid((pre) => {
          return { ...pre, account: e.target.value };
        });
      } else {
        e.target.style.borderColor = "red";
        e.target.style.color = "red";
      }
    }
    if (e.target.className.match("password")) {
      let result = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/.test(
        e.target.value
      );
      if (result) {
        e.target.style.color = "black";
        e.target.style.borderColor = "#dddfe2";
        setValid((pre) => {
          return { ...pre, password: e.target.value };
        });
      } else {
        e.target.style.borderColor = "red";
        e.target.style.color = "red";
      }
    }
  };
  const register = async () => {
    if (Object.values(valid).some((item) => item === "")) return;
    // 串註冊 api
    const data = {
      name: valid.name,
      email: valid.account,
      password: valid.password,
    };
    const response = await fetch(
      "https://claudia-teng.com/api/1.0/user/signup",
      {
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        method: "POST",
      }
    );
    console.log(await response.json());
  };
  const login = async () => {
    const inputCheck = Object.values(valid).filter(
      (item) => item !== ""
    ).length;
    if (inputCheck < 2) return;
    // 串登入 api
    const data = {
      provider: "native",
      email: valid.account,
      password: valid.password,
    };
    const response = await fetch(
      "https://claudia-teng.com/api/1.0/user/signin",
      {
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        method: "POST",
      }
    );
    console.log(await response.json());
  };

  useEffect(() => {
    setValid({
      name: "",
      account: "",
      password: "",
    });
  }, [isRegisterPage]);

  useEffect(() => {
    async function getProfile() {
      let jwtToken = window.localStorage.getItem("jwtToken");

      if (!jwtToken) {
        try {
          jwtToken = await getJwtToken();
        } catch (e) {
          window.alert(e.message);
          return;
        }
      }
      window.localStorage.setItem("jwtToken", jwtToken);

      const { data } = await api.getProfile(jwtToken);
      setProfile(data);
    }
    getProfile();
  }, []);
  return (
    <Wrapper>
      <LoginContainer>
        {!isRegisterPage && (
          <>
            <Logo></Logo>
            <InputSection>
              <InputContainer>
                <Input
                  placeholder="請輸入帳號或電子郵件"
                  autoFocus="1"
                  className="accountValid"
                  onBlur={(e) => validation(e)}
                ></Input>
              </InputContainer>
              <InputContainer>
                <Input
                  placeholder="請輸入密碼"
                  className="passwordValid"
                  type="password"
                  onBlur={(e) => validation(e)}
                ></Input>
              </InputContainer>
            </InputSection>
            <LoginButton onClick={login}>登入</LoginButton>
            <FacebookLoginButton>以facebook登入</FacebookLoginButton>
            <Divider></Divider>
            <RegisterButton onClick={() => setIsRegisterPage(true)}>
              建立新帳號
            </RegisterButton>
          </>
        )}
        {isRegisterPage && (
          <>
            <ReturnLoginButton onClick={() => setIsRegisterPage(false)}>
              {"<<"}
            </ReturnLoginButton>
            <Logo></Logo>
            <InputSection>
              <InputContainer>
                <Input
                  placeholder="請輸入名字"
                  autoFocus="1"
                  onBlur={(e) => validation(e)}
                ></Input>
              </InputContainer>
              <InputContainer>
                <Input
                  placeholder="請輸入電子郵件"
                  className="accountValid"
                  onBlur={(e) => validation(e)}
                ></Input>
              </InputContainer>
              <InputContainer>
                <Input
                  placeholder="請輸入6~16位密碼(含1大寫＆小寫英文及數字)"
                  className="passwordValid"
                  type="password"
                  onBlur={(e) => validation(e)}
                ></Input>
              </InputContainer>
            </InputSection>
            <LoginButton onClick={register}>註冊</LoginButton>
          </>
        )}
      </LoginContainer>
      {/* <Title>會員基本資訊</Title>
      {profile && (
        <>
          <Photo src={profile.picture} />
          <Content>{profile.name}</Content>
          <Content>{profile.email}</Content>
          <LogoutButton
            onClick={() => window.localStorage.removeItem("jwtToken")}
          >
            登出
          </LogoutButton>
        </>
      )} */}
    </Wrapper>
  );
}

export default Profile;
