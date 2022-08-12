import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import App from "./App";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import ThankYou from "./pages/ThankYou/ThankYou";
import Product from "./pages/Product/Product";
import Profile from "./pages/Profile/Profile";
import SecondHandClothing from "./pages/SecondHandClothing/SecondHandClothing";
import BiddingProduct from "./pages/Bidding/BiddingProduct";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkIcBB1qLOgkNNZkuSdV1-ZyoSL-ajGGk",
  authDomain: "stylish-pro.firebaseapp.com",
  projectId: "stylish-pro",
  storageBucket: "stylish-pro.appspot.com",
  messagingSenderId: "39530697970",
  appId: "1:39530697970:web:2e8729b4550d323686ec6b",
  measurementId: "G-YJ5C91D5C2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="secondhandclothing" element={<SecondHandClothing />} />
        <Route path="bidding/:id" element={<BiddingProduct />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="thankyou" element={<ThankYou />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
