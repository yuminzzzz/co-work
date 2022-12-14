import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import api from "../../utils/api";
import styled from "styled-components";
import io from "socket.io-client";
import { AddToCart } from "../Product/ProductVariants";
import { useNavigate } from "react-router-dom";
import {
  PriceWrapper,
  DetailTitle,
  DetailWrap,
} from "../Bidding/BiddingProduct";
import {
  Wrapper,
  MainImage,
  Details,
  Title,
  ID,
  Price,
  Description,
  Story,
  StoryTitle,
  StoryContent,
  Images,
  Image,
} from "../Product/Product";
import CartContext from "../../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faPersonSkiing } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

//chatmainpage

const ChatIcon = styled.div`
  color: #fff;
  position: fixed;
  font-size: 25px;
  bottom: 15px;
  right: 15px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: salmon;
  box-shadow: rgba(0, 0, 0, 0.2) 0 4px 2px 0, rgba(0, 0, 0, 0.1) 0 8px 16px 0;
  z-index: 999;
  @media screen and (max-width: 1279px) {
    bottom: 75px;
  }
  &:hover {
    transition: 0.3s;
    transform: translate(-3px, -10px);
  }
`;

const ChatContainer = styled.div`
  width: 375px;
  height: 600px;
  position: fixed;
  bottom: 15px;
  background-color: #f6f9fb;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 2px 4px 0, rgba(0, 0, 0, 0.1) 0 8px 16px 0;
  z-index: 999;
  right: 15px;
  padding: 28px 20px;
  @media screen and (max-width: 1279px) {
    bottom: 75px;
  }
`;

const CloseChatroom = styled.button`
  position: absolute;
  right: 0;
  width: 40px;
  height: 28px;
  top: -33px;
  border-radius: 20px;
  border-style: none;
  background-color: #99a1b1;
  color: #fff;
  font-size: 12px;
  z-index: 999;
  cursor: pointer;
  &:hover {
    transition: 0.2s;
    background-color: #707c92;
  }
`;

const ChatHeader = styled.h1`
  line-height: 32px;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ChatBody = styled.div`
  width: 100%;
  height: 520px;
  padding-bottom: 56px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatItem = styled.div`
  width: 100%;
  padding: 20px 24px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0.1px 0.1px 0;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 20px;
  display: flex;
  cursor: pointer;
  position: relative;
`;

const UserAvatar = styled.img`
  border: solid 1px light-grey;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0.1px 0.1px 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
`;

const UserName = styled.p`
  padding-left: 16px;
  font-weight: bold;
`;

const ReceiveTime = styled.p`
  font-size: 12px;
  line-height: 16px;
  position: absolute;
  right: 20px;
  color: #bfccdf;
`;

const ChatFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 375px;
  height: 56px;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  font-size: 24px;
  color: #bfccdf;
  transition: 0.3s;
`;

//chatpage

const ChatroomDetailWrapper = styled.div`
  width: 375px;
  position: fixed;
  bottom: 15px;
  z-index: 999;
  right: 18px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.3) 0 2px 4px 0, rgba(0, 0, 0, 0.1) 0 8px 16px 0;
  @media screen and (max-width: 1279px) {
    bottom: 75px;
  }
`;

const ChatroomDetailMain = styled.div`
  height: 460px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  ${"" /* ??????????????? align items ?????????????????????????????? */}
  flex-direction: column;
  background-color: #fff;
  overflow-y: scroll;
`;

const MessageWrapper = styled.div`
  position: relative;
  border-radius: solid 1px black;
  align-self: flex-end;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-top: 10px;
  margin-bottom: 30px;
  max-width: 400px;
`;

const SendMessageWrapper = styled(MessageWrapper)`
  align-self: flex-end;
`;

const ReceiveMessageWrapper = styled(MessageWrapper)`
  align-self: flex-start;
