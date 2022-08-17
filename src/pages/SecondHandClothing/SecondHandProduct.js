import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../utils/api";
import styled from "styled-components";
import io from "socket.io-client";

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

import {
  PriceWrapper,
  DetailTitle,
  DetailWrap,
} from "../Bidding/BiddingProduct";

import { AddToCart } from "../Product/ProductVariants";

// zzuhann =============
const ChatroomDetailWrapper = styled.div`
  width: 375px;
  position: fixed;
  bottom: 15px;
  z-index: 999;
  right: 15px;
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
  ${"" /* 如果沒有下 align items 子元素會預設直接撐開 */}
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
      <SendImage src="https://claudia-teng.com/assets/second-hand/20220811.png" />
      <SenderMessageTime>
        {props.allMessage.time || "10:39 AM"}
      </SenderMessageTime>
    </SendMessageWrapper>
  );
};

const ReceiverMessageAll = (props) => {
  return (
    <ReceiveMessageWrapper>
      <ReceiveImage src="https://claudia-teng.com/assets/second-hand/20220811.png" />
      <ReceiveMessage>{props.allMessage.msg}</ReceiveMessage>
      <ReceiverMessageTime>
        {props.allMessage.time || "10:39 AM"}
      </ReceiverMessageTime>
    </ReceiveMessageWrapper>
  );
};

//

const SecondHandProduct = () => {
  const [secondHandProduct, setSecondHandProduct] = useState();
  const [msg, setMsg] = useState();
  const { id } = useParams();
  const socketRef = useRef();
  const userToken = localStorage.getItem("userToken") || "";
  const [allMessage, setAllMessage] = useState([
    { self: false, user: "User1", msg: "2 to 1" },
  ]);

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
      console.log(data);
      let newMessage = [...allMessage, data];
      setAllMessage(newMessage);
    });
  }

  const sendMessageClick = (e) => {
    const request = {
      targetId: 1,
      msg: msg,
    };
    e.preventDefault();
    socketRef.current.emit("private chat", request);
    setMsg("");
    console.log(e.target);
  };

  useEffect(() => {
    async function getSecondHandProduct() {
      const data = await api.getSecondHandProduct(id);
      setSecondHandProduct(data);
    }
    getSecondHandProduct();
  }, [id]);

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
            價格{" "}
            <span style={{ color: "red" }}>${secondHandProduct.price}</span>
          </Price>
        </PriceWrapper>
        <DetailWrap style={{ marginTop: "25px", fontSize: "20px" }}>
          <DetailTitle style={{ width: "100px" }}>數量</DetailTitle>
          {secondHandProduct.stock} 件
        </DetailWrap>
        <DetailWrap style={{ fontSize: "20px", marginTop: "25px" }}>
          <DetailTitle style={{ width: "100px" }}>賣家</DetailTitle>
          {secondHandProduct.seller}
        </DetailWrap>
        <AddToCart>加入購物車</AddToCart>

        <DetailWrap
          style={{
            display: "block",
            fontSize: "20px",
            marginTop: "25px",
            width: "350px",
          }}
        >
          <DetailTitle style={{ marginBottom: "10px" }}>賣家描述</DetailTitle>
          <Description style={{ whiteSpace: "pre-wrap" }}>
            {secondHandProduct.description}
          </Description>
        </DetailWrap>
      </Details>
      <Story>
        <StoryTitle>細部說明</StoryTitle>
        <StoryContent>{secondHandProduct.story}</StoryContent>
      </Story>
      <Images>
        {secondHandProduct.images.map((image, index) => (
          <Image src={image} key={index} />
        ))}
      </Images>
      <ChatroomDetailWrapper>
        <ChatroomDetailHeader>Peter Chen</ChatroomDetailHeader>
        <ChatroomDetailMain>
          {allMessage.map((message, index) => {
            return message.self ? (
              <SendMessageAll allMessage={allMessage[index]} />
            ) : (
              <ReceiverMessageAll allMessage={allMessage[index]} />
            );
          })}
        </ChatroomDetailMain>
        <ChatroomDetailFooter onSubmit={(e) => sendMessageClick(e)}>
          <ChatroomInput
            placeholder="Type your message ..."
            onChange={(e) => setMsg(e.target.value)}
            value={msg || ""}
          />
          <SubmitButton id="submit">{"<<"}</SubmitButton>
        </ChatroomDetailFooter>
      </ChatroomDetailWrapper>
    </Wrapper>
  );
};

export default SecondHandProduct;
