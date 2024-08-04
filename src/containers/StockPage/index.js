import React, { useEffect, useState } from "react";
import { useGoTo } from "@utils/hooks";
import { useAppContext } from "@utils/context";
import { getStrategyStocks } from "@services/stock";
import Layout from "@components/Layout";
import "./index.css";

const StrategyList = ({ strategies }) => {
  const [filters, setFilters] = useState({
    date: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  // function updateStrategies(filters) {
  //   let filtered = [...strategies];

  //   if (filters.date) {
  //     filtered = filtered.filter(strategy => {
  //       const strategyDate = new Date(strategy.created_at)
  //         .toISOString()
  //         .split("T")[0];
  //       return strategyDate === filters.date;
  //     });
  //   }

  // const handleSearch = searchTerm => {
  //   setItem(items =>
  //     items.filter(
  //       strategy =>
  //         strategy.stock.ticker
  //           .toLowerCase()
  //           .includes(searchTerm.toLowerCase()) ||
  //         strategy.strategy.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
  // };

  const handleSubmit = e => {
    e.preventDefault();
    const searchTerm = e.target.value();
    if (!searchTerm) return;
    handleSearch(searchTerm);
  };

  const handleDateChange = event => {
    setFilters({ ...filters, date: event.target.value });
  };

  const clearFilters = () => {
    setFilters({ date: "" });
    setSearchTerm("");
  };

  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Stock Strategy Search</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="SEARCH BY"
        />
        <button type="submit">Search</button>
        <button type="button" onClick={clearFilters}>
          Clear Search
        </button>
      </form>
      <div className="filters-container">
        <div className="column-filters">
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleDateChange}
            placeholder="Filter by Date"
          />
        </div>
        <div className="clear-filters-container">
          <button
            onClick={() =>
              setFilters({
                date: "",
              })
            }
          >
            Clear Filters
          </button>
        </div>
      </div>
      <table className="strategy-table">
        <thead>
          <tr>
            <th>Ticker(股票代码)</th>
            <th>Company</th>
            <th>Sector</th>
            <th>Strategy</th>
            <th>Country(国家)</th>
            <th>Date(推荐日期)</th>
          </tr>
        </thead>
        <tbody>
          {strategies.map(strategy => (
            <tr key={strategy.id}>
              <td>{strategy.stock.ticker}</td>
              <td>{strategy.stock.company}</td>
              <td>{strategy.stock.sector}</td>
              <td>{strategy.strategy}</td>
              <td>{strategy.stock.country}</td>
              <td>{new Date(strategy.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
        <StrategyList strategies={strategies} />
      </div>
    </Layout>
  );
}

export default StockPage;
