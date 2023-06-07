import Breadcrumbs from "../../features/BreadCrumbs/BreadCrumbs";
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton";
import MyInput from "../../shared/UI/Input/MyInput";
import NumberBlock from "../../shared/UI/NumberBlock/NumberBlock";
import "./Order.scss";
import payment from "../../assets/Payment/Payment.svg"
import MediaQuery from 'react-responsive'
import OrderCard from "../../features/PostCard/OrderCard";
import { IForm } from "../../features/FormOrder/FormOrder";
import Counter from "../../features/Counter/Counter";
import { useForm } from "react-hook-form";
import { AddOrder } from "../../shared/api/OrderApi";
import { useDispatch, useSelector } from "react-redux";
import { addBasket, basketReducer } from "../../app/Redux/Store/basket";
import ModalOrder from "../../entities/ModalOrder/ModalOrder";
import { useState } from "react";

const breadCrumb = [
    {
        link: "/",
        name: "Главная"
    },
    {
        link: "/basket",
        name: "Корзина"
    },
    {
        link: "/order",
        name: "Оформление заказа"
    }
]

const Order = () => {
    document.title="Новости"

    const [visible, setVisible] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<IForm>()
    const bask = useSelector((state: any)=>state.basket.basket)
    const dispatch = useDispatch();

    const onSubmit = async (data: IForm) => {
        data.comment=""
        data.status="Выполняется"
        if(bask.length){
            AddOrder(data)
                .then(e=>{
                    dispatch(addBasket([]))
                    setVisible(true)
                })
                .catch(e=>setError("mainError", { message: "⚠ Ошибка!", type: "custom" }))
        }else{
            setError("mainError", { message: "⚠ Корзина пуста!", type: "custom" })
        }
    }

    return(
        <div className="Order">
            <form onSubmit={handleSubmit(onSubmit)}>
            <Breadcrumbs arr={breadCrumb}/>
            <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>
            <div className="Order__block">
        <div className="FormOrder">
            <div className="FormOrder__first">
                <NumberBlock number="1" text="КОНТАКТНЫЕ ДАННЫЕ"/>
                </div>
                <div className="FormOrder__form">
                    <label>
                        Имя*
                        <MyInput button={true} placeholder = "Введите ваше имя"
                            register = {register}
                            name="name"
                            validate={{
                                required: "⚠ Введите имя",
                            }}
                        />
                        </label>
                        <p className="Error">{errors?.name?.message}</p>
                        <label>
                            Телефон*
                            <MyInput button={true} placeholder = "Введите ваш телефон"
                             register = {register}
                             name="number"
                             validate={{
                                 required: "⚠ Введите номер",
                             }}
                            />
                        </label>
                        <p className="Error">{errors?.number?.message}</p>
                        <label>
                            E-Mail*
                            <MyInput button={true} placeholder = "Введите ваш E-Mail"
                            register = {register}
                            name="email"
                            validate={{
                                required: "⚠ Введите E-Mail",
                            }}
                            />
                        </label>
                        <p className="Error">{errors?.email?.message}</p>
                    </div>
                    <div className="FormOrder__form">
                        <NumberBlock number="2" text="АДРЕС ДОСТАВКИ"/>
                        <label>
                            Город
                            <MyInput button={true} placeholder = "Введите ваш город"
                            register = {register}
                            name="city"
                            validate={{
                                required: "⚠ Введите город",
                            }}
                            />
                        </label>
                        <p className="Error">{errors?.city?.message}</p>
                        
                        <label>
                            Адрес
                            <MyInput button={true} placeholder = "Введите ваш адрес"
                            register = {register}
                            name="addres"
                            validate={{
                                required: "⚠ Введите адрес",
                            }}
                            />
                        </label>
                        <p className="Error">{errors?.addres?.message}</p>
                        <MediaQuery minWidth={801}>
                            <MyButton onSubmit={onSubmit}>Подверждение заказа</MyButton>
                            <p className="Error">{errors?.mainError?.message}</p>
                        </MediaQuery>
                    </div>
        </div>
                <div className="Info">
                    <div className="Info__block">
                        <div className="Unit">
                            <NumberBlock text="ОПЛАТА" number = {<img src={payment} alt=""/>}/>
                            <p className="Unit__text">Принимаем оплату наличными, по карте и через расчетный счет.</p>
                        </div>
                        <div className="Unit">
                            <NumberBlock text="Доставка" number = {<img src={payment} alt=""/>}/>
                            <p className="Unit__text">Бесплатная доставка от 10 000 ₸ по области. Наша доставка работает ежедневно..</p>
                        </div>
                        <div className="Unit">
                            <NumberBlock text="возникли вопросы?" number = {"?"}/>
                            <p className="Unit__text">Принимаем оплату наличными, по карте и через расчетный счет.</p>
                        </div>
                    </div>
                    <div className="Info__form">
                            <NumberBlock number="3" text="Дополнительно"/>
                            <p>Комментарий</p>
                            <div className="CommentForm" contentEditable={true}></div>
                    </div>
                </div>
                <div className="YourOrder">
                    <h2>Ваш заказ</h2>
                    <div className="YourOrder__window">
                        <OrderCard />
                    </div>
                    <div className="PriceOrder">
                        <h3>Итого</h3>
                        <Counter/>
                    </div>
                    <div className="PriceMobile">
                        <Counter/>
                    </div>
                    <div>
                    </div>
                    <div className="Accept">
                        <MediaQuery maxWidth={800}>
                            <MyButton>Подверждение заказа</MyButton>
                            <p className="Error">{errors?.mainError?.message}</p>
                        </MediaQuery>
                    </div>
                </div>
            </div>
            </form>
            <ModalOrder visible={visible} callback={()=>setVisible(false)}/>
        </div>
    )
}

export default Order