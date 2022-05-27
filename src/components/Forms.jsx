import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useGlobalContext } from "../context/context";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
function Forms(props) {
  const { addFood, foods, setEdit, edit, setFoods, idEdit, handleChangeFood } =
    useGlobalContext();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...foods });
  });

  const onFinish = (value) => {
    if (!edit) {
      addFood(value);
    } else {
      handleChangeFood(value);
    }
    setFoods({ name: "", image: "", description: "", price: 0 });
    setEdit(false);
    form.resetFields();
  };

  return (
    <div className="form-wrapper">
      <h2 className="text-center">Form Add Food In Menu</h2>
      <Form
        form={form}
        onFinish={onFinish}
        {...layout}
        name="nest-messages"
        validateMessages={validateMessages}
        // initialValues={{
        //   ...foods,
        // }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea autoSize={true} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              type: "number",
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <div className="btn-submit">
          {edit ? (
            <Button size="large" type="primary" htmlType="submit">
              Change Food
            </Button>
          ) : (
            <Button size="large" type="primary" htmlType="submit">
              Add Food
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default Forms;
