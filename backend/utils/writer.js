var ResponsePayload = function (code, payload) {
  this.code = code;
  this.payload = payload;
}

exports.respondWithCode = function (code, payload) {
  return new ResponsePayload(code, payload);
}

var writeJson = exports.writeJson = function (response, payload) {
  let code = 200;
  if (payload.error) {
    code = payload.code;
  }

  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
}
