import { useSelector } from "react-redux"
import { getAllError } from "../../app/Redux/Store/errorButton"
import ErrorMessage from "../../shared/UI/ErrorMessage/ErrorMessage"

import './ErrorList.scss'

const ErrorList = () => {
    const errors = useSelector(getAllError())
    
    return(
        <div className="ErrorList">
            {
                errors.map(error => (
                    <ErrorMessage key={error.id} error={error}/>
                ))
            }
        </div>
    )
}

export default ErrorList