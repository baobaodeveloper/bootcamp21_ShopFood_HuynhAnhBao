import React from "react";
import { Button, Table } from "antd";
import { useGlobalContext } from "../context/context";

export default function FoodList() {
  const { state, deleteFood, changeFood } = useGlobalContext();

  const data = state.map((item, index) => {
    return { ...item, i: index + 1 };
  });
  if (data.length === 0) return;
  const columns = [
    {
      title: "STT",
      dataIndex: "i",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <img className="img" src={image} alt="food" />,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => <span className="price">{price}$</span>,
    },
    {
      title: "Control",
      dataIndex: "key",

      render: (key) => (
        <div className="btn-wrapper">
          <Button
            onClick={() => deleteFood(key)}
            type="primary"
            danger={true}
            shape="round"
          >
            Delete
          </Button>
          <Button onClick={() => changeFood(key)} type="primary" shape="round">
            Change
          </Button>
        </div>
      ),
    },
  ];
  if (state.length === 0) return;
  return (
    <div className="wapper">
      <h4>Middle size table</h4>
      <Table
        className="table"
        defaultExpandAllRows
        pagination={false}
        columns={columns}
        dataSource={data}
        showExpandColumn={true}
      />
    </div>
  );
}
