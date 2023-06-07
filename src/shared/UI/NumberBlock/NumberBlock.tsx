import "./NumberBlock.scss"
import {FC} from "react"

interface INumberBlock {
    number: React.ReactNode | string;
    text: string
}

const NumberBlock:FC<INumberBlock> = ({number, text}) => {
    return(
        <div className="NumberBlock">
            <div>{number}</div>
            <p>{text}</p>
        </div>
    )
}

export default NumberBlock;
