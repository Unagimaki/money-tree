import { getData } from "../../../services/getData";

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
      getData(token, "daily-bonuses"),
      getData(token, "player/top?league=bronze"),
    ])       
      
    return results
  } catch (e) {
    console.log(`fetchData func error: ${e}`)
  }
}