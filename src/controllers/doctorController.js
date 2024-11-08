import e from "express";
import doctorService from "../services/doctorService";

let getTopDoctorHome =  async (req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }
    try {
        // console.log("check limit: "+limit);
        let data = await doctorService.getTopDoctorHomeService(+limit);
        // console.log(data);
        return res.status(200).json({
            errCode: 0,
            data: data
        });
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

export default {
    getTopDoctorHome: getTopDoctorHome
}