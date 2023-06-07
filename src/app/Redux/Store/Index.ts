import { combineReducers, createStore } from "redux"
import { ICard, ICardApi } from "../../../shared/api/CardApi"
import { basketReducer } from "./basket"
import { productReducer } from "./product"
import errorButtonReducer from "./errorButton"
import orderReducer from "./orders"
import loaderReducer from "./loader"
import { composeWithDevTools } from 'redux-devtools-extension'
import newsReducer from "./newsPanel"

export interface IRedux {
    basket: ICardApi
    product: { posts: ICard[], count: number }
}

const rootReducers = combineReducers({
    basket: basketReducer,
    product: productReducer,
    errorButton: errorButtonReducer,
    order: orderReducer,
    loader: loaderReducer,
    news: newsReducer
})

export const store = createStore(rootReducers, composeWithDevTools())
