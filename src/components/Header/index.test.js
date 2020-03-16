import React from "react";
import Header from "./index";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

it("should render snapshot the component <Header/> ", () => {
  const app = mount(<Header />);
  expect(toJson(app)).toMatchSnapshot();
});

it("should render title the component <Header/> ", () => {
  const app = shallow(<Header />);

  expect(
    app.get(0).props.children.props.children.props.children[1].props.children
  ).toBe("Fale Mais");
});
