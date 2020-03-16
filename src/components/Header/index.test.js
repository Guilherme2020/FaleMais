import React from "react";
import Header from "./index";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

it("should render the header component ", () => {
  const app = mount(<Header />);
  expect(toJson(app)).toMatchSnapshot();
});

it("should render title header component", () => {
  const app = shallow(<Header />);
  const appBar = shallow(app.get(0));
  const appTollBar = shallow(appBar.get(0));
  const appTypography = shallow(appTollBar.get(0));
  // console.log(
  //   app.get(0).props.children.props.children.props.children[1].props.children
  // );
  expect(
    app.get(0).props.children.props.children.props.children[1].props.children
  ).toBe("Fale Mais");
});
