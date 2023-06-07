import axios from "axios"
import { domen } from "../const/apiConst"
import { IData } from "./BasketApi"

export interface INews{
    id: number
    title: string
    body: string
}

export const NewsApi = async () => {
    const res:IData<INews> = await axios.get(`${domen}/getnews`)
    return res.data
}

export const NewsCreateApi = async (data: INews) => {
    const res:IData<INews[]> = await axios.post(`${domen}/admin/createnews`, data,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            } 
        }
    )
    return res.data
}

export const NewsDeleteApi = async (id: number) => {
    const res: IData<INews[]> = await axios.delete(`${domen}/admin/deletenews?id=${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    return res.data
} 
