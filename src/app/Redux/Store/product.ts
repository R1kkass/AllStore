import { ICard, ICardApi } from "../../../shared/api/CardApi"

const initialState = {
    posts: [],
    count: 0,
}

interface IAction {
    type: string
    posts: {
        products: ICard[]
        count: number
    }
    url?: any
    count: number
}

export const ADD_POST = "ADD_POST"
export const FILTER_POST = "FILTER_POST"

export const productReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ADD_POST:
            console.log(action);
            
            return { ...state, posts: [...action.posts.products], count: action.posts.count }
        default:
            return state
    }
}

export const addPost = (posts: ICardApi[]) => ({ type: ADD_POST, posts: posts })
export const filterPost = (url: any) => ({ type: FILTER_POST, url: url })
