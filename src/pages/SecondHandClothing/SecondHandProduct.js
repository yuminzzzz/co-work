import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import styled from "styled-components";

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
  width: 400px;
  position: fixed;
  bottom: 130px;
  z-index: 999;
  right: 15px;
  border: solid 1px black;
`;

const ChatroomDetailMain = styled.div`
  height: 400px;
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
  align-items: flex-end;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SendMessageWrapper = styled(MessageWrapper)`
  align-self: flex-end;
`;

const ReceiveMessageWrapper = styled(MessageWrapper)`
  align-self: flex-start;
`;

const Message = styled.div`
  border-radius: 5px;
  max-width: 280px;
  display: inline-block;
  position: relative;
  padding: 10px 15px;
`;

const SenderMessage = styled(Message)`
  background-color: #2787f5;
  color: #fff;
  right: 40px;
`;

const ReceiveMessage = styled(Message)`
  background-color: #ebf1f7;
  color: #5c6675;
  display: inline-block;
  left: 40px;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  ${"" /* border: solid 1px black; */}
  position: relative;
  border-radius: 100%;
`;

const SendImage = styled(UserImage)`
  right: 20px;
`;

const ReceiveImage = styled(UserImage)`
  left: 20px;
`;

const ChatroomDetailHeader = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
  top: 0;
  font-size: 22px;
  line-height: 70px;
  text-align: center;
  background-color: #ebf1f7;
  ${
    "" /* &:before {
    content: "<<";
    position: absolute;
    left: 10px;
    font-size: 18px;
    letter-spacing: 1.5px;
    cursor: pointer;
  } */
  }
`;

const ChatroomDetailFooter = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
  bottom: 0;
  background-color: #fff;
  &:after {
    content: ">>";
    width: 45px;
    height: 45px;
    border-radius: 100%;
    background-color: #2787f5;
    position: absolute;
    right: 10px;
    top: 13px;
    color: white;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
  }
`;

const ChatroomInput = styled.input`
  width: 390px;
  height: 50px;
  top: 10px;
  left: 5px;
  position: relative;
  border: none;
  border-radius: 10px;
  background-color: #ebf1f7;
  padding-left: 10px;
  padding-right: 60px;
  color: #5c6675;
  font-size: 16px;
  &::placeholder {
    color: #9eb1ce;
    font-size: 16px;
  }
`;

const SendMessageAll = (props) => {
  return (
    <SendMessageWrapper>
      <SenderMessage>{props.allMessage.msg}</SenderMessage>
      <SendImage src="https://claudia-teng.com/assets/second-hand/20220811.png" />
    </SendMessageWrapper>
  );
};

const ReceiverMessageAll = (props) => {
  console.log(props.allMessage);
  return (
    <ReceiveMessageWrapper>
      <ReceiveImage src="https://claudia-teng.com/assets/second-hand/20220811.png" />
      <ReceiveMessage>{props.allMessage.msg}</ReceiveMessage>
    </ReceiveMessageWrapper>
  );
};

// =====================

const SecondHandProduct = () => {
  const [secondHandProduct, setSecondHandProduct] = useState();
  const { id } = useParams();

  const allMessage = [
    { self: false, msg: "hello" },
    { self: true, msg: "hiiiiii" },
    { self: true, msg: "how are you" },
    { self: false, msg: "I want to go home" },
    { self: false, msg: "I want to go home" },
    { self: true, msg: "hiiiiii" },
    { self: true, msg: "how are you" },
    { self: true, msg: "hiiiiii" },
    { self: true, msg: "how are you" },
  ];

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
          {/* <SendMessageAll />
          <ReceiverMessageAll />
          <ReceiverMessageAll /> */}
        </ChatroomDetailMain>
        <ChatroomDetailFooter>
          <ChatroomInput placeholder="Type your message ..." />
        </ChatroomDetailFooter>
      </ChatroomDetailWrapper>
    </Wrapper>
  );
};

export default SecondHandProduct;
