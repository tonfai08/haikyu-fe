import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const CreateSeatModal = ({ visible, onCreate, onCancel, fetchData }) => {
  const [form] = Form.useForm();

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("values", values);
        form.resetFields();
        onCreate(values);
        fetchData();
        onCancel();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Create New Seats"
      visible={visible}
      onOk={onOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          Create
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public", price: 450 }}
      >
        <Form.Item
          name="row"
          label="Row"
          rules={[
            { required: true, message: "Please input the row identifier!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="count"
          label="Count"
          rules={[
            { required: true, message: "Please input the number of seats!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please input the number of seats!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSeatModal;
