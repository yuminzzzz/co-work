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
  border: solid 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  border-radius: 6px;
  width: 30%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const UserAvatar = styled.img`
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
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0, rgba(0, 0, 0, 0.1) 0 8px 16px 0;
  border-radius: 6px;
  border-style: none;
  background-color: salmon;
  transition: all 0.25s ease-in;
  font-size: 16px;
  line-height: 50px;
  letter-spacing: 5px;
  display: block;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: tomato;
    transform: translateY(-5px);
  }
`;

const InfoContainer = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  border-radius: 6px;
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
  color: grey;
  background-color: #f0f2f5;
  color: #24292f;
  font-size: 16px;
  letter-spacing: 5px;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border-bottom: none;
  &:hover {
    background-color: salmon;
    color: #ffffff;
  }
`;

const BidBody = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  border-radius: 6px;
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
  background-color: #ffffff;
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
  cursor: pointer;
`;

const Shadow = styled.div`
  transition: 0.2s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const BidItemImg = styled.img`
  width: 100%;
  height: 60%;
  border-radius: 6px;
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

const EmptyPrompt = styled.div`
  margin: auto;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`;

function Profile() {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("userProfile")) || ""
  );
  const [secondHand, setSecondHand] = useState([]);
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
  const headButton = ["已得標", "上架商品", "下架商品"];
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
    let a = [];
    const response = await fetch(
      "https://claudia-teng.com/api/1.0/user/profile",
      {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    );
    const data = await response.json();
    localStorage.setItem("userProfile", JSON.stringify(data));
    a.push(JSON.parse(localStorage.getItem("userProfile")));
    console.log(a);
    console.log(JSON.parse(localStorage.getItem("userProfile")));
    setProfile(a);
  };
  const getUserSecondHand = async (token) => {
    const response = await fetch(
      "https://claudia-teng.com/api/1.0/second-hand/user",
      {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    );
    const data = await response.json();
    localStorage.setItem("userSecondHand", JSON.stringify(data));
    setSecondHand(JSON.parse(localStorage.getItem("userSecondHand")).data);
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
    await getUserProfile(token);
    await getUserSecondHand(token);
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
    getUserSecondHand(token);
  };
  const Logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userSecondHand");
    setUserToken([]);
    setProfile("");
    setSecondHand([]);
  };
  const featureSwitch = async (e) => {
    if (e.target.innerText === "已得標") {
      e.target.style.backgroundColor = "salmon";
      e.target.style.color = "#ffffff";
      setFeature({
        bitWin: true,
        launch: null,
        unLaunch: null,
      });
    } else if (e.target.innerText === "上架商品") {
      e.target.style.backgroundColor = "salmon";
      e.target.style.color = "#ffffff";
      setFeature({
        bitWin: null,
        launch: true,
        unLaunch: null,
      });
    } else if (e.target.innerText === "下架商品") {
      e.target.style.backgroundColor = "salmon";
      e.target.style.color = "#ffffff";
      setFeature({
        bitWin: null,
        launch: null,
        unLaunch: true,
      });
      const response = await fetch(
        "https://claudia-teng.com/api/1.0/second-hand/user"
      );
    }
  };
  const reverseFeatureSwitch = (e) => {
    if (e.target.innerText === "已得標") {
      e.target.style.backgroundColor = "#f0f2f5";
      e.target.style.color = "black";
    } else if (e.target.innerText === "上架商品") {
      e.target.style.backgroundColor = "#f0f2f5";
      e.target.style.color = "black";
    } else if (e.target.innerText === "下架商品") {
      e.target.style.backgroundColor = "#f0f2f5";
      e.target.style.color = "black";
    }
  };
  console.log("test", Boolean(profile));
  useEffect(() => {
    setValid({
      name: "",
      account: "",
      password: "",
    });
  }, [isRegisterPage]);
  return (
    <Wrapper>
      {!userToken.length > 0 && !profile ? (
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
              <UserAvatar src={profile.user.picture}></UserAvatar>
              <UserName> {profile.user.name}</UserName>
              <LogoutButton onClick={Logout}>登出</LogoutButton>
            </UserInfoContainer>
            <InfoContainer>
              <BidHead>
                {headButton.map((item, index) => (
                  <BidHeadButton
                    key={index}
                    onClick={(e) => featureSwitch(e)}
                    onBlur={(e) => reverseFeatureSwitch(e)}
                  >
                    {item}
                  </BidHeadButton>
                ))}
              </BidHead>
              <BidBody>
                {feature.bitWin && (
                  <>
                    {profile.complete.length > 0 ? (
                      profile.complete.map((item, index) => (
                        <BidItem key={index}>
                          <Shadow></Shadow>
                          <BidItemImg src={item.picture}></BidItemImg>
                          <BidItemBody>
                            <BidTitle>{item.title}</BidTitle>
                            <BidPrice>$ {item.price}</BidPrice>
                            <BidDeadline>
                              結標日期{" "}
                              {new Date(Date.parse(item.deadline)).getMonth() +
                                1}
                              /{new Date(Date.parse(item.deadline)).getDate()}{" "}
                              {new Date(Date.parse(item.deadline)).getHours()}:
                              {new Date(Date.parse(item.deadline)).getMinutes()}
                              :
                              {new Date(Date.parse(item.deadline)).getSeconds()}
                            </BidDeadline>
                          </BidItemBody>
                        </BidItem>
                      ))
                    ) : (
                      <EmptyPrompt>目前還沒有得標商品哦～</EmptyPrompt>
                    )}
                  </>
                )}
                {/* {feature.launch && (
                  <>
                    <h1>launch</h1>
                  </>
                )}
                {feature.unLaunch && (
                  <>
                    {secondHand.length > 0 ? (
                      secondHand.map((item, index) => (
                        <BidItem key={index}>
                          <Shadow></Shadow>
                          <BidItemImg src={item.picture}></BidItemImg>
                          <BidItemBody>
                            <BidTitle>{item.title}</BidTitle>
                            <BidPrice>$ {item.price}</BidPrice>
                          </BidItemBody>
                        </BidItem>
                      ))
                    ) : (
                      <EmptyPrompt>目前還沒有上架商品哦～</EmptyPrompt>
                    )}
                  </>
                )} */}
              </BidBody>
            </InfoContainer>
          </UserProfileContainer>
        </UserProfile>
      )}
    </Wrapper>
  );
}

export default Profile;
