const bcrypt = require('bcryptjs');
import db from '../models/index';


let handleUserLogin = async (email, password) => {
    let userData = {};
    let isExist = await checkUserEmailExist(email);
    if (isExist) {
        
        let user = await db.User.findOne({
            where: {email: email},
            raw: true
        })
        if (user) {
            let compareResult = await comparePassword(password, user.password);
            if (compareResult) {
                userData.errCode = 0;
                userData.message = "ok";

                delete user.password;
                userData.user = user;
            } else {
                userData.errCode = 2;
                userData.message = "Wrong password";
            }
        }
    } else {
        userData.errCode = 1;
        userData.message = "User does not exist";
    }
    return userData;
}

let checkUserEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: {email: userEmail}
    })
    if (user) {
        return true;
    }
    return false;
}

let comparePassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
}

export default {
    handleUserLogin: handleUserLogin,
    checkUserEmailExist: checkUserEmailExist
}
