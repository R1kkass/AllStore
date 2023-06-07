import { FC, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { ICardApi } from "../../shared/api/CardApi"
import {
    FilterApi,
    FilterApiPost,
    IArray,
    IFilterApi,
    IFilterApiData,
} from "../../shared/api/FilterApi"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import Modal from "../../shared/UI/Modal/Modal"

const ModalAddFilter: FC<{ callback: () => void }> = ({ callback }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [paramFilter, setParamFilter] = useState<IArray[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<IFilterApi>()
    const onSubmit = (data: IFilterApi) => {
        console.log(data);
        
        FilterApiPost(data).then((e) => {
            setVisible(false)
            callback()
            setParamFilter([])
        })
        .catch(e=>setError("registerInput", {message: "⚠ Ошибка"}))
    }

    return (
        <>
            <MyButton onClick={() => setVisible(true)}>
                Добавить фильтер
            </MyButton>
            <Modal visible={visible} callback={() => setVisible(false)}>
                <div className="ModalAdd__form">
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>
                                Название
                                <input
                                    placeholder="Название"
                                    {...register("nameCategory", {
                                        required: "⚠ Введите название",
                                        maxLength: 40,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.nameCategory?.message}</p>
                        </div>
                        <input type="submit" />
                        <p className="Error Message">{errors.registerInput?.message}</p>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default ModalAddFilter
