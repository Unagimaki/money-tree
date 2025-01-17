import { hasTargetWord } from "./hasTargetWord";

export const sortByWinline = (array) => {
  return array.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    // Проверяем, есть ли слово "Винлайн" или "Winline" в заголовках
    const matchA = hasTargetWord('Винлайн', titleA) || hasTargetWord('Winline', titleA);
    const matchB = hasTargetWord('Винлайн', titleB) || hasTargetWord('Winline', titleB);

    // Если у объекта A есть нужное слово, а у объекта B — нет, то A идет первым
    if (matchA && !matchB) {
      return -1;
    }
    // Если у объекта B есть нужное слово, а у объекта A — нет, то B идет первым
    if (!matchA && matchB) {
      return 1;
    }
    // Если оба объекта содержат нужное слово или оба не содержат, то порядок не меняется
    return 0;
  });
};