import { Fragment, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/exports"
import { useSearchParams } from "react-router-dom"
import { IRedux } from "../../app/Redux/Store/Index"
import { addPost } from "../../app/Redux/Store/product"
import { ICard, SeacrchApi } from "../../shared/api/CardApi"
import Card from "../../entities/Card/Card"

const PostCard = () => {
    const dispatch = useDispatch()
    const post: ICard[] = useSelector((state: IRedux) => state.product.posts)
    const [searchPrams, setSearchParams] = useSearchParams()

    useEffect(()=>{
        SeacrchApi(searchPrams)
            .then(e=>{
                dispatch(addPost(e.data)) 
            })

        }, [searchPrams])
    
    if (!post?.length) {
        return <h1>Пусто</h1>
    }

    return (
        <>
            {post?.map(
                ({
                    id,
                    name,
                    price,
                    manufacturer,
                    code,
                    brand,
                    size,
                    image,
                }) => (
                    <Fragment key={id}>
                        <Card
                            id={id}
                            imgUrl={image?.[0]?.imgUrl || ""}
                            name={name}
                            price={price}
                            manufacturer={manufacturer}
                            code={code}
                            brand={brand}
                            size={size}
                        />
                    </Fragment>
                )
            )}
        </>
    )
}

export default PostCard
