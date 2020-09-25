import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const CustomHeader = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["main"]}>
        <Menu.Item key="main">Главная</Menu.Item>
      </Menu>
    </Header>
  );
};

export default CustomHeader;
