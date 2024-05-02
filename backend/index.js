const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");



mongoose
        .connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("DB is ok")
        })
        .catch((err)=>{

});

app.use(express.json());
app.use(cors());


// ROUTER 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);







app.listen(process.env.PORT || 5000, ()=> {
    console.log('backend is ok')
})

