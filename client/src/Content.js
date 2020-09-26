import React from "react";
import { Layout, Row, Col } from "antd";
import TokenForm from "./TokenForm";
import ReportTable from "./ReportTable";

const { Content } = Layout;

const CustomContent = () => {
  const [report, setReport] = React.useState({});

  return (
    <Content>
      <Row>
        <Col span={12}>
          <TokenForm setReport={setReport} />
        </Col>
        <ReportTable report={report} />
      </Row>
    </Content>
  );
};

export default CustomContent;
