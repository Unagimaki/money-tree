import './mainPageFooter.css'
import { Button } from './UI/Button/Button'

export const MainPageFooter = () => {
    const buttons = [
        {
            name: 'Бусты',
            link: '/boosts'
        },
        {
            name: 'Магазин',
            link: '/shop'
        },
        {
            name: 'Сатитистика',
            link: '/stats'
        },
        {
            name: 'Бонусы',
            link: '/bonus'
        },
    ]
    return(
        <div className="main_footer">
            {
                buttons.map((item, index) => {
                    return <Button key={index} text={item.name} to={item.link}/>
                })
            }

        </div>
    )
}