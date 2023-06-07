import { Map, Placemark } from "@pbe/react-yandex-maps"
import PostCard from "../../features/PostCard/PostCard"
import Slider from "../../shared/UI/Slider/Slider"
import './Home.scss'

export interface IImgMock {
    id: number
    imgUrl: string
}

const img:IImgMock[] = [
    {
        id: 1,
        imgUrl: "https://arzmoto.ru/files/img/slide.jpg"
    },
    {
        id: 2,
        imgUrl: "https://arzmoto.ru/files/img/slide1.png"
    }
]

const Home = () => {
    document.title="Главная"
    return(
        <div className="Home">
            <Slider withBlock={false} image={img}>
            </Slider>
            <div  className="Home__cards">
                <h1><span>Акционные</span> товары</h1>
                <div className="Home__cardList">
                    <PostCard/>
                </div>
            </div>
            <div className="Home__map">
                <Map 
                    width={"75vw"}
                    height={"40vw"} 
                    modules={["control.ZoomControl", "control.FullscreenControl"]}
                    defaultState={{ center: [55.400808, 43.820359], zoom: 17 }} >
                    <Placemark defaultGeometry={[55.400808, 43.820359]}
                        properties={{
                            balloonContentBody:
                            "This is balloon loaded by the Yandex.Maps API module system",
                        }}
                    />
                </Map>
            </div>
        </div>
    )
}

export default Home