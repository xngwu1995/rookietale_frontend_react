import React, { useEffect, useState } from "react";
import { useGoTo } from "@utils/hooks";
import {
  Modal,
  Button,
  message,
  Form as AntForm,
  Input,
  Table,
  Tag,
  Space,
  Select as AntSelect,
} from "antd";
import { useAppContext } from "@utils/context";
import "./index.css";
import Layout from "@components/Layout";
import Select from "react-select";
import {
  createTradeRecord,
  getAllStocks,
  getAllTradeRecord,
  updateTradeRecord,
} from "@services/stock";
import { createTweet } from "@services/tweet";

const mockStrategyList = [
  { value: "VCP", label: "VCP(交易策略推荐)" },
  { value: "WXG", label: "WXG(第六感)" },
].map(strategy => ({
  value: strategy.value,
  label: strategy.label,
}));

const mockReasonList = [
  { value: "None", label: "None(我乐意)" },
  { value: "Indicators", label: "Indicators(指标分析)" },
  { value: "CHATGPT", label: "CHATGPT(AI分析)" },
  { value: "GEMINI", label: "GEMINI" },
  { value: "RSU", label: "RSU" },
].map(strategy => ({
  value: strategy.value,
  label: strategy.label,
}));

function Form({ onAddRecord, stocks }) {
  const [form] = AntForm.useForm();
  const [formData, setFormData] = useState({
    stock_id: null,
    cost: "",
    quantity: "",
    strategy: [],
    reason: [],
    created_date: "",
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    const strategies = formData.strategy
      .map(option => option.value)
      .join(" + ");
    const reasons = formData.reason.map(option => option.value).join(" + ");
    onAddRecord({
      ...formData,
      stock_id: formData.stock_id.value,
      strategy: strategies,
      reason: reasons,
      active: true,
    });

    // Reset the form fields
    form.resetFields();

    // Clear local formData state as well
    setFormData({
      stock_id: null,
      cost: "",
      quantity: "",
      strategy: [],
      reason: [],
      created_date: "",
    });
  };

  return (
    <AntForm layout="vertical" onFinish={handleSubmit}>
      <AntForm.Item
        label="Ticker(股票代码)"
        name="stock_id"
        rules={[{ required: true, message: "Please select a stock!" }]}
      >
        <Select
          id="stock_id"
          name="stock_id"
          value={formData.stock_id}
          onChange={handleSelectChange}
          options={stocks.map(stock => ({
            value: stock.id,
            label: stock.ticker,
          }))}
          placeholder="Select or type a stock"
          isClearable
          isSearchable
          className="react-select-container"
          classNamePrefix="react-select"
          required
        />
      </AntForm.Item>
      <AntForm.Item
        label="Cost(成本)"
        name="cost"
        rules={[{ required: true, message: "Please enter the cost!" }]}
      >
        <Input
          id="cost"
          name="cost"
          type="number"
          value={formData.cost}
          onChange={handleChange}
          required
        />
      </AntForm.Item>
      <AntForm.Item
        label="Quantity(数量)"
        name="quantity"
        rules={[{ required: true, message: "Please enter the quantity!" }]}
      >
        <Input
          id="quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </AntForm.Item>
      <AntForm.Item
        label="Strategy(策略)"
        name="strategy"
        rules={[{ required: true, message: "Please enter the strategy!" }]}
      >
        <Select
          id="strategy"
          name="strategy"
          value={formData.strategy}
          onChange={handleSelectChange}
          options={mockStrategyList}
          placeholder="Select strategies"
          isMulti
          isClearable
          required
        />
      </AntForm.Item>
      <AntForm.Item
        label="Reason(原因)"
        name="reason"
        rules={[{ required: true, message: "Please enter the reason!" }]}
      >
        <Select
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleSelectChange}
          options={mockReasonList}
          placeholder="Select reasons"
          isMulti
          isClearable
          required
        />
      </AntForm.Item>
      <AntForm.Item
        label="Date(买入日期)"
        name="created_date"
        rules={[{ required: true, message: "Please enter the created_date!" }]}
      >
        <Input
          type="date"
          name="created_date"
          value={formData.created_date}
          onChange={handleChange}
          className="dateinput"
          required
        />
      </AntForm.Item>
      <AntForm.Item>
        <Button type="primary" htmlType="submit">
          Add Record
        </Button>
      </AntForm.Item>
    </AntForm>
  );
}

const SellForm = ({ form, sellData, setSellData, onSubmit }) => {
  const handleSellChange = e => {
    setSellData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AntForm form={form} layout="vertical" onFinish={onSubmit}>
      <AntForm.Item
        label="Sell Reason(卖出原因)"
        name="sellReason"
        rules={[{ required: true, message: "Please enter the sell reason!" }]}
      >
        <Input
          name="sellReason"
          value={sellData.sellReason}
          onChange={handleSellChange}
          placeholder="Enter sell reason"
        />
      </AntForm.Item>
      <AntForm.Item
        label="Sell Price(卖出价格)"
        name="sellPrice"
        rules={[{ required: true, message: "Please enter the sell price!" }]}
      >
        <Input
          name="sellPrice"
          type="number"
          value={sellData.sellPrice}
          onChange={handleSellChange}
          placeholder="Enter sell price"
        />
      </AntForm.Item>
      <AntForm.Item
        label="Sell Date(卖出日期)"
        name="sellDate"
        rules={[{ required: true, message: "Please select a sell date!" }]}
      >
        <Input
          name="sellDate"
          type="date"
          value={sellData.sellDate}
          onChange={handleSellChange}
        />
      </AntForm.Item>
    </AntForm>
  );
};

