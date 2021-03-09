import React from "react";
import { shallow } from "enzyme";
import Review from "../../components/Review";
describe("Review", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Review stars={4} numberReviews={10} />);
    expect(wrapper).toMatchSnapshot();
  });
});
