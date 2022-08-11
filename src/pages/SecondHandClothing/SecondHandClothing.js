import Products from "../Home/Products";
import styled from "styled-components";

const Carousel = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  background-image: url("https://doqvf81n9htmm.cloudfront.net/data/crop_article/25991/96-f.jpg_1140x855.jpg");
  text-decoration: none;
  color: #070707;
  @media screen and (max-width: 1279px) {
    height: 200px;
    background-position: center 30%;
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

const BiddingThing = styled.div`
  flex-basis: 300px;
  flex-shrink: 0;
  margin-right: 25px;
  margin-top: 15px;
  border: solid 1px rgb(241, 241, 241);
  border-radius: 10px;
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

function SecondHandClothing() {
  return (
    <>
      <a href="#">
        <Carousel></Carousel>
      </a>

      <Wrapper>
        <BiddingTitle>二手服飾競標專區</BiddingTitle>
        <Hr />
        <BiddingWrapper>
          <BiddingThing>
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
                <span
                  style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}
                >
                  $10524
                </span>
              </Bidtext>
              <Bidtext>26 次出價</Bidtext>
            </div>
            <Bidtext>剩餘時間</Bidtext>
            <a href="#">
              <BidButton>我要出價</BidButton>
            </a>
          </BiddingThing>
          <BiddingThing>
            <DeadLine>8/15 22:00 結標</DeadLine>
            <BidImg src="https://b.ecimg.tw/items/DEBW1GA900ARDDI/000001_1637222488.jpg" />
            <BidTitle>大容量運動水壺</BidTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <Bidtext>
                目前出價{" "}
                <span
                  style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}
                >
                  $10524
                </span>
              </Bidtext>
              <Bidtext>26 次出價</Bidtext>
            </div>
            <Bidtext>剩餘時間</Bidtext>
            <a href="#">
              <BidButton>我要出價</BidButton>
            </a>
          </BiddingThing>
          <BiddingThing>
            <DeadLine>8/15 22:00 結標</DeadLine>
            <BidImg src="https://b.ecimg.tw/items/DEBW1GA900ARDDI/000001_1637222488.jpg" />
            <BidTitle>大容量運動水壺</BidTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <Bidtext>
                目前出價{" "}
                <span
                  style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}
                >
                  $10524
                </span>
              </Bidtext>
              <Bidtext>26 次出價</Bidtext>
            </div>
            <Bidtext>剩餘時間</Bidtext>
            <a href="#">
              <BidButton>我要出價</BidButton>
            </a>
          </BiddingThing>
          <BiddingThing>
            <DeadLine>8/15 22:00 結標</DeadLine>
            <BidImg src="https://b.ecimg.tw/items/DEBW1GA900ARDDI/000001_1637222488.jpg" />
            <BidTitle>大容量運動水壺</BidTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <Bidtext>
                目前出價{" "}
                <span
                  style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}
                >
                  $10524
                </span>
              </Bidtext>
              <Bidtext>26 次出價</Bidtext>
            </div>
            <Bidtext>剩餘時間</Bidtext>
            <a href="#">
              <BidButton>我要出價</BidButton>
            </a>
          </BiddingThing>
          <BiddingThing>
            <DeadLine>8/15 22:00 結標</DeadLine>
            <BidImg src="https://b.ecimg.tw/items/DEBW1GA900ARDDI/000001_1637222488.jpg" />
            <BidTitle>大容量運動水壺</BidTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <Bidtext>
                目前出價{" "}
                <span
                  style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}
                >
                  $10524
                </span>
              </Bidtext>
              <Bidtext>26 次出價</Bidtext>
            </div>
            <Bidtext>剩餘時間</Bidtext>
            <a href="#">
              <BidButton>我要出價</BidButton>
            </a>
          </BiddingThing>
        </BiddingWrapper>
        <BiddingTitle style={{ marginTop: "35px" }}>所有二手商品</BiddingTitle>
        <Hr />
      </Wrapper>
    </>
  );
}

export default SecondHandClothing;
