import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AdminPanel from '../../widgets/AdminPanel/AdminPanel'
import EditPanel from '../../widgets/EditFiltres/EditPanel'
import './Admin.scss'
import NewsPanel from '../../widgets/NewsPanel/NewsPanel'
import OrderPanel from '../../widgets/OrdersPanel/OrdersPanel'

const elArr=[{
    id: 1,
    element: <AdminPanel/>
},
{
    id: 2,
    element: <EditPanel/>
},
{
    id: 3,
    element: <NewsPanel/>
},
{
    id: 4,
    element: <OrderPanel/>
}
]

const Admin = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [el, setEl] = useState<any>(null)

    const switchFn = (id: number)=>{
        let res = elArr.filter((el)=>{
            return el.id==id
        })
        setEl(res[0].element)
        searchParams.set('type', String(id))
        setSearchParams(searchParams)
    }

    useEffect(()=>{
        if(searchParams.get('type')){
            switchFn(Number(searchParams.get('type')))
        }
    },[])

    return (
        <div className="Admin">
            <div className="Admin__tabs">
                <div className={searchParams.get('type')=='1' ? 'Active' : ''} onClick={()=>switchFn(1)}>
                    <h3 >Продукты</h3>
                </div>
                <div className={searchParams.get('type')=='2' ? 'Active' : ''} onClick={()=>switchFn(2)}>
                    <h3>Категории</h3>
                </div>
                <div className={searchParams.get('type')=='3' ? 'Active' : ''} onClick={()=>switchFn(3)}>
                    <h3>Новости</h3>
                </div>
                <div className={searchParams.get('type')=='4' ? 'Active' : ''} onClick={()=>switchFn(4)}>
                    <h3>Заявки</h3>
                </div>
            </div>
            <div className='Admin__window'>
                {el}
            </div>
        </div>
    )
}

export default Admin
