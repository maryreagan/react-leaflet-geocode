require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const PORT = process.env.PORT || 3500
const MONGO_URL = process.env.MONGO_URL

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const address = require("./controllers/address")
app.use(address)
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log(`Connected to database`))
    .catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log(`[server] Listening on PORT ${PORT}`)
})