import express from "express";

// ES5 version 2015 (old)
// ES6 mới
// var : khai báo cho global
// let : chỉ nơi khai báo trong file js
let configViewEngine = (app) => {
    //arrow function
    app.use(express.static("./src/public"));// chỉ lấy file trong public
    app.set("view engine", "ejs") //the same jsp: gõ logic trong html
    app.set("views", "./src/views")//tìm cách file view trong thư mục
}

export default configViewEngine;