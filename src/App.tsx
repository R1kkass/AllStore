import Routing from "./pages"
import "./app/Styles/GlobalStyles.scss"
import { Provider } from "react-redux"
import { store } from "./app/Redux/Store/Index"
import LoaderApp from "./features/LoaderApp/LoaderApp"
import ErrorList from "./widgets/ErrorList/ErrorList"
import { YMaps } from '@pbe/react-yandex-maps';

function App() {
    return (
        <Provider store={store}>
            <YMaps>
                    <Routing />
                    <ErrorList/>
                <LoaderApp/>
            </YMaps>
        </Provider>
    )
}

export default App
