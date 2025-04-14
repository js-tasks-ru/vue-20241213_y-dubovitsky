/**
 * Вычислить сумму двух чисел
 *
 * @param {number} a - первое число
 * @param {number} b - второе целое
 * @return {number} сумма чисел a и b
 */
export function sum(a, b) {
  // Проверка, что оба аргумента являются числами
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Оба аргумента должны быть числами');
  }
  
  return a + b;
}

