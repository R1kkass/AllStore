import { useSelector } from "react-redux"
import NewsCard from "../NewsCard/NewsCard"
import { getNews } from "../../app/Redux/Store/newsPanel"
import DeleteNewsButton from "../DeleteNewsButton/DeleteNewsButton"
import { FC } from "react"

interface INewsList{
    admin?: boolean
}

const NewsList:FC<INewsList> = ({admin}) => {
    const news = useSelector(getNews())

    return (
        <>
            {news?.map(newss => (
                <div key={newss.id}>
                    <NewsCard title={newss.title} body={newss.body}/>
                    {admin ? <DeleteNewsButton id={newss.id}/> : ""}
                </div>
            ))}
        </>
    )
}

export default NewsList