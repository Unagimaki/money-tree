import { getData } from "../../../services/getData";

export const fetchData = async (token) => {
  try {
    const results = await Promise.allSettled([
      getData(token, "auto-bot"),
      getData(token, "auto-bot/player"),
      getData(token, "free-boosts"),
      getData(token, "seasons"),
      getData(token, "player/top"),
      getData(token, "referrals"),
      getData(token, "boosts"),
      getData(token, "shop-item"),
      getData(token, "offers"),
      getData(token, 'wallet')
    ])       
      
    return results
  } catch (e) {
    console.log(e)
  }
}