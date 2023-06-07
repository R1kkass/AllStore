import { useSelector } from "react-redux"
import { getOrder, orderAction } from "../../app/Redux/Store/orders"
import { GetAllOrder } from "../../shared/api/OrderApi"
import useQuery from "../../shared/hooks/useQuery"
import OrderList from "../OrderList/OrderList"
import OrderCard from "../../entities/OrderCard/OrderCard"
import OrderCardAdmin from "../../entities/OrderCardAdmin/OrderCardAdmin"

const OrderPanel = () => {
    const orders = useSelector(getOrder())
    useQuery({request: GetAllOrder, callback: orderAction})

    return(
        <div className="OrderPanel">
            {orders?.map((uOrder)=>(
                <>
                    <OrderCardAdmin order={uOrder}/>
                    <OrderCard uOrder={uOrder}/>
                </>
            ))}
        </div>
    )
}

export default OrderPanel