import { useSelector } from "react-redux"
import { IResponseDataBasket } from "../../shared/api/BasketApi"

const Counter = () => {
    const bask: IResponseDataBasket[] = useSelector((state: any) => state.basket.basket)

    return(
        <p>
            {bask?.reduce((key, count) => {
                return (key +=
                   Number(count?.products?.price) * (count?.count || 1))
            }, 0)}
            ₽
        </p>
    )
}

export default Counter