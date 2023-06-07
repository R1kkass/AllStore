import { INews } from "../../../shared/api/NewsApi";
import { RootState } from "./createStore";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const LOAD_FILM = "LOAD_FILM";

interface IInit {
    news: INews[]
}

const initialState: IInit = {
    news: []
};

export interface IVisib{
    id: number;
    visible: boolean,
    text: string,
    type?: "Error" | "Success"
}

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        newsAction(state: IInit, action: PayloadAction<INews[]>) {
            state.news = action.payload 
        }
    }
});

const { reducer: newsReducer, actions } = newsSlice;

export const getNews =
    () =>
        (state: RootState): INews[] =>
            state.news.news;

export const { newsAction } = actions;
export default newsReducer;