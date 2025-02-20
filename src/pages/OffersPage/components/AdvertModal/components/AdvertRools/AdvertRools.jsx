import styles from './advertRools.module.scss'
import { InfoItem } from './InfoItem/InfoItem'

export const AdvertRools = ({status, rules}) => { 
    const menu = require('../../../../assets/note.png')
    const people = require('../../../../assets/people.png')
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
                <div className={styles.container_list_info}>
                    <InfoItem text={'Победитель выбирается случайным образом среди всех участников'} img={people}/>
                    <InfoItem text={'Розыгрыш продлится до 20 марта'} img={menu}/>
                </div>
            </div>
        </div>
    )
}