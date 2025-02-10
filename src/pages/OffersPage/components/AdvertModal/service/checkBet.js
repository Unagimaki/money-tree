import axios from "axios";

export const checkBet = async (initData) => {
    const result = await axios.get(`https://mtree-wl-binding.extensi.one/wl_bets_count?initData=${encodeURIComponent(initData)}`);
    console.log(result)
    
    return result
}