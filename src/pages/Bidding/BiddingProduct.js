import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import api from "../../utils/api";
import io from "socket.io-client";
import Confetti from "react-confetti";

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
  &[disabled] {
    cursor: not-allowed;
    background-color: #e0e4e9;
    color: #bdcbdc;
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

const BlackAllLayout = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
`;

const PopUpMessage = styled.div`
  width: 500px;
  height: 350px;
  left: 50%;
  transform: translateX(-50%);
  top: 30vh;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  @media screen and (max-width: 1279px) {
    top: 80vh;
  }
`;

const PopUpImg = styled.img`
  width: 200px;
  height: 200px;
`;

const PopUpText = styled.div`
  text-align: center;
  vertical-align: middle;
  font-size: 40px;
  ${"" /* line-height: 130px; */}
  margin-top: 40px;
`;

const PopUpNote = styled.div`
  text-align: center;
  vertical-align: middle;
  font-size: 20px;
  letter-spacing: 1.5px;
  margin-top: 15px;
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
    // countDownDate ?????? useEffect ??????????????????????????? countDownDate ??????????????????
    // ??????????????? countDownDate ???????????????????????? useEffect ???????????????????????????(??????useEffect?????? countDownDate ??????)
    // clearInterval => 1. ??? countDownDate ????????? ???????????? 2. ???????????? ? ?????????????????? ????????? clear ????????????????????????
    // ?????????????????? clearInterval ???????????? => ????????????????????? interval
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
      <DetailTitle>????????????</DetailTitle>
      {props.auctionProduct.lastTime[0] +
        props.auctionProduct.lastTime[1] +
        props.auctionProduct.lastTime[2] +
        props.auctionProduct.lastTime[3] <
      0
        ? "?????????"
        : `${props.auctionProduct.lastTime[0]} ??? ${props.auctionProduct.lastTime[1]} 
      ?????? ${props.auctionProduct.lastTime[2]} ??? 
      ${props.auctionProduct.lastTime[3]} ???`}
    </DetailWrap>
  );
};

