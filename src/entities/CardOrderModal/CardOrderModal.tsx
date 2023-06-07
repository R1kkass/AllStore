import "./CardOrderModal.scss"
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { ICard, ICardApi } from "../../shared/api/CardApi"

const CardOrderModal: FC<ICard> = ({
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
    const dispatch = useDispatch()

    return (
        <div className="CardOrderModal">
            <Link to={`/product/${id}`}>
                <div className="Card__img">
                    <img src={imgUrl} alt=""/>
                </div>
                
                </Link>
                
                <div className="CardOrderModal__code">
                    {size}
                    <p>{name}</p>
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
            
            <div className="CardOrderModal__price">
                <div className="Price" title={price + "₸"}>
                    <p>{price} Р</p>
                </div>
                </div>
            </div>
    )
}

export default CardOrderModal
