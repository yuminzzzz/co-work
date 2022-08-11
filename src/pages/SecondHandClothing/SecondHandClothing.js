import { Link } from "react-router-dom";
import styled from "styled-components";

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
  * {
    ${"" /* outline: solid 1px black; */}
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

const BiddingThing = styled(Link)`
  flex-basis: 300px;
  flex-shrink: 0;
  margin-right: 25px;
  margin-top: 15px;
  border: solid 1px rgb(241, 241, 241);
  border-radius: 10px;
  color: black;
`;

const DeadLine = styled.div`
  width: 100%;
  background-color: #c52e07;
  color: white;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 10px;
  text-align: center;
  letter-spacing: 2px;
`;

const BidImg = styled.img`
  width: 100%;
`;

const BidTitle = styled.h2`
  margin-top: 15px;
  font-size: 22px;
  margin-left: 15px;
`;
const Bidtext = styled.p`
  margin-top: 15px;
  font-size: 18px;
`;

const BidButton = styled.div`
  margin-top: 20px;
  width: 100%;
  background-color: #f5b012;
  color: white;
  padding: 15px 15px;
  font-size: 25px;
  border-radius: 10px;
  text-align: center;
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #b98714;
  }
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
  margin-right: 20px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 4px;
  color: black;
  &:nth-child(3n) {
    margin-right: 0;
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

const CardProduct = () => {
  return (
    <ProductCard to="#">
      <CardImg src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" />
      <CardTitle>純色輕薄百搭襯衫</CardTitle>
      <CardText>
        TWD.<span>799</span>
      </CardText>
    </ProductCard>
  );
};

const BiddingProduct = () => {
  return (
    <BiddingThing to="#">
      <DeadLine>8/15 22:00 結標</DeadLine>
      <BidImg src="https://b.ecimg.tw/items/DEBW1GA900ARDDI/000001_1637222488.jpg" />
      <BidTitle>大容量運動水壺</BidTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        <Bidtext>
          目前出價{" "}
          <span style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}>
            $10524
          </span>
        </Bidtext>
        <Bidtext>26 次出價</Bidtext>
      </div>
      <Bidtext style={{ marginLeft: "15px" }}>剩餘時間</Bidtext>
      <BidButton to="#">我要出價</BidButton>
    </BiddingThing>
  );
};

function SecondHandClothing() {
  return (
    <>
      <CarouselWrapper>
        <Carousel to="#"></Carousel>
      </CarouselWrapper>

      <Wrapper>
        <BiddingTitle>二手服飾競標專區</BiddingTitle>
        <Hr />
        <BiddingWrapper>
          <BiddingProduct />
          <BiddingProduct />
          <BiddingProduct />
          <BiddingProduct />
          <BiddingProduct />
        </BiddingWrapper>
        <BiddingTitle style={{ marginTop: "35px" }}>所有二手商品</BiddingTitle>
        <Hr />
        <ProductWrapper>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </ProductWrapper>
      </Wrapper>
    </>
  );
}

export default SecondHandClothing;
