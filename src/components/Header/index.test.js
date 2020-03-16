import React from "react";
import Header from "./index";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

it("should render the header component", () => {
  const app = mount(<Header />);
  expect(toJson(app)).toMatchSnapshot();
});
