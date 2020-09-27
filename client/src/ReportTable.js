import React from "react";
import { Table, Tag, Popover } from "antd"; // импорт для верстки

const ReportTable = (props) => {
  let data = null; // будущие данные отчета

  if (props.report && props.report.run) {
    // если отчет есть
    // присваиваем список запущенных тестов нашей переменной data
    data = props.report.run.executions;
  }

  // функция для перевода url из объекта в строку
  function normalizeUrl(obj) {
    const host = obj.host.join(".");
    const path = obj.path.join("/");
    return `${obj.protocol}://${host}/${path}`;
  }

  if (data) {
    // если есть данные о тестах
    data = data.map((execution, index) => {
      // проходимся по ним циклом
      return {
        // и возвращаем новый объект с новыми полями
        index: index + 1, // для номера в таблице
        name: execution.item.name, // имя запроса в таблице
        key: execution.item.id, // ключ, чтобы React.js не выдавал предупреждений в консоли
        requestMethod: execution.item.request.method, // метод запроса
        requestUrl: normalizeUrl(execution.item.request.url), // url запроса
        assertions: execution.assertions, // сами результаты тестов
      };
    });
    console.log("data", data);
  }

  const columns = [
    // заголовки таблицы
    {
      title: "№", // номер
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
      render: (
        tests // отрисовываем список тестов
      ) => (
        <div>
          {tests.map((test, index) => {
            // проходимся циклом по всем тестам
            return (
              // и выводим их по одному в div
              <div key={index}>
                <Popover // Элемент подсказки при клике на тест
                  placement="right" // выводим его справа от теста
                  content={
                    // текст подсказки
                    test.error && ( // если есть ошибка, то // выводим инфо о ней в div
                      <div>
                        <h1>{test.error.name}</h1>
                        <p>{test.error.message}</p>
                      </div>
                    )
                  }
                  title={
                    // заголовок подсказки
                    test.error // если есть ошибка или иначе
                      ? "Произошла ошибка при прохождении теста"
                      : "Тест пройден успешно"
                  }
                  trigger="click" // показываем подсказку при клике
                >
                  <Tag
                    color={test.error ? "#f50" : "#87d068"} // название ошибки
                    key={index} // с цветом зеленый или красный
                  >
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
    // если данных о тестах нет
    return null; // то ничего не выводим
  }
  // отрисовываем таблицу с заголовками и данными
  return <Table columns={columns} dataSource={data} />;
};

export default ReportTable;
