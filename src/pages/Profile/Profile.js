import { useEffect, useState } from "react";
import styled from "styled-components";

import api from "../../utils/api";
import getJwtToken from "../../utils/getJwtToken";
import logo from "./logo.png";
import trash from "./cart-remove.png";

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

const Trash = styled.img.attrs({ src: trash })`
  position: absolute;
  bottom: 5px;
  right: 3px;
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
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in;
    background-color: #dfdfd;
  }
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
  cursor: pointer;
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
  cursor: pointer;
`;

const ReturnLastPage = styled.div`
  position: absolute;
  left: 0;
  width: 5px;
  ${"" /* border: solid 1px salmon; */}
  background-color: salmon;
  transition: ease 0.2s;
  height: 100%;
  top: 0;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    width: 14px;
    background-color: orange;
  }
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
  ${
    "" /* box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0, rgba(0, 0, 0, 0.1) 0 8px 16px 0; */
  }
  border: solid 1px rgba(0, 0, 0, 0.2);

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
    background-color: orange;
    transform: translateY(-5px);
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0, rgba(0, 0, 0, 0.1) 0 8px 16px 0;
    font-size: 18px;
  }
`;

// feature page

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

const InfoHead = styled.div`
  width: 100%;
`;

const InfoHeadButton = styled.button`
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
  ${
    "" /* &:hover {
    background-color: orange;
    color: #ffffff;
  } */
  }
`;

const InfoBody = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.2);
  position: relative;
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

const Item = styled.div`
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

const ItemImg = styled.img`
  width: 100%;
  height: 60%;
  border-radius: 6px;
`;

const ItemBody = styled.div`
  height: 40%;
  padding: 15px;
`;

const ItemTitle = styled.p`
  font-size: 18px;
  margin-bottom: 42px;
`;

const ItemPrice = styled.p`
  font-size: 18px;
  color: red;
  margin-bottom: 10px;
`;

const ItemNote = styled.p`
  font-size: 16px;
  color: grey;
`;

const EmptyPrompt = styled.div`
  margin: auto;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`;

// launch page

const LaunchBody = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  top: 0;
  left: 0;
  background-color: rgb(255, 99, 71, 0.3);
  cursor: pointer;
  border: dashed 2px salmon;
`;

const LaunchBodyContent = styled.label`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LaunchButton = styled.div`
  border-style: none;
  background-color: salmon;
  font-weight: 700;
  padding: 10px 15px;
  font-size: 14px;
  color: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const LaunchPrompt = styled.p`
  font-size: 14px;
  letter-spacing: 1px;
  color: grey;
`;

// photo upload

const PhotoContainer = styled.div`
  width: 50%;
  height: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 6px;
  border: dashed 2px salmon;
`;

// product info

const ProductContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProductDetailInput = styled.input`
  height: 50px;
  width: 100%;
  margin-bottom: 20px;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  font-size: 14px;
  padding: 10px 20px;
`;

const ProductDescription = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  font-size: 14px;
  padding: 10px 20px;
  ${
    "" /* &:focus-within {
    border: solid 1px inherit;
  } */
  }
