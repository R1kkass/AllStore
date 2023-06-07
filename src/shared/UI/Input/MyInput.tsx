import { FC, forwardRef, useEffect } from "react"
import MyButton from "../Buttons/MyButton/MyButton"
import search from "../../../assets/Search/Search.svg"
import "./MyInput.scss"
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IMyButton {
    callback?: (e: any) => void;
    button?: boolean
    placeholder?: string
    register?: null | UseFormRegister<any> 
    validate?: any
    name?: string
    type?: string
    callbackBtn?: () => void
    defaultValue?: string | number
}


export type Ref = HTMLInputElement;

const MyInput = forwardRef<Ref, IMyButton>((props, ref) => {

    const fn = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(props.callback){
            props.callback(e.target.value)
        }
    }

    if(!props.button) {
        return (
            <div className="MyInput">
                <input
                    defaultValue={props.defaultValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>fn(e)}
                    placeholder={props.placeholder || "Поиск"}
                    ref={ref}
                />
                <MyButton onClick={props.callbackBtn}>
                    <img src={search} alt=""/>
                </MyButton>
            </div>
        )
    }
    if(props.register && props.validate){

        return (
            <div className="MyInput">
                <input
                    defaultValue={props.defaultValue}
                    placeholder={props.placeholder || "Поиск"}
                    type={props.type || "text"}
                    {...props}
                    {...props.register(props.name || "", props.validate)}
                />
            </div>
        )
    }
    return<></>
})

export default MyInput
