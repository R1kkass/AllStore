import { FC } from "react"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import { NewsDeleteApi } from "../../shared/api/NewsApi"
import { newsAction } from "../../app/Redux/Store/newsPanel"
import useQuery from "../../shared/hooks/useQuery"

interface IDeleteButton {
    id: number
}

const DeleteNewsButton:FC<IDeleteButton> = ({id}) => {
    
    const fn = () => NewsDeleteApi(id)

    const {hook} = useQuery({request: fn, callback: newsAction, inLoad: true, success: "Новость удалена"})

    return(
        <MyButton onClick={hook}>Удалить</MyButton>
    )
}

export default DeleteNewsButton