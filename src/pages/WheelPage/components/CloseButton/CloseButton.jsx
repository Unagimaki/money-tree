import styles from './closeButton.module.scss'
import { useNavigate } from 'react-router-dom';
import { PagesLinks } from '../../../../shared/PagesLinks';

export const CloseButton = () => {
    const navigate = useNavigate();

    const close_icon = require('../../assets/close_icon.png')
    return(
        <div onClick={() => navigate(PagesLinks.MAIN_URL)} className={styles.container}>
            <img src={close_icon} alt="close_icon" />
        </div>
    )
}