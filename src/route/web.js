//truy cập link thì chạy vào file nay đầu tiên
import express from "express";

let route = express.Router();

let initWebRoute = (app) => {
    route.get("/", (req, res) => {
        return res.send("Hello world!");
    });
    return app.use("/", route);
}

export default initWebRoute;