`;

const Message = styled.div`
  border-radius: 5px;
  max-width: 220px;
  word-break: break-all;
  display: inline-block;
  position: relative;
  padding: 10px 15px;
  line-height: 25px;
  letter-spacing: 1.25px;
`;

const SenderMessage = styled(Message)`
  background-color: #2787f5;
  color: #fff;
  right: 30px;
`;

const ReceiveMessage = styled(Message)`
  background-color: #ebf1f7;
  color: #9eb1ce;
  display: inline-block;
  left: 30px;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 100%;
  bottom: -13px;
`;

const SendImage = styled(UserImage)`
  right: 10px;
`;

const ReceiveImage = styled(UserImage)`
  left: 10px;
`;

const ReturnChatroom = styled.div`
  font-size: 18px;
  position: absolute;
  top: 24px;
  left: 12px;
  cursor: pointer;
  z-index: 999;
`;

const ChatroomDetailHeader = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
  top: 0;
  font-size: 22px;
  font-weight: bold;
  line-height: 70px;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid #f6f9fb;
`;

const ChatroomDetailFooter = styled.form`
  width: 100%;
  height: 70px;
  position: relative;
  bottom: 0;
  background-color: #fff;
`;

const SubmitButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: none;
  background-color: #2787f5;
  position: absolute;
  right: 15px;
  top: 15px;
  color: white;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatroomInput = styled.input`
  width: 360px;
  height: 50px;
  top: 10px;
  left: 5px;
  position: relative;
  border: none;
  border-radius: 25px;
  background-color: #ebf1f7;
  padding-left: 15px;
  padding-right: 60px;
  color: #5c6675;
  font-size: 16px;
  &::placeholder {
    color: #9eb1ce;
    font-size: 16px;
  }
`;

const UserMessageTime = styled.div`
  position: absolute;
  color: #c3cfe1;
  font-size: 12px;
  min-width: 100px;
  bottom: -15px;
`;

const SenderMessageTime = styled(UserMessageTime)`
  right: 70px;
  text-align: end;
`;

const ReceiverMessageTime = styled(UserMessageTime)`
  left: 70px;
`;

const SendMessageAll = (props) => {
  return (
    <SendMessageWrapper>
      <SenderMessage>{props.allMessage.msg}</SenderMessage>
      <SendImage src={props.allMessage.userImage} />
      <SenderMessageTime>
        {new Date(Date.parse(props.allMessage.time)).getHours()}:
        {new Date(Date.parse(props.allMessage.time)).getMinutes()}
      </SenderMessageTime>
    </SendMessageWrapper>
  );
};

const ReceiverMessageAll = (props) => {
  return (
    <ReceiveMessageWrapper>
      <ReceiveImage src={props.allMessage.userImage} />
      <ReceiveMessage>{props.allMessage.msg}</ReceiveMessage>
      <ReceiverMessageTime>
        {new Date(Date.parse(props.allMessage.time)).getHours()}:
        {new Date(Date.parse(props.allMessage.time)).getMinutes()}
      </ReceiverMessageTime>
    </ReceiveMessageWrapper>
  );
};

const CartButtonWrap = styled.div`
  display: flex;
`;

const FooterIcon = styled.div`
  color: ${(props) => (props.$isActive ? "salmon" : "#bfccdf")};
  cursor: pointer;
  z-index: 0;
  &:hover {
    color: salmon;
  }
`;

