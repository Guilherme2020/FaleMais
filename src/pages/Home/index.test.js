import React from "react";
import Home from "./index";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

it("should render the component  <Home/>", () => {
  const app = mount(<Home />);
  expect(toJson(app)).toMatchSnapshot();
});
