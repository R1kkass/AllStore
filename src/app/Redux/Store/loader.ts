import { RootState } from "./createStore";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const LOAD_FILM = "LOAD_FILM";

interface IInit {
    loader: boolean
}

const initialState: IInit = {
    loader: false
};

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        loaderAction(state: IInit, action: PayloadAction<boolean>) {
            state.loader = action.payload;
        }
    }
});

const { reducer: loaderReducer, actions } = loaderSlice;
export const getLoader =
    () =>
        (state: RootState): boolean =>
            state.loader.loader;

export const { loaderAction } = actions;
export default loaderReducer;