import MediaQuery from "react-responsive"
import DeleteButtonBasket from "../../features/DeleteButtonBasket/DeleteButtonBasket"
import Count from "../../shared/UI/Count/Count"
import { ICardOrderProps } from "./CardOrder"
import {FC} from "react";
import { UpdataCountBasket } from "../../shared/api/BasketApi";
import { useDispatch } from "react-redux";
import { addBasket } from "../../app/Redux/Store/basket";
import "./CardOrderMoile.scss"
import { loaderAction } from "../../app/Redux/Store/loader";

const CardOrderMobile:FC<ICardOrderProps> = ({img, name, price, id, count}) => {
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

    return(
        <MediaQuery maxWidth={600}>
            <div className="CardOrderMobile">
                <img className="CardOrderMobile__img" src={img} alt=""/>
                <div className="CardOrderMobile__content">
                    <p className="Name">{name}</p>
                    <p className="Price">{price} ₽</p>
                </div>
                <div className="Count">
                    <Count
                            count={count || 1}
                            onClickMinus={() => countFnMin(Number(count)-1)}
                            onClickPlus={() => countFnMin(Number(count)+1)}
                        />
                    <div className="Delete">
                        <DeleteButtonBasket id={id}/>
                    </div>
                </div>
            </div>
        </MediaQuery>
    )
}

export default CardOrderMobile