import React from "react";
import { shallow } from "enzyme";

import ProductCard from "../../components/ProductCard";
import products from "../../products";
describe("Product Card", () => {
  it("renders correctly", () => {
    const product = products[0];
    const wrapper = shallow(<ProductCard product={product} />);
    expect(wrapper).toMatchSnapshot();
  });
});

// test status
describe("Product Card", () => {
  it("when count in stock is zero, status should be out of stock and Add to Cart button should be disabled", () => {
    const product = products[0];
    // change count to zero
    product.countInStock = 0;

    const wrapper = shallow(<ProductCard product={product} />);
    const addToCartBtn = wrapper.props().children[1].props.children.props
      .children.props.children;
    const status = wrapper.props().children[0].props.children[2].props
      .children[1];

    expect(product.countInStock).toBe(0);
    expect(addToCartBtn).not.toBeUndefined();
    expect(addToCartBtn).not.toBeNull();
    expect(addToCartBtn.props.name).toBe("btn-card-add-to-cart");
    expect(addToCartBtn.props.disabled).toBeTruthy();
    expect(addToCartBtn.props.children).toBe("Out of Stock");

    expect(status).not.toBeUndefined();
    expect(status).not.toBeNull();
    expect(status.props.children).toBe("Out of Stock");
  });
});

// test status
describe("Product Card", () => {
  it("when count in stock is not zero, status should be In Stock and Add to Cart button should be enabled", () => {
    const product = products[0];
    product.countInStock = 13;

    const wrapper = shallow(<ProductCard product={product} />);
    const addToCartBtn = wrapper.props().children[1].props.children.props
      .children.props.children;
    const status = wrapper.props().children[0].props.children[2].props
      .children[1];

    expect(product.countInStock).toBeGreaterThan(0);
    expect(addToCartBtn).not.toBeUndefined();
    expect(addToCartBtn).not.toBeNull();
    expect(addToCartBtn.props.name).toBe("btn-card-add-to-cart");
    expect(addToCartBtn.props.disabled).toBeFalsy();
    expect(addToCartBtn.props.children).toBe("Add To Cart");

    expect(status).not.toBeUndefined();
    expect(status).not.toBeNull();
    expect(status.props.children).toBe("In Stock");
  });
});
