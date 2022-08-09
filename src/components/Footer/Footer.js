import styled from 'styled-components';

import line from './line.png';
import facebook from './facebook.png';
import twitter from './twitter.png';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #313538;
  font-family: PingFangTC;

  @media screen and (max-width: 1279px) {
    bottom: 60px;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  height: 115px;
  padding-left: 24px;
  padding-right: 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    height: 148px;
    padding: 23px 0 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const SiteLinks = styled.div`
  display: flex;

  @media screen and (max-width: 1279px) {
    width: 168px;
    height: 84px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-between;
    margin-left: 16px;
  }
`;

const SiteLink = styled.div`
  width: 134px;
  text-align: center;
  position: relative;
  color: #f5f5f5;
  cursor: pointer;

  @media screen and (max-width: 1279px) {
    width: auto;
    line-height: 20px;
    margin-bottom: 8px;
    text-align: left;
    color: white;
    font-size: 14px;
  }

  & + &::before {
    content: '|';
    position: absolute;
    left: 0;

    @media screen and (max-width: 1279px) {
      content: '';
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  margin-left: auto;

  @media screen and (max-width: 1279px) {
    margin-left: 40px;
    margin-bottom: 28px;
  }
`;

const SocialLink = styled.div`
  width: 50px;
  height: 50px;
  background-size: contain;
  cursor: pointer;
  background-image: url(${(props) => props.icon});

  @media screen and (max-width: 1279px) {
    width: 20px;
    height: 20px;
  }

  & + & {
    margin-left: 30px;

    @media screen and (max-width: 1279px) {
      margin-left: 14px;
    }
  }
`;

const Copywright = styled.div`
  margin-left: 30px;
  line-height: 17px;
  font-size: 12px;
  color: #828282;

  @media screen and (max-width: 1279px) {
    margin-left: 0;
    margin-top: 7px;
    line-height: 14px;
    font-size: 10px;
    color: #828282;
    width: 100%;
    text-align: center;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Content>
        <SiteLinks>
          {['關於 Stylish', '服務條款', '隱私政策', '聯絡我們', 'FAQ'].map(
            (text, index) => (
              <SiteLink key={index}>{text}</SiteLink>
            )
          )}
        </SiteLinks>
        <SocialLinks>
          {[line, twitter, facebook].map((icon, index) => (
            <SocialLink key={index} icon={icon} />
          ))}
        </SocialLinks>
        <Copywright>© 2022. All rights reserved.</Copywright>
      </Content>
    </Wrapper>
  );
}

export default Footer;
