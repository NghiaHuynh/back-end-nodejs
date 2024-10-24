const bcrypt = require('bcryptjs');
import e from 'express';
import db from '../models/index';
import { raw } from 'body-parser';


let handleUserLogin = async (email, password) => {
    let userData = {};
    let isExist = await checkUserEmailExist(email);
    if (isExist) {
        
        let user = await db.User.findOne({
            where: {email: email}
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

let getAllUsers = async (id) => {
    if (id.toLowerCase() === 'all') {
        return await db.User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
    }
    return await db.User.findOne({
        where: {id: id},
        attributes: {
            exclude: ['password']
        }
    })
}

let createNewUser = async (data) => {
    let checkEmail = await checkUserEmailExist(data.email);
    if (checkEmail) {
        return {
            errCode: 1,
            message: 'Email already exists'
        }
    }
    data.password = hashPassword(data.password);
    return await db.User.create(data);
}

let updateUserData = async (data) => {
    //raw: false: only return data
    //raw: true: return instant object data
    let user = await db.User.findOne({where: {id: data.id},
        raw : false
    });
    if (!user){
        return {
            errCode: 2,
            message: 'User does not exist'
        }
    }else{
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        if (data.password) {
            user.password = hashPassword(data.password);
        }
    }
    await user.save();
    return {
        errCode: 0,
        message: 'Update the user success!'
    }
}

let deleteUserById = async (id) => {
    if (!id) {
        return {
            errCode: 1,
            message: 'Missing required parameters'
        }
    }else if (id.toLowerCase() === 'all') {
        return await db.User.destroy({
            where: {},
            truncate: true
        });
    }else if (isNaN(id)) {
        return {
            errCode: 2,
            message: 'Id must be a number'
        }
    }

    return await db.User.destroy({where: {id: id}});
}

let hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export default {
    handleUserLogin: handleUserLogin,
    checkUserEmailExist: checkUserEmailExist,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}