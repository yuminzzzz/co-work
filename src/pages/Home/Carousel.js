import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import api from '../../utils/api';

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
  ${(props) => props.$isActive && 'z-index: 1;'}
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
  background-color: ${(props) => (props.$isActive ? '#8b572a' : 'white')};
  border-radius: 50%;
  cursor: pointer;

  @media screen and (max-width: 1279px) {
    width: 4px;
    height: 4px;
    background-color: ${(props) => (props.$isActive ? '#8b572a' : 'white')};
  }

  & + & {
    margin-left: 22px;

    @media screen and (max-width: 1279px) {
      margin-left: 8.8px;
    }
  }
`;

function Carousel() {
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    async function getCampaigns() {
      const { data } = await api.getCampaigns();
      setCampaigns(data);
      intervalRef.current = window.setInterval(() => {
        setActiveCampaignIndex((prev) =>
          prev === data.length - 1 ? 0 : prev + 1
        );
      }, 5000);
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
          to={`/products/${product_id}`}
        >
          <Story>
            <StoryContent>
              {story.split('\r\n').slice(0, 3).join('\r\n')}
            </StoryContent>
            <StoryTitle>{story.split('\r\n')[3]}</StoryTitle>
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
              }, 5000);
            }}
          />
        ))}
      </Dots>
    </Wrapper>
  );
}

export default Carousel;
