import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { filterPost } from "../../app/Redux/Store/product"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import CheckBox from "../../shared/UI/CheckBox/CheckBox"
import FilterUnitBlock from "../../shared/UI/FilterUnitBlock/FilterInitBlock"
import MyInput from "../../shared/UI/Input/MyInput"
import deletes from "../../shared/UI/SVG/Delete/Delete.svg"
import Toggle from "../../shared/UI/Toggle/Toggle"
import Price from "../Price/Price"
import { FilterApi, IFilterApi } from "../../shared/api/FilterApi"

export type IManufac = {
    name: string
    count: string
}


const FilterBlock = () => {
    const [manuf, setManuf] = useState<IFilterApi[] | undefined>([])

    const [searchPrams, setSearchParams] = useSearchParams()

    const dispatch = useDispatch()

    const [filtres, setFiltres] = useState<IFilterApi[]>()

    useEffect(()=>{
        FilterApi()
            .then(e=>setFiltres(e))
    },[])
    

    const changeMan = (value: any) => {
        setManuf(
            filtres?.filter((e) => {
                return e?.nameCategory?.toLowerCase().includes(value)
            })
        )
    }

    const pushMan = () =>{

    }

    useEffect(() => {
        dispatch(filterPost(searchPrams))
    }, [searchPrams])

    return (
        <>
            <div className="LeftBlockCatalog__text">
                <h4>ПОДБОР ПО ПАРАМЕТРАМ</h4>
            </div>
            <div className="LeftBlockCatalog__price">
                <p>Цена</p>
            </div>
            <Price />
            <div className="LeftBlockCatalog__text">
                <h4>Производитель</h4>
            </div>
            <div className="LeftBlockCatalog__input">
                <MyInput callback={changeMan} />
                <FilterUnitBlock typeParam='manufParam' manuf={manuf} callback={pushMan}/>
            </div>
        </>
    )
}

export default FilterBlock
