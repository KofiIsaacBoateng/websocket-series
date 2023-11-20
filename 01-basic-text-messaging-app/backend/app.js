const express = require("express");
const { StatusCodes } = require("http-status-codes");
const authRouter = require("./routes/auth");

const app = express();

/**** MIDDLEWARE */
/**** body parser */
app.use(express.json({ limit: "10kb" }));

/**** render static files */
app.use("/", express.static("/"));

// routes
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Server is ready for your bullshit!",
  });
});

module.exports = app;
