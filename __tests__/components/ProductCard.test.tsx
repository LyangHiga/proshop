import React from "react";
import { shallow } from "enzyme";
import * as Redux from "react-redux";
import { Action } from "redux";

import ProductCard from "../../components/ProductCard";
import products from "../../products";

describe("Product Card", () => {
  let useDispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    useDispatchSpy = jest.spyOn(Redux, "useDispatch");
    useDispatchSpy.mockImplementation(() => (cb: Action) => cb);
  });

  it("renders correctly", () => {
    const product = products[0];

    const wrapper = shallow(<ProductCard product={product} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("when count in stock is zero, status should be out of stock and Add to Cart button should be disabled", () => {
    const product = products[0];
    // change count to zero
    product.countInStock = 0;

    const wrapper = shallow(<ProductCard product={product} />);
    const addToCartBtn = wrapper.find("#btn-card-add-to-cart").props();
    const status = wrapper.find("#status").props();

    expect(product.countInStock).toBe(0);
    expect(addToCartBtn).not.toBeUndefined();
    expect(addToCartBtn).not.toBeNull();
    expect(addToCartBtn.disabled).toBeTruthy();
    expect(addToCartBtn.children).toBe("Out of Stock");

    expect(status).not.toBeUndefined();
    expect(status).not.toBeNull();
    expect(status.children).toBe("Out of Stock");
  });

  it("when count in stock is not zero, status should be In Stock and Add to Cart button should be enabled", () => {
    const product = products[0];
    product.countInStock = 13;

    const wrapper = shallow(<ProductCard product={product} />);
    const addToCartBtn = wrapper.find("#btn-card-add-to-cart").props();
    const status = wrapper.find("#status").props();

    expect(product.countInStock).toBeGreaterThan(0);
    expect(addToCartBtn).not.toBeUndefined();
    expect(addToCartBtn).not.toBeNull();
    expect(addToCartBtn.disabled).toBeFalsy();
    expect(addToCartBtn.children).toBe("Add To Cart");

    expect(status).not.toBeUndefined();
    expect(status).not.toBeNull();
    expect(status.children).toBe("In Stock");
  });
});
