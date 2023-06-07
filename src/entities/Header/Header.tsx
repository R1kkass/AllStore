import { Link, useLocation } from "react-router-dom"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import Counter from "../../features/Counter/Counter"
import address from "../../assets/Address/Address.svg"
import email from "../../assets/Email/Email.svg"
import logo from "../../assets/Logo/Logo.svg"
import catalog from "../../assets/Catalog/Catalog.svg"
import download from "../../assets/Download/Download.svg"
import baskets from "../../assets/Basket/Basket.svg"
import { IRedux } from "../../app/Redux/Store/Index"
import { useSelector } from "react-redux"
import SearchHeader from "../SearchHeader/SearchHeader"
import { useState, useEffect } from "react"
import { IWeatherApi, WeaterApi } from "../../shared/api/WeatherApi"
import Time from "../../shared/UI/Time/Time"
import './Header.scss'


const Header = () => {
    const counts = useSelector((state: IRedux) => state.basket.count)
    const [weather, setWeather] = useState<IWeatherApi>()
    const location = useLocation()
    
    useEffect(()=>{
        WeaterApi()
            .then(e=>setWeather(e))
    }, [location])



    return(
                <div className="Navigation">
                    <div className="Navigation__firstLine">
                        <div className="Navigation__container">
                            <div className="Navigation__address">
                                <img src={address} alt=""/>
                                <div>
                                    <p>г. Арзамас, ул. Жуковского 2</p>
                                </div>
                            </div>
                            <div className="Navigation__email">
                                <img src={email} alt=""/>
                                <div>
                                    <p>arzmoto@mail.ru</p>
                                    <p>На связи в любое время</p>
                                </div>
                            </div>
                        </div>
                        <div className="Navigation__navBar">
                            <div>
                                <p><Link to="/news">Новости</Link></p>
                            </div>
                            <div>
                                {localStorage.getItem('token') ? <p onClick={()=>localStorage.removeItem('token')}>Выйти</p> : <p>Доставка и оплата</p> }
                                
                            </div>
                            <div>
                                <p><Link to="/auth/login">Авторизация</Link></p>
                            </div>
                            <div>
                                <p><Link to="/cabinet">Кабинет</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="Navigation__secondLine">
                        <Link to="/">
                            <img src={logo} alt=""/>
                        </Link>
                        <Link to="/catalog">
                            <div className="SecondLine__button">
                                <MyButton>
                                    Каталог
                                    <img src={catalog} alt="" />
                                </MyButton>
                            </div>
                        </Link>

                        <div className="SecondLine__search">
                            <SearchHeader />
                        </div>
                        <div className="Weather">
                                {Math.floor(Number(weather?.main.temp)-273.15)}°C
                        </div>
                        <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt=""/>
                        <div className="Time">
                            <Time/>
                        </div>
                        <div>
                            <MyButton>
                                Прайс-лист
                                <img src={download} alt=""/>
                            </MyButton>
                        </div>
                        <Link to="/basket">
                            <div className="SecondLine__basket">
                                <img src={baskets}  alt=""/>
                                <div className="dottedBasket">
                                    <p>{counts}</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/basket">
                            <div className="SecondLine__price">
                                <p>Корзина</p>
                                    <Counter/>
                            </div>
                        </Link>
                    </div>
                </div>
    )
}

export default Header