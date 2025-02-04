import styles from './advertRools.module.scss'

export const AdvertRools = ({status, rules}) => { 
    return(
        <div className={styles.container}>
            {
                status === 'MADE_A_BET_STATUS' ? 
                <h1 className={styles.container_title}>
                    Вы участвуете <br/> в розыгрыше! 
                </h1> :
                <h1 className={styles.container_title}>
                    Правила розыгрыша
                </h1>

            }
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