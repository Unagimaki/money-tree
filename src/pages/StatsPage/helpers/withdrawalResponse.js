export const withdrawalResponse = (res) => {
  switch (res) {
    case "Withdrawal amount exceeds threshold, verification is required. Please wait for approval.":
      return "Транзакцию надо верифицировать"
    case 'Sum of withdrawal must be greater than 0':
      return 'Сумма вывода 0'
    case 'Player balance is not enough':
      return 'Баланс игрока меньше указанного'
    case 'Withdrawal amount is below minimum allowed':
      return "Вывод при конвертации меньше указанного в сезоне"
    case 'Player wallet address not found':
      return 'Кошелек не найден'
    case 'Withdraw not allowed yet!':
      return 'Вывод средств закрыт в сезоне'
    case 'Funds were successfully withdrawn':
      return "Успешно"
    case 'amount must not be less than 1, amount must be a number conforming to the specified constraints, amount should not be empty':
      return 'Ошибка при выводе'
    default:
      console.log('withdrawalResponse: ' + res);  // Печать в консоль
      return 'Неизвестная ошибка';  // Возвращаем строку
  }
}
