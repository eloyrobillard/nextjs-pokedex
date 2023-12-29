export const debounce = (f: (...args: any[]) => void, delay = 1000) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => f.apply(this, args), delay);
  };
};
