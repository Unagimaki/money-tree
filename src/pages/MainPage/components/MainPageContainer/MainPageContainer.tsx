import { Link } from "react-router-dom"
import { MainTree } from "./components/MainTree"
import './mainPageContainer.css'


export const MainPageContainer = () => {
    return(
        <div className="main_container">
            <Link to={"/game"}>
                <MainTree />
            </Link>
        </div>
    )
}