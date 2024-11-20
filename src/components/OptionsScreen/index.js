import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Input, Tag } from "antd";
import { getAllOptions } from "@services/stock";
import moment from "moment";

const { Search } = Input;

const StockScreeningComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]); // Store the original complete data
  const [filteredData, setFilteredData] = useState([]); // Store the filtered data

  async function getScreenedOptions() {
    const resp = await getAllOptions();
    const options = await resp.options;
    if (options) {
      options.sort((a, b) => {
        if (b.total_score === a.total_score) {
          return a.weight - b.weight;
        }
        return b.total_score - a.total_score;
      });
    }
    setData(options); // Set the original data
    setFilteredData(options); // Set the initial filtered data
  }

  useEffect(() => {
    getScreenedOptions();
  }, []);

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setFilteredData(data); // Reset to the original data when search text is empty
    } else {
      const filtered = data.filter(stock =>
        stock.ticker.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered); // Update filtered data based on search
    }
  };

  const columns = [
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      render: (text, record) => (
        <Button type="link" onClick={() => showDetails(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Total Score",
      dataIndex: "total_score",
      key: "total_score",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: text => moment(text).format("YYYY-MM-DD"),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: "Decision",
      dataIndex: "decision",
      key: "decision",
      render: decision => {
        let color = "";
        if (decision === "Call") color = "#52c41a"; // Green
        else if (decision === "Put") color = "#f5222d"; // Red
        else if (decision === "Hold") color = "#722ed1"; // Purple

        return (
          <Tag color={color} style={{ fontWeight: "bold" }}>
            {decision}
          </Tag>
        );
      },
    },
    {
      title: "Weight(%)",
      dataIndex: "weight",
      key: "weight",
      render: weight => (
        <div
          style={{
            display: "inline-block",
            padding: "4px 8px",
            borderRadius: "8px",
            backgroundColor: weight < 2 ? "#e6f7ff" : "#fff1f0",
            color: weight < 2 ? "#1890ff" : "#f5222d",
            fontWeight: "bold",
          }}
        >
          {weight.toFixed(2)}
        </div>
      ),
    },
  ];

  const showDetails = record => {
    setSelectedStock(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedStock(null);
  };

  return (
    <div>
      <Search
        placeholder="Search by ticker or strategy"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onSearch={handleSearch}
        style={{ width: 300 }}
      />
      <Table columns={columns} dataSource={filteredData} rowKey="ticker" />
      <Modal
        title={`Details for ${selectedStock?.ticker}`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {selectedStock && (
          <div>
            {Object.entries(selectedStock.criteria).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {JSON.stringify(value.value, null, 2)}
              </p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StockScreeningComponent;
