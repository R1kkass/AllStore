import {FC, useState} from "react"
import './Slider.scss'
import { IImgMock } from "../../../pages/Home/Home"

interface ISlider{ 
    image?: IImgMock[]
    withBlock: boolean
    children?: React.ReactNode
}


const Slider:FC<ISlider> = ({image, withBlock, children}) => {

    const [left, setLeft] = useState<number>(0)
    let mouseDown:number | undefined


    const moveSlider = (amount: number) =>{
        if((Number(image?.length)-1)*100*-1>=left){
            setLeft(0)
        }else{
            setLeft(left=>left+100*-1)
        }
    }

    const movePrev = () =>{
        if(0<=left){
            setLeft((Number(image?.length)-1)*100*-1)
        }else{
            setLeft(left=>left+100)
        }
    }

    const moveTouchScreen = (e:React.TouchEvent<HTMLDivElement>) => {
        if(!(Number(mouseDown)===e.changedTouches[0].screenX)){
            if(Number(mouseDown)<e.changedTouches[0].screenX){
                movePrev()
            }else{
                moveSlider(100)
            }
        }
        
    }

    return(
        <>
            <div 
                className="Slider" 
                onTouchStart={(e)=>mouseDown = e.changedTouches[0].screenX}
                onTouchEnd={(e)=>moveTouchScreen(e)}    
            >
                <div className="Slider__content" style={{left: left+"%"}}>
                    {image?.map(img=>(
                        <img src={img.imgUrl} key={img.id} alt=""/>
                    ))}
                </div>
                <div className="Slider__text">
                    {children}
                </div>
                <button onClick={()=>movePrev()} className="Prev"></button>
                <button onClick={()=>moveSlider(-100)} className="Next"></button>
            </div>
            {withBlock
            ?
            <div className="ImageSlider">
                {image?.map((img, index)=>(
                    <div className="" key={img.id} onClick={()=>setLeft(index*100*-1)}>
                        <img src={img.imgUrl} alt=""/>
                    </div>
                ))}
            </div>
            :
            <></>
            }
            
        </>
    )
}

export default Slider