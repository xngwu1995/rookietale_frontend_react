import React, { useEffect, useState } from "react";
import { Table, Input, DatePicker, Button, Space } from "antd";
import moment from "moment";
import { useGoTo } from "@utils/hooks";
import { useAppContext } from "@utils/context";
import { getStrategyStocks } from "@services/stock";
import Layout from "@components/Layout";
import "./index.css";
import DescriptionPopup from "@components/PopUpWindow";
import StockScreeningComponent from "@components/OptionsScreen";

const title = "VCP";
const description = "什么是VCP(What's VCP?)";
const text = `
什么是VCP

Minervini被认为是美国最成功的股票交易员之一，曾两次获得美国投资冠军。为了更多地了解他的策略，我阅读了他的书：《像股市巫师一样交易》和《像冠军一样思考和交易》。Minervini使用许多标准来筛选领先股票，包括基本面和技术面，但大多数交易平台不支持设置如此多的指标标准。因此，我想开发一个筛选器。

筛选器详情：

使用Mario Stoev的FinViz API，根据以下标准筛选股票：
市值超过3亿美元，以避免交易微型或纳米级股票。
平均成交量超过10万。
当前价格超过2美元，以避免交易微型或纳米级股票。
当前价格高于50日均线（趋势模板的标准5）。
50日均线高于200日均线（趋势模板的标准4）。
Minervini引入了一种趋势模板，如果股票符合以下八个标准，则认为它处于第二阶段的上升趋势：
当前股票价格高于150日均线和200日均线。
150日均线高于200日均线。
200日均线至少在一个月内呈上升趋势。
50日均线（10周均线）高于150日均线和200日均线。
当前价格高于50日均线。
当前价格至少高出52周低点30%。
当前价格在52周高点的25%以内。
根据Investor's Business Daily报道的相对强度评级（RS rating）不低于70。

What is VCP?

Description:

Minervini is considered one of America's most successful stock traders and a two-time U.S. Investing Champion. To learn more about his strategy, I read his books: Trade Like a Stock Market Wizard and Think and Trade Like a Champion. Minervini uses many criteria to screen leading stocks, both fundamental and technical, but most trading platforms do not support setting so many indicator criteria. Therefore, I want to develop a screener.

Screener Details:

	1. The FinViz API by Mario Stoev will be used to screen stocks based on the following criteria:
	- Market cap is over $300 million to avoid trading micro or nano size stocks.
	- Average volume is over 100K.
	- Current price is over $2 to avoid trading micro or nano size stocks.
	- Current price is over 50MA (criteria 5 of trend template).
	- MA50 is above MA200 (criteria 4 of trend template).

	2. Minervini introduced a trend template, which identifies a stock in a Stage 2 uptrend if it meets the following eight criteria:
	- The current stock price is above both the 150-day and the 200-day moving average.
	- The 150-day moving average is above the 200-day moving average.
	- The 200-day moving average is trending up for at least one month.
	- The 50-day (10-week) moving average is above both the 150-day and 200-day moving averages.
	- The current price is above the 50-day moving average.
	- The current price is at least 30% above its 52-week low.
	- The current price is within at least 25% of its 52-week high.
	- The Relative Strength rating, as reported in Investor's Business Daily, is no less than 70.

	Since IBD prohibits data scraping, I cannot obtain stocks' RS rating. The RS rating tracks a stock's share price performance over the last 52 weeks, then compares the result to that of all other stocks. Therefore, I'll use the FinViz API again and sort the stocks by performance over a year.

	3. Volatility Contraction Pattern (VCP):
	- Price contraction: price consolidation occurs after a stock has moved up in price, allowing the stock to digest the bullish price movement. Price volatility will contract through the base from left to right, and price will correct through a series of smaller contractions. Ideally, this pattern should have 2 to 4 contractions.
	- Volume contraction: the volume usually decreases as the chart moves to the right.
`;

const { Search } = Input;

const StrategyList = ({ strategies }) => {
  const [filters, setFilters] = useState({ date: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleDateChange = (date, dateString) => {
    setFilters({ ...filters, date: dateString });
  };

  const clearFilters = () => {
    setFilters({ date: "" });
    setSearchTerm("");
  };

  const filteredStrategies = strategies.filter(strategy => {
    const strategyDate = moment(strategy.created_at).format("YYYY-MM-DD");
    const matchesDate = filters.date ? strategyDate === filters.date : true;
    const matchesSearchTerm =
      searchTerm === "" ||
      strategy.stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      strategy.strategy.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDate && matchesSearchTerm;
  });

  const columns = [
    {
      title: "Ticker",
      dataIndex: ["stock", "ticker"],
      key: "ticker",
    },
    {
      title: "Company",
      dataIndex: ["stock", "company"],
      key: "company",
    },
    {
      title: "Sector",
      dataIndex: ["stock", "sector"],
      key: "sector",
    },
    {
      title: "Strategy",
      dataIndex: "strategy",
      key: "strategy",
    },
    {
      title: "Country",
      dataIndex: ["stock", "country"],
      key: "country",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: text => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "AI_Analysis",
      dataIndex: "ai_analysis",
      key: "ai_analysis",
      render: (text, record) => (
        <DescriptionPopup
          description={"AI Analysis Details"}
          title={`AI Analysis for ${record.stock.ticker}`}
          text={text}
        />
      ),
    },
  ];

  return (
    <div>
      <Space direction="vertical" style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by ticker or strategy"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onSearch={setSearchTerm}
          style={{ width: 300 }}
        />
        <DatePicker onChange={handleDateChange} />
        <Button onClick={clearFilters}>Clear Filters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredStrategies}
        rowKey={record => record.id}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

function StockPage() {
  const [store, setStore] = useAppContext();
  const go = useGoTo();
  const [strategies, setStrategies] = useState([]);
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
    async function fetchStrategy() {
      const resp = await getStrategyStocks();
      const data = await resp.stocks;
      setStrategies(data);
    }
    fetchStrategy();
  }, []);

  return (
    <Layout>
      <div className="app">
        <Space>
          <DescriptionPopup
            description={description}
            title={title}
            text={text}
          />
        </Space>
        <StrategyList strategies={strategies} />
        <StockScreeningComponent />
      </div>
    </Layout>
  );
}

export default StockPage;
