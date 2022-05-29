let http = require("http");

let fs = require("fs");

let url = require("url");

let server = http.createServer();

server.on("request", (request, response) => {
  response.writeHead(200);

  let query = url.parse(request.url, true).query;
  let name = query.name === undefined ? "anonyme " : query.name;

  fs.readFile("index.html", "utf8", (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("ce fichier n existe pas");
    } else {
      response.writeHead(200, {
        "Content-type": "text/html; charset=utf-8",
      });

      data = data.replace("{{ name }}", name);

      response.end(data);
    }
  });
});
server.listen(8080);

//   if (query.name === undefined) {
//     response.write("Yo anonyme");
//   } else {
//     response.write("bonjour " + query.name);
//   }
//   response.end();
