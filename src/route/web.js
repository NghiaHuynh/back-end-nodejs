//truy cập link thì chạy vào file nay đầu tiên
import express from "express";
import homeController from "../controllers/homeController.js";
import userController from "../controllers/userController.js";
import doctorController from "../controllers/doctorController.js";


let route = express.Router();

let initWebRoute = (app) => {
    route.get("/", homeController.getHomePage);

    route.post("/api/login", userController.handleLogin);

    route.get("/api/get-all-users", userController.handleGetAllUsers);

    route.post("/api/create-new-user", userController.handleCreateNewUser);

    route.put("/api/edit-user", userController.handleEditUser);

    route.delete("/api/delete-user", userController.handleDeleteUser);

    route.get("/api/all-code", userController.handleGetAllCodes);

    //doctor route
    route.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
    route.get("/api/get-all-doctors", doctorController.getAllDoctors);
    route.post("/api/save-info-doctor", doctorController.saveDetailDoctor);
    route.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctorById);

    return app.use("/", route);
}

export default initWebRoute;