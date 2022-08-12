import { useEffect, useState } from "react";
import styled from "styled-components";

import api from "../../utils/api";
import getJwtToken from "../../utils/getJwtToken";
import logo from "./logo.png";

const Wrapper = styled.div`
  min-height: calc(100vh - 255px);
  background: #f0f2f5;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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

// usesrprofile page

const UserProfile = styled.div`
  width: 1280px;
`;

const UserProfileContainer = styled.div`
  display: flex;
`;

const UserInfoContainer = styled.div`
  border: solid 1px black;
  width: 30%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const UserAvatar = styled.div`
  border: solid 1px black;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 30px;
`;

const UserName = styled.h1`
  width: 80%;
  font-size: 24px;
  margin-bottom: 30px;
  word-wrap: break-word;
  text-align: center;
`;

const LogoutButton = styled.button`
  width: 50%;
  border: solid 1px black;
  font-size: 24px;
  line-height: 50px;
  letter-spacing: 5px;
  display: block;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  border: solid 1px black;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px;
`;

const BidHead = styled.div`
  width: 100%;
`;

const BidHeadButton = styled.button`
  font-size: 20px;
  width: 150px;
  line-height: 40px;
  border: solid 1px black;
  cursor: pointer;
`;

const BidBody = styled.div`
  border: solid 1px black;
  width: 100%;
  height: 400px;
  padding: 30px;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BidItem = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0, rgba(0, 0, 0, 0.1) 0 8px 16px 0;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-basis: 200px;
  height: 100%;
  position: relative;
  overflow: hidden;
  margin: 0 10px;
  & :hover {
    background-color: rgba(0, 0, 23, 0.05);
  }
  cursor: pointer;
`;

const Shadow = styled.div`
  transition: 0.2s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BidItemImg = styled.img`
  width: 100%;
  height: 60%;
`;

const BidItemBody = styled.div`
  height: 40%;
  padding: 15px;
`;

const BidTitle = styled.p`
  font-size: 18px;
  margin-bottom: 35px;
`;

const BidPrice = styled.p`
  font-size: 18px;
  color: red;
  margin-bottom: 10px;
`;

const BidDeadline = styled.p`
  font-size: 16px;
  color: grey;
`;

function Profile() {
  // const [profile, setProfile] = useState();
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || []
  );
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [valid, setValid] = useState({
    name: "",
    account: "",
    password: "",
  });
  const [feature, setFeature] = useState({
    bitWin: true,
    launch: null,
    unLaunch: null,
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
    const responseData = await response.json();
    const token = responseData.data.access_token;
    localStorage.setItem("userToken", token);
    setUserToken(localStorage.getItem("userToken"));
  };

  const getUserProfile = async (token) => {
    const response = await fetch(
      "https://claudia-teng.com/api/1.0/user/profile",
      {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
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
    const responseData = await response.json();
    const token = responseData.data.access_token;
    localStorage.setItem("userToken", token);
    setUserToken(localStorage.getItem("userToken"));
  };

  const fbLogin = async () => {
    const data = {
      provider: "facebook",
      access_token: await getJwtToken(),
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
    const responseData = await response.json();
    const token = responseData.data.access_token;
    localStorage.setItem("userToken", token);
    setUserToken(localStorage.getItem("userToken"));
    getUserProfile(token);
  };

  const Logout = () => {
    localStorage.removeItem("userToken");
    setUserToken([]);
  };

  const featureSwitch = (e) => {
    if (e.target.innerText === "已得標") {
      setFeature({
        bitWin: true,
        launch: null,
        unLaunch: null,
      });
    }
    if (e.target.innerText === "上架") {
      setFeature({
        bitWin: null,
        launch: true,
        unLaunch: null,
      });
    }
    if (e.target.innerText === "下架") {
      setFeature({
        bitWin: null,
        launch: null,
        unLaunch: true,
      });
    }
  };
  useEffect(() => {
    setValid({
      name: "",
      account: "",
      password: "",
    });
  }, [isRegisterPage]);

  return (
    <Wrapper>
      {!userToken.length > 0 ? (
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
              <FacebookLoginButton onClick={fbLogin}>
                以facebook登入
              </FacebookLoginButton>
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
      ) : (
        <UserProfile>
          <UserProfileContainer>
            <UserInfoContainer>
              <UserAvatar></UserAvatar>
              <UserName>rqmu0114@gmail.com</UserName>
              <LogoutButton onClick={Logout}>登出</LogoutButton>
            </UserInfoContainer>
            <InfoContainer>
              <BidHead>
                <BidHeadButton onClick={(e) => featureSwitch(e)}>
                  已得標
                </BidHeadButton>
                <BidHeadButton onClick={(e) => featureSwitch(e)}>
                  上架
                </BidHeadButton>
                <BidHeadButton onClick={(e) => featureSwitch(e)}>
                  下架
                </BidHeadButton>
              </BidHead>
              <BidBody>
                {feature.bitWin && (
                  <>
                    <BidItem>
                      <Shadow></Shadow>
                      <BidItemImg></BidItemImg>
                      <BidItemBody>
                        <BidTitle>得標商品</BidTitle>
                        <BidPrice>結標金額</BidPrice>
                        <BidDeadline>結標日期</BidDeadline>
                      </BidItemBody>
                    </BidItem>
                    <BidItem>
                      <Shadow></Shadow>
                      <BidItemImg></BidItemImg>
                      <BidItemBody>
                        <BidTitle>得標商品</BidTitle>
                        <BidPrice>結標金額</BidPrice>
                        <BidDeadline>結標日期</BidDeadline>
                      </BidItemBody>
                    </BidItem>
                    <BidItem>
                      <Shadow></Shadow>
                      <BidItemImg></BidItemImg>
                      <BidItemBody>
                        <BidTitle>得標商品</BidTitle>
                        <BidPrice>結標金額</BidPrice>
                        <BidDeadline>結標日期</BidDeadline>
                      </BidItemBody>
                    </BidItem>
                    <BidItem>
                      <Shadow></Shadow>
                      <BidItemImg></BidItemImg>
                      <BidItemBody>
                        <BidTitle>得標商品</BidTitle>
                        <BidPrice>結標金額</BidPrice>
                        <BidDeadline>結標日期</BidDeadline>
                      </BidItemBody>
                    </BidItem>
                  </>
                )}
                {feature.launch && (
                  <>
                    <h1>launch</h1>
                  </>
                )}
                {feature.unLaunch && (
                  <>
                    <h1>unLaunch</h1>
                  </>
                )}
              </BidBody>
            </InfoContainer>
          </UserProfileContainer>
        </UserProfile>
      )}
    </Wrapper>
  );
}

export default Profile;

