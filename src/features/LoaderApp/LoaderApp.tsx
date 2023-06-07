import { useSelector } from "react-redux"
import { getLoader } from "../../app/Redux/Store/loader"
import Loader from "../../shared/UI/Loader/Loader"

const LoaderApp = () => {
    const loader = useSelector(getLoader())
    
    return(
        <>
            {
                loader && <Loader/>
            }
        </>
    )
}

export default LoaderApp