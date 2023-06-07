import { useEffect, useRef, useState } from "react"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import Modal from "../../shared/UI/Modal/Modal"
import { useForm } from "react-hook-form"
import {
    AddCardApi,
    CardApi,
    ICard,
    ICardData,
    SeacrchApi,
} from "../../shared/api/CardApi"
import "./ModalAdd.scss"
import { useDispatch } from "react-redux"
import { addPost } from "../../app/Redux/Store/product"
import {
    FilterApi,
    IFilterApi,
} from "../../shared/api/FilterApi"
import { useSearchParams } from "react-router-dom"

const ModalAdd = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch()
    const [type, setType] = useState<string[]>([])
    const [filtres, setFilter] = useState<IFilterApi[]>([])
    const [searchParams, setSearchParams] = useSearchParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICard>()
    const onSubmit = (data: ICard) => {
        const obj = { ...data, type: type }
        AddCardApi(obj).then((e) => {
            setVisible((p) => !p)
            SeacrchApi(searchParams).then((e: ICardData) => {
                dispatch(addPost(e.data))
            })
        })
    }
    const refType = useRef<HTMLSelectElement>(null)

    const addType = () => {
        if (refType?.current?.value) {
            setType([...type, refType?.current?.value])
        }
    }

    useEffect(() => {
        FilterApi().then((e: IFilterApi[]) => {
            setFilter(e)
        })
    }, [])


    return (
        <>
            <MyButton
                onClick={() => {
                    setVisible((p) => !p)
                }}
            >
                Добавить продукт
            </MyButton>
            <Modal
                visible={visible}
                callback={() => {
                    setVisible((p) => !p)
                }}
            >
                <div className="ModalAdd__form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>
                                Название
                                <input
                                    placeholder="Название"
                                    {...register("name", {
                                        required: "⚠ Введите название",
                                        maxLength: 40,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.name?.message}</p>
                        </div>
                        <div>
                            <label>
                                Категории
                                <input
                                    placeholder="Категории"
                                    {...register("categories", {
                                        required: "⚠ Введите категорию",
                                        maxLength: 40,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.name?.message}</p>
                        </div>
                        <div>
                            <label>
                                Размер
                                <input
                                    placeholder="Размер"
                                    {...register("size", {
                                        required: "⚠ Введите размер",
                                        maxLength: 30,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.size?.message}</p>
                        </div>
                        <div>
                            <label>
                                Количество
                                <input
                                    placeholder="Количество"
                                    {...register("count", {
                                        required: "⚠ Введите количество",
                                        maxLength: 30,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.size?.message}</p>
                        </div>
                        <div>
                            <label>
                                Бренд
                                <input
                                    placeholder="Бренд"
                                    {...register("brand", {
                                        required: "⚠ Введите бренд",
                                        min: 3,
                                        max: 20,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.brand?.message}</p>
                        </div>
                        <div>
                            <label>
                                Штрихкод
                                <input
                                    placeholder="Шитрихкод"
                                    {...register("code", {
                                        required: "⚠ Введите штрихкод",
                                        min: 3,
                                        max: 20,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.code?.message}</p>
                        </div>
                        <div>
                            <label>
                                Производитель
                                <input
                                    placeholder="Производитель"
                                    {...register("manufacturer", {
                                        required: "⚠ Введите производитель",
                                        min: 5,
                                        max: 99,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.manufacturer?.message}</p>
                        </div>
                        <div>
                            <label>
                                Цена
                                <input
                                    type="number"
                                    placeholder="Цена"
                                    {...register("price", {
                                        required: "⚠ Введите цену",
                                        maxLength: 30,
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.price?.message}</p>
                        </div>
                        <div>
                            <label>
                                URL картинки
                                <input
                                    placeholder="URL картинки"
                                    type="file"
                                    multiple
                                    // accept=".jpg|.png|.jiff|.webp"
                                    {...register("images", {
                                        required: "⚠ Введите URL картинки",
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.imgUrl?.message}</p>
                        </div>
                        <div>
                            <label>
                                Описание
                                <input
                                    placeholder="Описание"
                                    {...register("description", {
                                        required: "⚠ Введите описание",
                                    })}
                                />
                            </label>
                            <p className="Error">{errors?.description?.message}</p>
                        </div>
                        {/* <div>
                            <label>
                                Тип
                                <select ref={refType}>
                                    {filtres?.map((filter) => (
                                        <option key={filter.id}>
                                            {filter.title}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <div className="EditModal__params">
                                {type.map((key, i) => (
                                    <div key={key}>
                                        <p>{key}</p>
                                        <button onClick={() => delte(i)}>
                                            Удалить
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {Object.keys(errors).length || type.length ? (
                            <span>Поля пусты</span>
                        ) : (
                            ""
                        )}
                        <button
                            onClick={(e) => {
                                addType()
                                e.preventDefault()
                            }}
                        >
                            Добавить в тип
                        </button> */}

                        <input type="submit" />
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default ModalAdd
