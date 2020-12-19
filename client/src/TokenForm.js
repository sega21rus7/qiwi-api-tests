import React from "react";
import { Form, Input, Button, message } from "antd";

const styles = {
  form: {
    marginTop: "20px",
    marginLeft: "20px",
  },
};

const TokenForm = (props) => {
  const onFinish = async (values) => {
    try {
      props.setReport(null);
      const body = {
        token: values.token,
      };
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log("data from server", data);
      if (data.run.failures.length >= 20) {
        message.error("Неверный токен");
      } else {
        props.setReport(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Поле токен обязательно для заполнения!");
  };

  return (
    <Form
      style={styles.form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="token"
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
