import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../utils/api";
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

const CountPrice = styled.div`
  margin-right: 35px;
  @media screen and (max-width: 1279px) {
    margin-right: 0;
    margin-left: 50px;
  }
`;

const DetailWrap = styled.div`
  margin-top: 15px;
  font-size: 18px;
  display: flex;
`;

const HighestPerson = styled.div`
  margin-top: 15px;
  font-size: 18px;
  display: flex;
`;

const BiddingButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const ButtonTitle = styled.h3`
  font-size: 18px;
  width: 110px;
`;

const PriceButton = styled.div`
  padding: 10px 15px;
  background-color: #feecd8;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #cfb9ab;
  }
`;

const UserBiddingPriceWrapper = styled.div`
  background-color: #ececec;
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  margin-top: 15px;
  border-radius: 5px;
`;

const UserNowBiddingPrice = styled.div`
  padding: 10px 15px;
  background-color: #fff;
  font-size: 20px;
  flex: 2;
  text-align: center;
  border-radius: 5px;
`;

const BiddingButton = styled.div`
  padding: 10px 15px;
  background-color: #e0b386;
  margin-left: 10px;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 5px;
  &:hover {
    background-color: #69523d;
    color: #fff;
  }
`;

const DetailTitle = styled.div`
  width: 120px;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1279px) {
    justify-content: flex-start;
  }
`;

const BiddingProduct = () => {
  return (
    <Wrapper>
      <MainImage src="https://images.unsplash.com/photo-1617391258031-f8d80b22fb35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" />
      <Details>
        <Title>厚實毛呢格子外套</Title>
        <ID style={{ marginBottom: "10px" }}>1234</ID>
        <PriceWrapper>
          <Price
            style={{
              marginTop: "0px",
              border: "none",
              paddingBottom: "0",
              fontWeight: "bold",
            }}
          >
            目前出價 <span style={{ color: "red" }}>$2200</span>
          </Price>
          <CountPrice>26 次出價</CountPrice>
        </PriceWrapper>
        <DetailWrap>
          <DetailTitle>數量</DetailTitle>1 件
        </DetailWrap>
        <HighestPerson>
          <DetailTitle>最高出價者</DetailTitle>小明
        </HighestPerson>
        <BiddingButtonWrapper style={{ marginTop: "40px" }}>
          <ButtonTitle>出價增額</ButtonTitle>
          <PriceButton>$100</PriceButton>
          <PriceButton>$500</PriceButton>
          <PriceButton>$1000</PriceButton>
        </BiddingButtonWrapper>
        <UserBiddingPriceWrapper style={{ marginBottom: "40px" }}>
          <UserNowBiddingPrice>2300</UserNowBiddingPrice>
          <BiddingButton>我要出價</BiddingButton>
        </UserBiddingPriceWrapper>
        <DetailWrap>
          <DetailTitle>剩餘時間</DetailTitle>20 天 23 小時 59 分 59 秒
        </DetailWrap>
        <DetailWrap>
          <DetailTitle>付款方式</DetailTitle>信用卡付款
        </DetailWrap>
        <DetailWrap
          style={{
            marginBottom: "15px",
            paddingBottom: "15px",
          }}
        >
          <DetailTitle>運費</DetailTitle>80 元
        </DetailWrap>

        <Description>這裡可以放很多行</Description>
      </Details>
      <Story>
        <StoryTitle>細部說明</StoryTitle>
        <StoryContent>你絕對不能錯過的超值商品</StoryContent>
      </Story>
      <Images>
        {/* {product.images.map((image, index) => (
          <Image src={image} key={index} />
        ))} */}
        <Image src="https://images.unsplash.com/photo-1514813836041-518668f092b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
        <Image src="https://images.unsplash.com/photo-1608635680046-aebf91c1a9c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
      </Images>
    </Wrapper>
  );
};

export default BiddingProduct;
