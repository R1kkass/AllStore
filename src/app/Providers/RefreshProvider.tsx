import { FC, useEffect } from "react";
import { RefreshApi } from "../../shared/api/RefreshApi";

const RefreshProvider:FC<{children: React.ReactNode}> = ({children}) => {
    useEffect(()=>{
        if(localStorage.getItem("token")){  
        RefreshApi()
            .then(e=>localStorage.setItem('token', e))
            .catch(e=>{
                console.log(e);
                // localStorage.removeItem("token")
            })
        }}, [])
    
    return(
        <>
            {children}
        </>
    )
}

export default RefreshProvider