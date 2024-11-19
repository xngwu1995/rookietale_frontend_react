import React, { useEffect, useState } from "react";
import { useGoTo } from "@utils/hooks";
import { useAppContext } from "@utils/context";
import { getOptionStocks } from "@services/stock";
import Layout from "@components/Layout";
import { Table, Typography } from "antd";

const { Title } = Typography;

function VCPOptionPage() {
  const [store, setStore] = useAppContext();
  const go = useGoTo();
  const [stocks, setStocks] = useState([]);

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
      <Title level={2}>Today's Available Stock Options</Title>
      <Table columns={columns} dataSource={stockData} pagination={false} />
    </Layout>
  );
}

export default VCPOptionPage;
