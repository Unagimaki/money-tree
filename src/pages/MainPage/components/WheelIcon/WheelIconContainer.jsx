import { useNavigate } from 'react-router-dom'
import styles from './wheelContainer.module.scss'
import { PagesLinks } from '../../../../shared/PagesLinks'

export const WheelIconContainer = () => {
    const navigate = useNavigate();
    const wheel_icon = require('../../assets/wheel_icon.png');

    return (
        <div className={styles.container} onClick={() => navigate(PagesLinks.WHEEL_URL)}>
            <img src={wheel_icon} alt="wheel_icon" />
        </div>
    );
};
