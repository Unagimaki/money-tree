import { useEffect, useState } from 'react'
import styles from './treeModule.module.scss'

export const TreeModule = ({shop, state}) => {  
    const [isLoading, setIsLoading] = useState(true)

    const damage = state.shop.find(item => item.shopItem.itemType === 'DAMAGE').currentLevel
    const regen = state.shop.find(item => item.shopItem.itemType === 'REGENERATION').currentLevel

    const regenImage = regen > 0 ? require(`./assets/regen/${regen}.png`) : null;  
    const damageImage = damage > 0 ? require(`./assets/damage/${damage}.png`) : null;  

    const damageClassName = styles[`container_damageImage_${damage}`];
    const regenClassName = styles[`container_regenImage_${regen}`];
    const tree_background = require('./assets/tree.png')
    const tree_snow = require('./assets/tree_snow.png')


    useEffect(() => {
        const img = new Image();
        img.src = tree_snow;
        img.onload = () =>{
            setIsLoading(false)
        }
        img.onerror = () => setIsLoading(false)
    }, [tree_snow]);

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
                regenImage && <img className={regenClassName} src={regenImage} alt='img'/>
            }
        </div>
    )
}