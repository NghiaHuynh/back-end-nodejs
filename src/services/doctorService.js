import db from '../models/index';

let getTopDoctorHomeService = async (limit) => {
    let users = await db.User.findAll({
        limit: limit,
        where: {roleId: 'R2'},
        order: [['createdAt', 'DESC']],
        attributes: {
            exclude: ['password']
        },
        include: [
            {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
            {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
        ],
        raw: true,
        nest: true
    });
    return users;
}

let getAllDoctors = async () => {
    // console.log('getAllDoctors');
    let users = await db.User.findAll({
        where: {roleId: 'R2'},
        attributes: {
            exclude: ['password', 'image']
        }
    });
    return users;
}

let saveDetailDoctor = async (data) => {
    try {
        if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
            return {
                errCode: 2,
                errMessage: 'Missing required parameters'
            }
        }
        await db.Markdown.create({
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
            description: data.description,
            doctorId: data.doctorId
        });
        
        return {
            errCode: 0,
            message: 'Save infor doctor succeed'
        }
    } catch (error) {
        console.log(error);
    }
}

let getDetailDoctorById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: {id: id},
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {model: db.Markdown, as: 'markdownData', attributes: ['description', 'contentHTML', 'contentMarkdown']},
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
                ],
                raw: true,
                nest: true
            });
            if (data && data.image) {
                data.image = new Buffer(data.image, 'base64').toString('binary');
            }
            if (!data) {
                data = {};
            }
            resolve({
                errCode: 0,
                data: data
            });
        } catch (error) {
            reject(error);
        }
    })
}

export default {
    getTopDoctorHomeService: getTopDoctorHomeService,
    getAllDoctors: getAllDoctors,
    saveDetailDoctor: saveDetailDoctor,
    getDetailDoctorById: getDetailDoctorById
}