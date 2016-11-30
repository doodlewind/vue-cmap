var http = require('http');
var fs = require('fs');
var path = require('path');
var open = require('open');

function serve(request, response) {
  var filePath = '.' + request.url;
  if (filePath == './') filePath = './index.html';

  var extName = path.extname(filePath);
  var contentType = 'text/html';
  switch (extName) {
    case '.js':
      contentType = 'text/javascript'; break;
    case '.css':
      contentType = 'text/css'; break;
    case '.json':
      contentType = 'application/json'; break;
    case '.png':
      contentType = 'image/png'; break;
    case '.jpg':
      contentType = 'image/jpg'; break;
  }

  fs.readFile(path.join(process.cwd(), filePath), function(error, content) {
    if (error) {
      if(error.code == 'ENOENT'){
        response.writeHead(200, { 'Content-Type': contentType });
        response.end('404 not found');
        response.end();
      }
      else {
        response.writeHead(500);
        response.end('500 Internal Error');
        response.end();
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}

function httpHandler(request, response) {
  // 支持跨域 OPTION 请求
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
    return;
  }

  serve(request, response);
}

function init(port) {
  http.createServer(httpHandler).listen(port);
  open("http://localhost:" + port + "/index.html");
  console.log('dev server running at port', port);
}

module.exports = {
  init: init
}