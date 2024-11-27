export const formatString = (str) => {
    // Проверяем, достаточно ли длинная строка
    if (str.length <= 12) {
        return str; // Если строка короче или равна 12 символам, возвращаем её целиком
    }

    const firstPart = str.slice(0, 7); // Первые 7 символов
    const lastPart = str.slice(-5); // Последние 5 символов

    return `${firstPart}...${lastPart}`; // Формируем и возвращаем результат
}