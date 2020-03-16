import React from "react";
import Home from "./index";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { render, act } from "@testing-library/react";

const mock = [
  {
    id: 1,
    origin: "011",
    destiny: "016",
    valueForMin: "1.90"
  },
  {
    id: 2,
    origin: "016",
    destiny: "011",
    valueForMin: "2.90"
  },
  {
    id: 3,
    origin: "011",
    destiny: "017",
    valueForMin: "1.70"
  },
  {
    id: 4,
    origin: "017",
    destiny: "011",
    valueForMin: "2.70"
  },
  {
    id: 5,
    origin: "011",
    destiny: "018",
    valueForMin: "0.90"
  },
  {
    id: 6,
    origin: "018",
    destiny: "011",
    valueForMin: "1.90"
  }
];

it("should render the component  <Home/>", () => {
  const app = mount(<Home />);
  const json = toJson(app);
  expect(json).toMatchSnapshot();
});
