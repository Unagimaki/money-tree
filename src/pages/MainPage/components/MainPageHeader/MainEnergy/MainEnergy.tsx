import { Link } from 'react-router-dom'
import './mainEnergy.css'

export const MainEnergy = () => {
    return(
        <Link className="main_energy_button" to={'/boosts'} >
            Energy: 100
        </Link>
    )
}