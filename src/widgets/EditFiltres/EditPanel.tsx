import { useEffect, useState } from "react"
import {
    FilterApi,
    FilterApiDelte,
    IFilterApi,
    IFilterApiData,
} from "../../shared/api/FilterApi"
import Loader from "../../shared/UI/Loader/Loader"
import ModalAddFilter from "../ModalFilterEdit/ModalAddFilter"
import "../../pages/AdminPanel/AdminPanel.scss"
import ModalEditPanel from "../ModalEditPanel/ModalEditPanel"
import { errorButtonAction } from "../../app/Redux/Store/errorButton"
import { useDispatch } from "react-redux"

const EditPanel = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [oneData, setOneData] = useState<Omit<IFilterApi, "registerInput">>()
    const [loader, setLoader] = useState<boolean>(false)
    const [filtres, setFiltres] = useState<IFilterApi[]>([])
    const dispatch =useDispatch()

    const delte = (id: number) => {
        setLoader(true)
        FilterApiDelte(id).then(() => {
            FilterApi()
                .then((e: IFilterApi[]) => {
                    setFiltres(e)
                    setLoader(false)
                })
                .catch(() => {
                    setLoader(false)
                })
        })
    }

    const fetchFilter = () => {
        setLoader(true)
        FilterApi()
            .then((e: IFilterApi[]) => {
                setFiltres(e)
                setLoader(false)
            })
            .catch(() => {
                setLoader(false)
            })
    }

    useEffect(() => {
        setLoader(true)
        FilterApi()
            .then((e: IFilterApi[]) => {
                setFiltres(e)
                setLoader(false)
            })
            .catch(() => {
                setLoader(false)
                dispatch(errorButtonAction({visible: true, type: "Error", text: "Вы не авторизованы", id: Date.now()}))
            })
    }, [])

    return (
        <div className="AdminPanel">
            {loader && <Loader />}
            <ModalAddFilter callback={fetchFilter} />
            <ModalEditPanel
                callback={fetchFilter}
                post={oneData}
                visible={visible}
                setVisible={() => setVisible(false)}
            />
            <div className="Filter">
                {filtres?.map(({ nameCategory, id }) => (
                    <>
                        <div className="Filter__block">
                            <div className="Filter__delete">
                                <h3>{nameCategory}</h3>
                                <div>
                                    {" "}
                                    <button
                                        onClick={() => delte(Number(id) || 0)}
                                    >
                                        Удалить фильтер
                                    </button>
                                    <button
                                        onClick={() => {
                                            setVisible(true)
                                            setOneData({ nameCategory, id })
                                        }}
                                    >
                                        Редактировать фильтер
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default EditPanel
