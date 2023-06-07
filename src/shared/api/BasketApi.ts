import axios from "axios"
import { domen } from "../const/apiConst"
import { ICard, ICardApi } from "./CardApi"

interface IDataBasket {
    id: number,
    count: number
}

export interface IResponseDataBasket {
    count: number;
    id: number
    products: ICard
}

export interface IData<T>{
    data: T
}

export const AddBasket = async (data: IDataBasket) => {
    const res:IData<IResponseDataBasket[]> = await axios.post(`${domen}/basket/create`, {
        ...data
    },
    {
        headers: {
            "Authorization": `bearer ${localStorage.getItem("token")}`
        }
    }) 
    return res.data;
}

export const UpdataCountBasket = async (data: IDataBasket) => {
    const res:IData<IResponseDataBasket[]> = await axios.put(`${domen}/basket/updatecount?id=${data.id}&count=${data.count}`, {
        ...data
    },
    {
        headers: {
            "Authorization": `bearer ${localStorage.getItem("token")}`
        }
    }) 
    return res.data;
}

export const DeleteBasket = async (id: number) => {
    const res:IData<IResponseDataBasket[]> = await axios.delete(`${domen}/basket/delete?id=${id}`,
    {
        headers: {
            "Authorization": `bearer ${localStorage.getItem("token")}`
        }
    });
    return res.data;
}

export const GetBasket = async () => {
    const res:IData<IResponseDataBasket[]> = await axios.get(`${domen}/basket/getuserbasket`,
    {
        headers: {
            "Authorization": `bearer ${localStorage.getItem("token")}`
        }
    });
    return res.data;
}