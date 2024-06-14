import React, { useState, useEffect } from "react";
import { Form, Input, Button, Tag, Modal, Select } from "antd";
import { reserveSeats, updateSeat } from "../../services/seat";

const DrawerSeat = ({ data, fetchData, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelMns, setIsModalMns] = useState("");
  const totalPrice = data.reduce((acc, seat) => acc + seat.price, 0);

  const showModal = () => {
    handleReserveClick();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const reqData = {
      seats: data,
      update: {
        reservedBy: {
          name: values.fullname,
          token: "123456789abcdef",
          slip: "uploaded_slip.jpg",
        },
        status: {
          statusType: values.statusType,
        },
      },
    };
    try {
      const response = await updateSeat(reqData);
      console.log("Received values of form:", reqData);
    } catch (error) {
      console.error("Failed to reserve seats:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleReserveClick = async () => {
    try {
      const response = await reserveSeats(data);
      console.log("Reservation successful:", response);
      if (!response.ok && response.status >= 400) {
        fetchData();
        setIsModalMns("มีคนจองแล้ว");
      }
      fetchData();
      setIsModalMns("สำเร็จ");
      onClose();
    } catch (error) {
      fetchData();
      console.error("Failed to reserve seats:", error);
      setIsModalMns("มีคนจองแล้ว");
      onClose();
    }
  };
  return (
    <div className="seatsContainer">
      <p>
        เก้าอี้ที่ต้องการจอง :{" "}
        {data.map((seat, index) => (
          <Tag key={index} color="blue">
            {seat.name}
          </Tag>
        ))}
      </p>
      <p>ราคา : {totalPrice} </p>
      <Form
        form={form}
        name="user_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical" // Sets form layout to vertical; fields stacked on top of each other
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status Type"
          name="statusType"
          rules={[{ required: true, message: "Please select your status!" }]}
        >
          <Select placeholder="Select a status">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
            <Select.Option value="suspended">Suspended</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="center" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="การจอง"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{modelMns}</p>
      </Modal>
    </div>
  );
};

export default DrawerSeat;
