import React, { useState, useEffect } from "react";
import { getMoney } from "@services/stock";
import { Alert } from "antd";

const MoneyText = () => {
  const [goodDay, setGoodDay] = useState("");
  const [buy, setBuy] = useState(false);

  useEffect(() => {
    const fetchMoney = async () => {
      try {
        const { text, buy } = await getMoney();
        setGoodDay(text);
        setBuy(buy);
      } catch (error) {
        console.error("Failed to fetch money data", error);
      }
    };

    fetchMoney();
  }, []);

  return <Alert message={goodDay} type={buy ? "info" : "warning"} />;
};

export default MoneyText;
