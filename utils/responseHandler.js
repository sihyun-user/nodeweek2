const headers = require('./headers');
const errorMsg = require('./errorMsg');

function handleSuccess(res, paramData) {
  res.writeHead(200, headers);
  res.write(JSON.stringify({
    status: 'success',
    data: paramData,
  }));
  res.end();
};

function handleError(res, msg = errorMsg.DEFAULT) {
  res.writeHead(400, headers);
  res.write(JSON.stringify({
    status: 'false',
    message: msg
  }));
  res.end();
};

module.exports = {
  handleSuccess,
  handleError
};