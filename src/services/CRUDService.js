const bcrypt = require('bcryptjs');
const salt = bcrypt.genSalt(10);
import db from '../models/index';

let hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

let createNewUser = async (data) => {
    return await db.User.create({...data, password: hashPassword(data.password)});
}

let getAllUser = async () => {
    return await db.User.findAll();
}

let getUserInfoById = async (userId) => {
    return await db.User.findOne({
        where: {id: userId}
    });
}

let updateUserData = async (userId, data) => {
    return await db.User.update(data, {where: {id: userId}});
}

let deleteUserById = async (userId) => {
    return await db.User.destroy({where: {id: userId}});
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}
