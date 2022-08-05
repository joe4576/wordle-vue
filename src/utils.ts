export function deepArrayClone<T>(arr: T[][]): T[][] {
  return arr.map((x) => x.slice());
}
