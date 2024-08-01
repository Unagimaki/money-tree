import { Link } from 'react-router-dom'
import { FC } from 'react'
import styles from './button.module.scss'

interface ButtonProps {
    to: string
    text: string
    img: string
    current_url: string
  }

export const Button: FC<ButtonProps> = ({text, to, img, current_url}) => {
    return(
        <Link to={`${to}`} className={styles.button}>
            
            <img className={styles.button_img} src={img} alt={text} />
            <div style={{color: `${current_url === to ? '#8CDB4E' : '#fff'}`}} className={styles.button_text}>
                {text}
            </div>
            
        </Link>

    )
}