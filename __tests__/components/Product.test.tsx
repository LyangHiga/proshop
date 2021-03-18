import React from "react";
import { shallow } from "enzyme";
import Product from "../../components/Product";
import products from "../../products";

describe("Product", () => {
  it("renders correctly", () => {
    const firstProd = products[0];
    const wrapper = shallow(<Product product={firstProd} />);
    expect(wrapper).toMatchSnapshot();
  });
});
