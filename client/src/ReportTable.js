import React from "react";
import { Table, Tag, Popover } from "antd";

const ReportTable = (props) => {
  let data = null;

  if (props.report && props.report.run) {
    console.log(props.report.run.executions);
    data = props.report.run.executions;
  }

  function normalizeUrl(obj) {
    const host = obj.host.join(".");
    const path = obj.path.join("/");
    return `${obj.protocol}://${host}/${path}`;
  }

  if (data) {
    data = data.map((execution, index) => {
      return {
        index: index + 1,
        name: execution.item.name,
        key: execution.item.id,
        requestMethod: execution.item.request.method,
        requestUrl: normalizeUrl(execution.item.request.url),
        assertions: execution.assertions,
      };
    });
    console.log("data", data);
  }

  const columns = [
    {
      title: "№",
      dataIndex: "index",
    },
    {
      title: "Название запроса",
      dataIndex: "name",
    },
    {
      title: "Тип запроса",
      dataIndex: "requestMethod",
    },
    {
      title: "Адрес запроса",
      dataIndex: "requestUrl",
    },
    {
      title: "Список тестов",
      dataIndex: "assertions",
      render: (tests) => (
        <div>
          {tests.map((test, index) => {
            return (
              <div key={index}>
                <Popover
                  placement="right"
                  content={
                    test.error && (
                      <div>
                        <h1>{test.error.name}</h1>
                        <p>{test.error.message}</p>
                      </div>
                    )
                  }
                  title={
                    test.error
                      ? "Произошла ошибка при прохождении теста"
                      : "Тест пройден успешно"
                  }
                  trigger="click"
                >
                  <Tag color={test.error ? "#f50" : "#87d068"} key={index}>
                    {test.assertion}
                  </Tag>
                </Popover>

                <br />
              </div>
            );
          })}
        </div>
      ),
    },
  ];
  if (!data) {
    return null;
  }
  return <Table columns={columns} dataSource={data} />;
};

export default ReportTable;
