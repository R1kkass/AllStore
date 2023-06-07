import axios from 'axios'
import { domen } from '../const/apiConst'

export interface ICardApi{
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
    type?: string[]
}

export interface ICardData{
    data: 
    {
        access_token: string
        refresh_token: string
    }
}

export interface IAuth{
    name: string,
    email: string,
    password: string
}

export const LoginApi = async(post: IAuth)=>{
    let res:ICardData = await axios.post(`${domen}/auth/login`, {...post}, 
    {
        headers: {
           "Access-Control-Allow-Headers": "*"
        }
    }) 
    return res
}

export const RegistrationApi = async(post:IAuth)=>{
    let res:ICardData = await axios.post(`${domen}/auth/regist`, {...post}) 
    return res
}

