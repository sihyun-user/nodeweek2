const headers = require('../utils/headers');
const errorMsg = require('../utils/errorMsg');
const responseHandler = require('../utils/responseHandler');

const https = {
  cors(req, res) {
    res.writeHead(200, headers);
    res.end();
  },
  notFound(req, res) {
    responseHandler.handleError(res, errorMsg.NOT_FOUND);
  }
};

module.exports = https