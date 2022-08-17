import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import CartContext from "../../contexts/CartContext";
import api from "../../utils/api";
import getJwtToken from "../../utils/getJwtToken";
import tappay from "../../utils/tappay";
import Cart from "./Cart";

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 47px 0 263px;
  max-width: 1160px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    padding: 20px 24px 236px;
  }
`;

const GrayBlock = styled.div`
  padding: 22px 30px;
  margin-top: 26px;
  background-color: #e8e8e8;
  display: flex;
  align-items: center;
  line-height: 19px;
  font-size: 16px;

  @media screen and (max-width: 1279px) {
    padding: 10px 10px 20px;
    flex-direction: column;
    align-items: flex-start;
    font-size: 14px;
    line-height: 17px;
  }
`;

const Label = styled.label`
  color: #3f3a3a;
  margin-left: 30px;

  @media screen and (max-width: 1279px) {
    margin-left: 0;
  }
`;

const Select = styled.select`
  width: 171px;
  height: 30px;
  margin-left: 20px;
  padding-left: 17px;
  border-radius: 8px;
  border: solid 1px #979797;
  background-color: #f3f3f3;

  & + ${Label} {
    margin-left: 82px;

    @media screen and (max-width: 1279px) {
      margin-left: 0;
      margin-top: 20px;
    }
  }

  @media screen and (max-width: 1279px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
`;

const Note = styled.div`
  line-height: 26px;
  margin-top: 20px;
  font-size: 16px;
  color: #3f3a3a;
`;

const FormFieldSet = styled.fieldset`
  margin-top: 50px;

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
  }
`;

const FormLegend = styled.legend`
  line-height: 19px;
  font-size: 16px;
  font-weight: bold;
  color: #3f3a3a;
  padding-bottom: 16px;
  border-bottom: 1px solid #3f3a3a;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 684px;

  ${FormLegend} + & {
    margin-top: 25px;
  }

  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
    margin-top: 20px;
    width: 100%;

    ${FormLegend} + & {
      margin-top: 20px;
    }
  }
`;

const FormLabel = styled.label`
  width: 110px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: block;

  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const FormControl = styled.input`
  width: 574px;
  height: 30px;
  border-radius: 8px;
  border: solid 1px #979797;

  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    width: 100%;
  }
`;

const FormText = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #8b572a;
  margin-top: 10px;
  width: 100%;
  text-align: right;
`;

const FormCheck = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;

  & + & {
    margin-left: 30px;
  }

  @media screen and (max-width: 1279px) {
    margin-left: 0;
    margin-top: 10px;

    & + & {
      margin-left: 27px;
    }
  }
`;

const FormCheckInput = styled.input`
  margin: 0;
  width: 16px;
  height: 16px;
`;

const FormCheckLabel = styled.label`
  margin-left: 10px;
  line-height: 26px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
  margin-left: auto;

  @media screen and (max-width: 1279px) {
    width: 200px;
  }
`;

const SubtotalPrice = styled(Price)`
  margin-top: 40px;

  @media screen and (max-width: 1279px) {
    margin-top: 24px;
  }
`;

const ShippingPrice = styled(Price)`
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #3f3a3a;

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
    padding-bottom: 24px;
    border-bottom: 1px solid #3f3a3a;
  }
`;

const TotalPrice = styled(Price)`
  margin-top: 20px;

  @media screen and (max-width: 1279px) {
    margin-top: 16px;
  }
`;

const PriceName = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
  }
`;

const Currency = styled.div`
  margin-left: auto;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
`;

const PriceValue = styled.div`
  line-height: 36px;
  margin-left: 10px;
  font-size: 30px;
  color: #3f3a3a;
`;

const CheckoutButton = styled.button`
  width: 240px;
  height: 60px;
  margin-top: 50px;
  border: solid 1px #979797;
  background-color: black;
  color: white;
  font-size: 20px;
  letter-spacing: 4px;
  margin-left: auto;
  display: block;
  cursor: pointer;

  @media screen and (max-width: 1279px) {
    width: 100%;
    height: 44px;
    margin-top: 36px;
    border: solid 1px black;
    font-size: 16px;
    letter-spacing: 3.2px;
  }
