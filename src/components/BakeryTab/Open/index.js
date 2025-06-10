/* ------------------------------------------------------------------
 *  OpenSessionTab.jsx  –  enhanced with Material React Table
 * -----------------------------------------------------------------*/
import React, { useEffect, useState, useMemo, useRef } from "react";
import { Card, Col, Row, Statistic, Spin, message, Button } from "antd";
import { fetchOpenSessionWithOrders } from "@services/bakery";

import { MaterialReactTable } from "material-react-table";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useReactToPrint } from "react-to-print";

/* ---------- helpers ------------------------------------------------ */
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
          category: oi.item.category,
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

/* ---------- main component ---------------------------------------- */
export default function OpenSessionTab() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  /* fetch session once on mount */
  useEffect(() => {
    (async () => {
      try {
        const sess = await fetchOpenSessionWithOrders();
        if (sess.status === "OPEN") setSession(sess);
      } catch {
        message.error("Failed to load current session");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* KPI aggregate */
  const agg = useMemo(() => aggregate(session), [session]);

  /* --------------- CSV / Print handlers --------------------------- */
  const printRef = useRef(null);

  const handleExportCsv = () => {
    if (!session) return;

    const csvConfig = mkConfig({
      fieldSeparator: ",",
      filename: `orders_${new Date().toISOString()}`,
      decimalSeparator: ".",
      useKeysAsHeaders: true,
    });

    const rows = session.orders.map(o => ({
      id: o.id,
      wechat: o.wechat_id,
      address: o.address,
      subtotal: o.subtotal,
      total: o.grand_total,
      status: o.status,
      created_at: o.created_at,
    }));

    const csv = generateCsv(csvConfig)(rows);
    download(csvConfig)(csv);
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `orders_${new Date().toISOString()}`,
    removeAfterPrint: true,
  });

  /* --------------- MRT column definitions ------------------------ */
  const orderColumns = useMemo(
    () => [
      { accessorKey: "id", header: "Order #", size: 80 },
      { accessorKey: "wechat_id", header: "Wechat" },
      { accessorKey: "address", header: "Address", size: 300 },
      {
        accessorKey: "subtotal",
        header: "Subtotal",
        Cell: ({ cell }) => `$${Number(cell.getValue()).toFixed(2)}`,
      },
      {
        accessorKey: "grand_total",
        header: "Total",
        Cell: ({ cell }) => `$${Number(cell.getValue()).toFixed(2)}`,
      },
      { accessorKey: "status", header: "Status" },
      {
        accessorKey: "created_at",
        header: "Created",
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
    ],
    []
  );
  const itemColumns = useMemo(
    () => [
      { accessorKey: "item.name", header: "Item" }, // 1️⃣  Item
      { accessorKey: "item.category", header: "Category" }, // 2️⃣  Category (right after Item)
      { accessorKey: "qty", header: "Qty", size: 60 },
      {
        accessorKey: "unit_price",
        header: "Unit $",
        Cell: ({ cell }) => `$${cell.getValue()}`,
        size: 80,
      },
      {
        accessorKey: "total_price",
        header: "Total $",
        Cell: ({ cell }) => `$${cell.getValue()}`,
        size: 80,
      },
    ],
    []
  );

  /* -------------------- render ----------------------------------- */
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
                title={[it.name, it.category].filter(Boolean).join(" / ")}
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

      {/* Orders – Material React Table */}
      <h3>Order Details</h3>
      <div ref={printRef}>
        <MaterialReactTable
          columns={orderColumns}
          data={session.orders}
          enablePagination
          enableColumnFilters
          enableGlobalFilter
          enableExpanding
          initialState={{
            pagination: { pageSize: 10 }, // ❌ no expanded:true to avoid bug
          }}
          muiTableProps={{
            sx: { fontSize: "16px" },
          }}
          muiTableHeadCellProps={{
            sx: { fontSize: "16px", fontWeight: "bold" },
          }}
          muiTableBodyCellProps={{
            sx: { fontSize: "16px" },
          }}
          renderTopToolbarCustomActions={() => (
            <>
              <Button onClick={handlePrint}>Print / PDF</Button>
            </>
          )}
          /* detail panel to show order items */
          renderDetailPanel={({ row }) => (
            <div>
              <MaterialReactTable
                columns={itemColumns}
                data={row.original.items}
                enableTopToolbar={false}
                enableBottomToolbar={false}
                enableColumnFilters={false}
                enableGlobalFilter={false}
                enablePagination={false}
                enableSorting={false}
                muiTableProps={{
                  sx: { fontSize: "16px" },
                }}
                muiTableHeadCellProps={{
                  sx: { fontSize: "16px", fontWeight: "bold" },
                }}
                muiTableBodyCellProps={{
                  sx: { fontSize: "16px" },
                }}
                muiTableBodyRowProps={{ sx: { "& > td": { borderBottom: 0 } } }}
              />
            </div>
          )}
        />
      </div>
    </>
  );
}
