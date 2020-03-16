// import React from "react";
// import Table from "./components/Table/";
// import { mount } from "enzyme";
// import toJson from "enzyme-to-json";
import React from "react";
import { shallow } from "enzyme";
import App from "./App";
it("renders without crashing", () => {
  shallow(<App />);
});
