const http = require('http');
const url = require('url');
const fs = require('fs');


const app = http.createServer();

function getType(filepath) {
  if (/\.js$/.test(filepath)) {
    return 'application/javascript';
  }

  if (/\.css$/.test(filepath)) {
    return 'text/css';
  }

  if (/\.html$/.test(filepath)) {
    return 'text/html';
  }

  if (/\.ico$/.test(filepath)) {
    return 'image/x-icon';
  }

  return 'text/plain';
}

app.on('request', (req, res) => {
  const { pathname } = url.parse(req.url);
  const filepath = `${__dirname}/dist${pathname}`;

  console.log(filepath)

  if (fs.existsSync(filepath) && !/\/$/.test(pathname)) {
    res.setHeader('content-type', getType(filepath));
    fs.createReadStream(filepath).pipe(res);
  } else {
    res.setHeader('content-type', 'text/html');
    fs.createReadStream(`${__dirname}/dist/index.html`).pipe(res);
  }
});

app.listen(4002, () => {
  console.log("server run at 4002...");
});
