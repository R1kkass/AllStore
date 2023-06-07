import { useEffect, useState } from "react"
import { GetOrder } from "../../shared/api/OrderApi"
import { getOrder, orderAction } from "../../app/Redux/Store/orders"
import { useDispatch, useSelector } from "react-redux"
import "./OrderList.scss"
import LoaderMini from "../../shared/UI/LoaderMini/LoaderMini"
import ModalOrder from "../ModalOrder/ModelOrderCabinet"
import OrderCard from "../../entities/OrderCard/OrderCard"
import useQuery from "../../shared/hooks/useQuery"

const OrderList = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(true)
    
    useEffect(()=>{
        GetOrder()
            .then(e=>{
                dispatch(orderAction(e))
                setLoader(false)
            })
            .catch(e=>{
                setLoader(false)
            })
    }, [])

    const order = useSelector(getOrder());
    
    if(loader){
        return <div className="LoaderOrder"><LoaderMini/></div>
    }

    if(!order){
        return <h1>Пусто</h1>
    }

    return (
        <div className="OrderList">
            {order?.map((uOrder)=>(
                <OrderCard uOrder={uOrder}/>
            ))}
        </div>
    )
}

export default OrderList