const SecondHandProduct = () => {
  const [secondHandProduct, setSecondHandProduct] = useState();
  const [msg, setMsg] = useState("");
  const chatroom = useRef();
  const [chatroomScrollHeight, setChatroomScrollHeight] = useState("");
  const { id } = useParams();
  const socketRef = useRef();
  const userToken = localStorage.getItem("userToken") || "";
  const profile = JSON.parse(localStorage.getItem("userProfile")) || [];
  const icon = [faPenToSquare, faPersonSkiing, faMessage, faBell, faBars];
  const [titleID, setTitleID] = useState(2);
  const [chatSwitch, setChatSwitch] = useState(false);
  const [chatpageSwitch, setChatpageSwitch] = useState(false);
  const [chatUserName, setChatUserName] = useState();
  const [allMessageObj, setAllMessageObj] = useState(
    JSON.parse(localStorage.getItem("chat")) || {}
  );
  const [targetId, setTargetId] = useState();
  let navigate = useNavigate();

  const sendMessageClick = (e) => {
    e.preventDefault();
    if (msg === "") return;
    const request = {
      targetId: targetId,
      msg: msg,
    };
    socketRef.current.emit("private chat", request);
    setMsg("");
  };

  useEffect(() => {
    socketRef.current = io.connect("https://claudia-teng.com/", {
      transports: ["websocket", "polling", "flashsocket"],
      auth: {
        token: `Bearer ${userToken}`,
      },
    });
  }, []);

  if (socketRef.current) {
    socketRef.current.on("private chat", (data) => {
      let nowperson;
      if (data.user !== profile.user.name) {
        setChatUserName((pre) => data.user);
        nowperson = data.user;
      }
      if (!data.self) {
        setTargetId(data.userId);
      }

      if (!allMessageObj.hasOwnProperty(nowperson || chatUserName)) {
        setAllMessageObj({
          ...allMessageObj,
          [nowperson || chatUserName]: [data],
        });
      } else if (allMessageObj.hasOwnProperty(nowperson || chatUserName)) {
        let personMessage = [...allMessageObj[nowperson || chatUserName], data];
        setAllMessageObj({
          ...allMessageObj,
          [nowperson || chatUserName]: personMessage,
        });
      }
      localStorage.setItem("chat", JSON.stringify(allMessageObj));
      setChatroomScrollHeight(chatroom.current.scrollHeight);
    });
  }

  useEffect(() => {
    if (chatroom.current) {
      chatroom.current.scrollTop = chatroomScrollHeight;
    }
  }, [chatroomScrollHeight]);

  useEffect(() => {
    async function getSecondHandProduct() {
      const data = await api.getSecondHandProduct(id);
      setSecondHandProduct(data);
    }
    getSecondHandProduct();
  }, [id]);

  const clickAskButton = () => {
    setChatpageSwitch(true);
    setChatUserName(secondHandProduct.seller);
    setTargetId(secondHandProduct.sellerId);
    if (!allMessageObj.hasOwnProperty(secondHandProduct.user)) {
      let newperson = {
        ...allMessageObj,
        [secondHandProduct.seller]: [],
      };
      setAllMessageObj(newperson);
    }
  };

  if (!secondHandProduct) {
    return null;
  }

  return (
    <Wrapper>
      <MainImage src={secondHandProduct.main_image} />
      <Details>
        <Title>{secondHandProduct.title}</Title>
        <ID style={{ marginBottom: "10px" }}>{secondHandProduct.id}</ID>
        <PriceWrapper>
          <Price
            style={{
              marginTop: "0px",
              border: "none",
              paddingBottom: "0",
              fontWeight: "bold",
            }}
          >
            ??????{" "}
            <span style={{ color: "red" }}>${secondHandProduct.price}</span>
          </Price>
        </PriceWrapper>
        <DetailWrap style={{ marginTop: "25px", fontSize: "20px" }}>
          <DetailTitle style={{ width: "100px" }}>??????</DetailTitle>
          {secondHandProduct.stock} ???
        </DetailWrap>
        <DetailWrap style={{ fontSize: "20px", marginTop: "25px" }}>
          <DetailTitle style={{ width: "100px" }}>??????</DetailTitle>
          {secondHandProduct.seller}
        </DetailWrap>
        <CartButtonWrap>
          <AddToCart
            style={{ marginRight: "10px" }}
            onClick={() => {
              clickAskButton();
              if (!userToken) {
                alert("????????????");
                navigate("/profile");
              }
              setChatpageSwitch(true);
              setChatUserName(secondHandProduct.seller);
            }}
          >
            ????????????
          </AddToCart>
          <AddToCart>???????????????</AddToCart>
        </CartButtonWrap>
        <DetailWrap
          style={{
            display: "block",
            fontSize: "20px",
            marginTop: "25px",
            width: "350px",
          }}
        >
          <DetailTitle style={{ marginBottom: "10px" }}>????????????</DetailTitle>
          <Description style={{ whiteSpace: "pre-wrap" }}>
            {secondHandProduct.description}
          </Description>
        </DetailWrap>
      </Details>
      <Story>
        <StoryTitle>????????????</StoryTitle>
        <StoryContent>{secondHandProduct.story}</StoryContent>
      </Story>
      <Images>
        {secondHandProduct.images.map((image, index) => (
          <Image src={image} key={index} />
        ))}
      </Images>
      {/* chatpage */}
      {chatpageSwitch && (
        <ChatroomDetailWrapper>
          <ReturnChatroom
            onClick={() => {
              setChatpageSwitch(false);
              setChatSwitch(true);
            }}
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
          </ReturnChatroom>
          <ChatroomDetailHeader>{chatUserName}</ChatroomDetailHeader>
          {/* user name */}
          <ChatroomDetailMain ref={chatroom}>
            {allMessageObj?.[chatUserName]?.map((message, index) => {
              // user index => state
              return message.self ? (
                <SendMessageAll
                  allMessage={allMessageObj[chatUserName][index]}
                />
              ) : (
                <ReceiverMessageAll
                  allMessage={allMessageObj[chatUserName][index]}
                />
              );
            })}
          </ChatroomDetailMain>
          <ChatroomDetailFooter onSubmit={(e) => sendMessageClick(e)}>
            <ChatroomInput
              placeholder="Type your message ..."
              onChange={(e) => setMsg(e.target.value)}
              value={msg || ""}
            />
            <SubmitButton id="submit">
              {<FontAwesomeIcon icon={faPaperPlane} />}
            </SubmitButton>
          </ChatroomDetailFooter>
        </ChatroomDetailWrapper>
      )}

      {/* chatmainpage */}
      {userToken && (
        <ChatIcon
          onClick={() => setChatSwitch(true)}
          style={
            chatSwitch || chatpageSwitch
              ? { display: "none" }
              : { display: "flex" }
          }
        >
          <FontAwesomeIcon icon={faComments} />
        </ChatIcon>
      )}
      <ChatContainer
        style={chatSwitch ? { display: "block" } : { display: "none" }}
      >
        <CloseChatroom onClick={() => setChatSwitch(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseChatroom>
        <ChatHeader>??????</ChatHeader>
        <ChatBody>
          {Object.keys(allMessageObj).map((item, index) => (
            <ChatItem
              key={index}
              onClick={(e) => {
                setChatpageSwitch(true);
                setChatSwitch(false);
                setChatUserName(item);
                setTargetId(allMessageObj[item][0].userId);
              }}
            >
              <UserAvatar
                src={
                  allMessageObj[item][0]?.self
                    ? allMessageObj[item][0]?.targetImage
                    : allMessageObj[item][0]?.userImage ||
                      "https://claudia-teng.com/assets/user.jpg"
                }
              ></UserAvatar>
              <UserName>{item}</UserName>
            </ChatItem>
          ))}
        </ChatBody>
        <ChatFooter
          onClick={(e) => {
            if (e.target.id) {
              setTitleID(e.target.id);
            }
          }}
        >
          {icon.map((item, index) => (
            <FooterIcon $isActive={titleID == index} key={index}>
              <FontAwesomeIcon
                icon={item}
                key={index}
                id={index}
                style={{ zIndex: "999" }}
              />
            </FooterIcon>
          ))}
        </ChatFooter>
      </ChatContainer>
    </Wrapper>
  );
};

export default SecondHandProduct;
