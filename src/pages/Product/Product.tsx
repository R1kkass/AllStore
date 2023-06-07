import { useDebugValue, useEffect, useState } from "react"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import Count from "../../shared/UI/Count/Count"
import "./Product.scss"
import share from "../../assets/Share/Share.svg"
import basket from "../../assets/Basket/BasketWhite.svg"
import downloadBlack from "../../assets/Download/DownloadBlack.svg"
import Breadcrumbs from "../../features/BreadCrumbs/BreadCrumbs"
import { Link, useParams } from "react-router-dom"
import {
    CardApiId,
    ICard,
    ICardApi,
} from "../../shared/api/CardApi"
import Toggle from "../../shared/UI/Toggle/Toggle"
import Loader from "../../shared/UI/Loader/Loader"
import ButtonAddBasket from "../../features/ButtonAddBasket/ButtonAddBasket"
import Slider from "../../shared/UI/Slider/Slider"

export interface ICardDataOne {
    data: ICardApi
}

const Product = () => {
    const [count, setCount] = useState<number>(1)
    const [prod, setProd] = useState<ICard>()
    const [type, setType] = useState<boolean>(true)
    const countMin = () => {
        if (count > 1) {
            setCount((p) => p - 1)
        }
    }
    document.title = String(prod?.name) || "404"
    const params = useParams()

    useEffect(() => {
        CardApiId(params?.id || "0").then((e: ICard) => {
            setProd(e || [])
        })
        let res = []
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        for (let i = 0; i < basket.length; i++) {
            res.push(basket[i].id)
        }

        if (res?.includes(params.id)) {
            setType(false)
        }
    }, [])


    if (!prod) {
        return <Loader/>
    }

    if(!prod?.name){
        return <h1>Не найдено</h1>
    }

    return (
        <div className="Container">
            <Breadcrumbs
                arr={[
                    { name: "Главная", link: "/" },
                    { name: "Каталог", link: "/catalog" },
                    { name: `${prod?.name}`, link: `/product/${params.id}` },
                ]}
            />
            <div className="Product">
                <div className="Product__img">
                    <Slider withBlock={true} image={prod?.image}/>
                </div>
                <div className="Product__info">
                    <div className="Product__type">
                        <p>В наличии</p>
                    </div>
                    <div className="Product__name">
                        <p>{prod?.name}</p>
                    </div>
                    <div className="Product__weight">
                        <p>{prod?.size}</p>
                    </div>
                    <div className="Product__price">
                        <div className="Price">
                            <h2>{prod?.price} ₽</h2>
                        </div>
                        {type ? (
                            <>
                        <div className="Count">
                            <Count
                                count={count}
                                onClickMinus={() => {
                                    countMin()
                                }}
                                onClickPlus={() => {
                                    setCount((p) => p + 1)
                                }}
                            />
                        </div>
                        <div className="Button">
                           
                                <ButtonAddBasket id={Number(params.id)} count={count}/>
                                </div>
                                </>
                            ) : (
                                <Link to="/basket">
                                    <MyButton>
                                        К корзине <img src={basket} alt=""/>
                                    </MyButton>
                                </Link>
                            )}
                        
                    </div>
                    <div className="Product__buttons">
                        <div className="Share">
                            <img src={share} alt=""/>
                        </div>
                        <div className="Promotion">
                            <p>
                                При покупке от 10 000 ₽ бесплатная доставка по
                                Кокчетаву и области
                            </p>
                        </div>
                        <div className="PriceList">
                            <p>
                                Прайс-лист <img src={downloadBlack} alt=""/>
                            </p>
                        </div>
                    </div>
                    <div className="Product__brand">
                        <p className="Pargaraph">
                            Бренд: <span>{prod?.brand}</span>
                        </p>
                        <p className="Pargaraph">
                            Артикул: <span>{prod?.code}</span>
                        </p>
                        <p className="Pargaraph">
                            Штрихкод: <span>{prod?.code}</span>
                        </p>
                    </div>
                    <div className="Product__discription">
                        <Toggle nameBtn="Описание">
                            <p>{prod?.description}</p>
                        </Toggle>
                    </div>
                    <div className="Product__characteristics">
                        <Toggle nameBtn="Характеристики">
                            <p className="Pargaraph">
                                Производитель: <span>{prod?.manufacturer}</span>
                            </p>
                            <p className="Pargaraph">
                                Бренд: <span>{prod?.brand}</span>
                            </p>
                            <p className="Pargaraph">
                                Артикул: <span>{prod?.code}</span>
                            </p>
                            <p className="Pargaraph">
                                Штрихкод: <span>{prod?.code}</span>
                            </p>
                            <p className="Pargaraph">
                                Вес: <span>{prod.size}</span>
                            </p>
                            <p className="Pargaraph">
                                Объём: <span>{prod.size}</span>
                            </p>
                            <p className="Pargaraph">
                                Кол-во в коробке: <span>{prod.size}</span>
                            </p>
                        </Toggle>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
