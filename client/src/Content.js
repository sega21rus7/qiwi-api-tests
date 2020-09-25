import React from "react";
import { Layout, Row, Col } from "antd";
import TokenForm from './TokenForm';

const { Content } = Layout;

const CustomContent = () => {
  return (
    <Content>
      <Row>
        <Col span={12}>
          <TokenForm/>
        </Col>
      </Row>
    </Content>
  );
};

export default CustomContent;
