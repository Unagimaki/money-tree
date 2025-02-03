import styles from './advertRools.module.scss'

export const AdvertRools = ({rules}) => { 
    return(
        <div className={styles.container}>
            <h1 className={styles.container_title}>Правила розыгрыша</h1>
            <div className={styles.container_list}>
                {
                    rules && rules.map((item, index) => {
                        return <li key={index}>
                            {item}
                        </li>
                    })
                }
                <br/>
                <li>Победитель выбирается случайным образом среди всех участников</li>
                <li>Розыгрыш продлится до 10 февраля</li>
            </div>
        </div>
    )
}