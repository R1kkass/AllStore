import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { filterPost } from "../../../app/Redux/Store/product"
import { FilterApi, IFilterApi } from "../../api/FilterApi"
import "./Filter.scss"

const Filter = () => {
    const [filtres, setFilter] = useState<IFilterApi[]>([])
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    const filterProductw = (param: string) => {
        let per = searchParams.get("param")
        if (per != param || !per) {
            searchParams.set("param", param)
            searchParams.set("page", "1")
            setSearchParams(searchParams)
        }
        dispatch(filterPost(searchParams))
    }

    useEffect(() => {
        FilterApi().then((e: IFilterApi[]) => {
            setFilter(e)
        })
    }, [])

    return (
        <div className="Filter">
            {filtres?.map(({ nameCategory, id }) => (
                <>
                    <div className="Filter__block">
                        <h3  className={
                            searchParams.get("param")?.includes(nameCategory)
                                ? "Filter__active"
                                : ""
                        } onClick={()=>filterProductw(nameCategory)}>{nameCategory}</h3>
                    </div>
                </>
            ))}
        </div>
    )
}

export default Filter
