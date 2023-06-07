import axios from "axios"
import { domen } from "../const/apiConst"
import { IForm } from "../../features/FormOrder/FormOrder";
import { IData, IResponseDataBasket } from "./BasketApi";
import { ICard, ICardApi } from "./CardApi";

interface IDataOrder{
    status: string,
    comment: string;
    addres: string;
    email: string;
    number: string;
    name: string
}

export interface IOrder{
    id: number
    status: string
    comment: string
    addres: string
    "E-Mail": string
    number: string
    name: string
    user:{
        name: string
        email: string
    }
    all_orders: ICard[]
}

export interface IOrderAll{
    id: number
    products: ICard[]
}

interface IPost {
    id: number
    status: string
}

export const AddOrder = async (post: IForm) => {
    const res:IData<IResponseDataBasket[]> = await axios.post(`${domen}/order/create`, {
        ...post,
        status: "Выполняется",
        comment: "d"
    },
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

    return res.data
}

export const GetOrder = async () => {
    const res:IData<IOrder[]> = await axios.get(`${domen}/order/getorderuser`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return res.data
}

export const GetAllOrder = async () => {
    const res:IData<IOrder[]> = await axios.get(`${domen}/admin/getallorders`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return res.data
}

export const EditOrder = async (post: IPost) => {
    const res:IData<IOrder[]> = await axios.post(`${domen}/admin/editorder`, post, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return res.data
}