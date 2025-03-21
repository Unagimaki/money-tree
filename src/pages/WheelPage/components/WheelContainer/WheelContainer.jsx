import styles from './wheelContainer.module.scss'

export const WheelContainer = () => {
    const wheel_image_blur = require('../../assets/wheel_image_blur.png')
    return(
        <div className={styles.container}>
            <img src={wheel_image_blur} alt="wheel_image_blur" />
        </div>
    )
}