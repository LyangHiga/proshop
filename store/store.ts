import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { reducers } from "./reducers/reducers";

const makeStore = () => {
  const store = createStore(reducers, composeWithDevTools());

  return store;
};

// export an assembled wrapper
export const storeWrapper = createWrapper(makeStore, { debug: false });
