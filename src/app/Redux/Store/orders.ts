import { IOrder } from "../../../shared/api/OrderApi";
import { RootState } from "./createStore";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const LOAD_FILM = "LOAD_FILM";

interface IInit {
    order: IOrder[] | []
}

const initialState: IInit = {
    order: []
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderAction(state: IInit, action: PayloadAction<IOrder[]>) {
            state.order = action.payload;
        }
    }
});

const { reducer: orderReducer, actions } = orderSlice;
export const getOrder =
    () =>
        (state: RootState): IOrder[] | [] =>
            state.order.order;

export const { orderAction } = actions;
export default orderReducer;