import { useSelector } from 'react-redux'
import { getBackgroundColor } from '../../helpers/getBackgroundColor'
import { getFontColor } from '../../helpers/getFontColor'
import styles from './advertRewardItemMain.module.scss' 

export const AdvertRewardItemMain = ({place, chance = null, prize}) => {
    const money = require('../../../../assets/money.png')
    const chip = require('../../../../assets/chip.png')
    const course = useSelector((state) => state.season?.course);

        function convertStringToNumber(str) {
    const multipliers = {
        'тыс': 1_000,
        'миллион': 1_000_000,
        'млн': 1_000_000,
        'миллиард': 1_000_000_000,
        'млрд': 1_000_000_000,
        'триллион': 1_000_000_000_000,
        'трлн': 1_000_000_000_000
    };

    const match = str.match(/(\d+(?:\.\d+)?)(\s*(тыс|млн|миллион|млрд|миллиард|трлн|триллион))?/i);
    
    if (!match) return null;
    
    let number = parseFloat(match[1]);
    let unit = match[3]?.toLowerCase();
    
    return unit && multipliers[unit] ? number * multipliers[unit] : number;
    }

    return(
        <div className={styles.container}>
            <div className={styles.container_inner}>
                <div className={styles.container_inner_info}>
                    <div className={styles.container_inner_info_place}>{place} место</div>
                    <div className={styles.container_inner_info_inner}>
                        <div className={styles.container_inner_info_inner_reward}>{prize} <b> ({(course * convertStringToNumber(prize)).toFixed(5).replace(/\.?0+$/, "")})</b>$</div>
                        {
                            chance !== null &&
                            <div style={{backgroundColor: getBackgroundColor(chance), color: getFontColor(chance)}} className={styles.container_inner_info_inner_chance}>Шанс {chance}%</div>
                        }
                    </div>
                </div>
            </div>
            <img className={styles.container_img_money} src={money} alt="money" />
            <img className={styles.container_img_chip} src={chip} alt="chip" />
        </div>
    )
}