function Records({ records, updateRecord }) {
  const [filter, setFilter] = useState("active");
  const [isSellModalVisible, setIsSellModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = AntForm.useForm();
  const [sellData, setSellData] = useState({
    sellReason: "",
    sellPrice: "",
    sellDate: "",
  });

  const handleStatusChange = record => {
    setSelectedRecord(record);
    setIsSellModalVisible(true);
  };

  const handleSellModalCancel = () => {
    clearFormData();
    setIsSellModalVisible(false);
    setSelectedRecord(null);
  };

  const clearFormData = () => {
    form.resetFields();
    setSellData({
      sellReason: "",
      sellPrice: "",
      sellDate: "",
    });
  };

  const handleSellSubmit = () => {
    if (selectedRecord) {
      const updatedRecord = {
        ...selectedRecord,
        active: false,
        sellReason: sellData.sellReason,
        sellPrice: parseFloat(sellData.sellPrice),
        sellDate: sellData.sellDate,
      };
      updateRecord(updatedRecord);
      clearFormData();
      setIsSellModalVisible(false);
      setSelectedRecord(null);
    }
  };

  const handleShareRecord = async record => {
    const formData = new FormData();
    const action = record.active ? "bought" : "sold";
    const price = record.active ? `${record.cost}` : `${record.sellPrice}`;
    const content = `I ${action} ${Number(record.quantity).toFixed(
      2
    )} shares of ${record.stock.ticker} at price $${Number(price).toFixed(2)}`;
    formData.append("content", content);
    const res = await createTweet(formData);
    if (res) {
      message.success("Successfully posted!");
    }
  };

  const filteredRecords = records.filter(record =>
    filter === "active" ? record.active : !record.active
  );

  const columns = [
    {
      title: "Ticker",
      dataIndex: ["stock", "ticker"],
      key: "ticker",
      render: text => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: text => (typeof text === "number" ? `$${text.toFixed(2)}` : text),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Strategy",
      dataIndex: "strategy",
      key: "strategy",
      render: text => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: text => <Tag color="purple">{text}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: active => (
        <Tag color={active ? "cyan" : "red"}>{active ? "Active" : "Sold"}</Tag>
      ),
    },
    {
      title: filter === "active" ? "Closed Price(建议卖出价)" : "Revenue(获利)",
      dataIndex: filter === "active" ? "closed" : "revenue",
      key: filter === "active" ? "closed" : "revenue",
      render: value =>
        value && typeof value === "number" ? `$${value.toFixed(2)}` : value,
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleStatusChange(record)}>
            {record.active ? "Mark as Sold(卖出)" : "Reactive"}
          </Button>
          <Button type="link" onClick={() => handleShareRecord(record)}>
            Share(分享)
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="records-container">
      <h2>Trading Records</h2>
      <div className="filter-container" style={{ marginBottom: "20px" }}>
        <label htmlFor="filter" style={{ marginRight: "10px" }}>
          Filter by Status:
        </label>
        <AntSelect
          id="filter"
          value={filter}
          onChange={value => setFilter(value)}
          style={{ width: 120 }}
        >
          <AntSelect.Option value="active">Active</AntSelect.Option>
          <AntSelect.Option value="sold">Sold</AntSelect.Option>
        </AntSelect>
      </div>
      <Table
        columns={columns}
        dataSource={filteredRecords}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Mark as Sold"
        open={isSellModalVisible}
        onCancel={handleSellModalCancel}
        onOk={() => form.submit()} // Trigger form submit using the form instance
      >
        <SellForm
          form={form}
          sellData={sellData}
          setSellData={setSellData}
          onSubmit={handleSellSubmit}
        />
      </Modal>
    </div>
  );
}

function TradingPage() {
  const [store, setStore] = useAppContext();
  const go = useGoTo();
  const [records, setRecords] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddRecord = async newRecord => {
    const data = await createTradeRecord(newRecord);
    setRecords([...records, data.trade_record]);
    setIsModalVisible(false);
  };

  const updateRecord = async updatedRecord => {
    const data = await updateTradeRecord(updatedRecord.id, updatedRecord);
    updatedRecord = data.trade_record;
    setRecords(
      records.map(record =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
  };

  const fetchTradeRecord = async () => {
    const resp = await getAllTradeRecord(store.user.id);
    const data = await resp.trade_records;
    setRecords(data);
  };

  const fetchAllStocks = async () => {
    const resp = await getAllStocks();
    const data = await resp.stocks;
    setStocks(data);
  };

  useEffect(() => {
    if (!store.user) go("login");
  }, [store.user, go]);

  useEffect(() => {
    setStore({ closeHeaderHandler: () => go("/") });
  }, [go]);

  useEffect(function () {
    fetchAllStocks();
  }, []);

  useEffect(function () {
    fetchTradeRecord();
  }, []);

  return (
    <Layout>
      <div className="trading-page">
        <Button type="primary" onClick={showModal}>
          Add New Record
        </Button>
        <Modal
          title="Add New Stock Record"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onAddRecord={handleAddRecord} stocks={stocks} />
        </Modal>
        <Records records={records} updateRecord={updateRecord} />
      </div>
    </Layout>
  );
}

export default TradingPage;
