import { shallow } from "enzyme";
import * as Redux from "react-redux";

import CartTotal from "../../components/CartTotal";
import ItemModel from "../../models/Item";
import products from "../../products";

describe("Cart Total", () => {
  let useSelectorSpy: jest.SpyInstance;

  beforeEach(() => {
    useSelectorSpy = jest.spyOn(Redux, "useSelector");
  });

  test("renders correctly", () => {
    const items = new Array<ItemModel>();
    for (let p of products) {
      const item = { ...p, quantity: 6 };
      items.push(item);
    }

    useSelectorSpy.mockReturnValue(items);
    const wrapper = shallow(<CartTotal />);

    expect(wrapper).toMatchSnapshot();
  });
});
