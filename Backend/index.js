import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcrypt"


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
dotenv.config()

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


const userSchema = mongoose.Schema({
    name: String,
    email: {type: String},
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login",(req,res) => {
    const { email, password } = req.body
    User.findOne({ email: email}).then((user) => {
        if(user){
            ///////////////////////////////comparing to hashed password
            bcrypt.compare(password, user.password, function (err, result) {
                if(result){
                    res.send({ message:"Login successful", user})
                } else {
                    res.send({ message: "Invalid password"})
                }
            })
            } else {
                res.send({message: "Email not found"})
            }

    })
})

app.post("/register",(req,res) => {
    const {name, email, password} = req.body
    
////////////////////////////////////Checking if user is already registered
    User.findOne({email: email}).then((user) => {
        if (user){
            res.send({message: "User already exists"})
            console.log("User exists")
        } else {
            const user = new User({
                name,
                email,
                password
            })
            /////////////////////////////Hashing the password
            bcrypt.genSalt(10).then((salt) =>{
                bcrypt.hash(user.password,salt).then((hashpass) =>{
                    user.password = hashpass
                    /////////////////////////////Saving in the database
                    user.save().then(() =>{
                        res.send({message: "Successfully registered"})
                        console.log("registered successfully")
                    })
                    .catch((err) => {
                        res.send(err)
                    })
                })
            })
        }
    })
})


app.listen(process.env.PORT,() => {
    console.log("BE started at port 9002")
})