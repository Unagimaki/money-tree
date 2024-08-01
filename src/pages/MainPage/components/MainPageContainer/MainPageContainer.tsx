import { Link } from "react-router-dom"
import styles from './mainPageContainer.module.scss'
import { MainTree } from "./MainTreeContainer/MainTree"


export const MainPageContainer = () => {
    return(
        <div className={styles.main_container}>
            <Link to={"/game"}>
                <MainTree/>
            </Link>
        </div>
    )
}