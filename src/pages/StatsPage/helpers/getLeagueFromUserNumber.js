export const getLeagueFromUserNumber = (userNumber) => {
    if (userNumber >= 10001) {
    return 1; // Бронзовая лига
  } else if (userNumber >= 5001) {
    return 2; // Серебряная лига
  } else if (userNumber >= 1001) {
    return 3; // Золотая лига
  } else if (userNumber >= 101) {
    return 4; // Платиновая лига
  } else if (userNumber >= 1) {
    return 5; // Алмазная лига
  } else {
    throw new Error("Неверный номер пользователя.");
  }
}