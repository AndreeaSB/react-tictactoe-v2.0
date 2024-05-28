import express from "express"
import cors from "cors"
import { StreamChat } from "stream-chat"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())


const PORT = 3000
const api_key = "rsk7x3wune53"
const api_secret =
  "shh" //aparently you should not post this secrets on github
const serverClient = new StreamChat.getInstance(api_key, api_secret)

 app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
}); 

app.post("/login");

app.listen(PORT, () => {
  console.log("Server is going vroom~");
});
 

/*import express from "express"
//import cors from "cors"
//import { StreamChat } from "stream-chat"
//import { v4 as uuidv4 } from "uuid"
//import bcrypt from "bcrypt"
import bodyParser from "body-parser"

const app = express()
const PORT = 3000
app.use(bodyParser.json())
app.use(express.json())
//app.use(cors)

app.get('/dummy', (req,res) => {
    console.log("dummy check :P")
    
    res.send()
})

app.listen(PORT, () => {
    console.log("Server is going vroom~");
  })*/