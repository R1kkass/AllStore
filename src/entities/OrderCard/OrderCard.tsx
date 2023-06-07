import {useState, FC} from "react"
import { IOrder } from "../../shared/api/OrderApi"
import ModalOrder from "../../widgets/ModalOrder/ModelOrderCabinet"

interface IOrderCard {
    uOrder:IOrder
}

const OrderCard:FC<IOrderCard> = ({uOrder}) => {
    const [visible, setVisible] = useState(false)

    return(
        <>
<div onClick={()=>setVisible(true)} key={uOrder.id} className="OrderList__unit">
                    <div>
                        <p>#{uOrder.id}</p>
                        <p>Почта: {uOrder["E-Mail"]}</p>
                    </div>
                    <div>
                        <p>Адрес: {uOrder.addres}</p>
                        <p>Имя: {uOrder.name}</p>
                    </div>
                    <div>
                        <p>Номер: {uOrder.number}</p>
                        <p>Статус: {uOrder.status}</p>
                    </div>
                </div>
                <ModalOrder allOrder={uOrder} visible={visible} callback={()=>setVisible(false)}/>
                </>
    )
}

export default OrderCard