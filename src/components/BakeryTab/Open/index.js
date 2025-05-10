import React, { useEffect, useState, useMemo } from "react";
import { Card, Col, Row, Table, Statistic, Spin, message } from "antd";
import { fetchOpenSessionWithOrders } from "@services/bakery";

/* ── aggregate helper (unchanged except no image) ───────────── */
function aggregate(session) {
  const totals = { orders: 0, revenue: 0, items: {} };
  if (!session) return totals;

  totals.orders = session.orders.length;

  session.orders.forEach(order => {
    totals.revenue += parseFloat(order.grand_total || 0);
    order.items.forEach(oi => {
      const key = oi.item.id;
      if (!totals.items[key]) {
        totals.items[key] = {
          id: oi.item.id,
          name: oi.item.name,
          qty: 0,
          amount: 0,
        };
      }
      totals.items[key].qty += oi.qty;
      totals.items[key].amount += parseFloat(oi.total_price);
    });
  });
  return totals;
}

/* ── component ──────────────────────────────────────────────── */
export default function OpenSessionTab() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const session = await fetchOpenSessionWithOrders();
        console.log(session);
        if (session.status === "OPEN") setSession(session);
      } catch {
        message.error("Failed to load current session");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const agg = useMemo(() => aggregate(session), [session]);

  if (loading) return <Spin style={{ display: "block", marginTop: 40 }} />;
  if (!session) return <p>No open session.</p>;

  return (
    <>
      {/* KPI cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col>
          <Statistic title="Orders" value={agg.orders} />
        </Col>
        <Col>
          <Statistic
            title="Total Revenue"
            value={`$${agg.revenue.toFixed(2)}`}
          />
        </Col>
      </Row>

      {/* Item-level summary */}
      <h3>Item Sales Summary</h3>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {Object.values(agg.items).map(it => (
          <Col xs={12} md={8} lg={6} key={it.id}>
            <Card bordered>
              <Card.Meta
                title={it.name}
                description={
                  <>
                    <div>Sold: {it.qty}</div>
                    <div>$ {it.amount.toFixed(2)}</div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Order table */}
      <h3>Order Details</h3>
      <Table
        rowKey="id"
        dataSource={session.orders}
        expandable={{
          expandedRowRender: order => (
            <Table
              rowKey={r => r.item.id}
              dataSource={order.items}
              pagination={false}
              size="small"
              columns={[
                { title: "Item", dataIndex: ["item", "name"] },
                { title: "Qty", dataIndex: "qty" },
                { title: "Unit $", dataIndex: "unit_price" },
                { title: "Total $", dataIndex: "total_price" },
              ]}
            />
          ),
        }}
        columns={[
          { title: "Order #", dataIndex: "id", width: 80 },
          { title: "Wechat", dataIndex: "wechat_id" },
          { title: "Address", dataIndex: "address", ellipsis: true },
          { title: "Subtotal", dataIndex: "subtotal" },
          { title: "Total", dataIndex: "grand_total" },
          { title: "Status", dataIndex: "status" },
          { title: "Created", dataIndex: "created_at" },
        ]}
      />
    </>
  );
}
