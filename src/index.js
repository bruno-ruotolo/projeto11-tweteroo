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
    users.push(body);
    res.send("OK");
  })
}

function tweetsPost() {
  app.post("/tweets", (req, res) => {
    const body = req.body;
    const user = users.find((user) => body.username === user.username)
    tweets.push({ ...body, avatar: user.avatar });
    res.send("OK");
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