import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { filterPost } from "../../../app/Redux/Store/product"
import { FilterApi, IFilterApi } from "../../api/FilterApi"
import "./Filter.scss"


const FilterTop = () => {
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
            let per = searchParams.get("param")
            if (per) {
                filterProductw(per)
            }
        })
    }, [])

    return (
        <div className="Catalog__thirdLine">
            {filtres?.map(({ nameCategory, id }) => (
                <>
                    <div
                        className={
                            searchParams.get("param")?.includes(nameCategory)
                                ? "Catalog__active"
                                : ""
                        }
                        key={id}
                        onClick={() => filterProductw(nameCategory)}
                    >
                        <p>{nameCategory}</p>
                    </div>
                </>
            ))}
        </div>
    )
}

export default FilterTop
