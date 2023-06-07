import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import { AddBasket } from "../../shared/api/BasketApi"
import {FC} from "react";
import basket from "../../assets/Basket/BasketWhite.svg"
import { useDispatch } from "react-redux";
import { addBasket } from "../../app/Redux/Store/basket";
import { loaderAction } from "../../app/Redux/Store/loader";
import { errorButtonAction } from "../../app/Redux/Store/errorButton";

interface IButtonAddBasketProps{
    id: number,
    count: number
}

const ButtonAddBasket:FC<IButtonAddBasketProps> = (props) =>{
    const dispatch = useDispatch()
    
    const addInBasket = () => {
        dispatch(loaderAction(true))
        AddBasket(props)
            .then(e=>{
                dispatch(loaderAction(false))
                dispatch(addBasket(e))
                dispatch(errorButtonAction({type: "Success", text: "Товар добавлен", visible: true, id: Date.now()}))

            })
            .catch(e=>{
                console.error(e);
                dispatch(errorButtonAction({type: "Error", text: "Ошибка", visible: true, id: Date.now()}))
                dispatch(loaderAction(false))
            })
    }
    return(
        <MyButton onClick={addInBasket}>
            В корзину <img src={basket} alt="" />
        </MyButton>
    )
}

export default ButtonAddBasket