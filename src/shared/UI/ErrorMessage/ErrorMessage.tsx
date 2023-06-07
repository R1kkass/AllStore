import { useDispatch, useSelector } from "react-redux";
import "./ErrorMessage.scss";
import React, { FC } from "react"
import { IVisib, deleteErrorAction, errorButtonAction, getAllError} from "../../../app/Redux/Store/errorButton";

interface IErrorMessageProps {
    error: IVisib
}

const ErrorMessage:FC<IErrorMessageProps> = ({error}) => {
    const dispatch = useDispatch();

    if(error.visible){
        return (
            <>
            <div className={error.type === "Error" ? "ErrorMessage" : "SuccesMessage"}>
                <div>{error.text}</div>
                <div onClick={()=>dispatch(deleteErrorAction(error.id))}>X</div>
            </div>
            </>
        )
    }
    return(
        <>
        </>
    )

}

export default ErrorMessage;
