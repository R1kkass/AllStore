import { RootState } from "./createStore";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const LOAD_FILM = "LOAD_FILM";

interface IInit {
    errorButton: IVisib[]
}

const initialState: IInit = {
    errorButton: [{
        id: 1,
        visible: false,
        text: "Ошибка",
        type: "Error"
    }]
};

export interface IVisib{
    id: number;
    visible: boolean,
    text: string,
    type?: "Error" | "Success"
}

const filmSlice = createSlice({
    name: "errorButton",
    initialState,
    reducers: {
        errorButtonAction(state: IInit, action: PayloadAction<IVisib>) {
            state.errorButton = [...state.errorButton, action.payload] 
        },
        deleteErrorAction(state: IInit, action: PayloadAction<number>) {
            let newState = state.errorButton.filter((err)=>{
                return err.id!==action.payload
            })
            state.errorButton = [...newState]
        }
    }
});

const { reducer: errorButtonReducer, actions } = filmSlice;

export const getAllError =
    () =>
        (state: RootState): IVisib[] =>
            state.errorButton.errorButton;

export const addError = () => {

}
export const { errorButtonAction, deleteErrorAction } = actions;
export default errorButtonReducer;