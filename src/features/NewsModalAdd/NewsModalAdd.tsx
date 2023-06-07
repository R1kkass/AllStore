import { FC } from "react"
import Modal from "../../shared/UI/Modal/Modal"
import { useForm } from "react-hook-form"
import { INews, NewsCreateApi } from "../../shared/api/NewsApi"
import { useDispatch } from "react-redux"
import { newsAction } from "../../app/Redux/Store/newsPanel"
import { errorButtonAction } from "../../app/Redux/Store/errorButton"

interface INewsModal{
    visible: boolean,
    callback: ()=>void
}

const NewsModalAdd:FC<INewsModal> = ({visible, callback}) => {
    const dispatch = useDispatch()
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<INews>()
    const onSubmit = (data: INews) => {
        NewsCreateApi(data)
            .then(e => {
                dispatch(newsAction(e))
            })
            .catch(e=>{
                dispatch(errorButtonAction({visible: true, id: Date.now(), type: 'Error', text: "Ошибка"}))
            })
    }
    
    return (
        <Modal visible={visible} callback={callback}>
            <div className="NewsModalAdd">
            <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>
                                Название
                                <input
                                    placeholder="Название новости"
                                    {...register("title", {
                                        required: "⚠ Введите название новости",
                                        maxLength: 30,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.title?.message}</p>
                        </div>
                        <div>
                            <label>
                                Текст
                                <input
                                    placeholder="Текст новости"
                                    {...register("body", {
                                        required: "⚠ Введите текст новости",
                                        maxLength: 30,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.body?.message}</p>
                        </div>
                        <input type="submit" />
                    </form>
            </div>
        </Modal>
    )
}

export default NewsModalAdd