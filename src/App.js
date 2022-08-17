import { useState } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CartContext from "./contexts/CartContext";
import PingFangTCRegular from "./fonts/PingFang-TC-Regular-2.otf";
import PingFangTCThin from "./fonts/PingFang-TC-Thin-2.otf";
import NotoSansTCRegular from "./fonts/NotoSansTC-Regular.otf";
import NotoSansTCBold from "./fonts/NotoSansTC-Bold.otf";
import api from "./utils/api";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: PingFangTC;
    src: url(${PingFangTCRegular}) format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: PingFangTC;
    src: url(${PingFangTCThin}) format('opentype');
    font-weight: 100;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url(${NotoSansTCRegular}) format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url(${NotoSansTCBold}) format('opentype');
    font-weight: bold;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: NotoSansTC;
  }

  #root {
    min-height: 100vh;
    padding-bottom: 115px;
    position: relative;
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;

    @media screen and (max-width: 1279px) {
      padding-bottom: 208px;
    }
  }

  a {
    text-decoration: none;
  }
`;

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(window.localStorage.getItem("cartItems")) || []
  );

  function getItems() {
    return cartItems;
  }

  async function getUserCartItem(userToken) {
    const data = await api.getUserCartItem(userToken);
    // setCartItems(data);
    return data;
  }

  function addItem(item) {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已加入商品");
  }

  async function addToCart(product, token) {
    const item = {
      color: { code: "334455", name: "深藍" },
      id: product.id,
      isStylish: false,
      image: product.main_image,
      name: product.title,
      price: product.price,
      qty: 1,
      size: "S",
      stock: 1,
      seller: product.seller,
    };
    if (!token) {
      const newCartItems = [...cartItems, item];
      setCartItems(newCartItems);
      window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      await api.addNewItemsInCart(item, token);
      await getUserCartItem(token);
    }
    window.alert("已加入商品");
  }

  function changeItemQuantity(itemIndex, itemQuantity) {
    const newCartItems = cartItems.map((item, index) =>
      index === itemIndex
        ? {
            ...item,
            qty: itemQuantity,
          }
        : item
    );
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已修改數量");
  }

  function deleteItem(itemIndex) {
    const newCartItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已刪除商品");
  }

  function clearItems() {
    const newCartItems = [];
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }

  const cart = {
    getItems,
    addItem,
    changeItemQuantity,
    deleteItem,
    clearItems,
    addToCart,
    getUserCartItem,
    cartItems,
  };

  return (
    <CartContext.Provider value={cart}>
      <Reset />
      <GlobalStyle />
      <Header />
      <Outlet />
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
