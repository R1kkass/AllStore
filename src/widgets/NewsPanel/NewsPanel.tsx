import { useState } from "react"
import NewsModalAdd from "../../features/NewsModalAdd/NewsModalAdd"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import useQuery from "../../shared/hooks/useQuery"
import { NewsApi } from "../../shared/api/NewsApi"
import { newsAction } from "../../app/Redux/Store/newsPanel"
import NewsList from "../../entities/NewsList/NewsList"
import './NewsPanel.scss';

const NewsPanel = () => {
    const [visible, setVisible] = useState(false)
    useQuery({request: NewsApi, callback: newsAction})

    return (
        <div className="NewsPanel">
            <MyButton onClick={()=>setVisible(true)}>Создать новость</MyButton>
            <NewsModalAdd visible={visible} callback={()=>setVisible(false)}/>
            <NewsList admin={true}/>
        </div>
    )
}

export default NewsPanel