`;

const recipientFormGroups = [
  {
    label: "收件人姓名",
    key: "name",
    text: "務必填寫完整收件人姓名，避免包裹無法順利簽收",
  },
  { label: "Email", key: "email" },
  { label: "手機", key: "phone" },
  { label: "地址", key: "address" },
  {
    label: "配送時間",
    key: "time",
    options: [
      {
        label: "08:00-12:00",
        value: "morning",
      },
      {
        label: "14:00-18:00",
        value: "afternoon",
      },
      {
        label: "不指定",
        value: "anytime",
      },
    ],
  },
];

function Checkout() {
  const [recipient, setRecipient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    time: "",
  });
  const cart = useContext(CartContext);
  const items = cart.getItems();
  const navigate = useNavigate();
  const cardNumberRef = useRef();
  const cardExpirationDateRef = useRef();
  const cardCCVRef = useRef();
  const [userItems, setUserItems] = useState();
  const userToken = localStorage.getItem("userToken") || "";

  useEffect(() => {
    tappay.setupSDK();
    tappay.setupCard(
      cardNumberRef.current,
      cardExpirationDateRef.current,
      cardCCVRef.current
    );
  }, []);

  useEffect(() => {
    async function getUserCartItem(userToken) {
      const data = await api.getUserCartItem(userToken);
      setUserItems(data);
    }
    getUserCartItem(userToken);
  }, []);
  let subtotal;
  if (userItems) {
    subtotal =
      items.reduce((prev, item) => prev + item.price * item.qty, 0) ||
      userItems.reduce((prev, item) => prev + item.price * item.qty, 0);
  }

  const freight = 30;

  async function checkout() {
    let jwtToken = window.localStorage.getItem("jwtToken");

    if (!jwtToken) {
      try {
        jwtToken = await getJwtToken();
      } catch (e) {
        window.alert(e.message);
        return;
      }
    }
    window.localStorage.setItem("jwtToken", jwtToken);

    if (items.length === 0) {
      window.alert("尚未選購商品");
      return;
    }

    if (Object.values(recipient).some((value) => !value)) {
      window.alert("請填寫完整訂購資料");
      return;
    }

    if (!tappay.canGetPrime()) {
      window.alert("付款資料輸入有誤");
      return;
    }

    const result = await tappay.getPrime();
    if (result.status !== 0) {
      window.alert("付款資料輸入有誤");
      return;
    }

    const { data } = await api.checkout(
      {
        prime: result.card.prime,
        order: {
          shipping: "delivery",
          payment: "credit_card",
          subtotal,
          freight,
          total: subtotal + freight,
          recipient,
          list: cart.getItems(),
        },
      },
      jwtToken
    );
    window.alert("付款成功");
    cart.clearItems();
    navigate("/thankyou", { state: { orderNumber: data.number } });
  }

  return (
    <Wrapper>
      <Cart />
      <GrayBlock>
        <Label>配送國家</Label>
        <Select>
          <option>臺灣及離島</option>
        </Select>
        <Label>付款方式</Label>
        <Select>
          <option>信用卡付款</option>
        </Select>
      </GrayBlock>
      <Note>
        ※ 提醒您：
        <br />● 選擇宅配-請填寫正確收件人資訊，避免包裹配送不達
        <br />● 選擇超商-請填寫正確收件人姓名(與證件相符)，避免無法領取
      </Note>
      <form>
        <FormFieldSet>
          <FormLegend>訂購資料</FormLegend>
          {recipientFormGroups.map(({ label, key, text, options }) => (
            <FormGroup key={key}>
              <FormLabel>{label}</FormLabel>
              {options ? (
                options.map((option) => (
                  <FormCheck key={option.value}>
                    <FormCheckInput
                      type="radio"
                      checked={recipient.time === option.value}
                      onChange={(e) => {
                        if (e.target.checked)
                          setRecipient({ ...recipient, time: option.value });
                      }}
                    />
                    <FormCheckLabel>{option.label}</FormCheckLabel>
                  </FormCheck>
                ))
              ) : (
                <FormControl
                  value={recipient[key]}
                  onChange={(e) =>
                    setRecipient({ ...recipient, [key]: e.target.value })
                  }
                />
              )}

              {text && <FormText>{text}</FormText>}
            </FormGroup>
          ))}
        </FormFieldSet>
        <FormFieldSet>
          <FormLegend>付款資料</FormLegend>
          <FormGroup>
            <FormLabel>信用卡號碼</FormLabel>
            <FormControl as="div" ref={cardNumberRef} />
          </FormGroup>
          <FormGroup>
            <FormLabel>有效期限</FormLabel>
            <FormControl as="div" ref={cardExpirationDateRef} />
          </FormGroup>
          <FormGroup>
            <FormLabel>安全碼</FormLabel>
            <FormControl as="div" ref={cardCCVRef} />
          </FormGroup>
        </FormFieldSet>
      </form>
      <SubtotalPrice>
        <PriceName>總金額</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{subtotal}</PriceValue>
      </SubtotalPrice>
      <ShippingPrice>
        <PriceName>運費</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{freight}</PriceValue>
      </ShippingPrice>
      <TotalPrice>
        <PriceName>應付金額</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{subtotal + freight}</PriceValue>
      </TotalPrice>
      <CheckoutButton onClick={checkout}>確認付款</CheckoutButton>
    </Wrapper>
  );
}

export default Checkout;
