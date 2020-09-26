import React from "react";
import { Layout } from "antd"; // импорт для верстки
import CustomHeader from "./Header"; // импорт своих созданных компонентов
import CustomContent from "./Content";

// JSX разметка клиентского react.js приложения
const App = () => {
  return (
    <Layout>
      {/* Подключаем компонент Header - шапку    */}
      <CustomHeader />
      {/* Подключаем компонент Content - основной функционал приложения    */}
      <CustomContent />
    </Layout>
  );
};

export default App;
