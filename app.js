const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const authRouter = require("./router/auth.router");
const contactsRouter = require('./router/contacts.router')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter);
app.use('/api/contacts', contactsRouter)

app.use((err, req, res, next) => {
  console.error(`app error: ${err.message}, ${err.name}`);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
});

module.exports = {
    app,
}