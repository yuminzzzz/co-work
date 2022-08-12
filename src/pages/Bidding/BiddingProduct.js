import { useParams } from "react-router-dom";
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
  const [auctionProduct, setAuctionProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getAuctionProduct() {
      const data = await api.getAuctionProduct(id);
      setAuctionProduct(data);
    }
    getAuctionProduct();
  }, [id]);

  if (!auctionProduct) return null;
  return (
    <Wrapper>
      <MainImage src={auctionProduct.main_image} />
      <Details>
        <Title>{auctionProduct.title}</Title>
        <ID style={{ marginBottom: "10px" }}>{auctionProduct.id}</ID>
        <PriceWrapper>
          <Price
            style={{
              marginTop: "0px",
              border: "none",
              paddingBottom: "0",
              fontWeight: "bold",
            }}
          >
            目前出價{" "}
            <span style={{ color: "red" }}>${auctionProduct.currentPrice}</span>
          </Price>
          <CountPrice>{auctionProduct.count} 次出價</CountPrice>
        </PriceWrapper>
        <DetailWrap>
          <DetailTitle>數量</DetailTitle>
          {auctionProduct.stock} 件
        </DetailWrap>
        <HighestPerson>
          <DetailTitle>最高出價者</DetailTitle>
          {auctionProduct.currentUser}
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
          <DetailTitle>截止時間</DetailTitle>2022/8/11 12:40:39
        </DetailWrap>
        <DetailWrap>
          <DetailTitle>付款方式</DetailTitle>
          {auctionProduct.payment}
        </DetailWrap>
        <DetailWrap
          style={{
            marginBottom: "15px",
            paddingBottom: "15px",
          }}
        >
          <DetailTitle>運費</DetailTitle>
          {auctionProduct.shipping} 元
        </DetailWrap>

        <Description>{auctionProduct.description}</Description>
      </Details>
      <Story>
        <StoryTitle>細部說明</StoryTitle>
        <StoryContent>{auctionProduct.story}</StoryContent>
      </Story>
      <Images>
        {auctionProduct.images.map((image, index) => (
          <Image src={image} key={index} />
        ))}
      </Images>
    </Wrapper>
  );
};

export default BiddingProduct;
export { PriceWrapper, DetailTitle, DetailWrap };
