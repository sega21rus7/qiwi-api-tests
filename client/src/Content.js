import React from "react";
import { Layout, Row, Col } from "antd"; // импорт для верстки
import TokenForm from "./TokenForm"; // импорт своих созданных компонентов
import ReportTable from "./ReportTable";

const { Content } = Layout;

const CustomContent = () => {
  // report - отчет о тестах, пока равен пустому js объекту {}
  // setReport - функция, которая будет изменять отчет
  const [report, setReport] = React.useState({});

  return (
    <Content>
      <Row>
        <Col span={12}>
          {/* Подключаем форму в которой будем вводить токен и передаем туда функцию, изменяющую отчет*/}
          <TokenForm setReport={setReport} />
        </Col>
        {/* Подключаем таблицу с будущим отчетом о тестах и передаем туда отчет */}
        <ReportTable report={report} />
      </Row>
    </Content>
  );
};

export default CustomContent;
