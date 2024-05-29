import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const PORT = 3000;
const api_key = "rsk7x3wune53";
const api_secret =
  "shh"; //aparently you should not post this secrets on github
const serverClient = new StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    console.log(token)
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  console.log("login fct");
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username })
    if (users.length === 0) return res.json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );
    const token = serverClient.createToken(users[0].id);
    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (err) {
    res.json(err);
  }
});

app.listen(PORT, () => {
  console.log("Server goes vroom~");
});
