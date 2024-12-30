import { getData } from "../../../services/getData";
import { getDailyBonuses } from "../../MainPage/services/getDailyBonuses";

export const fetchData = async (token) => {  
  try {
    const results = await Promise.allSettled([
      getData(token, "auto-bot"),
      getData(token, "auto-bot/player"),
      getData(token, "free-boosts"),
      getData(token, "seasons"),
      getData(token, "boosts"),
      getData(token, "shop-item"),
      getData(token, "offers"),
      getDailyBonuses(token),
      // getData(token, "daily-bonuses"),
      getData(token, "player/top?league=bronze"),
      getData(token, "wallet"),
      getData(token, "referrals"),
    ])       
      
    return results
  } catch (e) {
    console.log(`fetchData func error: ${e}`)
  }
}