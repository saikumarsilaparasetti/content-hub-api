const userServices = require("../services/userServices")
const { encrypt } = require("../utils/encryptor")
const utils = require("../utils")


const userController = {
    createUser: async(req, res)=>{
        try {
            const {name, email, password} = req.body
    
            if(!name|| !email || !password){
                return utils.errorResponse(res, undefined, "Please provide all mandatory fields!!")
            }
            const encryptedPassword = encrypt(password)
            const userCreated = await userServices.createUser(name, email, encryptedPassword)

            return userCreated?utils.successResponse(res, userCreated, "User Signed in successfully!!"): utils.errorResponse(res, undefined,"Couldnt create user, Please try again!!")

        } catch (error) {
            return utils.errorResponse(res, error, "Error in creating user, Please try again!!")
        }
    }
}

module.exports = userController