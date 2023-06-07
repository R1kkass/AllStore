
import basket from "../../assets/Basket/BasketWhite.svg"
import "./Card.scss"
import bottle from "../../assets/Weight/Bottle.svg"

import box from "../../assets/Weight/Box.svg"
import { FC, useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import { ICard, ICardApi } from "../../shared/api/CardApi"
import { addBasket } from "../../app/Redux/Store/basket"
import ButtonAddBasket from "../../features/ButtonAddBasket/ButtonAddBasket"
import { IOrderAll } from "../../shared/api/OrderApi"
import { IResponseDataBasket } from "../../shared/api/BasketApi"

const Card: FC<ICard> = ({
    id,
    imgUrl,
    name,
    price,
    manufacturer,
    code,
    brand,
    size,
}) => {
    const [type, setType] = useState<boolean>(true)
    const bask:IResponseDataBasket[] = useSelector((state: any)=>state.basket.basket)

    useEffect(() => {
        let res = []
        for (let i = 0; i < bask.length; i++) {
            res.push(bask[i]?.products?.id)
        }

        if (res?.includes(id)) {
            setType(false)
        }
    }, [bask])

    return (
        <div className="Card">
            <Link to={`/product/${id}`}>
                <div className="Card__img">
                    <img src={imgUrl} alt=""/>
                </div>
                <div className="Card__weight">
                    <img alt="" src={size.includes('Х') ? box : bottle} />
                    {size}
                </div>
                <div className="Card__name">
                    <p>{name}</p>
                </div>
                <div className="Card__code">
                    <p>
                        Штрихкод: <span>{code}</span>
                    </p>
                    <p>
                        Производитель: <span>{manufacturer}</span>
                    </p>
                    <p>
                        Бренд: <span>{brand} </span>
                    </p>
                </div>
            </Link>
            <div className="Card__price">
                <div className="Price" title={price + "₸"}>
                    <p>{price} ₽</p>
                </div>
                <div className="Button">
                    {type ? (
                        <ButtonAddBasket id={id || 0} count={1}/>
                    ) : (
                        <Link to="/basket">
                            <MyButton>
                                К корзине <img src={basket} alt="" />
                            </MyButton>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card
