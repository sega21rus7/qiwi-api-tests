import React from "react";
import { Layout, Menu } from "antd"; // импорт для верстки

const { Header } = Layout;

const CustomHeader = () => {
  return (
    <Header>
      {/* Стандартное верхнее меню простая шапка сайта */}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["main"]}>
        <Menu.Item key="main">Главная</Menu.Item>
      </Menu>
    </Header>
  );
};

export default CustomHeader;