const BiddingProduct = () => {
  const userToken = localStorage.getItem("userToken") || "";
  let navigate = useNavigate();
  const [auctionProduct, setAuctionProduct] = useState();
  const socketRef = useRef();
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState({
    currentPrice: 0,
    currentBidCount: 0,
    currentUser: "",
  });
  const [plusPrice, setPlusPrice] = useState(0);
  const [disabled, setDisabled] = useState();
  const [bidSuccess, setBidSuccess] = useState(false);
  const [bidFail, setBidFail] = useState(false);
  const [bidInfo, setBidInfo] = useState("");
  const [bidSuccessInfoTime, setBidSuccessInfoTime] = useState(5);
  const [bidFailInfoTime, setBidFailInfoTime] = useState(3);
  const [originPrice, setOriginPrice] = useState(0);
  let nowPrice;
  // click button => ????????????
  console.log(originPrice);
  const popUpImages = {
    success:
      "https://github.com/yuminzzzz/co-work/blob/feature/socket-io-2/public/img/bidSuccess-removebg-preview.png?raw=true",
    fail: "https://github.com/yuminzzzz/co-work/blob/feature/socket-io-2/public/img/bidFail-removebg-preview.png?raw=true",
    freq: "https://github.com/yuminzzzz/co-work/blob/feature/socket-io-2/public/img/bidFreq-removebg-preview.png?raw=true",
  };

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
      if (!userToken) {
        setBidFailInfoTime(3);
        setBidInfo("???????????????????????????");
        setBidFail(true);
        const coundDownTimer = setInterval(() => {
          setBidFailInfoTime((prev) => {
            if (prev <= 0) {
              clearInterval(coundDownTimer);
              setBidFail(false);
              navigate("/profile");
              return 0;
            } else {
              return prev - 1;
            }
          });
        }, 1000);
      } else {
        const passMessage = {
          userId: userToken,
          auctionId: id,
          room: id,
          bid: originPrice + plusPrice,
        };
        setPlusPrice(0);
        socketRef.current.emit("chat message", passMessage);
      }
    } else {
      setBidFailInfoTime(3);
      setBidInfo("???????????????????????????");
      setBidFail(true);
      const coundDownTimer = setInterval(() => {
        setBidFailInfoTime((prev) => {
          if (prev <= 0) {
            clearInterval(coundDownTimer);
            setBidFail(false);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
  };

  useEffect(() => {
    socketRef.current = io.connect("https://claudia-teng.com/", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socketRef.current.emit("joinRoom", { room: id });
    socketRef.current.on("chat message", (data) => {
      setProductInfo({
        currentUser: data.currentUserName,
        currentPrice: data.currentPrice,
        currentBidCount: data.currentBidCount,
      });
      nowPrice = data.currentPrice;
      setOriginPrice(nowPrice);
    });

    socketRef.current.on("success", (data) => {
      setOriginPrice(nowPrice);
      setBidSuccessInfoTime(5);
      setBidSuccess(true);
      const coundDownTimer = setInterval(() => {
        setBidSuccessInfoTime((prev) => {
          if (prev <= 0) {
            clearInterval(coundDownTimer);
            setBidSuccess(false);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    });

    socketRef.current.on("fail", (data) => {
      setBidFailInfoTime(3);
      setBidInfo(data);
      setBidFail(true);
      const coundDownTimer = setInterval(() => {
        setBidFailInfoTime((prev) => {
          if (prev <= 0) {
            clearInterval(coundDownTimer);
            setBidFail(false);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    });
  }, []);

  useEffect(() => {
    async function getAuctionProduct() {
      const data = await api.getAuctionProduct(id);
      setAuctionProduct(data);
      setOriginPrice(data.currentPrice);
      setProductInfo({
        currentUser: data.currentUser,
        currentPrice: data.currentPrice,
        currentBidCount: data.count,
      });
    }
    getAuctionProduct();
  }, []);

  if (!auctionProduct) {
    return null;
  }
  return (
    <>
      <Wrapper>
        {bidSuccess ? (
          <Confetti style={{ width: "100%", height: "100%" }} />
        ) : (
          ""
        )}
        {bidSuccess ? (
          <>
            <PopUpMessage>
              <PopUpImg src={popUpImages.success} alt="Bid-success" />
              <PopUpText>????????????</PopUpText>
              <PopUpNote>{bidSuccessInfoTime} ?????????????????? ...</PopUpNote>
            </PopUpMessage>
            <BlackAllLayout />
          </>
        ) : (
          ""
        )}
        {bidFail ? (
          bidInfo === "?????????????????????????????????????????????(??????)" ? (
            <>
              <PopUpMessage>
                <PopUpImg src={popUpImages.freq} alt="Bid-fail-freq" />
                <PopUpText style={{ fontSize: "25px" }}>{bidInfo}</PopUpText>
                <PopUpNote>{bidFailInfoTime} ?????????????????? ...</PopUpNote>
              </PopUpMessage>
              <BlackAllLayout />
            </>
          ) : (
            <>
              <PopUpMessage>
                <PopUpImg src={popUpImages.fail} alt="Bid-fail" />
                <PopUpText style={{ fontSize: "25px" }}>{bidInfo}</PopUpText>
                <PopUpNote>
                  {bidInfo === "???????????????????????????"
                    ? `${bidFailInfoTime} ???????????????????????? `
                    : `${bidFailInfoTime} ?????????????????? ...`}
                </PopUpNote>
              </PopUpMessage>
              <BlackAllLayout />
            </>
          )
        ) : (
          ""
        )}
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
              ????????????{" "}
              <span style={{ color: "red" }}>${productInfo.currentPrice}</span>
            </Price>
            <CountPrice>{productInfo.currentBidCount} ?????????</CountPrice>
          </PriceWrapper>
          <DetailWrap>
            <DetailTitle>??????</DetailTitle>
            {!disabled ? `${auctionProduct.stock} ???` : `0 ???`}
          </DetailWrap>
          <HighestPerson>
            <DetailTitle>{!disabled ? "???????????????" : "???????????????"}</DetailTitle>
            {productInfo.currentUser}
          </HighestPerson>
          <BiddingButtonWrapper style={{ marginTop: "30px" }}>
            <ButtonTitle>????????????</ButtonTitle>
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
                  ? "???????????????????????????"
                  : "????????????????????????"
                : `${plusPrice + originPrice}`}
            </UserNowBiddingPrice>
            <BiddingButton
              disabled={disabled}
              onClick={() => {
                setPricetoServer();
              }}
            >
              ????????????
            </BiddingButton>
            {!disabled ? (
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
                ????????????
              </BiddingButton>
            ) : (
              ""
            )}
          </UserBiddingPriceWrapper>
          <BiddingLastTimeDetail
            auctionProduct={auctionProduct}
            setDisabled={setDisabled}
          />
          <DetailWrap>
            <DetailTitle>????????????</DetailTitle>
            {new Date(Date.parse(auctionProduct.deadline)).getFullYear()}/
            {new Date(Date.parse(auctionProduct.deadline)).getMonth() + 1}/
            {new Date(Date.parse(auctionProduct.deadline)).getDate()}{" "}
            {new Date(Date.parse(auctionProduct.deadline)).getHours()}:
            {new Date(Date.parse(auctionProduct.deadline)).getMinutes()}:
            {new Date(Date.parse(auctionProduct.deadline)).getSeconds()}
          </DetailWrap>
          <DetailWrap>
            <DetailTitle>????????????</DetailTitle>
            {auctionProduct.payment}
          </DetailWrap>
          <DetailWrap
            style={{
              marginBottom: "15px",
              paddingBottom: "15px",
            }}
          >
            <DetailTitle>??????</DetailTitle>
            {auctionProduct.shipping} ???
          </DetailWrap>

          <Description>{auctionProduct.description}</Description>
        </Details>
        <Story>
          <StoryTitle>????????????</StoryTitle>
          <StoryContent>{auctionProduct.story}</StoryContent>
        </Story>
        <Images>
          {auctionProduct.images.map((image, index) => (
            <Image src={image} key={index} />
          ))}
        </Images>
        <Image
          src={popUpImages.success}
          key={2}
          style={{ width: 0, height: 0 }}
        />
        <Image src={popUpImages.fail} key={3} style={{ width: 0, height: 0 }} />
        <Image src={popUpImages.freq} key={4} style={{ width: 0, height: 0 }} />
      </Wrapper>
    </>
  );
};

export default BiddingProduct;
export { PriceWrapper, DetailTitle, DetailWrap };
