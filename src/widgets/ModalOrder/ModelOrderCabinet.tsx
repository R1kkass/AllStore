import Modal from "../../shared/UI/Modal/Modal"
import {FC} from "react"
import { IOrder } from "../../shared/api/OrderApi"
import CardOrderModal from "../../entities/CardOrderModal/CardOrderModal"
import "./ModalOrderCabinet.scss"

interface IModalOrder{
    visible: boolean
    callback: () => void
    allOrder: IOrder
}

const ModelOrderCabinet:FC<IModalOrder> = ({callback, visible, allOrder}) => {
    
    return (
        <Modal visible={visible} callback={()=>callback()}>
            <div className="ContainerModalOrder">
                <>#{allOrder.id}</>
                <div>{allOrder.all_orders?.map((order)=>(
                    <div className="ModelOrderCabinet__window">
                        <CardOrderModal
                            id={order?.id}
                            name={order?.name}
                            imgUrl={order?.image?.[0].imgUrl || ""} 
                            code={order?.code} 
                            price={order?.price} 
                            manufacturer={order?.manufacturer}
                            brand={order?.brand} 
                            size={order?.size}
                        />
                    </div>
                ))}
                </div>
            </div>
        </Modal>
    )
}

export default ModelOrderCabinet