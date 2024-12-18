import { useEffect, useState } from 'react'
import styles from './treeModule.module.scss'

export const TreeModule = ({shop, state}) => {  
    const [isLoading, setIsLoading] = useState(true)

    const damage = state.shop.find(item => item.shopItem.itemType === 'DAMAGE').currentLevel
    const energy = state.shop.find(item => item.shopItem.itemType === 'ENERGY').currentLevel

    const energyImage = energy > 0 ? require(`./assets/energy/${energy}.png`) : null;  
    const damageImage = damage > 0 ? require(`./assets/damage/${damage}.png`) : null;  

    const damageClassName = styles[`container_damageImage_${damage}`];
    const tree_background = require('./assets/tree.png')


    useEffect(() => {
        const img = new Image();
        img.src = tree_background;
        img.onload = () =>{
            setIsLoading(false)
        }
        img.onerror = () => setIsLoading(false)
    }, [tree_background]);

    if (Object.keys(shop).length === 0) return null

    return(
        <div className={styles.container} >
            {
            !isLoading &&
            <div
                style={{ backgroundImage: `url(${tree_background})` }}
                className={styles.container_tree}
                >
                {
                    damageImage && <img className={damageClassName} src={damageImage} alt='img'/>
                }
            </div>
            }

            {
                energyImage && <img className={styles.container_energyImage} src={energyImage} alt='img'/>
            }
        </div>
    )
}