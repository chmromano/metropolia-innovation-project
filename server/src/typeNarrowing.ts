export const isNumber = (number: unknown): number is number => {
  return typeof number === "number" && !isNaN(number) && isFinite(number);
};
