const express = require("express")
const app = express();


require("dotenv").config()

const PORT = process.env.PORT || 4001
// listen app 
app.listen(PORT, 
        console.log("app connected successfully")
)

// connect to dataBase 
const database = require("./config/database")
database();


// middleware 
app.use(express.json());

// import routes 
const blogRoutes = require("./routes/blog")
app.use("/api/v1", blogRoutes)


app.get('/', (req, res) => {
        res.send(`<p>Hello world</p>`)
})