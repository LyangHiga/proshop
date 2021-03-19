import { shallow } from "enzyme";
import * as Redux from "react-redux";
import { Action } from "redux";

import CartItem from "../../components/CartItem";
import ItemModel from "../../models/Item";
import products from "../../products";

describe("Product Card", () => {
  let useDispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    useDispatchSpy = jest.spyOn(Redux, "useDispatch");
    useDispatchSpy.mockImplementation(() => (cb: Action) => cb);
  });

  it("renders correctly", () => {
    const item: ItemModel = { ...products[0], quantity: 5 };

    const wrapper = shallow(<CartItem item={item} i={0} />);

    expect(wrapper).toMatchSnapshot();
  });

  // test for different quantity
  it("quantity equals zero", () => {
    const item: ItemModel = { ...products[0], quantity: 0 };
    const wrapper = shallow(<CartItem item={item} i={0} />);
    const select = wrapper.find("#demo-simple-select").props();
    expect(select.value).toBe(0);
  });
});
