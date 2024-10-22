//truy cập link thì chạy vào file nay đầu tiên
import express from "express";
import homeController from "../controllers/homeController.js";


let route = express.Router();

let initWebRoute = (app) => {
    route.get("/", homeController.getHomePage);
    return app.use("/", route);
}

export default initWebRoute;