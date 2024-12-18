import styles from './statItem.module.scss'

const StatItem = ({type, img, count, text, maxEnergy, onDamageModalShow}) => {    
    const info_icon = require('../assets/info_icon.png')

    return(
        <div  onClick={() => onDamageModalShow(type)} className={styles.item}>
            <img className={styles.item_img} src={img} alt="icon" />
            <div style={{paddingLeft: type === 'damage' ? 'min(11.18vw, 41.92px)' : 'min(9.18vw, 34.42px)'}} className={styles.item_container}>
                <div className={styles.item_container_inner}>
                    <div className={styles.item_container_inner_title}>
                        <div className={styles.item_container_inner_title_text}>{text}</div>
                        <img className={styles.item_container_inner_title_icon} src={info_icon} alt="info_icon" />
                    </div>
                    <div className={styles.item_container_inner_count}> {parseInt(count)}</div>                    
                </div>
            </div>
        </div>
    )
}

export default StatItem