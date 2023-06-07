import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { IRedux } from "../../app/Redux/Store/Index"
import { addPost } from "../../app/Redux/Store/product"
import { ICardApi } from "../../shared/api/CardApi"
import "./Sort.scss"

const url = new URLSearchParams(window.location.search)

const Sort = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [sortType, setSortType] = useState<string>(
        searchParams.get("sort") || "По умолчанию"
    )
    const [visible, setVisble] = useState<boolean>(false)

    const sortProduct = (type: string, column: string, order: string) => {
        setSortType(type)
        searchParams.set('order', order)
        searchParams.set('column', column)
        setSearchParams(searchParams)
    }

    return (
        <div className="Sort">
            <p>
                Сортировка:{" "}
                <span onClick={() => setVisble((p) => !p)}>{sortType}</span>
            </p>
            {visible && (
                <div className="Sort__toggle">
                    <p
                        onClick={() => {
                            sortProduct("По убыванию цены", "price", "DESC")
                        }}
                    >
                        По убыванию цены
                    </p>
                    <p
                        onClick={() => {
                            sortProduct("По возрастанию цены", "price", "ASC")
                        }}
                    >
                        По возрастанию цены
                    </p>
                    <p
                        onClick={() => {
                            sortProduct("По навзванию (А-Я)", "name", "ASC")
                        }}
                    >
                        По навзванию (А-Я)
                    </p>
                    <p
                        onClick={() => {
                            sortProduct("По названию (Я-А)", "name", "DESC")
                        }}
                    >
                        По названию (Я-А)
                    </p>
                </div>
            )}
        </div>
    )
}

export default Sort
