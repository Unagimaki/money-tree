import { useSelector } from 'react-redux'
import styles from './taskContainer.module.scss'
import { TaskItem } from './TaskItem/TaskItem'
import { sortByWinline } from '../../helpers/sortByWinline'

export const TaskContainer = () => {
    const offers = useSelector(state => state?.offers?.offers)
    const winlineSortedOffers = sortByWinline(offers)
    return(
        <div className={styles.container}>
            <div className={styles.container_title}>
                Задания
            </div>
            <div className={styles.container_tasks_wrapper}>
                <div className={styles.container_tasks_wrapper_list}>
                    {
                        winlineSortedOffers?.map(item => {
                            return <TaskItem
                                id={item.id}
                                description={item.description}
                                isCompleted={item.isCompleted}
                                reward={item.reward}
                                terms={item.terms}
                                title={item.title}
                                imgUrl={item.media.fileId}
                                key={item.id}
                                count={item.count}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}