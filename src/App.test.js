import React from "react";
import Table from "./components/Table/";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

describe("should render the component <Table /> ", () => {
  const dataTable = [{}];
  const wrapper = <Table list={dataTable} />;
});
