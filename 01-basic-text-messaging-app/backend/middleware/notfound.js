const notFound = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: `Route [${req.path}] doesn't exist!`,
  });
