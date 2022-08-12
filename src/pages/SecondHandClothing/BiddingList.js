import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const BiddingList = (props) => {
  const { id, title, currentPrice, deadline, image, count, lastTime } =
    props.auctions;

  const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    );

    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);

      return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
  };
  const getReturnValues = (countDown) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  };

  const [days, hours, minutes, seconds] = useCountdown(deadline);

  props.auctions.lastTime = [days, hours, minutes, seconds];

  if (lastTime) {
    return (
      <>
        <BiddingThing to="#" key={id}>
          <DeadLine>
            {new Date(Date.parse(deadline)).getMonth() + 1}/
            {new Date(Date.parse(deadline)).getDate()}{" "}
            {new Date(Date.parse(deadline)).getHours()}:
            {new Date(Date.parse(deadline)).getMinutes()}:
            {new Date(Date.parse(deadline)).getSeconds()} 結標
          </DeadLine>
          <BidImg src={image} />
          <BidTitle>{title}</BidTitle>
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
                style={{
                  color: "red",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                ${currentPrice}
              </span>
            </Bidtext>
            <Bidtext>{count} 次出價</Bidtext>
          </div>
          <Bidtext style={{ marginLeft: "15px" }}>
            {lastTime[0] + lastTime[1] + lastTime[2] + lastTime[3] < 0
              ? "已結標"
              : `剩餘時間 ${lastTime[0]}天${lastTime[1]}小時${lastTime[2]}分鐘
            ${lastTime[3]}秒`}
          </Bidtext>
          <BidButton to="#">我要出價</BidButton>
        </BiddingThing>
      </>
    );
  }
};

export default BiddingList;
