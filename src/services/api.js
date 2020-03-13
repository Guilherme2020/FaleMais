import mock from "./mock.json";

export default {
  async fetchData() {
    return await mock;
  }
};
