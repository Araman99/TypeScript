const multiplyValue = (value: number, multiplier?: number): number => {
  return value * (multiplier !== undefined ? multiplier : 2);
};
