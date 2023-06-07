import { FC } from "react"
import "./NewsCard.scss"
import { useDispatch } from "react-redux"

interface INewsCard{
    title: string
    body: string
    buttonDelete?: boolean
}

const NewsCard:FC<INewsCard> = ({title, body}) => {
    return (
        <div className="NewsCard">
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    )
}

export default NewsCard