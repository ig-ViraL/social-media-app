require("dotenv").config();
require("./helpers/global");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const fs = require("fs");
const config = require("./config/config");
const rateLimit = require("./helpers/ratelimiter");

app.use(express.json());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(rateLimit);

const routes = require("./routes");
app.use("/api/v1", routes);

if (config.protocol === "https" && config.sslCertificates.privkey) {
  const options = {
    key: fs.readFileSync(config.sslCertificates.privkey),
    cert: fs.readFileSync(config.sslCertificates.fullchain),
  };
  server = require("https").createServer(options, app);
} else {
  server = require("http").createServer(app);
}

const initializeSocketIO = require("./socket/socket");

const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    origin: "*",
  },
});

initializeSocketIO(io);

server.listen(config.port, () => {
  console.log(`Server is running on ${config.port}`);
});
