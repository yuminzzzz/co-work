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

import {
  PriceWrapper,
  DetailTitle,
  DetailWrap,
} from "../Bidding/BiddingProduct";

import { AddToCart } from "../Product/ProductVariants";

const SecondHandProduct = () => {
  return (
    <Wrapper>
      <MainImage
        style={{ width: "560px" }}
        src="https://images.unsplash.com/photo-1588189408846-30ad110a0f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1205&q=80"
      />
      <Details>
        <Title>厚實毛呢格子外套</Title>
        <ID style={{ marginBottom: "10px" }}>1234</ID>
        <PriceWrapper>
          <Price
            style={{
              marginTop: "0px",
              border: "none",
              paddingBottom: "0",
              fontWeight: "bold",
            }}
          >
            價格 <span style={{ color: "red" }}>$2200</span>
          </Price>
        </PriceWrapper>
        <DetailWrap style={{ marginTop: "25px", fontSize: "20px" }}>
          <DetailTitle>數量</DetailTitle>1 件
        </DetailWrap>
        <AddToCart>加入購物車</AddToCart>
        <DetailWrap
          style={{ display: "block", fontSize: "20px", marginTop: "25px" }}
        >
          <DetailTitle style={{ marginBottom: "10px" }}>賣家描述</DetailTitle>
          <Description>這裡可以放很多行</Description>
        </DetailWrap>
      </Details>
      <Story>
        <StoryTitle>細部說明</StoryTitle>
        <StoryContent>你絕對不能錯過的超值商品</StoryContent>
      </Story>
      <Images>
        {/* {product.images.map((image, index) => (
            <Image src={image} key={index} />
          ))} */}
        <Image src="https://images.unsplash.com/photo-1514813836041-518668f092b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
        <Image src="https://images.unsplash.com/photo-1608635680046-aebf91c1a9c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
      </Images>
    </Wrapper>
  );
};

export default SecondHandProduct;
