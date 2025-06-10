import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CxtProvider } from "@utils/context";
import Login from "@containers/Login";
import Register from "@containers/Register";
import App from "@containers/App";
import Tweets from "@containers/Tweets";
import Comment from "@containers/Comment";
import CreateTweet from "@containers/CreateTweet";
import Tweet from "@containers/Tweet";
import My from "@components/My";
import EditUser from "@containers/EditUser";
import FollowPage from "@containers/FollowPage";
import Chatgpt from "@containers/Chatgpt";
import TradingPage from "@containers/LakeMichiganTrading";
import StockPage from "@containers/StockPage";
import VCPOptionPage from "@containers/TradingDecision";
import BakeryAdminPage from "@containers/Orders";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <CxtProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Tweets />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createTweet" element={<CreateTweet />} />
          <Route path="/comments/:id" element={<Comment />} />
          <Route path="/search" element={<Tweets />} />
          <Route path="/message" element={<Tweets />} />
          <Route path="/tips" element={<Tweets />} />
          <Route path="/profile" element={<My />} />
          <Route path="/health" element={<Comment />} />
          <Route path="/tweet/:id" element={<Tweet />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/friendship" element={<FollowPage />} />
          <Route path="/chatgpt" element={<Chatgpt />} />
          <Route path="/trading" element={<TradingPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/decision" element={<VCPOptionPage />} />
          <Route path="/orders" element={<BakeryAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </CxtProvider>
);
