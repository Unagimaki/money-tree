import { useDispatch, useSelector } from 'react-redux'
import styles from './taskContainer.module.scss'
import { TaskItem } from './TaskItem/TaskItem'
import { sortByWinline } from '../../helpers/sortByWinline'
import { useEffect } from 'react'
import { actionAddNewOffer } from '../../../../state/reducers/offersReducer/actions'
import { offerData } from '../../services/newOfferData.js'

export const TaskContainer = () => {
    const offers = useSelector(state => state?.offers?.offers)
    const winlineSortedOffers = sortByWinline(offers)
    const dispatch = useDispatch()

    useEffect(() => {
        // Проверяем, есть ли уже объект с таким id в offers
        const offerExists = offers.some(offer => offer.id === offerData.id);

        if (!offerExists) {
            dispatch(actionAddNewOffer(offerData))
        }
    }, [winlineSortedOffers])


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
                                isNew={item?.isNew}
                                ticketReward={item?.ticketReward}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}