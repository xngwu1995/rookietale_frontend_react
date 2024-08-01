import React from "react";
import { Tabs } from "antd";
import GPTNormalPage from "@components/GPTPages/Normal";
import GPTLongEssayPage from "@components/GPTPages/LongEssay";
import StockGPTPage from "@components/GPTPages/StocksGPT";
import style from "./index.module.scss";

const GPTPage = () => {
  const tabItems = [
    {
      key: "finance",
      label: "Stocks",
      children: <StockGPTPage />,
    },
    {
      key: "normal",
      label: "Normal ChatGPT",
      children: <GPTNormalPage />,
    },
    {
      key: "long",
      label: "Long Essay",
      children: <GPTLongEssayPage />,
    },
  ];

  return (
    <div className={style.GPTPage}>
      <Tabs
        defaultActiveKey="finance"
        items={tabItems}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default GPTPage;
