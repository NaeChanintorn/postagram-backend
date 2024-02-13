require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoute = require("./routes/auth-route");

const errorHandler = require("./middlewares/error");
const notFound = require("./middlewares/not-found");
const rateLimit = require("./middlewares/rate-limit");

const app = express();

const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(rateLimit);
app.use(morgan("dev"));

// routes
app.use("/auth", authRoute);

// Error , Not-Found
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
