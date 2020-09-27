import React from "react";
import { Layout } from "antd";
import CustomHeader from "./Header";
import CustomContent from "./Content";

const App = () => {
  return (
    <Layout>
      <CustomHeader />
      <CustomContent />
    </Layout>
  );
};

export default App;
