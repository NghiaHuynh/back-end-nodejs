//truy cập link thì chạy vào file nay đầu tiên
import express from "express";
import homeController from "../controllers/homeController.js";
import userController from "../controllers/userController.js";


let route = express.Router();

let initWebRoute = (app) => {
    route.get("/", homeController.getHomePage);

    route.post("/api/login", userController.handleLogin);

    route.get("/api/get-all-users", userController.handleGetAllUsers);

    route.post("/api/create-new-user", userController.handleCreateNewUser);

    route.put("/api/edit-user", userController.handleEditUser);

    route.delete("/api/delete-user", userController.handleDeleteUser);

    return app.use("/", route);
}

export default initWebRoute;