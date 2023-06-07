import {FC, useRef} from 'react'
import { EditOrder, IOrder } from '../../shared/api/OrderApi'
import MyInput from '../../shared/UI/Input/MyInput'
import MyButton from '../../shared/UI/Buttons/MyButton/MyButton'
import { useDispatch } from 'react-redux'
import { orderAction } from '../../app/Redux/Store/orders'


interface IOrderCArdApi{
    order: IOrder
}

const OrderCardAdmin:FC<IOrderCArdApi> = ({order}) => {
    const  ref = useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch()

    const edit = (id: number) => {
        EditOrder({id: id, status: String(ref.current?.value)})
            .then(e=>dispatch(orderAction(e)))
    }

    return (
        <div className="OrderCardAdmin">
            <MyInput ref={ref}></MyInput>
            <MyButton onClick={()=>edit(order.id)}>Подвердить</MyButton>
        </div>
    )
}

export default OrderCardAdmin