import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import MyInput from "../../shared/UI/Input/MyInput"
import { useRef } from "react"

const SearchHeader = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const searchRef = useRef<HTMLInputElement>(null) 
    const navigate = useNavigate()
    const location = useLocation()

    const search = async () => {
        if(location.pathname!=="/"){
            navigate('/catalog?search=' + String(searchRef.current?.value))            
        }else{
            searchParams.set('search', String(searchRef.current?.value))
            setSearchParams(searchParams)
        }
    }

    return (
        <>
            <MyInput ref={searchRef} callbackBtn={search}/>
        </>
    )
}

export default SearchHeader