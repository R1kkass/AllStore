import { Fragment, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBasket } from "../../app/Redux/Store/basket"
import Breadcrumbs from "../../features/BreadCrumbs/BreadCrumbs"
import { ICardApi } from "../../shared/api/CardApi"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import CardLine from "../../entities/Card/CardLine"
import Modal from "../../shared/UI/Modal/Modal"
import "./Basket.scss"
import { GetBasket, IResponseDataBasket } from "../../shared/api/BasketApi"
import { Link } from "react-router-dom"
import Counter from "../../features/Counter/Counter"
import BasketList from "../../widgets/BasketList/BasketList"


const Basket = () => {
    const dispatch = useDispatch()
    const count: number = useSelector((state: any) => state.basket.count)
    document.title = "Корзина"

    useEffect(() => {
        GetBasket().then(e=>
            dispatch(addBasket(e))            
        )
    }, [count])

    return (
        <div className="Basket">
            <Breadcrumbs
                arr={[
                    { name: "Главная", link: "/" },
                    { name: "Каталог", link: "/catalog" },
                    { name: "Корзина", link: "/basket" },
                ]}
            />
            <h1>Корзина</h1>
            <BasketList/>
            {count ? (
                <div className="Basket__order">
                    <div>
                        <Link to="/order">
                            <MyButton>
                                Оформить заказ
                            </MyButton>
                        </Link>
                    </div>
                    <div>
                        <Counter/>
                    </div>
                </div>
            ) : (
                <div className="Basket__order">
                    <h1>Корзина пуста</h1>
                </div>
            )}
        </div>
    )
}

export default Basket