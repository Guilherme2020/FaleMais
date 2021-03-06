import React from "react";
import ModalError from "./index";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

it("should render the component  <Modal/>", () => {
  const closeModal = jest.fn();

  const props = {
    error: true,
    handleCloseModal: closeModal
  };

  const app = mount(<ModalError {...props} />);
  expect(toJson(app)).toMatchSnapshot();
});
