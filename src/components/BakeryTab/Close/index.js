import React, { useEffect, useState } from "react";
import { Table, Drawer, List, Spin, message, Statistic, Row, Col } from "antd";
import { fetchClosedSessionStats } from "@services/bakery";

export default function ClosedSessionsTab() {
  const [sessions, setSessions] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchClosedSessionStats();
        setSessions(data);
      } catch (err) {
        message.error("Failed to load past sessions");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Spin style={{ display: "block", marginTop: 40 }} />;

  return (
    <>
      <Table
        rowKey="id"
        dataSource={sessions}
        onRow={rec => ({ onClick: () => setActive(rec) })}
        pagination={{ pageSize: 8 }}
        columns={[
          { title: "Title", dataIndex: "title" },
          { title: "Opened", dataIndex: "opens_at" },
          { title: "Closed", dataIndex: "closes_at" },
          { title: "Orders", dataIndex: "order_count", align: "right" },
          { title: "Revenue ¥", dataIndex: "total_revenue", align: "right" },
        ]}
      />

      <Drawer
        width={460}
        title={active?.title}
        open={Boolean(active)}
        onClose={() => setActive(null)}
      >
        {active && (
          <>
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col>
                <Statistic title="Orders" value={active.order_count} />
              </Col>
              <Col>
                <Statistic title="Revenue ¥" value={active.total_revenue} />
              </Col>
            </Row>

            <List
              header={<strong>Top-Selling Items</strong>}
              dataSource={active.top_items || []}
              renderItem={it => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      it.image && (
                        <img
                          src={it.image}
                          alt={it.name}
                          style={{ width: 48, height: 48, objectFit: "cover" }}
                        />
                      )
                    }
                    title={`${it.name} × ${it.qty}`}
                    description={`¥${it.amount}`}
                  />
                </List.Item>
              )}
            />
          </>
        )}
      </Drawer>
    </>
  );
}
