import axios from "axios"
import { domen } from "../const/apiConst"

export interface IFilterApi {
    nameCategory: string
    id: number,
    registerInput: string
}

export interface IArray{
    name: string
}

export interface IFilterApiData {
    data: IFilterApi[]
}

export const FilterApi = async () => {
    const res: IFilterApiData = await axios.get(
        `${domen}/getallcategory`,
        {headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }}
    )
    return res.data
}

export const FilterApiPost = async (post: IFilterApi) => {
    
    const res: IFilterApiData = await axios.post(
        `${domen}/admin/createcategory`,
        { ...post },
        {headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }}
    )
    return res
}

export const FilterApiDelte = async (id:number) => {
    const res: IFilterApiData = await axios.delete(
        `${domen}/admin/deletecategory?id=`+id,
        {headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }}
    )
    return res
}

export const FilterApiPut = async (id:number, post: IFilterApi) => {
    
    const res: IFilterApiData = await axios.post(
        `${domen}/admin/createcategory?id=`+id,{
            ...post
        },
        {headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }}
    )
    return res
}

