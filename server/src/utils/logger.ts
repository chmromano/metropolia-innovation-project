const info = (...params: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...params);
  }
};

const error = (...params: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.error(...params);
  }
};

export default {
  error,
  info,
};
