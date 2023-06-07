import { FC, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import {
    FilterApiPut,
    IFilterApi,
} from "../../shared/api/FilterApi"
import Modal from "../../shared/UI/Modal/Modal"
import "./EditModal.scss"

interface IModalEditPanel {
    visible: boolean
    setVisible: (bol: boolean) => void
    post?: Omit<IFilterApi, "registerInput">
    callback: () => void
}

const ModalEditPanel: FC<IModalEditPanel> = ({
    callback,
    post,
    visible,
    setVisible,
}) => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<IFilterApi>()

    const onSubmit = (data: IFilterApi) => {
        console.log(post)
        let dat = { ...data }
        FilterApiPut(Number(post?.id) || 0, dat).then((e) => {
            callback()
            setVisible(false)
        })
        .catch(e=>setError("registerInput", {message: "Ошибка", type: "custom"}))
    }

    return (
        <Modal visible={visible} callback={() => setVisible(false)}>
            <div className="ModalAdd__form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>
                            Название
                            <input
                                defaultValue={post?.nameCategory}
                                placeholder="Название категории"
                                {...register("nameCategory", {
                                    required: "⚠ Введите название категории",
                                    maxLength: 30,
                                })}
                            />
                        </label>
                        <p className="Error">{errors?.nameCategory?.message}</p>
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </Modal>
    )
}

export default ModalEditPanel
