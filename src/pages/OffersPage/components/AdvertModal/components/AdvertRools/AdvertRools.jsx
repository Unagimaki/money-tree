import styles from './advertRools.module.scss'

export const AdvertRools = () => { 
    return(
        <div className={styles.container}>
            <h1 className={styles.container_title}>Правила розыгрыша</h1>
            <div className={styles.container_list}>
                <li>Нажимай на кнопку “Привязать аккаунт”</li>
                <li>Для участия нужно сделать ставку на любое событие с коэффициентом от 1.3</li>
                <li>Чем больше ставок ты сделаешь, тем выше шанс победить</li>
                <li>Ставка должна быть рассчитана (продавать нельзя)</li>
                <br/>
                <li>Победитель выбирается случайным образом среди всех участников</li>
                <li>Розыгрыш продлится до 10 февраля</li>
            </div>
        </div>
    )
}