import { useSelector } from "react-redux"
import { IResponseDataBasket } from "../../shared/api/BasketApi"
import CardLine from "../../entities/Card/CardLine"
import {Fragment} from "react";

const BasketList = () => {
    const bask: IResponseDataBasket[] = useSelector((state: any) => state.basket.basket)
    
    return(
        <>
        {bask?.map(
                ({
                    id,
                    products,
                    count,
                }) => (
                    <Fragment key={id}>
                    <CardLine
                        manufacturer={products?.manufacturer}
                        code={products?.code}
                        brand={products?.brand}
                        price={products?.price}
                        id={id}
                        productsid={products?.id}
                        name={products?.name}
                        imgUrl={products?.image?.[0]?.imgUrl || ""}
                        size={products?.size}
                        count={count}
                    />
                    </Fragment>
                )
            )}
        </>
    )
}

export default BasketList