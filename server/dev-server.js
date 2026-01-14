const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 4173;

app.use((req, res, next) => {
  console.log(`[DEV HOST] ${req.method} ${req.url}`);
  next();
});

const appDir = path.join(__dirname, "..", "app");
app.use(express.static(appDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(appDir, "widget.html"));
});

app.listen(port, () => {
  console.log(`Dev widget host running at http://localhost:${port}/widget.html`);
});

