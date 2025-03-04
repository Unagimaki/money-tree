import { hasTargetWord } from "./hasTargetWord";

export const sortByWinline = (array) => {
  return array.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    // Проверяем, есть ли слово "Винлайн" в заголовках
    const matchA = titleA.includes('винлайн');
    const matchB = titleB.includes('винлайн');

    // Если у объекта A есть слово "Винлайн", а у объекта B — нет, то A идет первым
    if (matchA && !matchB) {
      return -1;
    }
    // Если у объекта B есть слово "Винлайн", а у объекта A — нет, то B идет первым
    if (!matchA && matchB) {
      return 1;
    }
    // Если оба объекта содержат слово "Винлайн" или оба не содержат, то порядок не меняется
    return 0;
  });
};
