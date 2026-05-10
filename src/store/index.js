import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { categoriesReducer } from "./reducres/categoriesReducer";
import { thunk } from "redux-thunk";
import authReducer from "./reducres/authReducer";
import brandsReducers from "./reducres/brandsReducers";
import productReducer from "./reducres/productReducer";
import reviewReducer from "./reducres/reviewReducer";
import { cuponReducer } from "./reducres/cuponReducer";
import cartReducer from "./reducres/cartReducer";
import orderReducer from "./reducres/orderReducer";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  auth: authReducer,
  brands: brandsReducers,
  products: productReducer,
  review: reviewReducer,
  cupon: cuponReducer,
  cart: cartReducer,
  order: orderReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
