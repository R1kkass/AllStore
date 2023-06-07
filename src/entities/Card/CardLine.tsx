import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import { ICard, ICardApi } from "../../shared/api/CardApi"
import { FC } from "react"
import "./CardLine.scss"
import { useDispatch } from "react-redux"
import { addBasket } from "../../app/Redux/Store/basket"
import Count from "../../shared/UI/Count/Count"
import { Link } from "react-router-dom"
import { UpdataCountBasket } from "../../shared/api/BasketApi"
import DeleteButtonBasket from "../../features/DeleteButtonBasket/DeleteButtonBasket"

const CardLine: FC<ICard> = ({ id, name, price, imgUrl, size, count, productsid }) => {
    const dispatch = useDispatch()

    const countFnMin = (count: number) => {
            UpdataCountBasket({id: id || 0, count})
                .then(e=>{
                    dispatch(addBasket(e))
                })
                .catch(e=>console.log(e))
    }

    return (
        <div className="CardLine__product">
            <Link to={`/product/${productsid || id}`}>
                <div className="CardLine__img">
                    <img src={imgUrl} alt=""/>
                </div>
                <div className="CardLine__info">
                    <p>{size}</p>
                    <p>{name}</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Facere, inventore.
                    </p>
                </div>
            </Link>
            <div className="CardLine__count">
                <Count
                    count={count || 1}
                    onClickMinus={() => countFnMin(Number(count)-1)}
                    onClickPlus={() => countFnMin(Number(count)+1)}
                />
            </div>
            <div className="CardLine__price">
                <p>{price}{" "}₽</p>
            </div>

            <div className="CardLine__delete">
                <DeleteButtonBasket id={id || 0}/>
            </div>
        </div>
    )
}

export default CardLine
