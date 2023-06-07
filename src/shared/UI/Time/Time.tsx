import {useState, useEffect, memo} from 'react'

interface Time {
    date: string
    time: string
}

const Time = memo(() => {
    const [time, setTime] = useState<Time>()
    
    useEffect(()=>{
        let interval = setInterval(()=> {
            setTime({
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            })
        })
        return ()=>clearInterval(interval)
    },[])

    return (
        <>
            <div>
                {time?.date}
            </div>
            <div>
                {time?.time}
            </div>
        </>
    )
})

export default Time