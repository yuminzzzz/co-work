import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../utils/api";
import BiddingList from "./BiddingList";

const CarouselWrapper = styled.div`
  height: 400px;
  position: relative;

  @media screen and (max-width: 1279px) {
    height: 200px;
  }
`;

const Carousel = styled(Link)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-image: url("https://doqvf81n9htmm.cloudfront.net/data/crop_article/25991/96-f.jpg_1140x855.jpg");
  text-decoration: none;
  @media screen and (max-width: 1279px) {
    background-position: center 40%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 55px;
  margin-bottom: 60px;
  max-width: 1160px;
  @media screen and (max-width: 1279px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const BiddingWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BiddingTitle = styled.h1`
  margin-top: 20px;
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const Hr = styled.div`
  height: 1px;
  width: 100%;
  background-color: gray;
`;

const ProductWrapper = styled.div`
  flex-wrap: wrap;
  max-width: 1160px;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
`;

const ProductCard = styled(Link)`
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 4px;
  color: black;
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:last-child {
    margin-right: auto;
    margin-left: 40px;
  }
  @media screen and (max-width: 1279px) {
    &:last-child {
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

const CardImg = styled.img`
  width: 360px;
  height: 360px;
`;

const CardTitle = styled.h3`
  margin-top: 15px;
  margin-bottom: 15px;
`;
const CardText = styled.p`
  margin-bottom: 64px;
`;

function SecondHandClothing() {
  const [auctions, setAuctions] = useState([]);
  const [secondHandProduct, setSecondHandProduct] = useState([]);

  useEffect(() => {
    async function getAuctionsList() {
      const { data } = await api.getAuctionsList();
      setAuctions(data);
    }
    async function getSecondHandProductList() {
      const { data } = await api.getSecondHandProductList();
      setSecondHandProduct(data);
    }
    getAuctionsList();
    getSecondHandProductList();
  }, []);

  if (auctions.length > 0) {
    return (
      <>
        <CarouselWrapper>
          <Carousel to="#"></Carousel>
        </CarouselWrapper>

        <Wrapper>
          <BiddingTitle>二手服飾競標專區</BiddingTitle>
          <Hr />
          <BiddingWrapper>
            {auctions.map((element, index) => (
              <BiddingList auctions={auctions[index]} key={index}></BiddingList>
            ))}
          </BiddingWrapper>
          <BiddingTitle style={{ marginTop: "35px" }}>
            所有二手商品
          </BiddingTitle>
          <Hr />
          <ProductWrapper>
            {secondHandProduct.map(({ image, price, title }, index) => (
              <ProductCard to="#" key={index}>
                <CardImg src={image} />
                <CardTitle>{title}</CardTitle>
                <CardText>
                  TWD.<span>{price}</span>
                </CardText>
              </ProductCard>
            ))}
          </ProductWrapper>
        </Wrapper>
      </>
    );
  }
}

export default SecondHandClothing;
