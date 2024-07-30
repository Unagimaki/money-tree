import { Link } from 'react-router-dom'
import './mainDamage.css'

export const MainDamage = () => {
    return(
        <Link className='main_damage_button' to={'/boosts'}>
            Damage: 5
        </Link>
    )
}