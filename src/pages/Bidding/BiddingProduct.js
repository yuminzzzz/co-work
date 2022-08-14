import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../utils/api";
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

const PriceButton = styled.button`
  padding: 8px 15px;
  background-color: #feecd8;
  margin-left: 10px;
  cursor: pointer;
  font-size: 18px;
  border: none;
  text-align: center;
  &:hover {
    background-color: #cfb9ab;
  }
`;

const UserBiddingPriceWrapper = styled.div`
  background-color: #ececec;
  display: flex;
  flex-wrap: wrap;
  width: 350px;
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
  text-align: center;
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

const BiddingLastTimeDetail = (props) => {
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
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    if (days + hours + minutes + seconds < 0) {
      props.setDisabled("disabled");
    }
    return [days, hours, minutes, seconds];
  };
  const [days, hours, minutes, seconds] = useCountdown(
    props.auctionProduct.deadline
  );

  props.auctionProduct.lastTime = [days, hours, minutes, seconds];
  return (
    <DetailWrap>
      <DetailTitle>剩餘時間</DetailTitle>
      {props.auctionProduct.lastTime[0] +
        props.auctionProduct.lastTime[1] +
        props.auctionProduct.lastTime[2] +
        props.auctionProduct.lastTime[3] <
      0
        ? "已結標"
        : `${props.auctionProduct.lastTime[0]} 天 ${props.auctionProduct.lastTime[1]} 
      小時 ${props.auctionProduct.lastTime[2]} 分 
      ${props.auctionProduct.lastTime[3]} 秒`}
    </DetailWrap>
  );
};

const BiddingProduct = () => {
  const [auctionProduct, setAuctionProduct] = useState();
  const { id } = useParams();
  const [currentOriginPrice, setCurrentOriginPrice] = useState(0);
  const [plusPrice, setPlusPrice] = useState(0);
  const [currentUser, setCurrentUser] = useState();
  const [disabled, setDisabled] = useState();
  const socket = io.connect("https://weigen.online");
  const clickButton = (e) => {
    e.preventDefault();
    if (!disabled) {
      setPlusPrice((prev) => prev + Number(e.target.value));
    }
  };

  const resetButton = (e) => {
    e.preventDefault();
    setPlusPrice(0);
  };

  const setPricetoServer = () => {
    if (!disabled) {
      const passMessage = {
        userId: 2,
        // userId: currentUser,
        auctionId: id,
        room: id,
        bid: currentOriginPrice + plusPrice,
      };
      setPlusPrice(0);
      // socket.emit("join_room", id);
      socket.emit("chat message", passMessage);
      console.log(passMessage);
    } else {
      alert("此商品競標已結束！");
    }
  };

  useEffect(() => {
    socket.emit("join_room", id);
    socket.on("chat message", (data) => {
      setCurrentOriginPrice(data);
      // console.log(data);
    });
  }, []);

  useEffect(() => {
    async function getAuctionProduct() {
      const data = await api.getAuctionProduct(id);
      setAuctionProduct(data);
      setCurrentOriginPrice(data.currentPrice);
      setCurrentUser(data.currentUser);
      console.log(data);
    }
    getAuctionProduct();
  }, [id]);

  if (!auctionProduct) {
    return null;
  }

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
            目前出價 <span style={{ color: "red" }}>${currentOriginPrice}</span>
          </Price>
          <CountPrice>{auctionProduct.count} 次出價</CountPrice>
        </PriceWrapper>
        <DetailWrap>
          <DetailTitle>數量</DetailTitle>
          {auctionProduct.stock} 件
        </DetailWrap>
        <HighestPerson>
          <DetailTitle>{!disabled ? "最高出價者" : "商品得標者"}</DetailTitle>
          {auctionProduct.currentUser}
        </HighestPerson>
        <BiddingButtonWrapper style={{ marginTop: "30px" }}>
          <ButtonTitle>出價增額</ButtonTitle>
          <PriceButton
            value="100"
            onClick={(e) => {
              clickButton(e);
            }}
          >
            100
          </PriceButton>
          <PriceButton
            value="500"
            onClick={(e) => {
              clickButton(e);
            }}
          >
            500
          </PriceButton>
          <PriceButton
            value="1000"
            onClick={(e) => {
              clickButton(e);
            }}
          >
            1000
          </PriceButton>
        </BiddingButtonWrapper>
        <UserBiddingPriceWrapper style={{ marginBottom: "40px" }}>
          <UserNowBiddingPrice>
            {plusPrice === 0
              ? !disabled
                ? "請點擊按鈕進行出價"
                : "此商品競標已截止"
              : `${plusPrice + currentOriginPrice}`}
          </UserNowBiddingPrice>
          <BiddingButton
            disabled={disabled}
            onClick={() => {
              setPricetoServer();
            }}
          >
            我要出價
          </BiddingButton>
          <BiddingButton
            onClick={(e) => {
              resetButton(e);
            }}
            style={{
              flexBasis: "350px",
              marginLeft: "0",
              marginTop: "15px",
              fontSize: "18px",
            }}
          >
            出價歸零
          </BiddingButton>
        </UserBiddingPriceWrapper>
        <BiddingLastTimeDetail
          auctionProduct={auctionProduct}
          setDisabled={setDisabled}
        />
        <DetailWrap>
          <DetailTitle>截止時間</DetailTitle>
          {new Date(Date.parse(auctionProduct.deadline)).getFullYear()}/
          {new Date(Date.parse(auctionProduct.deadline)).getMonth() + 1}/
          {new Date(Date.parse(auctionProduct.deadline)).getDate()}{" "}
          {new Date(Date.parse(auctionProduct.deadline)).getHours()}:
          {new Date(Date.parse(auctionProduct.deadline)).getMinutes()}:
          {new Date(Date.parse(auctionProduct.deadline)).getSeconds()}
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
