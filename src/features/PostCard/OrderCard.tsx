import { Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/exports"
import CardOrder from "../../entities/Card/CardOrder"
import { GetBasket, IResponseDataBasket } from "../../shared/api/BasketApi"
import { addBasket } from "../../app/Redux/Store/basket"
import MediaQuery from "react-responsive"
import CardOrderMobile from "../../entities/Card/CardOrderMobile"
import LoaderMini from "../../shared/UI/LoaderMini/LoaderMini"

const OrderCard = () => {
    const dispatch = useDispatch()
    const bask: IResponseDataBasket[] = useSelector((state: any) => state.basket.basket)
    
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        GetBasket()
            .then((e) => {
                setLoader(false)
                dispatch(addBasket(e))
            })
            .catch(e=>{
                setLoader(false)
                console.log(e)
            })
    }, [])

    if(loader){
        return <div className="LoaderOrder"><LoaderMini/></div>
    }
    
    if (!bask.length) {
        return <h1>Пусто</h1>
    }


    return (
        <>
            {bask?.map(
                ({
                    id,
                    products,
                    count
                }) => (
                    <Fragment key={id}>
                        <MediaQuery minWidth={601}>
                            <CardOrder
                                count={Number(count) || 1}
                                img={products.image?.[0]?.imgUrl || ""}
                                name={products.name}
                                price={products.price}
                                id={id}
                            />
                        </MediaQuery>
                        <MediaQuery maxWidth={600}>
                            <CardOrderMobile
                                count={Number(count) || 1}
                                img={products.image?.[0]?.imgUrl || ""}
                                name={products.name}
                                price={products.price}
                                id={id}
                            />
                        </MediaQuery>
                    </Fragment>
                )
            )}
        </>
    )
}

export default OrderCard
