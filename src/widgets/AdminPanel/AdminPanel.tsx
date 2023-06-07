import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addPost } from "../../app/Redux/Store/product"
import {
    DeleteCardApi,
    ICard,
    ICardData,
    SeacrchApi,
} from "../../shared/api/CardApi"
import Loader from "../../shared/UI/Loader/Loader"
import EditModal from "../../features/ModalAdd/EditModal"
import ModalAdd from "../../features/ModalAdd/ModalAdd"
import "../../pages/AdminPanel/AdminPanel.scss"
import useQuery from "../../shared/hooks/useQuery"
import { IRedux } from "../../app/Redux/Store/Index"
import Pagination from "../Pagination/Pagination"
import { useSearchParams } from "react-router-dom"

const AdminPanel = () => {
    const dispatch = useDispatch()
    const postPanel:ICard[] = useSelector((state: IRedux) => state.product.posts)
    const [idEdit, setIdEdit] = useState<number>(0)
    const [visible, setVisible] = useState<boolean>(false)
    const [oneData, setOneData] = useState<ICard>()
    const [loader, setLoader] = useState<boolean>(false)
    const [searchParams] = useSearchParams()

    const search = async () => {
        SeacrchApi(searchParams)
                .then((e: ICardData) => {
                    dispatch(addPost(e.data))
                    setLoader(false)
                })
                .catch(() => {
                    setLoader(false)
                })
    }

    const delte = (id: number) => {
        setLoader(true)
        DeleteCardApi(id).then(() => {
            search()
        })
    }
    useQuery({callback: addPost, request: search, dependencies: [searchParams]})

    return (
        <div className="AdminPanel">
            {loader && <Loader />}
            <ModalAdd />
            <EditModal
                visible={visible}
                data={oneData}
                setVisible={(bol: boolean) => setVisible(bol)}
                id={idEdit}
            />
            {postPanel?.map((panel: ICard) => (
                <div key={panel.id} className="AdminPanel__card">
                    <div className="AdminPanel__img">
                        <img src={panel.image?.[0]?.imgUrl} alt=""/>
                    </div>
                    <div className="AdminPanel__name">
                        <div className="Name">{panel.name}</div>
                        <div className="Carechteristics">
                            <p>Размер: {panel?.name}</p>
                            <p>Производитель: {panel?.manufacturer}</p>
                            <p>Размер: {panel.name}</p>
                            <p>Код: {panel?.code}</p>
                            <p>Бренд: {panel?.brand}</p>
                            <p>Размер: {panel?.size}</p>
                        </div>
                    </div>
                    <div className="AdminPanel__buttons">
                        <button onClick={() => delte(panel?.id || 0)}>
                            Удалить
                        </button>
                        <button
                            onClick={() => {
                                setVisible(true)
                                setIdEdit(panel?.id || 0)
                                setOneData(panel)
                            }}
                        >
                            Редактировать
                        </button>
                    </div>
                </div>
            ))}
            <Pagination/>
        </div>
    )
}

export default AdminPanel