`;

function Profile() {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("userProfile")) || null
  );
  const [secondHand, setSecondHand] = useState(
    JSON.parse(localStorage.getItem("userSecondHand")) || []
  );
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
    launch: true,
    myLaunch: null,
    bitWin: null,
  });
  const [uploaded, setUploaded] = useState({
    first: "",
    second: "",
    third: "",
  });
  const [isUploaded, setIsUploaded] = useState(null);
  const [launchProductList, setLaunchProductList] = useState({
    title: null,
    description: null,
    price: null,
    story: null,
    main_image: null,
    other_images_1: null,
    other_images_2: null,
  });
  const styling = {
    direction() {
      if (feature.launch) {
        return { flexDirection: "column" };
      } else {
        return { flexDirection: "row" };
      }
    },
    uploaded() {
      if (isUploaded) {
        return { height: "70%", width: "50%" };
      } else if (uploaded.first) {
        return { height: "70%" };
      }
    },
    photoContainerWidth() {
      if (isUploaded) {
        return { width: "50%" };
      } else {
        return { width: "100%" };
      }
    },
    headButton: ["上架商品", "我的商品", "已得標"],
  };
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
    if (e.target.placeholder === "商品名稱") {
      if (e.target.value) {
        e.target.style.color = "black";
        e.target.style.borderColor = "#dddfe2";
        setLaunchProductList((pre) => {
          return { ...pre, title: e.target.value };
        });
      } else {
        e.target.style.borderColor = "red";
        e.target.style.color = "red";
      }
    }
    if (e.target.placeholder === "商品敘述") {
      if (e.target.value) {
        e.target.style.color = "black";
        e.target.style.borderColor = "#dddfe2";
        setLaunchProductList((pre) => {
          return { ...pre, description: e.target.value };
        });
      } else {
        e.target.style.borderColor = "red";
        e.target.style.color = "red";
      }
    }
    if (e.target.placeholder === "設定價位") {
      let result = /^\d+(,\d{1,2})?$/.test(e.target.value);
      if (result) {
        e.target.style.color = "black";
        e.target.style.borderColor = "#dddfe2";
        setLaunchProductList((pre) => {
          return { ...pre, price: e.target.value };
        });
      } else {
        e.target.style.borderColor = "red";
        e.target.style.color = "red";
      }
    }
    if (e.target.placeholder === "商品細節") {
      if (e.target.value) {
        e.target.style.color = "black";
        e.target.style.borderColor = "#dddfe2";
        setLaunchProductList((pre) => {
          return { ...pre, story: e.target.value };
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
    getUserProfile(token);
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
    const data = await response.json();
    localStorage.setItem("userProfile", JSON.stringify(data));
    setProfile(JSON.parse(localStorage.getItem("userProfile")));
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
    localStorage.setItem("userSecondHand", JSON.stringify(data.data));
    setSecondHand(JSON.parse(localStorage.getItem("userSecondHand")));
  };
  const deleteUserSecondHand = async (id, token) => {
    if (window.confirm("確定要下架商品嗎？")) {
      await fetch(`https://claudia-teng.com/api/1.0/second-hand/user/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      });
      await getUserSecondHand(token);
    }
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
    setFeature({
      bitWin: true,
      launch: null,
      myLaunch: null,
    });
    setUserToken([]);
    setProfile(null);
    setSecondHand([]);
  };
  const featureSwitch = async (e) => {
    if (e.target.innerText === "上架商品") {
      e.target.style.backgroundColor = "salmon";
      e.target.style.color = "#ffffff";
      setFeature({
        launch: true,
        myLaunch: null,
        bitWin: null,
      });
    } else if (e.target.innerText === "我的商品") {
      e.target.style.backgroundColor = "salmon";
      e.target.style.color = "#ffffff";
      setFeature({
        launch: null,
        myLaunch: true,
        bitWin: null,
      });
    } else if (e.target.innerText === "已得標") {
      e.target.style.backgroundColor = "salmon";
      e.target.style.color = "#ffffff";
      setFeature({
        launch: null,
        myLaunch: null,
        bitWin: true,
      });
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
  const formData = new FormData();
  console.log(launchProductList);
  for (let item in launchProductList) {
    // console.log(item, launchProductList[item]);
    formData.append(item, launchProductList[item]);
  }

  // console.log(launchProductList);

  const launchProduct = async (token) => {
    if (Object.values(launchProductList).some((item) => item === null)) return;
    await fetch(`https://claudia-teng.com/api/1.0/second-hand/user`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      body: formData,
    });
    setUploaded({
      first: null,
      second: null,
      third: null,
    });
    setIsUploaded(null);
    setLaunchProductList({
      title: null,
      description: null,
      price: null,
      story: null,
      main_image: null,
      other_images_1: null,
      other_images_2: null,
    });
    alert("刊登成功！");
  };
  const photoUpload = (e) => {
    if (isUploaded) {
      alert("上傳照片超過上限！");
      return;
    }

    if (e.target.files.length === 1) {
      if (uploaded.first && uploaded.second && uploaded.third) {
        alert("上傳照片超過上限！");
        return;
      } else if (uploaded.second) {
        setUploaded((pre) => {
          return {
            ...pre,
            third: e.target.files[0],
          };
        });
        setLaunchProductList((pre) => {
          return {
            ...pre,
            other_images_2: e.target.files[0],
          };
        });
      } else if (uploaded.first) {
        setUploaded((pre) => {
          return {
            ...pre,
            second: e.target.files[0],
          };
        });
        setLaunchProductList((pre) => {
          return {
            ...pre,
            other_images_1: e.target.files[0],
          };
        });
      } else {
        setUploaded((pre) => {
          return {
            ...pre,
            first: e.target.files[0],
          };
        });
        setLaunchProductList((pre) => {
          return {
            ...pre,
            main_image: e.target.files[0],
          };
        });
      }
    }

    if (e.target.files.length === 2) {
      if (uploaded.second) {
        setUploaded({
          first: "",
          second: "",
          third: "",
        });
        alert("上傳照片超過上限！");
        return;
      } else if (uploaded.first) {
        setUploaded((pre) => {
          return {
            ...pre,
            second: e.target.files[0],
            third: e.target.files[1],
          };
        });
        setLaunchProductList((pre) => {
          return {
            ...pre,
            other_images_1: e.target.files[0],
            other_images_2: e.target.files[1],
          };
        });
      } else {
        setUploaded((pre) => {
          return {
            ...pre,
            first: e.target.files[0],
            second: e.target.files[1],
          };
        });
        setLaunchProductList((pre) => {
          return {
            ...pre,
            main_image: e.target.files[0],
            other_images_1: e.target.files[1],
          };
        });
      }
    }

    if (e.target.files.length === 3) {
      if (!uploaded.first) {
        setUploaded({
          first: e.target.files[0],
          second: e.target.files[1],
          third: e.target.files[2],
        });
        setLaunchProductList((pre) => {
          return {
            ...pre,
            main_image: e.target.files[0],
            other_images_1: e.target.files[1],
            other_images_2: e.target.files[2],
          };
        });
      } else {
        alert("上傳照片超過上限！");
        return;
      }
    }
  };
  useEffect(() => {
    setValid({
      name: "",
      account: "",
      password: "",
    });
  }, [isRegisterPage]);
  useEffect(() => {
    if (Object.values(uploaded).every((item) => item !== "")) {
      setIsUploaded(true);
    }
  }, [uploaded]);
  return (
    <Wrapper>
      {!profile ? (
        <LoginContainer>
          {!isRegisterPage && (
            <>
              <Logo></Logo>
              <InputSection onBlur={(e) => validation(e)}>
                <InputContainer>
                  <Input
                    placeholder="請輸入帳號或電子郵件"
                    autoFocus="1"
                    className="accountValid"
                  ></Input>
                </InputContainer>
                <InputContainer>
                  <Input
                    placeholder="請輸入密碼"
                    className="passwordValid"
                    type="password"
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
              <ReturnLastPage
                onClick={() => setIsRegisterPage(false)}
              ></ReturnLastPage>
              <Logo></Logo>
              <InputSection onBlur={(e) => validation(e)}>
                <InputContainer>
                  <Input placeholder="請輸入名字" autoFocus="1"></Input>
                </InputContainer>
                <InputContainer>
                  <Input
                    placeholder="請輸入電子郵件"
                    className="accountValid"
                  ></Input>
                </InputContainer>
                <InputContainer>
                  <Input
                    placeholder="請輸入6~16位密碼(含1大寫＆小寫英文及數字)"
                    className="passwordValid"
                    type="password"
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
              <InfoHead>
                {styling.headButton.map((item, index) => (
                  <InfoHeadButton
                    key={index}
                    onClick={(e) => featureSwitch(e)}
                    onBlur={(e) => reverseFeatureSwitch(e)}
                  >
                    {item}
                  </InfoHeadButton>
                ))}
              </InfoHead>
              <InfoBody style={styling.direction()}>
                {feature.launch && (
                  <>
                    <LaunchBody style={styling.uploaded()}>
                      <LaunchBodyContent>
                        <input
                          type="file"
                          multiple
                          accept="image/png, image/jpeg"
                          style={{
                            display: "none",
                          }}
                          onChange={(e) => {
                            photoUpload(e);
                          }}
                        ></input>
                        <LaunchButton>選擇照片</LaunchButton>
                        <LaunchPrompt>(最多上傳3張照片)</LaunchPrompt>
                      </LaunchBodyContent>
                    </LaunchBody>
                    {uploaded.first && (
                      <PhotoContainer style={styling.photoContainerWidth()}>
                        <Photo
                          src={
                            uploaded.first &&
                            URL.createObjectURL(uploaded.first)
                          }
                        ></Photo>
                        <Photo
                          src={
                            uploaded.second &&
                            URL.createObjectURL(uploaded.second)
                          }
                        ></Photo>
                        <Photo
                          src={
                            uploaded.third &&
                            URL.createObjectURL(uploaded.third)
                          }
                        ></Photo>
                      </PhotoContainer>
                    )}
                    {isUploaded && (
                      <ProductContainer
                        onBlur={(e) => {
                          validation(e);
                        }}
                      >
                        <ProductDetailInput placeholder="商品名稱"></ProductDetailInput>
                        <ProductDetailInput placeholder="設定價位"></ProductDetailInput>
                        <ProductDescription>
                          <textarea
                            placeholder="商品敘述"
                            style={{
                              height: "194px",
                              maxHeight: "768px",
                              width: "100%",
                              maxWidth: "100%",
                              borderStyle: "none",
                              outline: "none",
                              padding: "0",
                              margin: "0",
                            }}
                          ></textarea>
                        </ProductDescription>
                        <ProductDetailInput placeholder="商品細節"></ProductDetailInput>
                        <LaunchButton
                          style={{ marginLeft: "auto" }}
                          onClick={() => {
                            launchProduct(userToken);
                          }}
                        >
                          立即刊登
                        </LaunchButton>
                      </ProductContainer>
                    )}
                  </>
                )}
                {feature.myLaunch && (
                  <>
                    {secondHand.length > 0 ? (
                      secondHand.map((item, index) => (
                        <Item key={index}>
                          <Shadow></Shadow>
                          <ItemImg src={item.image}></ItemImg>
                          <ItemBody>
                            <ItemTitle>{item.title}</ItemTitle>
                            <ItemPrice>$ {item.price}</ItemPrice>
                            <ItemNote>id: {item.id}</ItemNote>
                            <Trash
                              onClick={() => {
                                deleteUserSecondHand(item.id, userToken);
                              }}
                            ></Trash>
                          </ItemBody>
                        </Item>
                      ))
                    ) : (
                      <EmptyPrompt>目前還沒有上架商品哦～</EmptyPrompt>
                    )}
                  </>
                )}
                {feature.bitWin && (
                  <>
                    {profile.complete.length > 0 ? (
                      profile.complete.map((item, index) => (
                        <Item key={index}>
                          <Shadow></Shadow>
                          <ItemImg src={item.picture}></ItemImg>
                          <ItemBody>
                            <ItemTitle>{item.title}</ItemTitle>
                            <ItemPrice>$ {item.price}</ItemPrice>
                            <ItemNote>
                              結標日期{" "}
                              {new Date(Date.parse(item.deadline)).getMonth() +
                                1}
                              /{new Date(Date.parse(item.deadline)).getDate()}{" "}
                              {new Date(Date.parse(item.deadline)).getHours()}:
                              {new Date(Date.parse(item.deadline)).getMinutes()}
                              :
                              {new Date(Date.parse(item.deadline)).getSeconds()}
                            </ItemNote>
                          </ItemBody>
                        </Item>
                      ))
                    ) : (
                      <EmptyPrompt>目前還沒有得標商品哦～</EmptyPrompt>
                    )}
                  </>
                )}
              </InfoBody>
            </InfoContainer>
          </UserProfileContainer>
        </UserProfile>
      )}
    </Wrapper>
  );
}

export default Profile;
