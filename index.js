import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { Web3Storage } from "web3.storage";
import bodyParser from "body-parser";

const ipfs = new Web3Storage({ token: process.env.IPFSTOKEN || null });

app.use(express.static("./client/build/static"));
app.use("/crafting", express.static("./client/build"));
app.use("/resources", express.static("./client/build"));
app.use(express.static("./client/build"));
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: 1e10,
  })
);
app.use(bodyParser.json({ limit: 1e10 }));
app.post("/ipfs", (req, res) => {
  const obj = req.body;
  const buffer = Buffer.from(JSON.stringify(obj));
  const files = [buffer];
  ipfs.put(files);
});

app.get("/ipfs", async (req, res) => {
  const cid = req.query.cid;

  if (!cid) res.status(404).send();

  res.send(await ipfs.get(cid));
});

app.listen(4000, () => {
  console.log("listening on 4000");
});
