import React from "react";
import { Layout } from "antd";
import CustomHeader from "./Header";
import CustomContent from "./Content";

const App = () => {
  return (
    <Layout className="layout">
      <CustomHeader />
      <CustomContent />
    </Layout>
  );
};

export default App;
