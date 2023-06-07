import { FC, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import './Modal.scss'

const Modal: FC<{
    children: React.ReactNode
    visible: boolean
    callback: () => void
}> = ({ visible, children, callback }) => {

    useEffect(()=>{
        if(visible) {
            document.body.style.overflow="hidden"
        }else{
            document.body.style.overflow="auto"
        }
    },[visible])

    return (
        
        <>
        {visible ? 
        createPortal(
            <div className="Modal" onClick={callback}>
            <div className="Modal__content" onClick={(e:React.MouseEvent)=>e.stopPropagation()}>{children}</div>
        </div>,
            document.body
        )
        :''
        }
        </>
    )
}

export default Modal
