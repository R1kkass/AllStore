import { FC } from "react"
import Modal from "../../shared/UI/Modal/Modal"
import "./ModalOrder.scss"

interface IModalOrder{
    visible: boolean
    callback: () => void
}

const ModalOrder:FC<IModalOrder> = ({visible, callback}) => {
    
    return(
        <Modal visible={visible} callback={()=>callback()}>
            <div className="ModalOrder">
                <div>
                    <div>
                        ✅
                    </div>
                    <h1>
                        Спасибо за покупку!
                    </h1>
                </div>
                <p>Наш менеджер свяжется с Вами.</p>
            </div>
        </Modal>
    )
}

export default ModalOrder