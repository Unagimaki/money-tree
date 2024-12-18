export const getPageForLeague = (leagueNumber) => { 
  let startUser;

  // Определяем, с какого пользователя начинается эта лига
  switch (leagueNumber) {
    case 1: // Бронзовая лига (с 10001-го пользователя)
      startUser = 10001;
      break;
    case 2: // Серебряная лига (с 5001 по 10000)
      startUser = 5001;
      break;
    case 3: // Золотая лига (с 1001 по 5000)
      startUser = 1001;
      break;
    case 4: // Платиновая лига (с 101 по 1000)
      startUser = 101;
      break;
    case 5: // Алмазная лига (с 1 по 100)
      startUser = 1;
      break;
    default:
      throw new Error("Неверный номер лиги.");
  }

  // Вычисляем первую страницу для лиги, округляя вверх
  const page = Math.ceil(startUser / 50);  
  return page;
}