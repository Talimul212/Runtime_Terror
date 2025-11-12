const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Runtime Terror Durjoy");
});

app.listen(port, () => {
  console.log(`Runtime Terror app listening on port ${port}`);
});
