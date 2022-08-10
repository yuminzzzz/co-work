import Products from "../Home/Products";
import { Link } from "react-router-dom";
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

function SecondHandClothing() {
  return (
    <a href="#">
      <Carousel></Carousel>
    </a>
  );
}

export default SecondHandClothing;
