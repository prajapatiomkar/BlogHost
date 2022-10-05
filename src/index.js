const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const homeRoutes = require("./routes/homeRoutes");
const adminRoutes = require("./routes/adminRoutes");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set("view engine", "ejs");
dotenv.config();
app.use(express.json());
app.use(cors())
app.use(cookieParser());
// app.use((req, res, next) => {//example of middleware 
//     next();
// })

app.use("/", homeRoutes);
app.use("/admin", adminRoutes);
app.use("/users", userRouter);
app.use("/note", noteRoutes);
// app.use("/main", mainRoutes);

const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on port no " + PORT);
        });
    })
    .catch((error) => {
        console.log(error)
    })

