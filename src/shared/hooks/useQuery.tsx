import {useEffect} from "react"
import { useDispatch } from "react-redux"
import { loaderAction } from "../../app/Redux/Store/loader"
import { errorButtonAction } from "../../app/Redux/Store/errorButton"

interface IUseQuey {
    request: (arg?: any)=>Promise<any>
    callback: (e: any)=>any
    success?: string
    inLoad?: boolean
    dependencies?: any[]
}

interface IReturn{
    hook: ()=>void
}

const useQuery = ({request, callback, success, inLoad, dependencies}: IUseQuey):IReturn => {
    const dispatch = useDispatch()
    let count = 0
    function hook() {
        dispatch(loaderAction(true))
        request()
            .then((e)=> {
                dispatch(loaderAction(false))
                dispatch(callback(e.data || e)) 
                if(success){
                    dispatch(errorButtonAction({visible: true, type: "Success", text: success, id: Date.now()}))
                }
            })
            .catch((e)=>{
                dispatch(loaderAction(false))
                dispatch(errorButtonAction({visible: true, type: "Error", text: "Ошибка", id: Date.now()}))
            })
    }

    useEffect(()=> {
        if(!inLoad && dependencies){
            hook()
        }
    }, dependencies)

    useEffect(()=>{
        if(!inLoad && count===0){
            hook()
            count+=1
        }
    }, [])

        
        return {hook: hook}
}

export default useQuery