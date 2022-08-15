import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";

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
  const [secondHandProduct, setSecondHandProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getSecondHandProduct() {
      const data = await api.getSecondHandProduct(id);
      setSecondHandProduct(data);
    }
    getSecondHandProduct();
  }, [id]);

  if (!secondHandProduct) {
    return null;
  }
  console.log(secondHandProduct);
  return (
    <Wrapper>
      <MainImage src={secondHandProduct.main_image} />
      <Details>
        <Title>{secondHandProduct.title}</Title>
        <ID style={{ marginBottom: "10px" }}>{secondHandProduct.id}</ID>
        <PriceWrapper>
          <Price
            style={{
              marginTop: "0px",
              border: "none",
              paddingBottom: "0",
              fontWeight: "bold",
            }}
          >
            價格{" "}
            <span style={{ color: "red" }}>${secondHandProduct.price}</span>
          </Price>
        </PriceWrapper>
        <DetailWrap style={{ marginTop: "25px", fontSize: "20px" }}>
          <DetailTitle style={{ width: "100px" }}>數量</DetailTitle>
          {secondHandProduct.stock} 件
        </DetailWrap>
        <DetailWrap style={{ fontSize: "20px", marginTop: "25px" }}>
          <DetailTitle style={{ width: "100px" }}>賣家</DetailTitle>
          {secondHandProduct.seller}
        </DetailWrap>
        <AddToCart>加入購物車</AddToCart>

        <DetailWrap
          style={{
            display: "block",
            fontSize: "20px",
            marginTop: "25px",
            width: "350px",
          }}
        >
          <DetailTitle style={{ marginBottom: "10px" }}>賣家描述</DetailTitle>
          <Description style={{ whiteSpace: "pre-wrap" }}>
            {secondHandProduct.description}
          </Description>
        </DetailWrap>
      </Details>
      <Story>
        <StoryTitle>細部說明</StoryTitle>
        <StoryContent>{secondHandProduct.story}</StoryContent>
      </Story>
      <Images>
        {secondHandProduct.images.map((image, index) => (
          <Image src={image} key={index} />
        ))}
      </Images>
    </Wrapper>
  );
};

export default SecondHandProduct;
