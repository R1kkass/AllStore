import "./Navigation.scss"
import People from "./IMG/pngwing3.png"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import download from "../../assets/Download/Download.svg"
import whatsapp from "../../assets/Messangers/WhatsApp.svg"
import telegram from "../../assets/Messangers/Telegram.svg"
import visa from "../../assets/Visa/Visa.svg"
import masterCard from "../../assets/Visa/MasterCard.svg"
import logo from "../../assets/Logo/Logo.svg"
import catalog from "../../assets/Catalog/Catalog.svg"
import address from "../../assets/Address/Address.svg"
import email from "../../assets/Email/Email.svg"
import baskets from "../../assets/Basket/Basket.svg"
import logoFooter from "../../assets/Logo/LogoFooter.svg"
import { FC, useEffect, useState } from "react"
import MyInput from "../../shared/UI/Input/MyInput"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { IRedux } from "../../app/Redux/Store/Index"
import { ICardApi } from "../../shared/api/CardApi"
import search from "../../assets/Search/Search.svg"
import LeftBlockMobile from "../../shared/UI/LeftBlockMobile/LeftBlockMobile"
import mobile from "../../assets/Mobile/Mobile.svg"
import { GetBasket } from "../../shared/api/BasketApi"
import { useDispatch } from "react-redux"
import { addBasket } from "../../app/Redux/Store/basket"
import Counter from "../../features/Counter/Counter"
import Header from "../../entities/Header/Header"

const Navigation: FC<{ children: React.ReactNode }> = ({ children }) => {
    const counts = useSelector((state: IRedux) => state.basket.count)
    const [query, setQuery] = useState<boolean>(false)

    const dispatch = useDispatch()

    useEffect(() => {
        var x: any = window.matchMedia("(max-width: 800px)")
        function myFunction(x: any) {
            if (x.matches) {
                setQuery(true)
            } else {
                setQuery(false)
            }
        }
        myFunction(x)
        x.addListener(myFunction)
        
        return x.removeListener(myFunction)
    }, [])

    useEffect(()=> {
        GetBasket()
            .then((e)=>dispatch(addBasket(e)))
    }, [])

    const [visible, setVisible] = useState<boolean>(false)

    if (query) {
        return (
            <>
                <LeftBlockMobile
                    visible={visible}
                    setVisible={() => setVisible(false)}
                >
                    <div className="Navigation__address">
                        <img src={address} alt=""/>
                        <div>
                            <p>г. Арзамас, ул. Жукова 2</p>
                        </div>
                    </div>
                    <div className="Navigation__email">
                        <img src={email} alt=""/>
                        <div>
                            <p>opt.sultan@mail.ru</p>
                            <p>На связи в любое время</p>
                        </div>
                    </div>
                    <div>
                        <p>О компании</p>
                    </div>
                    <div>
                        <p>Доставка и оплата</p>
                    </div>
                    <div>
                        <Link to="/adm">
                            <p>Админ панель</p>
                        </Link>
                    </div>
                    <div>
                        <p>Контакты</p>
                    </div>
                </LeftBlockMobile>
                <div className="Content">
                    <div className="Navigation">
                        <div className="Navigation__firstLine">
                            <div className="Navigation__container"></div>
                            <div
                                onClick={() => setVisible(true)}
                                className="Navigation__ellipse"
                            ><img src={mobile} alt="" /></div>
                            <div>
                                <img src={logo} alt=""/>
                            </div>
                            <div>
                                <Link to="/basket">
                                    <div className="SecondLine__basket">
                                        <img src={baskets} alt="" />
                                        <div className="dottedBasket">
                                            <p>{counts}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="Navigation__secondLine">
                            <Link to="/">
                                <div className="SecondLine__button">
                                    <img src={catalog} alt=""/>
                                    Каталог
                                    <img src={search} alt=""/>
                                    Поиск
                                </div>
                            </Link>
                        </div>
                    </div>
                    {children}
                </div>
                <div className="Footer">
                    <div className="Footer__logo">
                        <img src={logoFooter} alt=""/>
                        <p>
                            Компания «Арзмото» — продаёт мототехнику в Арзамасе и Нижегородской
                            области
                        </p>
                        <p>Подпишись на скидки и акции</p>
                        <div>
                            <MyInput />
                        </div>
                    </div>
                    <div className="Footer__menu">
                        <h2>Меню сайта:</h2>
                        <p>О компании</p>
                        <p>Доставка и оплата</p>
                        <p>Возврат</p>
                        <p>Контакты</p>
                    </div>
                    <div className="Footer__menu">
                        <h2>Категории:</h2>
                        <p>Мотоблоки</p>
                        <p>Мотоциклы</p>
                        <p>Снегоходы</p>
                    </div>
                    <div className="Footer__menu">
                        <h2>Скачать прайс-лист:</h2>
                        <MyButton>
                            Прайс-лист <img src={download} alt=""></img>
                        </MyButton>
                        <p>Связь в мессенджерах:</p>
                        <div className="Footer__messanger">
                            <img src={whatsapp} alt=""></img>
                            <img src={telegram} alt=""></img>
                        </div>
                    </div>
                    <div className="Footer__menu Footer__visa">
                        <h2>Контакты:</h2>
                        <div className="Footer__contactns">
                            <p>+7 (777) 490-00-91</p>
                            <p>время работы: 9:00-20:00</p>
                            <p>Заказать звонок</p>
                        </div>
                        <div className="Footer__contactns2">
                            <p>opt.sultan@mail.ru</p>
                            <p>На связи в любое время</p>
                        </div>

                        <div className="Footer__messanger">
                            <img src={visa} alt=""></img>
                            <img src={masterCard} alt=""></img>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="Content">
                <Header/>
                {children}
            </div>
            <div className="Footer">
                <div className="Footer__logo">
                    <img src={logoFooter}  alt=""/>
                    <p>
                            Компания «Арзмото» — продаёт мототехнику в Арзамасе и Нижегородской
                            области
                    </p>
                    <p>Подпишись на скидки и акции</p>
                    <div>
                        <MyInput />
                    </div>
                </div>
                <div className="Footer__menu">
                    <h2>Меню сайта:</h2>
                    <p>О компании</p>
                    <p>Доставка и оплата</p>
                    <p>Возврат</p>
                    <p>Контакты</p>
                </div>
                <div className="Footer__menu">
                    <h2>Категории:</h2>
                    <p>Мотоблоки</p>
                    <p>Мотоциклы</p>
                    <p>Снегоходы</p>
                </div>
                <div className="Footer__menu">
                    <h2>Скачать прайс-лист:</h2>
                    <MyButton>
                        Прайс-лист <img src={download}  alt=""></img>
                    </MyButton>
                    <p>Связь в мессенджерах:</p>
                    <div className="Footer__messanger">
                        <img src={whatsapp}  alt=""></img>
                        <img src={telegram}  alt=""></img>
                    </div>
                </div>
                <div className="Footer__menu Footer__visa">
                    <h2>Контакты:</h2>
                    <div className="Footer__contactns">
                        <p>+7 (777) 490-00-91</p>
                        <p>время работы: 9:00-20:00</p>
                        <p>Заказать звонок</p>
                    </div>
                    <div className="Footer__contactns2">
                        <p>opt.sultan@mail.ru</p>
                        <p>На связи в любое время</p>
                    </div>

                    <div className="Footer__messanger">
                        <img src={visa}></img>
                        <img src={masterCard}></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation
