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
    try {
        if (!id) {
            return {
                errCode: 2,
                errMessage: 'Missing required parameters'
            }
        }
        let infor = await db.User.findOne({
            where: {id: id},
            attributes: {
                exclude: ['password', 'image']
            },
            include: [
                {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                // {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']},
                {model: db.Markdown, as: 'markdownData', attributes: ['description', 'contentHTML', 'contentMarkdown']}
            ],
            raw: false,
            nest: true
        });
        return infor;
    } catch (error) {
        console.log(error);
    }
}

export default {
    getTopDoctorHomeService: getTopDoctorHomeService,
    getAllDoctors: getAllDoctors,
    saveDetailDoctor: saveDetailDoctor,
    getDetailDoctorById: getDetailDoctorById
}