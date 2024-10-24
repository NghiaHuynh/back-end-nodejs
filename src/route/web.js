//truy cập link thì chạy vào file nay đầu tiên
import express from "express";
import homeController from "../controllers/homeController.js";
import userController from "../controllers/userController.js";


let route = express.Router();

let initWebRoute = (app) => {
    route.get("/", homeController.getHomePage);

    route.post("/api/login", userController.handleLogin);

    return app.use("/", route);
}

export default initWebRoute;