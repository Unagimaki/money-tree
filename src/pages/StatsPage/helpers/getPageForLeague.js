export const getPageForLeague = (leagueNumber) => {  
  let startUser;

  // Определяем, с какого пользователя начинается эта лига
  switch (leagueNumber) {
    case 1: // Бронзовая лига (с 10001-го пользователя)
      startUser = 'bronze';
      break;
    case 2: // Серебряная лига (с 5001 по 10000)
      startUser = 'silver';
      break;
    case 3: // Золотая лига (с 1001 по 5000)
      startUser = 'gold';
      break;
    case 4: // Платиновая лига (с 101 по 1000)
      startUser = 'platinum';
      break;
    case 5: // Алмазная лига (с 1 по 100)
      startUser = 'diamond';
      break;
    default:
      console.log("Неверный номер лиги.");
      
  }

  // Вычисляем первую страницу для лиги, округляя вверх
  return startUser;
}