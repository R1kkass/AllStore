import { useDispatch } from "react-redux"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import deletes from "../../assets/Delete/Delete.svg"
import { addBasket } from "../../app/Redux/Store/basket"
import {FC}from "react";
import { DeleteBasket } from "../../shared/api/BasketApi";
import "./DeleteButtonBasket.scss"
import { loaderAction } from "../../app/Redux/Store/loader";
import { errorButtonAction } from "../../app/Redux/Store/errorButton";
import useQuery from "../../shared/hooks/useQuery";

const DeleteButtonBasket:FC<{id: number}> = ({id}) => {
    const dispatch = useDispatch()
    
    const {hook} = useQuery({request: ()=>DeleteBasket(id), callback: addBasket, inLoad: true, success: "Товар удалён"})

    const deletePost = () => {
        

    //     dispatch(loaderAction(true))
    //     DeleteBasket(id)
    //         .then(e=>{
    //             dispatch(loaderAction(false))
    //             dispatch(errorButtonAction({visible: true, text: "Товар удалён", id: Date.now()}))
    //             dispatch(addBasket(e))
    //         })
    //         .catch(e=>{
    //             dispatch(loaderAction(false))
    //             dispatch(errorButtonAction({visible: true, text: "Ошибка", type: "Error", id: Date.now()}))
    // })
    }
    return(
        <div className="DeleteButtonBasket">
            <MyButton onClick={hook}>
                <img src={deletes} alt="" />
            </MyButton>
        </div>
    )
}

export default DeleteButtonBasket