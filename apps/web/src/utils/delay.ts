// eslint-disable-next-line no-promise-executor-return
export const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
