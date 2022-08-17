import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import api from "../../utils/api";

const Wrapper = styled.div`
  height: 500px;
  position: relative;

  @media screen and (max-width: 1279px) {
    height: 185px;
  }
`;

const Campaign = styled(Link)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.$backgroundImageUrl});
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  ${(props) => props.$isActive && "z-index: 1;"}
  transition: opacity 1s;
  text-decoration: none;
  color: #070707;
`;

const Story = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 166px;
  padding-left: 47px;
  font-family: PingFangTC;
  font-weight: 100;

  @media screen and (max-width: 1279px) {
    padding-top: 30px;
    padding-left: 23px;
  }
`;

const StoryContent = styled.div`
  font-size: 30px;
  font-weight: bold;
  white-space: pre;
  line-height: 57px;

  @media screen and (max-width: 1279px) {
    font-size: 15px;
    line-height: 28px;
  }
`;

const StoryTitle = styled.div`
  font-size: 20px;
  line-height: 64px;
  @media screen and (max-width: 1279px) {
    font-size: 10px;
    line-height: 32px;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  z-index: 2;

  @media screen and (max-width: 1279px) {
    bottom: 18px;
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.$isActive ? "#8b572a" : "white")};
  border-radius: 50%;
  cursor: pointer;

  @media screen and (max-width: 1279px) {
    width: 4px;
    height: 4px;
    background-color: ${(props) => (props.$isActive ? "#8b572a" : "white")};
  }

  & + & {
    margin-left: 22px;

    @media screen and (max-width: 1279px) {
      margin-left: 8.8px;
    }
  }
`;

function Carousel() {
  const campaigns = [
    {
      id: 1,
      product_id: 3,
      picture: "https://i.imgur.com/M9Ebx1s.png",
      story:
        "百變怪\r\n八月份競標主題\r\n變身成你想成為的樣子\r\n百變怪《hello》",
    },
    {
      id: 2,
      product_id: 4,
      picture: "https://i.imgur.com/lCwR7XY.png",
      story:
        "卡比獸\r\n八月份競標主題\r\n只要可以吃 什麼都不在意\r\n卡比獸《大吃一斤》",
    },
    {
      id: 3,
      product_id: 5,
      picture: "https://i.imgur.com/YOoIw0U.png",
      story:
        "卡比之星\r\n八月份競標主題\r\n把所有不喜歡的東西都吃吃吃掉！\r\n卡比《yumyumyum》",
    },
  ];
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    async function getCampaigns() {
      intervalRef.current = window.setInterval(() => {
        setActiveCampaignIndex((prev) =>
          prev === campaigns.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    }
    getCampaigns();
  }, []);

  return (
    <Wrapper>
      {campaigns.map(({ picture, product_id, story }, index) => (
        <Campaign
          $isActive={index === activeCampaignIndex}
          $backgroundImageUrl={picture}
          key={index}
          to={`/bidding/${product_id}`}
        >
          <Story>
            <StoryContent>
              {story.split("\r\n").slice(0, 3).join("\r\n")}
            </StoryContent>
            <StoryTitle>{story.split("\r\n")[3]}</StoryTitle>
          </Story>
        </Campaign>
      ))}
      <Dots>
        {campaigns.map((_, index) => (
          <Dot
            $isActive={index === activeCampaignIndex}
            key={index}
            onClick={() => {
              setActiveCampaignIndex(index);
              window.clearInterval(intervalRef.current);
              intervalRef.current = window.setInterval(() => {
                setActiveCampaignIndex((prev) =>
                  prev === campaigns.length - 1 ? 0 : prev + 1
                );
              }, 3000);
            }}
          />
        ))}
      </Dots>
    </Wrapper>
  );
}

export default Carousel;
