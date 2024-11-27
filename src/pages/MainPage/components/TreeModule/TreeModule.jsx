import { useEffect, useState } from 'react'
import styles from './treeModule.module.scss'
import { Helmet } from 'react-helmet'

export const TreeModule = ({state}) => {  
    const tree_background = require('./assets/tree.png')
    const damage = state && state?.shop?.find(item => item.shopItem.itemType === 'DAMAGE').currentLevel
    const energy = state && state?.shop?.find(item => item.shopItem.itemType === 'ENERGY').currentLevel
    const regen = state && state?.shop?.find(item => item.shopItem.itemType === 'REGENERATION').currentLevel

    const regenImage = regen > 0 ? require(`./assets/regen/${regen}.png`) : null;  
    const energyImage = energy > 0 ? require(`./assets/energy/${energy}.png`) : null;  
    const damageImage = damage > 0 ? require(`./assets/damage/${damage}.png`) : null;  

    const regenClassName = styles[`container_regenImage_${regen}`];
    const damageClassName = styles[`container_damageImage_${damage}`];

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const img = new Image();
        img.src = tree_background;
        img.onload = () =>{
            setIsLoading(false)
        }
        img.onerror = () => setIsLoading(false)
    }, [tree_background]);

    return(
        <div className={styles.container} >
            {
            !isLoading &&
            <div
                style={{ backgroundImage: `url(${tree_background})` }}
                className={styles.container_tree}
                >
                {
                    regenImage && <img className={regenClassName} src={regenImage} alt='img'/>
                }
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