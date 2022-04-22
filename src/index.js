import express from "express";
import cors from "cors"

const app = express();
const users = [];

app.use(cors());
app.use(express.json());


function SignUp() {
  app.post("/sign-up", (req, res) => {
    const body = req.body;
    users.push(body);
    console.log(users)
    res.send("OK");
  })
}

SignUp()

app.listen(5000, () => console.log("Server On"))