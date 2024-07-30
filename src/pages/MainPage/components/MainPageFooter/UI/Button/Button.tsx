import { Link } from 'react-router-dom'
import { FC } from 'react'
import styles from './button.module.scss'

interface ButtonProps {
    to: string;
    text: string;
  }

export const Button: FC<ButtonProps> = ({text, to}) => {
    return(
        <Link to={`${to}`} className={styles.button}>
            {text}
        </Link>

    )
}