import axios from "axios"
import { domen } from "../const/apiConst"

export interface IToken{
    data: 
    {
        access_token: string
    }
}

export const RefreshApi = async () =>{
    const res:IToken = await axios.post(`${domen}/auth/refresh`, {}, {
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            // "Content-Length": "10000"
           "Access-Control-Allow-Headers": "*"
        }
    })
    return res.data.access_token
}