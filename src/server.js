import express from "express";
import bodyParser from "body-parser"; // dùng cái này để lấy id trong url ex:/user?id=123
import viewEngine from "./config/viewEngine.js";
import initWebRoute from "./route/web.js";
import { connectDB } from "./config/connectDB.js";
// import cors from "cors";

import path from "path";
import dotenv from 'dotenv';
dotenv.config();
// console.log("test path checked: "+path.resolve(process.cwd(), '.env') );
// require("dotenv").config();//dùng cho process.env
// console.log(process.env.__DEV__)

let app = express();

//config app
// app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoute(app);

connectDB();

//If port === undefined => = 9090
let port = process.env.PORT || 9090;

app.listen(port, () => {
    // khi lắng nghe thành công thì callback function run
    //callback funtion
    console.log("Backend is runing on port : " + port)
});
