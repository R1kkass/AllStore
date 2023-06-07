import avatar from  "../../assets/Avatar.png"
import OrderCard from "../../features/PostCard/OrderCard"
import OrderList from "../../widgets/OrderList/OrderList";
import './Cabinet.scss';

const Cabinet = () => {
    document.title = "Кабинет"

    return(
        <div className="Cabinet">
            <div className="Cabinet__myProfile">
                <img src={avatar} alt="Аватар"/>
                    <p>Ваше имя:</p>
                    <p>Ваше фамилия:</p>
                    <p>Ваше отчесво:</p>
            </div>
            <div className="Cabinet__orders">
                <div className="TextCabinet">
                    <h3>Ваши заказы</h3>
                </div>
                <div className="BasketCabinet">
                        <OrderList/>
                    </div>
            </div>
            <div className="Cabinet__basket">
                <div className="TextCabinet">
                    <h3>Ваша корзина</h3>
                </div>
                <div className="BasketCabinet">
                    <OrderCard/>
                </div>
            </div>
        </div>   
    )
}

export default Cabinet