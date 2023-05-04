const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My first project</title></head>");
    res.write("<body>");

    // read messages from file
    const messages = fs.readFileSync("message.txt", "utf-8").split("\n");

    res.write("<h1>Messages:</h1><ul>");
    messages.forEach((msg) => {
      if (msg !== "") {
        res.write(`<li>${msg}</li>`);
      }
    });
    res.write("</ul>");

    res.write(
      '<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];

      // append message to file
      fs.appendFileSync("message.txt", message + "\n");

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My Node.js response</title></head>");
  res.write("<body><h1>Welcome to my Node.js project</h1></body>");
  res.write("</html>");
  return res.end();
});

server.listen(3000);
