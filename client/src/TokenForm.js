import React from "react";
import { Form, Input, Button, message } from "antd"; // импорт для верстки

const styles = {
  // css стили для формы
  form: {
    marginTop: "20px",
    marginLeft: "20px",
  },
};

const TokenForm = (props) => {
  // метод, который вызовется при успешной отправке формы
  const onFinish = async (values) => {
    try {
      props.setReport(null); // присваиваем пустой объект чтобы не отображать неправильные данные
      const body = {
        // данные для отправки запроса
        token: values.token, // токен qiwi api
      };
      // ждем пока отправится fetch запрос на сервер
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          // заголовки запроса, qiwi работает с json
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // преобразуем данные в json
      });
      // получаем ответ с сервера
      const data = await response.json();
      console.log("data from server", data);
      // если все тесты не прошли токен неверный
      if (data.run.failures.length >= 20) {
        message.error("Неверный токен"); // выводим сообщение об ошибке
      } else {
        // иначе присваиваем отчету данные полученные с сервера
        props.setReport(data);
      }
    } catch (err) {
      console.log(err); // если произошла ошибка, выведем ее в консоль
    }
  };
  // метод, который вызовется при ошибке отправки формы
  const onFinishFailed = (errorInfo) => {
    // просто всплывающее сообщение
    message.error("Поле токен обязательно для заполнения!");
  };

  return (
    // отрисовываем форму
    <Form
      style={styles.form} // стили, которые определили заранее
      onFinish={onFinish} // и метод, вызовется при ошибке
      onFinishFailed={onFinishFailed} // при успехе
    >
      <Form.Item
        name="token" // элемент формы с валидацией от пустого ввода
        rules={[{ required: true, message: "Это обязательное поле!" }]}
      >
        <Input placeholder="Токен для доступа к API" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TokenForm;
