'use strict';

const _buildCurl = function (params) {
  if (!params.url) {
    console.error('Input missing: URL');
  }

  if (!params.verb) {
    console.error('Input missing: HTTP verb');
  }

  let _headers = '';
  let _body = '';

  try {
    if (params.headers) {
      if (params.headers['content-length']) {
        delete params.headers['content-length'];
      }

      for (let key in params.headers) {
        _headers += `-H '${key}:${params.headers[key]}' `;
      }

      if (params.body) {
        if (params.headers && params.headers['content-type'] && params.headers['content-type'] === 'application/json') {
          _body += `-d '${JSON.stringify(params.body)}' `;
        } else {
          for (let key in params.body) {
            _body += `-d '${key}=${params.body[key]}' `;
          }
        }
      }

      _headers.length ? _headers = _headers.substring(0, _headers.length - 1) : null;
      _body.length ? _body = _body.substring(0, _body.length - 1) : null;

      var curl = `curl ${_headers} -X ${params.verb.toUpperCase()} '${params.url}' ${_body}`
      return curl;
    }
  } catch (e) {
    console.log(e);
  }
};

const printCurl = function (req, res, next) {
  var curlParams = {};
  curlParams.url = req.protocol + '://' + (req.headers.host || req.hostname) + req.originalUrl;
  curlParams.verb = req.method.toUpperCase();
  req.headers ? curlParams.headers = req.headers : null;
  req.body ? curlParams.body = req.body : null;
  console.log(`${_buildCurl(curlParams)}`);

  next();
};

module.exports = printCurl;