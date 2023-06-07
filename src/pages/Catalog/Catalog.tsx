import "./Catalog.scss"

import rows from "../../assets/TypeRender/Rows.svg"
import block from "../../assets/TypeRender/Block.svg"
import LeftBlockCatalog from "../../widgets/LeftBlockCatalog/LeftBlockCatalog"
import PostCard from "../../features/PostCard/PostCard"
import Breadcrumbs from "../../features/BreadCrumbs/BreadCrumbs"
import Sort from "../../widgets/Sort/Sort"
import FilterTop from "../../shared/UI/Filter/FilterTop"
import Pagination from "../../widgets/Pagination/Pagination"

const Catalog = () => {
    document.title = "Каталог"

    return (
        <div className="Catalog">
            <div className="Catalog__broadCrumbs">
                <Breadcrumbs 
                    arr={[{ name: "Главная", link: "/" }]}
                />
            </div>
            <div className="Catalog__secondLine">
                <div className="Catalog__sort">
                    <div>
                        <Sort />
                    </div>
                    <div className="Catalog__toggle">
                        <button>
                            <img src={rows} alt=""/>
                        </button>
                        <button>
                            <img src={block} alt=""/>
                        </button>
                    </div>
                </div>
            </div>
            <FilterTop />
            <div className="Catalog__main">
                <div className="Catalog__sortParams">
                    <LeftBlockCatalog />
                </div>
                <div className="Catalog__product">
                    <PostCard />
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default Catalog
