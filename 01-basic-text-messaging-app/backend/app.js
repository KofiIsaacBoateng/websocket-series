const express = require("express");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user.js");
const messageRouter = require("./routes/message.js");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found.js");

const app = express();

/**** MIDDLEWARE */
/**** body parser */
app.use(express.json({ limit: "10kb" }));

/**** render static files */
app.use("/", express.static("/"));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);

// error handling middleware
app.use(errorHandler);
app.use(notFound);

module.exports = app;
