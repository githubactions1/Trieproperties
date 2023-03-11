const express = require('express');
const bodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const moment = require('moment');
const config = require('./config/config');
const routes = require('./routes/router');
const ApiMessages = require('./config/ApiMessages');
const connectToDb = require('./config/connect');
const ResponseController = require('./controllers/ResponseController');
const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.text({ limit: config.BodyParserLimit }));
app.use(bodyParser.raw({ limit: config.BodyParserLimit }));
app.use(bodyParser.json({ limit: config.BodyParserLimit }));
app.use(bodyParser.urlencoded({ extended: true, limit: config.BodyParserLimit, parameterLimit: config.ParameterLimit }));
app.use(morgan(':method :status :url :response-time ms'));
app.use(CookieParser());
app.use('/', routes);
app.use(async (req, res, next) => {
    let msg = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    let Result = { success: false, extras: { code: 2, msg: ApiMessages.API_NOT_AVAILABLE, Req: msg } };
    await ResponseController.Common_Response_Handler(res, Result);
});

app.listen(config.port, connectToDb(), console.log(`Trie Properties server running on ${config.port}`));