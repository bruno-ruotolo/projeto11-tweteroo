import express from "express";
import cors from "cors"

const app = express();
const users = [];
const tweets = [];

app.use(cors());
app.use(express.json());

function signUp() {
  app.post("/sign-up", (req, res) => {
    const body = req.body;
    const validURL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const { username, avatar } = body;
    res.status(201).send(body)

    if (!(username === "" || avatar === "") && (validURL.test(avatar))) {
      users.push(body);
      res.send("OK");
    } else if (username === "" || avatar === "") {
      res.status(400).send("Todos os campos são obrigatórios!");
    } else {
      res.sendStatus(400);
    }
  })
}

function tweetsPost() {
  app.post("/tweets", (req, res) => {
    const body = req.body;
    const { username, tweet } = body;
    const user = users.find((user) => username === user.username);
    res.status(201).send(body)

    if (!(username === "" || tweet === "")) {
      tweets.push({ ...body, avatar: user.avatar });
      res.send("OK");
    } else {
      res.status(400).send("Todos os campos são obrigatórios!");
    }
  })
}

function tweetsGet() {
  app.get("/tweets", (req, res) => {
    const lastTweets = tweets.slice(-10);
    res.send(lastTweets);
  })
}

signUp();
tweetsPost();
tweetsGet();

app.listen(5000, () => console.log("Server On"))