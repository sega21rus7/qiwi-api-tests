import React from "react";
import { Form, Input, Button } from "antd";

const styles = {
  form: {
    marginTop: "20px",
    marginLeft: "20px",
  },
};

const TokenForm = () => {
  const onFinish = async (values) => {
    try {
      console.log("Success:", values);
      // /person-profile/v1/profile/current
      const body = {
        token: values.token 
      };
      const response = await fetch("/api", {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
