import React from "react";
import Home from "../../pages/Home";
import SimpleTable from "./index";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

const list = [
  {
    origin: "011",
    destiny: "016",
    valueForMin: "1.90",
    time: "20",
    planChoise: "30",
    withPlan: "0,00",
    withoutPlan: "38,40"
  },
  {
    origin: "011",
    destiny: "017",
    valueForMin: "1.70",
    time: "80",
    planChoise: "60",
    withPlan: "37,40",
    withoutPlan: "136,00"
  }
];

it("should render snapshot the list table component", () => {
  const props = {
    list
  };

  const app = mount(<SimpleTable {...props} />);
  expect(toJson(app)).toMatchSnapshot();
});

it("test props in list table <SimpleTable/>", () => {
  const props = {
    list
  };

  const app = mount(<Home dataTable={props.list} />);
  console.log("app props", app.get(0).get(0));
  // expect(app.get(0).props.dataTable).toBe(2);
  //   console.log("............", app);
  // expect(app.find(SimpleTable).props.list).toBe(2);
  // expect(app.length).toHaveLength(2);
  // expect(app.length).toBe(3);
});
