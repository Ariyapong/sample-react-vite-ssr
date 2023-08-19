import React from "react";
import { DatePicker, Input, Button } from "antd";

export const LayoutDefault = (props: any) => {
  return (
    <div>
      <h2>LayoutDefault</h2>
      <div>This is default layout...</div>
      <DatePicker />
      <Input />
      <Button>Button</Button>
      <div>{props.children}</div>
    </div>
  );
};
