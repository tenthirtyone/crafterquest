const express = require("express");
const app = express();

app.use(express.static("./client/build/static"));
app.use("/crafting", express.static("./client/build"));
app.use("/resources", express.static("./client/build"));
app.use(express.static("./client/build"));

app.listen(4000, () => {
  console.log("listening on 4000");
});
