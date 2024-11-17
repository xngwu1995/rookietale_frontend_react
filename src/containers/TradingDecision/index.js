import React, { useEffect, useState } from "react";
import { useGoTo } from "@utils/hooks";
import { useAppContext } from "@utils/context";
import { getMoney, getOptionStocks } from "@services/stock";
import Layout from "@components/Layout";
import MoneyText from "@components/MoneyText";
import { Space, Table, Typography } from "antd";

const { Title } = Typography;

function VCPOptionPage() {
  const [store, setStore] = useAppContext();
  const go = useGoTo();
  const [stocks, setStocks] = useState([]);
  const [goodDay, setGoodDay] = useState("");
  const [buy, setBuy] = useState("");

  useEffect(() => {
    if (!store.user) {
      go("login");
    }
  }, [store.user, go]);

  useEffect(function () {
    const updateStore = () => {
      setStore({ closeHeaderHandler: () => go("/") });
    };
    updateStore();
  }, []);

  useEffect(function () {
    async function fetchMoney() {
      const resp = await getMoney();
      const text = await resp.text;
      const buy = await resp.buy;
      setGoodDay(text);
      setBuy(buy);
    }
    fetchMoney();
  }, []);

  useEffect(function () {
    async function fetchOptionStocks() {
      const resp = await getOptionStocks();
      const data = await resp.available_options;
      setStocks(data);
    }
    fetchOptionStocks();
  }, []);

  const columns = [
    {
      title: "Stock Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Decision",
      dataIndex: "decision",
      key: "decision",
    },
    {
      title: "Weight(%)",
      dataIndex: "weight",
      key: "weight",
    },
  ];

  const stockData = stocks.map((stock, index) => {
    const [symbol, [decision, weight]] = Object.entries(stock)[0];
    return {
      key: index,
      symbol,
      decision,
      weight,
    };
  });

  return (
    <Layout>
      <div className="app">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {buy ? (
            <>
              <Title level={2}>Today's Available Stock Options</Title>
              <Table
                columns={columns}
                dataSource={stockData}
                pagination={false}
              />
            </>
          ) : (
            <MoneyText message={goodDay} />
          )}
        </Space>
      </div>
    </Layout>
  );
}

export default VCPOptionPage;
