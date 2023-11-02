const info = (...params: unknown[]) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.info(...params);
  }
};

const warn = (...params: unknown[]) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.warn(...params);
  }
};

const error = (...params: unknown[]) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.error(...params);
  }
};

export default {
  error,
  warn,
  info,
};
