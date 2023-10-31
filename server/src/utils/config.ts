const MORGAN =
  ":method :url :status :res[content-length] - :response-time ms :request-body";

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.NODE_ENV === "production"
    ? process.env.PROD_MONGODB_URI
    : process.env.NODE_ENV === "development"
    ? process.env.DEV_MONGODB_URI
    : null;

const JWT_SECRET = process.env.JWT_SECRET;

export default {
  MORGAN,
  PORT,
  MONGODB_URI,
  JWT_SECRET,
};
