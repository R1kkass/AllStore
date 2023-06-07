import { useDispatch } from "react-redux";
import { addBasket } from "../../app/Redux/Store/basket";
import DeleteButtonBasket from "../../features/DeleteButtonBasket/DeleteButtonBasket";
import Count from "../../shared/UI/Count/Count";
import { DeleteBasket, UpdataCountBasket } from "../../shared/api/BasketApi";
import "./CardOrder.scss";
import {FC} from "react";
import MediaQuery from "react-responsive";
import { loaderAction } from "../../app/Redux/Store/loader";

export interface ICardOrderProps{
    img: string,
    name: string,
    price: number,
    id: number
    count: number
}

const CardOrder:FC<ICardOrderProps> = ({img, name, price, id, count}) => {
    const dispatch = useDispatch()
    
    const countFnMin = (count: number) => {
        dispatch(loaderAction(true))
        UpdataCountBasket({id: id || 0, count})
            .then(e=>{
                dispatch(addBasket(e))
                dispatch(loaderAction(false))
            })
            .catch(e=>{
                console.log(e)
                dispatch(loaderAction(false))
            })
    }
    
    return (
        <>
            <MediaQuery minWidth={600}>
            <div className="CardOrder">
                <img className="CardOrder__img" src={img} alt=""/>
                <div className="CardOrder__content">
                    <p className="Name">{name}</p>
                    <p className="Price">{price} ₽</p>
                </div>
                <Count
                        count={count || 1}
                        onClickMinus={() => countFnMin(Number(count)-1)}
                        onClickPlus={() => countFnMin(Number(count)+1)}
                    />
                <DeleteButtonBasket id={id}/>
            </div>
            </MediaQuery>
            
        </>
    )
}

export default CardOrder;