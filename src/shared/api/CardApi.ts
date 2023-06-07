import axios from 'axios'
import { domen } from '../const/apiConst'

export interface ICardApi{
    products: ICard[]
    count: number
}

export interface ICard {
    id?: number
    imgUrl: string
    size: string
    brand: string
    code: string
    manufacturer: string
    price: number
    name: string
    count?: number
    description?: string
    type?: string[],
    productsid?: number
    images?:FileList
    categories?: string
    image?: [{
        imgUrl: string
        id: number
    }]
}

export interface ICardData{
    data: ICardApi[]
}

export interface ICardDataOne{
    data: ICard
}

export const CardApi = async()=>{
    let res:ICardData = await axios.get(`${domen}/getall`) 
    return res
}

export const SeacrchApi = async(searchParam: any)=>{
    let res:ICardData = await axios.post(`${domen}/getall?search=${searchParam.get('search') || ""}&order=${searchParam.get('order') || "DESC"}&column=${searchParam.get('column') || "id"}&category=${searchParam.get('param') || ""}&page=${searchParam.get("page") || 1}`,
    {
        search: searchParam.get('search') || "",
        order: searchParam.get('order') || "DESC",
        column: searchParam.get('column') || "id",
        category: searchParam.get('param') || "",
        page: searchParam.get("page") || 1
    }) 
    console.log(res);
    
    return res
}

export const DeleteCardApi = async(id:number)=>{
    let res:ICardData = await axios.delete(`${domen}/admin/delete?id=`+id, {headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }})
    
    return res
}

export const AddCardApi = async(post:ICard) =>{
    const formdata = new FormData()
    formdata.append("code", post.code)
    formdata.append("name", post.name)
    formdata.append("brand", post.brand)
    formdata.append("count", String(post.count) || "1")
    formdata.append("description", post?.description || "")
    formdata.append("price", String(post?.price))
    formdata.append("size", String(post?.size))
    formdata.append("manufacturer", String(post.manufacturer))
    formdata.append("categories", String(post.categories))
    for(let i = 0; Number(post.images?.length) > i; i++){
        formdata.append("image[]", post?.images?.[i] || "")
    }
    
    let res:ICardData = await axios.post(`${domen}/admin/create`,formdata,
    {headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }}) 
    return res
}

export const EditCardApi = async(id: number, post: ICard)=>{
    let res:ICardData = await axios.post(`${domen}/admin/update?id=`+id,{
        ...post
    },
    {headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }})
    return res
}

export const CardApiId = async (id:string)=>{
    let res:ICardDataOne = await axios.post(`${domen}/getone?id=`+id, {id: id}) 
    return res.data
}