import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import api from '../../utils/api';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 70px 0 46px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1279px) {
    padding: 15px 21px 6px;
  }
`;

const Product = styled(Link)`
  width: calc((100% - 120px) / 3);
  margin: 0 20px 50px;
  flex-shrink: 0;
  text-decoration: none;

  @media screen and (max-width: 1279px) {
    width: calc((100% - 12px) / 2);
    margin: 0 3px 24px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  vertical-align: middle;
`;

const ProductColors = styled.div`
  margin-top: 20px;
  display: flex;

  @media screen and (max-width: 1279px) {
    margin-top: 8px;
  }
`;

const ProductColor = styled.div`
  width: 24px;
  height: 24px;
  box-shadow: 0px 0px 1px #bbbbbb;
  background-color: ${(props) => props.$colorCode};

  @media screen and (max-width: 1279px) {
    width: 12px;
    height: 12px;
  }

  & + & {
    margin-left: 10px;

    @media screen and (max-width: 1279px) {
      margin-left: 6px;
    }
  }
`;

const ProductTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #3f3a3a;
  line-height: 24px;

  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    font-size: 12px;
    letter-spacing: 2.4px;
    line-height: 14px;
  }
`;

const ProductPrice = styled.div`
  margin-top: 10px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #3f3a3a;
  line-height: 24px;

  @media screen and (max-width: 1279px) {
    margin-top: 8px;
    font-size: 12px;
    letter-spacing: 2.4px;
    line-height: 14px;
  }
`;

function Products() {
  const [products, setProducts] = useState([]);
  const nextPagingRef = useRef();
  const waypointRef = useRef();
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');

  useEffect(() => {
    setProducts([]);
    nextPagingRef.current = 0;
    let isFetching = false;

    const intersectionObserver = new IntersectionObserver(async (entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      if (nextPagingRef.current === undefined) return;
      if (isFetching) return;

      function fetchProducts() {
        if (keyword) {
          return api.searchProducts(keyword, nextPagingRef.current);
        }
        if (category) {
          return api.getProducts(category, nextPagingRef.current);
        }
        return api.getProducts('all', nextPagingRef.current);
      }

      isFetching = true;
      const { data, next_paging } = await fetchProducts();
      setProducts((prev) => [...prev, ...data]);
      nextPagingRef.current = next_paging;
      isFetching = false;
    });

    intersectionObserver.observe(waypointRef.current);
    const waypoint = waypointRef.current;

    return () => {
      intersectionObserver.unobserve(waypoint);
    };
  }, [keyword, category]);

  return (
    <>
      <Wrapper>
        {products.map(({ id, main_image, colors, title, price }) => (
          <Product key={id} to={`/products/${id}`}>
            <ProductImage src={main_image} />
            <ProductColors>
              {colors.map(({ code }) => (
                <ProductColor $colorCode={`#${code}`} key={code} />
              ))}
            </ProductColors>
            <ProductTitle>{title}</ProductTitle>
            <ProductPrice>TWD.{price}</ProductPrice>
          </Product>
        ))}
      </Wrapper>
      <div ref={waypointRef} />
    </>
  );
}

export default Products;
