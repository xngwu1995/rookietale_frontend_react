import React from "react";
import { Tabs } from "antd";
import OpenSessionTab from "@components/BakeryTab/Open";
import ClosedSessionsTab from "@components/BakeryTab/Close";
import styles from "./BakeryAdminPage.module.scss";

const tabItems = [
  { key: "open", label: "🔴 Current Session", children: <OpenSessionTab /> },
  { key: "closed", label: "📁 Past Sessions", children: <ClosedSessionsTab /> },
];

export default function BakeryAdminPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Bakery Admin Dashboard</h2>
      <Tabs defaultActiveKey="open" items={tabItems} size="large" />
    </div>
  );
}
