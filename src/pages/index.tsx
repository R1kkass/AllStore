import { Route, Routes, HashRouter } from "react-router-dom"
import Navigation from "../widgets/Navigation/Navigation"
import EditPanel from "../widgets/EditFiltres/EditPanel"
import Basket from "./Basket/Basket"
import Main from "./Catalog/Catalog"
import Product from "./Product/Product"
import Admin from "./AdminPanel/Admin"
import Login from "./Auth/Login"
import Registration from "./Auth/Registration"
import RefreshProvider from "../app/Providers/RefreshProvider"
import Order from "./Order/Order"
import Cabinet from "./Cabinet/Cabinet"
import NewsPage from "./NewsPage/NewsPage"
import Home from "./Home/Home"

const Routing = () => {
    return (
        <HashRouter>
            <Navigation>
            <RefreshProvider>

                <Routes>
                        <Route path="/order" element={<Order/>} />
                        <Route path="/basket" element={<Basket />} />
                        <Route path="/cabinet" element={<Cabinet />} />
                        <Route path="/catalog" element={<Main />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/adm" element={<Admin />} />
                        <Route path="/editfilter" element={<EditPanel />} />
                        <Route path="*" element={<h2>404</h2>} />
                        <Route path="/" element={<Home/>} />
                        <Route path="/auth/login" element={<Login/>} />
                        <Route path="/auth/registration" element={<Registration/>} />
                        <Route path="/news" element={<NewsPage/>} />
                </Routes>
                </RefreshProvider>
            </Navigation>
        </HashRouter>
    )
}

export default Routing
